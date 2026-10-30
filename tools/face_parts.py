"""얼굴 부품 시트(첫 칸 = 빈 얼굴)에서 눈·입·볼 부품을 오려낸다.

- 같은 시트의 빈 얼굴과 비교해서 얼굴 안에서 달라진 픽셀만 부품으로 남긴다.
- 위치는 '얼굴 너비'와 '턱 끝'을 기준으로 한 비율로 저장 → 어떤 머리에도 같은 자리에 붙는다.
- 빈 얼굴 머리는 기본 머리(head/base_m.png)로도 저장한다.

사용법 (split_sheet.py --no-split 로 work/eyes, work/mouth, work/cheek 를 먼저 만든 뒤):
  python tools/face_parts.py
"""
import json
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'parts'
WORK = ROOT / 'work'

SHEETS = {
    'eyes': [None, ('round', '동그란 눈'), ('droopy', '처진 눈'), ('cat', '올라간 눈'), ('narrow', '가는 눈'),
             ('sparkle', '반짝이는 눈'), ('double', '쌍꺼풀 눈'), ('lashes', '긴 속눈썹 눈'), ('dot', '작은 점 눈'),
             ('sleepy', '졸린 눈'), ('smile', '웃는 눈'), ('mole', '점 있는 눈')],
    'mouth': [None, ('smile', '부드러운 미소'), ('open', '활짝 웃음'), ('neutral', '무표정'), ('cat', '고양이 입'),
              ('oh', '살짝 벌린 입'), ('grin', '이빨 보이기'), ('pout', '삐진 입')],
    'cheek': [None, ('blush', '연한 볼터치'), ('blush2', '강한 볼터치'), ('freckle', '주근깨'), ('mole', '입가 점')],
}


def is_skin(p):
    r, g, b, a = p
    return a > 200 and r > 200 and 150 < g < 235 and 120 < b < 215 and r - b > 25


def face_mask(img):
    """가장 큰 피부 덩어리 = 얼굴. (픽셀 집합, x0, x1, 턱 y)"""
    w, h = img.size
    px = img.load()
    seen = bytearray(w * h)
    best = []
    for sy in range(h):
        for sx in range(w):
            if seen[sy * w + sx] or not is_skin(px[sx, sy]):
                continue
            stack, pts = [(sx, sy)], []
            seen[sy * w + sx] = 1
            while stack:
                x, y = stack.pop()
                pts.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and is_skin(px[nx, ny]):
                        seen[ny * w + nx] = 1
                        stack.append((nx, ny))
            if len(pts) > len(best):
                best = pts
    xs = [p[0] for p in best]
    ys = [p[1] for p in best]
    return set(best), min(xs), max(xs), max(ys)


def erode(mask, n=2):
    for _ in range(n):
        mask = {(x, y) for x, y in mask if all((x + dx, y + dy) in mask for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)))}
    return mask


def clean(part, region, min_px):
    """얼굴 테두리에 닿은 작은 조각(앞머리 끝·외곽선)과 티끌을 지운다. 눈·입처럼 큰 덩어리는 남김."""
    w, h = part.size
    px = part.load()
    seen = set()
    for sy in range(h):
        for sx in range(w):
            if px[sx, sy][3] == 0 or (sx, sy) in seen:
                continue
            stack, pts = [(sx, sy)], []
            seen.add((sx, sy))
            while stack:
                x, y = stack.pop()
                pts.append((x, y))
                for nx in (x - 1, x, x + 1):
                    for ny in (y - 1, y, y + 1):
                        if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and px[nx, ny][3] > 0:
                            seen.add((nx, ny))
                            stack.append((nx, ny))
            touches = any((x + dx, y + dy) not in region for x, y in pts for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)))
            if len(pts) < min_px or (touches and len(pts) < 80):
                for x, y in pts:
                    px[x, y] = (0, 0, 0, 0)


def blobs(part):
    w, h = part.size
    px = part.load()
    seen, out = set(), []
    for sy in range(h):
        for sx in range(w):
            if px[sx, sy][3] == 0 or (sx, sy) in seen:
                continue
            stack, pts = [(sx, sy)], []
            seen.add((sx, sy))
            while stack:
                x, y = stack.pop()
                pts.append((x, y))
                for nx in (x - 1, x, x + 1):
                    for ny in (y - 1, y, y + 1):
                        if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and px[nx, ny][3] > 0:
                            seen.add((nx, ny))
                            stack.append((nx, ny))
            out.append(pts)
    return out


def keep_eyes(part):
    """가장 큰 두 덩어리(두 눈)와 그 옆·아래(반짝이, 눈 밑 점)만 남긴다. 눈 위 앞머리 조각은 버림."""
    bs = sorted(blobs(part), key=len, reverse=True)
    if len(bs) < 2:
        return
    boxes = []
    for b in bs[:2]:
        xs = [p[0] for p in b]; ys = [p[1] for p in b]
        boxes.append((min(xs) - 6, min(ys) - 1, max(xs) + 6, max(ys) + 16))
    px = part.load()
    for b in bs[2:]:
        x0 = min(p[0] for p in b); x1 = max(p[0] for p in b); y0 = min(p[1] for p in b); y1 = max(p[1] for p in b)
        inside = any(x1 >= bx0 and x0 <= bx1 and y1 >= by0 and y0 <= by1 for bx0, by0, bx1, by1 in boxes)
        if not inside:
            for x, y in b:
                px[x, y] = (0, 0, 0, 0)


def dist(p, q):
    return ((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2) ** 0.5


def frame_of(img):
    """얼굴 기준틀: 턱 위 8% 지점의 얼굴 가로폭(안경·볼에 덜 흔들림)과 그 가운데, 턱 끝."""
    mask, x0, x1, chin = face_mask(img)
    fw = x1 - x0 + 1
    # 목까지 피부로 이어진 경우가 있어서, 폭이 얼굴의 절반 이상인 마지막 줄을 턱으로 본다
    rows = {}
    for x, y in mask:
        rows.setdefault(y, []).append(x)
    chin = max(y for y, xs in rows.items() if max(xs) - min(xs) + 1 >= fw * 0.5)
    return {'mask': mask, 'x0': x0, 'x1': x1, 'cx': (x0 + x1) / 2, 'chin': chin, 'fw': fw}


def extract(cat, entries):
    files = sorted((WORK / cat).glob('*.png'))
    assert len(files) == len(entries), f'{cat}: 칸 {len(files)}개, 이름 {len(entries)}개'
    blank = Image.open(files[0]).convert('RGBA')
    bf = frame_of(blank)
    region = erode(bf['mask'], 3)
    bpx = blank.load()
    out = []
    (OUT / 'face' / cat).mkdir(parents=True, exist_ok=True)
    for f, ent in zip(files[1:], entries[1:]):
        key, label = ent
        img = Image.open(f).convert('RGBA')
        fr = frame_of(img)
        # 빈 얼굴 기준틀에 맞춰 이동 (같은 시트라 크기는 거의 같음)
        k = bf['fw'] / fr['fw']
        if abs(k - 1) > 0.02:
            img = img.resize((round(img.width * k), round(img.height * k)), Image.NEAREST)
            fr = frame_of(img)
        dx, dy = round(fr['cx'] - bf['cx']), fr['chin'] - bf['chin']
        px = img.load()
        part = Image.new('RGBA', blank.size, (0, 0, 0, 0))
        pp = part.load()
        for x, y in region:
            sx, sy = x + dx, y + dy
            if not (0 <= sx < img.width and 0 <= sy < img.height):
                continue
            p = px[sx, sy]
            if p[3] > 200 and dist(p, bpx[x, y]) > 34:
                pp[x, y] = p
        clean(part, region, min_px=2 if cat == 'cheek' else 6)
        if cat == 'eyes':
            keep_eyes(part)
        box = part.getbbox()
        if not box:
            print(f'⚠ {cat}/{key}: 달라진 부분을 못 찾았어요')
            continue
        part = part.crop(box)
        name = f'{cat}/{key}.png'
        part.save(OUT / 'face' / name)
        fw = bf['fw']
        out.append({'id': key, 'label': label, 'src': f'parts/face/{name}',
                    # 얼굴 가운데·턱 끝 기준, 얼굴 너비 단위
                    'x': round((box[0] - bf['cx']) / fw, 4), 'y': round((box[1] - bf['chin']) / fw, 4),
                    'w': round(part.width / fw, 4)})
        print(f'{cat:6s} {key:8s} {part.size}')
    return out, blank, bf


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    meta_path = OUT / 'parts.json'
    meta = json.loads(meta_path.read_text(encoding='utf-8')) if meta_path.exists() else {}
    meta['face'] = {}
    for cat, entries in SHEETS.items():
        parts, blank, bf = extract(cat, entries)
        meta['face'][cat] = parts
        if cat == 'eyes':
            # 빈 얼굴 머리 = 기본 머리. 턱 아래(셔츠 깃)는 버린다.
            (OUT / 'head').mkdir(parents=True, exist_ok=True)
            head = blank.crop((0, 0, blank.width, bf['chin'] + 1))
            box = head.getbbox()
            head = head.crop(box)
            head.save(OUT / 'head' / 'base_m.png')
            meta['head'] = [{'id': 'base_m', 'label': '기본', 'sex': 'm', 'src': 'parts/head/base_m.png',
                             'face': {'cx': bf['cx'] - box[0], 'chin': bf['chin'] - box[1], 'fw': bf['fw']}}]
    # 몸통 시트의 얼굴 너비 (머리를 몸통 크기에 맞출 기준)
    ref = WORK / 'outfit' / '00.png'
    if ref.exists():
        meta['bodyFaceW'] = frame_of(Image.open(ref).convert('RGBA'))['fw']
        meta_path.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
    print('saved', meta_path)


if __name__ == '__main__':
    main()
