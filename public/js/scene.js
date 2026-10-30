/* 꽃길 예식장 장면 — 픽셀 정원, 꽃 아치, 신랑·신부, 걸어 다니는 하객들 */
(function (global) {
  'use strict';

  const SW = Sprite.W, SH = Sprite.H;
  const FOOT = 23; // 스프라이트 안에서 발끝(외곽선 포함) y

  function rng(seed) {
    let s = (seed >>> 0) || 1;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }
  function hashStr(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  /* ---------- 배치 ---------- */
  function layout(W, H) {
    const cx = W >> 1;
    return {
      W, H, cx,
      archCY: 30, archR: 28,
      plat: { x0: cx - 50, x1: cx + 50, y0: 46, y1: 66 },
      steps: { y0: 66, h: 4, hw: [50, 58, 66] },
      aisle: { x0: cx - 20, x1: cx + 20, y0: 78 },
      walk: { x0: 12, x1: W - 12, y0: 86, y1: H - 4 },
      groom: { x: cx - 9, y: 63 },
      bride: { x: cx + 9, y: 63 }
    };
  }

  const isAvatar = look => !!(global.Avatar && Avatar.isV2(look));
  const PET_DX = 8; // 주인 옆 거리 (월드 픽셀)

  /* ---------- 그림 배경용 배치 ---------- */
  // 배경 그림 안에서의 위치를 0~1 비율로 적어 둔다 (img/venue.webp 기준)
  const ART_LAYOUT = {
    archTop: 0.005,
    groom: [0.472, 0.308], bride: [0.528, 0.308],
    aisle: [0.4294, 0.567], aisleTop: 0.377,
    walk: [0.07, 0.935, 0.40, 0.975]
  };

  function layoutFromImage(W, H, img, spec) {
    const A = { ...ART_LAYOUT, ...(spec || {}) };
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const c = Math.max(W / iw, H / ih);
    const ox = (W - iw * c) / 2, oy = (H - ih * c) / 2;
    const X = f => ox + f * iw * c, Y = f => oy + f * ih * c;
    const archTop = Y(A.archTop);
    return {
      W, H, cx: Math.round(X(0.5)),
      archCY: archTop + 1, archR: 1,
      aisle: { x0: X(A.aisle[0]), x1: X(A.aisle[1]), y0: Y(A.aisleTop) },
      walk: { x0: Math.max(10, X(A.walk[0])), x1: Math.min(W - 10, X(A.walk[1])), y0: Y(A.walk[2]), y1: Math.min(H - 4, Y(A.walk[3])) },
      groom: { x: X(A.groom[0]), y: Y(A.groom[1]) },
      bride: { x: X(A.bride[0]), y: Y(A.bride[1]) },
      img: { el: img, x: ox, y: oy, w: iw * c, h: ih * c }
    };
  }

  /* ---------- 그리기 도우미 ---------- */
  function painter(ctx) {
    return (x, y, c, w = 1, h = 1) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), w, h); };
  }
  function disc(px, cx, cy, r, c) {
    for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r + r * 0.6) px(cx + x, cy + y, c);
  }
  function flower(px, x, y, petal, center) {
    px(x, y - 1, petal); px(x - 1, y, petal); px(x + 1, y, petal); px(x, y + 1, petal); px(x, y, center);
  }
  const FLOWERS = [['#ffffff', '#f7d774'], ['#f59ab8', '#fff1a8'], ['#f7c2a2', '#ffffff'], ['#ffd6e4', '#f59ab8'], ['#fff1a8', '#f0a33a']];

  /* ---------- 정적 배경 ---------- */
  function buildBackground(L) {
    const { W, H, cx } = L;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    const px = painter(ctx);
    const r = rng(20261212 + W * 7 + H);
    const inAisle = (x, y) => x > L.aisle.x0 - 6 && x < L.aisle.x1 + 6 && y > L.aisle.y0 - 14;
    const inPlat = (x, y) => x > L.plat.x0 - 10 && x < L.plat.x1 + 10 && y < L.aisle.y0 + 2;

    // 잔디
    px(0, 0, '#78bc4e', W, H);
    for (let i = 0; i < W * H * 0.07; i++) px(r() * W, r() * H, r() < 0.55 ? '#6db044' : '#87c95d');
    for (let i = 0; i < W * H / 70; i++) {
      const x = r() * W | 0, y = r() * H | 0;
      px(x, y, '#5e9e3d'); px(x + 2, y, '#5e9e3d'); px(x + 1, y + 1, '#5e9e3d');
    }

    // 라벤더·들꽃 무리
    for (let i = 0; i < (W * H) / 900; i++) {
      const x = r() * W | 0, y = 30 + r() * (H - 30) | 0;
      if (inAisle(x, y) || inPlat(x, y)) continue;
      if (r() < 0.45) {
        for (let k = 0; k < 6; k++) {
          const lx = x + (r() * 10 | 0) - 5, ly = y + (r() * 6 | 0) - 3;
          px(lx, ly + 2, '#4f8f3a', 1, 3);
          px(lx, ly, '#9b7fd1', 1, 2); px(lx, ly - 1, '#b9a3ea');
        }
      } else {
        for (let k = 0; k < 5; k++) {
          const [p, ce] = FLOWERS[r() * FLOWERS.length | 0];
          const fx = x + (r() * 12 | 0) - 6, fy = y + (r() * 8 | 0) - 4;
          px(fx - 1, fy + 2, '#4f8f3a'); px(fx + 1, fy + 2, '#4f8f3a');
          flower(px, fx, fy, p, ce);
        }
      }
    }

    // 아치 뒤 꽃 덤불
    for (let i = 0; i < 46; i++) {
      const bx = cx + (r() * 2 - 1) * 74, by = 6 + r() * 42, br = 5 + (r() * 4 | 0);
      disc(px, bx, by, br + 1, '#2f6d2b');
      disc(px, bx, by, br, i % 3 ? '#4c973d' : '#3f8834');
      disc(px, bx - 2, by - 2, Math.max(2, br - 3), '#62b34a');
    }
    for (let i = 0; i < 70; i++) {
      const [p, ce] = FLOWERS[r() * FLOWERS.length | 0];
      flower(px, cx + (r() * 2 - 1) * 74, 4 + r() * 46, p, ce);
    }

    // 단상 (돌바닥)
    const P = L.plat;
    px(P.x0, P.y0, '#cbbd9c', P.x1 - P.x0, P.y1 - P.y0);
    px(P.x0 + 1, P.y0 + 1, '#eee5d1', P.x1 - P.x0 - 2, P.y1 - P.y0 - 2);
    for (let y = P.y0 + 6; y < P.y1; y += 6) {
      px(P.x0 + 1, y, '#ddd1b6', P.x1 - P.x0 - 2, 1);
      const off = ((y / 6) % 2) * 6;
      for (let x = P.x0 + 4 + off; x < P.x1 - 2; x += 12) px(x, y - 5, '#e4d9c0', 1, 5);
    }
    // 모서리 둥글게
    [[P.x0, P.y0], [P.x1 - 1, P.y0]].forEach(([x, y]) => px(x, y, '#78bc4e'));

    // 계단
    L.steps.hw.forEach((hw, i) => {
      const y = L.steps.y0 + i * L.steps.h;
      px(cx - hw, y, '#bfae8b', hw * 2, L.steps.h);
      px(cx - hw + 1, y, '#fbf6ea', hw * 2 - 2, 1);
      px(cx - hw + 1, y + 1, '#f1e9d7', hw * 2 - 2, L.steps.h - 2);
      px(cx - hw + 1, y + L.steps.h - 1, '#d3c4a3', hw * 2 - 2, 1);
    });

    // 꽃길 (버진로드)
    const A = L.aisle;
    px(A.x0, A.y0, '#cdb98f', A.x1 - A.x0, H - A.y0);
    px(A.x0 + 1, A.y0, '#efe3c8', A.x1 - A.x0 - 2, H - A.y0);
    for (let y = A.y0 + 7, row = 0; y < H; y += 7, row++) {
      px(A.x0 + 1, y, '#e2d4b4', A.x1 - A.x0 - 2, 1);
      for (let x = A.x0 + 3 + (row % 2) * 5; x < A.x1 - 1; x += 10) px(x, y - 6, '#e6d9bb', 1, 6);
    }
    // 흩날린 꽃잎
    for (let i = 0; i < (H - A.y0) / 2; i++) {
      const x = A.x0 + 2 + r() * (A.x1 - A.x0 - 4), y = A.y0 + r() * (H - A.y0);
      px(x, y, r() < 0.6 ? '#f7b3c9' : '#ffffff', r() < 0.5 ? 2 : 1, 1);
    }
    // 꽃길 테두리 꽃
    for (let y = A.y0 + 3; y < H + 4; y += 5) {
      for (const side of [-1, 1]) {
        const x = side < 0 ? A.x0 - 3 : A.x1 + 2;
        px(x - 1, y - 1, '#4f9a3f', 3, 3); px(x, y + 2, '#3f8233');
        const [p, ce] = FLOWERS[(y / 5 + (side > 0 ? 2 : 0)) % FLOWERS.length | 0];
        flower(px, x, y - 1, p, ce);
      }
    }

    // 아치 뒤 커튼
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(cx + s * 6, L.archCY - L.archR + 4);
      ctx.quadraticCurveTo(cx + s * 16, L.archCY + 8, cx + s * (L.archR - 1), L.archCY + 30);
      ctx.lineTo(cx + s * (L.archR - 1), L.archCY - 4);
      ctx.closePath();
      ctx.fill();
    }

    // 화분 (계단 양옆)
    for (const s of [-1, 1]) {
      const bx = cx + s * 46 - 5, by = 62;
      px(bx, by, '#7a4a2a', 11, 8); px(bx + 1, by + 1, '#a8693c', 9, 6); px(bx + 1, by + 1, '#c07f4c', 9, 1);
      for (let k = 0; k < 7; k++) {
        const [p, ce] = FLOWERS[k % FLOWERS.length];
        px(bx + 1 + k * 1.4, by - 2, '#4f9a3f', 2, 2);
        flower(px, bx + 1 + k * 1.5, by - 2 - (k % 2) * 2, p, ce);
      }
    }
    return c;
  }

  /* ---------- 앞뒤 정렬되는 소품 (아치, 나무, 꽃 스탠드) ---------- */
  function makeArch(L) {
    const w = L.archR * 2 + 16, h = L.archR + 44;
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const px = painter(c.getContext('2d'));
    const r = rng(77);
    const ox = w / 2, oy = L.archR + 6; // 아치 원 중심 (캔버스 기준)
    // 기둥
    for (const s of [-1, 1]) {
      const x = ox + s * L.archR - 2;
      px(x, oy, '#d9d2c3', 4, 34); px(x, oy, '#f8f5ee', 3, 34);
    }
    // 반원 꽃 장식
    for (let a = Math.PI; a <= Math.PI * 2 + 0.001; a += 0.025) {
      const x = ox + Math.cos(a) * L.archR, y = oy + Math.sin(a) * L.archR;
      for (let k = 0; k < 4; k++) px(x + r() * 8 - 4, y + r() * 8 - 4, ['#4f9a3f', '#3f8233', '#6fbf4f'][r() * 3 | 0], 2, 2);
    }
    for (let a = Math.PI; a <= Math.PI * 2 + 0.001; a += 0.06) {
      const x = ox + Math.cos(a) * L.archR + (r() * 6 - 3), y = oy + Math.sin(a) * L.archR + (r() * 6 - 3);
      const [p, ce] = r() < 0.55 ? FLOWERS[0] : FLOWERS[r() * FLOWERS.length | 0];
      flower(px, x, y, p, ce);
    }
    // 기둥 아래 꽃다발
    for (const s of [-1, 1]) {
      const x = ox + s * L.archR;
      for (let k = 0; k < 16; k++) px(x + r() * 10 - 5, oy + 26 + r() * 8, ['#4f9a3f', '#3f8233', '#6fbf4f'][r() * 3 | 0], 2, 2);
      for (let k = 0; k < 7; k++) {
        const [p, ce] = FLOWERS[r() * FLOWERS.length | 0];
        flower(px, x + r() * 10 - 5, oy + 24 + r() * 8, p, ce);
      }
    }
    // 기둥 덩굴
    for (const s of [-1, 1]) for (let y = 0; y < 26; y += 3) {
      px(ox + s * L.archR - 2 + (y % 2 ? 0 : 2), oy + y, '#4f9a3f', 2, 2);
      if (y % 9 === 0) flower(px, ox + s * L.archR, oy + y + 1, '#ffffff', '#f7d774');
    }
    return { img: c, x: L.cx - ox, y: L.archCY - oy, baseY: L.archCY + 26, kind: 'arch' };
  }

  function makeTree(x, y, R, seed) {
    const w = R * 2 + 4, h = R * 2 + 12;
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const px = painter(c.getContext('2d'));
    const r = rng(seed);
    const ox = w / 2, oy = R + 2;
    px(ox - 3, oy + R - 6, '#4f3420', 6, 14); px(ox - 2, oy + R - 6, '#7a5230', 4, 13); px(ox - 2, oy + R - 6, '#94673f', 1, 13);
    disc(px, ox, oy, R, '#2d6a2a');
    disc(px, ox, oy, R - 1, '#3f8a36');
    disc(px, ox - R * 0.18, oy - R * 0.18, Math.round(R * 0.72), '#4f9e40');
    disc(px, ox - R * 0.35, oy - R * 0.38, Math.round(R * 0.32), '#6fbf4f');
    for (let i = 0; i < R * R * 0.5; i++) {
      const a = r() * Math.PI * 2, d = r() * (R - 2);
      px(ox + Math.cos(a) * d, oy + Math.sin(a) * d, r() < 0.5 ? '#2f7a2c' : '#5fae47', 2, 1);
    }
    if (r() < 0.5) for (let i = 0; i < R / 2; i++) {
      const a = r() * Math.PI * 2, d = r() * (R - 4);
      flower(px, ox + Math.cos(a) * d, oy + Math.sin(a) * d, '#ffffff', '#f7d774');
    }
    return { img: c, x: x - ox, y: y - oy, baseY: y + R + 6, kind: 'tree' };
  }

  function makeStand(x, y, seed) {
    const c = document.createElement('canvas'); c.width = 10; c.height = 16;
    const px = painter(c.getContext('2d'));
    const r = rng(seed);
    px(3, 6, '#cfc6b4', 4, 10); px(3, 6, '#faf7f0', 3, 10); px(2, 14, '#cfc6b4', 6, 2);
    disc(px, 5, 4, 4, '#4f9a3f');
    for (let k = 0; k < 6; k++) {
      const [p, ce] = FLOWERS[(r() * 3) | 0];
      flower(px, 2 + r() * 6, 1 + r() * 5, p, ce);
    }
    return { img: c, x: x - 5, y: y - 16, baseY: y, kind: 'stand' };
  }

  function buildProps(L) {
    const props = [makeArch(L)];
    const { W, H, cx } = L;
    let seed = 11;
    // 위쪽 나무 줄
    for (let x = 10; x < W + 10; x += 34) {
      if (Math.abs(x - cx) < 78) continue;
      props.push(makeTree(x, 8 + ((x * 13) % 9), 15 + (x % 3) * 3, seed++));
    }
    // 양옆 나무
    for (let y = 60; y < H - 10; y += 46) {
      props.push(makeTree(6, y, 14, seed++));
      props.push(makeTree(W - 6, y + 22, 14, seed++));
    }
    // 꽃길 옆 꽃 스탠드
    for (let y = L.aisle.y0 + 22; y < H; y += 38) {
      props.push(makeStand(L.aisle.x0 - 8, y, seed++));
      props.push(makeStand(L.aisle.x1 + 7, y, seed++));
    }
    return props;
  }

  /* ---------- 장면 ---------- */
  // opts.cinematic: 식장 스크린용 연출(카메라, 이름표 정리, 정원 확장, 단체사진)
  // opts.onNotice(text): 안내 문구, opts.onPhoto(canvas, info): 단체사진이 찍혔을 때
  function create(canvas, opts = {}) {
    const ctx = canvas.getContext('2d');
    const cinematic = !!opts.cinematic;
    const notice = t => opts.onNotice && opts.onNotice(t);
    const state = {
      L: null, bg: null, props: [], s: 4, dpr: 1, cssW: 0, cssH: 0, density: 1,
      guests: new Map(), couple: [], petals: [], sparks: [],
      anchors: { groom: [], bride: [] },
      cam: { x: 0, y: 0, z: 1 }, focus: null, spotT: 25, nameT: 0,
      bubbleTimer: 2, coupleTimer: 8, t: 0, running: true,
      fade: null, flash: 0, event: null
    };
    const config = opts.config || {};
    const art = opts.art || {};
    const COUPLE_H = 44; // 그림 신랑·신부 키 (하객 도트 캐릭터는 약 24)
    const coupleMessages = (config.coupleMessages && config.coupleMessages.length) ? config.coupleMessages : ['오늘 정말 행복해요!'];

    /* ----- 크기 & 정원 넓이 ----- */
    function densityFor(n) {
      if (!cinematic) return 1;
      return n > 200 ? 1.75 : n > 120 ? 1.5 : n > 60 ? 1.25 : 1;
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const cssW = Math.max(100, rect.width), cssH = Math.max(80, rect.height);
      const dpr = Math.min(global.devicePixelRatio || 1, 2);
      const s = opts.worldHeight ? cssH / opts.worldHeight : Math.max(2, Math.round(cssH / (210 * state.density)));
      const W = Math.ceil(cssW / s), H = Math.ceil(cssH / s);
      const prev = state.L;
      canvas.width = Math.round(cssW * dpr); canvas.height = Math.round(cssH * dpr);
      Object.assign(state, { s, dpr, cssW, cssH });
      if (art.background) {
        state.L = layoutFromImage(W, H, art.background, art.layout);
        state.bg = null; state.props = []; // 나무·아치·꽃 스탠드는 그림에 들어 있음
      } else {
        state.L = layout(W, H);
        state.bg = buildBackground(state.L);
        state.props = buildProps(state.L);
      }
      state.cam = { x: W / 2, y: H / 2, z: 1 };
      // 그림 부품 하객의 키 (신랑·신부보다 조금 작게)
      state.avH = state.L.img ? state.L.img.h * 0.17 : 33;   // 하객 키: 신랑·신부(0.205)보다 조금 작게 (머리카락 포함 약 0.9배)
      for (const g of state.guests.values()) if (g.av) g.h = state.avH;
      placeCouple();
      buildAnchors();
      if (prev) for (const g of state.guests.values()) {
        g.x = g.x / prev.W * W; g.y = clampY(g.y / prev.H * H);
        assignHome(g);
        if (!g.lock && g.state !== 'enter' && g.state !== 'bow') { g.state = 'home'; g.tx = g.home.x; g.ty = g.home.y; }
      }
      state.petals = Array.from({ length: Math.round(W * H / 2200) }, () => newPetal(true));
    }

    function placeCouple() {
      const L = state.L;
      const groom = config.groom || {}, bride = config.bride || {};
      const old = state.couple;
      state.couple = [
        { id: '_groom', name: groom.name || '신랑', look: Sprite.sanitizeLook({ ...Sprite.GROOM, ...(groom.look || {}) }), x: L.groom.x, y: L.groom.y, dir: 'down', frame: 0, couple: true, nameA: 1 },
        { id: '_bride', name: bride.name || '신부', look: Sprite.sanitizeLook({ ...Sprite.BRIDE, ...(bride.look || {}) }), x: L.bride.x, y: L.bride.y, dir: 'down', frame: 0, couple: true, nameA: 1 }
      ];
      state.couple[1].look.acc = 'bride';
      // 그림 배경이 있으면 아치 크기에 맞춰 키를 정한다
      const ch = L.img ? L.img.h * 0.205 : COUPLE_H;
      if (art.groom) Object.assign(state.couple[0], { img: art.groom, h: ch });
      if (art.bride) Object.assign(state.couple[1], { img: art.bride, h: ch });
      if (old.length) state.couple.forEach((c, i) => { c.bubble = old[i].bubble; });
    }

    function clampY(y) { const w = state.L.walk; return Math.max(w.y0, Math.min(w.y1, y)); }

    /* ----- 신랑측 / 신부측 친구 무리 자리 ----- */
    function buildAnchors() {
      const L = state.L, w = L.walk;
      const r = rng(4242 + L.W);
      const make = (x0, x1) => {
        const list = [];
        const cols = Math.max(1, Math.round((x1 - x0) / 36));
        const rowsN = Math.max(1, Math.round((w.y1 - w.y0 - 14) / 30));
        for (let i = 0; i < cols; i++) for (let j = 0; j < rowsN; j++) {
          list.push({
            x: x0 + (i + 0.5) * (x1 - x0) / cols + (r() * 2 - 1) * 5,
            y: w.y0 + 10 + (j + 0.5) * (w.y1 - w.y0 - 18) / rowsN + (r() * 2 - 1) * 4,
            count: 0
          });
        }
        return list;
      };
      state.anchors = {
        groom: make(w.x0 + 6, L.aisle.x0 - 12),
        bride: make(L.aisle.x1 + 12, w.x1 - 6)
      };
    }

    function sideOf(g) { return g.side === 'groom' || g.side === 'bride' ? g.side : (g.seed % 2 ? 'groom' : 'bride'); }

    function assignHome(g) {
      if (g.anchor) g.anchor.count = Math.max(0, g.anchor.count - 1);
      const list = state.anchors[sideOf(g)];
      let best = list[0];
      for (const a of list) if (a.count < best.count || (a.count === best.count && Math.random() < 0.3)) best = a;
      best.count++;
      g.anchor = best;
      const ring = 5 + Math.min(10, best.count * 1.6);
      const ang = Math.random() * Math.PI * 2;
      g.home = { x: best.x + Math.cos(ang) * ring, y: clampY(best.y + Math.sin(ang) * ring * 0.6) };
    }

    function faceAnchor(g) {
      if (!g.anchor) return;
      const dx = g.anchor.x - g.x, dy = g.anchor.y - g.y;
      if (Math.hypot(dx, dy) < 3) { g.dir = 'down'; return; }
      g.dir = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down');
    }

    /* ----- 하객 추가/삭제 ----- */
    function addGuest(data, enter = false) {
      if (state.guests.has(data.id)) return;
      const L = state.L;
      const g = {
        id: data.id, name: data.name, message: data.message, side: data.side,
        v3: !!(global.Avatar && Avatar.isV3(data.look) && Avatar.v3),
        av: isAvatar(data.look) || !!(global.Avatar && Avatar.isV3(data.look) && Avatar.v3),
        look: (isAvatar(data.look) || (global.Avatar && Avatar.isV3(data.look))) ? data.look : Sprite.sanitizeLook(data.look),
        x: 0, y: 0, tx: 0, ty: 0, dir: 'down', frame: 0, animT: Math.random(), wait: Math.random() * 4,
        speed: 15 + Math.random() * 6, state: 'idle', bubble: null, seed: hashStr(data.id),
        born: enter ? state.t : -999, nameA: 0, nameUntil: 0
      };
      if (g.av) g.h = state.avH;
      assignHome(g);
      if (enter) {
        g.x = L.cx + (Math.random() * 2 - 1) * 8; g.y = L.H + 6;
        g.tx = L.cx + (Math.random() * 2 - 1) * 8;
        g.ty = L.walk.y0 + 12;
        g.state = 'enter'; g.speed = Math.max(17, (L.H - L.walk.y0) / 8);
        g.bubble = { text: data.message, until: state.t + 12 };
        for (let i = 0; i < 18; i++) spark(g.x, L.H - 14);
        // 클로즈업은 짧게, 연달아 오면 쉬어서 전체 모습도 보이게
        if (cinematic && !state.event && state.t - (state.lastCloseup || -99) > 12) {
          state.focus = { g, until: state.t + 5.5, z: 1.8 };
          state.lastCloseup = state.t;
        }
        if (state.event) { g.lock = true; g.state = 'wait'; g.tx = g.x; g.ty = L.H - 8; }
      } else {
        g.x = g.home.x; g.y = g.home.y; g.tx = g.x; g.ty = g.y;
        faceAnchor(g);
      }
      // 반려동물: 주인 옆에서 따라다님
      if (g.av && g.look.pet && Avatar.petSit(g.look.pet)) {
        g.pet = { id: g.look.pet, x: g.x + PET_DX, y: g.y + 1, dir: 'down', t: 0, still: 9 };
      }
      state.guests.set(g.id, g);
      checkDensity(enter);
      return g;
    }

    function removeGuest(id) {
      const g = state.guests.get(id);
      if (!g) return;
      if (g.anchor) g.anchor.count = Math.max(0, g.anchor.count - 1);
      if (state.focus && state.focus.g === g) state.focus = null;
      state.guests.delete(id);
      checkDensity();
    }
    function setGuests(list) { list.forEach(g => addGuest(g, false)); }

    function checkDensity(announce) {
      const d = densityFor(state.guests.size);
      if (d === state.density || state.event) return;
      const grew = d > state.density;
      // 이전 화면을 잠깐 겹쳐 그려 부드럽게 전환
      const snap = document.createElement('canvas');
      snap.width = canvas.width; snap.height = canvas.height;
      snap.getContext('2d').drawImage(canvas, 0, 0);
      state.fade = { img: snap, a: 1 };
      state.density = d;
      resize();
      if (grew && announce) notice('🌳 하객이 많아져서 정원을 넓혔어요');
    }

    function newPetal(anywhere) {
      const L = state.L;
      return {
        x: Math.random() * L.W, y: anywhere ? Math.random() * L.H : -4,
        vx: 3 + Math.random() * 5, vy: 6 + Math.random() * 6, ph: Math.random() * 6,
        c: Math.random() < 0.7 ? '#f7b3c9' : '#ffffff'
      };
    }
    function spark(x, y) {
      state.sparks.push({
        x: x + (Math.random() * 2 - 1) * 10, y: y + (Math.random() * 2 - 1) * 6,
        vy: -8 - Math.random() * 14, life: 1.2 + Math.random() * 0.8, age: 0,
        c: ['#ff8fb1', '#ffd36b', '#ffffff', '#ff6f9c'][Math.random() * 4 | 0], heart: Math.random() < 0.4
      });
    }

    /* ----- 단체사진 ----- */
    function formation(n) {
      const f = [...state.guests.values()].some(g => g.av) ? state.avH / 26 : 1;
      const L = state.L, dx = 11 * f;
      // 첫 줄 머리가 신랑·신부 허리쯤 오도록 (더 위면 신랑·신부 몸을 가림)
      const ch = (state.couple[0] && state.couple[0].h) || 44;
      const top = Math.max(L.walk.y0 + 2, L.groom.y + state.avH * 1.1 - ch * 0.45);
      // 화면 비율에 맞춰 너무 넓게 퍼지지 않게 (넓으면 사진 속 사람이 작아짐)
      const fit = Math.ceil(Math.sqrt(n * 2.4 * (L.W / L.H) / 1.8));
      const maxCols = Math.max(4, Math.min(Math.floor((L.W - 28) / dx), fit));
      const rowsCols = [];
      let left = n, row = 0;
      while (left > 0) { const c = Math.min(left, maxCols, 9 + row * 4); rowsCols.push(c); left -= c; row++; }
      let dy = 11 * f;
      const maxBottom = L.H - 6;
      if (top + (rowsCols.length - 1) * dy > maxBottom && rowsCols.length > 1) dy = (maxBottom - top) / (rowsCols.length - 1);
      const spots = [];
      rowsCols.forEach((cols, r) => {
        for (let i = 0; i < cols; i++) spots.push({ x: L.cx + (i - (cols - 1) / 2) * dx + (r % 2 ? dx / 4 : -dx / 4), y: top + r * dy });
      });
      return spots;
    }

    function startPhoto(text) {
      if (state.event || state.guests.size === 0) return false;
      const list = [...state.guests.values()];
      const spots = formation(list.length).sort((a, b) => a.y - b.y || a.x - b.x);
      list.sort((a, b) => a.y - b.y || a.x - b.x);
      list.forEach((g, i) => {
        g.lock = true; g.state = 'photo'; g.bubble = null;
        g.tx = spots[i].x; g.ty = spots[i].y; g.speed = 26 + Math.random() * 6;
      });
      state.focus = null;
      state.couple.forEach(c => { c.bubble = null; });
      // 대형 + 신랑신부가 화면에 꽉 차도록 카메라 범위 계산
      const xs = spots.map(p => p.x), ys = spots.map(p => p.y);
      const box = {
        x0: Math.min(...xs, state.L.groom.x) - 14, x1: Math.max(...xs, state.L.bride.x) + 14,
        y0: Math.min(state.L.archCY - state.L.archR, ...ys) - 4, y1: Math.max(...ys) + 12
      };
      state.event = { phase: 'gather', t: 0, count: state.guests.size, box };
      notice(text || '📸 단체사진 찍을게요! 꽃길 앞으로 모여 주세요');
      return true;
    }

    function updatePhoto(dt) {
      const e = state.event;
      e.t += dt;
      const members = [...state.guests.values()].filter(g => g.state === 'photo');
      if (e.phase === 'gather') {
        const ready = members.every(g => Math.hypot(g.tx - g.x, g.ty - g.y) < 1);
        if (ready || e.t > 11) {
          members.forEach(g => { g.x = g.tx; g.y = g.ty; g.dir = 'down'; g.frame = 0; });
          state.couple.forEach(c => { c.dir = 'down'; c.bubble = null; });
          e.phase = 'count'; e.t = 0;
        }
      } else if (e.phase === 'count') {
        members.forEach(g => { g.dir = 'down'; });
        if (e.t >= 3) { e.phase = 'shot'; e.t = 0; e.capture = true; state.flash = 1; }
      } else if (e.phase === 'shot') {
        if (e.t > 3.2) {
          for (const g of state.guests.values()) {
            g.lock = false;
            if (g.state === 'photo' || g.state === 'wait') {
              g.state = 'home'; g.tx = g.home.x; g.ty = g.home.y; g.speed = 13 + Math.random() * 6;
            }
          }
          state.event = null;
          state.spotT = 20;
          checkDensity();
        }
      }
    }

    /* ----- 업데이트 ----- */
    function update(dt) {
      state.t += dt;
      const L = state.L;
      const n = state.guests.size;
      const calm = n > 80 ? 0.3 : n > 40 ? 0.55 : 1; // 사람이 많을수록 덜 움직인다

      for (const g of state.guests.values()) {
        const dx = g.tx - g.x, dy = g.ty - g.y, dist = Math.hypot(dx, dy);
        if (dist > 0.6) {
          const step = Math.min(dist, g.speed * dt);
          g.x += dx / dist * step; g.y += dy / dist * step;
          g.dir = Math.abs(dx) > Math.abs(dy) * 1.2 ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down');
          g.animT += dt;
          g.frame = [1, 0, 2, 0][Math.floor(g.animT * 7) % 4];
          // 그림 캐릭터 걸음: 걸은 거리만큼 깡충 위상이 돈다 (약 4.5px마다 한 번)
          g.walkPh = (g.walkPh || 0) + step / 4.5 * Math.PI;
          g.walkAmt = Math.min(1, (g.walkAmt || 0) + dt * 5);
          g.moving = true;
        } else {
          g.frame = 0;
          g.moving = false;
          // 멈추면 진행 중이던 깡충을 마저 착지시키며 서서히 멈춘다
          if (g.walkAmt > 0) {
            g.walkAmt = Math.max(0, g.walkAmt - dt * 4);
            if (Math.abs(Math.sin(g.walkPh)) > 0.05) g.walkPh += dt * 6;
          }
          if (g.lock) continue;
          if (g.state === 'enter') {
            // 꽃길 끝에서 신랑·신부에게 인사
            g.state = 'bow'; g.dir = 'up'; g.wait = 1.8;
            for (let i = 0; i < 10; i++) spark(g.x, g.y - 20);
            continue;
          }
          if (g.state === 'bow') {
            g.wait -= dt;
            if (g.wait <= 0) {
              g.state = 'home'; g.tx = g.home.x; g.ty = g.home.y; g.speed = 16;
            }
            continue;
          }
          if (g.state === 'home' || g.state === 'visit') {
            if (g.state === 'visit') { g.state = 'visiting'; g.wait = 3 + Math.random() * 4; }
            else { g.state = 'idle'; g.wait = 2 + Math.random() * 4; faceAnchor(g); }
          }
          g.wait -= dt;
          if (g.wait <= 0) {
            const r = Math.random();
            if (g.state === 'visiting') {
              g.state = 'home'; g.tx = g.home.x; g.ty = g.home.y; g.speed = 12 + Math.random() * 6;
            } else if (r < 0.5) {
              // 무리 쪽을 보거나 두리번거리기
              if (Math.random() < 0.7) faceAnchor(g); else g.dir = ['down', 'left', 'right'][Math.random() * 3 | 0];
              g.wait = (2 + Math.random() * 4) * (1 + n / 120);
            } else if (r < 0.5 + 0.35 * calm) {
              // 제자리 근처에서 살짝 이동
              g.state = 'home';
              g.tx = g.home.x + (Math.random() * 2 - 1) * 6; g.ty = clampY(g.home.y + (Math.random() * 2 - 1) * 4);
              g.speed = 8 + Math.random() * 5;
            } else if (r < 0.5 + 0.47 * calm) {
              // 다른 무리에 놀러 가기
              const list = state.anchors[sideOf(g)];
              const a = list[Math.random() * list.length | 0];
              g.state = 'visit';
              g.tx = a.x + (Math.random() * 2 - 1) * 12; g.ty = clampY(a.y + (Math.random() * 2 - 1) * 8);
              g.speed = 12 + Math.random() * 6;
            } else {
              g.wait = 3 + Math.random() * 4;
            }
          }
        }
        if (g.bubble && state.t > g.bubble.until) g.bubble = null;
      }

      updatePets(dt);

      // 신랑신부: 가끔 서로 바라보기
      state.couple.forEach((c, i) => {
        if (state.event || c.img) { if (c.bubble && state.t > c.bubble.until) c.bubble = null; return; }
        c.turnT = (c.turnT || 3 + i) - dt;
        if (c.turnT <= 0) {
          c.dir = c.dir === 'down' && Math.random() < 0.5 ? (i === 0 ? 'right' : 'left') : 'down';
          c.turnT = c.dir === 'down' ? 5 + Math.random() * 5 : 1.6;
        }
        if (c.bubble && state.t > c.bubble.until) c.bubble = null;
      });

      if (state.event) updatePhoto(dt);
      else {
        // 말풍선 순환
        state.bubbleTimer -= dt;
        if (state.bubbleTimer <= 0) {
          state.bubbleTimer = 2.2 + Math.random() * 1.6;
          const list = [...state.guests.values()];
          const active = list.filter(g => g.bubble).length;
          const max = Math.max(1, Math.min(4, Math.ceil(list.length / 8)));
          if (active < max) {
            const free = list.filter(g => !g.bubble && g.message && g.state !== 'enter' && g.state !== 'bow');
            const pick = free[Math.random() * free.length | 0];
            if (pick) pick.bubble = { text: pick.message, until: state.t + 6.5 };
          }
        }
        state.coupleTimer -= dt;
        if (state.coupleTimer <= 0) {
          state.coupleTimer = 18 + Math.random() * 14;
          const c = state.couple[Math.random() * 2 | 0];
          c.bubble = { text: coupleMessages[Math.random() * coupleMessages.length | 0], until: state.t + 5 };
        }
      }

      if (cinematic) updateCamera(dt);
      updateNames(dt);

      for (const p of state.petals) {
        p.ph += dt * 2; p.x += (p.vx + Math.sin(p.ph) * 6) * dt; p.y += p.vy * dt;
        if (p.y > L.H + 4 || p.x > L.W + 4) Object.assign(p, newPetal(false), { x: Math.random() * L.W * 1.2 - L.W * 0.2 });
      }
      for (const s of state.sparks) { s.age += dt; s.y += s.vy * dt; s.vy *= 0.97; }
      state.sparks = state.sparks.filter(s => s.age < s.life);
      if (state.flash > 0) state.flash = Math.max(0, state.flash - dt * 1.4);
      if (state.fade) { state.fade.a -= dt * 1.3; if (state.fade.a <= 0) state.fade = null; }
    }

    /* ----- 반려동물 ----- */
    function updatePets(dt) {
      for (const g of state.guests.values()) {
        const p = g.pet;
        if (!p) continue;
        // 주인의 걷는 방향 뒤쪽 옆자리로 따라간다
        const side = g.dir === 'left' ? 1 : -1;
        const tx = g.x + PET_DX * (g.dir === 'left' || g.dir === 'right' ? side : 1);
        const ty = g.y + 1;
        const dx = tx - p.x, dy = ty - p.y, d = Math.hypot(dx, dy);
        if (d > 2.5) {
          const sp = Math.max(14, (g.speed || 16) * 1.15) * (d > 14 ? 1.6 : 1);
          const st = Math.min(d, sp * dt);
          p.x += dx / d * st; p.y += dy / d * st;
          p.dir = Math.abs(dx) > Math.abs(dy) * 0.8 ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down');
          p.t += dt; p.still = 0;
        } else {
          p.still += dt;
        }
      }
    }

    /* ----- 카메라 ----- */
    function updateCamera(dt) {
      const L = state.L, n = state.guests.size;
      // 한동안 조용하면 한 명을 골라 클로즈업 (스포트라이트)
      if (!state.focus && !state.event && n >= 6) {
        state.spotT -= dt;
        if (state.spotT <= 0) {
          const pool = [...state.guests.values()].filter(g => g.message && g.state === 'idle');
          const g = pool[Math.random() * pool.length | 0];
          if (g) {
            state.focus = { g, until: state.t + 7.5, z: 1.8, spot: true };
            state.lastCloseup = state.t;
            g.bubble = { text: g.message, until: state.t + 7.5 };
          }
          state.spotT = 26 + Math.random() * 12;
        }
      }
      if (state.focus && (state.t > state.focus.until || !state.guests.has(state.focus.g.id))) state.focus = null;

      let tx = L.W / 2, ty = L.H / 2, tz = 1;
      if (state.event) {
        const b = state.event.box;
        tz = Math.max(1, Math.min(2.6, Math.min(L.W / (b.x1 - b.x0), L.H / (b.y1 - b.y0)) * 0.94));
        tx = (b.x0 + b.x1) / 2; ty = (b.y0 + b.y1) / 2 + (L.H / tz) * 0.06;
      } else if (state.focus) {
        tz = state.focus.z;
        tx = state.focus.g.x; ty = state.focus.g.y - 16;
      }
      const hw = L.W / (2 * tz), hh = L.H / (2 * tz);
      tx = Math.max(hw, Math.min(L.W - hw, tx));
      ty = Math.max(hh, Math.min(L.H - hh, ty));
      const k = 1 - Math.exp(-dt * (state.focus ? 2.2 : 1.6));
      const c = state.cam;
      c.z += (tz - c.z) * k;
      c.x += (tx - c.x) * k; c.y += (ty - c.y) * k;
      const hw2 = L.W / (2 * c.z), hh2 = L.H / (2 * c.z);
      c.x = Math.max(hw2, Math.min(L.W - hw2, c.x));
      c.y = Math.max(hh2, Math.min(L.H - hh2, c.y));
    }

    /* ----- 이름표: 붐비면 필요한 사람만 ----- */
    function updateNames(dt) {
      const n = state.guests.size;
      const crowded = cinematic && n > 35;
      if (crowded) {
        state.nameT -= dt;
        if (state.nameT <= 0) {
          state.nameT = 5;
          // 무리 하나를 골라 이름을 잠깐 보여준다
          const sides = ['groom', 'bride'];
          const list = state.anchors[sides[Math.random() * 2 | 0]];
          const a = list[Math.random() * list.length | 0];
          for (const g of state.guests.values()) if (g.anchor === a) g.nameUntil = state.t + 5;
        }
      }
      const e = state.event;
      const k = Math.min(1, dt * 4);
      for (const g of state.guests.values()) {
        let target = 1;
        if (e && e.phase !== 'gather') target = 0;
        else if (crowded) {
          const focused = state.focus && state.focus.g === g;
          target = (g.bubble || focused || state.t - g.born < 45 || state.t < g.nameUntil) ? 1 : 0;
        }
        g.nameA += (target - g.nameA) * k;
      }
    }

    /* ----- 그리기 ----- */
    function wrap(text, maxW) {
      const words = String(text).split(' ');
      const lines = [];
      let line = '';
      const push = w => {
        if (ctx.measureText(w).width <= maxW) return w;
        let cur = '';
        for (const ch of w) {
          if (ctx.measureText(cur + ch).width > maxW) { lines.push(cur); cur = ch; } else cur += ch;
        }
        return cur;
      };
      for (const w of words) {
        const test = line ? line + ' ' + w : w;
        if (ctx.measureText(test).width <= maxW) line = test;
        else { if (line) lines.push(line); line = push(w); }
      }
      if (line) lines.push(line);
      return lines.slice(0, 4);
    }

    function layoutBubble(x, y, text, size) {
      ctx.font = `${size}px Galmuri11, Galmuri9, monospace`;
      const lines = wrap(text, size * 11);
      const lh = Math.round(size * 1.35);
      const w = Math.max(...lines.map(l => ctx.measureText(l).width)) + size * 1.4;
      const h = lines.length * lh + size * 0.9;
      let bx = Math.round(x - w / 2), by = Math.round(y - h - size * 0.6);
      bx = Math.max(4, Math.min(state.cssW - w - 4, bx));
      return { x, y, lines, lh, size, w, h, bx, by };
    }

    function drawBubble(b) {
      const { x, y, lines, lh, size, w, h, bx } = b;
      const by = Math.max(4, b.by);
      const bw = Math.max(2, Math.round(size / 6));
      ctx.font = `${size}px Galmuri11, Galmuri9, monospace`;
      const tx = Math.round(Math.max(bx + 8, Math.min(bx + w - 8, x)));
      // 다른 말풍선을 피해 위로 밀렸으면 연결선
      if (y - (by + h) > size * 0.9) {
        ctx.fillStyle = '#2a2030';
        ctx.fillRect(tx - 1, by + h, 2, y - (by + h) - size * 0.3);
      }
      ctx.fillStyle = '#2a2030';
      ctx.fillRect(bx - bw, by, w + bw * 2, h);
      ctx.fillRect(bx, by - bw, w, h + bw * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(bx, by, w, h);
      const t = Math.round(size * 0.45);
      ctx.fillStyle = '#2a2030';
      for (let i = 0; i <= t; i++) ctx.fillRect(tx - (t - i) - bw / 2, by + h + bw + i - bw, (t - i) * 2 + bw, 1.01);
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < t - bw; i++) ctx.fillRect(tx - (t - bw - i), by + h + i, (t - bw - i) * 2, 1.01);
      ctx.fillStyle = '#2a2030';
      ctx.textBaseline = 'top'; ctx.textAlign = 'center';
      lines.forEach((l, i) => ctx.fillText(l, bx + w / 2, by + size * 0.5 + i * lh));
    }

    function drawName(x, y, name, size, alpha) {
      if (!name || alpha < 0.02) return;
      ctx.globalAlpha = Math.min(1, alpha);
      ctx.font = `${size}px Galmuri11, Galmuri9, monospace`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.lineJoin = 'round';
      ctx.lineWidth = Math.max(2, size / 4);
      ctx.strokeStyle = 'rgba(42,32,48,0.85)';
      ctx.strokeText(name, x, y);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(name, x, y);
      ctx.globalAlpha = 1;
    }

    function drawCenterText(text, size, y) {
      ctx.font = `${size}px Galmuri11, Galmuri9, monospace`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.lineJoin = 'round';
      ctx.lineWidth = Math.max(4, size / 7);
      ctx.strokeStyle = '#2a2030';
      ctx.strokeText(text, state.cssW / 2, y);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, state.cssW / 2, y);
    }

    function draw() {
      const { s, dpr, L, cam } = state;
      const S = s * cam.z;
      const ox = state.cssW / 2 - cam.x * S, oy = state.cssH / 2 - cam.y * S;
      const toX = wx => wx * S + ox, toY = wy => wy * S + oy;

      ctx.setTransform(dpr * S, 0, 0, dpr * S, Math.round(dpr * ox), Math.round(dpr * oy));
      if (state.L.img) {
        const im = state.L.img;
        ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(im.el, im.x, im.y, im.w, im.h);
      } else {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(state.bg, 0, 0);
      }
      ctx.imageSmoothingEnabled = false;

      const chars = [...state.couple, ...state.guests.values()];
      const items = [
        ...state.props.map(p => ({ y: p.baseY, prop: p })),
        ...chars.map(c => ({ y: c.y, ch: c })),
        ...[...state.guests.values()].filter(g => g.pet).map(g => ({ y: g.pet.y, pet: g.pet, owner: g }))
      ].sort((a, b) => a.y - b.y);

      for (const it of items) {
        if (it.prop) { ctx.drawImage(it.prop.img, Math.round(it.prop.x), Math.round(it.prop.y)); continue; }
        if (it.pet) {
          const p = it.pet, own = it.owner;
          const a = own.v3 ? { height: 244 } : Avatar.compose(own.look);   // 반려동물 그림 단위 = 예전 몸통 단위
          if (!a) continue;
          const k = own.h / a.height * 1.35; // 사람 비율보다 살짝 크게 (화면에서 잘 보이게)
          // 0.6초 넘게 멈춰 있으면 앉기, 걸을 땐 걷기 프레임
          const img = p.still > 0.6 ? Avatar.petSit(p.id)
            : Avatar.petFrame(p.id, p.dir, Math.floor(p.t * (p.dir === 'left' || p.dir === 'right' ? 6 : 10)));
          if (!img) continue;
          const w = img.naturalWidth * k, h = img.naturalHeight * k;
          ctx.fillStyle = 'rgba(30,40,20,0.2)';
          ctx.fillRect(p.x - w * 0.3, Math.round(p.y) - 1, w * 0.6, 1.5);
          ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, p.x - w / 2, p.y - h, w, h);
          ctx.imageSmoothingEnabled = false;
          continue;
        }
        const c = it.ch;
        if (c.v3) {
          // 기준 시트 방식: 방향·걸음 그림을 그대로
          const fi = c.moving ? Math.floor((c.walkPh || 0) / Math.PI * 4.5 / (c.h * 0.7 / 4)) : 0;
          const img = Avatar.composeV3(c.look, c.dir, c.moving ? fi : 0);
          if (img) {
            const k = c.h / (img.foot.y - Avatar.v3.pad);
            ctx.fillStyle = 'rgba(30,40,20,0.22)';
            ctx.fillRect(c.x - 9, Math.round(c.y) - 1, 18, 2);
            ctx.save();
            ctx.translate(c.x, c.y);
            if (c.dir === 'right') ctx.scale(-1, 1);
            ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, -img.foot.x * k, -img.foot.y * k, img.width * k, img.height * k);
            ctx.restore();
            ctx.imageSmoothingEnabled = false;
            continue;
          }
        }
        if (c.av) {
          const a = Avatar.compose(c.look);
          if (a) {
            const h = c.h, w = a.width * h / a.height, k = h / a.height;
            const moving = !!c.moving;
            ctx.fillStyle = 'rgba(30,40,20,0.22)';
            ctx.fillRect(c.x - w * 0.28, Math.round(c.y) - 1, w * 0.56, 2);
            ctx.save();
            ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
            if (moving && Avatar.canWalk) {
              // 걷기 시트 8프레임 (걸은 거리만큼 넘김) + 하객 머리
              // 8프레임 한 바퀴 = 키의 70%만큼 걸었을 때 (보폭에 맞춘 속도)
              const walked = (c.walkPh || 0) / Math.PI * 4.5;
              const fi = Math.floor(walked / (h * 0.7 / 8));
              const body = Avatar.walkBody(c.look, c.dir, fi);
              const view = c.dir === 'up' ? 'back' : (c.dir === 'left' || c.dir === 'right') ? 'side' : 'front';
              const head = Avatar.composeHead(c.look, view);
              if (body && head) {
                // 걷기 몸통을 서 있는 몸통과 같은 키로 (머리 크기는 그대로) → 걸어도 키·비율이 안 변함
                const standBody = a.height - a.neck.y, walkBody = body.height - body.neck.y;
                const kb = k * Math.max(0.85, Math.min(1.2, standBody / walkBody));
                const by = c.y - body.height * kb;
                const nx = c.x, ny = by + body.neck.y * kb;          // 목 위치 (화면)
                const bob = (fi % 2 ? -0.4 : 0);
                ctx.drawImage(body, c.x - body.neck.x * kb, by, body.width * kb, body.height * kb);
                // 머리는 목에 맞춰서. 옆모습 그림은 왼쪽을 봄 → 오른쪽으로 걸을 땐 뒤집는다
                ctx.save();
                ctx.translate(nx, ny + bob);
                if (c.dir === 'right') ctx.scale(-1, 1);
                ctx.drawImage(head, -head.anchor.x * k, -head.anchor.y * k, head.width * k, head.height * k);
                ctx.restore();
                ctx.restore();
                ctx.imageSmoothingEnabled = false;
                continue;
              }
            }
            // 서 있을 때: 고른 옷 그대로 + 숨쉬기
            const breathe = 1 + Math.sin(state.t * 2.4 + (c.seed % 7)) * 0.008;
            ctx.translate(c.x, c.y);
            ctx.scale(1, breathe);
            ctx.drawImage(a, -a.neck.x * k, -h, w, h);
            ctx.restore();
            ctx.imageSmoothingEnabled = false;
            continue;
          }
        }
        if (!c.img) {
          ctx.fillStyle = 'rgba(30,40,20,0.22)';
          ctx.fillRect(Math.round(c.x) - 5, Math.round(c.y) - 1, 10, 2);
          ctx.fillRect(Math.round(c.x) - 4, Math.round(c.y) + 1, 8, 1);
        }
        if (c.img) {
          // 그림 캐릭터: 가만히 서서 숨 쉬듯 살짝 들썩
          const h = c.h, w = c.img.naturalWidth * h / c.img.naturalHeight;
          const bob = Math.sin(state.t * 2.2 + (c.id === '_bride' ? 1.3 : 0)) > 0.85 ? 0.5 : 0;
          ctx.fillStyle = 'rgba(30,40,20,0.22)';
          ctx.fillRect(Math.round(c.x - w * 0.35), Math.round(c.y) - 1, Math.round(w * 0.7), 2);
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(c.img, c.x - w / 2, c.y - h - bob, w, h);
          ctx.imageSmoothingEnabled = false;
          continue;
        }
        ctx.drawImage(Sprite.render(c.look, c.dir, c.frame), Math.round(c.x - SW / 2), Math.round(c.y - FOOT));
      }

      for (const p of state.petals) {
        ctx.fillStyle = p.c;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), Math.sin(p.ph) > 0 ? 2 : 1, 1);
      }
      for (const sp of state.sparks) {
        ctx.globalAlpha = 1 - sp.age / sp.life;
        ctx.fillStyle = sp.c;
        const x = Math.round(sp.x), y = Math.round(sp.y);
        if (sp.heart) { ctx.fillRect(x - 1, y, 1, 1); ctx.fillRect(x + 1, y, 1, 1); ctx.fillRect(x - 1, y + 1, 3, 1); ctx.fillRect(x, y + 2, 1, 1); }
        else { ctx.fillRect(x, y - 1, 1, 3); ctx.fillRect(x - 1, y, 3, 1); }
        ctx.globalAlpha = 1;
      }

      // 글자 (화면 좌표)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const nameSize = Math.max(10, Math.min(30, Math.round(S * 2.5)));
      const bubbleSize = Math.max(11, Math.min(34, Math.round(S * 3)));
      const sorted = chars.sort((a, b) => a.y - b.y);
      // 단체사진 중에는 신랑·신부 이름표를 숨김 (앞줄 하객 얼굴에 겹침)
      const photoOn = state.event && state.event.phase !== undefined;
      for (const c of sorted) drawName(toX(c.x), toY(c.y + 2), c.name, nameSize, c.couple ? (photoOn ? 0 : 1) : c.nameA);

      // 말풍선: 아래쪽 사람부터 자리를 잡고, 겹치면 위로 민다
      const bubbles = sorted.filter(c => c.bubble).reverse()
        .map(c => layoutBubble(toX(c.x), toY(c.y - (c.h || FOOT) - 1), c.bubble.text, bubbleSize));
      const placed = [];
      for (const b of bubbles) {
        for (let tries = 0; tries < 8; tries++) {
          const hit = placed.find(p => b.bx < p.bx + p.w + 6 && b.bx + b.w + 6 > p.bx && b.by < p.by + p.h + 8 && b.by + b.h + 8 > p.by);
          if (!hit) break;
          b.by = hit.by - b.h - 10;
        }
        placed.push(b);
      }
      placed.reverse().forEach(drawBubble);

      // 이벤트 사진: 연출 오버레이 전에 찍는다
      const e = state.event;
      if (e && e.capture) {
        e.capture = false;
        const shot = document.createElement('canvas');
        shot.width = canvas.width; shot.height = canvas.height;
        shot.getContext('2d').drawImage(canvas, 0, 0);
        opts.onPhoto && opts.onPhoto(shot, { count: e.count });
      }

      // 클로즈업 비네트
      if (cam.z > 1.03 && !e) {
        const a = Math.min(0.42, (cam.z - 1) * 0.45);
        const gr = ctx.createRadialGradient(state.cssW / 2, state.cssH / 2, Math.min(state.cssW, state.cssH) * 0.3, state.cssW / 2, state.cssH / 2, Math.max(state.cssW, state.cssH) * 0.75);
        gr.addColorStop(0, 'rgba(20,14,24,0)');
        gr.addColorStop(1, `rgba(20,14,24,${a})`);
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, state.cssW, state.cssH);
      }

      if (e && e.phase === 'count') {
        const num = Math.max(1, Math.ceil(3 - e.t));
        const pulse = 1 + (1 - ((3 - e.t) % 1)) * 0.25;
        drawCenterText(String(num), Math.round(state.cssH / 7 * pulse), state.cssH * 0.79);
        drawCenterText('다 같이 웃어요!', Math.round(state.cssH / 26), state.cssH * 0.92);
      }
      if (e && e.phase === 'shot' && e.t > 0.4) drawCenterText('찰칵! 📸', Math.round(state.cssH / 12), state.cssH * 0.8);
      if (state.flash > 0) {
        ctx.fillStyle = `rgba(255,255,255,${state.flash})`;
        ctx.fillRect(0, 0, state.cssW, state.cssH);
      }
      if (state.fade) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = Math.max(0, state.fade.a);
        ctx.drawImage(state.fade.img, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      }
    }

    let last = performance.now();
    function frame(now) {
      if (!state.running) return;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      update(dt);
      draw();
      requestAnimationFrame(frame);
    }

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    requestAnimationFrame(t => { last = t; frame(t); });

    return {
      addGuest, removeGuest, setGuests, startPhoto,
      get count() { return state.guests.size; },
      get busy() { return !!state.event; },
      _peek() { return { guests: [...state.guests.values()], s: state.s, cam: state.cam, cssW: state.cssW, cssH: state.cssH }; },
      advance(sec) { for (let i = 0; i < sec * 20; i++) update(0.05); draw(); },
      get debug() { return { event: state.event && { phase: state.event.phase, t: state.event.t }, cam: state.cam, n: state.guests.size, density: state.density }; },
      say(id, text, sec = 7) { const g = state.guests.get(id); if (g) g.bubble = { text, until: state.t + sec }; },
      destroy() { state.running = false; ro.disconnect(); }
    };
  }

  // config.art = { background, groom, bride, layout } 경로의 그림을 불러온다. 없거나 실패하면 도트 그림으로.
  function loadArt(artConfig) {
    const a = artConfig || {};
    const load = src => new Promise(res => {
      if (!src) return res(null);
      const im = new Image();
      im.onload = () => res(im);
      im.onerror = () => { console.warn('그림을 불러오지 못했어요:', src); res(null); };
      im.src = src;
    });
    return Promise.all([load(a.background), load(a.groom), load(a.bride)])
      .then(([background, groom, bride]) => ({ background, groom, bride, layout: a.layout }));
  }

  global.Scene = { create, loadArt };
})(window);
