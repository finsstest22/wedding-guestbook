# 하객 꾸미기 부품 프롬프트

하객이 머리·옷·소품을 골라 입히는 "옷 입히기" 방식에 쓸 부품 그림을 만드는 프롬프트예요.

## 원리 (중요)

부품을 따로따로 그리면 위치와 크기가 제각각이라 겹쳐지지 않아요. 그래서:

1. **기본 캐릭터(마네킹) 한 장**을 먼저 만들어요. 머리카락 없음, 흰 민소매 + 회색 반바지, 맨발.
2. 그 마네킹 그림을 **매번 첨부해서 "이 그림을 수정해서 ○○만 추가해줘"** 라고 부품마다 한 장씩 만들어요.
3. 원본 마네킹과 비교해서 **바뀐 부분만 오려내면** 그게 부품 레이어가 돼요. 이 작업은 제가 스크립트로 처리해요.

규칙:
- 부품 하나당 이미지 한 장. 한 번에 여러 개를 섞지 마세요.
- **항상 같은 마네킹 원본**을 첨부하세요. 수정본을 다시 수정하면 조금씩 틀어져요.
- 캐릭터가 움직이거나 크기가 바뀐 결과는 버리고 다시 뽑으세요. 위치가 맞는 게 제일 중요해요.
- 머리색·피부색은 코드에서 바꿀 수 있어요. 머리는 전부 **짙은 갈색**으로 만들면 돼요.
- 저장 위치: `parts-raw/` 폴더에 `종류__이름.png` 형식으로 저장해 주세요. 예: `parts-raw/hair__comma.png`

---

## 1단계 · 기본 캐릭터 (마네킹)

앞서 만든 하객 캐릭터 그림(안경 쓴 남자)을 스타일 참고용으로 첨부하세요.

```text
Using the attached character as a style reference, draw a plain base character for a dress-up game.
Exactly the same chibi proportions, pixel size, dark outline and pixel art style.
Pose: standing straight, facing forward, arms held slightly away from the body, feet slightly apart.
Bald head with no hair at all, neutral friendly face with simple dark eyes and light pink blush, no glasses.
Wearing only a plain white sleeveless undershirt and light gray shorts, barefoot.
Medium-light skin tone. Centered on a solid #00FF00 background with empty space around the body.
Crisp pixels, no anti-aliasing, no text, no shadow.
```

→ `parts-raw/base.png` 로 저장

---

## 2단계 · 부품 공통 프롬프트

마네킹(`base.png`)을 첨부하고, 아래 틀의 `{ITEM}` 자리에 각 부품 문구를 넣으세요.

**추가하는 부품 (머리, 안경, 모자, 소품, 표정)**

```text
Edit this exact image. Add ONLY: {ITEM}.
Do not move, resize, or redraw the character. Keep the face, body, pose, outline,
all other colors and the solid #00FF00 background exactly the same.
Same pixel art style, crisp pixels, no anti-aliasing. Same canvas size.
```

**바꾸는 부품 (상의, 하의, 원피스, 신발)**

```text
Edit this exact image. Replace ONLY the clothing with: {ITEM}.
Do not move, resize, or redraw the character. Keep the head, face, skin, pose, outline
and the solid #00FF00 background exactly the same. Bald head stays bald.
Same pixel art style, crisp pixels, no anti-aliasing. Same canvas size.
```

---

## 3단계 · 부품 목록

### 헤어 `hair__` (전부 짙은 갈색으로)

| 파일 이름 | {ITEM} |
|---|---|
| hair__twoblock | a neat short two-block haircut with slightly messy bangs, dark brown |
| hair__comma | Korean comma hair: short hair with bangs swept to one side into a comma-shaped curl, dark brown |
| hair__sidepart | a classic short side-parted hairstyle, neatly styled, dark brown |
| hair__perm | a short fluffy curly perm, dark brown |
| hair__buzz | a very short buzz cut, dark brown |
| hair__long | long straight hair falling past the shoulders with see-through bangs, dark brown |
| hair__wavy | long loose wavy hair with side-swept bangs, dark brown |
| hair__bob | a chin-length bob with straight bangs, dark brown |
| hair__shortbob | a short boyish bob cut, dark brown |
| hair__ponytail | a high ponytail tied with a small white ribbon, seen from the front, dark brown |
| hair__lowbun | an elegant low bun with a few loose strands framing the face, dark brown |
| hair__topbun | a cute messy top bun, dark brown |
| hair__twintail | twin tails tied on both sides of the head, dark brown |
| hair__braid | a single loose braid over one shoulder, dark brown |
| hair__auntie | a short tight curly perm like a Korean middle-aged auntie, dark brown |

### 상의 `top__` (바꾸는 부품 틀 사용, 반바지는 그대로)

| 파일 이름 | {ITEM} |
|---|---|
| top__suitnavy | a navy suit jacket over a white shirt with a light blue tie (keep the gray shorts) |
| top__suitblack | a black suit jacket over a white shirt with a black bow tie (keep the gray shorts) |
| top__shirt | a crisp white button-up shirt with sleeves rolled up (keep the gray shorts) |
| top__knit | a cozy cream cable-knit sweater (keep the gray shorts) |
| top__cardigan | a pastel pink cardigan over a white t-shirt (keep the gray shorts) |
| top__blouse | a white blouse with puff sleeves and a small ribbon at the collar (keep the gray shorts) |
| top__hoodie | a light gray hoodie (keep the gray shorts) |
| top__denim | a light blue denim jacket over a white t-shirt (keep the gray shorts) |
| top__stripe | a navy and white striped t-shirt (keep the gray shorts) |

### 하의 `bottom__` (흰 민소매는 그대로)

| 파일 이름 | {ITEM} |
|---|---|
| bottom__slacks | black slacks (keep the white undershirt) |
| bottom__chino | beige chino pants (keep the white undershirt) |
| bottom__jeans | blue straight-leg jeans (keep the white undershirt) |
| bottom__pleats | a navy pleated knee-length skirt (keep the white undershirt) |
| bottom__longskirt | a long flowing beige skirt (keep the white undershirt) |

### 원피스·한복 `outfit__` (상의+하의를 한 번에)

| 파일 이름 | {ITEM} |
|---|---|
| outfit__dressblue | a pastel blue knee-length A-line dress |
| outfit__floral | a floral midi dress with small flowers |
| outfit__satin | an elegant sage green satin slip dress |
| outfit__tweed | a pink tweed jacket and matching skirt set |
| outfit__hanbokf | a traditional Korean women's hanbok with a pink jeogori and a long navy chima skirt |
| outfit__hanbokm | a traditional Korean men's hanbok in light blue with a navy vest |

### 신발 `shoes__`

| 파일 이름 | {ITEM} |
|---|---|
| shoes__sneakers | white sneakers (keep everything else) |
| shoes__loafers | black leather loafers (keep everything else) |
| shoes__heels | black low heels (keep everything else) |
| shoes__maryjane | cream Mary Jane shoes (keep everything else) |
| shoes__boots | brown ankle boots (keep everything else) |

### 표정 `face__` (추가하는 부품 틀 사용)

| 파일 이름 | {ITEM} |
|---|---|
| face__smile | a happy closed-eye smile with curved ^ ^ eyes |
| face__wink | a playful wink with one eye closed and a smile |
| face__teary | happy teary eyes with a tiny tear, smiling (moved to tears) |
| face__surprised | surprised round eyes and a small open mouth |
| face__grin | a big open grin with rosy cheeks |

### 안경 `eyes__`

| 파일 이름 | {ITEM} |
|---|---|
| eyes__round | thin round gold-rimmed glasses |
| eyes__square | black square-framed glasses |
| eyes__sunglasses | black sunglasses |

### 머리 장식 `head__`

| 파일 이름 | {ITEM} |
|---|---|
| head__beret | a red beret |
| head__cap | a navy baseball cap |
| head__fedora | a brown fedora hat |
| head__ribbon | a big white hair ribbon on top of the head |
| head__flowercrown | a small flower crown of pink and white roses |
| head__pearlpin | a small pearl hair pin on one side |

### 손 소품 `hand__`

| 파일 이름 | {ITEM} |
|---|---|
| hand__bouquet | holding a small bouquet of pink roses in both hands in front of the body |
| hand__envelope | holding a white money envelope with a red heart seal in both hands |
| hand__camera | holding a small mint instant camera in both hands |
| hand__balloon | holding a pink heart-shaped balloon on a string in one hand, the balloon floating beside the head |
| hand__champagne | holding a glass of champagne in one hand |
| hand__phone | holding up a smartphone in one hand as if taking a photo |
| hand__heart | making a heart shape with both hands above the head |

### 함께 온 반려동물 `pet__`

| 파일 이름 | {ITEM} |
|---|---|
| pet__maltese | a small white Maltese dog sitting next to the character's feet |
| pet__cat | a small orange tabby cat sitting next to the character's feet |

---

## 팁

- 결과가 마음에 들면 **같은 대화창에서 이어서 만들지 말고**, 새 대화에 마네킹을 다시 첨부해 시작하세요. 대화가 길어질수록 그림이 조금씩 변해요.
- 손 소품은 팔 모양이 바뀌는 부품이라, 다른 상의와 겹칠 때 어색할 수 있어요. 일단 만들어 보고 겹쳐 본 뒤에 고르면 돼요.
- 처음부터 다 만들 필요는 없어요. **헤어 6개 + 상의 4개 + 원피스 2개 + 안경 2개 + 소품 3개** 정도만 있어도 조합이 수백 가지예요.
