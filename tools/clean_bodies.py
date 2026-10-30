"""몸통 가장자리 정리: 1~2px짜리 가는 선(머리카락 외곽선·옆 사람 조각)과 떨어진 티끌을 지운다.

사용법: python tools/clean_bodies.py
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
PARTS = ROOT / 'public' / 'parts'


def mirror_fill(img, cx, upto=0.62, tol=3):
    """머리카락에 가려 비어 있던 어깨·소매를 반대쪽을 거울처럼 비춰 채운다 (위쪽 62%만)."""
    w, h = img.size
    px = img.load()
    filled = 0
    for y in range(int(h * upto)):
        xs = [x for x in range(w) if px[x, y][3] > 40]
        if not xs:
            continue
        L, R = cx - xs[0], xs[-1] - cx
        if abs(L - R) <= tol:
            continue
        if L < R:   # 왼쪽이 짧음 → 오른쪽을 비춰 왼쪽 채우기
            rng = range(int(cx - R), int(cx - L) + 1)
        else:
            rng = range(int(cx + R), int(cx + L) + 1)
        for x in rng:
            mx = int(round(2 * cx - x))
            if 0 <= x < w and 0 <= mx < w and px[x, y][3] <= 40 and px[mx, y][3] > 40:
                px[x, y] = px[mx, y]
                filled += 1
    # 안쪽 구멍(겨드랑이 쪽)도 같은 방식으로
    for y in range(int(h * upto)):
        for x in range(w):
            mx = int(round(2 * cx - x))
            if 0 <= mx < w and px[x, y][3] <= 40 and px[mx, y][3] > 40:
                # 양옆이 모두 불투명한 '구멍'일 때만
                l = any(px[xx, y][3] > 40 for xx in range(max(0, x - 6), x))
                r = any(px[xx, y][3] > 40 for xx in range(x + 1, min(w, x + 7)))
                if l and r:
                    px[x, y] = px[mx, y]
                    filled += 1
    return filled


def clean(img):
    alpha = img.getchannel('A').point(lambda v: 255 if v > 40 else 0)
    # 열기(침식→팽창): 3px보다 가는 돌출부는 사라지고, 두꺼운 몸통 외곽선은 그대로 돌아온다
    opened = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    px = img.load()
    op = opened.load()
    w, h = img.size
    removed = 0
    for y in range(h):
        for x in range(w):
            if px[x, y][3] > 40 and op[x, y] == 0:
                px[x, y] = (0, 0, 0, 0)
                removed += 1
    # 위쪽 25%: 어깨 위에 남은 머리카락 외곽선(3~4px 두께, 어두운 색)은 더 큰 틀로 한 번 더
    alpha = img.getchannel('A').point(lambda v: 255 if v > 40 else 0)
    opened5 = alpha.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MaxFilter(5)).load()
    for y in range(int(h * 0.25)):
        for x in range(w):
            p = px[x, y]
            if p[3] > 40 and opened5[x, y] == 0 and 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2] < 110:
                px[x, y] = (0, 0, 0, 0)
                removed += 1
    # 떨어진 작은 조각 제거
    sys.path.insert(0, str(Path(__file__).parent))
    from chroma import drop_specks
    drop_specks(img, keep_ratio=0.03)
    return removed


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    meta = json.loads((PARTS / 'parts.json').read_text(encoding='utf-8'))
    for b in meta['body']:
        path = ROOT / 'public' / b['src']
        img = Image.open(path).convert('RGBA')
        f = mirror_fill(img, b['neck'][0]) if b['sex'] == 'f' else 0
        n = clean(img)
        img.save(path)
        print(f"{b['id']:12s} 거울 채움 {f:4d}px, 가는 조각 {n}px 제거")


if __name__ == '__main__':
    main()
