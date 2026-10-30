"""부품 PNG를 256색 팔레트 PNG로 줄인다 (용량 약 1/5, 눈으로는 차이 없음).

v2_parts.py 로 부품을 다시 만든 뒤에 한 번 실행하세요.
사용법: python tools/shrink_parts.py v5
"""
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    folder = ROOT / 'public' / 'parts' / (sys.argv[1] if len(sys.argv) > 1 else 'v5')
    before = after = 0
    for f in sorted(folder.glob('*.png')):
        im = Image.open(f)
        before += f.stat().st_size
        if im.mode != 'P':                       # 이미 줄인 파일은 건너뜀
            im.convert('RGBA').quantize(256, method=Image.Quantize.FASTOCTREE).save(f, optimize=True)
        after += f.stat().st_size
    print(f'{folder.name}: {before / 1e6:.1f}MB -> {after / 1e6:.1f}MB')


if __name__ == '__main__':
    main()
