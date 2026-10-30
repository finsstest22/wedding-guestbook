// 픽셀 방명록 서버 — 의존성 없는 Node.js 서버 (정적 파일 + API + 실시간 SSE)
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');
const DATA_DIR = path.join(ROOT, 'data');
const DATA_FILE = path.join(DATA_DIR, 'guests.json');
const CONFIG_FILE = path.join(ROOT, 'config.json');
const SECRET_FILE = path.join(ROOT, 'secret.json');   // 관리자 키 (저장소에 올리지 않음)

function loadConfig() {
  try { return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); }
  catch (e) { console.error('config.json을 읽지 못했어요:', e.message); return {}; }
}
let config = loadConfig();

// 관리자 키: 환경 변수 ADMIN_KEY → secret.json → (예전 방식) config.json 의 adminKey
function adminKey() {
  if (process.env.ADMIN_KEY) return process.env.ADMIN_KEY;
  try { const s = JSON.parse(fs.readFileSync(SECRET_FILE, 'utf8')); if (s.adminKey) return String(s.adminKey); } catch { /* 없으면 다음 */ }
  return config.adminKey ? String(config.adminKey) : '';
}
const PORT = Number(process.env.PORT || config.port || 3000);

/* ---------- 데이터 ---------- */
let guests = [];
try { guests = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch { guests = []; }

function save() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(guests, null, 2));
  fs.renameSync(tmp, DATA_FILE);
}

const HEX = /^#[0-9a-fA-F]{6}$/;
const HAIR = ['short', 'side', 'fluffy', 'curtain', 'long', 'bob', 'ponytail', 'bun'];
const OUTFIT = ['tee', 'suit', 'hoodie', 'cardigan', 'shirt', 'dress', 'skirt', 'tux', 'gown'];

function cleanText(v, max) {
  return String(v || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}
const PART_ID = /^[a-z0-9_]{1,24}$/;
function cleanLook(l) {
  if (!l || typeof l !== 'object') return null;
  if (l.v === 3) {
    const look = { v: 3 };
    for (const k of ['outfit', 'hair', 'face', 'eyes', 'brows', 'mouth', 'cheek', 'pet']) look[k] = PART_ID.test(l[k]) ? l[k] : '';
    look.hairColor = HEX.test(l.hairColor) ? l.hairColor : '#6d3e36';
    return look.outfit ? look : null;
  }
  // 이 서버가 모르는 새 형식이면 기본값으로 바꾸지 말고 거절 (서버를 다시 켜야 한다는 신호)
  if (l.v !== undefined && l.v !== 2 && l.v !== 3) return null;
  if (l.v === 2) {
    // 그림 부품 캐릭터: 부품 이름과 색만 저장
    const look = { v: 2 };
    for (const k of ['body', 'head', 'eyes', 'mouth']) look[k] = PART_ID.test(l[k]) ? l[k] : '';
    look.cheek = PART_ID.test(l.cheek) ? l.cheek : '';
    look.pet = PART_ID.test(l.pet) ? l.pet : '';
    look.hair = HEX.test(l.hair) ? l.hair : '#6d3e36';
    look.skin = HEX.test(l.skin) ? l.skin : '#fcd7b7';
    return look.body ? look : null;
  }
  const look = {};
  for (const k of ['skin', 'hair', 'top', 'bottom', 'shoes', 'accent', 'tie']) if (HEX.test(l[k])) look[k] = l[k];
  look.hairStyle = HAIR.includes(l.hairStyle) ? l.hairStyle : 'short';
  look.outfit = OUTFIT.includes(l.outfit) && l.outfit !== 'gown' && l.outfit !== 'tux' ? l.outfit : 'tee';
  look.glasses = ['none', 'glasses', 'sunglasses'].includes(l.glasses) ? l.glasses : 'none';
  return look;
}

/* ---------- 실시간 (SSE) ---------- */
const clients = new Set();
function broadcast(event, data) {
  const msg = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) res.write(msg);
}
setInterval(() => { for (const res of clients) res.write(': ping\n\n'); }, 25000);

/* ---------- 도배 방지 ---------- */
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < 60000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 8;
}

/* ---------- 유틸 ---------- */
function lanAddress() {
  for (const list of Object.values(os.networkInterfaces())) {
    for (const a of list || []) if (a.family === 'IPv4' && !a.internal) return a.address;
  }
  return 'localhost';
}
function guestUrl(req) {
  if (config.publicUrl) return config.publicUrl.replace(/\/$/, '') + '/guest.html';
  const host = (req.headers.host || '').split(':')[0];
  const isLocal = !host || host === 'localhost' || host === '127.0.0.1';
  return `http://${isLocal ? lanAddress() : host}:${PORT}/guest.html`;
}
function json(res, code, body) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}
function readBody(req, limit = 16 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > limit) { reject(new Error('too large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}
function isAdmin(req) {
  const key = req.headers['x-admin-key'];
  const k = adminKey();
  return k && key && key === k;
}
function publicConfig(req) {
  return {
    groom: config.groom || { name: '신랑' },
    bride: config.bride || { name: '신부' },
    date: config.date || '',
    venue: config.venue || '',
    title: config.title || '',
    coupleMessages: config.coupleMessages || [],
    photoMilestone: config.photoMilestone ?? 50,
    art: config.art || {},
    guestUrl: guestUrl(req)
  };
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.webp': 'image/webp'
};

/* ---------- 라우팅 ---------- */
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const p = url.pathname;

  try {
    if (p === '/api/config' && req.method === 'GET') {
      config = loadConfig();
      return json(res, 200, publicConfig(req));
    }

    if (p === '/api/guests' && req.method === 'GET') return json(res, 200, guests);

    if (p === '/api/guests' && req.method === 'POST') {
      const ip = req.socket.remoteAddress || '';
      if (limited(ip)) return json(res, 429, { error: '잠시 후 다시 시도해 주세요.' });
      let body;
      try { body = JSON.parse(await readBody(req)); } catch { return json(res, 400, { error: '잘못된 요청이에요.' }); }
      const name = cleanText(body.name, 12);
      const message = cleanText(body.message, 60);
      const look = cleanLook(body.look);
      if (!name || !message || !look) return json(res, 400, { error: '이름, 메시지, 캐릭터가 모두 필요해요.' });
      const side = ['groom', 'bride'].includes(body.side) ? body.side : '';
      const guest = { id: crypto.randomUUID(), name, message, side, look, createdAt: new Date().toISOString() };
      guests.push(guest);
      save();
      broadcast('guest', guest);
      return json(res, 201, guest);
    }

    const del = p.match(/^\/api\/guests\/([\w-]+)$/);
    if (del && req.method === 'DELETE') {
      if (!isAdmin(req)) return json(res, 401, { error: '관리자 키가 올바르지 않아요.' });
      const before = guests.length;
      guests = guests.filter(g => g.id !== del[1]);
      if (guests.length === before) return json(res, 404, { error: '없는 하객이에요.' });
      save();
      broadcast('remove', { id: del[1] });
      return json(res, 200, { ok: true });
    }

    if (p === '/api/admin/check' && req.method === 'GET') {
      return json(res, isAdmin(req) ? 200 : 401, { ok: !!isAdmin(req) });
    }

    if (p === '/api/events' && req.method === 'GET') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no'
      });
      res.write('retry: 3000\n\n');
      clients.add(res);
      req.on('close', () => clients.delete(res));
      return;
    }

    if (p.startsWith('/api/')) return json(res, 404, { error: 'not found' });

    // 정적 파일
    let file = path.normalize(path.join(PUBLIC, decodeURIComponent(p === '/' ? '/index.html' : p)));
    if (!file.startsWith(PUBLIC)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    fs.readFile(file, (err, buf) => {
      if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Not found'); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
      res.end(buf);
    });
  } catch (e) {
    console.error(e);
    json(res, 500, { error: '서버 오류' });
  }
});

server.listen(PORT, () => {
  const ip = lanAddress();
  console.log('');
  console.log('  💌 픽셀 방명록이 실행 중이에요');
  console.log('');
  console.log(`  식장 스크린   http://localhost:${PORT}/screen.html`);
  console.log(`  하객 입장     http://${ip}:${PORT}/guest.html   (같은 와이파이)`);
  console.log(`  관리자        http://localhost:${PORT}/admin.html`);
  console.log('');
  const k = adminKey();
  if (!k || k === 'change-me') {
    console.log('  ⚠ 관리자 키를 정해 주세요: secret.example.json 을 secret.json 으로 복사하고 adminKey 를 바꾸세요.');
  }
});
