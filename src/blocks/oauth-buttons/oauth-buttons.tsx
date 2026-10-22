const PROVIDERS = [
  { key: "kakao", label: "카카오로 시작하기" },
  { key: "naver", label: "네이버로 시작하기" },
  { key: "google", label: "Google로 시작하기" },
];

export function OAuthButtons({ next }: { next?: string }) {
  const query = next ? `?next=${encodeURIComponent(next)}` : "";
  return (
    <div className="ez-oauth">
      {PROVIDERS.map((p) => (
        <a key={p.key} className={`ez-btn ez-btn--secondary ez-btn--block ez-oauth--${p.key}`} href={`/api/auth/${p.key}/start${query}`}>
          {p.label}
        </a>
      ))}
    </div>
  );
}
