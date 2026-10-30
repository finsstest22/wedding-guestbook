"""몸통마다 피부 위치(목·손·다리) 지도를 만든다 → public/parts/body/<id>.skin.png (흰색=피부)

베이지 옷과 피부가 같은 색이라 색만으로는 구분이 안 된다.
그래서 '피부색 덩어리' 중에서 작고(손·목·다리 크기), 손·목·다리가 있을 자리에 있는 것만 피부로 본다.

사용법:  python tools/skin_masks.py            (검토용 그림: work/skin_check.png)
"""
import json
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PARTS = ROOT / 'public' / 'parts'
SKIN = [(252, 215, 183), (250, 220, 192), (250, 212, 176), (244, 200, 170), (236, 186, 156), (226, 168, 140)]


def skinlike(p):
    return p[3] > 150 and min(((p[0] - s[0]) ** 2 + (p[1] - s[1]) ** 2 + (p[2] - s[2]) ** 2) ** 0.5 for s in SKIN) < 24


def comps(img, test):
    w, h = img.size
    px = img.load()
    seen = bytearray(w * h)
    out = []
    for sy in range(h):
        for sx in range(w):
            if seen[sy * w + sx] or not test(px[sx, sy]):
                continue
            stack, pts = [(sx, sy)], []
            seen[sy * w + sx] = 1
            while stack:
                x, y = stack.pop()
                pts.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and test(px[nx, ny]):
                        seen[ny * w + nx] = 1
                        stack.append((nx, ny))
            out.append(pts)
    return out


# 다리가 보이는 (치마 입은) 몸통
LEGS = {'pleats_f', 'cardigan_f', 'vest_f'}


def mask_for(img, bid):
    w, h = img.size
    area = sum(1 for y in range(h) for x in range(w) if img.getpixel((x, y))[3] > 150)
    mask = Image.new('L', img.size, 0)
    m = mask.load()
    for pts in comps(img, skinlike):
        n = len(pts)
        xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
        cx, cy = sum(xs) / n / w, sum(ys) / n / h
        bw = (max(xs) - min(xs) + 1) / w
        if n < 4 or n > area * 0.06 or bw > 0.32:
            continue
        bh = (max(ys) - min(ys) + 1) / h
        neck = min(ys) < h * 0.08 and 0.3 < cx < 0.7
        # 손: 소매 끝의 작고 뭉툭한 덩어리
        hand = 0.28 < cy < 0.75 and (cx < 0.3 or cx > 0.7) and n >= 15 and bh < 0.13 and bw < 0.16
        leg = bid in LEGS and cy > 0.6 and max(ys) < h * 0.93 and n >= 20 and 0.2 < cx < 0.8
        if neck or hand or leg:
            for x, y in pts:
                m[x, y] = 255
    # 목: 맨 윗부분 가운데의 피부색은 옷깃과 붙어 있어도 피부
    px = img.load()
    for y in range(int(h * 0.07)):
        for x in range(int(w * 0.3), int(w * 0.7)):
            if skinlike(px[x, y]):
                m[x, y] = 255
    return mask


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    meta = json.loads((PARTS / 'parts.json').read_text(encoding='utf-8'))
    check = Image.new('RGB', (130 * 10, 160 * 3), (40, 40, 48))
    for i, b in enumerate(meta['body']):
        img = Image.open(ROOT / 'public' / b['src']).convert('RGBA')
        mask = mask_for(img, b['id'])
        mask.save(PARTS / 'body' / f"{b['id']}.skin.png")
        b['skin'] = f"parts/body/{b['id']}.skin.png"
        # 검토용: 피부로 본 곳을 빨갛게
        view = img.copy()
        red = Image.new('RGBA', img.size, (255, 0, 0, 255))
        view.paste(red, (0, 0), mask)
        check.paste(view, ((i % 10) * 130 + (130 - img.width) // 2, (i // 10) * 160 + 160 - img.height), view)
    (ROOT / 'work').mkdir(exist_ok=True)
    check.save(ROOT / 'work' / 'skin_check.png')
    (PARTS / 'parts.json').write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
    print('ok')


if __name__ == '__main__':
    main()
