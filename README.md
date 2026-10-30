# 💌 픽셀 방명록

하객이 셀카 한 장을 올리면 닮은 픽셀 캐릭터가 생기고, 축하 한마디를 남기면 식장 스크린의 꽃길로 걸어 들어오는 결혼식 방명록이에요.

## 실행

Node.js 18 이상만 있으면 돼요. 설치할 패키지는 없어요.

```
node server.js
```

윈도우에서는 `start.bat`을 더블클릭해도 돼요.

| 화면 | 주소 | 용도 |
|---|---|---|
| 식장 스크린 | `http://localhost:3000/screen.html` | 식장 화면/빔프로젝터에 띄워요 |
| 하객 입장 | `http://<PC의 IP>:3000/guest.html` | 스크린 구석의 QR로 들어와요 |
| 관리 | `http://localhost:3000/admin.html` | 메시지 삭제, 엑셀(CSV) 저장 |
| 데모 | `http://localhost:3000/screen.html?demo=16` | 가짜 하객 미리보기 (저장 안 됨) |

## 결혼식 정보 바꾸기 — `config.json`

```json
{
  "groom": { "name": "민준" },
  "bride": { "name": "서연" },
  "date": "2026.12.12",
  "title": "우리의 결혼식에 와줘서 고마워요",
  "coupleMessages": ["오늘 정말 행복해요!"],
  "photoMilestone": 50,
  "publicUrl": ""
}
```

관리자 키는 저장소에 올라가지 않도록 `config.json`이 아니라 **`secret.json`** 에 따로 둬요.
`secret.example.json` 을 `secret.json` 으로 복사한 뒤 `adminKey` 를 바꾸세요. (환경 변수 `ADMIN_KEY` 로 줘도 돼요.)

- 신랑·신부 캐릭터 외형도 바꿀 수 있어요. 예: `"groom": { "name": "민준", "look": { "hair": "#5a3a28", "hairStyle": "fluffy", "glasses": "glasses" } }`
  - `hairStyle`: `short` `side` `fluffy` `curtain` `long` `bob` `ponytail` `bun`
  - `glasses`: `none` `glasses` `sunglasses`
- 저장하고 스크린을 새로고침하면 반영돼요.

- `photoMilestone`: 하객이 이 숫자의 배수(50, 100, 150…)가 될 때마다 자동으로 단체사진을 찍어요. `0`이면 꺼져요.

## 스크린 단축키

`F` 전체화면 · `Q` QR 숨기기 · `T` 제목/인원 숨기기 · `P` 단체사진 찍기 · `S` 마지막 단체사진 PNG로 저장 · `D` 데모 하객 한 명 · `H` 도움말

## 하객이 많아져도 깔끔하게

- **신랑측은 왼쪽, 신부측은 오른쪽** 잔디에 모이고, 몇 명씩 친구 무리를 지어 서로 바라보며 서 있어요. 사람이 많을수록 덜 돌아다녀요.
- **이름표는 필요한 사람만**: 35명이 넘으면 방금 입장한 사람, 말하는 사람, 카메라가 비추는 사람만 이름이 보여요. 5초마다 무리 하나씩 돌아가며 이름이 떠요.
- **말풍선은 겹치지 않게** 위로 쌓이고, 동시에 최대 4개까지만 떠요.
- **카메라 연출**: 새 하객이 들어오면 잠깐 클로즈업해서 따라가요. 연달아 들어오면 클로즈업을 쉬고 전체 화면을 보여줘요. 한동안 조용하면 하객 한 명을 골라 메시지와 함께 비춰요.
- **정원 넓히기**: 60명, 120명, 200명을 넘을 때마다 화면이 부드럽게 멀어지면서 정원이 넓어져요.
- **단체사진**: 모두가 신랑·신부 앞으로 모여 줄을 서고, 카메라가 다가간 뒤 3·2·1 카운트다운과 함께 찰칵 찍혀요. 찍힌 사진은 폴라로이드로 잠깐 떠요. `S`를 누르면 PNG로 저장돼요.

데모로 확인: `http://localhost:3000/screen.html?demo=150` 를 열고 `P`를 눌러 보세요.

## 하객 캐릭터 꾸미기 (그림 부품)

`public/parts/` 에 그림 부품이 있으면 하객 화면이 "꾸미기" 방식으로 바뀌어요 (없으면 예전 도트 후보 방식).
옷 42벌(원피스·한복 포함) · 눈 11 · 입 7 · 볼 4 · 머리색 10 · 피부색 6 · 반려동물(말티즈·고양이). 셀카에서 읽은 색으로 가장 비슷한 조합을 미리 골라 둬요.

부품은 AI로 만든 초록 배경 시트에서 스크립트로 오려내요 (`parts-raw/` → `tools/`):

```
python tools/split_sheet.py parts-raw/sheet_outfit.webp work/outfit
python tools/cut_bodies.py work/outfit
python tools/split_sheet.py parts-raw/sheet_eyes.webp work/eyes --no-split   (mouth, cheek 도 같은 방법)
python tools/face_parts.py
python tools/split_sheet.py parts-raw/sheet_dress.webp work/dress
python tools/cut_bodies.py work/dress --set dress
python tools/skin_masks.py
python tools/pets.py
python tools/clean_bodies.py     # 몸통 가장자리 정리 (어깨 빈자리 채우기, 가는 조각 제거)
python tools/walk_frames.py      # 걷기 시트 → 4방향 8프레임 (하객 옷 색으로 다시 칠해서 사용)
python tools/split_sheet.py parts-raw/sheet_hair_m.webp work/hair_m   # 남자 머리 시트
python tools/split_sheet.py parts-raw/sheet_hair_f.webp work/hair     # 여자 머리 시트
python tools/hair_heads.py       # 머리 31종 (안경·눈·입을 지운 맨얼굴 머리)
python tools/walk_heads.py       # 걷기용 옆·뒷모습 머리
```

걸을 때는 걷기 시트의 프레임(남자 셔츠+바지 / 여자 원피스 틀)을 하객이 고른 옷 색·피부색으로 칠하고 머리를 얹어요.
서 있을 때는 고른 옷 그림 그대로 보여요.

시트 만드는 프롬프트는 `prompts/` 폴더에 있어요.

## 캐릭터 그림 (기준 시트 방식)

지금 쓰는 그림은 **v5**(`parts-raw/v5/`, 신랑·신부와 같은 그림체)예요. 모든 시트는 기준 시트(`base.webp`, 마네킹 3방향×4걸음)를 AI로 **수정**해서 만든 것이라 위치가 맞아요.
옷 42 · 머리 30 · 눈 11(옆눈 포함) · 눈썹 6 · 입 7 · 볼 4. 프롬프트: `prompts/v5-batch.md`
시트를 추가하거나 바꾸면 아래 명령으로 다시 만들어요 (전부는 10분쯤). 마지막 줄은 파일 크기를 1/5로 줄여요.

```
PARTS_SET=v5 python tools/v2_parts.py              # 전부
PARTS_SET=v5 python tools/v2_parts.py eyes         # 눈만 (hair, outfit, mouth … 도 같은 방식)
PARTS_SET=v5 python tools/v2_parts.py hair__long   # 한 장만
python tools/shrink_parts.py v5                    # 256색으로 줄이기 (다시 만든 뒤 꼭)
```

예전 그림(v2, 귀여운 체형)은 주소 끝에 `?parts=v2` 를 붙이면 보여요.
이름표는 `public/js/avatar.js` 의 `V5_LABELS` 에서 바꿔요.
하객 휴대폰은 처음에 앞모습 그림(약 0.8MB)만 받고, 걷는 그림은 필요할 때 받아요.

## 식장에서 쓰는 방법

하객 휴대폰이 서버에 접속할 수 있어야 해요. 두 가지 방법이 있어요.

1. **같은 와이파이** — 스크린 PC와 하객이 같은 와이파이에 있으면 QR이 자동으로 PC의 내부 IP를 가리켜요. 식장 와이파이는 기기 간 접속을 막아 두는 경우가 많으니 **미리 꼭 확인**하세요. 휴대폰 핫스팟에 PC를 연결하는 방법도 있지만 하객이 그 핫스팟에 붙어야 해서 불편해요.
2. **인터넷에 올리기 (권장)** — Render, Railway, Fly.io 같은 Node 호스팅에 이 폴더를 올리고 `config.json`의 `publicUrl`에 주소를 적으면 QR이 그 주소로 바뀌어요. 하객은 LTE로도 들어올 수 있어요. 무료 플랜은 재시작하면 `data/`가 지워질 수 있으니 예식이 끝나면 관리 화면에서 CSV로 꼭 저장하세요.

## 개인정보

- 사진은 서버로 전송되지 않아요. 휴대폰 브라우저 안에서 머리·피부·옷 색만 읽고 버려요.
- 서버에는 이름, 메시지, 캐릭터 색 정보만 `data/guests.json`에 저장돼요.

## 파일 구조

```
server.js          정적 파일 + API + 실시간(SSE) 서버
config.json        신랑·신부 이름, 날짜, 관리자 키
data/guests.json   방명록 데이터
public/
  guest.html       하객 화면 (셀카 → 캐릭터 고르기 → 이름 → 메시지)
  screen.html      식장 스크린
  admin.html       관리
  js/sprite.js     픽셀 캐릭터 생성기
  js/scene.js      꽃길 예식장 장면
```
