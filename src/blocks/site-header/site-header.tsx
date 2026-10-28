import NextLink from "next/link";
import { ButtonLink } from "../../components/button";
import type { HeaderVariant } from "../../templates/types";
import { cn } from "../../utils/cn";

const ACTIONS: Record<string, { href: string; label: string }> = {
  search: { href: "/search", label: "검색" },
  class_booking: { href: "/classes", label: "수업 예약" },
  room_booking: { href: "/rooms", label: "객실 예약" },
  portfolio: { href: "/cases", label: "작업 사례" },
};

const shell: Record<HeaderVariant, string> = {
  center: "ez:border-b ez:border-primary-border ez:bg-surface",
  left: "ez:border-b ez:border-primary-border ez:bg-surface",
  transparent: "ez:bg-surface",
  dark: "ez:bg-primary",
  band: "ez:bg-primary",
  pill: "ez:bg-surface ez:pt-3",
  cta: "ez:border-b ez:border-primary-border ez:bg-surface",
};

export function SiteHeader({
  name,
  logoUrl,
  cartCount,
  signedIn,
  variant = "left",
  actions,
  cta,
}: {
  name: string;
  logoUrl?: string | null;
  cartCount?: number;
  signedIn?: boolean;
  variant?: HeaderVariant;
  actions?: string[];
  cta?: { label: string; href: string } | null;
}) {
  const inverse = variant === "dark" || variant === "band";
  const nav = cn(
    "ez:inline-flex ez:min-h-11 ez:items-center ez:no-underline ez:hover:underline",
    inverse ? "ez:text-on-primary" : "ez:text-fg",
    variant === "cta" && cta && "ez:max-md:hidden",
  );
  const extra = (actions ?? []).map((a) => ACTIONS[a]).filter(Boolean);
  const logo = (
    <NextLink
      href="/"
      className={cn(
        "ez:truncate ez:font-display ez:font-title ez:text-lg ez:no-underline",
        inverse ? "ez:text-on-primary" : "ez:text-fg",
        variant === "center" && "ez:justify-self-center ez:tracking-[0.1em]",
      )}
    >
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt={name} className="ez:block ez:h-9 ez:w-auto" />
      ) : (
        name
      )}
    </NextLink>
  );
  const menu = (
    <nav aria-label="주요 메뉴" className="ez:flex ez:shrink-0 ez:items-center ez:gap-4 ez:justify-self-end ez:text-[0.95rem]">
      {extra.length ? (
        extra.map((a) => (
          <NextLink key={a.href} href={a.href} className={cn(nav, "ez:max-md:hidden")}>
            {a.label}
          </NextLink>
        ))
      ) : (
        <NextLink href="/products" className={nav}>
          상품
        </NextLink>
      )}
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
      {variant === "cta" && cta && (
        <ButtonLink href={cta.href} size="sm">
          {cta.label}
        </ButtonLink>
      )}
    </nav>
  );
  return (
    <header data-slot="site-header" data-variant={variant} className={cn("ez:sticky ez:top-0 ez:z-10 ez:border-0 ez:border-solid", shell[variant])}>
      <div
        className={cn(
          "ez:mx-auto ez:max-w-270 ez:items-center ez:gap-3 ez:px-page ez:py-3",
          variant === "center" ? "ez:grid ez:grid-cols-[1fr_auto_1fr]" : "ez:flex ez:justify-between",
          variant === "pill" && "ez:rounded-full ez:border ez:border-solid ez:border-primary-border ez:py-2",
        )}
      >
        {variant === "center" && <span aria-hidden="true" />}
        {logo}
        {menu}
      </div>
    </header>
  );
}
