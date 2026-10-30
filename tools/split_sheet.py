"""초록 배경 시트에서 캐릭터를 하나씩 찾아 투명 PNG로 저장한다 (글자 라벨은 버림).

사용법:
  python tools/split_sheet.py parts-raw/sheet_outfit.webp work/outfit
  python tools/split_sheet.py parts-raw/sheet_eyes.webp work/eyes --no-split   # 머리만 있는 시트
  → work/outfit/00.png, 01.png ... (위→아래, 왼→오른쪽 순서)
"""
import sys
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from chroma import key_out, split_widest, crop_tight, drop_specks  # noqa: E402


def components(img, thr=40):
    """불투명 픽셀 덩어리들의 (bbox, 픽셀 수)."""
    w, h = img.size
    a = img.getchannel('A').load()
    seen = bytearray(w * h)
    out = []
    for sy in range(0, h):
        for sx in range(0, w):
            if a[sx, sy] <= thr or seen[sy * w + sx]:
                continue
            stack = [(sx, sy)]
            seen[sy * w + sx] = 1
            n, x0, y0, x1, y1 = 0, sx, sy, sx, sy
            while stack:
                x, y = stack.pop()
                n += 1
                x0, y0, x1, y1 = min(x0, x), min(y0, y), max(x1, x), max(y1, y)
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and a[nx, ny] > thr:
                        seen[ny * w + nx] = 1
                        stack.append((nx, ny))
            out.append(((x0, y0, x1, y1), n))
    return out


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    src, dst = sys.argv[1], Path(sys.argv[2])
    no_split = '--no-split' in sys.argv  # 얼굴 시트처럼 한 칸이 원래 넓은 경우
    dst.mkdir(parents=True, exist_ok=True)
    img = key_out(Image.open(src))
    comps = components(img)
    big = max(n for _, n in comps)
    # 캐릭터만 (라벨 글자, 반짝이 같은 작은 조각은 제외)
    chars = [b for b, n in comps if n > big * 0.25]
    boxes = []
    for b in chars:
        if not no_split and b[2] - b[0] > (b[3] - b[1]) * 0.8:  # 한 사람치고 너무 넓으면 두 사람이 붙은 것
            sub = img.crop((b[0], b[1], b[2] + 1, b[3] + 1))
            for x0, x1 in split_widest(sub, [(0, sub.width - 1)]):
                boxes.append((b[0] + x0, b[1], b[0] + x1, b[3]))
        else:
            boxes.append(b)
    # 줄 단위 정렬
    boxes.sort(key=lambda b: b[1])
    rows, cur = [], []
    for b in boxes:
        if cur and b[1] - cur[0][1] > (cur[0][3] - cur[0][1]) * 0.5:
            rows.append(cur); cur = []
        cur.append(b)
    if cur:
        rows.append(cur)
    i = 0
    for row in rows:
        for b in sorted(row, key=lambda b: b[0]):
            part = crop_tight(drop_specks(img.crop((b[0], b[1], b[2] + 1, b[3] + 1)), 0.05), pad=2)
            part.save(dst / f'{i:02d}.png')
            print(f'{i:02d}', part.size)
            i += 1


if __name__ == '__main__':
    main()
