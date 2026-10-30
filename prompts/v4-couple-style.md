# 하객을 신랑·신부 그림체로 (v4)

지금 하객(v3)은 기준 시트 `base.webp`의 귀여운 짧은 체형을 바탕으로 해요. 처음 주신 시트들(`sheet_outfit`, `sheet_hair_m`, `sheet_dress` 등)은 신랑·신부와 같은 그림체예요.
그래서 **기준 시트만 신랑·신부 체형으로 새로 만들고**, 나머지는 지금과 같은 방법으로 다시 뽑아요. 자르고 붙이는 프로그램은 그대로 써요.

결과는 `parts-raw/v4/`에 저장해요. 지금 v3는 그대로 두고, v4가 확인되면 바꿔요.

---

## 1단계 — 시험 4장 (먼저 이것만)

### ① 기준 시트 `parts-raw/v4/base.webp`

새 대화에서 이미지 2장을 첨부해요. **첫 번째는 `parts-raw/v2/base.webp`**(칸 배치·자세), **두 번째는 `parts-raw/sheet_outfit.webp`**(그림체)예요.

```text
Redraw the FIRST image in the art style and body proportions of the characters in the SECOND image.
Keep exactly the same layout as the first image: 12 characters in 3 rows x 4 columns at the same
positions — top row front view, middle row facing left (side view), bottom row back view — with
the same walking poses in each cell.
Change only the style and proportions to match the second image: a smaller head (about one third
of the total height), a longer and slimmer body, longer arms and legs, the same outline thickness,
shading and pixel size as the second image.
Every character is bald with a smooth head, no hair, no face drawn (blank skin on the front of
the head), wearing a plain light gray full-body bodysuit and plain gray shoes.
All 12 characters are exactly the same height. Solid #00FF00 background, no text, no labels.
Same canvas size as the first image (1536x1024). Crisp pixels, no anti-aliasing.
```

확인할 점: 12명 키가 같은지, 머리 크기가 신랑 그림과 비슷한지, 걷는 자세가 칸마다 다른지.

### ② ③ ④ 옷·머리·얼굴 1장씩

이제부터 첨부는 **새 기준 시트 `parts-raw/v4/base.webp` 1장**이에요. 프롬프트는 [v2-sheets.md](v2-sheets.md)의 틀을 그대로 써요.

| 저장 이름 | 틀 | 넣을 내용 |
|---|---|---|
| `parts-raw/v4/outfit__suit.webp` | 옷 | a black suit with a white shirt and a black tie, black shoes |
| `parts-raw/v4/hair__long.webp` | 머리 | long straight hair past the shoulders |
| `parts-raw/v4/face__soft.webp` | 얼굴 | large dark brown eyes with a soft white highlight and a thin dark upper eyelid line, short soft brown eyebrows, a tiny calm smile, very faint light pink blush (same face style as a chibi pixel-art bride) |

4장을 저장했다고 알려 주시면 부품으로 만들어서, 신랑·신부 옆에 세워 그림체가 맞는지 확인해 드릴게요.

## 2단계 — 나머지 (시험이 괜찮을 때만)

v3와 같은 이름·같은 프롬프트로 나머지 옷 11장, 머리 15장, 얼굴 2장 정도를 `parts-raw/v4/`에 다시 뽑아요.
