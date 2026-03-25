# K-SENSUAL Landing (Vite + React + TypeScript + Tailwind)

정적 호스팅 배포 가능한 SPA 이벤트 랜딩 사이트입니다.

## CMS 핵심 요약

GitHub Pages 정적 사이트에서 JSONbin.io 데이터를 읽어 메인 페이지를 렌더링하고, `/admin` 에서 서비스 상태와 raw JSON을 직접 수정할 수 있도록 구성되어 있습니다.

## CMS 폴더 구조

```text
src/
  api/
    jsonbin.ts
  components/
    cms/
      MaintenanceScreen.tsx
      SitePreview.tsx
  pages/
    AdminPage.tsx
    HomePage.tsx
  utils/
    cms.ts
```

## CMS JSON 예시

```json
{
  "status": "OPEN",
  "main": {
    "title": "K-SENSUAL",
    "subtitle": "Editable GitHub Pages CMS powered by JSONbin.io",
    "heroImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80"
  },
  "sections": [
    {
      "id": "lineup",
      "title": "Lineup Highlights",
      "body": "Update this section from the admin page without redeploying the static site.",
      "image": "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
      "ctaLabel": "View Lineup",
      "ctaUrl": "/lineup"
    }
  ]
}
```

## CMS 환경 변수

`.env.local`

로컬에서 `localStorage` 테스트:

```bash
VITE_CMS_STORAGE=local
VITE_ADMIN_PASSWORD=CHANGE_ME
```

로컬에서 실제 JSONbin 테스트:

```bash
VITE_CMS_STORAGE=jsonbin
VITE_JSONBIN_BIN_ID=YOUR_BIN_ID
VITE_JSONBIN_API_KEY=YOUR_JSONBIN_MASTER_KEY
VITE_ADMIN_PASSWORD=CHANGE_ME
```

## CMS 실행 방법

```bash
npm install
npm run dev
```

공개 페이지:

- `http://localhost:5173/ksensual/`

관리자 페이지:

- `http://localhost:5173/ksensual/admin`

## CMS 동작 방식

- 메인 페이지는 `src/api/jsonbin.ts` 의 `fetchCmsContent()` 로 JSONbin 최신 데이터를 조회합니다.
- 로컬 개발 환경(`localhost`)에서는 기본적으로 `localStorage` 를 CMS 저장소처럼 사용합니다.
- 필요하면 `VITE_CMS_STORAGE=local` 또는 `VITE_CMS_STORAGE=jsonbin` 으로 저장소를 강제할 수 있습니다.
- `status === "MAINTENANCE"` 이면 전체 사이트를 점검 화면으로 전환합니다.
- `/admin` 에서는 상태 토글, raw JSON 편집, JSON validation, 저장 전 미리보기를 제공합니다.
- 저장은 JSONbin `PUT /b/<BIN_ID>` 로 처리합니다.

## GitHub Actions Secrets

GitHub 배포 시 아래 값을 저장소에 추가하면 workflow가 자동으로 주입합니다.

- `Settings > Secrets and variables > Actions > Repository secrets`
- `JSONBIN_BIN_ID`
- `JSONBIN_API_KEY`
- `ADMIN_PASSWORD`

## CMS 보안 참고

- 정적 사이트에서는 `VITE_` 환경 변수 값이 브라우저 번들에 포함되므로 API Key가 노출됩니다.
- 최소한의 대응책:
  - `/admin` 같은 별도 경로 사용
  - `VITE_ADMIN_PASSWORD` 로 간단한 1차 인증
  - 공개용/관리용 JSONbin 분리
- 실제 운영에서 쓰기 보안을 강화하려면 서버리스 함수로 저장 요청을 우회하고, Master Key는 서버에만 두는 것이 안전합니다.

## 1) 프로젝트 생성 명령 + 패키지 설치

```bash
npm create vite@latest ksensual -- --template react-ts
cd ksensual
npm install
npm install react-router-dom framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
```

실행:

```bash
npm run dev
```

빌드:

```bash
npm run build
```

## 2) Tailwind 설정

- `tailwind.config.ts`에서 `content`를 `./index.html`, `./src/**/*.{ts,tsx}`로 설정
- `postcss.config.js`에 `tailwindcss`, `autoprefixer` 설정
- `src/styles/globals.css`에 `@tailwind base/components/utilities` 적용

## 3) 라우팅 구성(App/Routes)

- `/` 랜딩 전체 섹션
- `/artists` 라인업 전체 + 필터/검색
- `/tickets` 티켓 상세
- `/faq` FAQ 모아보기

라우터는 `src/App.tsx`에서 `react-router-dom`으로 구성.

## 4) 데이터 소스

모든 콘텐츠 데이터는 `src/data/event.ts`에 집중:

- `eventMeta`, `highlights`, `artists`, `schedule`, `tickets`, `faq`, `gallery`, `contact`
- 페이지/섹션은 해당 데이터 기반 렌더링

## 5) UI 컴포넌트

`src/components/ui/`:

- `Button`, `Card`, `Modal`, `Tabs`, `Accordion`, `Input`, `Badge`

shadcn/ui 의존 없이 최소 재사용 컴포넌트만 직접 구현.

## 6) 랜딩 섹션

`/`에 순서대로 구성:

1. Hero (K-SENSUAL, CTA, Countdown)
2. Highlights
3. Line-up Preview + 모달
4. Schedule + Day Tabs + ICS 다운로드
5. Tickets Preview
6. Venue (지도 placeholder + URL)
7. Gallery + 라이트박스
8. FAQ Preview
9. Contact (email validation + success message)

## 7) 정적 호스팅 배포

- `npm run build` 후 `dist/` 업로드

### SPA 라우팅 새로고침 404 해결

- Netlify: `_redirects`
  - `/* /index.html 200`
- Cloudflare Pages:
  - 프로젝트 설정에서 SPA fallback(`index.html`) 활성화
  - 필요 시 `_routes.json`으로 라우트 허용 구성
- GitHub Pages:
  - `404.html`을 `index.html` 복제 fallback으로 사용
  - 또는 `HashRouter` 사용
- S3/CloudFront:
  - Error document/Custom error response를 `index.html`로 매핑

## 8) 도메인 연결 기본

- `www`는 `CNAME` 사용
- 루트 도메인은 DNS 제공자 기준 `A`/`ALIAS`/`ANAME` 사용
- HTTPS 인증서(플랫폼 자동 발급) 적용 후 강제 HTTPS 활성화

## 9) 교체 포인트

- 행사 데이터 교체: `src/data/event.ts`
- 색/타이포: `tailwind.config.ts`, `src/styles/globals.css`
- 지도 임베드: Home의 Venue placeholder를 iframe으로 대체

## 10) 초급자용 컴포넌트 읽는 순서

처음 코드를 읽는 경우, 아래 순서로 보면 구조를 빠르게 이해할 수 있습니다.

1. 앱 뼈대 파악
- `src/main.tsx`: BrowserRouter 연결과 전역 스타일 로딩
- `src/App.tsx`: 라우트(`/`, `/artists`, `/tickets`, `/faq`)와 공통 레이아웃

2. 공통 UI 먼저 이해
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Modal.tsx`
- `src/components/ui/Tabs.tsx`
- `src/components/ui/Accordion.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Badge.tsx`

3. 데이터 구조 확인
- `src/data/event.ts`: 화면 콘텐츠의 단일 소스

4. 페이지 섹션 흐름 보기
- `src/components/Hero.tsx`
- `src/components/Highlights.tsx`
- `src/components/ArtistGrid.tsx` (+ `ArtistCard.tsx`)
- `src/components/Schedule.tsx` (+ `IcsDownload.tsx`)
- `src/components/TicketsSection.tsx`
- `src/components/Gallery.tsx`
- `src/components/FAQSection.tsx`
- `src/components/Contact.tsx`

5. 페이지별 조합 확인
- `src/routes/Home.tsx`
- `src/routes/Artists.tsx`
- `src/routes/Tickets.tsx`
- `src/routes/Faq.tsx`

## ICS 다운로드 검증 포인트

- Day 탭 전환 시 선택 Day 세션만 `.ics` 생성
- 파일명 `k-sensual-{dayId}.ics`
- 캘린더 앱 import 시 세션 제목/시간/장소 노출 확인

## 11) GitHub Pages (`github.io/ksensual`) 배포

이 저장소는 `https://<GitHubID>.github.io/ksensual/` 기준으로 동작하도록 설정되어 있습니다.

적용된 설정:
- `vite.config.ts`의 `base: '/ksensual/'`
- `BrowserRouter basename={import.meta.env.BASE_URL}`
- GitHub Actions 배포 워크플로우: `.github/workflows/deploy-gh-pages.yml`
- SPA 새로고침 404 대응:
  - `public/404.html`에서 `/ksensual/<route>` 요청을 `/ksensual/?/<route>`로 리다이렉트
  - `index.html`의 스크립트가 `?/<route>`를 원래 경로로 복원

최초 1회 설정:
1. GitHub 저장소 → `Settings` → `Pages`
2. `Build and deployment`의 Source를 `GitHub Actions`로 선택
3. `main` 브랜치에 푸시
4. Actions 완료 후 배포 URL 확인

예상 URL:
- `https://nikuBS.github.io/ksensual/`
