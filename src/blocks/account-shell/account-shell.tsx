import NextLink from "next/link";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

const TABS = [
  { href: "/me", label: "내 정보" },
  { href: "/orders", label: "주문 내역" },
  { href: "/me/reviews", label: "후기" },
  { href: "/me/addresses", label: "배송지" },
];

export function AccountShell({ current, children }: { current: string; children: ReactNode }) {
  return (
    <div data-slot="account-shell" className="ez:grid ez:gap-5">
      <nav
        aria-label="내 계정"
        className="ez:flex ez:gap-4 ez:overflow-x-auto ez:border-0 ez:border-b ez:border-solid ez:border-primary-border"
      >
        {TABS.map((t) => (
          <NextLink
            key={t.href}
            href={t.href}
            aria-current={t.href === current ? "page" : undefined}
            className={cn(
              "ez:-mb-px ez:whitespace-nowrap ez:border-0 ez:border-b-2 ez:border-solid ez:border-transparent ez:py-2.5 ez:text-fg ez:no-underline",
              "ez:aria-[current=page]:border-primary ez:aria-[current=page]:font-bold",
              focusRing,
            )}
          >
            {t.label}
          </NextLink>
        ))}
      </nav>
      <div>{children}</div>
    </div>
  );
}
