"""반려동물 부품: 앉은 모습(원피스 시트 ↔ 반려동물 시트 차이) + 4방향 8프레임 걷기(걷기 시트).

결과: public/parts/pet/<이름>_sit.png, <이름>_<방향>_<0~7>.png, parts.json 의 "pets"
크기는 몸통 부품과 같은 단위(사람 키 약 244px)로 맞춘다.

사용법: python tools/pets.py
"""
import json
import sys
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from chroma import key_out, crop_tight, drop_specks  # noqa: E402
from split_sheet import components  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / 'parts-raw'
OUT = ROOT / 'public' / 'parts'

# 원피스 시트 남자 키(416px) → 몸통 단위 남자 키(247px)
SHEET_SCALE = 247 / 416

PETS = {
    # 이름: (라벨, 반려동물 시트에서 고를 앉은 모습의 위치(x0, y0, x1, y1), 걷기 시트의 세로 구간)
    'maltese': ('말티즈', (0, 800, 140, 975), (650, 755)),
    'cat': ('고양이', (890, 280, 1020, 450), (875, 975)),
}
DIRS = [(0, 388, 'right'), (388, 770, 'down'), (770, 1152, 'left'), (1152, 1536, 'up')]


def sitting(region):
    a = Image.open(RAW / 'sheet_dress.webp').convert('RGB').crop(region)
    b = Image.open(RAW / 'sheet_dress_pets.webp').convert('RGB').crop(region)
    kb = key_out(b.copy())
    pa, pb, pk = a.load(), b.load(), kb.load()
    out = Image.new('RGBA', a.size, (0, 0, 0, 0))
    po = out.load()
    for y in range(a.height):
        for x in range(a.width):
            p, q = pa[x, y], pb[x, y]
            if abs(p[0] - q[0]) + abs(p[1] - q[1]) + abs(p[2] - q[2]) > 60 and pk[x, y][3] > 40:
                po[x, y] = pk[x, y]
    out = crop_tight(drop_specks(out, 0.15), pad=1)
    return out.resize((round(out.width * SHEET_SCALE), round(out.height * SHEET_SCALE)), Image.LANCZOS)


def walking(band, target_h):
    sheet = key_out(Image.open(RAW / 'sheet_walk.webp'))
    y0, y1 = band
    strip = sheet.crop((0, y0, sheet.width, y1))
    frames = {}
    for gx0, gx1, d in DIRS:
        g = strip.crop((gx0, 0, gx1, strip.height))
        cs = [c for c in components(g) if c[1] > 150]
        x0 = min(c[0][0] for c in cs); x1 = max(c[0][2] for c in cs)
        step = (x1 - x0 + 1) / 8
        # 프레임끼리 겹쳐 있으니, 경계 근처에서 그림이 가장 적은 세로줄에서 자른다
        a = g.getchannel('A').load()
        cover = lambda x: sum(1 for y in range(g.height) if a[x, y] > 40)
        cuts = [x0]
        for i in range(1, 8):
            c = round(x0 + i * step)
            r = round(step * 0.3)
            cuts.append(min(range(c - r, c + r + 1), key=lambda x: (cover(x), abs(x - c))))
        cuts.append(x1 + 1)
        out = []
        for i in range(8):
            f = g.crop((cuts[i], 0, cuts[i + 1], g.height))
            f = crop_tight(drop_specks(f, 0.35), pad=1)
            out.append(f)
        frames[d] = out
    # 옆모습은 프레임끼리 겹쳐 그려져 있어 잘린 흔적이 남는다 →
    # 가장자리가 덜 잘린 두 장만 골라 번갈아 쓰고, 반대 방향은 좌우 반전
    def clipped(f):
        a = f.getchannel('A').load()
        edge = lambda x: sum(1 for y in range(f.height) if a[x, y] > 40)
        return max(edge(1), edge(f.width - 2))
    best = sorted(frames['right'], key=clipped)[:2]
    frames['right'] = best
    frames['left'] = [f.transpose(Image.FLIP_LEFT_RIGHT) for f in best]
    # 걷는 모습 키를 앉은 모습에 맞춘다
    h = max(f.height for fs in frames.values() for f in fs)
    k = target_h / h
    return {d: [f.resize((max(1, round(f.width * k)), max(1, round(f.height * k))), Image.LANCZOS) for f in fs]
            for d, fs in frames.items()}


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    (OUT / 'pet').mkdir(parents=True, exist_ok=True)
    meta = json.loads((OUT / 'parts.json').read_text(encoding='utf-8'))
    pets = []
    for pid, (label, region, band) in PETS.items():
        sit = sitting(region)
        sit.save(OUT / 'pet' / f'{pid}_sit.png')
        walk = walking(band, sit.height * 0.85)
        entry = {'id': pid, 'label': label, 'sit': f'parts/pet/{pid}_sit.png', 'walk': {}}
        for d, fs in walk.items():
            entry['walk'][d] = []
            for i, f in enumerate(fs):
                name = f'{pid}_{d}_{i}.png'
                f.save(OUT / 'pet' / name)
                entry['walk'][d].append(f'parts/pet/{name}')
        pets.append(entry)
        print(pid, 'sit', sit.size, 'walk', walk['right'][0].size)
    meta['pets'] = pets
    (OUT / 'parts.json').write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
    print('ok')


if __name__ == '__main__':
    main()
