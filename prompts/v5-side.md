# 옆모습 얼굴 (눈·눈썹·입) — 4장

옆모습은 화면에서 작게 보여서 눈 11종을 모양이 비슷한 것끼리 4묶음으로 나눠요.
하객이 고른 앞모습 눈에 맞는 옆모습이 자동으로 들어가요.

| 저장 이름 | 이 옆모습이 쓰이는 앞모습 눈 |
|---|---|
| `side__open.png` | 동그란 눈, 처진 눈, 캣아이, 반짝 눈, 쌍꺼풀, 긴 속눈썹, 눈물점 |
| `side__half.png` | 가는 눈, 졸린 눈 |
| `side__closed.png` | 웃는 눈 (초승달) |
| `side__dot.png` | 작은 점 눈 |

**첨부 2장 (이 순서대로)**
1. `parts-raw/v5/base.webp`
2. `parts-raw/sheet_walk.webp`

**공통 프롬프트** (`{EYE}`만 아래 표에서 바꿔요)

```text
Edit the FIRST image only. The SECOND image is a reference sheet.
Only on the 4 side-view characters in the MIDDLE row of the FIRST image (they face left), draw a profile face in the same style as the girl walking to the left in the SECOND image (second row, "왼쪽 걷기" section): {EYE} near the front of the face, a short soft brown eyebrow above it, a tiny mouth at the front edge of the face, and very faint pink blush on the cheek.
Every middle-row character gets exactly the same face, at the same position on the head.
Do NOT draw hair, glasses or accessories. Do NOT change the top and bottom rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size. Crisp pixels, no anti-aliasing.
```

| 저장 이름 | {EYE} |
|---|---|
| side__open | one large dark brown eye with a white highlight |
| side__half | one narrow half-closed dark brown eye (a thin sleepy eye) |
| side__closed | one happy closed eye drawn as a dark brown upward curve (^) |
| side__dot | one small round black dot eye |

확인할 점: 가운데 줄 4명만 바뀌었는지, 눈이 얼굴 앞쪽(왼쪽)에 있는지, 4명 얼굴 위치가 같은지.
같은 대화에서 이어서 만들 때는 매번 "Start again from the original FIRST image" 를 덧붙여요.
