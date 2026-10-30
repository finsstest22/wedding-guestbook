"""v2 부품: 기준 시트(마네킹 3방향×4걸음)와, 그것을 수정해 만든 옷·머리 시트에서 레이어를 오려낸다.

parts-raw/v2/base.webp            기준 시트 (투명 또는 초록 배경)
parts-raw/v2/outfit__<id>.webp    옷을 입힌 시트  → 몸 전체(피부+옷) 그대로 사용
parts-raw/v2/hair__<id>.webp      머리를 얹은 시트 → 기준과 달라진 픽셀만 (머리카락 레이어)

결과: public/parts/v2/<id>_<dir>_<frame>.png, public/parts/v2/v2.json
칸은 기준 시트에서 찾고, 각 시트는 칸마다 위치 어긋남을 자동으로 맞춘다.

사용법: python tools/v2_parts.py            (parts-raw/v2 → public/parts/v2)
       PARTS_SET=v4 python tools/v2_parts.py (parts-raw/v4 → public/parts/v4, 신랑·신부 그림체)
"""
import json
import os
import sys
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from chroma import key_out  # noqa: E402
from split_sheet import components  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SET = os.environ.get('PARTS_SET', 'v2')
RAW = ROOT / 'parts-raw' / SET
OUT = ROOT / 'public' / 'parts' / SET
DIRS = ['down', 'left', 'up']          # 줄 순서: 앞, 왼쪽, 뒤
FACE_KINDS = ('face', 'eyes', 'brows', 'mouth', 'cheek')   # 앞모습 4칸에만 그리는 얼굴 부품
# GPT가 너무 크게 그린 얼굴 부품 줄이기 (가로 배율, 세로 배율)
SHRINK = {('mouth', 'smile'): (0.6, 1.0), ('mouth', 'grin'): (0.72, 0.72), ('mouth', 'teeth'): (0.72, 0.72)}
PAD = 40                               # 칸 여유 (긴 머리·치마가 기준보다 넓음)


def load(path):
    im = Image.open(path)
    if im.mode == 'RGBA' and im.getpixel((2, 2))[3] == 0:
        return im.convert('RGBA')
    return key_out(im)


def cells(base):
    cs = [b for b, n in components(base) if n > 2000]
    cs.sort(key=lambda b: (round(b[1] / 200), b[0]))
    assert len(cs) == 12, f'칸 {len(cs)}개'
    return cs


def register(base, sheet, box, r=4):
    """칸 안에서 기준과 같은 픽셀이 가장 많아지는 (dx, dy)."""
    x0, y0, x1, y1 = box
    bp, sp = base.load(), sheet.load()
    # 머리·어깨(위쪽 45%)로 맞춘다: GPT가 머리만 살짝 옮겨 그려도 머리카락이 얼굴에 붙게
    yh = y0 + (y1 - y0) * 45 // 100
    pts = [(x, y) for y in range(y0, yh + 1, 2) for x in range(x0, x1 + 1, 2) if bp[x, y][3] > 200]
    best = (-1, 0, 0)
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            n = 0
            for x, y in pts:
                q = sp[x + dx, y + dy]
                p = bp[x, y]
                if q[3] > 200 and abs(q[0] - p[0]) + abs(q[1] - p[1]) + abs(q[2] - p[2]) < 40:
                    n += 1
            if n > best[0]:
                best = (n, dx, dy)
    if r < 24 and (abs(best[1]) == r or abs(best[2]) == r):
        return register(base, sheet, box, r * 3)   # 찾는 범위 끝에 걸림 → 더 넓게
    return best[1], best[2], best[0] / max(1, len(pts))


def crop_cell(sheet, box, dx, dy):
    x0, y0, x1, y1 = box
    return sheet.crop((x0 - PAD + dx, y0 - PAD + dy, x1 + PAD + 1 + dx, y1 + 1 + dy))


def diff_layer(base_c, sheet_c):
    """기준과 달라진 픽셀만 (머리카락). 기준이 투명한데 생긴 것 + 색이 크게 바뀐 것."""
    out = Image.new('RGBA', sheet_c.size, (0, 0, 0, 0))
    bp, sp, op = base_c.load(), sheet_c.load(), out.load()
    for y in range(sheet_c.height):
        for x in range(sheet_c.width):
            q = sp[x, y]
            if q[3] <= 40:
                continue
            p = bp[x, y]
            if p[3] <= 40 or abs(q[0] - p[0]) + abs(q[1] - p[1]) + abs(q[2] - p[2]) > 60:
                op[x, y] = q
    # 머리카락 아닌 것(쫄쫄이·양말의 밝은 회색, 피부) 제거 — 머리 시트의 몸 색이 기준과 조금 달라서 생김
    lum = lambda c: 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]
    sat = lambda c: max(c[:3]) - min(c[:3])
    for y in range(out.height):
        for x in range(out.width):
            q = op[x, y]
            if q[3] == 0:
                continue
            body_gray = sat(q) < 40 and lum(q) > 95
            skin = q[0] > 200 and q[1] > 150 and q[0] - q[2] > 25
            if body_gray or (skin and bp[x, y][3] > 40):
                op[x, y] = (0, 0, 0, 0)
    # 남은 외곽선 찌꺼기: 머리카락과 떨어진 작은 조각
    from chroma import drop_specks
    drop_specks(out, 0.02)
    return out


FACE = {}


def clean_face_zone(img, keep_inside):
    """앞모습 얼굴 안쪽 정리. keep_inside=True: 얼굴 안쪽만 남김(얼굴 레이어)
    False: 눈 높이의 작은 어두운 점 제거(머리 레이어)."""
    cx, chin, fw = FACE['cx'], FACE['chin'], FACE['fw']
    px = img.load()
    w, h = img.size
    x0, x1 = cx - fw * 0.42, cx + fw * 0.42
    y0, y1 = chin - fw * 0.62, chin - 1
    if keep_inside:
        for y in range(h):
            for x in range(w):
                if not (x0 <= x <= x1 and y0 <= y <= y1):
                    px[x, y] = (0, 0, 0, 0)
        return img
    seen = set()
    zone = lambda x, y: cx - fw * 0.36 <= x <= cx + fw * 0.36 and chin - fw * 0.45 <= y <= y1
    for sy in range(int(chin - fw * 0.45), int(y1) + 1):
        for sx in range(int(cx - fw * 0.36), int(cx + fw * 0.36) + 1):
            if (sx, sy) in seen or px[sx, sy][3] <= 40:
                continue
            st, blob, inside = [(sx, sy)], [], True
            seen.add((sx, sy))
            while st:
                x, y = st.pop()
                blob.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and px[nx, ny][3] > 40:
                        if not zone(nx, ny):
                            inside = False
                            continue
                        seen.add((nx, ny))
                        st.append((nx, ny))
            if inside and len(blob) < 120:
                for x, y in blob:
                    px[x, y] = (0, 0, 0, 0)
    return img


def remove_drawn_eyes(img, sheet_c):
    """머리 시트에 AI가 그려 넣은 눈 제거. 원본 칸(sheet_c)에서 '거의 검정 + 둘레 대부분이 살색'인
    작은 덩어리가 눈 → 그 픽셀을 머리 레이어에서 지운다. (머리카락 테두리는 갈색 머리와 붙어 있음)"""
    cx, chin, fw = FACE['cx'], FACE['chin'], FACE['fw']
    sp, px = sheet_c.load(), img.load()
    w, h = img.size
    lum = lambda c: 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]
    black = lambda c: c[3] > 40 and lum(c) < 45
    skin = lambda c: c[3] > 40 and c[0] > 190 and c[1] > 130 and c[0] - c[2] > 20 and lum(c) > 140
    y0, y1 = int(chin - fw * 0.6), int(chin - fw * 0.1)
    x0, x1 = int(cx - fw * 0.45), int(cx + fw * 0.45)
    seen = set()
    for sy in range(y0, y1):
        for sx in range(x0, x1):
            if (sx, sy) in seen or not black(sp[sx, sy]):
                continue
            st, blob = [(sx, sy)], []
            seen.add((sx, sy))
            while st:
                x, y = st.pop()
                blob.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and black(sp[nx, ny]):
                        seen.add((nx, ny))
                        st.append((nx, ny))
            if not (8 <= len(blob) <= 260):
                continue
            bset = set(blob)
            ring = {(x + dx, y + dy) for x, y in blob for dx in (-2, -1, 0, 1, 2) for dy in (-2, -1, 0, 1, 2)} - bset
            ring = [(x, y) for x, y in ring if 0 <= x < w and 0 <= y < h and sp[x, y][3] > 40 and not black(sp[x, y])]
            if ring and sum(1 for x, y in ring if skin(sp[x, y])) / len(ring) > 0.6:
                for x, y in blob:
                    px[x, y] = (0, 0, 0, 0)
                # 눈 하이라이트 등 주변의 잔여 (살색 아닌 밝은 점)도 정리
                for x, y in ring:
                    if px[x, y][3] > 40 and not skin(sp[x, y]) and lum(px[x, y]) > 150:
                        px[x, y] = (0, 0, 0, 0)
    return img


def remove_thick_black(img):
    """눈 높이의 '두꺼운' 검정 덩어리(그려진 눈) 제거. 머리카락 테두리는 1~2px로 얇아서 남는다."""
    cx, chin, fw = FACE['cx'], FACE['chin'], FACE['fw']
    px = img.load()
    w, h = img.size
    y0, y1 = int(chin - fw * 0.5), int(chin - fw * 0.12)
    x0, x1 = int(cx - fw * 0.42), int(cx + fw * 0.42)
    blk = lambda x, y: 0 <= x < w and 0 <= y < h and px[x, y][3] > 40 and max(px[x, y][:3]) < 40
    core = [(x, y) for y in range(y0, y1) for x in range(x0, x1)
            if all(blk(x + dx, y + dy) for dx in (-1, 0, 1) for dy in (-1, 0, 1))]
    kill = {(x + dx, y + dy) for x, y in core for dx in range(-2, 3) for dy in range(-2, 3) if blk(x + dx, y + dy)}
    for x, y in kill:
        px[x, y] = (0, 0, 0, 0)
    return len(kill)


def eye_zone_only_hair(img):
    """눈이 놓이는 칸 안에서는 갈색 머리카락만 남김 — AI가 그린 눈의 테두리·반짝임 잔선 제거."""
    cx, chin, fw = FACE['cx'], FACE['chin'], FACE['fw']
    px = img.load()
    lum = lambda c: 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]
    for y in range(int(chin - fw * 0.44), int(chin - fw * 0.14)):
        for x in range(int(cx - fw * 0.40), int(cx + fw * 0.40)):
            c = px[x, y]
            if c[3] > 40 and not (45 <= lum(c) <= 165 and c[0] > c[2] + 12 and c[0] >= c[1]):
                px[x, y] = (0, 0, 0, 0)
    # 가는 선(3px 미만) 제거: 열기(침식→팽창) 후 사라지는 픽셀
    from PIL import ImageFilter
    a = img.getchannel('A').point(lambda v: 255 if v > 40 else 0)
    op = a.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3)).load()
    for y in range(int(chin - fw * 0.44), int(chin - fw * 0.14)):
        for x in range(int(cx - fw * 0.40), int(cx + fw * 0.40)):
            if px[x, y][3] > 40 and op[x, y] == 0:
                px[x, y] = (0, 0, 0, 0)
    return img


def face_layer(base_c, sheet_c, chin):
    """얼굴 시트: 앞모습 칸에서 턱 위(머리 안)의 바뀐 픽셀만 — 눈·입·볼."""
    out = Image.new('RGBA', sheet_c.size, (0, 0, 0, 0))
    bp, sp, op = base_c.load(), sheet_c.load(), out.load()
    for y in range(0, chin + 2):
        for x in range(sheet_c.width):
            q, p = sp[x, y], bp[x, y]
            if q[3] > 40 and p[3] > 40 and abs(q[0] - p[0]) + abs(q[1] - p[1]) + abs(q[2] - p[2]) > 45:
                op[x, y] = q
    from chroma import drop_specks
    drop_specks(out, 0.01)
    return clean_face_zone(out, True)


def side_layer(base_c, sheet_c, chin):
    """옆모습 얼굴 시트: 가운데 줄 칸에서 턱 위(머리 안)의 바뀐 픽셀만 — 옆 눈·입."""
    from PIL import ImageChops, ImageFilter
    out = Image.new('RGBA', sheet_c.size, (0, 0, 0, 0))
    bp, sp, op = base_c.load(), sheet_c.load(), out.load()
    for y in range(0, chin + 2):
        for x in range(sheet_c.width):
            q, p = sp[x, y], bp[x, y]
            if q[3] > 40 and p[3] > 40 and abs(q[0] - p[0]) + abs(q[1] - p[1]) + abs(q[2] - p[2]) > 45:
                op[x, y] = q
    from chroma import drop_specks
    drop_specks(out, 0.01)
    # 다시 그려진 머리 외곽선은 버림 (기준 외곽선 3px 이내)
    dark = Image.eval(base_c.convert('L'), lambda v: 255 if v < 90 else 0)
    dark = ImageChops.multiply(dark, base_c.getchannel('A').point(lambda v: 255 if v > 40 else 0))
    out.putalpha(ImageChops.multiply(out.getchannel('A'), ImageChops.invert(dark.filter(ImageFilter.MaxFilter(7)))))
    return out


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    OUT.mkdir(parents=True, exist_ok=True)
    base = load(next(RAW / f'base.{e}' for e in ('png', 'webp') if (RAW / f'base.{e}').exists()))
    boxes = cells(base)
    # 칸 크기 통일: 발끝(아래)을 맞추고, 가로는 머리 가운데를 맞춘다
    # (몸 전체 폭의 가운데로 맞추면 다리를 벌릴 때마다 머리가 앞뒤로 튐)
    ba = base.getchannel('A').load()

    def head_cx(b):
        x0, y0, x1, y1 = b
        xs = [x for y in range(y0, y0 + (y1 - y0) // 4) for x in range(x0, x1 + 1) if ba[x, y] > 40]
        return (min(xs) + max(xs)) // 2

    cxs = [head_cx(b) for b in boxes]
    W = 2 * max(max(cx - b[0], b[2] - cx) for cx, b in zip(cxs, boxes)) + 1
    H = max(b[3] - b[1] for b in boxes) + 1
    norm = []
    for cx, b in zip(cxs, boxes):
        norm.append((cx - W // 2, b[3] - H + 1, cx - W // 2 + W - 1, b[3]))
    meta = {'cell': [W + 2 * PAD, H + PAD], 'foot': H + PAD, 'pad': PAD, 'base': {}, 'outfit': {}, 'hair': {}, **{k: {} for k in FACE_KINDS}}

    def save(kind, pid, layers):
        meta[kind][pid] = {}
        for k, img in enumerate(layers):
            d, f = DIRS[k // 4], k % 4
            name = f'{kind}_{pid}_{d}_{f}.png'
            img.save(OUT / name)
            meta[kind][pid].setdefault(d, []).append(f'parts/{SET}/{name}')

    base_cells = [crop_cell(base, b, 0, 0) for b in norm]
    from face_parts import frame_of as _fo
    FACE.update({k: v for k, v in _fo(base_cells[0]).items() if k in ('cx', 'chin', 'fw')})
    save('base', 'base', base_cells)
    only = sys.argv[1] if len(sys.argv) > 1 else ''
    old = json.loads((OUT / 'v2.json').read_text(encoding='utf-8')) if only and (OUT / 'v2.json').exists() else None
    if old:
        for kk in ('outfit', 'hair', 'side') + FACE_KINDS:
            meta.setdefault(kk, {}).update(old.get(kk, {}))
    sheets = {}
    for e in ('webp', 'png'):                     # 같은 이름이면 png(무손실) 우선
        for f in RAW.glob(f'{only}.{e}' if '__' in only else f'{only}*__*.{e}'):   # hair__long 처럼 한 장만도 가능
            sheets[f.stem] = f
    for f in [sheets[k] for k in sorted(sheets)]:
        kind, pid = f.stem.split('__')
        sheet = load(f)
        layers, report = [], []
        if kind in FACE_KINDS:
            from face_parts import frame_of
            for k in range(4):
                dx, dy, score = register(base, sheet, boxes[k])
                c = crop_cell(sheet, norm[k], dx, dy)
                fl = face_layer(base_cells[k], c, frame_of(base_cells[k])['chin'])
                # GPT가 얼굴 테두리(턱선)를 살짝 다시 그려서 같이 잘려 들어옴 → 테두리 근처는 버림
                from PIL import ImageChops, ImageFilter
                bc = base_cells[k]
                dark = Image.eval(bc.convert('L'), lambda v: 255 if v < 90 else 0)
                dark = ImageChops.multiply(dark, bc.getchannel('A').point(lambda v: 255 if v > 40 else 0))
                near = dark.filter(ImageFilter.MaxFilter(7))           # 기준 외곽선 3px 이내
                fl.putalpha(ImageChops.multiply(fl.getchannel('A'), ImageChops.invert(near)))
                layers.append(fl)
                report.append(f'{dx:+d},{dy:+d}({score:.0%})')
            # 칸마다 표정이 조금씩 달라서 → 첫 칸 얼굴을 걸음마다 머리 위치만큼 옮겨 쓴다
            def head_pos(c):
                a = c.getchannel('A').load()
                top = next(y for y in range(c.height) if any(a[x, y] > 40 for x in range(c.width)))
                xs = [x for y in range(top, top + 40) for x in range(c.width) if a[x, y] > 40]
                return (min(xs) + max(xs)) / 2, top
            h0 = head_pos(base_cells[0])
            moved = []
            for k in range(4):
                hk = head_pos(base_cells[k])
                im = Image.new('RGBA', layers[0].size, (0, 0, 0, 0))
                im.alpha_composite(layers[0], (round(hk[0] - h0[0]), round(hk[1] - h0[1])))
                moved.append(im)
            layers = moved
            if kind == 'mouth':
                # 잔점을 지우고, 크게 그린 입은 줄인 뒤 머리 가운데에 맞춘다
                import numpy as np
                from scipy import ndimage
                kx, ky = SHRINK.get((kind, pid), (1.0, 1.0))
                for i, im in enumerate(layers):
                    a = np.array(im)
                    lab, n = ndimage.label(a[..., 3] > 40)
                    if n:
                        size = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
                        a[np.isin(lab, [k + 1 for k in range(n) if size[k] < 4])] = 0
                    im = Image.fromarray(a)
                    bb = im.getbbox()
                    if not bb:
                        continue
                    part = im.crop(bb)
                    w, h = max(1, round(part.width * kx)), max(1, round(part.height * ky))
                    if (w, h) != part.size:
                        part = part.resize((w, h), Image.NEAREST)
                    cx = head_pos(base_cells[i])[0]
                    out = Image.new('RGBA', im.size, (0, 0, 0, 0))
                    out.alpha_composite(part, (round(cx - w / 2), bb[1] + (bb[3] - bb[1] - h) // 2))
                    layers[i] = out
            meta[kind][pid] = {'down': []}
            for k, img in enumerate(layers):
                name = f'{kind}_{pid}_down_{k}.png'
                img.save(OUT / name)
                meta[kind][pid]['down'].append(f'parts/{SET}/{name}')
            if kind == 'eyes':
                # 눈 시트에 옆모습 눈도 그려져 있으면 가운데 줄 4칸에서 같이 오린다
                chin = frame_of(base_cells[0])['chin']
                side = []
                for k in range(4, 8):
                    dx, dy, _ = register(base, sheet, boxes[k])
                    side.append(side_layer(base_cells[k], crop_cell(sheet, norm[k], dx, dy), chin))
                if sum(1 for im in side if im.getbbox()) >= 3:
                    meta[kind][pid]['left'] = []
                    for k, img in enumerate(side):
                        name = f'{kind}_{pid}_left_{k}.png'
                        img.save(OUT / name)
                        meta[kind][pid]['left'].append(f'parts/{SET}/{name}')
                    report.append('옆눈')
            print(f'{kind:6s} {pid:14s}', ' '.join(report))
            continue
        if kind == 'side':
            # 옆모습 얼굴: 가운데 줄(왼쪽 보기) 4칸만
            from face_parts import frame_of
            chin = frame_of(base_cells[0])['chin']
            meta.setdefault('side', {})[pid] = {'left': []}
            for k in range(4, 8):
                dx, dy, score = register(base, sheet, boxes[k])
                img = side_layer(base_cells[k], crop_cell(sheet, norm[k], dx, dy), chin)
                name = f'side_{pid}_left_{k - 4}.png'
                img.save(OUT / name)
                meta['side'][pid]['left'].append(f'parts/{SET}/{name}')
                report.append(f'{dx:+d},{dy:+d}({score:.0%})')
            print(f'{kind:6s} {pid:14s}', ' '.join(report))
            continue
        for k, b in enumerate(norm):
            dx, dy, score = register(base, sheet, boxes[k])
            c = crop_cell(sheet, b, dx, dy)
            if kind == 'outfit':
                from chroma import drop_specks
                drop_specks(c, 0.05)          # 이웃 칸 찌꺼기
            if kind == 'outfit':
                layers.append(c)
            else:
                hl = diff_layer(base_cells[k], c)
                if k < 4:
                    hl = remove_drawn_eyes(clean_face_zone(hl, False), c)
                    remove_thick_black(hl)
                    eye_zone_only_hair(hl)
                layers.append(hl)
            report.append(f'{dx:+d},{dy:+d}({score:.0%})')
        save(kind, pid, layers)
        print(f'{kind:6s} {pid:10s}', ' '.join(report))
    from face_parts import frame_of
    fr = frame_of(base_cells[0])
    meta['faceFrame'] = {'cx': fr['cx'], 'chin': fr['chin'], 'fw': fr['fw']}
    (OUT / 'v2.json').write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding='utf-8')
    print('ok', meta['cell'])


if __name__ == '__main__':
    main()
