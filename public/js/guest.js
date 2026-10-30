/* 하객 화면 — 셀카 → 캐릭터 고르기 → 이름 → 축하 한마디 → 꽃길 입장 */
(async function () {
  'use strict';

  const $ = id => document.getElementById(id);
  const C = Sprite.color;
  const config = await Store.config();

  $('coupleLabel').textContent = `💌 ${config.groom.name} ♥ ${config.bride.name}`;
  document.title = `${config.groom.name} ♥ ${config.bride.name} · 픽셀 방명록`;

  const artP = Scene.loadArt(config.art);
  // 그림 부품이 있으면 꾸미기 방식(기준 시트 방식 v3 우선), 없으면 기존 도트 후보 방식
  // 휴대폰은 앞모습 그림만 먼저 받는다 (걸음 그림 천여 장은 필요할 때)
  const avatarP = Avatar.loadV3({ stillOnly: true }).then(() => Avatar.load({ light: Avatar.useV3 })).then(m => {
    if (Avatar.useV3) {
      // v3: 옷·머리·얼굴(또는 눈·눈썹·입·볼)·머리색·반려동물 탭만
      const layers = Avatar.faceLayers;
      if (layers && !$('customTabs').querySelector('[data-tab=brows]')) {
        const b = document.createElement('button');
        b.dataset.tab = 'brows';
        $('customTabs').appendChild(b);
      }
      const keep = layers
        ? { body: '옷', head: '머리', eyes: '눈', brows: '눈썹', mouth: '입', cheek: '볼', hair: '머리색', pet: '반려동물' }
        : { body: '옷', head: '머리', eyes: '얼굴', hair: '머리색', pet: '반려동물' };
      [...$('customTabs').children].forEach(b => {
        if (keep[b.dataset.tab]) b.textContent = keep[b.dataset.tab]; else b.remove();
      });
      const order = Object.keys(keep);
      order.forEach(t => { const b = $('customTabs').querySelector(`[data-tab=${t}]`); if (b) $('customTabs').appendChild(b); });
    }
    return m;
  });
  const state = { img: null, colors: null, set: 0, glasses: 'none', candidates: [], selected: -1, look: null, side: '' };

  /* ---------- 단계 이동 ---------- */
  const STEPS = ['step-intro', 'step-crop', 'step-pick', 'step-custom', 'step-name', 'step-message', 'step-done'];
  const DOT = { 'step-intro': 0, 'step-crop': 1, 'step-pick': 1, 'step-custom': 1, 'step-name': 2, 'step-message': 3, 'step-done': 4 };
  let introScene = null, doneScene = null;

  function go(id) {
    if (id === 'step-pick' && Avatar.ready) id = 'step-custom';
    STEPS.forEach(s => $(s).classList.toggle('hidden', s !== id));
    [...$('dots').children].forEach((d, i) => d.classList.toggle('on', i <= DOT[id]));
    window.scrollTo(0, 0);
    if (id === 'step-intro') startIntroScene(); else if (introScene) { introScene.destroy(); introScene = null; }
    if (id !== 'step-done' && doneScene) { doneScene.destroy(); doneScene = null; }
    if (id !== 'step-pick') stopPickAnim();
  }
  document.querySelectorAll('[data-back]').forEach(b => b.addEventListener('click', () => go(b.dataset.back)));

  /* ---------- 시작 화면 미니 예식장 ---------- */
  async function startIntroScene() {
    if (introScene) return;
    const art = await artP;
    if (introScene || !$('step-intro') || $('step-intro').classList.contains('hidden')) return;
    introScene = Scene.create($('introScene'), { config, art, worldHeight: 150 });
    let list = [];
    try { list = await Store.list(); } catch { /* 오프라인이어도 괜찮음 */ }
    if (!introScene) return;
    if (list.length) introScene.setGuests(list.slice(-24));
    else {
      await avatarP;
      for (let i = 0; i < 7; i++) introScene.addGuest({ id: 'intro' + i, name: '', message: '', look: Avatar.ready ? Avatar.random(i * 104729 + 7) : Sprite.randomLook(i * 104729 + 7) });
    }
  }

  /* ---------- 사진 고르기 ---------- */
  $('btnCamera').onclick = () => $('fileCamera').click();
  $('btnAlbum').onclick = () => $('fileAlbum').click();
  $('btnRepick').onclick = () => $('fileAlbum').click();
  $('fileCamera').onchange = e => loadFile(e.target.files[0], e.target);
  $('fileAlbum').onchange = e => loadFile(e.target.files[0], e.target);

  function loadFile(file, input) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      state.img = img;
      view.zoom = 1; view.ox = 0; view.oy = 0; $('zoom').value = 1;
      go('step-crop');
      drawCrop();
      URL.revokeObjectURL(url);
    };
    img.onerror = () => { URL.revokeObjectURL(url); alert('사진을 열 수 없어요. 다른 사진을 골라 주세요.'); };
    img.src = url;
    input.value = '';
  }

  $('btnNoPhoto').onclick = async () => {
    if (await avatarP) { startCustom(Avatar.random()); return; }
    const base = Sprite.randomLook();
    state.colors = { skin: base.skin, hair: base.hair, top: base.top, longHair: Math.random() < 0.5 };
    state.set = 0;
    go('step-pick');
    showCandidates(true);
  };

  /* ---------- 사진 맞추기 (드래그 + 확대) ---------- */
  const view = { zoom: 1, ox: 0, oy: 0 };
  const cropCanvas = $('cropCanvas'), cctx = cropCanvas.getContext('2d');
  const CS = cropCanvas.width;

  function geometry() {
    const { img } = state;
    const s = Math.max(CS / img.naturalWidth, CS / img.naturalHeight) * view.zoom;
    const w = img.naturalWidth * s, h = img.naturalHeight * s;
    const maxX = (w - CS) / 2, maxY = (h - CS) / 2;
    view.ox = Math.max(-maxX, Math.min(maxX, view.ox));
    view.oy = Math.max(-maxY, Math.min(maxY, view.oy));
    return { w, h, x: (CS - w) / 2 + view.ox, y: (CS - h) / 2 + view.oy };
  }
  function drawCrop() {
    if (!state.img) return;
    const g = geometry();
    cctx.fillStyle = '#000'; cctx.fillRect(0, 0, CS, CS);
    cctx.imageSmoothingQuality = 'high';
    cctx.drawImage(state.img, g.x, g.y, g.w, g.h);
  }
  $('zoom').oninput = e => { view.zoom = +e.target.value; drawCrop(); };

  const pointers = new Map();
  let pinch = null;
  const box = $('cropBox');
  box.addEventListener('pointerdown', e => { box.setPointerCapture(e.pointerId); pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); });
  box.addEventListener('pointermove', e => {
    if (!pointers.has(e.pointerId)) return;
    const prev = pointers.get(e.pointerId);
    const k = CS / box.clientWidth;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      view.ox += (e.clientX - prev.x) * k; view.oy += (e.clientY - prev.y) * k;
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch) view.zoom = Math.max(1, Math.min(3, view.zoom * d / pinch));
      pinch = d;
      $('zoom').value = view.zoom;
    }
    drawCrop();
  });
  const up = e => { pointers.delete(e.pointerId); if (pointers.size < 2) pinch = null; };
  box.addEventListener('pointerup', up);
  box.addEventListener('pointercancel', up);
  box.addEventListener('wheel', e => { e.preventDefault(); view.zoom = Math.max(1, Math.min(3, view.zoom - e.deltaY * 0.002)); $('zoom').value = view.zoom; drawCrop(); }, { passive: false });

  /* ---------- 사진 색 읽기 ---------- */
  function analyze() {
    const N = 120;
    const t = document.createElement('canvas'); t.width = t.height = N;
    const tctx = t.getContext('2d', { willReadFrequently: true });
    tctx.drawImage(cropCanvas, 0, 0, N, N);
    const data = tctx.getImageData(0, 0, N, N).data;
    const region = (x0, y0, x1, y1) => {
      const out = [];
      for (let y = Math.floor(y0 * N); y < Math.ceil(y1 * N); y++)
        for (let x = Math.floor(x0 * N); x < Math.ceil(x1 * N); x++) {
          const i = (y * N + x) * 4;
          out.push([data[i], data[i + 1], data[i + 2]]);
        }
      return out;
    };
    const lum = p => 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2];
    const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
    const robust = (px, lo = 0.25, hi = 0.75) => {
      if (!px.length) return null;
      const s = [...px].sort((a, b) => lum(a) - lum(b));
      const part = s.slice(Math.floor(s.length * lo), Math.max(Math.floor(s.length * lo) + 1, Math.ceil(s.length * hi)));
      const sum = part.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]], [0, 0, 0]);
      return sum.map(v => v / part.length);
    };
    const hex = p => p ? C.rgbToHex(p[0], p[1], p[2]) : null;

    const skin = robust(region(0.40, 0.50, 0.60, 0.64), 0.35, 0.8);
    const bg = robust([...region(0, 0, 0.1, 0.12), ...region(0.9, 0, 1, 0.12)]);
    const band = [...region(0.32, 0.07, 0.68, 0.2), ...region(0.25, 0.2, 0.31, 0.45), ...region(0.69, 0.2, 0.75, 0.45)];
    let hairPx = band.filter(p => dist(p, skin) > 60 && dist(p, bg) > 45);
    let hair = null;
    if (hairPx.length > band.length * 0.2) hair = robust(hairPx, 0.15, 0.6);
    else {
      const dark = robust(band, 0, 0.25);
      if (dark && lum(dark) < 90) hair = dark;
    }
    let longHair = false;
    if (hair) {
      const sides = [...region(0.12, 0.62, 0.24, 0.88), ...region(0.76, 0.62, 0.88, 0.88)];
      longHair = sides.filter(p => dist(p, hair) < 55).length / sides.length > 0.38;
    }
    // 옷: 아래쪽 띠에서 머리·피부와 다른 색을 우선
    const bottom = region(0.22, 0.86, 0.78, 0.995);
    const cloth = bottom.filter(p => dist(p, skin) > 50 && (!hair || dist(p, hair) > 50));
    const top = cloth.length > bottom.length * 0.25 ? robust(cloth) : robust(bottom);
    return { skin: hex(skin), hair: hex(hair), top: hex(top), longHair };
  }

  $('btnMake').onclick = async () => {
    state.colors = analyze();
    state.set = 0;
    state.img = null; // 원본 사진은 더 이상 들고 있지 않음
    cctx.clearRect(0, 0, CS, CS);
    if (await avatarP) { startCustom(Avatar.fromPhoto(state.colors)); return; }
    go('step-pick');
    showCandidates(true);
  };

  /* ---------- 후보 고르기 ---------- */
  let pickTimer = null, pickFrame = 0, loadTimer = null;
  function stopPickAnim() { clearInterval(pickTimer); pickTimer = null; clearTimeout(loadTimer); }

  function showCandidates(withLoading) {
    stopPickAnim();
    const grid = $('pickGrid');
    $('btnPick').disabled = true;
    state.selected = -1;
    if (withLoading) {
      grid.innerHTML = '';
      for (let i = 0; i < 4; i++) {
        const d = document.createElement('div');
        d.className = 'pick loading';
        d.innerHTML = '<span class="label">픽셀 옷 입는 중...</span><span class="bar"><i></i></span>';
        grid.appendChild(d);
      }
      loadTimer = setTimeout(renderCandidates, 1500 + Math.random() * 600);
    } else renderCandidates();
  }

  function renderCandidates(keepSelection) {
    const keep = keepSelection ? state.selected : -1;
    state.candidates = Sprite.candidates(state.colors, state.set, state.glasses);
    const grid = $('pickGrid');
    grid.innerHTML = '';
    state.candidates.forEach((look, i) => {
      const card = document.createElement('button');
      card.className = 'pick' + (i === keep ? ' on' : '');
      card.setAttribute('aria-label', `캐릭터 ${i + 1}`);
      const c = document.createElement('canvas');
      c.width = Sprite.W; c.height = Sprite.H;
      card.appendChild(c);
      card.onclick = () => {
        state.selected = i;
        [...grid.children].forEach((el, j) => el.classList.toggle('on', j === i));
        $('btnPick').disabled = false;
      };
      grid.appendChild(card);
    });
    state.selected = keep;
    $('btnPick').disabled = keep < 0;
    drawCandidates();
    clearInterval(pickTimer);
    pickTimer = setInterval(() => { pickFrame++; drawCandidates(); }, 260);
  }

  function drawCandidates() {
    const cards = $('pickGrid').querySelectorAll('canvas');
    cards.forEach((c, i) => {
      const look = state.candidates[i];
      const sel = i === state.selected;
      const f = sel ? [1, 0, 2, 0][pickFrame % 4] : (pickFrame % 12 < 1 ? 1 : 0);
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(Sprite.render(look, 'down', f), 0, 0);
    });
  }

  $('glassChips').addEventListener('click', e => {
    const b = e.target.closest('[data-glasses]');
    if (!b) return;
    state.glasses = b.dataset.glasses;
    [...$('glassChips').children].forEach(x => x.classList.toggle('on', x === b));
    if (state.candidates.length && !$('pickGrid').querySelector('.loading')) renderCandidates(true);
  });
  $('btnReroll').onclick = () => { state.set++; showCandidates(true); };

  $('btnPick').onclick = () => {
    state.look = state.candidates[state.selected];
    drawSprite($('namePreview'), state.look);
    go('step-name');
    setTimeout(() => $('nameInput').focus(), 250);
  };

  function drawSprite(canvas, look, dir = 'down', frame = 0) {
    if (Avatar.isV2(look)) {
      const a = withPet(look);
      canvas.width = a.width; canvas.height = a.height;
      canvas.style.width = 'auto'; canvas.style.height = '150px'; canvas.style.imageRendering = 'auto';
      canvas.getContext('2d').drawImage(a, 0, 0);
      return;
    }
    canvas.width = Sprite.W; canvas.height = Sprite.H;
    canvas.style.width = ''; canvas.style.height = ''; canvas.style.imageRendering = '';
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(Sprite.render(look, dir, frame), 0, 0);
  }

  /* ---------- 캐릭터 꾸미기 (그림 부품) ---------- */
  let customTab = 'body', customTimer = null;

  // 남자·여자: 처음에 고르고, 그 옷만 보여 준다
  const sexOfOutfit = id => (Avatar.v3list('outfit').find(o => o.id === id) || {}).sex;
  const sexOfHair = id => (Avatar.v3list('hair').find(h => h.id === id) || {}).sex;
  // 가장 기본 모습 (남자: 블랙 셔츠+아이보리 바지·댄디컷·무표정, 여자: 하트 티셔츠+청바지·포니테일·미소)
  const BASE_FACE = { eyes: 'round', brows: 'straight', mouth: 'flat', cheek: 'blush', hairColor: '#262024', pet: '' };
  const DEFAULT_LOOK = {
    m: { v: 3, ...BASE_FACE, outfit: 'black_m', hair: 'dandy' },
    f: { v: 3, ...BASE_FACE, mouth: 'smile', outfit: 'tshirt_f', hair: 'ponytail' }
  };
  const defaultLook = g => {
    const L = { ...DEFAULT_LOOK[g] };
    if (state.colors && state.look) L.hairColor = state.look.hairColor;   // 사진에서 읽은 머리색은 살림
    return Avatar.normalize(L);
  };
  function applyGender(g) {
    const first = !state.gender;
    state.gender = g;
    $('step-custom').classList.remove('need-gender');
    [...$('genderToggle').children].forEach(b => b.classList.toggle('on', b.dataset.gender === g));
    if (first) { state.look = defaultLook(g); renderCustom(); return; }
    const L = state.look;
    const patch = {};
    if (sexOfOutfit(L.outfit) !== g) {
      // 짝이 되는 옷(정장_f → 정장_m)이 있으면 그것, 없으면 기본 옷
      const outs = Avatar.v3list('outfit').filter(o => o.sex === g);
      const pair = String(L.outfit).replace(/_[mf]$/, '_' + g);
      const fromDefault = Object.values(DEFAULT_LOOK).some(d => d.outfit === L.outfit);   // 기본 옷끼리는 기본 옷으로
      patch.outfit = !fromDefault && outs.some(o => o.id === pair) ? pair : DEFAULT_LOOK[g].outfit;
    }
    const hs = sexOfHair(L.hair);
    if (hs && hs !== g) patch.hair = DEFAULT_LOOK[g].hair;
    setLook(patch);
  }
  function askGender() {
    $('step-custom').classList.add('need-gender');
    // 버튼 그림: 남자·여자 기본 모습
    for (const [g, id] of [['m', 'genderM'], ['f', 'genderF']]) {
      const a = Avatar.compose(defaultLook(g));
      const c = $(id);
      c.width = a.width; c.height = a.height;
      c.getContext('2d').drawImage(a, 0, 0);
    }
  }
  document.querySelectorAll('[data-gender]').forEach(b => b.addEventListener('click', () => applyGender(b.dataset.gender)));

  function startCustom(look) {
    state.look = look;
    go('step-custom');
    const v3 = look && look.v === 3 && Avatar.v3list('outfit').some(o => o.sex);
    $('genderToggle').classList.toggle('hidden', !v3);
    if (v3 && !state.gender) askGender();
    else if (v3) applyGender(state.gender);
    // 영상처럼 잠깐 "픽셀 옷 입는 중..."
    $('customLoading').classList.remove('hidden');
    clearTimeout(customTimer);
    customTimer = setTimeout(() => { $('customLoading').classList.add('hidden'); }, 1400);
    renderCustom();
  }

  function setLook(patch) {
    state.look = Avatar.normalize({ ...state.look, ...patch });
    renderCustom();
  }

  // 캐릭터 + (있으면) 옆에 앉은 반려동물
  function withPet(look) {
    const a = Avatar.compose(look);
    const pet = look.pet && Avatar.petSit(look.pet);
    const c = document.createElement('canvas');
    const ps = look.v === 3 ? a.height / 244 : 1;          // 반려동물 그림은 예전 몸통(약 244) 단위
    const pw = pet ? pet.naturalWidth * ps : 0, ph = pet ? pet.naturalHeight * ps : 0;
    c.width = a.width + (pet ? pw * 0.75 : 0); c.height = a.height;
    const x = c.getContext('2d');
    x.drawImage(a, 0, 0);
    if (pet) x.drawImage(pet, a.width - pw * 0.25, a.height - ph, pw, ph);
    return c;
  }

  function drawPreview() {
    const a = withPet(state.look);
    const c = $('customPreview');
    c.width = a.width; c.height = a.height;
    c.getContext('2d').drawImage(a, 0, 0);
  }

  // 얼굴 쪽만 잘라 보여주는 썸네일
  function headThumb(look, whole) {
    const a = Avatar.compose(look);
    const c = document.createElement('canvas');
    // whole: 머리 전체 / 아니면 눈~턱이 가운데 오도록 (아래쪽 이름표에 눈이 가리지 않게)
    const top = whole ? Math.max(0, Math.round(a.headTop) - 2) : Math.round(a.headTop + (a.neck.y - a.headTop) * 0.3);
    const h = Math.round(a.neck.y - top + (whole ? 30 : 16));
    const w = Math.min(a.width, h * 1.1), x = Math.max(0, a.neck.x - w / 2);
    c.width = w; c.height = h;
    c.getContext('2d').drawImage(a, x, top, w, h, 0, 0, w, h);
    return c;
  }

  function cloneCanvas(src) {
    const c = document.createElement('canvas');
    c.width = src.width; c.height = src.height;
    c.getContext('2d').drawImage(src, 0, 0);
    return c;
  }

  function option({ on, canvas, label, tall, swatch, onClick }) {
    const b = document.createElement('button');
    b.className = 'opt' + (on ? ' on' : '') + (tall ? ' tall' : '') + (swatch ? ' none' : '');
    if (canvas) b.appendChild(canvas);
    if (swatch) {
      const sw = document.createElement('span');
      sw.className = 'swatch';
      sw.style.background = swatch;
      b.appendChild(sw);
    }
    if (label) { const cap = document.createElement('span'); cap.className = 'cap'; cap.textContent = label; b.appendChild(cap); }
    b.setAttribute('aria-label', label || '');
    b.onclick = onClick;
    return b;
  }

  function renderCustom() {
    drawPreview();
    const box = $('customOptions');
    box.innerHTML = '';
    const m = Avatar.meta, L = state.look;
    if (L.v === 3) { renderCustomV3(box, L); return; }
    if (customTab === 'body') {
      // 지금 입은 옷과 같은 성별의 옷을 앞에
      const sex = (m.body.find(b => b.id === L.body) || {}).sex;
      const list = [...m.body].sort((a, b) => (a.sex === sex ? 0 : 1) - (b.sex === sex ? 0 : 1));
      for (const b of list) box.appendChild(option({
        on: b.id === L.body, tall: true, label: b.label,
        canvas: cloneCanvas(Avatar.compose({ ...L, body: b.id })), onClick: () => setLook({ body: b.id })
      }));
    } else if (customTab === 'head') {
      // 지금 옷과 같은 성별의 머리를 앞에
      const sex = (m.body.find(b => b.id === L.body) || {}).sex;
      const list = [...m.head].sort((a, b) => ((a.sex || 'm') === sex ? 0 : 1) - ((b.sex || 'm') === sex ? 0 : 1));
      for (const h of list) box.appendChild(option({
        on: h.id === L.head, label: h.label, canvas: headThumb({ ...L, head: h.id }, true), onClick: () => setLook({ head: h.id })
      }));
    } else if (customTab === 'eyes' || customTab === 'mouth') {
      for (const p of m.face[customTab]) box.appendChild(option({
        on: p.id === L[customTab], label: p.label,
        canvas: headThumb({ ...L, [customTab]: p.id }), onClick: () => setLook({ [customTab]: p.id })
      }));
    } else if (customTab === 'cheek') {
      box.appendChild(option({ on: !L.cheek, label: '없음', canvas: headThumb({ ...L, cheek: '' }), onClick: () => setLook({ cheek: '' }) }));
      for (const p of m.face.cheek) box.appendChild(option({
        on: p.id === L.cheek, label: p.label, canvas: headThumb({ ...L, cheek: p.id }), onClick: () => setLook({ cheek: p.id })
      }));
    } else if (customTab === 'pet') {
      box.appendChild(option({ on: !L.pet, label: '없음', swatch: 'transparent', onClick: () => setLook({ pet: '' }) }));
      for (const p of Avatar.pets) box.appendChild(option({
        on: p.id === L.pet, label: p.label, canvas: cloneCanvas(Avatar.petSit(p.id)), onClick: () => setLook({ pet: p.id })
      }));
    } else {
      const list = customTab === 'hair' ? Avatar.HAIRS : Avatar.SKINS;
      for (const c of list) box.appendChild(option({
        on: c.hex === L[customTab], label: c.label, swatch: c.hex, onClick: () => setLook({ [customTab]: c.hex })
      }));
    }
  }

  // 큰 그림을 칸 안에 들어가는 작은 썸네일로
  function fitThumb(src, h = 120) {
    const c = document.createElement('canvas');
    const k = h / src.height;
    c.width = Math.round(src.width * k); c.height = h;
    const x = c.getContext('2d');
    x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
    x.drawImage(src, 0, 0, c.width, c.height);
    Object.assign(c.style, { width: 'auto', height: 'auto', maxWidth: '92%', maxHeight: '86%', marginTop: '-8%' });
    return c;
  }

  function renderCustomV3(box, L) {
    // 고른 성별 기준으로 순서를 고정 (옷을 고를 때마다 목록이 다시 섞이지 않게)
    const sex = state.gender || sexOfOutfit(L.outfit);
    const bySex = list => [...list].sort((a, b) => ((a.sex || sex) === sex ? 0 : 1) - ((b.sex || sex) === sex ? 0 : 1));
    if (customTab === 'body') {
      const outs = Avatar.v3list('outfit').filter(o => !state.gender || !o.sex || o.sex === state.gender);
      for (const o of outs) box.appendChild(option({
        on: o.id === L.outfit, tall: true, label: o.label,
        canvas: fitThumb(Avatar.compose({ ...L, outfit: o.id })), onClick: () => setLook({ outfit: o.id })
      }));
    } else if (customTab === 'head') {
      // 머리도 고른 성별 것만
      const hairs = Avatar.v3list('hair').filter(h => !state.gender || !h.sex || h.sex === state.gender);
      for (const h of bySex(hairs)) box.appendChild(option({
        on: h.id === L.hair, label: h.label, canvas: headThumb({ ...L, hair: h.id }, true), onClick: () => setLook({ hair: h.id })
      }));
    } else if (Avatar.faceLayers && ['eyes', 'brows', 'mouth', 'cheek'].includes(customTab)) {
      const k = customTab;
      if (k === 'cheek') box.appendChild(option({ on: !L.cheek, label: '없음', canvas: headThumb({ ...L, cheek: '' }), onClick: () => setLook({ cheek: '' }) }));
      for (const p of Avatar.v3list(k)) box.appendChild(option({
        on: p.id === L[k], label: p.label, canvas: headThumb({ ...L, [k]: p.id }), onClick: () => setLook({ [k]: p.id })
      }));
    } else if (customTab === 'eyes') {
      for (const f of Avatar.v3list('face')) box.appendChild(option({
        on: f.id === L.face, label: f.label, canvas: headThumb({ ...L, face: f.id }), onClick: () => setLook({ face: f.id })
      }));
    } else if (customTab === 'pet') {
      box.appendChild(option({ on: !L.pet, label: '없음', swatch: 'transparent', onClick: () => setLook({ pet: '' }) }));
      for (const p of Avatar.pets) box.appendChild(option({
        on: p.id === L.pet, label: p.label, canvas: cloneCanvas(Avatar.petSit(p.id)), onClick: () => setLook({ pet: p.id })
      }));
    } else {
      for (const c of Avatar.HAIRS) box.appendChild(option({
        on: c.hex === L.hairColor, label: c.label, swatch: c.hex, onClick: () => setLook({ hairColor: c.hex })
      }));
    }
  }

  $('customTabs').addEventListener('click', e => {
    const b = e.target.closest('[data-tab]');
    if (!b) return;
    customTab = b.dataset.tab;
    [...$('customTabs').children].forEach(x => x.classList.toggle('on', x === b));
    renderCustom();
  });
  $('btnDice').onclick = () => {
    state.look = Avatar.random();
    if (state.gender && state.look.v === 3) applyGender(state.gender); else renderCustom();
  };
  $('btnCustomDone').onclick = () => {
    drawSprite($('namePreview'), state.look);
    go('step-name');
    setTimeout(() => $('nameInput').focus(), 250);
  };

  /* ---------- 이름 ---------- */
  const nameVal = () => $('nameInput').value.trim();
  $('nameInput').oninput = () => {
    $('nameEcho').textContent = nameVal() || ' ';
    $('btnName').disabled = !nameVal();
  };
  $('nameInput').onkeydown = e => { if (e.key === 'Enter' && nameVal()) $('btnName').click(); };
  $('sideChips').addEventListener('click', e => {
    const b = e.target.closest('[data-side]');
    if (!b) return;
    state.side = state.side === b.dataset.side ? '' : b.dataset.side;
    [...$('sideChips').children].forEach(x => x.classList.toggle('on', x.dataset.side === state.side));
  });
  $('btnName').onclick = () => {
    $('msgName').textContent = nameVal();
    drawSprite($('msgPreview'), state.look);
    go('step-message');
    setTimeout(() => $('msgInput').focus(), 250);
  };

  /* ---------- 축하 메시지 ---------- */
  const msgVal = () => $('msgInput').value.replace(/\s+/g, ' ').trim();
  $('msgInput').oninput = () => {
    const v = msgVal();
    $('msgCount').textContent = $('msgInput').value.length;
    $('bubblePreview').textContent = v || '축하 한마디를 적어 주세요';
    $('bubblePreview').classList.toggle('empty', !v);
    $('btnSend').disabled = !v;
    $('sendError').textContent = '';
  };

  $('btnSend').onclick = async () => {
    const btn = $('btnSend');
    btn.disabled = true;
    btn.textContent = '입장하는 중...';
    try {
      const me = await Store.add({ name: nameVal(), message: msgVal(), look: state.look, side: state.side });
      go('step-done');
      startDoneScene(me);
    } catch (e) {
      $('sendError').textContent = e.message || '전송에 실패했어요. 잠시 후 다시 시도해 주세요.';
      btn.disabled = false;
    } finally {
      btn.textContent = '꽃길로 입장하기 💐';
    }
  };

  /* ---------- 완료 ---------- */
  async function startDoneScene(me) {
    doneScene = Scene.create($('doneScene'), { config, art: await artP, worldHeight: 150 });
    let list = [];
    try { list = await Store.list(); } catch { /* 무시 */ }
    if (!doneScene) return;
    doneScene.setGuests(list.filter(g => g.id !== me.id).slice(-20));
    setTimeout(() => doneScene && doneScene.addGuest(me, true), 500);
  }

  $('btnAgain').onclick = () => {
    Object.assign(state, { img: null, colors: null, set: 0, candidates: [], selected: -1, look: null, side: '', gender: '' });
    $('nameInput').value = ''; $('msgInput').value = '';
    $('nameEcho').innerHTML = '&nbsp;';
    $('bubblePreview').textContent = '축하 한마디를 적어 주세요'; $('bubblePreview').classList.add('empty');
    $('msgCount').textContent = '0';
    $('btnName').disabled = true; $('btnSend').disabled = true;
    [...$('sideChips').children].forEach(x => x.classList.remove('on'));
    go('step-intro');
  };

  try { await document.fonts.load('13px Galmuri11'); } catch { /* 무시 */ }
  go('step-intro');
})();
