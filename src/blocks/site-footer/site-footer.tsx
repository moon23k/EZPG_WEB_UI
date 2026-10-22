import type { Business } from "../../types";

export function SiteFooter({
  storeName,
  business,
  hosting,
  policies,
  closing,
}: {
  storeName: string;
  business: Business | null;
  hosting: string;
  policies: { key: string; title: string }[];
  closing?: string | null;
}) {
  return (
    <footer className="ez-footer">
      {closing && <p className="ez-footer__closing">{closing}</p>}
      <nav className="ez-footer__links" aria-label="약관">
        {policies.map((p) => (
          <a key={p.key} href={`/policy/${p.key}`}>
            {p.title}
          </a>
        ))}
        <a href="/orders/lookup">비회원 주문 조회</a>
      </nav>
      {business ? (
        <dl className="ez-footer__legal">
          <div><dt>상호</dt><dd>{business.name}</dd></div>
          <div><dt>대표</dt><dd>{business.ceo_name}</dd></div>
          <div><dt>주소</dt><dd>{business.address}</dd></div>
          <div><dt>사업자등록번호</dt><dd>{business.registration_no}</dd></div>
          <div><dt>통신판매업 신고</dt><dd>{business.mail_order_no ?? "-"}</dd></div>
          <div><dt>고객센터</dt><dd>{business.cs_phone ?? "-"}</dd></div>
          <div><dt>이메일</dt><dd>{business.cs_email ?? "-"}</dd></div>
          <div><dt>호스팅 제공</dt><dd>{hosting}</dd></div>
        </dl>
      ) : (
        <p className="ez-footer__legal">{storeName} · 사업자 정보 준비 중 · 호스팅 제공 {hosting}</p>
      )}
    </footer>
  );
}
