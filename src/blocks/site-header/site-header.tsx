export function SiteHeader({
  name,
  cartCount,
  signedIn,
}: {
  name: string;
  cartCount?: number;
  signedIn?: boolean;
}) {
  return (
    <header className="ez-header">
      <a href="/" className="ez-header__brand">
        {name}
      </a>
      <nav className="ez-header__nav" aria-label="주요 메뉴">
        <a href="/products">상품</a>
        <a href={signedIn ? "/me" : "/login"}>{signedIn ? "내 정보" : "로그인"}</a>
        <a href="/cart" className="ez-header__cart">
          장바구니
          {cartCount ? <span className="ez-header__count">{cartCount}</span> : null}
        </a>
      </nav>
    </header>
  );
}
