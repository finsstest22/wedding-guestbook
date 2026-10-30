"""여자 헤어 시트(신랑·신부 15쌍)에서 여자 머리 15종을 오려 '빈 얼굴 머리' 부품으로 만든다.

- 면사포·꽃 장식(흰색·연한색) 제거 → 머리카락과 외곽선만 남김
- 얼굴 안의 눈·입·볼(피부에 둘러싸인 구멍)을 피부색으로 메움 → 눈·입 부품을 얹을 수 있게
- 목 아래로 내려오는 긴 머리카락은 남김 (어깨 위로 흘러내린 머리)

사용법:
  python tools/split_sheet.py parts-raw/sheet_hair_f.webp work/hair
  python tools/hair_heads.py
"""
import json
import sys
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from chroma import drop_specks  # noqa: E402
from cut_bodies import is_hair  # noqa: E402
from face_parts import face_mask  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'parts'

NAMES = [('straight', '생머리'), ('comma', '쉼표 앞머리'), ('perm', '펌'), ('bob', '단발'), ('ponytail', '포니테일'),
         ('bun', '똥머리'), ('twin', '양갈래'), ('long', '긴 생머리'), ('wave', '웨이브'), ('halfup', '반묶음'),
         ('updo', '올림머리'), ('sidepony', '사이드 포니테일'), ('hime', '히메컷'), ('bobwave', '단발 웨이브'), ('layered', '레이어드')]


def lum(p):
    return 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]


def is_skin(p):
    r, g, b, a = p
    return a > 150 and r > 200 and 150 < g < 235 and 120 < b < 215 and r - b > 25


def face_boxes():
    """눈·입·볼 부품들이 차지하는 영역 (얼굴 가운데·턱 기준, 얼굴너비 단위), 약간 여유를 둠."""
    meta = json.loads((OUT / 'parts.json').read_text(encoding='utf-8'))
    boxes = []
    for cat in ('eyes', 'mouth', 'cheek'):
        for p in meta['face'][cat]:
            im = Image.open(ROOT / 'public' / p['src'])
            hh = p['w'] * im.height / im.width
            boxes.append((p['x'] - 0.02, p['y'] - 0.02, p['x'] + p['w'] + 0.02, p['y'] + hh + 0.02))
    return boxes


FACE_BOXES = []
BASE = []


def head_of(img):
    w, h = img.size
    px = img.load()
    mask, fx0, fx1, chin = face_mask(img)
    rows = {}
    for x, y in mask:
        rows.setdefault(y, []).append(x)
    fw = fx1 - fx0 + 1
    chin = max(y for y, xs in rows.items() if max(xs) - min(xs) + 1 >= fw * 0.5)
    fy0 = min(rows)
    cx = (fx0 + fx1) / 2

    # 1) 눈·입·볼 지우기: 이미 잘라 둔 눈·입·볼 부품이 놓이는 자리(얼굴 기준)를 피부색으로 덮는다
    skin_c = [0, 0, 0, 0]
    for x, y in mask:
        p = px[x, y]
        skin_c[0] += p[0]; skin_c[1] += p[1]; skin_c[2] += p[2]; skin_c[3] += 1
    sc = tuple(v // skin_c[3] for v in skin_c[:3]) + (255,)
    region = set()
    for bx0, by0, bx1, by1 in FACE_BOXES:
        X0, X1 = round(cx + bx0 * fw), round(cx + bx1 * fw)
        Y0, Y1 = round(chin + by0 * fw), round(chin + by1 * fw)
        for y in range(max(0, Y0), min(chin, Y1 + 1)):
            for x in range(max(fx0 + 1, X0), min(fx1, X1 + 1)):
                if px[x, y][3] > 40:
                    region.add((x, y))
    # 앞머리: 영역 위쪽에서 영역 밖 머리카락과 이어진 갈색 픽셀은 남긴다
    bangs = set()
    stack = [(x, y) for x, y in region if is_hair(px[x, y]) and (x, y - 1) not in region and (x, y - 1) not in mask
             and y - 1 >= 0 and px[x, y - 1][3] > 40]
    bangs.update(stack)
    while stack:
        x, y = stack.pop()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1)):
            if (nx, ny) in region and (nx, ny) not in bangs and is_hair(px[nx, ny]) and ny < chin - fw * 0.5:
                bangs.add((nx, ny))
                stack.append((nx, ny))
    # 기본 머리(깨끗한 맨얼굴)의 피부를 크기·위치를 맞춰 덮는다
    base, bf = BASE[0], BASE[1]
    k = bf['fw'] / fw
    bp = base.load()
    for x, y in region - bangs:
        bx = round(bf['cx'] + (x - cx) * k)
        by = round(bf['chin'] + (y - chin) * k)
        if 0 <= bx < base.width and 0 <= by < base.height and is_skin(bp[bx, by]):
            px[x, y] = bp[bx, by]
        else:
            px[x, y] = sc
        mask.add((x, y))

    # 2) 면사포·꽃 제거: 밝고 채도 낮은(흰·크림) 픽셀, 초록빛 픽셀
    veil = lambda p: ((lum(p) > 150 and max(p[:3]) - min(p[:3]) < 60) or p[1] > p[0]
                      or (p[0] > 190 and p[2] > p[1] + 5))   # 흰 면사포·초록빛·분홍 꽃
    face_box = lambda x, y: fx0 - 1 <= x <= fx1 + 1 and min(rows) <= y <= chin
    for y in range(h):
        for x in range(w):
            p = px[x, y]
            if p[3] > 40 and not face_box(x, y) and veil(p):
                px[x, y] = (0, 0, 0, 0)
    # 3) 목 아래: 몸(드레스·팔·부케)은 지우고 흘러내린 머리카락만 (갈색·어두운 외곽선)
    hairish = lambda p: p[0] >= p[1] >= p[2] - 8 and p[0] - p[2] > 20 and lum(p) < 150
    for y in range(chin + 3, h):
        for x in range(w):
            p = px[x, y]
            if p[3] > 40 and not hairish(p):
                # 어두운 외곽선은 바로 옆에 머리카락이 있을 때만 남김 (어깨·드레스 선 제거)
                if lum(p) < 60 and any(hairish(px[xx, yy]) and px[xx, yy][3] > 40 and lum(px[xx, yy]) >= 60
                                       for yy in range(max(0, y - 1), min(h, y + 2)) for xx in range(max(0, x - 1), min(w, x + 2))):
                    continue
                px[x, y] = (0, 0, 0, 0)
    bottom = int(h * 0.62)
    for y in range(bottom, h):
        for x in range(w):
            px[x, y] = (0, 0, 0, 0)
    # 4) 목: 턱 아래 좁은 띠는 지운다 (몸통 쪽 목과 겹침)
    for y in range(chin + 1, min(h, chin + 4)):
        for x in range(w):
            if abs(x - cx) < fw * 0.3 and px[x, y][3] > 40 and not hairish(px[x, y]):
                px[x, y] = (0, 0, 0, 0)
    # 5) 턱 아래 가는 선(어깨·드레스 외곽선) 제거: 열기 연산으로 3px보다 가는 부분만 사라짐
    from PIL import ImageFilter
    al = img.getchannel('A').point(lambda v: 255 if v > 40 else 0)
    op = al.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3)).load()
    for y in range(chin + 3, h):
        for x in range(w):
            if px[x, y][3] > 40 and op[x, y] == 0:
                px[x, y] = (0, 0, 0, 0)
    drop_specks(img, 0.12)
    box = img.getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
    head = img.crop(box)
    return head, {'cx': cx - box[0], 'chin': chin - box[1], 'fw': fw}


def base_skin_mask():
    """기본 머리(맨얼굴)의 피부 영역 (구멍 없이) — 얼굴 기준 좌표(cx·chin 원점, 얼굴너비 단위)."""
    base, bf = BASE[0], BASE[1]
    px = base.load()
    w, h = base.size
    rows = {}
    for y in range(h):
        for x in range(w):
            if is_skin(px[x, y]):
                rows.setdefault(y, []).append(x)
    pts = []
    for y, xs in rows.items():
        for x in range(min(xs), max(xs) + 1):
            pts.append(((x - bf['cx']) / bf['fw'], (y - bf['chin']) / bf['fw'], px[x, y] if is_skin(px[x, y]) else None))
    return pts


def head_of_m(img, fw=65, chin_from_bottom=145):
    """남자: 기본 머리와 같은 사람 → 발끝 기준으로 얼굴 위치를 정하고 맨얼굴로 덮는다 (안경·눈·입 제거)."""
    w, h = img.size
    px = img.load()
    bottom = img.getchannel('A').getbbox()[3] - 1
    chin = bottom - chin_from_bottom
    # 얼굴 가운데: 몸통(가슴 높이) 좌우 가운데
    ys = range(chin + 20, chin + 50)
    xs = [x for y in ys for x in range(w) if px[x, y][3] > 40]
    cx = (min(xs) + max(xs)) / 2
    base, bf = BASE[0], BASE[1]
    bp = base.load()
    k = bf['fw'] / fw
    brow = chin - fw * 0.62          # 이 위는 앞머리 유지
    # 안경테: 이마 아래로 이어진 어두운 가는 선 → 맨얼굴 자리 위쪽이면 머리카락이 아니면 지움
    glass_y0, glass_y1 = round(chin - fw * 0.8), round(chin - fw * 0.3)
    for fx, fy, _ in BASE_MASK:
        x, y = round(cx + fx * fw), round(chin + fy * fw)
        if not (0 <= x < w and 0 <= y < h):
            continue
        if y < brow and px[x, y][3] > 40 and is_hair(px[x, y]) and not (glass_y0 <= y <= glass_y1 and lum(px[x, y]) < 70):
            continue
        bx, by = round(bf['cx'] + fx * bf['fw']), round(bf['chin'] + fy * bf['fw'])
        if 0 <= bx < base.width and 0 <= by < base.height and bp[bx, by][3] > 40:
            q = bp[bx, by]
            if is_skin(q):
                px[x, y] = q
            else:
                # 기본 머리의 앞머리 자리 → 이 머리에선 이마일 수 있음: 같은 줄 가까운 기본 피부색으로
                best = None
                for d in range(1, 30):
                    for xx in (bx - d, bx + d):
                        if 0 <= xx < base.width and is_skin(bp[xx, by]):
                            best = bp[xx, by]; break
                    if best: break
                if best:
                    px[x, y] = best
    # 남은 안경 조각: 얼굴 안쪽 어두운 픽셀 중 머리카락 덩어리와 이어지지 않은 작은 조각
    face_pts = {(round(cx + fx * fw), round(chin + fy * fw)) for fx, fy, _ in BASE_MASK}
    darkp = lambda q: q[3] > 40 and lum(q) < 120
    seen = set()
    for sx, sy in list(face_pts):
        if (sx, sy) in seen or not (0 <= sx < w and 0 <= sy < h) or not darkp(px[sx, sy]):
            continue
        stack, blob, touches = [(sx, sy)], [], False
        seen.add((sx, sy))
        while stack:
            x, y = stack.pop()
            blob.append((x, y))
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if not (0 <= nx < w and 0 <= ny < h) or (nx, ny) in seen or not darkp(px[nx, ny]):
                    continue
                if (nx, ny) not in face_pts:
                    touches = True
                    continue
                seen.add((nx, ny))
                stack.append((nx, ny))
        if len(blob) < 60 and not (touches and len(blob) > 25):
            for x, y in blob:
                bx, by = round(bf['cx'] + (x - cx) / fw * bf['fw']), round(bf['chin'] + (y - chin) / fw * bf['fw'])
                px[x, y] = bp[bx, by] if 0 <= bx < base.width and 0 <= by < base.height and bp[bx, by][3] > 40 else px[x, y]
    # 목 아래: 몸(정장) 제거
    hairish = lambda p: p[0] >= p[1] >= p[2] - 8 and p[0] - p[2] > 20 and lum(p) < 150
    for y in range(chin + 3, h):
        for x in range(w):
            if px[x, y][3] > 40 and not hairish(px[x, y]):
                px[x, y] = (0, 0, 0, 0)
    for y in range(chin + 12, h):
        for x in range(w):
            px[x, y] = (0, 0, 0, 0)
    drop_specks(img, 0.12)
    box = img.getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
    return img.crop(box), {'cx': cx - box[0], 'chin': chin - box[1], 'fw': fw}


BASE_MASK = []


NAMES_M = [('twoblock', '투블럭'), ('comma_m', '쉼표머리'), ('perm_m', '펌'), ('down', '다운펌'), ('pomade', '포마드'),
           ('dandy', '댄디컷'), ('swallow', '스왈로펌'), ('leaf', '리프컷'), ('crop', '크롭컷'), ('slick', '뒷머리 넘김'),
           ('upm', '올림머리'), ('parted', '가르마펌'), ('spike', '스파이크컷'), ('ez', '애즈펌'), ('shaggy', '샤기컷')]


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    FACE_BOXES[:] = face_boxes()
    m0 = json.loads((OUT / 'parts.json').read_text(encoding='utf-8'))
    b0 = [h for h in m0['head'] if h['id'] == 'base_m'][0]
    BASE[:] = [Image.open(ROOT / 'public' / b0['src']).convert('RGBA'), b0['face']]
    BASE_MASK[:] = base_skin_mask()
    meta = json.loads((OUT / 'parts.json').read_text(encoding='utf-8'))
    heads = [h for h in meta.get('head', []) if h['id'] == 'base_m']
    for base in heads:
        base['label'] = '기본'
        base['walk'] = 'short'
    (OUT / 'head').mkdir(parents=True, exist_ok=True)
    # 시트마다: (폴더, 이름 목록, 고를 사람(0=왼쪽 신랑, 1=오른쪽 신부), 성별)
    sheets = [('hair_m', NAMES_M, 0, 'm'), ('hair', NAMES, 1, 'f')]
    for folder, names, pick, sex in sheets:
        files = sorted((ROOT / 'work' / folder).glob('*.png'))
        if len(files) != 30:
            print(f'{folder}: 건너뜀 ({len(files)}명)')
            continue
        for i, (key, label) in enumerate(names):
            img = Image.open(files[i * 2 + pick]).convert('RGBA')
            head, face = head_of_m(img) if sex == 'm' else head_of(img)
            head.save(OUT / 'head' / f'{key}.png')
            walk = 'short' if sex == 'm' or key in ('bob', 'bobwave', 'bun', 'updo') else 'long'
            heads.append({'id': key, 'label': label, 'sex': sex, 'src': f'parts/head/{key}.png', 'face': face, 'walk': walk})
            print(f'{key:9s} {head.size} face={face}')
    meta['head'] = heads
    (OUT / 'parts.json').write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
    print('ok')


if __name__ == '__main__':
    main()
