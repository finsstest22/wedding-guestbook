# 신랑·신부를 하객 그림체로 다시 그리기 (1장)

하객(v3)과 신랑·신부 그림체를 맞추기 위한 프롬프트예요. 하객 32장을 다시 만드는 대신, 신랑·신부 1장만 하객 그림체로 다시 그려요.

**방법**
1. 새 대화를 열고 `parts-raw/v2/outfit__suit.webp`(정장 시트)를 첨부해요.
2. 아래 프롬프트를 붙여넣어요.
3. 결과를 `parts-raw/couple.webp`로 저장해요.
4. 저장했다고 알려 주시면 잘라서 `public/img/groom.png`, `public/img/bride.png`로 바꿔 넣을게요.
   (내부 명령: `python tools/chroma.py parts-raw/couple.webp public/img/couple.png --split 2`)

```text
Use the attached sheet only as a STYLE reference: copy exactly the same chibi pixel-art style
as its top-left front-facing character — same head size and head-to-body ratio, same body width,
same short arms and legs, same outline thickness, same face (round dark eyes with a white
highlight, simple small smile, pink blush), same pixel size.

Draw TWO characters standing side by side, both facing the viewer, standing still, arms down:
- left: a groom with neat dark brown hair, round black glasses, a black tuxedo with a white
  shirt, black bow tie, a small white flower boutonniere, black shoes.
- right: a bride with dark brown hair tied back, a long white veil with a small pink flower
  crown, a white strapless wedding dress that reaches the floor, holding a small pink rose
  bouquet in both hands.

Both characters the same height as the reference character, with clear space between them.
Solid #00FF00 background, nothing else in the image. Crisp pixels, no anti-aliasing.
```

**잘 안 나오면**
- 머리가 하객보다 작게 나오면 → `Make the heads bigger, exactly like the reference character.`
- 그림체가 달라지면 → 결과를 버리고 새 대화에서 다시 뽑기.
