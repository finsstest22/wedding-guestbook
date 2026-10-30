# 한꺼번에 처리하기 (대화 3개)

GPT는 한 번 대답할 때 그림을 1장씩만 만들어요. 그래서 목록 전체를 한 번에 알려 주고, 그다음부터는 `다음`만 입력하는 방식으로 해요.
옷·머리·얼굴을 한 대화에 다 넣으면 참고 그림이 섞여서, **종류별로 대화 3개**로 나눠요.

**공통 사용법**
1. 새 대화에서 아래 표의 그림들을 **적힌 순서대로** 한 번에 첨부해요.
2. 그 대화의 프롬프트를 붙여넣어요. 첫 그림이 나와요.
3. 그림 위에 GPT가 적어 준 파일 이름으로 `parts-raw/v5/`에 저장해요.
4. `다음`을 입력하면 다음 그림이 나와요. 목록이 끝날 때까지 반복해요.
5. 그림이 이상하면(캐릭터가 움직임, 다른 옷이 섞임) `다시`를 입력해요.
6. 중간에 GPT가 순서를 잊거나 그림체가 흐려지면, 새 대화에서 첨부 + 프롬프트를 다시 넣고 맨 끝에 `Start from: <파일 이름>`을 붙여 이어서 해요.

---

## 대화 1 — 옷 42장

첨부 순서: ① `parts-raw/v5/base.webp` ② `parts-raw/sheet_outfit.webp` ③ `parts-raw/sheet_dress.webp`

```text
You will make a series of edited images, ONE image per reply, in the order of the list below.
Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 3 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.
Before each image, write only the file name. After each image, wait for me to type "다음" (next) or "다시" (redo).

List (file name — reference image — label — person):
outfit__suit_m — Image 2 — 정장 — man
outfit__suit_f — Image 2 — 정장 — woman
outfit__shirt_m — Image 2 — 셔츠 — man
outfit__shirt_f — Image 2 — 셔츠 — woman
outfit__knit_m — Image 2 — 니트 — man
outfit__knit_f — Image 2 — 니트 — woman
outfit__blouse_m — Image 2 — 블라우스 — man
outfit__blouse_f — Image 2 — 블라우스 — woman
outfit__slacks_m — Image 2 — 슬랙스 — man
outfit__slacks_f — Image 2 — 슬랙스 — woman
outfit__jeans_m — Image 2 — 청바지 — man
outfit__jeans_f — Image 2 — 청바지 — woman
outfit__pleats_m — Image 2 — 플리츠스커트 — man
outfit__pleats_f — Image 2 — 플리츠스커트 — woman
outfit__jacket_m — Image 2 — 자켓 — man
outfit__jacket_f — Image 2 — 자켓 — woman
outfit__cardigan_m — Image 2 — 가디건 — man
outfit__cardigan_f — Image 2 — 가디건 — woman
outfit__hoodie_m — Image 2 — 후드티 — man
outfit__hoodie_f — Image 2 — 후드티 — woman
outfit__tshirt_m — Image 2 — 티셔츠 — man
outfit__tshirt_f — Image 2 — 티셔츠 — woman
outfit__vest_m — Image 2 — 니트조끼 — man
outfit__vest_f — Image 2 — 니트조끼 — woman
outfit__coat_m — Image 2 — 코트 — man
outfit__coat_f — Image 2 — 코트 — woman
outfit__overall_m — Image 2 — 오버롤 — man
outfit__overall_f — Image 2 — 오버롤 — woman
outfit__onepiece_m — Image 2 — 원피스 — man
outfit__onepiece_f — Image 2 — 원피스 — woman
outfit__flower_m — Image 3 — 원피스 (플라워) — man
outfit__flower_f — Image 3 — 원피스 (플라워) — woman
outfit__black_m — Image 3 — 원피스 (블랙) — man
outfit__black_f — Image 3 — 원피스 (블랙) — woman
outfit__blue_m — Image 3 — 원피스 (블루) — man
outfit__blue_f — Image 3 — 원피스 (블루) — woman
outfit__hanbok_m — Image 3 — 한복 (일반) — man
outfit__hanbok_f — Image 3 — 한복 (일반) — woman
outfit__hanbok2_m — Image 3 — 한복 (혼주용 남녀) — man
outfit__hanbok2_f — Image 3 — 한복 (혼주용 남녀) — woman
outfit__hanbok3_m — Image 3 — 한복 (트렌디) — man
outfit__hanbok3_f — Image 3 — 한복 (트렌디) — woman

Start with the first item now.
```

---

## 대화 2 — 머리 30장

첨부 순서: ① `parts-raw/v5/base.webp` ② `parts-raw/sheet_hair_m.webp` ③ `parts-raw/sheet_hair_f.webp`

```text
You will make a series of edited images, ONE image per reply, in the order of the list below.
Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 3 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.
Before each image, write only the file name. After each image, wait for me to type "다음" (next) or "다시" (redo).

List (file name — reference image — label — person):
hair__twoblock — Image 2 — 1. 투블럭 — groom
hair__comma — Image 2 — 2. 쉼표머리 — groom
hair__perm — Image 2 — 3. 펌 — groom
hair__downperm — Image 2 — 4. 다운펌 — groom
hair__pomade — Image 2 — 5. 포마드 — groom
hair__dandy — Image 2 — 6. 댄디컷 — groom
hair__swallow — Image 2 — 7. 스왈로펌 — groom
hair__leaf — Image 2 — 8. 리프컷 — groom
hair__crop — Image 2 — 9. 크롭컷 — groom
hair__slick — Image 2 — 10. 뒷머리 넘김 — groom
hair__up_m — Image 2 — 11. 올림머리 — groom
hair__parted — Image 2 — 12. 가르마펌 — groom
hair__spike — Image 2 — 13. 스파이크컷 — groom
hair__asperm — Image 2 — 14. 애즈펌 — groom
hair__shaggy — Image 2 — 15. 샤기컷 — groom
hair__twoblock_f — Image 3 — 투블럭 — bride
hair__comma_f — Image 3 — 쉼표머리 — bride
hair__perm_f — Image 3 — 펌 — bride
hair__bob — Image 3 — 단발 — bride
hair__ponytail — Image 3 — 포니테일 — bride
hair__bun — Image 3 — 똥머리 — bride
hair__twin — Image 3 — 양갈래 — bride
hair__long — Image 3 — 긴 생머리 — bride
hair__wave — Image 3 — 웨이브 — bride
hair__halfup — Image 3 — 반묶음 — bride
hair__updo — Image 3 — 올림머리 — bride
hair__sidetail — Image 3 — 사이드 포니테일 — bride
hair__chignon — Image 3 — 역시뇽 스타일 — bride
hair__bobwave — Image 3 — 단발 웨이브 — bride
hair__halter — Image 3 — 헬터 헤어 — bride

Start with the first item now.
```

---

## 대화 3 — 얼굴 부품 28장 (눈·눈썹·입·볼)

첨부 순서: ① `parts-raw/v5/base.webp` ② `parts-raw/sheet_eyes.webp` ③ `parts-raw/sheet_brows.webp` ④ `parts-raw/sheet_mouth.webp` ⑤ `parts-raw/sheet_cheek.webp`

```text
You will make a series of edited images, ONE image per reply, in the order of the list below.
Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Images 2 to 5 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.
Before each image, write only the file name. After each image, wait for me to type "다음" (next) or "다시" (redo).

List (file name — reference image — label — part):
eyes__round — Image 2 — 동그란 눈 — eyes
eyes__droopy — Image 2 — 처진 눈 (순한 인상) — eyes
eyes__cat — Image 2 — 올라간 눈 (캣아이) — eyes
eyes__thin — Image 2 — 가는 눈 (얇고 좁은 눈) — eyes
eyes__sparkle — Image 2 — 반짝이는 눈 — eyes
eyes__double — Image 2 — 쌍꺼풀 눈 — eyes
eyes__lash — Image 2 — 긴 속눈썹 눈 — eyes
eyes__dot — Image 2 — 작은 점 눈 — eyes
eyes__sleepy — Image 2 — 졸린 눈 — eyes
eyes__smile — Image 2 — 웃는 눈 (초승달) — eyes
eyes__mole — Image 2 — 점 있는 눈 — eyes
brows__straight — Image 3 — 일자 눈썹 — eyebrows
brows__arch — Image 3 — 아치형 눈썹 — eyebrows
brows__thick — Image 3 — 진한 눈썹 — eyebrows
brows__thin — Image 3 — 얇은 눈썹 — eyebrows
brows__droopy — Image 3 — 처진 눈썹 — eyebrows
brows__angled — Image 3 — 각진 눈썹 — eyebrows
mouth__smile — Image 4 — 부드러운 미소 — mouth
mouth__grin — Image 4 — 활짝 웃음 — mouth
mouth__flat — Image 4 — 무표정 입 — mouth
mouth__cat — Image 4 — 고양이 입 :3 — mouth
mouth__open — Image 4 — 살짝 벌린 입 — mouth
mouth__teeth — Image 4 — 이빨 보이기 — mouth
mouth__pout — Image 4 — 살짝 삐진 입 — mouth
cheek__blush — Image 5 — 연한 볼터치 — cheek marks
cheek__blush2 — Image 5 — 강한 볼터치 — cheek marks
cheek__freckle — Image 5 — 주근깨 — cheek marks
cheek__mole — Image 5 — 점 (입 근처) — cheek marks

Start with the first item now.
```
