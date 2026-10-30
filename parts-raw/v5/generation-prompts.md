# V5 이미지 생성 프롬프트 세트

방식: 내장 image_gen. 원본 v5-batch.md를 바탕으로 항목별 생성. 기본 시트는 매번 원본 base.webp 사용. 기존 6개 파일은 재사용. 이 문서는 항목별 최종 프롬프트 사양이며 이미지별 원시 호출 로그는 아닙니다.

## outfit__blouse_f

Use case: precise-object-edit. Asset filename: outfit__blouse_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__blouse_f — Image 2 — label: 블라우스 — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__slacks_m

Use case: precise-object-edit. Asset filename: outfit__slacks_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__slacks_m — Image 2 — label: 슬랙스 — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__slacks_f

Use case: precise-object-edit. Asset filename: outfit__slacks_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__slacks_f — Image 2 — label: 슬랙스 — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__jeans_m

Use case: precise-object-edit. Asset filename: outfit__jeans_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__jeans_m — Image 2 — label: 청바지 — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__jeans_f

Use case: precise-object-edit. Asset filename: outfit__jeans_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__jeans_f — Image 2 — label: 청바지 — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__pleats_m

Use case: precise-object-edit. Asset filename: outfit__pleats_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__pleats_m — Image 2 — label: 플리츠스커트 — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__pleats_f

Use case: precise-object-edit. Asset filename: outfit__pleats_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__pleats_f — Image 2 — label: 플리츠스커트 — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__jacket_m

Use case: precise-object-edit. Asset filename: outfit__jacket_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__jacket_m — Image 2 — label: 자켓 — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__jacket_f

Use case: precise-object-edit. Asset filename: outfit__jacket_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__jacket_f — Image 2 — label: 자켓 — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__cardigan_m

Use case: precise-object-edit. Asset filename: outfit__cardigan_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__cardigan_m — Image 2 — label: 가디건 — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__cardigan_f

Use case: precise-object-edit. Asset filename: outfit__cardigan_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__cardigan_f — Image 2 — label: 가디건 — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__hoodie_m

Use case: precise-object-edit. Asset filename: outfit__hoodie_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__hoodie_m — Image 2 — label: 후드티 — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__hoodie_f

Use case: precise-object-edit. Asset filename: outfit__hoodie_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__hoodie_f — Image 2 — label: 후드티 — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__tshirt_m

Use case: precise-object-edit. Asset filename: outfit__tshirt_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__tshirt_m — Image 2 — label: 티셔츠 — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__tshirt_f

Use case: precise-object-edit. Asset filename: outfit__tshirt_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__tshirt_f — Image 2 — label: 티셔츠 — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__vest_m

Use case: precise-object-edit. Asset filename: outfit__vest_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__vest_m — Image 2 — label: 니트조끼 — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__vest_f

Use case: precise-object-edit. Asset filename: outfit__vest_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__vest_f — Image 2 — label: 니트조끼 — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__coat_m

Use case: precise-object-edit. Asset filename: outfit__coat_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__coat_m — Image 2 — label: 코트 — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__coat_f

Use case: precise-object-edit. Asset filename: outfit__coat_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__coat_f — Image 2 — label: 코트 — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__overall_m

Use case: precise-object-edit. Asset filename: outfit__overall_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__overall_m — Image 2 — label: 오버롤 — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__overall_f

Use case: precise-object-edit. Asset filename: outfit__overall_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__overall_f — Image 2 — label: 오버롤 — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__onepiece_m

Use case: precise-object-edit. Asset filename: outfit__onepiece_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__onepiece_m — Image 2 — label: 원피스 — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__onepiece_f

Use case: precise-object-edit. Asset filename: outfit__onepiece_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

Target is the right person of the pair at bottom row, fifth/far-right column, label 원피스: plain white puff sleeve blouse and solid beige high-waisted long pleated skirt, no floral print, brown belt at waist, white shoes. Do not use the flower dress.
MAKE ONLY THIS ONE ITEM: outfit__onepiece_f — Image 2 — label: 원피스 — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__flower_m

Use case: precise-object-edit. Asset filename: outfit__flower_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__flower_m — Image 2 — label: 원피스 (플라워) — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__flower_f

Use case: precise-object-edit. Asset filename: outfit__flower_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__flower_f — Image 2 — label: 원피스 (플라워) — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__black_m

Use case: precise-object-edit. Asset filename: outfit__black_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__black_m — Image 2 — label: 원피스 (블랙) — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__black_f

Use case: precise-object-edit. Asset filename: outfit__black_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__black_f — Image 2 — label: 원피스 (블랙) — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__blue_m

Use case: precise-object-edit. Asset filename: outfit__blue_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__blue_m — Image 2 — label: 원피스 (블루) — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__blue_f

Use case: precise-object-edit. Asset filename: outfit__blue_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__blue_f — Image 2 — label: 원피스 (블루) — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__hanbok_m

Use case: precise-object-edit. Asset filename: outfit__hanbok_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__hanbok_m — Image 2 — label: 한복 (일반) — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__hanbok_f

Use case: precise-object-edit. Asset filename: outfit__hanbok_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

CRITICAL: omit the small floral purse/pouch entirely from waist and hands, plain skirt fabric there. The reference woman's white floral purse is a BAG and MUST NOT appear. Hands stay empty at original walk positions.
MAKE ONLY THIS ONE ITEM: outfit__hanbok_f — Image 2 — label: 한복 (일반) — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__hanbok2_m

Use case: precise-object-edit. Asset filename: outfit__hanbok2_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__hanbok2_m — Image 2 — label: 한복 (혼주용 남녀) — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__hanbok2_f

Use case: precise-object-edit. Asset filename: outfit__hanbok2_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

CRITICAL: no purse, handbag, pouch, bag straps, or bag silhouette anywhere. The small decorated bag held by the reference woman MUST be omitted entirely. Hands empty at base walk positions.
MAKE ONLY THIS ONE ITEM: outfit__hanbok2_f — Image 2 — label: 한복 (혼주용 남녀) — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__hanbok3_m

Use case: precise-object-edit. Asset filename: outfit__hanbok3_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: outfit__hanbok3_m — Image 2 — label: 한복 (트렌디) — person or part: man.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## outfit__hanbok3_f

Use case: precise-object-edit. Asset filename: outfit__hanbok3_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled characters (a man on the left and a woman on the right in each pair).

For each item: edit Image 1 only. Dress every one of the 12 characters in exactly the outfit worn by the given person in the given reference image: same design, colors, details and shoes, in the same pixel-art style. Show the outfit correctly from each direction (front, side, back) and let it move with each walking pose.
Rules for every image: do NOT copy hair, faces, glasses, bags or bouquets. Do NOT move, resize or redraw the characters. Keep the bald heads, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

CRITICAL: no purse, handbag, pouch, bag straps, or bag silhouette anywhere. The small decorated bag held by the reference woman MUST be omitted entirely. Hands empty at base walk positions.
MAKE ONLY THIS ONE ITEM: outfit__hanbok3_f — Image 2 — label: 한복 (트렌디) — person or part: woman.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__twoblock

Use case: precise-object-edit. Asset filename: hair__twoblock. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__twoblock — Image 2 — label: 1. 투블럭 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__comma

Use case: precise-object-edit. Asset filename: hair__comma. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__comma — Image 2 — label: 2. 쉼표머리 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__perm

Use case: precise-object-edit. Asset filename: hair__perm. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__perm — Image 2 — label: 3. 펌 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__downperm

Use case: precise-object-edit. Asset filename: hair__downperm. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__downperm — Image 2 — label: 4. 다운펌 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__pomade

Use case: precise-object-edit. Asset filename: hair__pomade. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__pomade — Image 2 — label: 5. 포마드 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__dandy

Use case: precise-object-edit. Asset filename: hair__dandy. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__dandy — Image 2 — label: 6. 댄디컷 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__swallow

Use case: precise-object-edit. Asset filename: hair__swallow. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__swallow — Image 2 — label: 7. 스왈로펌 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__leaf

Use case: precise-object-edit. Asset filename: hair__leaf. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__leaf — Image 2 — label: 8. 리프컷 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__crop

Use case: precise-object-edit. Asset filename: hair__crop. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__crop — Image 2 — label: 9. 크롭컷 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__slick

Use case: precise-object-edit. Asset filename: hair__slick. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__slick — Image 2 — label: 10. 뒷머리 넘김 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__up_m

Use case: precise-object-edit. Asset filename: hair__up_m. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__up_m — Image 2 — label: 11. 올림머리 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__parted

Use case: precise-object-edit. Asset filename: hair__parted. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__parted — Image 2 — label: 12. 가르마펌 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__spike

Use case: precise-object-edit. Asset filename: hair__spike. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__spike — Image 2 — label: 13. 스파이크컷 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__asperm

Use case: precise-object-edit. Asset filename: hair__asperm. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__asperm — Image 2 — label: 14. 애즈펌 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__shaggy

Use case: precise-object-edit. Asset filename: hair__shaggy. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

MAKE ONLY THIS ONE ITEM: hair__shaggy — Image 2 — label: 15. 샤기컷 — person or part: groom.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__twoblock_f

Use case: precise-object-edit. Asset filename: hair__twoblock_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 1 of 3, column 1 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 투블럭. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
The target hair is a short jaw-length brown side-parted bob tucked around the cheeks, as on the bride in the TOP LEFT pair. NOT a bun/updo, no topknot, no ponytail, no veil.
MAKE ONLY THIS ONE ITEM: hair__twoblock_f — Image 2 — label: 투블럭 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__comma_f

Use case: precise-object-edit. Asset filename: hair__comma_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 1 of 3, column 2 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 쉼표머리. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__comma_f — Image 2 — label: 쉼표머리 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__perm_f

Use case: precise-object-edit. Asset filename: hair__perm_f. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 1 of 3, column 3 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 펌. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__perm_f — Image 2 — label: 펌 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__bob

Use case: precise-object-edit. Asset filename: hair__bob. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 1 of 3, column 4 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 단발. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__bob — Image 2 — label: 단발 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__ponytail

Use case: precise-object-edit. Asset filename: hair__ponytail. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 1 of 3, column 5 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 포니테일. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__ponytail — Image 2 — label: 포니테일 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__bun

Use case: precise-object-edit. Asset filename: hair__bun. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 2 of 3, column 1 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 똥머리. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__bun — Image 2 — label: 똥머리 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__twin

Use case: precise-object-edit. Asset filename: hair__twin. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 2 of 3, column 2 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 양갈래. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__twin — Image 2 — label: 양갈래 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__long

Use case: precise-object-edit. Asset filename: hair__long. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 2 of 3, column 3 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 긴 생머리. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__long — Image 2 — label: 긴 생머리 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__wave

Use case: precise-object-edit. Asset filename: hair__wave. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 2 of 3, column 4 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 웨이브. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__wave — Image 2 — label: 웨이브 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__halfup

Use case: precise-object-edit. Asset filename: hair__halfup. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 2 of 3, column 5 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 반묶음. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__halfup — Image 2 — label: 반묶음 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__updo

Use case: precise-object-edit. Asset filename: hair__updo. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 3 of 3, column 1 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 올림머리. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__updo — Image 2 — label: 올림머리 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__sidetail

Use case: precise-object-edit. Asset filename: hair__sidetail. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 3 of 3, column 2 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 사이드 포니테일. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__sidetail — Image 2 — label: 사이드 포니테일 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__chignon

Use case: precise-object-edit. Asset filename: hair__chignon. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 3 of 3, column 3 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 역시뇽 스타일. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__chignon — Image 2 — label: 역시뇽 스타일 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__bobwave

Use case: precise-object-edit. Asset filename: hair__bobwave. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 3 of 3, column 4 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 단발 웨이브. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__bobwave — Image 2 — label: 단발 웨이브 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## hair__halter

Use case: precise-object-edit. Asset filename: hair__halter. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back, each with 4 walking poses) on a solid #00FF00 background.
Image 2 and Image 2 are reference sheets with labeled pairs: a groom on the left and a bride on the right.

For each item: edit Image 1 only. Give every one of the 12 characters exactly the hairstyle of the given person in the given reference image: same shape, length, bangs and color, in the same pixel-art style. Show the hairstyle correctly from each direction (front, side, back).
Rules for every image: do NOT copy faces, glasses, veils, flowers, hair accessories or clothes. Do NOT move, resize or redraw the characters. Keep the faces, bodysuits, poses, positions, cell layout and the solid #00FF00 background exactly the same. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

PRECISE REFERENCE LOCATION: Image 2, row 3 of 3, column 5 of 5 pairs. Copy the RIGHT bride's HAIR ONLY in that specific pair labelled 헬터 헤어. Absolutely exclude ALL white veils, ALL white cloth behind head, ALL flowers, ALL ribbons, ALL headbands and jewelry. Render only brown hair strands and bare skin. This overrides any wedding adornments in the reference.
MAKE ONLY THIS ONE ITEM: hair__halter — Image 2 — label: 헬터 헤어 — person or part: bride.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## eyes__round

Use case: precise-object-edit. Asset filename: eyes__round. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 2, labeled 동그란 눈. Copy ONLY eyes. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: eyes__round — Image 2 — label: 동그란 눈 — person or part: eyes.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## eyes__droopy

Use case: precise-object-edit. Asset filename: eyes__droopy. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 3, labeled 처진 눈 (순한 인상). Copy ONLY eyes. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: eyes__droopy — Image 2 — label: 처진 눈 (순한 인상) — person or part: eyes.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## eyes__cat

Use case: precise-object-edit. Asset filename: eyes__cat. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 4, labeled 올라간 눈 (캣아이). Copy ONLY eyes. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: eyes__cat — Image 2 — label: 올라간 눈 (캣아이) — person or part: eyes.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## eyes__thin

Use case: precise-object-edit. Asset filename: eyes__thin. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 2, column 1, labeled 가는 눈 (얇고 좁은 눈). Copy ONLY eyes. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: eyes__thin — Image 2 — label: 가는 눈 (얇고 좁은 눈) — person or part: eyes.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## eyes__sparkle

Use case: precise-object-edit. Asset filename: eyes__sparkle. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 2, column 2, labeled 반짝이는 눈. Copy ONLY eyes. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: eyes__sparkle — Image 2 — label: 반짝이는 눈 — person or part: eyes.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## eyes__double

Use case: precise-object-edit. Asset filename: eyes__double. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 2, column 3, labeled 쌍꺼풀 눈. Copy ONLY eyes. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: eyes__double — Image 2 — label: 쌍꺼풀 눈 — person or part: eyes.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## eyes__lash

Use case: precise-object-edit. Asset filename: eyes__lash. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 2, column 4, labeled 긴 속눈썹 눈. Copy ONLY eyes. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: eyes__lash — Image 2 — label: 긴 속눈썹 눈 — person or part: eyes.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## eyes__dot

Use case: precise-object-edit. Asset filename: eyes__dot. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 3, column 1, labeled 작은 점 눈. Copy ONLY eyes. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: eyes__dot — Image 2 — label: 작은 점 눈 — person or part: eyes.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## eyes__sleepy

Use case: precise-object-edit. Asset filename: eyes__sleepy. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 3, column 2, labeled 졸린 눈. Copy ONLY eyes. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: eyes__sleepy — Image 2 — label: 졸린 눈 — person or part: eyes.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## eyes__smile

Use case: precise-object-edit. Asset filename: eyes__smile. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 3, column 3, labeled 웃는 눈 (초승달). Copy ONLY eyes. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: eyes__smile — Image 2 — label: 웃는 눈 (초승달) — person or part: eyes.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## eyes__mole

Use case: precise-object-edit. Asset filename: eyes__mole. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 3, column 4, labeled 점 있는 눈. Copy ONLY eyes. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: eyes__mole — Image 2 — label: 점 있는 눈 — person or part: eyes.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## brows__straight

Use case: precise-object-edit. Asset filename: brows__straight. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 2, labeled 일자 눈썹. Copy ONLY eyebrows. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: brows__straight — Image 2 — label: 일자 눈썹 — person or part: eyebrows.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## brows__arch

Use case: precise-object-edit. Asset filename: brows__arch. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 3, labeled 아치형 눈썹. Copy ONLY eyebrows. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: brows__arch — Image 2 — label: 아치형 눈썹 — person or part: eyebrows.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## brows__thick

Use case: precise-object-edit. Asset filename: brows__thick. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 4, labeled 진한 눈썹. Copy ONLY eyebrows. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: brows__thick — Image 2 — label: 진한 눈썹 — person or part: eyebrows.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## brows__thin

Use case: precise-object-edit. Asset filename: brows__thin. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 2, column 1, labeled 얇은 눈썹. Copy ONLY eyebrows. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: brows__thin — Image 2 — label: 얇은 눈썹 — person or part: eyebrows.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## brows__droopy

Use case: precise-object-edit. Asset filename: brows__droopy. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 2, column 2, labeled 처진 눈썹. Copy ONLY eyebrows. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: brows__droopy — Image 2 — label: 처진 눈썹 — person or part: eyebrows.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## brows__angled

Use case: precise-object-edit. Asset filename: brows__angled. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 2, column 3, labeled 각진 눈썹. Copy ONLY eyebrows. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: brows__angled — Image 2 — label: 각진 눈썹 — person or part: eyebrows.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## mouth__smile

Use case: precise-object-edit. Asset filename: mouth__smile. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 2, labeled 부드러운 미소. Copy ONLY mouth. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: mouth__smile — Image 2 — label: 부드러운 미소 — person or part: mouth.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## mouth__grin

Use case: precise-object-edit. Asset filename: mouth__grin. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 3, labeled 활짝 웃음. Copy ONLY mouth. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: mouth__grin — Image 2 — label: 활짝 웃음 — person or part: mouth.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## mouth__flat

Use case: precise-object-edit. Asset filename: mouth__flat. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 4, labeled 무표정 입. Copy ONLY mouth. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: mouth__flat — Image 2 — label: 무표정 입 — person or part: mouth.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## mouth__cat

Use case: precise-object-edit. Asset filename: mouth__cat. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 2, column 1, labeled 고양이 입 :3. Copy ONLY mouth. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: mouth__cat — Image 2 — label: 고양이 입 :3 — person or part: mouth.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## mouth__open

Use case: precise-object-edit. Asset filename: mouth__open. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 2, column 2, labeled 살짝 벌린 입. Copy ONLY mouth. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: mouth__open — Image 2 — label: 살짝 벌린 입 — person or part: mouth.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## mouth__teeth

Use case: precise-object-edit. Asset filename: mouth__teeth. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 2, column 3, labeled 이빨 보이기. Copy ONLY mouth. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: mouth__teeth — Image 2 — label: 이빨 보이기 — person or part: mouth.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## mouth__pout

Use case: precise-object-edit. Asset filename: mouth__pout. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 2, column 4, labeled 살짝 삐진 입. Copy ONLY mouth. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: mouth__pout — Image 2 — label: 살짝 삐진 입 — person or part: mouth.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## cheek__blush

Use case: precise-object-edit. Asset filename: cheek__blush. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 2, labeled 연한 볼터치. Copy ONLY cheek marks. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
CRITICAL CORRECTION: the blush must be VERY PALE LIGHT pastel pink, barely visible against peach skin, three fine pale diagonal pixel strokes on each cheek. NO saturated pink, NO red, NO dark salmon. Much lighter than the strong blush reference. Use the very faint pale PINK marks from the SECOND thumbnail, not the stronger THIRD thumbnail.
MAKE ONLY THIS ONE ITEM: cheek__blush — Image 2 — label: 연한 볼터치 — person or part: cheek marks.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## cheek__blush2

Use case: precise-object-edit. Asset filename: cheek__blush2. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 3, labeled 강한 볼터치. Copy ONLY cheek marks. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: cheek__blush2 — Image 2 — label: 강한 볼터치 — person or part: cheek marks.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## cheek__freckle

Use case: precise-object-edit. Asset filename: cheek__freckle. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 4, labeled 주근깨. Copy ONLY cheek marks. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
MAKE ONLY THIS ONE ITEM: cheek__freckle — Image 2 — label: 주근깨 — person or part: cheek marks.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.

## cheek__mole

Use case: precise-object-edit. Asset filename: cheek__mole. Image 1 is the base sheet: 12 bald characters in bodysuits (3 rows x 4 columns: front, side facing left, back) on a solid #00FF00 background. The 4 front-facing characters in the top row have blank faces.
Image 2 are reference sheets with labeled faces: eyes, eyebrows, mouths and cheek marks.

For each item: edit Image 1 only. Only on the 4 front-facing characters (top row), draw exactly the given face part from the given reference image, at the natural position on the face, with the same size, color and pixel-art style. Every top-row character gets exactly the same part. Draw nothing else on the face.
Rules for every image: do NOT change the side and back rows at all. Do NOT move, resize or redraw anything else. Keep the solid #00FF00 background. Same canvas size as Image 1. Crisp pixels, no anti-aliasing. Every image starts again from the original Image 1, never from a previous result.

REFERENCE LOCATION: In Image 2, count all thumbnails including the blank default at first position. Target is row 1, column 5, labeled 점 (입 근처). Copy ONLY cheek marks. No hair, no other face parts, no nose, no expression beyond requested part. Base heads must stay completely bald. Only top-row FOUR front faces receive this part; other EIGHT sprites are untouched.
CRITICAL CORRECTION: On each of the four front faces draw exactly ONE SINGLE very small dark brown beauty mark dot (one tiny square pixel cluster, no separate dots), low on the viewer-right cheek beside where the mouth would be. Exactly one dot per face. NOT freckles, NOT a cluster, NOT a mouth, NO second mark.
MAKE ONLY THIS ONE ITEM: cheek__mole — Image 2 — label: 점 (입 근처) — person or part: cheek marks.
Only Image 1 is the edit target. Other images are references only. Output a single 1536x1024 sprite sheet preserving the exact base character placement, poses, bald blank faces except for requested hair or face part, and solid #00FF00 background. DIRECTION LOCK: TOP ROW ALL FOUR heads FRONT facing with blank face and both ears. MIDDLE ROW ALL FOUR heads face LEFT with visible profile and ear on right; never right-facing. BOTTOM ROW ALL FOUR heads BACK facing with both ears and no face. Never rotate any head or change any pose. No labels, text, grids or borders. Never mix designs from other reference labels. Each pair has man/groom at LEFT and woman/bride at RIGHT. For face parts add only the requested part to top four faces, leave other two rows identical.


