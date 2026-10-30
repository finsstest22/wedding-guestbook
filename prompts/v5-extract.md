# 원본 시트에서 옷·머리·얼굴 뽑아 기준에 입히기 (v5)

**첨부는 항상 2장, 순서가 중요해요**
1. 첫 번째: 기준 시트 `parts-raw/v5/base.webp` (고칠 그림)
2. 두 번째: 아래 표의 원본 시트 (참고 그림)

결과는 표의 저장 이름으로 `parts-raw/v5/`에 저장해요 (1536×1024 그대로).
장마다 새 대화가 가장 안전해요. 같은 대화에서 이어서 하려면 첨부 2장을 매번 다시 올려요.

---

## 1. 옷 — 틀

```text
Edit the FIRST image only. The SECOND image is a reference sheet.
Dress every one of the 12 characters in the FIRST image in exactly the outfit worn by the {WHO} labeled "{LABEL}" in the SECOND image: same design, colors, details and shoes, drawn in the same pixel-art style.
Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Do NOT copy the hair, face, glasses or bag. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size. Crisp pixels, no anti-aliasing.
```

`{WHO}`: 남자 옷이면 `man on the left`, 여자 옷이면 `woman on the right`

### 참고: `parts-raw/sheet_outfit.webp`

| {LABEL} | 남자 저장 이름 | 여자 저장 이름 |
|---|---|---|
| 정장 | outfit__suit_m | outfit__suit_f |
| 셔츠 | outfit__shirt_m | outfit__shirt_f |
| 니트 | outfit__knit_m | outfit__knit_f |
| 블라우스 | outfit__blouse_m | outfit__blouse_f |
| 슬랙스 | outfit__slacks_m | outfit__slacks_f |
| 청바지 | outfit__jeans_m | outfit__jeans_f |
| 플리츠스커트 | outfit__pleats_m | outfit__pleats_f |
| 자켓 | outfit__jacket_m | outfit__jacket_f |
| 가디건 | outfit__cardigan_m | outfit__cardigan_f |
| 후드티 | outfit__hoodie_m | outfit__hoodie_f |
| 티셔츠 | outfit__tshirt_m | outfit__tshirt_f |
| 니트조끼 | outfit__vest_m | outfit__vest_f |
| 코트 | outfit__coat_m | outfit__coat_f |
| 오버롤 | outfit__overall_m | outfit__overall_f |
| 원피스 | outfit__onepiece_m | outfit__onepiece_f |

### 참고: `parts-raw/sheet_dress.webp`

| {LABEL} | 남자 저장 이름 | 여자 저장 이름 |
|---|---|---|
| 원피스 (플라워) | outfit__flower_m | outfit__flower_f |
| 원피스 (블랙) | outfit__black_m | outfit__black_f |
| 원피스 (블루) | outfit__blue_m | outfit__blue_f |
| 한복 (일반) | outfit__hanbok_m | outfit__hanbok_f |
| 한복 (혼주용 남녀) | outfit__hanbok2_m | outfit__hanbok2_f |
| 한복 (트렌디) | outfit__hanbok3_m | outfit__hanbok3_f |

---

## 2. 머리 — 틀

```text
Edit the FIRST image only. The SECOND image is a reference sheet.
Give every one of the 12 characters in the FIRST image exactly the hairstyle of the {WHO} labeled "{LABEL}" in the SECOND image: same shape, length, bangs and color, drawn in the same pixel-art style.
Show the hairstyle correctly from each direction (front, side, back).
Do NOT copy the face, glasses, veil, flowers or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size. Crisp pixels, no anti-aliasing.
```

### 남자 머리 — 참고: `parts-raw/sheet_hair_m.webp`, `{WHO}` = `groom on the left`

| {LABEL} | 저장 이름 | {LABEL} | 저장 이름 |
|---|---|---|---|
| 1. 투블럭 | hair__twoblock | 9. 크롭컷 | hair__crop |
| 2. 쉼표머리 | hair__comma | 10. 뒷머리 넘김 | hair__slick |
| 3. 펌 | hair__perm | 11. 올림머리 | hair__up_m |
| 4. 다운펌 | hair__downperm | 12. 가르마펌 | hair__parted |
| 5. 포마드 | hair__pomade | 13. 스파이크컷 | hair__spike |
| 6. 댄디컷 | hair__dandy | 14. 애즈펌 | hair__asperm |
| 7. 스왈로펌 | hair__swallow | 15. 샤기컷 | hair__shaggy |
| 8. 리프컷 | hair__leaf | | |

### 여자 머리 — 참고: `parts-raw/sheet_hair_f.webp`, `{WHO}` = `bride on the right`

| {LABEL} | 저장 이름 | {LABEL} | 저장 이름 |
|---|---|---|---|
| 투블럭 | hair__twoblock_f | 반묶음 | hair__halfup |
| 쉼표머리 | hair__comma_f | 올림머리 | hair__updo |
| 펌 | hair__perm_f | 사이드 포니테일 | hair__sidetail |
| 단발 | hair__bob | 역시뇽 스타일 | hair__chignon |
| 포니테일 | hair__ponytail | 단발 웨이브 | hair__bobwave |
| 똥머리 | hair__bun | 헬터 헤어 | hair__halter |
| 양갈래 | hair__twin | 긴 생머리 | hair__long |
| 웨이브 | hair__wave | | |

---

## 3. 얼굴 (눈·눈썹·입·볼) — 틀

얼굴은 앞모습 4칸만 바뀌어요. 눈·눈썹·입·볼을 따로 만들어서 하객이 조합해 골라요.

```text
Edit the FIRST image only. The SECOND image is a reference sheet.
Only on the 4 front-facing characters (top row) of the FIRST image, draw exactly the {PART} labeled "{LABEL}" in the SECOND image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same {PART}. Draw nothing else on the face.
Do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size. Crisp pixels, no anti-aliasing.
```

### 눈 — 참고: `parts-raw/sheet_eyes.webp`, `{PART}` = `eyes`

| {LABEL} | 저장 이름 | {LABEL} | 저장 이름 |
|---|---|---|---|
| 동그란 눈 | eyes__round | 긴 속눈썹 눈 | eyes__lash |
| 처진 눈 (순한 인상) | eyes__droopy | 작은 점 눈 | eyes__dot |
| 올라간 눈 (캣아이) | eyes__cat | 졸린 눈 | eyes__sleepy |
| 가는 눈 (얇고 좁은 눈) | eyes__thin | 웃는 눈 (초승달) | eyes__smile |
| 반짝이는 눈 | eyes__sparkle | 점 있는 눈 | eyes__mole |
| 쌍꺼풀 눈 | eyes__double | | |

### 눈썹 — 참고: `parts-raw/sheet_brows.webp`, `{PART}` = `eyebrows`

| {LABEL} | 저장 이름 | {LABEL} | 저장 이름 |
|---|---|---|---|
| 일자 눈썹 | brows__straight | 얇은 눈썹 | brows__thin |
| 아치형 눈썹 | brows__arch | 처진 눈썹 | brows__droopy |
| 진한 눈썹 | brows__thick | 각진 눈썹 | brows__angled |

### 입 — 참고: `parts-raw/sheet_mouth.webp`, `{PART}` = `mouth`

| {LABEL} | 저장 이름 | {LABEL} | 저장 이름 |
|---|---|---|---|
| 부드러운 미소 | mouth__smile | 살짝 벌린 입 | mouth__open |
| 활짝 웃음 | mouth__grin | 이빨 보이기 | mouth__teeth |
| 무표정 입 | mouth__flat | 살짝 삐진 입 | mouth__pout |
| 고양이 입 :3 | mouth__cat | | |

### 볼 — 참고: `parts-raw/sheet_cheek.webp`, `{PART}` = `cheek marks`

| {LABEL} | 저장 이름 |
|---|---|
| 연한 볼터치 | cheek__blush |
| 강한 볼터치 | cheek__blush2 |
| 주근깨 | cheek__freckle |
| 점 (입 근처) | cheek__mole |

---

## 소품·표정·신발 시트는?

- **소품(부케·풍선 등):** 걸을 때 팔 모양까지 바뀌어서 옷과 겹쳐요. 옷·머리·얼굴이 끝난 뒤 따로 방법을 정해요.
- **표정 시트(윙크·눈물 등):** 안경이 함께 그려져 있어서 이번에는 쓰지 않아요. 눈·입 조합으로 대신해요.
- **신발:** 옷 시트에 신발이 같이 들어 있어서 따로 만들지 않아요.
