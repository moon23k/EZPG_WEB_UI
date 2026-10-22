import type { SectionProps } from "../../renderer/registry";

export function Hero({ data }: SectionProps) {
  const title = data.title as string | null;
  if (!title) return null;
  return (
    <section className="ez-hero">
      <h1 className="ez-hero__title">{title}</h1>
      {typeof data.sub === "string" && <p className="ez-hero__sub">{data.sub}</p>}
      <a className="ez-btn ez-btn--primary" href="/products">
        {(data.button as string | null) ?? "상품 보기"}
      </a>
    </section>
  );
}
