/* 식장 스크린 — 하객이 입장할 때마다 꽃길로 걸어 들어온다 */
(async function () {
  'use strict';

  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  const config = await Store.config();

  $('groomName').textContent = config.groom.name;
  $('brideName').textContent = config.bride.name;
  $('subTitle').textContent = [config.date, config.title].filter(Boolean).join(' · ');
  document.title = `${config.groom.name} ♥ ${config.bride.name} · 픽셀 방명록`;

  try { await document.fonts.load('16px Galmuri11'); } catch { /* 글꼴 없이도 동작 */ }

  const art = await Scene.loadArt(config.art);
  await Avatar.load();
  const useV3 = !params.has('v2') && await Avatar.loadV3();   // 기준 시트 부품이 있으면 기본
  const randomLook = seed => useV3 ? Avatar.randomV3(seed) : Avatar.ready ? Avatar.random(seed) : Sprite.randomLook(seed);
  const scene = Scene.create($('stage'), { config, art, cinematic: true, onNotice: t => toast(t), onPhoto: showPhoto });
  if (params.has('debug')) window.__scene = scene;
  const known = new Set();
  const updateCount = () => { $('count').textContent = scene.count; };

  // QR 코드
  function drawQR(text) {
    $('qrUrl').textContent = text.replace(/^https?:\/\//, '');
    if (typeof qrcode !== 'function') { $('qr').classList.add('hidden'); return; }
    const qr = qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    const n = qr.getModuleCount(), pad = 2, c = $('qr');
    c.width = c.height = n + pad * 2;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fffdf7'; ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#2a2030';
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (qr.isDark(y, x)) ctx.fillRect(x + pad, y + pad, 1, 1);
  }
  drawQR(params.get('url') || config.guestUrl);

  function toast(text) {
    const el = document.createElement('div');
    el.className = 'toast pixel-card';
    el.textContent = text;
    $('toasts').appendChild(el);
    setTimeout(() => el.remove(), 5200);
    while ($('toasts').children.length > 3) $('toasts').firstChild.remove();
  }

  // 처음 화면을 켤 때는 이미 온 하객들을 정원에 흩어 놓는다
  try {
    const list = await Store.list();
    list.forEach(g => known.add(g.id));
    scene.setGuests(list);
  } catch (e) { console.warn(e); }
  updateCount();

  // 새 하객은 꽃길로 입장
  const queue = [];
  let busy = false;
  function enter(g) {
    if (known.has(g.id)) return;
    known.add(g.id);
    queue.push(g);
    pump();
  }
  const MILESTONE = Number(config.photoMilestone ?? 50);
  function pump() {
    if (busy || !queue.length) return;
    if (scene.busy) { setTimeout(pump, 1000); return; } // 단체사진 중에는 잠깐 대기
    busy = true;
    const g = queue.shift();
    scene.addGuest(g, true);
    updateCount();
    toast(`💌 ${g.name}님이 꽃길로 입장했어요`);
    const n = scene.count;
    if (MILESTONE > 0 && n % MILESTONE === 0) {
      setTimeout(() => scene.startPhoto(`🎉 하객 ${n}명 돌파! 단체사진 찍을게요`), 9000);
    }
    // 몰릴 때는 빠르게, 한산할 때는 한 명씩 천천히 비춰 준다
    setTimeout(() => { busy = false; pump(); }, queue.length > 4 ? 1200 : 3200);
  }

  // 단체사진 폴라로이드
  const photos = [];
  function showPhoto(canvas, info) {
    const stamp = new Date();
    photos.push({ canvas, count: info.count, stamp });
    const card = $('photoCard');
    const img = $('photoImg');
    img.width = canvas.width; img.height = canvas.height;
    img.getContext('2d').drawImage(canvas, 0, 0);
    $('photoCaption').textContent = `${config.groom.name} ♥ ${config.bride.name} · 하객 ${info.count}명 · ${stamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`;
    card.classList.remove('hidden', 'out');
    void card.offsetWidth;
    card.classList.add('in');
    clearTimeout(showPhoto.t);
    showPhoto.t = setTimeout(() => { card.classList.add('out'); }, 7500);
  }
  function savePhoto() {
    const p = photos[photos.length - 1];
    if (!p) { toast('아직 찍은 단체사진이 없어요 (P로 찍기)'); return; }
    const a = document.createElement('a');
    const d = p.stamp;
    a.download = `단체사진_${d.getHours()}시${String(d.getMinutes()).padStart(2, '0')}분_${p.count}명.png`;
    a.href = p.canvas.toDataURL('image/png');
    a.click();
    toast('📁 단체사진을 저장했어요');
  }

  Store.subscribe({
    onGuest: enter,
    onRemove: id => { known.delete(id); scene.removeGuest(id); updateCount(); },
    onStatus: ok => $('status').classList.toggle('off', !ok)
  });

  // 데모 하객
  const DEMO_NAMES = ['지민', '하늘', '도윤', '수아', '예준', '하린', '시우', '유나', '현우', '지아', '서준', '채원', '민서', '태윤', '나은', '건우'];
  const DEMO_MSGS = ['결혼 너무 축하해!', '오늘 둘 다 너무 예쁘다 💕', '행복하게 잘 살아~', '꽃길만 걷자!', '드디어 가는구나 ㅠㅠ 축하해', '신랑 오늘 멋있다!', '평생 지금처럼 웃으며 살길', '축하축하 🎉', '신부 입장 보고 울었어요', '둘이 너무 잘 어울려요'];
  let demoN = 0;
  function demoGuest() {
    const id = 'demo-' + Date.now() + '-' + demoN++;
    enter({ id, name: DEMO_NAMES[Math.random() * DEMO_NAMES.length | 0], message: DEMO_MSGS[Math.random() * DEMO_MSGS.length | 0], side: Math.random() < 0.5 ? 'groom' : 'bride', look: randomLook() });
  }
  // 데모 하객 자동 입장 켜기/끄기 (버튼 또는 A 키)
  let demoTimer = null;
  function setDemoAuto(on) {
    clearInterval(demoTimer); clearTimeout(setDemoAuto.first);
    demoTimer = null;
    if (on) { demoTimer = setInterval(demoGuest, 6000); setDemoAuto.first = setTimeout(demoGuest, 1200); }
    const b = $('demoBtn');
    b.classList.remove('hidden');
    b.classList.toggle('paused', !on);
    b.textContent = on ? '⏸ 데모 하객 멈추기' : '▶ 데모 하객 다시 입장';
  }
  $('demoBtn').addEventListener('click', e => { e.currentTarget.blur(); setDemoAuto(!demoTimer); toast(demoTimer ? '▶ 데모 하객이 다시 들어와요' : '⏸ 데모 하객 입장을 멈췄어요'); });
  if (params.has('demo')) {
    const n = Number(params.get('demo')) || 12;
    for (let i = 0; i < n; i++) scene.addGuest({ id: 'seed-' + i, name: DEMO_NAMES[i % DEMO_NAMES.length], message: DEMO_MSGS[i % DEMO_MSGS.length], side: i % 3 ? (i % 2 ? 'groom' : 'bride') : '', look: randomLook(i * 7919 + 13) });
    updateCount();
    setDemoAuto(true);
  }

  // 단축키
  const toggle = id => $(id).classList.toggle('hidden');
  document.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if (k === 'f') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => {});
    else if (k === 'q') toggle('qrCard');
    else if (k === 't') { toggle('titleCard'); toggle('countCard'); }
    else if (k === 'd') demoGuest();
    else if (k === 'a') { setDemoAuto(!demoTimer); toast(demoTimer ? '▶ 데모 하객이 다시 들어와요' : '⏸ 데모 하객 입장을 멈췄어요'); }
    else if (k === 'p') { if (!scene.startPhoto()) toast('지금은 단체사진을 찍을 수 없어요'); }
    else if (k === 's') savePhoto();
    else if (k === 'h' || k === '?') toggle('help');
  });
  let cursorTimer;
  document.addEventListener('mousemove', () => {
    document.body.classList.add('show-cursor');
    clearTimeout(cursorTimer);
    cursorTimer = setTimeout(() => document.body.classList.remove('show-cursor'), 2000);
  });
  if (params.has('noqr')) toggle('qrCard');
})();
