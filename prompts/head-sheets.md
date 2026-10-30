# 머리 시트 프롬프트 (머리 + 몸 두 조각 방식)

몸통은 상의/하의 시트에서 이미 잘라 두었어요 (`public/parts/body/`, 남녀 각 15벌).
이제 **머리만 바뀌는 시트**가 필요해요. 시트 안의 몸은 버리고 머리만 오려 쓸 거예요.

## 꼭 지킬 것

- **참고 그림 첨부**: `prompts/reference_m.png`(남자), `prompts/reference_f.png`(여자). 크기와 화풍을 몸통과 맞추기 위해서예요.
- **안경·면사포·꽃·모자 없이.** 이런 건 따로 시트를 만들어서 겹쳐 쓸 거예요.
- **머리색은 전부 짙은 갈색.** 하객이 고르는 머리색은 코드에서 바꿔요.
- **캐릭터끼리 띄워서.** 지난 시트처럼 붙어 있으면 자를 때 옆 사람 머리카락이 딸려 와요.
- 아래 글자 라벨은 있어도 괜찮아요 (자동으로 버려요). 라벨 순서대로 이름을 붙일게요.

---

## 1. 남자 헤어 시트

참고 그림: `reference_m.png`

```text
Pixel art character sheet: 15 characters in a 5 x 3 grid on a solid #00FF00 background.
Every character is exactly the same chibi boy as the attached reference: same face, same eyes,
same skin, same head size, same body size, same pose (standing, facing forward, arms down).
Remove the glasses. All wear the same plain white t-shirt and gray pants.
The ONLY difference between the 15 characters is the hairstyle. All hair is dark brown.
No glasses, no hats, no accessories.
Leave clear empty green space between characters; nothing touches or overlaps.
Small white label under each character, in this order:
투블럭, 쉼표머리, 가르마펌, 댄디컷, 리젠트, 애즈펌, 울프컷, 크롭컷,
반삭, 올백, 히피펌, 곱슬머리, 장발, 꽁지머리, 포마드
Crisp pixels, no anti-aliasing, same pixel art style as the reference.
```

## 2. 여자 헤어 시트

참고 그림: `reference_f.png`

```text
Pixel art character sheet: 15 characters in a 5 x 3 grid on a solid #00FF00 background.
Every character is exactly the same chibi girl as the attached reference: same face, same eyes,
same skin, same head size, same body size, same pose (standing, facing forward, arms down).
All wear the same plain white t-shirt and gray pants.
The ONLY difference between the 15 characters is the hairstyle. All hair is dark brown.
No veil, no flowers, no ribbons, no hair accessories, no glasses.
Long hair may fall over the shoulders, that is fine.
Leave clear empty green space between characters; nothing touches or overlaps.
Small white label under each character, in this order:
긴 생머리, 웨이브, 단발, 단발 웨이브, 숏컷, 포니테일, 사이드 포니테일, 똥머리,
양갈래, 반묶음, 올림머리, 땋은머리, 히피펌, 레이어드컷, 뽀글펌
Crisp pixels, no anti-aliasing, same pixel art style as the reference.
```

---

## 3. 표정 시트 (선택)

얼굴(눈·입) 부분만 오려서 아무 머리에나 붙일 거예요. 그래서 **앞머리가 눈썹 위에서 끝나는 짧은 머리** 한 가지로 통일해요.

참고 그림: `reference_m.png`

```text
Pixel art sheet: 10 heads-and-shoulders portraits of the exact same chibi boy as the attached reference,
in a 5 x 2 grid on a solid #00FF00 background. Remove the glasses.
Same short dark brown hair with bangs ending above the eyebrows in every portrait,
same head size and position. The ONLY difference is the facial expression.
Keep the expression inside the face: no sparkles, no hearts, no tears or marks outside the face.
Leave empty space between portraits.
Labels in order: 기본 미소, 활짝 웃음, 윙크, 감동의 눈물, 깜짝, 하트 눈, 수줍음, 뿌듯, 메롱, 눈웃음
Crisp pixels, no anti-aliasing.
```

## 4. 안경·머리 장식 시트 (선택)

**첫 번째 칸은 아무것도 안 쓴 상태**로 두세요. 나머지 칸과 비교해서 바뀐 부분(소품)만 오려내요.

```text
Pixel art sheet: 15 heads-and-shoulders portraits of the exact same chibi girl as the attached reference,
in a 5 x 3 grid on a solid #00FF00 background. Same short dark brown bob hair, same face,
same head size and position in every portrait.
The first portrait wears nothing extra. Each of the others adds exactly ONE item, in this order:
(nothing), black square glasses, round gold glasses, black sunglasses, heart-shaped pink sunglasses,
red beret, navy baseball cap, brown fedora, big white hair ribbon, flower crown of pink and white roses,
pearl hair pin, small tiara, cat ear headband, wedding veil, graduation-style little party hat.
Leave empty space between portraits. Labels under each.
Crisp pixels, no anti-aliasing.
```

---

## 보내주시면 할 일

1. 시트마다 캐릭터를 나누고, 머리(+어깨로 흘러내린 머리카락)만 오려내요.
2. 몸통과 같은 크기로 맞추고 목 위치를 맞춰요.
3. 하객 화면에 꾸미기 단계를 붙여요: 머리 → 머리색 → 옷 → 신발 → 소품 → 표정.

---

## 남자 걷기 시트 (안경 없이) — 옆모습 안경 교체용

지금 남자 옆모습 걷기 머리에는 안경이 그려져 있어요. 아래로 한 장 만들어 주시면 교체해요.
참고 그림: `prompts/reference_m.png` + 지금 걷기 시트(sheet_walk)

```text
Pixel art walking sprite sheet on a solid #00FF00 background, same style as the attached walking sheet.
The same chibi boy, but WITHOUT glasses. Short dark brown hair, plain white shirt, black pants.
Two rows: row 1 = walking to the left, 8 frames; row 2 = walking away from the viewer (back view), 8 frames.
Leave clear empty green space between every frame; no frames touch or overlap.
No labels, no numbers. Crisp pixels, no anti-aliasing.
```
