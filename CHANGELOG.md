# @ezpg/web-ui

## 0.2.0

### Minor Changes

- 873e4ae: Select: 네이티브 select를 감싼 선택 상자 추가
- 1b2854d: 기본 색·반경·글꼴·움직임과 고정 상태색(border · danger · success · warning · info, 각 on-·tint)을 EZPG 공통 토큰 원본에서 생성한 theme/system.ts · styles/system.css로 읽음. danger `#dc2626`, 기본 반경 6 · 8 · 12.
- 9a2f0ce: `@ezpg/web-ui/core` 진입점(기본 부품 · cn · won · kstDate · designVars)과 소비 앱 Tailwind용 `@ezpg/web-ui/tokens.css`(고정 상태색 + 의미 이름 연결) 추가.
- 5e0475c: 부품 규칙 통일: Dialog · Sheet `onClose` → `onOpenChange`, Badge tone `warn` → `danger`, Button `loading`, EmptyState 선택 prop `action`, Button · Badge 이름을 공통 규칙(theme/contract.ts, design/contract.json 생성)으로 검사. 빈 부품 파일 7개 삭제, Storybook(부품 12개 스토리)과 스토리 렌더 · 접근성 테스트 추가.

### Patch Changes

- baa1a2f: danger #b91c1c(연한 빨강 바탕 위 대비 4.5:1 이상), Storybook 상점 테마 3종 전환, build가 dist를 임시 폴더에 만든 뒤 한 번에 바꿈.
- 5f081b5: G5 블록 23종 · 사이트 · 카테고리 메뉴 · 입금 안내 스토리, 장바구니 줄 사진 없을 때 링크 이름 접근성 수정
- 48fb3ba: tokens.css에 운영 글자 단계 8개(text-display · title-1 · title-2 · body · body-strong · label · caption · mono), --font-sans · --font-mono, text-disabled 추가. SYSTEM_FONT 맨 앞 Pretendard Variable.

## 0.1.0

### Minor Changes

- 8bf8bb6: 첫 공개 배포.
