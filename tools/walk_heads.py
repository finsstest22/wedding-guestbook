"""걷기용 옆·뒤 머리 (걷기 시트에서).

- long : 여자 줄의 머리 (긴 머리). 옆·뒤 그대로.
- short: 뒤 = 남자 줄 뒤통수 / 옆 = 여자 옆얼굴에서 목 아래 머리를 자르고 꽃핀을 머리색으로 덮음
         (남자 옆얼굴은 안경이 그려져 있어서 쓰지 않음)
옆모습은 왼쪽을 보는 그림 하나만 저장 → 오른쪽은 실행 중에 뒤집는다.
결과: public/parts/walk/hd_<long|short>_<side|back>.png, parts.json "walkHeads" (anchor = 목 위치)

사용법: python tools/walk_heads.py
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
OUT = ROOT / 'public' / 'parts'
ROWS = {'m': ((95, 240), 247, 104 / 247), 'f': ((360, 530), 224, 104 / 224)}
GROUPS = {'right': (0, 388), 'left': (770, 1152), 'up': (1152, 1536)}


def lum(p):
    return 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]


def hairish(p):
    return p[0] >= p[1] >= p[2] - 8 and p[0] - p[2] > 20 and lum(p) < 150


def skinp(p):
    return p[3] > 150 and p[0] > 190 and p[1] > 135 and p[0] - p[2] > 30 and p[0] >= p[1] >= p[2] - 10


def heads_in(sheet, tpl, d, hair_to, frame=None):
    (y0, y1), ref_h, neck_ratio = ROWS[tpl]
    gx0, gx1 = GROUPS[d]
    g = sheet.crop((gx0, y0, gx1, y1))
    a = g.getchannel('A').load()
    cs = [c for c in components(g) if c[1] > 300]
    top = min(c[0][1] for c in cs); bottom = max(c[0][3] for c in cs)
    fig_h = bottom - top + 1
    neck = top + round(fig_h * neck_ratio)
    x0 = min(c[0][0] for c in cs); x1 = max(c[0][2] for c in cs)
    step = (x1 - x0 + 1) / 8
    cover = lambda x: sum(1 for y in range(top, neck) if a[x, y] > 40)
    cuts = [max(0, x0 - 4)]
    for i in range(1, 8):
        c = round(x0 + i * step); r = round(step * 0.45)
        cuts.append(min(range(c - r, c + r + 1), key=lambda x: (cover(x), abs(x - c))))
    cuts.append(min(g.width, x1 + 5))
    k = ref_h / fig_h
    best = None
    for i in (range(8) if frame is None else [frame]):
        hy0 = max(0, top - 3)
        yb = round(top + fig_h * hair_to)
        hd = g.crop((cuts[i], hy0, cuts[i + 1], yb)).copy()
        hp = hd.load()
        ny = neck - hy0
        # 목 아래는 머리카락만 (몸·옷 제거)
        for y in range(ny + 2, hd.height):
            for x in range(hd.width):
                p = hp[x, y]
                chin_zone = skinp(p) and p[0] - p[2] > 45   # 목 피부는 살림 (레이스·옷 제외)
                if p[3] > 40 and not (hairish(p) or lum(p) < 60 or chin_zone):
                    hp[x, y] = (0, 0, 0, 0)
        drop_specks(hd, 0.25)
        hc = hd.getchannel('A').load()
        clip = sum(1 for y in range(hd.height) if hc[0, y] > 40) + sum(1 for y in range(hd.height) if hc[hd.width - 1, y] > 40)
        if best is None or clip < best[0]:
            # 목 x: 목 줄의 피부(몸) 가운데
            row = [x for x in range(hd.width) if hp[x, min(hd.height - 1, ny)][3] > 40 and not hairish(hp[x, min(hd.height - 1, ny)])]
            if not row:
                row = [x for x in range(hd.width) if hp[x, min(hd.height - 1, ny)][3] > 40]
            nx = (row[0] + row[-1]) / 2 if row else hd.width / 2
            best = (clip, hd, nx, ny, i)
    clip, hd, nx, ny, i = best
    # 걷기 몸통과 같은 방법으로 이 프레임의 어깨선 가운데를 찾는다 (시트 좌표)
    bx0, bx1 = cuts[i], cuts[i + 1]
    rows = []
    for y in range(neck, min(g.height, neck + round((bottom - neck) * 0.45))):   # walk_frames 와 같은 범위
        xs = [x for x in range(bx0, bx1) if a[x, y] > 40]
        rows.append((y, xs[0], xs[-1]) if xs else (y, None, None))
    widths = [(r[2] - r[1] + 1) if r[1] is not None else 0 for r in rows]
    maxw = max(widths)
    pinch = min(range(len(widths)), key=lambda j: widths[j] if widths[j] else 1e9)
    shj = next(j for j in range(pinch, len(widths)) if widths[j] >= maxw * 0.55)
    sh_y, sh_cx = rows[shj][0], (rows[shj][1] + rows[shj][2]) / 2
    hd = hd.resize((round(hd.width * k), round(hd.height * k)), Image.BICUBIC)
    nx, ny = nx * k, ny * k
    box = hd.getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
    hd = hd.crop(box)
    print(tpl, d, 'frame', i, 'clip', clip, hd.size)
    # 어깨 기준점: 몸통 목 꼭대기(어깨선 - 목 길이 2)와 같은 자리
    hd.shoulder_anchor = [round((sh_cx - cuts[i]) * k - box[0], 1), round((sh_y - hy0) * k - 2 - box[1], 1)]
    return hd, [round(nx - box[0], 1), round(ny - box[1], 1)]


def mirror_back(hd, anchor):
    """뒷모습은 좌우 대칭: 목 기준 왼쪽 절반을 오른쪽으로 비춘다 (이웃에 잘린 오른쪽 복원)."""
    # 대칭축 = 리본(밝은 픽셀)의 가운데, 없으면 목 x
    px = hd.load()
    xs = [x for y in range(hd.height) for x in range(hd.width) if px[x, y][3] > 40 and lum(px[x, y]) > 180]
    ax = sum(xs) / len(xs) if len(xs) > 20 else anchor[0]
    half = int(round(ax))
    left = hd.crop((0, 0, half, hd.height))
    out = Image.new('RGBA', (half * 2, hd.height), (0, 0, 0, 0))
    out.alpha_composite(left, (0, 0))
    out.alpha_composite(left.transpose(Image.FLIP_LEFT_RIGHT), (half, 0))
    return out, [half, anchor[1]]


def merge_side(face_hd, face_anchor, back_hd, back_anchor):
    """얼굴이 온전한 왼쪽보기 머리 + 뒷머리가 온전한(오른쪽보기를 뒤집은) 머리 → 잘린 뒷머리를 채운다."""
    back = back_hd.transpose(Image.FLIP_LEFT_RIGHT)
    bax = back.width - back_anchor[0]
    fa, ba = face_hd.load(), back.load()
    W = face_hd.width
    # 머리 위쪽 가운데 띠가 가장 잘 겹치는 위치 찾기
    best = None
    for dx in range(-12, 13):
        for dy in range(-10, 11):
            err = n = 0
            for y in range(4, int(face_hd.height * 0.55), 2):
                for x in range(int(W * 0.3), W - 6, 2):
                    bx, by = x - dx, y - dy
                    if not (0 <= bx < back.width and 0 <= by < back.height):
                        continue
                    p, q = fa[x, y], ba[bx, by]
                    if p[3] > 40 and q[3] > 40:
                        err += abs(p[0] - q[0]) + abs(p[1] - q[1]) + abs(p[2] - q[2]); n += 1
                    elif (p[3] > 40) != (q[3] > 40):
                        err += 200; n += 1
            if n and (best is None or err / n < best[0]):
                best = (err / n, dx, dy)
    _, dx, dy = best
    out_w = max(W, back.width + dx)
    out = Image.new('RGBA', (out_w, max(face_hd.height, back.height + dy)), (0, 0, 0, 0))
    op = out.load()
    for y in range(out.height):
        for x in range(out_w):
            if x < W - 3 and y < face_hd.height and fa[x, y][3] > 40:
                op[x, y] = fa[x, y]
            elif x >= W - 3:
                bx, by = x - dx, y - dy
                if 0 <= bx < back.width and 0 <= by < back.height and ba[bx, by][3] > 40:
                    op[x, y] = ba[bx, by]
            elif y < face_hd.height and fa[x, y][3] > 40:
                op[x, y] = fa[x, y]
    print('side merge offset', dx, dy)
    # 목 아래: 머리카락만 남김
    for y in range(int(face_anchor[1]) + 2, out.height):
        for x in range(out_w):
            p = op[x, y]
            if y < face_anchor[1] + 9 * 1.6 and skinp(p):
                continue
            if p[3] > 40 and not (hairish(p) or lum(p) < 60):
                op[x, y] = (0, 0, 0, 0)
    drop_specks(out, 0.1)
    return out, face_anchor


def face_region(img):
    """옆얼굴(왼쪽 보기)의 얼굴 영역: 가장 큰 살색 덩어리 + 그 안의 눈·입(구멍). 턱 y, 얼굴 앞 x."""
    w, h = img.size
    px = img.load()
    sk = lambda p: p[3] > 150 and p[0] > 175 and p[1] > 120 and p[0] - p[2] > 25 and p[0] >= p[1] >= p[2] - 10
    seen, best = set(), []
    for sy in range(h):
        for sx in range(w // 2 + 10):
            if (sx, sy) in seen or not sk(px[sx, sy]):
                continue
            stack, pts = [(sx, sy)], []
            seen.add((sx, sy))
            while stack:
                x, y = stack.pop()
                pts.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and sk(px[nx, ny]):
                        seen.add((nx, ny))
                        stack.append((nx, ny))
            if len(pts) > len(best):
                best = pts
    region = set(best)
    rows = {}
    for x, y in best:
        rows.setdefault(y, []).append(x)
    for y, xs in rows.items():          # 눈·입 같은 구멍 메우기
        for x in range(min(xs), max(xs) + 1):
            region.add((x, y))
    chin = max(rows)
    front = min(min(rows[y]) for y in rows if y > chin - 12)
    return region, chin, front


def swap_face(male, female):
    """남자 옆얼굴(안경)을 여자 옆얼굴(안경 없음)로 바꾼다. 턱·얼굴 앞선을 맞춰 붙임."""
    m = male.copy()
    mp, fp = m.load(), female.load()
    mreg, mchin, mfront = face_region(m)
    freg, fchin, ffront = face_region(female)
    dx, dy = mfront - ffront, mchin - fchin
    hairy = lambda p: p[3] > 40 and is_hair(p)
    # 1) 남자 얼굴 영역(안경 포함)을 지운다 — 머리카락은 남김
    top_eye = min(y for x, y in freg) + dy
    for x, y in list(mreg):
        if not hairy(mp[x, y]):
            mp[x, y] = (0, 0, 0, 0)
    # 얼굴 앞쪽으로 튀어나온 안경 렌즈·테 (얼굴 영역 왼쪽, 눈 높이)
    for y in range(max(0, top_eye - 4), min(m.height, mchin + 1)):
        for x in range(0, min(m.width, mfront + 14)):
            if mp[x, y][3] > 40 and not hairy(mp[x, y]) and (x - dx, y - dy) not in freg:
                mp[x, y] = (0, 0, 0, 0)
    # 2) 여자 얼굴을 붙인다 (남자 머리카락 위에는 덮지 않음 → 남자 앞머리 유지)
    for x, y in freg:
        X, Y = x + dx, y + dy
        if 0 <= X < m.width and 0 <= Y < m.height and not hairy(mp[X, Y]):
            mp[X, Y] = fp[x, y]
    # 3) 남은 가는 안경다리(살색 사이 어두운 가는 선) 정리
    for _ in range(2):
        for y in range(1, m.height - 1):
            for x in range(1, m.width - 1):
                p = mp[x, y]
                if p[3] > 40 and lum(p) < 90:
                    up, dn = mp[x, y - 1], mp[x, y + 1]
                    if up[3] > 40 and dn[3] > 40 and lum(up) > 170 and lum(dn) > 170:
                        mp[x, y] = up
    print('face swap offset', dx, dy)
    return m


def side_face_points(img, chin_y):
    """옆얼굴 기준점: 얼굴 앞선 x, 턱 y, 귀 x (턱 위쪽 줄들의 살색으로 계산)."""
    px = img.load()
    w, h = img.size
    sk = lambda p: p[3] > 150 and p[0] > 190 and p[1] > 135 and p[0] - p[2] > 30 and p[0] >= p[1] >= p[2] - 10
    rows = range(max(0, int(chin_y) - 30), min(h, int(chin_y)))
    xs = [x for y in rows for x in range(w) if sk(px[x, y])]
    front = min(xs)
    # 턱: 앞쪽 절반에서 살색이 있는 가장 아래 줄
    chin = max(y for y in range(h) for x in range(front, front + 25) if x < w and sk(px[x, y]) and y <= chin_y + 6)
    # 귀: 턱 위 10~30줄에서 가장 오른쪽 살색
    ear = max(x for y in range(max(0, chin - 32), chin - 8) for x in range(w) if sk(px[x, y]))
    return front, chin, ear


def swap_face2(male, m_anchor, female, f_anchor):
    m = male.copy()
    mp = m.load()
    mf, mc, me = side_face_points(male, m_anchor[1])
    ff, fc, fe = side_face_points(female, f_anchor[1])
    k = (me - mf) / max(1, fe - ff)
    fs = female.resize((round(female.width * k), round(female.height * k)), Image.BICUBIC)
    fp = fs.load()
    ff2, fc2 = ff * k, fc * k
    span = me - mf
    y0 = round(mc - span * 0.78)
    for y in range(max(0, y0), min(m.height, mc + 3)):
        for x in range(max(0, mf - 8), min(m.width, me - round(span * 0.2))):
            sx, sy = round(ff2 + (x - mf)), round(fc2 + (y - mc))
            src = fp[sx, sy] if 0 <= sx < fs.width and 0 <= sy < fs.height else (0, 0, 0, 0)
            cur = mp[x, y]
            # 남자 머리카락(앞머리)은 위쪽에서만 유지
            if cur[3] > 40 and is_hair(cur) and y < y0 + span * 0.18:
                continue
            behind_jaw = y > mc - span * 0.22 and x > mf + span * 0.3     # 턱 뒤 (여자 긴 머리 자리)
            src_hair = src[3] > 40 and (is_hair(src) or hairish(src) or lum(src) < 60)
            if y > mc + 1 and src[3] > 40 and not skinp(src):
                src = (0, 0, 0, 0)                                         # 옷깃
            if behind_jaw and src_hair:
                src = (0, 0, 0, 0)
            if src[3] > 40:
                mp[x, y] = src
            elif cur[3] > 40 and (is_hair(cur) or hairish(cur) or skinp(cur)) and x > mf + span * 0.3:
                pass                      # 귀·뒷머리·목 쪽 남자 그림 유지
            else:
                mp[x, y] = (0, 0, 0, 0)
    # 볼 앞으로 늘어진 가닥: 눈 아래 줄마다 살색의 맨 앞보다 앞쪽 머리카락 제거
    for y in range(round(mc - span * 0.45), m.height):
        skin_x = [x for x in range(m.width) if skinp(mp[x, y])]
        lim = min(skin_x) if skin_x else m.width
        for x in range(0, lim):
            mp[x, y] = (0, 0, 0, 0)
    # 턱 아래: 피부(목)와 뒷머리만 (셔츠 깃 제거)
    # 턱: 볼 안쪽에서 시작해 이어진 살색 덩어리의 맨 아래 (떨어져 있는 레이스는 제외)
    seed = next(((x, y) for y in range(round(mc - span * 0.35), m.height) for x in range(mf, mf + 20) if skinp(mp[x, y])), None)
    face = set()
    if seed:
        st = [seed]; face.add(seed)
        while st:
            x, y = st.pop()
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if 0 <= nx < m.width and 0 <= ny < m.height and (nx, ny) not in face and mp[nx, ny][3] > 40 and (skinp(mp[nx, ny]) or (lum(mp[nx, ny]) > 110 and ny < mc - span * 0.25)):
                    face.add((nx, ny)); st.append((nx, ny))
    # 턱: 볼 높이부터 내려가며, 줄의 살색 앞선이 얼굴 앞쪽(앞 30%)에 있는 마지막 줄
    chin_row = seed[1] if seed else mc
    for y in range(seed[1] if seed else mc, m.height):
        xs = [x for x in range(m.width) if (x, y) in face]
        if not xs or min(xs) > mf + span * 0.3:
            break
        chin_row = y
    for y in range(chin_row + 2, m.height):
        for x in range(m.width):
            p = mp[x, y]
            if p[3] > 40 and not ((is_hair(p) or hairish(p)) and x > mf + span * 0.6):
                mp[x, y] = (0, 0, 0, 0)
    # 볼 앞 외곽선 (가닥을 지운 자리)
    for y in range(round(mc - span * 0.45), chin_row + 2):
        xs = [x for x in range(m.width) if mp[x, y][3] > 40]
        if xs and xs[0] > 0 and skinp(mp[xs[0], y]):
            mp[xs[0] - 1, y] = (60, 30, 30, 255)
    m.chin_row = chin_row
    drop_specks(m, 0.03)
    print('swap2 scale', round(k, 2), 'male', (mf, mc, me), 'female', (ff, fc, fe))
    return m


def swap_face3(male, m_anchor, female, f_anchor):
    """여자 옆얼굴(얼굴 덩어리 + 외곽선)을 바탕으로, 남자 머리카락·귀를 위에 덮는다."""
    mf, mc, me = side_face_points(male, m_anchor[1])
    ff, fc, fe = side_face_points(female, f_anchor[1])
    k = (me - mf) / max(1, fe - ff)
    fs = female.resize((round(female.width * k), round(female.height * k)), Image.BICUBIC)
    reg, _, _ = face_region(fs)
    # 외곽선 포함 (2px 팽창)
    for _ in range(2):
        reg = reg | {(x + dx, y + dy) for x, y in reg for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))}
    fp, mp = fs.load(), male.load()
    ox, oy = mf - round(ff * k), mc - round(fc * k)
    out = Image.new('RGBA', male.size, (0, 0, 0, 0))
    op = out.load()
    W, H = male.size
    for x, y in reg:
        X, Y = x + ox, y + oy
        if 0 <= X < W and 0 <= Y < H and 0 <= x < fs.width and 0 <= y < fs.height and fp[x, y][3] > 40:
            if Y <= mc + 6 and (skinp(fp[x, y]) or lum(fp[x, y]) < 120 or not is_hair(fp[x, y])):
                op[X, Y] = fp[x, y]
    span = me - mf
    hair = lambda p: p[3] > 40 and is_hair(p)
    for y in range(H):
        for x in range(W):
            p = mp[x, y]
            if p[3] <= 40:
                continue
            near_hair = any(hair(mp[xx, yy]) for yy in range(max(0, y - 2), min(H, y + 3)) for xx in range(max(0, x - 2), min(W, x + 3)))
            is_ear = skinp(p) and x > mf + span * 0.5
            in_face = op[x, y][3] > 40 and skinp(op[x, y])
            if hair(p) and not (in_face and y > mc - span * 0.62):
                op[x, y] = p
            elif lum(p) < 70 and near_hair and not in_face:
                op[x, y] = p
            elif is_ear or (y > mc and skinp(p)):
                op[x, y] = p
    drop_specks(out, 0.05)
    print('swap3 scale', round(k, 2))
    return out


NECK_AT = 0.68   # 얼굴 앞선→귀 사이에서 목이 붙는 위치


def side_anchor(img, chin_guess):
    """옆얼굴 기준점: 턱 높이, 얼굴 앞선과 귀 사이(귀 쪽)의 목 자리."""
    front, chin, ear = side_face_points(img, chin_guess)
    return [round(front + (ear - front) * NECK_AT, 1), chin]


def shorten(hd, anchor):
    """긴 머리 옆모습 → 짧은 머리: 목 아래로 내려온 머리 제거, 밝은 꽃핀은 주변 머리색으로."""
    hd = hd.copy()
    px = hd.load()
    w, h = hd.size
    cut = int(anchor[1]) - 2
    for y in range(cut, h):
        for x in range(w):
            p = px[x, y]
            if p[3] > 40 and (hairish(p) or lum(p) < 70):
                px[x, y] = (0, 0, 0, 0)
    # 꽃핀: 밝은 꽃잎 픽셀 + 반경 3px 안 (꽃 테두리) → 그 줄의 머리카락 색으로
    skin_at = lambda x, y: y > h * 0.42 and px[x, y][0] > 200 and px[x, y][1] > 150 and px[x, y][0] - px[x, y][2] > 25
    skin = lambda p: False
    flower = {(x, y) for y in range(int(h * 0.45)) for x in range(w)
              if px[x, y][3] > 40 and lum(px[x, y]) > 150 and max(px[x, y][:3]) - min(px[x, y][:3]) < 110}
    zone = set()
    for x, y in flower:
        for dx in range(-3, 4):
            for dy in range(-3, 4):
                if 0 <= x + dx < w and 0 <= y + dy < h and px[x + dx, y + dy][3] > 40 and not skin_at(x + dx, y + dy):
                    zone.add((x + dx, y + dy))
    hair_px = [px[x, y] for y in range(h) for x in range(w) if (x, y) not in zone and px[x, y][3] > 40 and is_hair(px[x, y])]
    hc = tuple(sorted(hair_px, key=lum)[len(hair_px) // 2][:3]) + (255,) if hair_px else (90, 50, 40, 255)
    for x, y in zone:
        # 바깥 테두리는 외곽선으로 남김 (투명과 맞닿은 픽셀)
        edge = any(not (0 <= x + dx < w and 0 <= y + dy < h) or px[x + dx, y + dy][3] <= 40 for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)))
        px[x, y] = (40, 22, 22, 255) if edge else hc
    drop_specks(hd, 0.2)
    box = hd.getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
    return hd.crop(box), [round(anchor[0] - box[0], 1), round(anchor[1] - box[1], 1)]


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    sheet = key_out(Image.open(ROOT / 'parts-raw' / 'sheet_walk.webp'))
    meta = json.loads((OUT / 'parts.json').read_text(encoding='utf-8'))
    out = {}

    def save(name, img, anchor):
        img.save(OUT / 'walk' / f'hd_{name}.png')
        out[name] = {'src': f'parts/walk/hd_{name}.png', 'anchor': anchor}

    face_side = heads_in(sheet, 'f', 'left', 0.62, frame=0)      # 얼굴 온전
    back_side = heads_in(sheet, 'f', 'right', 0.62, frame=0)     # 뒷머리 온전
    long_side = merge_side(*face_side, *back_side)
    # 긴 머리: 몸통은 원본 어깨 그대로 → 시트에서 자른 선(목) 높이 + 어깨 가운데 x
    save('long_side', long_side[0], [face_side[0].shoulder_anchor[0], face_side[1][1]])
    save('long_back', *mirror_back(*heads_in(sheet, 'f', 'up', 0.62, frame=0)))
    save('short_back', *heads_in(sheet, 'm', 'up', 0.47))
    m_face = heads_in(sheet, 'm', 'left', 0.47, frame=0)      # 얼굴 온전 (안경 있음)
    m_back = heads_in(sheet, 'm', 'right', 0.47, frame=0)     # 뒷머리 온전
    short_side, s_anchor = merge_side(*m_face, *m_back)
    # 남자 옆얼굴에는 안경이 그려져 있음 → 얼굴 부분만 여자 옆얼굴(안경 없음)로 교체
    ss = swap_face2(short_side, s_anchor, *face_side)
    # 기준점 = 턱 (정면 머리와 같은 기준) → 턱 아래에 빈틈이 생기지 않음
    # 짧은 머리: 턱 아래 짧은 목(시트 원본처럼)을 그리고 그 끝을 몸통 목 꼭대기에 맞춘다
    ax = m_face[0].shoulder_anchor[0]
    neck_len = 6
    ay = ss.chin_row + neck_len
    sp = ss.load()
    for y in range(ss.chin_row - 4, min(ss.height, ay + 1)):
        for x in range(round(ax - 8), round(ax + 8) + 1):
            if 0 <= x < ss.width and (sp[x, y][3] <= 40 or y > ss.chin_row):
                edge = x in (round(ax - 8), round(ax + 8))
                sp[x, y] = (70, 40, 38, 255) if edge else ((226, 172, 146, 255) if y < ss.chin_row + 2 else (250, 212, 182, 255))
    if ay >= ss.height:
        bigger = Image.new('RGBA', (ss.width, ay + 2), (0, 0, 0, 0)); bigger.alpha_composite(ss); ss = bigger
    save('short_side', ss, [ax, ay])
    meta['walkHeads'] = out
    (OUT / 'parts.json').write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
    print('ok')


if __name__ == '__main__':
    main()
