import { buttonVariants } from "../../components/button";
import type { CustomerProvider } from "../../types";

const LABEL: Record<CustomerProvider, string> = {
  kakao: "카카오로 시작하기",
  naver: "네이버로 시작하기",
  google: "Google로 시작하기",
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
    <div data-slot="oauth-buttons" className="ez:grid ez:max-w-90 ez:gap-2.5">
      {providers.map((p) => (
        <a key={p} className={buttonVariants({ variant: "secondary", block: true })} href={`${startHref(p)}${query}`}>
          {LABEL[p]}
        </a>
      ))}
    </div>
  );
}
