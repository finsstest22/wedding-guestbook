/* 그림 부품 캐릭터 — 몸통 + 머리 + 눈·입·볼을 겹치고 머리색·피부색을 바꾼다.
   look = { v: 2, body, head, eyes, mouth, cheek, hair, skin } */
(function (global) {
  'use strict';

  const SKINS = [
    { id: 'fair', label: '밝은', hex: '#fde5d2' },
    { id: 'base', label: '기본', hex: '#fcd7b7' },
    { id: 'warm', label: '웜톤', hex: '#f0c096' },
    { id: 'tan', label: '태닝', hex: '#d9a06e' },
    { id: 'brown', label: '브라운', hex: '#b5774a' },
    { id: 'deep', label: '딥', hex: '#7f5232' }
  ];
  const HAIRS = [
    { id: 'black', label: '흑발', hex: '#262024' },
    { id: 'darkbrown', label: '흑갈색', hex: '#43302a' },
    { id: 'brown', label: '갈색', hex: '#6d3e36' },
    { id: 'light', label: '밝은 갈색', hex: '#9b6542' },
    { id: 'ash', label: '애쉬브라운', hex: '#7b6d66' },
    { id: 'blonde', label: '금발', hex: '#d8b06a' },
    { id: 'wine', label: '와인', hex: '#7c2c3d' },
    { id: 'pink', label: '핑크', hex: '#e59bb3' },
    { id: 'gray', label: '애쉬그레이', hex: '#a3a6ad' },
    { id: 'white', label: '백발', hex: '#e9e4dc' }
  ];

  let meta = null, ready = null;
  const imgs = new Map();
  const recolorCache = new Map();
  const composeCache = new Map();
  const bodyColor = new Map();
  const bodyBottom = new Map();
  let base = null; // 원본 그림의 피부색·머리색 (HSL)

  /* ---------- 색 ---------- */
  function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    return [h, s, l];
  }
  function hslToRgb(h, s, l) {
    if (!s) return [l * 255, l * 255, l * 255];
    const f = (p, q, t) => { if (t < 0) t++; if (t > 1) t--; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return [f(p, q, h + 1 / 3) * 255, f(p, q, h) * 255, f(p, q, h - 1 / 3) * 255];
  }
  const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;
  // 피부는 크림·베이지 옷보다 붉은 기가 강하다 (r-b 차이로 구분)
  const isSkinStrict = (r, g, b) => r > 200 && g > 150 && g < 235 && b > 120 && b < 215 && r - b > 50 && r - g > 22;
  const isSkinLoose = (r, g, b) => r > 170 && g > 105 && b > 75 && r - b > 45 && r >= g && g >= b;
  const isHair = (r, g, b) => r - b >= 20 && g < r * 0.85 && lum(r, g, b) > 40 && lum(r, g, b) < 175 && r < 205;

  /* ---------- 불러오기 ---------- */
  function loadImg(src) {
    return new Promise(res => {
      const im = new Image();
      im.onload = () => { imgs.set(src, im); res(im); };
      im.onerror = () => res(null);
      im.src = src;
    });
  }

  // light: 반려동물 그림만 받는다 (v3 부품이 있는 하객 휴대폰용 — 예전 부품 수백 장을 건너뜀)
  let readyLight = false;
  function load(opts = {}) {
    if (ready && !(readyLight && !opts.light)) return ready;
    readyLight = !!opts.light;
    ready = fetch('parts/parts.json').then(r => r.ok ? r.json() : null).then(async m => {
      if (!m || !m.body || !m.head) return null;
      if (opts.light) {
        await Promise.all((m.pets || []).map(p => loadImg(p.sit)));
        meta = m;
        return m;
      }
      const srcs = [...m.body, ...m.head, ...Object.values(m.face || {}).flat()].map(p => p.src)
        .concat(m.body.map(b => b.skin).filter(Boolean))
        .concat((m.pets || []).flatMap(p => [p.sit, ...Object.values(p.walk).flat()]))
        .concat(Object.values(m.walk || {}).flatMap(t => Object.values(t.dirs).flat().flatMap(f => [f.src, f.cls])))
        .concat(Object.values(m.walkHeads || {}).map(h => h.src));
      await Promise.all(srcs.map(loadImg));
      meta = m;
      measureBase();
      m.body.forEach(b => bodyColor.set(b.id, topColor(imgs.get(b.src))));
      // 하의(치마) 색: 몸통 가운데 아래쪽 (양말·신발이 섞이지 않게 위쪽 띠)
      // 하의(치마) 색: 몸통 가운데의 치마 윗부분 (아래쪽은 다리 살색이 섞임)
      // 치마 옷(원피스 틀)은 치마 윗부분, 바지 옷은 허벅지 높이에서 읽는다
      const SHORT_SKIRT = new Set(['pleats_f', 'vest_f', 'cardigan_f']);   // 무릎 위 치마: 아래는 다리·양말
      m.body.forEach(b => bodyBottom.set(b.id, DRESSY.has(b.id)
        ? (SHORT_SKIRT.has(b.id) ? regionColor(imgs.get(b.src), 0.47, 0.6, 0.3, 0.7) : regionColor(imgs.get(b.src), 0.55, 0.78, 0.2, 0.8, false))
        : regionColor(imgs.get(b.src), 0.62, 0.82, 0.25, 0.75)));
      measureTemplates();
      return m;
    }).catch(() => null);
    return ready;
  }

  function pixels(img) {
    const c = document.createElement('canvas');
    c.width = img.naturalWidth || img.width; c.height = img.naturalHeight || img.height;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.drawImage(img, 0, 0);
    return { c, x, d: x.getImageData(0, 0, c.width, c.height) };
  }

  function measureBase() {
    const { d } = pixels(imgs.get(meta.head[0].src));
    let sk = [0, 0, 0, 0], hr = [0, 0, 0, 0];
    for (let i = 0; i < d.data.length; i += 4) {
      const r = d.data[i], g = d.data[i + 1], b = d.data[i + 2];
      if (d.data[i + 3] < 200) continue;
      if (isSkinStrict(r, g, b)) { sk[0] += r; sk[1] += g; sk[2] += b; sk[3]++; }
      else if (isHair(r, g, b)) { hr[0] += r; hr[1] += g; hr[2] += b; hr[3]++; }
    }
    const avg = a => a[3] ? [a[0] / a[3], a[1] / a[3], a[2] / a[3]] : [252, 215, 183];
    base = { skin: rgbToHsl(...avg(sk)), hair: rgbToHsl(...avg(hr)) };
  }

  function dominant(data, w, h, test, keepSkin) {
    const buckets = new Map();
    for (let p = 0; p < w * h; p++) {
      const i = p * 4;
      if (data[i + 3] < 200 || !test(p)) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if ((!keepSkin && isSkinStrict(r, g, b)) || lum(r, g, b) < 30) continue;
      const k = (r >> 4) << 8 | (g >> 4) << 4 | (b >> 4);
      const e = buckets.get(k) || [0, 0, 0, 0];
      e[0] += r; e[1] += g; e[2] += b; e[3]++;
      buckets.set(k, e);
    }
    let best = null;
    for (const e of buckets.values()) if (!best || e[3] > best[3]) best = e;
    return best ? [best[0] / best[3], best[1] / best[3], best[2] / best[3]] : [128, 128, 128];
  }

  function regionColor(img, y0, y1, x0 = 0.2, x1 = 0.8, keepSkin = true) {
    if (!img) return [128, 128, 128];
    const { d, c } = pixels(img);
    const w = c.width;
    // 크림·베이지 옷은 피부와 같은 색이라 피부를 빼지 않는다 (손은 면적이 작아 영향 없음)
    return dominant(d.data, w, c.height, p => {
      const x = p % w, y = (p / w) | 0;
      return y >= c.height * y0 && y < c.height * y1 && x >= w * x0 && x < w * x1;
    }, keepSkin);
  }

  // 상의 색: 몸통 위쪽 (가운데 셔츠보다 넓게 → 자켓·코트 색이 이김)
  function topColor(img) { return regionColor(img, 0.08, 0.42, 0.08, 0.92); }

  // 걷기 틀의 기준 색 (영역 지도별 가장 많은 색)
  const tplBase = {};
  function measureTemplates() {
    for (const [t, T] of Object.entries(meta.walk || {})) {
      const fr = T.dirs.down[0];
      const im = imgs.get(fr.src), cl = imgs.get(fr.cls);
      if (!im || !cl) continue;
      const { d, c } = pixels(im);
      const m = pixels(cl).d.data;
      tplBase[t] = {
        top: rgbToHsl(...dominant(d.data, c.width, c.height, p => m[p * 4] > 128)),
        bottom: rgbToHsl(...dominant(d.data, c.width, c.height, p => m[p * 4 + 1] > 128))
      };
    }
  }

  /* ---------- 색 바꾸기 ---------- */
  function shift(data, i, from, toHex, squeeze) {
    if (squeeze) {
      // 옷 칠하기: 바꿀 색에 원래 명암 비율을 곱한다 (밝은 옷이 주황빛으로 뜨거나, 어두운 옷에 무늬가 얼룩지지 않게)
      const [, , l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
      let f = l / Math.max(0.05, from[2]);
      f = Math.max(0.3, Math.min(1.12, 1 + (f - 1) * 0.85));
      const t = hexToRgb(toHex);
      data[i] = Math.min(255, t[0] * f); data[i + 1] = Math.min(255, t[1] * f); data[i + 2] = Math.min(255, t[2] * f);
      return;
    }
    const [th, ts, tl] = rgbToHsl(...hexToRgb(toHex));
    const [, , l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
    const dl = l - from[2];
    const nl = Math.max(0, Math.min(1, tl + dl));
    const [r, g, b] = hslToRgb(th, ts, nl);
    data[i] = r; data[i + 1] = g; data[i + 2] = b;
  }

  // 피부: 확실한 피부 픽셀에서 시작해 비슷한 색(그림자)으로 번져 나간다 → 베이지 옷은 잘 안 건드림
  function skinMask(d, w, h) {
    const m = new Uint8Array(w * h), q = [];
    for (let p = 0; p < w * h; p++) {
      const i = p * 4;
      if (d[i + 3] > 200 && isSkinStrict(d[i], d[i + 1], d[i + 2])) { m[p] = 1; q.push(p); }
    }
    while (q.length) {
      const p = q.pop(), x = p % w, y = (p / w) | 0, i = p * 4;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const n = ny * w + nx, j = n * 4;
        if (m[n] || d[j + 3] < 200 || !isSkinLoose(d[j], d[j + 1], d[j + 2])) continue;
        if (Math.abs(d[j] - d[i]) + Math.abs(d[j + 1] - d[i + 1]) + Math.abs(d[j + 2] - d[i + 2]) > 45) continue;
        m[n] = 1; q.push(n);
      }
    }
    return m;
  }

  // maskSrc: 몸통의 피부 위치 지도 (베이지 옷과 피부가 같은 색이라 위치로 구분)
  function recolored(src, skinHex, hairHex, maskSrc) {
    const key = src + '|' + skinHex + '|' + (hairHex || '');
    if (recolorCache.has(key)) return recolorCache.get(key);
    const img = imgs.get(src);
    if (!img) return null;
    const { c, x, d } = pixels(img);
    const data = d.data, w = c.width, h = c.height;
    let sm = null;
    if (skinHex && skinHex !== SKINS[1].hex) {
      const mi = maskSrc && imgs.get(maskSrc);
      if (mi) {
        const md = pixels(mi).d.data;
        sm = new Uint8Array(w * h);
        for (let p = 0; p < w * h; p++) sm[p] = md[p * 4] > 128 ? 1 : 0;
      } else sm = skinMask(data, w, h);
    }
    for (let p = 0; p < w * h; p++) {
      const i = p * 4;
      if (data[i + 3] < 40) continue;
      if (sm && sm[p]) shift(data, i, base.skin, skinHex);
      else if (hairHex && isHair(data[i], data[i + 1], data[i + 2])) shift(data, i, base.hair, hairHex);
    }
    x.putImageData(d, 0, 0);
    recolorCache.set(key, c);
    return c;
  }

  /* ---------- 조합 ---------- */
  const find = (list, id) => (list || []).find(p => p.id === id);

  function normalize(look) {
    if (v3 && (!look || look.v === 3)) return normalizeV3(look);
    const l = look || {};
    const m = meta;
    const body = find(m.body, l.body) || m.body[0];
    const head = find(m.head, l.head) || m.head[0];
    return {
      v: 2, body: body.id, head: head.id,
      eyes: (find(m.face.eyes, l.eyes) || m.face.eyes[0]).id,
      mouth: (find(m.face.mouth, l.mouth) || m.face.mouth[0]).id,
      cheek: find(m.face.cheek, l.cheek) ? l.cheek : '',
      hair: HAIRS.some(c => c.hex === l.hair) ? l.hair : HAIRS[2].hex,
      skin: SKINS.some(c => c.hex === l.skin) ? l.skin : SKINS[1].hex,
      pet: (m.pets || []).some(p => p.id === l.pet) ? l.pet : ''
    };
  }

  /* ---------- 반려동물 ---------- */
  const findPet = id => meta && (meta.pets || []).find(p => p.id === id);
  function petSit(id) { const p = findPet(id); return p ? imgs.get(p.sit) : null; }
  function petFrame(id, dir, i) {
    const p = findPet(id);
    if (!p) return null;
    const list = p.walk[dir] || p.walk.down;
    return imgs.get(list[i % list.length]);
  }
  function petFrameCount(id, dir) { const p = findPet(id); return p ? (p.walk[dir] || p.walk.down).length : 1; }

  // 원본 크기(몸통 시트 픽셀)로 그린 캔버스. 발끝이 맨 아래, 목이 기준.
  function compose(look) {
    if (look && look.v === 3) return stillV3(look);
    if (!meta) return null;
    const l = normalize(look);
    const key = JSON.stringify(l);
    if (composeCache.has(key)) return composeCache.get(key);
    const body = find(meta.body, l.body), head = find(meta.head, l.head);
    const FW = meta.bodyFaceW, k = FW / head.face.fw;
    const bImg = recolored(body.src, l.skin, null, body.skin);
    const hImg = recolored(head.src, l.skin, l.hair);
    if (!bImg || !hImg) return null;
    const hw = hImg.width * k, hh = hImg.height * k;
    // 목 위치를 (0,0)으로 둔 좌표
    const bx = -body.neck[0], by = -body.neck[1];
    const hx = -head.face.cx * k, hy = -head.face.chin * k;
    const x0 = Math.floor(Math.min(bx, hx)), y0 = Math.floor(Math.min(by, hy));
    const x1 = Math.ceil(Math.max(bx + bImg.width, hx + hw)), y1 = Math.ceil(by + bImg.height);
    const c = document.createElement('canvas');
    c.width = x1 - x0; c.height = y1 - y0;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    // 목: 몸통 그림의 목이 비어 있어도 배경이 비치지 않게 피부색으로 먼저 깐다
    const [sh, ss, sl] = rgbToHsl(...hexToRgb(l.skin));
    const [nr, ng, nb] = hslToRgb(sh, ss, Math.max(0, sl - 0.06));
    ctx.fillStyle = `rgb(${nr | 0},${ng | 0},${nb | 0})`;
    ctx.fillRect(-x0 - FW * 0.16, -y0 - FW * 0.25, FW * 0.32, FW * 0.42);
    ctx.drawImage(bImg, bx - x0, by - y0);
    ctx.drawImage(hImg, hx - x0, hy - y0, hw, hh);
    for (const [cat, id] of [['cheek', l.cheek], ['eyes', l.eyes], ['mouth', l.mouth]]) {
      const p = find(meta.face[cat], id);
      if (!p) continue;
      const im = imgs.get(p.src);
      if (!im) continue;
      const w = p.w * FW;
      ctx.drawImage(im, p.x * FW - x0, p.y * FW - y0, w, im.naturalHeight * w / im.naturalWidth);
    }
    c.neck = { x: -x0, y: -y0 };
    c.headTop = hy - y0;
    if (composeCache.size > 600) composeCache.clear();
    composeCache.set(key, c);
    return c;
  }

  /* ---------- 머리만 (걷기용) ---------- */
  // 몸통 단위로 그린 머리 + 얼굴. anchor = 턱 가운데
  const headCache = new Map();
  // view: 'front' | 'side'(왼쪽 보기) | 'back'
  function composeHead(look, view = 'front') {
    if (!meta) return null;
    const l = normalize(look);
    const head = find(meta.head, l.head);
    const key = view + '|' + [l.head, l.hair, l.skin, l.eyes, l.mouth, l.cheek].join('|');
    if (headCache.has(key)) return headCache.get(key);
    let c;
    const wh = view !== 'front' && meta.walkHeads && meta.walkHeads[(head.walk || 'short') + '_' + view];
    if (view === 'back' && wh && head.walk !== 'long') {
      // 짧은 머리: 고른 머리 모양 그대로 + 뒤통수 머리결
      c = backHead(l, head, meta.walkHeads.short_back || wh);
      if (!c) return null;
    } else if (wh) {
      // 걷기 시트의 옆·뒷모습 머리 (몸통과 같은 크기 단위)
      const img = recolored(wh.src, l.skin, l.hair);
      if (!img) return null;
      c = document.createElement('canvas');
      c.width = img.width; c.height = img.height;
      c.getContext('2d').drawImage(img, 0, 0);
      c.anchor = { x: wh.anchor[0], y: wh.anchor[1] };
    } else {
      const FW = meta.bodyFaceW, k = FW / head.face.fw;
      const hImg = recolored(head.src, l.skin, l.hair);
      if (!hImg) return null;
      c = document.createElement('canvas');
      c.width = Math.ceil(hImg.width * k); c.height = Math.ceil(hImg.height * k);
      const ctx = c.getContext('2d');
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(hImg, 0, 0, c.width, c.height);
      const ax = head.face.cx * k, ay = head.face.chin * k;
      for (const [cat, id] of [['cheek', l.cheek], ['eyes', l.eyes], ['mouth', l.mouth]]) {
        const p = find(meta.face[cat], id);
        const im = p && imgs.get(p.src);
        if (!im) continue;
        const w = p.w * FW;
        ctx.drawImage(im, ax + p.x * FW, ay + p.y * FW, w, im.naturalHeight * w / im.naturalWidth);
      }
      c.anchor = { x: ax, y: ay };
    }
    if (headCache.size > 800) headCache.clear();
    headCache.set(key, c);
    return c;
  }

  // 뒷모습: 고른 머리의 외곽선(정면 실루엣) 그대로 + 안쪽은 걷기 시트 뒤통수의 머리결
  // → 정면에서 고른 머리 모양·크기가 뒤돌아도 유지된다
  function backHead(l, head, wh) {
    const FW = meta.bodyFaceW, k = FW / head.face.fw;
    const front = recolored(head.src, l.skin, l.hair);
    const tex = recolored(wh.src, l.skin, l.hair);
    if (!front || !tex) return null;
    const W = Math.ceil(front.width * k), H = Math.ceil(front.height * k);
    const ax = head.face.cx * k, ay = head.face.chin * k;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(front, 0, 0, W, H);
    const fd = ctx.getImageData(0, 0, W, H);
    // 뒤통수 머리결: 머리카락 부분의 가로폭을 실루엣 폭에 맞춰서
    const td = pixels(tex).d.data, tw = tex.width, th = tex.height;
    let tx0 = tw, tx1 = 0, ty0 = th;
    for (let y = 0; y < th; y++) for (let x = 0; x < tw; x++) {
      if (td[(y * tw + x) * 4 + 3] > 40 && y < wh.anchor[1]) { tx0 = Math.min(tx0, x); tx1 = Math.max(tx1, x); ty0 = Math.min(ty0, y); }
    }
    let sx0 = W, sx1 = 0, sy0 = H;
    const a = fd.data;
    for (let y = 0; y < ay; y++) for (let x = 0; x < W; x++) {
      if (a[(y * W + x) * 4 + 3] > 40) { sx0 = Math.min(sx0, x); sx1 = Math.max(sx1, x); sy0 = Math.min(sy0, y); }
    }
    const sc = (sx1 - sx0 + 1) / Math.max(1, tx1 - tx0 + 1);
    const tcx = (tx0 + tx1) / 2, scx = (sx0 + sx1) / 2;
    const out = ctx.createImageData(W, H), o = out.data;
    const earHalf = FW * 0.53;
    const hairRGB = hexToRgb(l.hair);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (a[i + 3] <= 40) continue;
      const fr = a[i], fg = a[i + 1], fb = a[i + 2];
      // 귀: 얼굴 양옆 바깥의 피부는 그대로 (뒤에서도 보임)
      if (Math.abs(x - ax) > earHalf && y > ay - FW * 0.55 && isSkinStrict(fr, fg, fb)) {
        o[i] = fr; o[i + 1] = fg; o[i + 2] = fb; o[i + 3] = a[i + 3];
        continue;
      }
      // 실루엣 테두리(투명과 맞닿은 픽셀)는 원래 외곽선 유지
      const edge = x === 0 || y === 0 || x === W - 1 || y === H - 1 ||
        a[i - 4 + 3] <= 40 || a[i + 4 + 3] <= 40 || a[i - W * 4 + 3] <= 40 || a[i + W * 4 + 3] <= 40;
      if (edge && lum(fr, fg, fb) < 70) { o[i] = fr; o[i + 1] = fg; o[i + 2] = fb; o[i + 3] = 255; continue; }
      // 안쪽: 뒤통수 텍스처를 실루엣 위쪽에 맞춰 늘려 붙임 (아래쪽은 마지막 줄 반복)
      let tx = Math.round(tcx + (x - scx) / sc), ty = Math.round(ty0 + (y - sy0) / sc);
      tx = Math.max(tx0, Math.min(tx1, tx));
      ty = Math.min(ty, Math.round(wh.anchor[1]) - 16);
      let j = (ty * tw + tx) * 4;
      // 텍스처 밖이면 가운데 쪽으로 당겨서 찾기
      for (let s = 0; s < 12 && td[j + 3] <= 40; s++) { tx += tx < tcx ? 1 : -1; j = (ty * tw + tx) * 4; }
      // 턱 아래(어깨로 흘러내린 긴 머리)는 원래 머리카락 그대로
      if (y > ay - 2 && !isSkinStrict(fr, fg, fb)) { o[i] = fr; o[i + 1] = fg; o[i + 2] = fb; o[i + 3] = a[i + 3]; continue; }
      if (td[j + 3] > 40 && !isSkinStrict(td[j], td[j + 1], td[j + 2]) && lum(td[j], td[j + 1], td[j + 2]) < 170) {
        o[i] = td[j]; o[i + 1] = td[j + 1]; o[i + 2] = td[j + 2];
      } else { o[i] = hairRGB[0] * 0.8; o[i + 1] = hairRGB[1] * 0.8; o[i + 2] = hairRGB[2] * 0.8; }
      o[i + 3] = 255;
    }
    ctx.putImageData(out, 0, 0);
    c.anchor = { x: ax, y: ay };
    return c;
  }

  /* ---------- 걷기 몸통 (걷기 시트 틀을 하객 옷 색으로 칠함) ---------- */
  // 치마·원피스·한복(여)은 원피스 틀, 나머지는 셔츠+바지 틀
  const DRESSY = new Set(['pleats_f', 'cardigan_f', 'vest_f', 'dress_f', 'flower_f', 'blackdress_f', 'bluedress_f',
    'hanbok_f', 'hanbokp_f', 'hanbokt_f', 'coat_f']);
  const walkCache = new Map();
  const toHex = c => '#' + c.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');

  function walkTemplate(bodyId) {
    if (!meta || !meta.walk) return null;
    return DRESSY.has(bodyId) ? 'f' : 'm';
  }

  function walkBody(look, dir, i) {
    const l = normalize(look);
    const tpl = walkTemplate(l.body);
    if (!tpl) return null;
    const T = meta.walk[tpl];
    const list = T.dirs[dir] || T.dirs.down;
    const fr = list[((i % list.length) + list.length) % list.length];
    const top = bodyColor.get(l.body);      // 상의 (원피스 틀도 허리 위는 상의 색)
    const bottom = bodyBottom.get(l.body);
    const key = fr.src + '|' + l.body + '|' + l.skin;
    if (walkCache.has(key)) { const v = walkCache.get(key); walkCache.delete(key); walkCache.set(key, v); return v; }
    const img = imgs.get(fr.src), cls = imgs.get(fr.cls);
    if (!img || !cls) return null;
    const { c, x, d } = pixels(img);
    const m = pixels(cls).d.data, a = d.data;
    const baseTop = (tplBase[tpl] || {}).top || rgbToHsl(...T.top);
    const baseBot = (tplBase[tpl] || {}).bottom || rgbToHsl(...T.bottom);
    const topHex = toHex(top), botHex = toHex(bottom);
    const recolorSkin = l.skin !== SKINS[1].hex;
    for (let p = 0; p < a.length; p += 4) {
      if (a[p + 3] < 40) continue;
      if (m[p] > 128) shift(a, p, baseTop, topHex, true);
      else if (m[p + 1] > 128) shift(a, p, baseBot, botHex, true);
      else if (m[p + 2] > 128 && recolorSkin) shift(a, p, base.skin, l.skin);
    }
    x.putImageData(d, 0, 0);
    c.neck = { x: fr.neck[0], y: fr.neck[1] };
    walkCache.set(key, c);
    while (walkCache.size > 1500) walkCache.delete(walkCache.keys().next().value);
    return c;
  }

  /* ---------- 사진 색 → 가장 비슷한 조합 ---------- */
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  function nearest(list, rgb) {
    let best = list[0], bd = Infinity;
    for (const c of list) { const d = dist(hexToRgb(c.hex), rgb); if (d < bd) { bd = d; best = c; } }
    return best;
  }

  function fromPhoto(colors) {
    if (v3) return fromPhotoV3(colors);
    const m = meta;
    const sex = colors && colors.longHair ? 'f' : 'm';
    const top = colors && colors.top ? hexToRgb(colors.top) : null;
    let body = m.body.find(b => b.sex === sex);
    if (top) {
      let bd = Infinity;
      for (const b of m.body) {
        if (b.sex !== sex) continue;
        const d = dist(bodyColor.get(b.id), top);
        if (d < bd) { bd = d; body = b; }
      }
    }
    const fHeads = m.head.filter(h => h.sex === 'f');
    return normalize({
      body: body.id,
      head: sex === 'f' && fHeads.length ? (fHeads.find(h => h.id === 'long') || fHeads[0]).id : 'base_m',
      eyes: 'round', mouth: 'smile', cheek: 'blush',
      skin: colors && colors.skin ? nearest(SKINS, hexToRgb(colors.skin)).hex : SKINS[1].hex,
      hair: colors && colors.hair ? nearest(HAIRS.slice(0, 7), hexToRgb(colors.hair)).hex : HAIRS[1].hex
    });
  }

  function random(seed) {
    if (v3) return randomV3(seed);
    let s = (seed >>> 0) || (Math.random() * 1e9) >>> 0;
    const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    const pick = a => a[Math.floor(r() * a.length)];
    const m = meta;
    const body = pick(m.body);
    const fHeads = m.head.filter(h => h.sex === 'f');
    const head = body.sex === 'f' && fHeads.length ? pick(fHeads).id : 'base_m';
    return normalize({
      body: body.id, head, eyes: pick(m.face.eyes).id, mouth: pick(m.face.mouth).id,
      cheek: r() < 0.5 ? pick(m.face.cheek).id : '',
      skin: pick(SKINS.slice(0, 5)).hex, hair: r() < 0.8 ? pick(HAIRS.slice(0, 5)).hex : pick(HAIRS).hex,
      pet: (m.pets || []).length && r() < 0.25 ? pick(m.pets).id : ''
    });
  }

  /* ---------- v3: 기준 시트 방식 (옷·머리마다 3방향×4걸음 그림) ---------- */
  // look = { v: 3, outfit, hair, hairColor, face | (eyes, brows, mouth, cheek), pet }
  let v3 = null, v3ready = null;
  const v3cache = new Map();
  // stillOnly: 처음엔 앞모습 첫 장면(꾸미기 화면 그림)만 받고, 걸음 그림은 쓸 때 받는다
  function loadV3(opts = {}) {
    if (v3ready) return v3ready;
    // 부품 묶음: 기본은 v5(신랑·신부 그림체), 없으면 v2. 주소에 ?parts=v2 처럼 골라 볼 수 있음
    const want = (new URLSearchParams(location.search).get('parts') || '').replace(/[^a-z0-9]/gi, '');
    const fetchSet = set => fetch(`parts/${set}/v2.json`).then(r => r.ok ? r.json() : null).catch(() => null)
      .then(m => (m && Object.keys(m.outfit || {}).length && Object.keys(m.hair || {}).length) ? m : null);
    const sets = want ? [want] : ['v5', 'v2'];
    const pickSet = sets.reduce((p, s) => p.then(m => m || fetchSet(s)), Promise.resolve(null));
    v3ready = Promise.all([load({ light: !!opts.stillOnly }), pickSet])
      .then(async ([, m]) => {
        if (!m) {
          // v3 부품이 없으면 예전 방식 → 예전 부품 전부 필요
          if (opts.stillOnly) await load();
          return null;
        }
        const srcs = [];
        for (const kind of ['outfit', 'hair', 'side', ...FACE_KINDS]) for (const v of Object.values(m[kind] || {})) {
          if (opts.stillOnly) { if (v.down) srcs.push(v.down[0]); continue; }
          for (const list of Object.values(v)) srcs.push(...list);
        }
        await Promise.all(srcs.map(loadImg));
        // 머리카락 기준색
        const any = imgs.get(Object.values(m.hair)[0].down[0]);
        const { d } = pixels(any);
        const acc = [0, 0, 0, 0];
        for (let i = 0; i < d.data.length; i += 4) {
          if (d.data[i + 3] < 200 || !isHair(d.data[i], d.data[i + 1], d.data[i + 2])) continue;
          acc[0] += d.data[i]; acc[1] += d.data[i + 1]; acc[2] += d.data[i + 2]; acc[3]++;
        }
        m.hairBase = rgbToHsl(acc[0] / acc[3], acc[1] / acc[3], acc[2] / acc[3]);
        v3 = m;
        return m;
      });
    return v3ready;
  }

  function hairLayer(src, hex) {
    const key = src + '|' + hex;
    if (v3cache.has(key)) return v3cache.get(key);
    const { c, x, d } = pixels(imgs.get(src));
    const a = d.data;
    for (let i = 0; i < a.length; i += 4) {
      if (a[i + 3] < 40 || lum(a[i], a[i + 1], a[i + 2]) < 45) continue;   // 외곽선은 그대로
      shift(a, i, v3.hairBase, hex);
    }
    x.putImageData(d, 0, 0);
    v3cache.set(key, c);
    return c;
  }

  // 한 장면(방향·걸음)의 완성 그림. foot = 발끝 가운데 좌표
  // 아직 안 받은 그림은 그때 받는다 (하객 휴대폰은 처음에 앞모습만 받음)
  const pending = new Set();
  function want(src) {
    if (imgs.has(src) || pending.has(src)) return;
    pending.add(src);
    loadImg(src).then(() => pending.delete(src));
  }

  function composeV3(look, dir, frame) {
    if (!v3) return null;
    const d = dir === 'up' ? 'up' : (dir === 'left' || dir === 'right') ? 'left' : 'down';
    const f = ((frame % 4) + 4) % 4;
    const outfit = v3.outfit[look.outfit] || Object.values(v3.outfit)[0];
    const hair = v3.hair[look.hair] || Object.values(v3.hair)[0];
    const hairHex = look.hairColor || HAIRS[2].hex;
    const key = ['v3', look.outfit, look.hair, hairHex, ...FACE_KINDS.map(k => look[k]), d, f].join('|');
    if (v3cache.has(key)) return v3cache.get(key);
    // 겹칠 그림 목록 (아래부터)
    const layers = [outfit[d][f]];
    if (d === 'down') {
      if (hasLayers()) {
        // 볼 → 눈 → 눈썹 → 입 순서로 겹친다
        for (const k of ['cheek', 'eyes', 'brows', 'mouth']) {
          const p = v3[k] && v3[k][look[k]];
          if (p) layers.push(p.down[f]);
        }
      } else {
        const face = v3.face && (v3.face[look.face] || Object.values(v3.face)[0]);
        if (face) layers.push(face.down[f]);
      }
    }
    // 옆모습 얼굴: 눈 시트의 옆눈(어색한 눈은 다른 눈의 옆눈), 없으면 옆얼굴 묶음
    if (d === 'left') {
      const eye = v3.eyes && (v3.eyes[SIDE_EYE_FROM[look.eyes]] || v3.eyes[look.eyes]);
      if (eye && eye.left) layers.push(eye.left[f]);
      else {
        const side = v3.side && (v3.side[SIDE_OF[look.eyes] || 'open'] || v3.side.open || Object.values(v3.side)[0]);
        if (side) layers.push(side.left[f]);
      }
    }
    const hairSrc = hair[d][f];
    const missing = [...layers, hairSrc].filter(src => !imgs.has(src));
    if (missing.length) {
      missing.forEach(want);
      // 받는 동안은 앞모습 첫 장면으로 대신 (그것도 없으면 안 그림)
      return d === 'down' && f === 0 ? null : composeV3(look, 'down', 0);
    }
    const [W, H] = v3.cell;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    for (const src of layers) ctx.drawImage(imgs.get(src), 0, 0);
    ctx.drawImage(hairLayer(hairSrc, hairHex), 0, 0);
    c.foot = { x: W / 2, y: v3.foot };
    if (v3cache.size > 3000) v3cache.clear();
    v3cache.set(key, c);
    return c;
  }


  const FACE_KINDS = ['face', 'eyes', 'brows', 'mouth', 'cheek'];
  // 앞모습 눈 → 옆모습 얼굴 묶음 (나머지는 뜬 눈 open)
  const SIDE_OF = { thin: 'half', sleepy: 'half', smile: 'closed', dot: 'dot' };
  // 옆눈이 어색한 눈은 다른 눈의 옆눈을 빌려 쓴다
  const SIDE_EYE_FROM = { smile: 'double', cat: 'double' };
  // 얼굴을 눈·눈썹·입·볼로 나눠 조합하는 묶음인지
  const hasLayers = () => !!(v3 && v3.eyes && Object.keys(v3.eyes).length);
  // v5 부품 이름표 (종류:이름 → 이름표 또는 [이름표, 성별])
  const V5_LABELS = {
    'outfit:suit': '정장', 'outfit:shirt': '셔츠', 'outfit:knit': '니트', 'outfit:blouse': '블라우스', 'outfit:slacks': '슬랙스',
    'outfit:jeans': '청바지', 'outfit:pleats': '플리츠스커트', 'outfit:jacket': '자켓', 'outfit:cardigan': '가디건',
    'outfit:hoodie': '후드티', 'outfit:tshirt': '티셔츠', 'outfit:vest': '니트조끼', 'outfit:coat': '코트', 'outfit:overall': '오버롤',
    'outfit:onepiece': '원피스', 'outfit:flower': '플라워 원피스', 'outfit:black': '블랙 원피스', 'outfit:blue': '블루 원피스',
    'outfit:hanbok': '한복', 'outfit:hanbok2': '혼주 한복', 'outfit:hanbok3': '트렌디 한복',
    // 원본에서 원피스·치마와 짝지어진 남자 옷은 따로 이름
    'outfit:blouse_m': ['하늘색 셔츠', 'm'], 'outfit:pleats_m': ['네이비 조끼', 'm'], 'outfit:onepiece_m': ['블랙 셔츠', 'm'],
    'outfit:flower_m': ['화이트 셔츠', 'm'], 'outfit:black_m': ['블랙 셔츠+아이보리', 'm'], 'outfit:blue_m': ['하늘 셔츠+네이비', 'm'],
    'hair:twoblock': ['투블럭', 'm'], 'hair:comma': ['쉼표머리', 'm'], 'hair:perm': ['펌', 'm'], 'hair:downperm': ['다운펌', 'm'],
    'hair:pomade': ['포마드', 'm'], 'hair:dandy': ['댄디컷', 'm'], 'hair:swallow': ['스왈로펌', 'm'], 'hair:leaf': ['리프컷', 'm'],
    'hair:crop': ['크롭컷', 'm'], 'hair:slick': ['뒷머리 넘김', 'm'], 'hair:up_m': ['올림머리', 'm'], 'hair:parted': ['가르마펌', 'm'],
    'hair:spike': ['스파이크컷', 'm'], 'hair:asperm': ['애즈펌', 'm'], 'hair:shaggy': ['샤기컷', 'm'],
    'hair:twoblock_f': ['숏 투블럭', 'f'], 'hair:comma_f': ['쉼표 단발', 'f'], 'hair:perm_f': ['여자 펌', 'f'], 'hair:bob': ['단발', 'f'],
    'hair:ponytail': ['포니테일', 'f'], 'hair:bun': ['똥머리', 'f'], 'hair:twin': ['양갈래', 'f'], 'hair:long': ['긴 생머리', 'f'],
    'hair:wave': ['웨이브', 'f'], 'hair:halfup': ['반묶음', 'f'], 'hair:updo': ['올림머리', 'f'], 'hair:sidetail': ['사이드 포니', 'f'],
    'hair:chignon': ['시뇽', 'f'], 'hair:bobwave': ['단발 웨이브', 'f'], 'hair:halter': ['헬터 헤어', 'f'],
    'eyes:round': '동그란 눈', 'eyes:droopy': '처진 눈', 'eyes:cat': '캣아이', 'eyes:thin': '가는 눈', 'eyes:sparkle': '반짝 눈',
    'eyes:double': '쌍꺼풀', 'eyes:lash': '긴 속눈썹', 'eyes:dot': '점 눈', 'eyes:sleepy': '졸린 눈', 'eyes:smile': '웃는 눈',
    'eyes:mole': '눈물점',
    'brows:straight': '일자', 'brows:arch': '아치형', 'brows:thick': '진한', 'brows:thin': '얇은', 'brows:droopy': '처진', 'brows:angled': '각진',
    'mouth:smile': '미소', 'mouth:grin': '활짝', 'mouth:flat': '무표정', 'mouth:cat': '고양이 입', 'mouth:open': '살짝 벌림',
    'mouth:teeth': '이빨 보이기', 'mouth:pout': '삐죽',
    'cheek:blush': '연한 볼터치', 'cheek:blush2': '진한 볼터치', 'cheek:freckle': '주근깨', 'cheek:mole': '점'
  };
  const V3_LABELS = {
    suit: ['정장', 'm'], shirt: ['셔츠', 'm'], knit: ['니트', 'm'], hoodie: ['후드티', 'm'], denim: ['청자켓', 'm'],
    hanbok_m: ['남자 한복', 'm'], hanbok_f: ['여자 한복', 'f'], dress_blue: ['블루 원피스', 'f'],
    dress_floral: ['꽃무늬 원피스', 'f'], dress_black: ['블랙 원피스', 'f'], blouse_skirt: ['블라우스+치마', 'f'],
    cardigan_skirt: ['가디건+치마', 'f'],
    twoblock: ['투블럭', 'm'], comma: ['쉼표머리', 'm'], perm: ['펌', 'm'], pomade: ['포마드', 'm'], dandy: ['댄디컷', 'm'],
    crop: ['크롭컷', 'm'], wolf: ['울프컷', 'm'], buzz: ['반삭', 'm'], long: ['긴 생머리', 'f'], bob: ['단발', 'f'],
    wave: ['웨이브', 'f'], ponytail: ['포니테일', 'f'], bun: ['똥머리', 'f'], twin: ['양갈래', 'f'], short_f: ['숏컷', 'f'],
    halfup: ['반묶음', 'f'], smile: ['미소', ''], cat: ['고양이 입', ''], closed: ['눈웃음', ''], soft: ['또렷한 눈', ''], lash: ['속눈썹', ''], soft_closed: ['살짝 웃음', '']
  };
  function v3label(kind, id) {
    let l = V5_LABELS[kind + ':' + id];
    if (kind === 'outfit' && !Array.isArray(l)) {
      // outfit__suit_m / _f → 이름표 + 성별
      const m = /^(.*)_([mf])$/.exec(id);
      if (m && V5_LABELS['outfit:' + m[1]]) return { label: V5_LABELS['outfit:' + m[1]], sex: m[2] };
    }
    if (l) return Array.isArray(l) ? { label: l[0], sex: l[1] } : { label: l, sex: '' };
    l = V3_LABELS[id] || [id];
    return { label: l[0], sex: l[1] || '' };
  }
  const v3list = kind => Object.keys((v3 && v3[kind]) || {}).map(id => ({ id, ...v3label(kind, id) }));

  function normalizeV3(look) {
    const l = look || {};
    const pick = (kind, id, def) => (v3[kind] && v3[kind][id]) ? id : (v3[kind] && v3[kind][def]) ? def : Object.keys(v3[kind] || { '': 1 })[0];
    const faces = hasLayers()
      ? { eyes: pick('eyes', l.eyes, 'round'), brows: pick('brows', l.brows, 'straight'), mouth: pick('mouth', l.mouth, 'smile'),
          cheek: l.cheek === '' ? '' : pick('cheek', l.cheek, 'blush') }
      : { face: pick('face', l.face) };
    return {
      v: 3, outfit: pick('outfit', l.outfit), hair: pick('hair', l.hair), ...faces,
      hairColor: HAIRS.some(c => c.hex === l.hairColor) ? l.hairColor : HAIRS[2].hex,
      pet: meta && (meta.pets || []).some(p => p.id === l.pet) ? l.pet : ''
    };
  }

  // 꾸미기 화면용 정지 그림 (앞모습, 여백 잘라냄). neck/headTop 은 썸네일 자르기에 사용
  function stillV3(look) {
    const full = composeV3(look, 'down', 0);
    if (!full) return null;
    if (full.still) return full.still;
    const { d } = pixels(full);
    let x0 = full.width, y0 = full.height, x1 = 0, y1 = 0;
    for (let y = 0; y < full.height; y++) for (let x = 0; x < full.width; x++) {
      if (d.data[(y * full.width + x) * 4 + 3] > 40) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    }
    const c = document.createElement('canvas');
    c.width = x1 - x0 + 1; c.height = y1 - y0 + 1;
    c.getContext('2d').drawImage(full, -x0, -y0);
    c.neck = { x: v3.faceFrame.cx - x0, y: v3.faceFrame.chin - y0 };
    c.headTop = 0;
    full.still = c;
    return c;
  }

  function fromPhotoV3(colors) {
    const sex = colors && colors.longHair ? 'f' : 'm';
    const outs = v3list('outfit').filter(o => o.sex === sex);
    return normalizeV3({
      outfit: (outs[Math.floor(Math.random() * outs.length)] || {}).id,
      hair: sex === 'f' ? 'long' : 'dandy', face: 'smile',
      hairColor: colors && colors.hair ? nearest(HAIRS.slice(0, 7), hexToRgb(colors.hair)).hex : HAIRS[1].hex
    });
  }

  function randomV3(seed) {
    let s = (seed >>> 0) || (Math.random() * 1e9) >>> 0;
    const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    const pick = a => a[Math.floor(r() * a.length)];
    return {
      // 데모·무작위: 옷과 머리 성별을 대체로 맞춘다
      ...(() => {
        const o = pick(v3list('outfit')); const sex = o.sex;
        const hs = v3list('hair').filter(h => r() < 0.12 || h.sex === sex);
        return { outfit: o.id, hair: pick(hs.length ? hs : v3list('hair')).id };
      })(),
      v: 3,
      hairColor: r() < 0.8 ? pick(HAIRS.slice(0, 5)).hex : pick(HAIRS).hex,
      ...(hasLayers()
        ? { eyes: pick(Object.keys(v3.eyes)), brows: pick(Object.keys(v3.brows || { '': 1 })),
            mouth: pick(Object.keys(v3.mouth || { '': 1 })), cheek: r() < 0.6 ? pick(Object.keys(v3.cheek || { '': 1 })) : '' }
        : { face: pick(Object.keys(v3.face || { smile: 1 })) }),
      pet: (meta && meta.pets || []).length && r() < 0.25 ? pick(meta.pets).id : ''
    };
  }

  global.Avatar = {
    loadV3, composeV3, randomV3, normalizeV3, stillV3, fromPhotoV3, v3list,
    get useV3() { return !!v3; },
    get faceLayers() { return hasLayers(); },
    get v3() { return v3; },
    isV3: look => !!(look && look.v === 3),
    load, compose, composeHead, walkBody, normalize, fromPhoto, random, petSit, petFrame, petFrameCount,
    get canWalk() { return !!(meta && meta.walk); },
    get pets() { return (meta && meta.pets) || []; },
    SKINS, HAIRS,
    get meta() { return meta; },
    get ready() { return !!meta; },
    isV2: look => !!(look && (look.v === 2 || look.v === 3))
  };
})(window);
