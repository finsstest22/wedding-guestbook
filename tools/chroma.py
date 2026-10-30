"""초록 배경(#00FF00) 이미지를 투명 PNG로 바꾸고, 캐릭터만 꼭 맞게 잘라낸다.

사용법:
  python tools/chroma.py 입력.webp 출력.png            # 캐릭터 1명
  python tools/chroma.py 입력.webp 출력.png --split 2  # 나란히 선 여러 명을 각각 저장 (출력-1.png, 출력-2.png)
"""
import argparse
import sys
from pathlib import Path

from PIL import Image


def key_out(img):
    """초록 배경을 투명하게, 가장자리의 초록 번짐을 제거한다."""
    img = img.convert('RGBA')
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            dom = g - max(r, b)
            if g > 120 and dom > 60:
                px[x, y] = (0, 0, 0, 0)
            elif dom > 25:
                # 경계에 남은 초록빛 제거 (despill) + 살짝 투명하게
                g2 = max(r, b)
                alpha = max(0, min(255, int(255 * (1 - (dom - 25) / 60))))
                px[x, y] = (r, g2, b, alpha)
    return img


def column_runs(img, min_gap):
    """불투명 픽셀이 있는 열 구간들을 찾는다 (사람 사이의 빈 틈으로 나눔)."""
    alpha = img.getchannel('A')
    w, h = img.size
    a = alpha.load()
    filled = [any(a[x, y] > 40 for y in range(0, h, 2)) for x in range(w)]
    runs, start, gap = [], None, 0
    for x, f in enumerate(filled):
        if f:
            if start is None:
                start = x
            gap = 0
        elif start is not None:
            gap += 1
            if gap >= min_gap:
                runs.append((start, x - gap))
                start, gap = None, 0
    if start is not None:
        runs.append((start, w - 1))
    return runs


def split_widest(img, runs):
    """붙어 있는 두 사람: 가장 넓은 구간을 픽셀이 가장 적은 세로줄에서 나눈다."""
    a = img.getchannel('A').load()
    i = max(range(len(runs)), key=lambda k: runs[k][1] - runs[k][0])
    x0, x1 = runs[i]
    lo, hi = x0 + (x1 - x0) * 3 // 10, x0 + (x1 - x0) * 7 // 10
    cover = lambda x: sum(1 for y in range(0, img.height, 2) if a[x, y] > 40)
    cut = min(range(lo, hi + 1), key=cover)
    return runs[:i] + [(x0, cut), (cut + 1, x1)] + runs[i + 1:]


def drop_specks(img, keep_ratio=0.02):
    """본체와 떨어진 작은 조각(옆 사람 머리카락 끝 등)을 지운다."""
    w, h = img.size
    a = img.getchannel('A').load()
    px = img.load()
    seen = bytearray(w * h)
    blobs = []
    for sy in range(h):
        for sx in range(w):
            if a[sx, sy] <= 40 or seen[sy * w + sx]:
                continue
            stack, pts = [(sx, sy)], []
            seen[sy * w + sx] = 1
            while stack:
                x, y = stack.pop()
                pts.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and a[nx, ny] > 40:
                        seen[ny * w + nx] = 1
                        stack.append((nx, ny))
            blobs.append(pts)
    if not blobs:
        return img
    biggest = max(len(b) for b in blobs)
    for b in blobs:
        if len(b) < biggest * keep_ratio:
            for x, y in b:
                px[x, y] = (0, 0, 0, 0)
    return img


def crop_tight(img, pad=4):
    box = img.getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
    if not box:
        return img
    x0, y0, x1, y1 = box
    return img.crop((max(0, x0 - pad), max(0, y0 - pad), min(img.width, x1 + pad), min(img.height, y1 + pad)))


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    ap = argparse.ArgumentParser()
    ap.add_argument('src')
    ap.add_argument('dst')
    ap.add_argument('--split', type=int, default=1)
    args = ap.parse_args()

    img = key_out(Image.open(args.src))
    dst = Path(args.dst)
    dst.parent.mkdir(parents=True, exist_ok=True)

    if args.split <= 1:
        crop_tight(drop_specks(img)).save(dst)
        print('saved', dst)
        return

    runs = column_runs(img, min_gap=3)
    # 너무 작은 조각(티끌)은 버리고 큰 것부터 N개
    runs = sorted(sorted(runs, key=lambda r: r[1] - r[0], reverse=True)[:args.split])
    while len(runs) < args.split:
        runs = split_widest(img, runs)
    for i, (x0, x1) in enumerate(runs, 1):
        part = crop_tight(drop_specks(img.crop((x0, 0, x1 + 1, img.height))))
        out = dst.with_name(f'{dst.stem}-{i}{dst.suffix}')
        part.save(out)
        print('saved', out, part.size)


if __name__ == '__main__':
    main()
