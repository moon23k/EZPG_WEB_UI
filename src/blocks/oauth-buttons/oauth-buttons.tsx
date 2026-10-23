import type { ReactNode } from "react";
import type { CustomerProvider } from "../../types";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

// Colours and symbols follow each provider's login button guide (Kakao, Naver, Google), not the shop theme.
const BRAND: Record<CustomerProvider, { label: string; className: string; symbol: ReactNode }> = {
  kakao: {
    label: "카카오로 시작하기",
    className: "ez:bg-[#FEE500] ez:text-[rgb(0_0_0/0.85)]",
    symbol: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5c-5 0-9 3.1-9 7 0 2.5 1.7 4.7 4.2 5.9l-.9 3.4c-.1.3.2.5.5.4l4-2.6c.4 0 .8.1 1.2.1 5 0 9-3.1 9-7s-4-7.2-9-7.2z" fill="#000000" />
      </svg>
    ),
  },
  naver: {
    label: "네이버로 시작하기",
    className: "ez:bg-[#03C75A] ez:text-[#ffffff]",
    symbol: (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 3h5.6l4.8 7.3V3H20v18h-5.6l-4.8-7.3V21H4z" fill="#ffffff" />
      </svg>
    ),
  },
  google: {
    label: "Google로 시작하기",
    className: "ez:border ez:border-solid ez:border-[#747775] ez:bg-[#ffffff] ez:text-[#1f1f1f]",
    symbol: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" fill="#4285F4" />
        <path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" fill="#34A853" />
        <path d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2z" fill="#FBBC05" />
        <path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1z" fill="#EA4335" />
      </svg>
    ),
  },
};

export function OAuthButtons({
  next,
  providers = ["kakao", "naver", "google"],
  startHref = (provider) => `/api/auth/${provider}/start`,
}: {
  next?: string;
  providers?: CustomerProvider[];
  startHref?: (provider: CustomerProvider) => string;
}) {
  const query = next ? `?next=${encodeURIComponent(next)}` : "";
  return (
    <div data-slot="oauth-buttons" className="ez:grid ez:max-w-90 ez:gap-2">
      {providers.map((p) => (
        <a
          key={p}
          href={`${startHref(p)}${query}`}
          className={cn(
            "ez:box-border ez:flex ez:h-12 ez:items-center ez:justify-center ez:gap-2 ez:rounded-xl ez:font-body ez:text-[15px] ez:font-semibold ez:no-underline",
            BRAND[p].className,
            focusRing,
          )}
        >
          {BRAND[p].symbol}
          {BRAND[p].label}
        </a>
      ))}
    </div>
  );
}
