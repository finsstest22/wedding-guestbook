"""원본 걷기 시트(sheet_walk.webp)의 남자 걸음을 잘라 3줄×4칸 기준 입력 그림으로 배치한다.

옆 걸음 그림끼리 머리가 겹쳐 있어서, 옆모습은 얼굴이 온전한 첫 그림의 머리를 4걸음에 같이 쓴다.
결과: parts-raw/v5/walk_input.png
"""
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
XS = [41, 88, 132, 176, 222, 268, 313, 358, 420, 468, 512, 558, 604, 650, 695, 740,
      800, 845, 889, 934, 980, 1026, 1073, 1120, 1180, 1226, 1271, 1316, 1360, 1406, 1451, 1496]
SEL = {'down': [8, 10, 12, 14], 'left': [16, 18, 20, 22], 'up': [24, 26, 28, 30]}
Y0, Y1 = 96, 234


def largest(m):
    lab, n = ndimage.label(m)
    if n == 0:
        return m
    s = ndimage.sum(m, lab, range(1, n + 1))
    return lab == (np.argmax(s) + 1)


def main():
    a = np.array(Image.open(ROOT / 'parts-raw' / 'sheet_walk.webp').convert('RGB')).astype(int)
    green = (a[:, :, 1] > 180) & (a[:, :, 0] < 120) & (a[:, :, 2] < 120)

    def cut(cx, x0, x1, y0, y1, edge=4):
        m = ~green[y0:y1, x0:x1]
        if edge:
            m[:, :edge] = False
            m[:, -edge:] = False
        rgba = np.zeros(m.shape + (4,), np.uint8)
        rgba[..., :3] = a[y0:y1, x0:x1]
        rgba[..., 3] = largest(m) * 255
        return rgba

    # 옆모습: 걸음 그림끼리 머리가 겹쳐서 얼굴이 가려짐 → 왼쪽이 비어 있는 첫 그림의 머리를 4걸음 모두에 씀
    NECK = 161
    hx = XS[16]
    head = cut(hx, 773, hx + 20, Y0, NECK, edge=0)

    def body_center(b):
        xs = np.where(b[4:26, :, 3].any(0))[0]
        return (xs.min() + xs.max()) / 2

    frames = {}
    for d, idx in SEL.items():
        frames[d] = []
        for i in idx:
            cx = XS[i]
            if d != 'left':
                frames[d].append(cut(cx, cx - 26, cx + 26, Y0, Y1))
                continue
            x0 = cx - 30
            body = cut(cx, x0, cx + 26, NECK, Y1)
            b16 = cut(hx, hx - 30, hx + 26, NECK, Y1)
            dx = round(body_center(body) - body_center(b16))
            full = np.zeros((Y1 - Y0, 56, 4), np.uint8)
            full[NECK - Y0:] = body
            hx0 = (773 - (hx - 30)) + dx
            hw = head.shape[1]
            dst0, src0 = max(0, hx0), max(0, -hx0)
            w = min(56 - dst0, hw - src0)
            region = full[:NECK - Y0, dst0:dst0 + w]
            src = head[:, src0:src0 + w]
            region[src[..., 3] > 0] = src[src[..., 3] > 0]
            frames[d].append(full)

    out = Image.new('RGBA', (1536, 1024), (0, 255, 0, 255))
    cxs, bots = [236, 587, 938, 1290], [328, 641, 965]
    for r, d in enumerate(['down', 'left', 'up']):
        for c, arr in enumerate(frames[d]):
            f = Image.fromarray(arr)
            f = f.crop(f.getbbox())
            f = f.resize((f.width * 2, f.height * 2), Image.NEAREST)
            out.alpha_composite(f, (cxs[c] - f.width // 2, bots[r] - f.height))
    (ROOT / 'parts-raw' / 'v5').mkdir(parents=True, exist_ok=True)
    out.convert('RGB').save(ROOT / 'parts-raw' / 'v5' / 'walk_input.png')
    print('ok')


if __name__ == '__main__':
    main()
