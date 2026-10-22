---
"@ezpg/web-ui": minor
---

Tailwind v4 기반 빌드로 전환. `@ezpg/web-ui/styles.css`를 한 번 import하면 동작하고, 쓰는 앱에 Tailwind가 없어도 된다. 상점 디자인 런타임 변수는 `--ezd-*`로 이름이 바뀌었다. `Link`(next/link 래퍼)를 추가했고 `next >=16`이 peerDependency가 되었다.
