import NextLink from "next/link";
import type { Business } from "../../types";
import { cn } from "../../utils/cn";

const link = "ez:inline-flex ez:min-h-10 ez:items-center ez:text-fg ez:no-underline ez:hover:underline";

// The privacy policy is set apart from the other links, as the PIPC guideline asks.
export function SiteFooter({
  storeName,
  business,
  hosting,
  policies,
  closing,
  policyHref = (key) => `/policy/${key}`,
  lookupHref = "/orders/lookup",
}: {
  storeName: string;
  business: Business | null;
  hosting: string;
  policies: { key: string; title: string }[];
  closing?: string | null;
  policyHref?: (key: string) => string;
  lookupHref?: string;
}) {
  // Items without a value are left out rather than shown as "-".
  const legal = (
    [
      ["상호", [business?.name || storeName, business?.ceo_name && `대표 ${business.ceo_name}`].filter(Boolean).join(" · ")],
      ["주소", business?.address],
      ["사업자등록번호", business?.registration_no],
      ["통신판매업 신고", business?.mail_order_no],
      ["고객센터", business?.cs_phone],
      ["이메일", business?.cs_email],
    ] as [string, string | null | undefined][]
  ).filter((row): row is [string, string] => Boolean(row[1]));
  return (
    <footer data-slot="site-footer" className="ez:bg-surface-alt ez:text-[13px] ez:text-muted">
      <div className="ez:mx-auto ez:grid ez:max-w-270 ez:gap-3 ez:px-page ez:pt-4 ez:pb-8">
        <nav aria-label="약관" className="ez:flex ez:flex-wrap ez:gap-x-4">
          {policies.map((p) => (
            <NextLink key={p.key} href={policyHref(p.key)} className={cn(link, p.key === "privacy" && "ez:font-bold")}>
              {p.title}
            </NextLink>
          ))}
          <NextLink href={lookupHref} className={link}>
            비회원 주문 조회
          </NextLink>
        </nav>
        <dl className="ez:m-0 ez:grid ez:max-w-180 ez:grid-cols-[auto_minmax(0,1fr)] ez:gap-x-4 ez:gap-y-1 ez:leading-normal">
          {legal.map(([label, value]) => (
            <div key={label} className="ez:contents">
              <dt>{label}</dt>
              <dd className="ez:m-0 ez:text-fg">{value}</dd>
            </div>
          ))}
        </dl>
        {closing && <p className="ez:m-0">{closing}</p>}
        <p className="ez:m-0">호스팅 제공 {hosting}</p>
      </div>
    </footer>
  );
}
