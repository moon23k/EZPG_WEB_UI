import { ButtonLink } from "../../components/button";
import type { SectionProps } from "../../renderer/registry";

export function Hero({ data }: SectionProps<"hero">) {
  if (!data.title) return null;
  return (
    <section data-slot="hero" className="ez:grid ez:justify-items-start ez:gap-4 ez:py-8 ez:text-fg">
      <h1 className="ez:m-0 ez:max-w-3xl ez:font-display ez:font-title ez:text-3xl ez:leading-tight ez:tracking-brand ez:text-balance ez:md:text-5xl">
        {data.title}
      </h1>
      {data.sub && <p className="ez:m-0 ez:max-w-2xl ez:text-lg ez:text-muted">{data.sub}</p>}
      <ButtonLink href={data.href ?? "/products"}>{data.button ?? "상품 보기"}</ButtonLink>
    </section>
  );
}
