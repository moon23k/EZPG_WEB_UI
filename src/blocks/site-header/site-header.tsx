import NextLink from "next/link";

const nav = "ez:inline-flex ez:min-h-11 ez:items-center ez:text-fg ez:no-underline ez:hover:underline";

// The inner row shares the page column (max 1080px), so logo and nav line up with the content below.
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
      className="ez:sticky ez:top-0 ez:z-10 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:bg-surface"
    >
      <div className="ez:mx-auto ez:flex ez:max-w-270 ez:items-center ez:justify-between ez:gap-3 ez:px-page ez:py-3">
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
              <span className="ez:ml-1 ez:inline-flex ez:h-5 ez:min-w-5 ez:items-center ez:justify-center ez:rounded-full ez:bg-primary ez:px-1.5 ez:text-xs ez:font-semibold ez:tabular-nums ez:text-on-primary">
                {cartCount}
              </span>
            ) : null}
          </NextLink>
        </nav>
      </div>
    </header>
  );
}
