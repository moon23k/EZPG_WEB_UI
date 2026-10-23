import NextLink from "next/link";
import type { Business } from "../../types";

const link = "ez:text-fg ez:no-underline ez:hover:underline";

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
  const legal: [string, string][] = business
    ? [
        ["상호", business.name],
        ["대표", business.ceo_name],
        ["주소", business.address],
        ["사업자등록번호", business.registration_no],
        ["통신판매업 신고", business.mail_order_no ?? "-"],
        ["고객센터", business.cs_phone ?? "-"],
        ["이메일", business.cs_email ?? "-"],
        ["호스팅 제공", hosting],
      ]
    : [];
  return (
    <footer data-slot="site-footer" className="ez:grid ez:gap-4 ez:bg-surface-alt ez:px-page ez:py-8 ez:text-[0.8rem] ez:text-muted">
      {closing && <p className="ez:m-0 ez:text-sm ez:text-fg">{closing}</p>}
      <nav aria-label="약관" className="ez:flex ez:flex-wrap ez:gap-x-4 ez:gap-y-1">
        {policies.map((p) => (
          <NextLink key={p.key} href={policyHref(p.key)} className={link}>
            {p.title}
          </NextLink>
        ))}
        <NextLink href={lookupHref} className={link}>
          비회원 주문 조회
        </NextLink>
      </nav>
      {business ? (
        <dl className="ez:m-0 ez:flex ez:flex-wrap ez:gap-x-3 ez:gap-y-0.5">
          {legal.map(([label, value]) => (
            <div key={label} className="ez:flex ez:gap-1">
              <dt>{label}</dt>
              <dd className="ez:m-0">{value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="ez:m-0">
          {storeName} · 사업자 정보 준비 중 · 호스팅 제공 {hosting}
        </p>
      )}
    </footer>
  );
}
