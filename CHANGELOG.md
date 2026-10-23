# Changelog

## 0.1.0 (미배포)

첫 공개 API. 아래 export는 0.x 동안 이름과 필수 props를 바꾸지 않는다. 추가는 선택 prop으로만 한다.

- theme: `ThemeRoot`, `designVars`, `fontHref`
- components: `Button`, `ButtonLink`, `buttonVariants`, `Field`, `Input`, `TextArea`, `Quantity`, `Price`, `Photo`, `Dialog`, `Sheet`, `Checkbox`, `Badge`, `EmptyState`, `Link`
- blocks: `SiteHeader`, `SiteFooter`, `ProductCard`, `ProductGrid`, `BuyBox`, `CartLine`, `CartView`, `OrderSummary`, `AddressForm`, `ConsentForm`, `CheckoutLayout`, `PayWidget`, `OrderList`, `OrderDetail`, `GuestLookupForm`, `ReviewForm`, `ReviewList`, `AddressBook`, `PolicyDoc`, `AccountShell`, `OAuthButtons`, `ClaimForm`
- constants: `STATUS_LABEL`, `ORDER_ACTIONS`, `GUEST_PRIVACY_TEXT`
- renderer: `SiteRenderer`, `sections`
- utils: `cn`, `won`, `kstDate`
- types: `src/types`의 모든 타입(장바구니 줄 타입은 `CartLineData`, 컴포넌트 `CartLine`과 이름이 겹치지 않게), `AddressValue`, `PayRequest`, `OrderRow`, `OrderAction`, `OrderView`, `OrderItemView`, `ReviewItem`, `AddressRow`, `SiteContext`, `SectionProps`, `SectionData`, `SectionKind`
- styles: `@ezpg/web-ui/styles.css`
