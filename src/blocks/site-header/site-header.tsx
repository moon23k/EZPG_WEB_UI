import NextLink from "next/link";

const nav = "ez:inline-flex ez:min-h-11 ez:items-center ez:text-fg ez:no-underline ez:hover:underline";

export function SiteHeader({
  name,
  logoUrl,
  cartCount,
  signedIn,
}: {
  name: string;
  logoUrl?: string | null;
  cartCount?: number;
  signedIn?: boolean;
}) {
  return (
    <header
      data-slot="site-header"
      className="ez:sticky ez:top-0 ez:z-10 ez:flex ez:items-center ez:justify-between ez:gap-3 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:bg-surface ez:px-page ez:py-3"
    >
      <NextLink href="/" className="ez:truncate ez:font-display ez:font-title ez:text-lg ez:text-fg ez:no-underline">
        {logoUrl ? <img src={logoUrl} alt={name} className="ez:block ez:h-9 ez:w-auto" /> : name}
      </NextLink>
      <nav aria-label="주요 메뉴" className="ez:flex ez:shrink-0 ez:gap-4 ez:text-[0.95rem]">
        <NextLink href="/products" className={nav}>
          상품
        </NextLink>
        <NextLink href={signedIn ? "/me" : "/login"} className={nav}>
          {signedIn ? "내 정보" : "로그인"}
        </NextLink>
        <NextLink href="/cart" className={nav}>
          장바구니
          {cartCount ? (
            <span className="ez:ml-1 ez:rounded-full ez:bg-primary ez:px-1.5 ez:text-xs ez:text-on-primary">{cartCount}</span>
          ) : null}
        </NextLink>
      </nav>
    </header>
  );
}
