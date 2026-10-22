import type { ReactNode } from "react";

const TABS = [
  { href: "/me", label: "내 정보" },
  { href: "/orders", label: "주문 내역" },
  { href: "/me/reviews", label: "후기" },
  { href: "/me/addresses", label: "배송지" },
];

export function AccountShell({ current, children }: { current: string; children: ReactNode }) {
  return (
    <div className="ez-account">
      <nav className="ez-tabs" aria-label="내 계정">
        {TABS.map((t) => (
          <a key={t.href} href={t.href} aria-current={t.href === current ? "page" : undefined}>
            {t.label}
          </a>
        ))}
      </nav>
      <div>{children}</div>
    </div>
  );
}
