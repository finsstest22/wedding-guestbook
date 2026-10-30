/* 픽셀 캐릭터 생성기 — 하객 외형(look)을 20x26 픽셀 스프라이트로 그린다. */
(function (global) {
  'use strict';

  const W = 20, H = 26, CX = 10;
  // 머리 모양: y -> 반폭(hw). 열 범위는 [CX-hw, CX+hw-1]
  const HEAD = { 3: 3, 4: 5, 5: 6, 6: 6, 7: 6, 8: 6, 9: 6, 10: 6, 11: 5, 12: 4 };

  const HAIR_STYLES = ['short', 'side', 'fluffy', 'curtain', 'long', 'bob', 'ponytail', 'bun'];
  const OUTFITS = ['tee', 'suit', 'hoodie', 'cardigan', 'shirt', 'dress', 'skirt', 'tux', 'gown'];

  /* ---------- 색 유틸 ---------- */
  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  }
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return [h, s, l];
  }
  function hslToRgb(h, s, l) {
    if (s === 0) return [l * 255, l * 255, l * 255];
    const hue = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return [hue(p, q, h + 1 / 3) * 255, hue(p, q, h) * 255, hue(p, q, h - 1 / 3) * 255];
  }
  function adjust(hex, { dl = 0, ds = 0, minL = 0, maxL = 1, minS = 0, maxS = 1 } = {}) {
    const [h, s, l] = rgbToHsl(...hexToRgb(hex));
    const nl = Math.max(minL, Math.min(maxL, l + dl));
    const ns = Math.max(minS, Math.min(maxS, s + ds));
    return rgbToHex(...hslToRgb(h, ns, nl));
  }
  const darken = (hex, a) => adjust(hex, { dl: -a });
  const lighten = (hex, a) => adjust(hex, { dl: a });
  function mix(a, b, t) {
    const x = hexToRgb(a), y = hexToRgb(b);
    return rgbToHex(x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t);
  }
  function luminance(hex) {
    const [r, g, b] = hexToRgb(hex);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  /* ---------- 그리드 ---------- */
  function makeGrid() { return Array.from({ length: H }, () => Array(W).fill(null)); }
  function set(g, x, y, c) { if (x >= 0 && x < W && y >= 0 && y < H) g[y][x] = c; }
  function get(g, x, y) { return (x >= 0 && x < W && y >= 0 && y < H) ? g[y][x] : null; }
  function span(g, y, x0, x1, c) { for (let x = x0; x <= x1; x++) set(g, x, y, c); }
  function hs(g, y, hw, c) { span(g, y, CX - hw, CX + hw - 1, c); }
  function rows(g, y0, y1, x0, x1, c) { for (let y = y0; y <= y1; y++) span(g, y, x0, x1, c); }

  /* ---------- 머리(얼굴) ---------- */
  function paintHead(g, view) {
    for (const y in HEAD) hs(g, +y, HEAD[y], 's');
    if (view === 'down') {
      set(g, 7, 8, 'e'); set(g, 7, 9, 'e'); set(g, 12, 8, 'e'); set(g, 12, 9, 'e');
      set(g, 6, 10, 'b'); set(g, 13, 10, 'b');
      set(g, 9, 11, 'm'); set(g, 10, 11, 'm');
    } else if (view === 'side') {
      set(g, 6, 8, 'e'); set(g, 6, 9, 'e');
      set(g, 5, 10, 'b');
      set(g, 10, 9, 'S'); set(g, 10, 10, 'S');
    }
  }

  /* ---------- 머리카락 ---------- */
  function cap(g, tall) {
    if (tall) { span(g, 1, 7, 8, 'h'); span(g, 1, 11, 12, 'h'); hs(g, 2, 5, 'h'); }
    else hs(g, 2, 4, 'h');
    hs(g, 3, 6, 'h'); hs(g, 4, 7, 'h'); hs(g, 5, 7, 'h'); hs(g, 6, 7, 'h');
  }
  function bun(g, view) {
    if (view === 'side') { span(g, 0, 12, 13, 'h'); span(g, 1, 11, 14, 'h'); span(g, 2, 11, 14, 'h'); return; }
    span(g, 0, 9, 10, 'h'); span(g, 1, 8, 11, 'h'); span(g, 2, 8, 11, 'h');
  }
  function sidesFront(g, y0, y1, outer) {
    for (let y = y0; y <= y1; y++) {
      span(g, y, outer ? 2 : 3, 4, 'h');
      span(g, y, 15, outer ? 17 : 16, 'h');
    }
  }

  function hairBack(g, style, view) {
    // 몸 뒤로 내려가는 머리 (몸보다 먼저 칠함)
    if (view === 'side') {
      if (style === 'long') rows(g, 12, 18, 12, 17, 'h');
      if (style === 'ponytail') { rows(g, 5, 11, 16, 17, 'h'); rows(g, 8, 13, 18, 18, 'h'); }
    }
  }

  function hairFront(g, style, view) {
    const long = style === 'long', bob = style === 'bob';
    if (view === 'down') {
      cap(g, style === 'fluffy');
      if (style === 'bun') bun(g, view);
      switch (style) {
        case 'side':
          span(g, 7, 3, 10, 'h'); span(g, 7, 15, 16, 'h');
          span(g, 8, 3, 5, 'h'); span(g, 8, 15, 16, 'h');
          sidesFront(g, 9, 9, false);
          break;
        case 'curtain':
        case 'bun':
          set(g, 9, 5, 's'); set(g, 9, 6, 's'); set(g, 10, 6, 's');
          span(g, 7, 3, 8, 'h'); span(g, 7, 11, 16, 'h');
          span(g, 8, 3, 5, 'h'); span(g, 8, 14, 16, 'h');
          sidesFront(g, 9, style === 'bun' ? 10 : 10, false);
          break;
        case 'fluffy':
          hs(g, 7, 7, 'h');
          set(g, 5, 8, 'h'); set(g, 9, 8, 'h'); set(g, 10, 8, 'h'); set(g, 14, 8, 'h');
          sidesFront(g, 8, 9, false);
          break;
        default: // short, long, bob, ponytail — 앞머리 있는 스타일
          hs(g, 7, 7, 'h');
          span(g, 8, 3, 5, 'h'); span(g, 8, 14, 16, 'h');
          set(g, 9, 8, 'h'); set(g, 10, 8, 'h');
          if (long) sidesFront(g, 9, 18, true);
          else if (bob) { sidesFront(g, 9, 12, false); set(g, 5, 12, 'h'); set(g, 14, 12, 'h'); }
          else if (style === 'ponytail') { sidesFront(g, 9, 10, false); rows(g, 7, 13, 17, 17, 'H'); }
          else sidesFront(g, 9, 9, false);
      }
      // 하이라이트
      set(g, 6, 3, 'l'); set(g, 7, 3, 'l'); set(g, 5, 4, 'l');
    } else if (view === 'up') {
      cap(g, style === 'fluffy');
      if (style === 'bun') bun(g, view);
      rows(g, 7, 11, 3, 16, 'h');
      if (long) { rows(g, 12, 17, 3, 16, 'h'); hs(g, 18, 6, 'h'); }
      else if (bob) { rows(g, 12, 12, 3, 16, 'h'); hs(g, 13, 6, 'h'); }
      else hs(g, 12, 3, 'h');
      if (style === 'ponytail') { rows(g, 12, 17, 9, 10, 'h'); span(g, 12, 9, 10, 'k'); }
      set(g, 6, 3, 'l'); set(g, 7, 3, 'l'); set(g, 5, 4, 'l');
    } else { // side (왼쪽을 바라봄)
      cap(g, style === 'fluffy');
      if (style === 'bun') bun(g, view);
      span(g, 7, 3, 16, 'h');
      span(g, 8, 3, 4, 'h');
      rows(g, 8, 11, 11, 16, 'h');
      span(g, 12, 11, 13, 'h');
      if (bob) { rows(g, 8, 12, 10, 16, 'h'); span(g, 13, 11, 15, 'h'); set(g, 10, 9, 'S'); }
      if (long) rows(g, 8, 12, 11, 16, 'h');
      if (style === 'side' || style === 'curtain') set(g, 5, 8, 'h');
      set(g, 6, 3, 'l'); set(g, 7, 3, 'l'); set(g, 5, 4, 'l');
    }
  }

  /* ---------- 몸 ---------- */
  function legsFront(g, frame, lowerColor) {
    const liftL = frame === 1 ? 1 : 0, liftR = frame === 2 ? 1 : 0;
    rows(g, 19, 21 - liftL, 6, 8, lowerColor);
    rows(g, 19, 21 - liftR, 11, 13, lowerColor);
    span(g, 22 - liftL, 6, 8, 'f');
    span(g, 22 - liftR, 11, 13, 'f');
  }

  function paintBodyFront(g, look, frame, back) {
    const o = look.outfit;
    const sleeveless = o === 'dress' || o === 'gown';
    // 팔
    for (let y = 14; y <= 17; y++) {
      const c = sleeveless ? 's' : (o === 'tee' && y >= 16 ? 's' : 'T');
      set(g, 5, y, c); set(g, 14, y, c);
    }
    set(g, 5, 18, 's'); set(g, 14, 18, 's');
    // 상체
    hs(g, 13, 3, 't');
    for (let y = 14; y <= 17; y++) hs(g, y, 4, 't');

    if (!back) {
      switch (o) {
        case 'suit':
        case 'tux':
          span(g, 13, 8, 11, 'a'); span(g, 14, 9, 10, 'a');
          span(g, 14, 9, 10, 'k'); span(g, 15, 9, 10, 'k');
          if (o === 'tux') { set(g, 7, 14, 'r'); set(g, 9, 13, 'k'); set(g, 10, 13, 'k'); span(g, 14, 9, 10, 'a'); span(g, 15, 9, 10, 'a'); }
          set(g, 9, 17, 'T');
          break;
        case 'hoodie':
          hs(g, 13, 4, 'T');
          set(g, 8, 14, 'a'); set(g, 8, 15, 'a'); set(g, 11, 14, 'a'); set(g, 11, 15, 'a');
          span(g, 17, 7, 12, 'T');
          break;
        case 'cardigan':
          rows(g, 13, 17, 8, 11, 'a');
          set(g, 7, 15, 'T'); set(g, 12, 15, 'T');
          break;
        case 'shirt':
          span(g, 13, 8, 11, 'a'); set(g, 9, 15, 'T'); set(g, 9, 17, 'T');
          break;
        case 'dress':
        case 'gown':
          span(g, 13, 9, 10, 's');
          break;
      }
    } else if (o === 'hoodie') {
      rows(g, 13, 15, 7, 12, 'T');
    }

    // 하체
    if (o === 'dress') {
      hs(g, 18, 4, 'T');
      hs(g, 19, 5, 't'); hs(g, 20, 5, 't'); hs(g, 21, 6, 't');
      if (frame !== 1) span(g, 22, 7, 8, 'f');
      if (frame !== 2) span(g, 22, 11, 12, 'f');
    } else if (o === 'gown') {
      hs(g, 18, 4, 'T');
      hs(g, 19, 5, 't'); hs(g, 20, 6, 't'); hs(g, 21, 6, 't'); hs(g, 22, 7, 't');
      if (frame === 1) set(g, 3, 22, null);
      if (frame === 2) set(g, 16, 22, null);
    } else if (o === 'skirt') {
      hs(g, 18, 4, 'p'); hs(g, 19, 5, 'p'); hs(g, 20, 5, 'p');
      const liftL = frame === 1 ? 1 : 0, liftR = frame === 2 ? 1 : 0;
      if (!liftL) span(g, 21, 7, 8, 's');
      if (!liftR) span(g, 21, 11, 12, 's');
      span(g, 22 - liftL, 7, 8, 'f'); span(g, 22 - liftR, 11, 12, 'f');
    } else {
      hs(g, 18, 4, 'p');
      legsFront(g, frame, 'p');
      span(g, 19, 9, 10, null);
    }
  }

  function paintBodySide(g, look, frame) {
    const o = look.outfit;
    const sleeveless = o === 'dress' || o === 'gown';
    rows(g, 13, 17, 7, 12, 't');
    if (o === 'suit' || o === 'tux' || o === 'shirt') span(g, 13, 7, 8, 'a');
    if (o === 'hoodie') rows(g, 13, 14, 10, 12, 'T');

    // 하체
    if (o === 'dress' || o === 'gown') {
      span(g, 18, 7, 12, 'T');
      span(g, 19, 6, 12, 't'); span(g, 20, 6, 13, 't'); span(g, 21, 5, 13, 't');
      if (o === 'gown') span(g, 22, 4, 14, 't');
      else if (frame === 1) { span(g, 22, 5, 6, 'f'); span(g, 22, 11, 12, 'f'); }
      else span(g, 22, 7, 10, 'f');
    } else {
      const lower = 'p';
      if (o === 'skirt') { span(g, 18, 7, 12, 'p'); span(g, 19, 6, 12, 'p'); span(g, 20, 6, 13, 'p'); }
      else span(g, 18, 7, 12, lower);
      const legC = o === 'skirt' ? 's' : lower;
      const y0 = o === 'skirt' ? 21 : 19;
      if (frame === 1) {
        rows(g, y0, 21, 6, 8, legC); rows(g, y0, 21, 11, 13, legC);
        span(g, 22, 5, 8, 'f'); span(g, 22, 11, 13, 'f');
      } else {
        rows(g, y0, 21, 8, 11, legC);
        span(g, 22, 7, 11, 'f');
      }
    }
    // 팔 (몸통 위)
    const ax = frame === 1 ? 7 : frame === 2 ? 10 : 9;
    for (let y = 14; y <= 17; y++) {
      const c = sleeveless ? 's' : (o === 'tee' && y >= 16 ? 's' : 'T');
      span(g, y, ax, ax + 1, c);
    }
    span(g, 18, ax, ax + 1, 's');
  }

  /* ---------- 소품 ---------- */
  function paintGlasses(g, kind, view) {
    if (!kind || kind === 'none') return;
    if (view === 'down') {
      if (kind === 'sunglasses') {
        rows(g, 8, 9, 6, 8, 'G'); rows(g, 8, 9, 11, 13, 'G'); span(g, 8, 9, 10, 'G');
        set(g, 7, 8, 'w'); set(g, 12, 8, 'w');
      } else {
        span(g, 8, 6, 8, 'g'); span(g, 8, 11, 13, 'g'); span(g, 8, 9, 10, 'g');
        set(g, 6, 9, 'g'); set(g, 8, 9, 'g'); set(g, 11, 9, 'g'); set(g, 13, 9, 'g');
        set(g, 7, 9, 'e');
        set(g, 12, 9, 'e');
      }
    } else if (view === 'side') {
      if (kind === 'sunglasses') { rows(g, 8, 9, 5, 7, 'G'); span(g, 8, 8, 10, 'G'); }
      else { span(g, 8, 5, 7, 'g'); set(g, 5, 9, 'g'); set(g, 7, 9, 'g'); span(g, 8, 8, 10, 'g'); }
    }
  }

  function paintVeilBack(g, view) {
    if (view === 'down') { rows(g, 5, 18, 2, 4, 'v'); rows(g, 5, 18, 15, 17, 'v'); }
    if (view === 'side') { rows(g, 4, 19, 12, 17, 'v'); }
  }
  function paintVeilFront(g, view) {
    if (view === 'up') { rows(g, 3, 4, 6, 13, 'v'); rows(g, 5, 19, 4, 15, 'v'); hs(g, 20, 5, 'v'); }
    // 화관
    if (view === 'down') { set(g, 5, 4, 'r'); set(g, 6, 3, 'R'); set(g, 13, 3, 'R'); set(g, 14, 4, 'r'); }
    if (view === 'side') { set(g, 12, 3, 'r'); set(g, 13, 3, 'R'); }
  }
  function paintBouquet(g, view) {
    if (view === 'down') {
      span(g, 15, 8, 11, 'r'); set(g, 9, 15, 'R'); set(g, 10, 16, 'r');
      span(g, 16, 8, 11, 'R'); set(g, 9, 16, 'r');
      span(g, 17, 9, 10, 'n'); span(g, 18, 9, 10, 'n');
    } else if (view === 'side') {
      span(g, 15, 5, 7, 'r'); set(g, 6, 15, 'R'); span(g, 16, 5, 7, 'R'); span(g, 17, 6, 7, 'n');
    }
  }

  /* ---------- 후처리 ---------- */
  function autoShade(g) {
    const isSkin = c => c === 's' || c === 'S' || c === 'e' || c === 'b' || c === 'm';
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (g[y][x] === 'h' && isSkin(get(g, x, y + 1))) g[y][x] = 'H';
    }
  }
  function outline(g) {
    const out = makeGrid();
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (g[y][x]) { out[y][x] = g[y][x]; continue; }
      const n = [get(g, x - 1, y), get(g, x + 1, y), get(g, x, y - 1), get(g, x, y + 1)];
      if (n.some(c => c && c !== 'v')) out[y][x] = 'o';
      else if (n.some(c => c === 'v')) out[y][x] = 'V';
    }
    return out;
  }

  function palette(look) {
    const skin = look.skin || '#f2c9a5';
    const hair = look.hair || '#2b2226';
    const top = look.top || '#6b8fd6';
    const bottom = look.bottom || '#3b4a6b';
    return {
      o: '#2a2030',
      s: skin, S: darken(skin, 0.1),
      e: '#2a2030', w: '#ffffff',
      b: mix(skin, '#ff7a8a', 0.4),
      m: mix(skin, '#b0465a', 0.45),
      h: hair, H: darken(hair, 0.12), l: lighten(hair, luminance(hair) < 0.25 ? 0.14 : 0.12),
      t: top, T: darken(top, 0.12),
      a: look.accent || '#f6f3ec',
      k: look.tie || '#7d2838',
      p: bottom, P: darken(bottom, 0.1),
      f: look.shoes || '#2f2a33',
      g: '#2a2030', G: '#18161d',
      v: 'rgba(255,255,255,0.62)', V: 'rgba(190,190,210,0.5)',
      r: '#f59ab8', R: '#ffffff', n: '#5f9e48'
    };
  }

  /* ---------- 렌더링 ---------- */
  const cache = new Map();
  function key(look, dir, frame) {
    return [look.hair, look.hairStyle, look.skin, look.top, look.bottom, look.shoes, look.outfit,
      look.glasses, look.accent, look.tie, look.acc, dir, frame].join('|');
  }

  function buildGrid(look, dir, frame) {
    const view = dir === 'down' ? 'down' : dir === 'up' ? 'up' : 'side';
    const g = makeGrid();
    const style = HAIR_STYLES.includes(look.hairStyle) ? look.hairStyle : 'short';
    const bride = look.acc === 'bride';
    if (bride) paintVeilBack(g, view);
    hairBack(g, style, view);
    paintHead(g, view === 'up' ? 'up' : view);
    if (view === 'side') paintBodySide(g, look, frame);
    else paintBodyFront(g, look, frame, view === 'up');
    hairFront(g, style, view);
    paintGlasses(g, look.glasses, view);
    if (bride) { paintVeilFront(g, view); paintBouquet(g, view); }
    autoShade(g);
    return outline(g);
  }

  function render(look, dir = 'down', frame = 0) {
    const k = key(look, dir, frame);
    if (cache.has(k)) return cache.get(k);
    const mirror = dir === 'right';
    const grid = buildGrid(look, mirror ? 'left' : dir, frame);
    const pal = palette(look);
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const v = grid[y][x];
      if (!v) continue;
      ctx.fillStyle = pal[v] || '#ff00ff';
      ctx.fillRect(mirror ? W - 1 - x : x, y, 1, 1);
    }
    if (cache.size > 4000) cache.clear();
    cache.set(k, c);
    return c;
  }

  /* ---------- 사진 색 → 후보 4종 ---------- */
  function normalizeColors(c) {
    const skin = adjust(c.skin || '#f2c9a5', { minL: 0.5, maxL: 0.86, ds: 0.05, maxS: 0.62 });
    let hair = c.hair || '#2b2226';
    hair = luminance(hair) > 0.55 ? adjust(hair, { ds: 0.1 }) : adjust(hair, { maxL: 0.42, ds: 0.05 });
    let top = adjust(c.top || '#6b8fd6', { ds: 0.12, minL: 0.12, maxL: 0.92 });
    return { skin, hair, top };
  }

  function bottomFor(top) {
    const l = luminance(top);
    if (l > 0.7) return '#3d4c6e';
    if (l < 0.22) return '#2c2a33';
    return '#33405e';
  }

  // set: 0 = 사진 분석 기반, 1 = 반대 스타일군, 2 = 섞어서
  function candidates(colors, set = 0, glasses = 'none') {
    const { skin, hair, top } = normalizeColors(colors);
    const longFirst = !!colors.longHair;
    const shortStyles = ['short', 'side', 'fluffy', 'curtain'];
    const longStyles = ['long', 'bob', 'ponytail', 'bun'];
    let styles;
    if (set % 3 === 0) styles = longFirst ? longStyles : shortStyles;
    else if (set % 3 === 1) styles = longFirst ? shortStyles : longStyles;
    else styles = longFirst ? ['long', 'side', 'bob', 'fluffy'] : ['side', 'long', 'curtain', 'bob'];

    const feminine = s => longStyles.includes(s);
    const dark = luminance(top) < 0.3;
    return styles.map((hs, i) => {
      const base = { skin, hair, hairStyle: hs, glasses, top, bottom: bottomFor(top), shoes: '#2f2a33' };
      switch (i) {
        case 0: return { ...base, outfit: 'tee' };
        case 1: return feminine(hs)
          ? { ...base, outfit: 'dress', top: adjust(top, { dl: 0.06, ds: 0.05 }), shoes: '#e9dfe6' }
          : { ...base, outfit: 'suit', top: dark ? top : '#363b4a', bottom: dark ? top : '#363b4a', tie: luminance(top) < 0.3 ? '#7d2838' : top };
        case 2: return { ...base, outfit: feminine(hs) ? 'cardigan' : 'hoodie' };
        default: return feminine(hs)
          ? { ...base, outfit: 'skirt', top: '#f6f3ec', bottom: top }
          : { ...base, outfit: 'shirt', top: luminance(top) > 0.75 ? '#e9eef7' : top, bottom: '#2f3442' };
      }
    });
  }

  /* ---------- 데모/랜덤 ---------- */
  const SKINS = ['#f7d7bf', '#f2c9a5', '#e8b98f', '#d9a27a', '#c58a62', '#a8704c'];
  const HAIRS = ['#2b2226', '#3a2a24', '#4a3226', '#6b4a33', '#8a5a3c', '#c9a46a', '#2c2c3a', '#7a3b2e', '#d8d2c8', '#5a5f6b'];
  const TOPS = ['#6b8fd6', '#e9a3b8', '#f3d27a', '#8cc79a', '#f6f3ec', '#363b4a', '#c45f5f', '#9a86d1', '#7fc4d8', '#e8b07a', '#2f3442', '#b8c4a0'];
  function rng(seed) {
    let s = (seed >>> 0) || 1;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }
  function randomLook(seed = Math.random() * 1e9) {
    const r = rng(seed);
    const pick = a => a[Math.floor(r() * a.length)];
    const colors = { skin: pick(SKINS), hair: pick(HAIRS), top: pick(TOPS), longHair: r() < 0.5 };
    const list = candidates(colors, Math.floor(r() * 3), r() < 0.2 ? 'glasses' : (r() < 0.05 ? 'sunglasses' : 'none'));
    return pick(list);
  }

  function sanitizeLook(l) {
    const hex = v => (typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v)) ? v : undefined;
    if (!l || typeof l !== 'object') return randomLook();
    return {
      skin: hex(l.skin) || '#f2c9a5',
      hair: hex(l.hair) || '#2b2226',
      hairStyle: HAIR_STYLES.includes(l.hairStyle) ? l.hairStyle : 'short',
      top: hex(l.top) || '#6b8fd6',
      bottom: hex(l.bottom) || '#3b4a6b',
      shoes: hex(l.shoes) || '#2f2a33',
      accent: hex(l.accent),
      tie: hex(l.tie),
      outfit: OUTFITS.includes(l.outfit) ? l.outfit : 'tee',
      glasses: ['none', 'glasses', 'sunglasses'].includes(l.glasses) ? l.glasses : 'none',
      acc: l.acc === 'bride' ? 'bride' : undefined
    };
  }

  const GROOM = { skin: '#f2c9a5', hair: '#2b2226', hairStyle: 'side', outfit: 'tux', top: '#23222b', bottom: '#23222b', shoes: '#141218', tie: '#141218', glasses: 'none' };
  const BRIDE = { skin: '#f7d7bf', hair: '#3a2a24', hairStyle: 'bun', outfit: 'gown', top: '#fbfaf7', bottom: '#fbfaf7', shoes: '#ffffff', glasses: 'none', acc: 'bride' };

  global.Sprite = {
    W, H, render, candidates, randomLook, sanitizeLook, palette,
    GROOM, BRIDE, HAIR_STYLES, OUTFITS,
    color: { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, adjust, darken, lighten, mix, luminance }
  };
})(typeof window !== 'undefined' ? window : globalThis);
