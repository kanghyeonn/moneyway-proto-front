# Money Way

Money Way는 국내 주식 시장 데이터를 탐색하기 위한 Expo 기반 모바일 앱입니다. 현재 앱은 주도 섹터/테마 흐름과 발견 화면의 실시간 랭킹 데이터를 로컬 FastAPI 백엔드에서 조회해 표시합니다.

## Tech Stack

- Expo SDK 56
- Expo Router
- React Native 0.85
- React 19
- TypeScript
- FastAPI backend 연동

## 주요 화면

### 주도 섹터 / 주도 테마

`src/app/(tabs)/(flow)` 경로에 구현되어 있습니다.

- 당일 주도 섹터/테마
- 일자별 주도 섹터/테마
- 주도 점수 랭킹
- 상승/하락 섹터 또는 테마 수
- TOP 섹터/테마 종목
- pull to refresh API 재조회

API 계층은 `src/api/flow.ts`에서 관리합니다.

### 발견

`src/app/(tabs)/(find)` 경로에 구현되어 있습니다.

- 거래대금 상위
- 거래량 상위
- 급상승 상위
- 급하락 상위
- 시장 요약
- 상승/하락 종목 수
- 인기 검색 종목
- pull to refresh API 재조회

API 계층은 `src/api/find.ts`에서 관리합니다.

## 프로젝트 구조

```text
src/
  api/
    client.ts       # 공통 fetch client
    flow.ts         # 주도 섹터/테마 API
    find.ts         # 발견 화면 API
  app/
    (tabs)/
      (flow)/       # 주도 섹터/테마 탭
      (find)/       # 발견 탭
      (home)/       # 뉴스 탭
      interest.tsx  # 관심 탭
  components/
    flow/
    find/
```

## 환경 변수

앱은 `EXPO_PUBLIC_API_BASE_URL`을 사용해 백엔드 API 주소를 결정합니다.

로컬 개발용 예시는 [.env.example](./.env.example)에 있습니다.

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000
```

iOS 시뮬레이터와 웹에서는 보통 `localhost:8000`을 사용할 수 있습니다.

Android 에뮬레이터에서 로컬 FastAPI에 접근하려면 일반적으로 아래 주소를 사용합니다.

```env
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:8000
```

실기기에서 테스트할 경우 Mac의 로컬 네트워크 IP를 사용해야 합니다.

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.x.x:8000
```

## 로컬 실행

의존성을 설치합니다.

```bash
npm install
```

환경 변수를 준비합니다.

```bash
cp .env.example .env
```

FastAPI 서버를 로컬에서 실행합니다. 실기기 접근까지 고려한다면 `0.0.0.0`으로 띄우는 것이 좋습니다.

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Expo 앱을 실행합니다.

```bash
npm start
```

환경 변수를 변경했거나 캐시 문제를 의심할 때는 캐시를 지우고 실행합니다.

```bash
npx expo start -c
```

## Scripts

```bash
npm start
npm run ios
npm run android
npm run web
npm run lint
```

## API 연동

공통 API 클라이언트는 [src/api/client.ts](./src/api/client.ts)에 있습니다.

- `EXPO_PUBLIC_API_BASE_URL` 기준으로 URL 생성
- query parameter 처리
- 공통 `fetchJson` 제공

화면별 API 매핑은 아래 파일에서 관리합니다.

- [src/api/flow.ts](./src/api/flow.ts)
- [src/api/find.ts](./src/api/find.ts)

프론트 화면에서 사용하는 데이터 타입으로 변환하는 포맷팅도 API 계층에서 처리합니다. 예를 들어 가격, 거래대금, 등락률, 방향값을 화면 표시 형태로 변환합니다.

## 참고

- `.env`는 커밋하지 않습니다.
- `.env.example`은 공유 가능한 기본 설정만 둡니다.
- `docs/`, `img/`, `.expo/`, `ios/`, `android/`는 현재 `.gitignore`에 포함되어 있습니다.
