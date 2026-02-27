# K-SENSUAL Landing (Vite + React + TypeScript + Tailwind)

정적 호스팅 배포 가능한 SPA 이벤트 랜딩 사이트입니다.

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
