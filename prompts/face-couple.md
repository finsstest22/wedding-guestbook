# 하객 얼굴을 신랑·신부 얼굴처럼 (얼굴 시트 3장)

**방법 (장마다 새 대화)**
1. 이미지 2장을 첨부해요. **첫 번째는 `parts-raw/v2/base.webp`**(고칠 그림), **두 번째는 `public/img/bride.png`**(얼굴 참고용)예요.
2. 아래 공통 프롬프트에서 `{FACE}`만 표의 내용으로 바꿔 붙여넣어요.
3. 결과를 표의 파일 이름으로 `parts-raw/v2/`에 저장해요 (1536×1024 그대로).
4. 저장했다고 알려 주시면 부품으로 만들어 넣을게요.

```text
Edit the FIRST image only. The second image is only a reference for the face style.
On the 4 front-facing characters (top row) of the first image, replace the face with {FACE},
drawn in the same style as the face of the character in the second image.
Every top-row character gets exactly the same face, at the same position on the head.
Do NOT change the side and back rows at all. Do NOT add hair, glasses or accessories.
Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background.
Same canvas size. Crisp pixels, no anti-aliasing.
```

| 파일 이름 | {FACE} | 하객 화면 이름 |
|---|---|---|
| face__soft | large dark brown eyes with a soft white highlight and a thin dark upper eyelid line, short soft brown eyebrows, a tiny calm smile (a short curved line), very faint light pink blush | 또렷한 눈 |
| face__lash | large dark brown eyes with a soft white highlight and small eyelashes at the outer corners, short soft brown eyebrows, a tiny closed-mouth smile, faint light pink blush | 속눈썹 |
| face__soft_closed | gently smiling closed eyes drawn as soft dark brown curved lines, short soft brown eyebrows, a tiny calm smile, faint light pink blush | 살짝 웃음 |

**잘 안 나오면**
- 볼터치가 진한 분홍 동그라미로 나오면 → `Make the blush much lighter and smaller, barely visible.`
- 입이 크게 웃는 모양이면 → `Make the mouth much smaller, a tiny short line.`
- 캐릭터가 움직이거나 머리·몸이 바뀌면 → 버리고 새 대화에서 다시 뽑기.
