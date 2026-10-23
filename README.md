# @ezpg/web-ui

EZPG 스토어프론트용 Next.js UI 킷. EZPG가 생성한 상점 사이트(손님 웹)를 그리는 컴포넌트, 커머스 블록, 섹션 렌더러를 담는다.

## 층 구분

| 층 | 위치 | 성격 |
|---|---|---|
| theme | `src/theme` | 범용. EZPG Design JSON을 CSS 변수로 바꾼다 |
| components | `src/components` | 범용. Button, Field, Dialog, Sheet 등 |
| blocks | `src/blocks` | EZPG 종속. 계약 타입, 서버 액션 props, 토스 결제, 한국 법정 표기 |
| sections · renderer | `src/sections`, `src/renderer` | EZPG 종속. 사이트 JSON의 섹션 kind를 그린다 |

## 설치와 연결

```tsx
// app/layout.tsx
import "@ezpg/web-ui/styles.css";
import { ThemeRoot } from "@ezpg/web-ui";

<ThemeRoot design={site.frame.design}>{children}</ThemeRoot>;
```

- 필요 peer: `next >=16`, `react >=19`, `radix-ui ^1.4`.
- `styles.css`는 빌드된 CSS(`dist/styles.css`)다. 쓰는 앱에 Tailwind가 없어도 된다. 패키지를 고치면서 앱을 띄울 때는 `npm run dev:css`를 켜 둔다.
- 패키지 클래스는 `ez:` 접두사(`ez:bg-primary`)라 앱의 Tailwind 클래스와 섞이지 않는다. 패키지 CSS는 `components` 레이어에 있어 앱의 `utilities`가 항상 이긴다.
- 컴포넌트는 `className`으로 덮어쓸 수 있고, 각 요소에 `data-slot`이 붙어 있다.

## 테마

`ThemeRoot`가 Design JSON을 `:root`의 `--ezd-*` 변수로 넣고 상점 폰트를 불러온다. 팝업(Dialog, Sheet)도 같은 변수를 쓴다.

| Design 키 | 변수 | 유틸리티 예 |
|---|---|---|
| `color.primary` 등 | `--ezd-primary` | `ez:bg-primary`, `ez:text-on-primary` |
| `shape.radius_*`, `button_shape` | `--ezd-radius-*`, `--ezd-button-radius` | `ez:rounded-md`, `ez:rounded-button` |
| `font.display`, `font.body` | `--ezd-font-*` | `ez:font-display`, `ez:font-body`, `ez:font-title` |
| `density.grid_gutter`, `section_gap` | `--ezd-gutter`, `--ezd-section-gap` | `ez:gap-gutter`, `ez:gap-section` |
| `imagery.photo_ratio` | `--ezd-photo-ratio` | `ez:aspect-photo` |

## 사이트 렌더링

```tsx
import { SiteRenderer } from "@ezpg/web-ui";

<SiteRenderer page={site.pages.home} context={{ products, categories, faqs, shipping, flags }} />;
```

- 지원하는 섹션 kind는 `manifest.json`에 있다. 목록에 없는 kind는 건너뛴다.
- 섹션별 data 타입은 `SectionData`(`src/renderer/registry.ts`)이고, EZPG_API `brand/site/service.py`의 `_section()`과 맞춘다.
- `when`이 있는 섹션은 `context.flags[when]`이 참일 때만 그린다.

## 개발

화면 확인은 로컬 갤러리 `../EZPG_WEB_UI_GALLERY`(`npm run dev`, http://localhost:3200)에서 한다. 갤러리는 이 패키지를 소스에서 바로 읽는다.


| 명령 | 하는 일 |
|---|---|
| `npm run build` | JS(tsdown, 파일 단위) + CSS(Tailwind) 빌드, `dist` 검사 |
| `npm test` | 단위 테스트 · 조작 테스트(axe 접근성 검사 포함, 명도 대비 제외) |
| `npm run sync:contracts` | EZPG 계약에서 블록이 쓰는 스키마를 `src/types/contract.ts`로 복사 |
| `npm run manifest` | registry에서 `manifest.json` 생성 |
| `npm run check:consumer` | 패키지 빌드 후 EZPG_WEB 타입체크 · `next build` (EZPG API가 `API_URL`, 기본 8001에 떠 있어야 함) |

- 클래스 이름을 조립하지 않는다(`` `ez:bg-${x}` `` 금지). Tailwind가 찾지 못한다.
- `src/styles/legacy.css`는 EZPG_WEB 앱 코드가 직접 쓰는 옛 `.ez-*` 클래스다. 새 코드는 쓰지 않고, 앱이 컴포넌트로 옮기면 지운다.
