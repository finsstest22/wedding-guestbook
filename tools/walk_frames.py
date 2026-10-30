"""걷기 시트에서 사람 몸통(목 아래) 4방향 × 8프레임을 잘라 '색칠용 걷기 틀'을 만든다.

- m: 남자(셔츠+바지) 틀, f: 여자(원피스) 틀
- 머리는 버리고(하객이 꾸민 머리를 얹음), 몸에 덮인 긴 머리카락은 지우고 그 자리를 옷으로 메운다.
- 프레임마다 영역 지도(.cls.png)를 같이 저장: 빨강=상의/원피스, 초록=하의, 파랑=피부
  → 실행 중에 하객이 고른 옷 색·피부색으로 다시 칠한다.

사용법: python tools/walk_frames.py
"""
import json
import sys
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from chroma import key_out, drop_specks  # noqa: E402
from split_sheet import components  # noqa: E402
from cut_bodies import is_hair  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / 'parts-raw'
OUT = ROOT / 'public' / 'parts'

# 템플릿: (시트에서 사람 줄의 세로 구간, 기준 키, 머리 꼭대기에서 턱까지 비율)
TEMPLATES = {'m': ((95, 240), 247, 104 / 247), 'f': ((360, 530), 224, 104 / 224)}
DIRS = [(0, 388, 'right'), (388, 770, 'down'), (770, 1152, 'left'), (1152, 1536, 'up')]


def lum(p):
    return 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]


def is_skin(p):
    r, g, b, a = p
    return a > 150 and r > 200 and 150 < g < 235 and 120 < b < 215 and r - b > 45 and r - g > 22


def remove_hair(img):
    """위·옆 가장자리에서 이어진 갈색 머리카락 픽셀을 지운다."""
    w, h = img.size
    px = img.load()
    seeds = [(x, y) for x in range(w) for y in range(0, 3)]
    seeds += [(x, y) for y in range(int(h * 0.7)) for x in list(range(0, 4)) + list(range(max(0, w - 4), w))]
    stack = [s for s in seeds if is_hair(px[s])]
    seen = set(stack)
    while stack:
        x, y = stack.pop()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and is_hair(px[nx, ny]):
                seen.add((nx, ny))
                stack.append((nx, ny))
    for x, y in seen:
        px[x, y] = (0, 0, 0, 0)
    # 머리카락 외곽선 찌꺼기: 어둡고 주변에 색 있는 픽셀이 없으면 제거
    colored = [[px[x, y][3] > 40 and lum(px[x, y]) >= 85 for x in range(w)] for y in range(h)]
    kill = []
    for y in range(int(h * 0.45)):
        for x in range(w):
            p = px[x, y]
            if p[3] == 0 or lum(p) >= 85:
                continue
            if not any(colored[yy][xx] for yy in range(max(0, y - 2), min(h, y + 3)) for xx in range(max(0, x - 2), min(w, x + 3))):
                kill.append((x, y))
    for x, y in kill:
        px[x, y] = (0, 0, 0, 0)
    return len(seen)


def span_fill(img, upto):
    """머리카락을 지운 자리(몸 가운데의 빈칸)를 줄마다 양 끝 사이로 메운다 → 나중에 옷 색으로 칠함."""
    w, h = img.size
    px = img.load()
    filled = set()
    for y in range(int(h * upto)):
        xs = [x for x in range(w) if px[x, y][3] > 40]
        if len(xs) < 2:
            continue
        for x in range(xs[0], xs[-1] + 1):
            if px[x, y][3] <= 40:
                # 가까운 옷 색으로 임시 채움
                near = None
                for d in range(1, 12):
                    for xx in (x - d, x + d):
                        if 0 <= xx < w and px[xx, y][3] > 40 and lum(px[xx, y]) > 90:
                            near = px[xx, y]
                            break
                    if near:
                        break
                px[x, y] = near or (200, 200, 200, 255)
                filled.add((x, y))
    return filled


def real_skin(img, filled, tpl):
    """피부색 덩어리 중 손·목·다리로 볼 만한 것만 (원피스의 복숭아색 꽃무늬 제외)."""
    w, h = img.size
    px = img.load()
    seen, keep = set(), set()
    for sy in range(h):
        for sx in range(w):
            if (sx, sy) in seen or not is_skin(px[sx, sy]) or (sx, sy) in filled:
                continue
            stack, pts = [(sx, sy)], []
            seen.add((sx, sy))
            while stack:
                x, y = stack.pop()
                pts.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and is_skin(px[nx, ny]) and (nx, ny) not in filled:
                        seen.add((nx, ny))
                        stack.append((nx, ny))
            n = len(pts)
            ys = [p[1] for p in pts]
            xs = [p[0] for p in pts]
            cy = sum(ys) / n
            bw, bh = max(xs) - min(xs) + 1, max(ys) - min(ys) + 1
            compact = n / (bw * bh) > 0.45 and 0.45 < bw / bh < 2.2   # 동글동글 (손)
            top = min(ys) < h * 0.06 and bw < w * 0.4 and n >= 12 and (tpl == 'm' or compact)  # 목
            if tpl == 'f':
                # 원피스: 손은 몸 위쪽 절반의 작고 동그란 덩어리 (치마 꽃무늬·크림색 천 제외)
                ok = top or (15 <= n <= 220 and cy < h * 0.5 and compact)
            else:
                ok = top or (n >= 30 and compact)
            if ok:
                keep.update(pts)
    # 손 그림자: 확실한 피부에서 비슷한 살색(어두운 쪽)으로 번진다
    def skinish(p):
        r, g, b, a = p
        return a > 150 and r >= g >= b and r - b > 40 and r > 120 and 0.299 * r + 0.587 * g + 0.114 * b > 85
    stack = list(keep) if tpl == 'm' else []   # 원피스(크림색 천)는 번지면 안 됨
    while stack:
        x, y = stack.pop()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in keep and (nx, ny) not in filled and skinish(px[nx, ny]):
                keep.add((nx, ny))
                stack.append((nx, ny))
    return keep


def classify(img, tpl, filled, neck_x=None, waist_override=None):
    """영역 지도: R=상의(원피스), G=하의, B=피부. 신발·외곽선 일부는 그대로 둔다."""
    w, h = img.size
    px = img.load()
    skin = real_skin(img, filled, tpl)
    cls = Image.new('RGB', img.size, (0, 0, 0))
    cp = cls.load()
    shoes = int(h * 0.9)
    # 원피스 틀: 허리(몸통 위쪽에서 가장 가는 줄) 위 = 상의, 아래 = 치마
    if tpl == 'f':
        ws = []
        for y in range(h):
            xs = [x for x in range(w) if px[x, y][3] > 40]
            ws.append(xs[-1] - xs[0] + 1 if xs else 0)
        lo, hi = int(h * 0.12), int(h * 0.45)
        waist_f = min(range(lo, hi), key=lambda y: (ws[y] if ws[y] else 1e9, -y)) if hi > lo else int(h * 0.3)
        if waist_override is not None:
            waist_f = waist_override
    # 허리선: 목 아래 가운데 세로줄에서 처음 어두워지는(바지 시작) 줄
    cx = int(round(neck_x)) if neck_x is not None else w // 2
    waist = int(h * 0.45)
    for y in range(int(h * 0.25), int(h * 0.75)):
        vals = [lum(px[x, y]) for x in range(max(0, cx - 3), min(w, cx + 4)) if px[x, y][3] > 40]
        if vals and sum(vals) / len(vals) < 110:
            waist = y
            break
    for y in range(h):
        for x in range(w):
            p = px[x, y]
            if p[3] <= 40:
                continue
            warm = p[0] > 150 and p[0] >= p[1] >= p[2] and p[0] - p[2] > 40
            if (x, y) in skin or (y < 16 and warm):     # 맨 위 = 목 (그림자 포함)
                cp[x, y] = (0, 0, 255)
            elif y >= shoes:
                continue
            elif tpl == 'f':
                cp[x, y] = (255, 0, 0) if y < waist_f else (0, 255, 0)
            elif (x, y) in filled or lum(p) > 140 or y < waist:
                cp[x, y] = (255, 0, 0)
            else:
                cp[x, y] = (0, 255, 0)
    return cls


def remove_glasses(img):
    """옆얼굴 안경테 지우기: 양쪽(가로 또는 세로)이 살색인 가는 어두운 선 → 살색으로. 굵은 눈은 남는다."""
    w, h = img.size
    px = img.load()
    skinish = lambda p: p[3] > 150 and p[0] >= p[1] >= p[2] and p[0] - p[2] > 35 and lum(p) > 150
    dark = lambda p: p[3] > 150 and lum(p) < 120
    for _ in range(3):
        fix = []
        for y in range(1, h - 1):
            for x in range(1, w - 1):
                p = px[x, y]
                if not dark(p):
                    continue
                for dx, dy in ((1, 0), (0, 1), (1, 1), (1, -1)):
                    for t in (1, 2):
                        a = (x - dx, y - dy)
                        b = (x + dx * t, y + dy * t)
                        if not (0 <= b[0] < w and 0 <= b[1] < h):
                            continue
                        if skinish(px[a]) and skinish(px[b]) and all(dark(px[x + dx * j, y + dy * j]) for j in range(t)):
                            fix.append((x, y, px[a]))
                            break
                    else:
                        continue
                    break
        for x, y, c in fix:
            px[x, y] = c
        if not fix:
            break


NECK_W = 16        # 목 굵기 (몸통 단위 픽셀)
NECK_H = 4         # 어깨선 위로 보이는 목 길이
NECK_SKIN = (250, 212, 182, 255)
NECK_SHADE = (226, 172, 146, 255)
NECK_LINE = (70, 40, 38, 255)


def make_neck(f, draw=True):
    """몸통 맨 위의 원본 조각(턱·귀·뒷머리)을 지우고, 어깨선 위에 깨끗한 목을 그린다.
    반환: (어깨선 y, 목 가운데 x)"""
    w, h = f.size
    px = f.load()
    widths = []
    for y in range(h):
        xs = [x for x in range(w) if px[x, y][3] > 40]
        widths.append((xs[0], xs[-1]) if xs else None)
    maxw = max((b - a + 1) for a, b in (r for r in widths[:int(h * 0.45)] if r))   # 상체 폭 (다리 보폭 제외)
    # 어깨선: 위에서부터 처음으로 폭이 최대폭의 55%를 넘는 줄
    # 목이 가장 가는 줄(위 35% 안)을 찾고, 그 아래에서 어깨선을 찾는다
    top = [(r[1] - r[0] + 1 if r else 0, y) for y, r in enumerate(widths[:int(h * 0.35)])]
    pinch = min((wd, y) for wd, y in top if wd > 0)[1] if any(wd for wd, _ in top) else 0
    sh = next(y for y, r in enumerate(widths) if y >= pinch and r and (r[1] - r[0] + 1) >= maxw * 0.55)
    a, b = widths[sh]
    cx = (a + b) / 2
    if not draw:
        return None, cx
    # 어깨선 위는 모두 지운다
    for y in range(sh):
        for x in range(w):
            px[x, y] = (0, 0, 0, 0)
    # 목: 어깨선 위로 (맨 위까지) + 어깨 안쪽 3줄 겹침
    x0, x1 = round(cx - NECK_W / 2), round(cx + NECK_W / 2)
    for y in range(max(0, sh - NECK_H), sh + 3):
        for x in range(x0, x1 + 1):
            if not (0 <= x < w):
                continue
            if y >= sh and px[x, y][3] > 40:
                continue                     # 옷깃은 그대로 (목이 옷 안으로 들어감)
            if x in (x0, x1):
                px[x, y] = NECK_LINE
            elif y > sh - 3:
                px[x, y] = NECK_SHADE        # 옷깃 바로 위 그림자
            else:
                px[x, y] = NECK_SKIN
    return sh, cx


def avg_color(img, cls, ch):
    px, cp = img.load(), cls.load()
    s = [0, 0, 0, 0]
    for y in range(img.height):
        for x in range(img.width):
            if cp[x, y][ch] > 128 and px[x, y][3] > 40:
                p = px[x, y]
                s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; s[3] += 1
    return [round(v / s[3]) for v in s[:3]] if s[3] else [128, 128, 128]


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    sheet = key_out(Image.open(RAW / 'sheet_walk.webp'))
    (OUT / 'walk').mkdir(parents=True, exist_ok=True)
    meta = json.loads((OUT / 'parts.json').read_text(encoding='utf-8'))
    walk = {}
    male_up = []  # 여자 뒷모습의 빈 등(머리카락이 덮던 곳)에 붙일 상체
    for tpl, ((y0, y1), ref_h, neck_ratio) in TEMPLATES.items():
        band = sheet.crop((0, y0, sheet.width, y1))
        entry = {}
        tops, bottoms = [], []
        for gx0, gx1, d in DIRS:
            g = band.crop((gx0, 0, gx1, band.height))
            cs = [c for c in components(g) if c[1] > 300]
            top = min(c[0][1] for c in cs); bottom = max(c[0][3] for c in cs)
            fig_h = bottom - top + 1
            neck = top + round(fig_h * neck_ratio)
            # 목 아래에서 그림이 가장 적은 세로줄로 8칸 나누기
            x0 = min(c[0][0] for c in cs); x1 = max(c[0][2] for c in cs)
            a = g.getchannel('A').load()
            cover = lambda x: sum(1 for y in range(neck, bottom + 1) if a[x, y] > 40)
            step = (x1 - x0 + 1) / 8
            cuts = [x0]
            for i in range(1, 8):
                c = round(x0 + i * step); r = round(step * 0.35)
                cuts.append(min(range(c - r, c + r + 1), key=lambda x: (cover(x), abs(x - c))))
            cuts.append(x1 + 1)
            k = ref_h / fig_h
            # 머리(남자 줄): 머리 높이에서 가장 비어 있는 세로줄로 따로 나눈다 (이웃 머리와 맞닿아 있음)
            hcuts = None
            if tpl == 'm':
                hcover = lambda x: sum(1 for y in range(top, neck) if a[x, y] > 40)
                hcuts = [max(0, x0 - 4)]
                for i in range(1, 8):
                    c = round(x0 + i * step); r = round(step * 0.45)
                    hcuts.append(min(range(c - r, c + r + 1), key=lambda x: (hcover(x), abs(x - c))))
                hcuts.append(min(g.width, x1 + 5))
            frames = []
            for i in range(8):
                f = g.crop((cuts[i], neck, cuts[i + 1], bottom + 1))
                f = f.resize((round(f.width * k), round(f.height * k)), Image.BICUBIC)
                removed = remove_hair(f) if tpl == 'f' else 0
                drop_specks(f, 0.2)
                filled = span_fill(f, 0.75 if tpl == 'f' else 0.45)
                # 여자 옆모습: 긴 머리가 어깨를 덮으므로 원본 어깨를 그대로 둔다
                # 여자 옆모습: 긴 머리가 어깨를 덮으므로 원본 어깨 유지
                # 여자 뒷모습: 아래에서 남자 뒷모습 상체(이미 목 정리됨)를 붙이므로 건너뜀
                keep = tpl == 'f' and d in ('left', 'right', 'up')
                sh_y, neck_cx = make_neck(f, draw=not keep)
                if sh_y is not None:
                    filled = {(x, y) for x, y in filled if y >= sh_y}
                box = f.getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
                # 목 기준점: 맨 위 10줄의 가운데 (자르기 전 좌표)
                pa = f.load()
                nx = neck_cx          # 목 가운데 = 어깨선 가운데
                f = f.crop(box)
                filled = {(x - box[0], y - box[1]) for x, y in filled if box[0] <= x < box[2] and box[1] <= y < box[3]}
                ny = max(0, sh_y - NECK_H - box[1]) if sh_y is not None else -box[1]   # 목 꼭대기
                if tpl == 'm' and d == 'up':
                    male_up.append((f.copy(), nx - box[0]))
                if tpl == 'f' and d == 'up' and ny < -4 and male_up:
                    # 남자 뒷모습 상체(목~치마 시작)를 위에 붙인다
                    mu, mnx = male_up[i]
                    trim = 6                      # 치마 맨 위 = 머리카락이 끝나던 납작한 띠 → 버림
                    gap = -ny + trim              # 목에서 남은 치마 시작까지
                    upper = mu.crop((0, 0, mu.width, min(mu.height, gap + 30)))  # 어깨·팔까지
                    f = f.crop((0, trim, f.width, f.height))
                    fx = nx - box[0]
                    left = min(0, round(fx - mnx))
                    W = max(f.width, round(fx - mnx) + upper.width) - left
                    comb = Image.new('RGBA', (W, f.height + gap), (0, 0, 0, 0))
                    comb.alpha_composite(upper, (round(fx - mnx) - left, 0))
                    up_px = {(x, y) for y in range(comb.height) for x in range(W) if comb.getpixel((x, y))[3] > 40}
                    comb.alpha_composite(f, (-left, gap))   # 치마가 상체 아래쪽을 덮음
                    skirt = {(x, y) for y in range(gap, comb.height) for x in range(W) if comb.getpixel((x, y))[3] > 40}
                    filled = {(x - left, y - trim + gap) for x, y in filled} | (up_px - skirt)
                    f = comb
                    nx = fx - left + box[0]
                    ny = 0
                    waist = gap
                else:
                    # 옆모습은 팔이 허리를 가려 폭으로 못 찾음 → 앞모습과 같은 비율
                    waist = round(f.height * 0.3) if (tpl == 'f' and d in ('left', 'right')) else None
                cls = classify(f, tpl, filled, nx - box[0] if tpl == 'm' else None, waist)
                name = f'{tpl}_{d}_{i}'
                f.save(OUT / 'walk' / f'{name}.png')
                cls.save(OUT / 'walk' / f'{name}.cls.png')
                tops.append(avg_color(f, cls, 0))
                if tpl == 'm':
                    bottoms.append(avg_color(f, cls, 1))
                entry_f = {'src': f'parts/walk/{name}.png', 'cls': f'parts/walk/{name}.cls.png',
                           'neck': [round(nx - box[0], 1), ny]}
                if hcuts:
                    # 이 프레임의 머리: 위쪽 ~ 목 + 4px
                    gx_neck = cuts[i] + nx / k              # 시트 좌표의 목 x
                    hy0 = max(0, top - 3)
                    hd = g.crop((hcuts[i], hy0, hcuts[i + 1], neck + 4))
                    hd = hd.resize((round(hd.width * k), round(hd.height * k)), Image.BICUBIC)
                    drop_specks(hd, 0.3)                   # 이웃 머리 조각 제거
                    if d in ('right', 'left'):
                        remove_glasses(hd)
                    hb = hd.getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
                    ax = (gx_neck - hcuts[i]) * k - hb[0]
                    ay = (neck - hy0) * k - hb[1]
                    hd = hd.crop(hb)
                    hname = f'head_{d}_{i}'
                    hd.save(OUT / 'walk' / f'{hname}.png')
                    entry_f['head'] = {'src': f'parts/walk/{hname}.png', 'anchor': [round(ax, 1), round(ay, 1)]}
                frames.append(entry_f)
            entry[d] = frames
            print(tpl, d, 'frames', len(frames), 'size', frames[0]['neck'])
        avg = lambda L: [round(sum(c[i] for c in L) / len(L)) for i in range(3)]
        walk[tpl] = {'dirs': entry, 'top': avg(tops), 'bottom': avg(bottoms) if bottoms else avg(tops)}
    meta['walk'] = walk
    (OUT / 'parts.json').write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
    print('ok')


if __name__ == '__main__':
    main()
