"""split_sheet.py로 나눈 캐릭터들을 목에서 잘라 몸통 부품으로 만든다.

- 얼굴 피부가 끝나는 줄(옷깃 시작)을 찾아 그 아래만 남긴다.
- 어깨 위로 흘러내린 머리카락(머리 색과 같은 픽셀, 위쪽 가장자리와 이어진 것)을 지운다.
- public/parts/body/<이름>.png 와 public/parts/parts.json(목 위치)을 만든다.

사용법:
  python tools/cut_bodies.py work/outfit
"""
import json
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'parts'

# 시트 순서 (왼→오, 위→아래). 칸마다 남자, 여자 순서.
NAMES = [
    ('suit', '정장'), ('shirt', '셔츠'), ('knit', '니트'), ('blouse', '블라우스'), ('slacks', '슬랙스'),
    ('jeans', '청바지'), ('pleats', '플리츠스커트'), ('jacket', '자켓'), ('cardigan', '가디건'), ('hoodie', '후드티'),
    ('tee', '티셔츠'), ('vest', '니트조끼'), ('coat', '코트'), ('overall', '오버롤'), ('dress', '원피스'),
]


# 다른 시트: 칸마다 (남자 이름, 라벨), (여자 이름, 라벨)
SETS = {
    'dress': [
        (('wshirt', '화이트 셔츠'), ('flower', '플라워 원피스')),
        (('bshirt', '블랙 셔츠'), ('blackdress', '블랙 원피스')),
        (('blshirt', '블루 셔츠'), ('bluedress', '블루 원피스')),
        (('hanbok', '한복'), ('hanbok', '한복')),
        (('hanbokp', '혼주 한복'), ('hanbokp', '혼주 한복')),
        (('hanbokt', '트렌디 한복'), ('hanbokt', '트렌디 한복')),
    ],
}


def is_skin(p):
    r, g, b, a = p
    return a > 200 and r > 200 and 160 < g < 235 and 130 < b < 215 and r - b > 25


def dist(p, q):
    return ((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2) ** 0.5


def find_neck(img):
    """가운데 띠에서 피부가 주로 보이는 마지막 줄 (턱/목) 다음 줄."""
    w, h = img.size
    px = img.load()
    x0, x1 = int(w * 0.38), int(w * 0.62)
    skin_rows = []
    for y in range(h):
        n = sum(1 for x in range(x0, x1) if is_skin(px[x, y]))
        skin_rows.append(n / (x1 - x0))
    # 위 25%~70% 구간에서 피부가 많은 마지막 줄
    last = None
    for y in range(int(h * 0.25), int(h * 0.7)):
        if skin_rows[y] > 0.3:
            last = y
    return (last + 1) if last else int(h * 0.48)


# 시트의 얼굴은 모두 같아서 목(턱 끝) 높이도 같다. 캐릭터 맨 위(머리 꼭대기)에서 잰 값.
NECK_FROM_TOP = {'m': 104, 'f': 104}


def is_hair(p):
    """갈색 머리카락 색 (검정·남색 옷, 베이지 옷, 피부는 제외)."""
    r, g, b, a = p
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    if not (a > 40 and r >= 70 and r - b >= 35 and g < r * 0.63 and 40 < lum < 135):
        return False
    # 갈색 계열만 (빨간 치마·자주색 옷 제외): g가 b보다 충분히 커야 갈색
    return g - b >= 4 or (g >= b and r - g < 70)


def hair_palette(img, neck):
    """머리 꼭대기 쪽 픽셀 색 (머리카락 색 범위)."""
    w, h = img.size
    px = img.load()
    cols = []
    for y in range(0, int(neck * 0.3)):
        for x in range(w):
            p = px[x, y]
            if p[3] > 200:
                cols.append(p)
    # 너무 어두운 외곽선 색은 제외
    cols = [c for c in cols if 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2] > 45]
    # 대표 색 몇 개로 줄이기
    pal = []
    for c in cols[::7]:
        if all(dist(c, q) > 14 for q in pal):
            pal.append(c)
    return pal


def remove_hair(body, pal):
    """위쪽 가장자리와 이어진 머리카락 색 픽셀을 지우고, 남은 외곽선 찌꺼기를 정리."""
    w, h = body.size
    px = body.load()

    def hairy(p):
        return is_hair(p)

    seen = set()
    # 위쪽 가장자리 + 양옆 가장자리(옆 사람 머리카락)에서 시작
    seeds = [(x, y) for x in range(w) for y in range(0, 3)]
    seeds += [(x, y) for y in range(h) for x in list(range(0, 12)) + list(range(max(0, w - 12), w))]
    stack = [(x, y) for x, y in seeds if hairy(px[x, y])]
    for s in stack:
        seen.add(s)
    while stack:
        x, y = stack.pop()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and hairy(px[nx, ny]):
                seen.add((nx, ny))
                stack.append((nx, ny))
    for x, y in seen:
        px[x, y] = (0, 0, 0, 0)

    # 머리카락 외곽선 찌꺼기: 어두운 픽셀인데 반경 2 안에 색이 있는 픽셀이 하나도 없으면 제거
    lum = lambda p: 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]
    colored = [[px[x, y][3] > 40 and lum(px[x, y]) >= 85 for x in range(w)] for y in range(h)]
    kill = []
    for y in range(h):
        for x in range(w):
            p = px[x, y]
            if p[3] == 0 or lum(p) >= 85:
                continue
            near = any(colored[yy][xx] for yy in range(max(0, y - 2), min(h, y + 3)) for xx in range(max(0, x - 2), min(w, x + 3)))
            # 검정 옷 안쪽은 '어두운 픽셀끼리' 넓게 붙어 있으니, 가장자리 근처(투명 이웃 있음)만 대상
            edge = any(not (0 <= x + dx < w and 0 <= y + dy < h) or px[x + dx, y + dy][3] <= 40 for dx in (-1, 0, 1) for dy in (-1, 0, 1))
            if not near and edge:
                kill.append((x, y))
    for x, y in kill:
        px[x, y] = (0, 0, 0, 0)

    # 초록 배경과 섞였던 가장자리 픽셀 (밝은 초록빛)
    for _ in range(2):
        kill = []
        for y in range(h):
            for x in range(w):
                p = px[x, y]
                if p[3] == 0:
                    continue
                edge = any(not (0 <= x + dx < w and 0 <= y + dy < h) or px[x + dx, y + dy][3] <= 40 for dx in (-1, 0, 1) for dy in (-1, 0, 1))
                if edge and p[1] - max(p[0], p[2]) > 8 and lum(p) > 80:
                    kill.append((x, y))
        for x, y in kill:
            px[x, y] = (0, 0, 0, 0)
    return len(seen)


def fill_gaps(img, rounds=3):
    """머리카락을 지운 자리에 생긴 1~2px 틈(옷 가장자리의 구멍)을 옆 색으로 메운다."""
    w, h = img.size
    px = img.load()
    op = lambda x, y: 0 <= x < w and 0 <= y < h and px[x, y][3] > 40
    for _ in range(rounds):
        fills = []
        for y in range(h):
            for x in range(w):
                if px[x, y][3] > 40:
                    continue
                horiz = any(op(x - d, y) for d in (1, 2)) and any(op(x + d, y) for d in (1, 2))
                vert = any(op(x, y - d) for d in (1, 2)) and any(op(x, y + d) for d in (1, 2))
                if horiz or vert:
                    near = [px[x + dx, y + dy] for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)) if op(x + dx, y + dy)]
                    if near:
                        # 밝은(옷) 색을 우선
                        near.sort(key=lambda p: -(0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]))
                        fills.append((x, y, near[0]))
        for x, y, c in fills:
            px[x, y] = c
    return img


def fill_enclosed(img):
    """바깥과 이어지지 않은 투명 구멍을 주변 옷 색으로 채운다 (다리 사이처럼 바깥과 트인 틈은 그대로)."""
    w, h = img.size
    px = img.load()
    tr = lambda x, y: px[x, y][3] <= 40
    outside = bytearray(w * h)
    stack = [(x, y) for x in range(w) for y in (0, h - 1)] + [(x, y) for y in range(h) for x in (0, w - 1)]
    stack = [(x, y) for x, y in stack if tr(x, y)]
    for x, y in stack:
        outside[y * w + x] = 1
    while stack:
        x, y = stack.pop()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not outside[ny * w + nx] and tr(nx, ny):
                outside[ny * w + nx] = 1
                stack.append((nx, ny))
    holes = {(x, y) for y in range(h) for x in range(w) if tr(x, y) and not outside[y * w + x]}
    lum = lambda p: 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]
    while holes:
        fills = []
        for x, y in holes:
            near = [px[x + dx, y + dy] for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))
                    if 0 <= x + dx < w and 0 <= y + dy < h and (x + dx, y + dy) not in holes and px[x + dx, y + dy][3] > 40]
            if near:
                fills.append((x, y, max(near, key=lum)))
        if not fills:
            break
        for x, y, c in fills:
            px[x, y] = c
            holes.discard((x, y))
    return img


def face_cx(img):
    """얼굴 가로 중심: 머리 높이(위 20~42%)에 있는 피부 픽셀들의 가운데. 안경·옆 사람 머리에 덜 흔들림."""
    w, h = img.size
    px = img.load()
    xs = [x for y in range(int(h * 0.2), int(h * 0.42)) for x in range(w) if is_skin(px[x, y])]
    return sum(xs) / len(xs) if xs else w / 2


def sym_clip(img, cx, margin=2):
    """몸통은 거의 좌우 대칭: 줄마다 짧은 쪽 폭 + 여유를 넘는 부분(옆 사람 조각)은 지운다."""
    w, h = img.size
    px = img.load()
    for y in range(h):
        xs = [x for x in range(w) if px[x, y][3] > 40]
        if not xs:
            continue
        L, R = cx - xs[0], xs[-1] - cx
        if L <= 0 or R <= 0:
            continue
        lim = min(L, R) + margin
        for x in xs:
            if abs(x - cx) > lim:
                px[x, y] = (0, 0, 0, 0)
    return img


def largest_blob(img):
    from chroma import drop_specks
    return drop_specks(img, keep_ratio=0.08)


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    sys.path.insert(0, str(Path(__file__).parent))
    from face_parts import frame_of
    src = Path(sys.argv[1])
    set_name = sys.argv[sys.argv.index('--set') + 1] if '--set' in sys.argv else 'outfit'
    files = sorted(src.glob('*.png'))
    n_expect = (len(NAMES) if set_name == 'outfit' else len(SETS[set_name])) * 2
    assert len(files) == n_expect, f'캐릭터 수가 {len(files)}명이에요 (기대: {n_expect})'
    (OUT / 'body').mkdir(parents=True, exist_ok=True)
    meta_path = OUT / 'parts.json'
    meta = json.loads(meta_path.read_text(encoding='utf-8')) if meta_path.exists() else {}
    bodies = []
    for i, f in enumerate(files):
        sex = 'm' if i % 2 == 0 else 'f'
        if set_name == 'outfit':
            key, label = NAMES[i // 2]
        else:
            key, label = SETS[set_name][i // 2][i % 2]
        img = Image.open(f).convert('RGBA')
        if set_name == 'outfit':
            neck = NECK_FROM_TOP[sex]
        else:
            # 다른 시트는 그림 크기가 달라서, 기준 시트(work/outfit)의 남녀 평균 키에 맞춘 뒤
            # 기준 시트와 같은 목 높이에서 자른다 (머리 그림이 같으니 비율도 같음)
            ref = sorted((ROOT / 'work' / 'outfit').glob('*.png'))
            ref_h = [Image.open(r).height for j, r in enumerate(ref) if (j % 2 == 0) == (sex == 'm')]
            k = (sum(ref_h) / len(ref_h)) / img.height
            img = img.resize((round(img.width * k), round(img.height * k)), Image.LANCZOS)
            neck = NECK_FROM_TOP[sex]
        pal = hair_palette(img, neck)
        top = neck
        body = img.crop((0, top, img.width, img.height))
        removed = remove_hair(body, pal)
        # 목 언저리(맨 윗줄 몇 개)에 남은 초록빛 픽셀 제거
        bp = body.load()
        for yy in range(min(6, body.height)):
            for xx in range(body.width):
                q = bp[xx, yy]
                if q[3] > 0 and q[1] > q[0] and q[1] > q[2] + 8:
                    bp[xx, yy] = (0, 0, 0, 0)
        cx_face = face_cx(img) if set_name != 'outfit' else frame_of(img)['cx']
        if set_name != 'outfit':
            sym_clip(body, cx_face)
        body = largest_blob(body)
        if removed > 50:
            fill_enclosed(body)
            fill_gaps(body)
        box = body.getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
        x0, y0, x1, y1 = box
        # 목 기준점: 원래 그림의 가로 가운데, 자른 줄
        # 목 가로 위치 = 얼굴 가운데 (긴 머리 때문에 그림 가운데와 다를 수 있음)
        neck_x = cx_face - x0
        neck_y = (neck - top) - y0
        body = body.crop(box)
        name = f'{key}_{sex}'
        body.save(OUT / 'body' / f'{name}.png')
        bodies.append({'id': name, 'label': label, 'sex': sex, 'src': f'parts/body/{name}.png',
                       'w': body.width, 'h': body.height, 'neck': [round(neck_x, 1), neck_y]})
        print(f'{name:12s} neck={neck:3d}/{img.height} removed_hair={removed:5d} size={body.size}')
    # 같은 이름은 새것으로 바꾸고, 다른 시트에서 온 몸통은 그대로 둔다
    new_ids = {b['id'] for b in bodies}
    old = [b for b in meta.get('body', []) if b['id'] not in new_ids]
    meta['body'] = (bodies + old) if set_name == 'outfit' else (old + bodies)
    if set_name == 'outfit':
        # 이 시트의 기준 크기: 남자 캐릭터 전체 키 평균 (머리 시트와 크기를 맞출 때 사용)
        meta['bodyScaleRef'] = round(sum(Image.open(f).height for f in files[::2]) / len(files[::2]), 1)
    meta_path.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
    print('saved', meta_path)


if __name__ == '__main__':
    main()
