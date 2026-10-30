# 기준 시트 방식 (v2) 프롬프트

시험 5장(기준·정장·한복·투블럭·긴 생머리)으로 확인한 결과 칸 위치 어긋남이 최대 2px라 이 방식으로 진행해요.

**규칙**
- 매번 **새 대화**에서 `parts-raw/v2/base.webp`(기준 시트)를 첨부하고 시작하세요.
- 결과 크기는 기준과 같게 (1536×1024).
- 저장 이름: 옷은 `outfit__이름.webp`, 머리는 `hair__이름.webp`, 얼굴은 `face__이름.webp` → `parts-raw/v2/` 폴더.
- 캐릭터가 움직이거나 크기가 바뀐 결과는 버리고 다시 뽑기.

---

## 옷 (10장 더) — 틀

```text
Edit this exact image. Dress every one of the 12 characters in the same outfit: {OUTFIT}.
Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Do NOT move, resize or redraw the characters. Keep the bald heads, faces, poses, positions,
cell layout and the solid #00FF00 background exactly the same. Same canvas size.
Crisp pixels, no anti-aliasing.
```

| 파일 이름 | {OUTFIT} |
|---|---|
| outfit__shirt | a crisp white button-up shirt, beige chino pants and brown loafers |
| outfit__knit | a cream cable-knit sweater, dark gray slacks and black shoes |
| outfit__hoodie | a light gray hoodie, black jogger pants and white sneakers |
| outfit__denim | a white t-shirt under a light blue denim jacket, blue jeans and white sneakers |
| outfit__hanbok_m | a traditional Korean men's hanbok: light blue jeogori top, navy vest and loose navy baji pants, white shoes |
| outfit__dress_blue | a pastel blue puff-sleeve knee-length dress and white Mary Jane shoes |
| outfit__dress_floral | a cream floral midi dress with long sleeves and beige flat shoes |
| outfit__dress_black | an elegant black long-sleeve midi dress and black heels |
| outfit__blouse_skirt | a white blouse with a ribbon collar, a navy pleated knee-length skirt and black Mary Jane shoes |
| outfit__cardigan_skirt | a pink cardigan over a white top, a long beige skirt and white flat shoes |

## 머리 (14장 더) — 틀

```text
Edit this exact image. Give every one of the 12 characters the same hairstyle: {HAIR}, dark brown.
Show the hairstyle correctly from each direction (front, side, back).
Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions,
cell layout and the solid #00FF00 background exactly the same. Same canvas size.
Crisp pixels, no anti-aliasing.
```

| 파일 이름 | {HAIR} |
|---|---|
| hair__comma | Korean comma hair: short hair with bangs swept to one side into a comma-shaped curl |
| hair__perm | a short fluffy curly perm |
| hair__pomade | a slicked-back pomade style with a side part, forehead showing |
| hair__dandy | a neat dandy cut with straight bangs covering the forehead |
| hair__crop | a short textured crop cut |
| hair__wolf | a medium-length wolf cut reaching the nape |
| hair__buzz | a very short buzz cut |
| hair__bob | a chin-length bob with straight bangs |
| hair__wave | long loose wavy hair with side-swept bangs |
| hair__ponytail | a high ponytail, seen correctly from the side and back |
| hair__bun | a neat low bun at the back of the head with a few loose strands framing the face |
| hair__twin | low twin tails tied on both sides |
| hair__short_f | a short boyish bob cut with soft bangs |
| hair__halfup | long hair in a half-up style with a small bow at the back |

## 얼굴 (3장) — 앞모습 4칸만 바뀌면 돼요

```text
Edit this exact image. Only on the 4 front-facing characters (top row), draw {FACE}.
Every top-row character gets the same face. Do NOT change the side and back rows at all.
Do NOT move, resize or redraw anything else. Same canvas size. Crisp pixels, no anti-aliasing.
```

같은 얼굴을 4칸에 다 그리면 그중 가장 깔끔한 걸 골라 써요. 종류마다 한 장씩이라 원하는 만큼 만들면 돼요. 우선 3장:

| 파일 이름 | {FACE} |
|---|---|
| face__smile | simple round dark eyes with a white highlight, a small happy smile and light pink blush |
| face__cat | upturned cat-like eyes, a small :3 cat mouth and light pink blush |
| face__closed | happy closed curved eyes (^ ^), an open smile and pink blush |

## 얼굴 추가 — 신랑·신부 그림체 (3장)

신랑·신부 그림처럼 갈색 눈, 작은 입, 옅은 볼터치로 바꾸는 얼굴이에요. 자세한 방법은 `prompts/face-couple.md`를 보세요.
