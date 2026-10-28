import { ButtonLink } from "../../components/button";
import type { SectionProps } from "../../renderer/registry";
import { Block, Card, Chips, Cols, Pic, Rows, Title } from "../kit";

export function PriceTiers({ data }: SectionProps<"price_tiers">) {
  const items = data.items ?? [];
  if (!items.length) return null;
  return (
    <Block slot="price-tiers">
      <Title>{data.title ?? "가격"}</Title>
      <Rows rows={items} />
    </Block>
  );
}

export function PackageCards({ data }: SectionProps<"package_cards">) {
  const items = data.items ?? [];
  if (!items.length) return null;
  return (
    <Block slot="package-cards">
      <Title>{data.title ?? "상품 · 가격"}</Title>
      {data.tabs && <Chips items={data.tabs} />}
      <Cols m={1} pc={3}>
        {items.map((p) => (
          <div key={p.name} className="ez:grid ez:content-start ez:gap-2 ez:rounded-lg ez:border ez:border-solid ez:border-primary-border ez:p-5 ez:text-fg">
            <span className="ez:text-sm ez:text-muted">{p.name}</span>
            <strong className="ez:font-display ez:text-2xl ez:font-title ez:text-primary ez:tabular-nums">{p.price}</strong>
            {p.includes && (
              <ul className="ez:m-0 ez:grid ez:gap-1 ez:pl-4 ez:text-sm">
                {p.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
            <ButtonLink href={p.href ?? "/quote"}>예약 문의</ButtonLink>
          </div>
        ))}
      </Cols>
    </Block>
  );
}

export function CaseGrid({ data }: SectionProps<"case_grid">) {
  const cases = data.cases ?? [];
  if (!cases.length) return null;
  return (
    <Block slot="case-grid">
      <Title>{data.title ?? "작업 사례"}</Title>
      {data.categories && <Chips items={data.categories} />}
      <Cols m={2} pc={4}>
        {cases.map((c) => (
          <Card key={c.id} href={c.href}>
            <Pic src={c.image} ratio={0.75} />
            <strong className="ez:text-sm ez:font-semibold">{c.title}</strong>
            {c.meta && <span className="ez:text-sm ez:text-muted">{c.meta}</span>}
          </Card>
        ))}
      </Cols>
    </Block>
  );
}

export function CaseCards({ data }: SectionProps<"case_cards">) {
  const cases = data.cases ?? [];
  if (!cases.length) return null;
  return (
    <Block slot="case-cards">
      <Title>{data.title ?? "프로젝트"}</Title>
      {data.categories && <Chips items={data.categories} />}
      <Cols m={1} pc={3}>
        {cases.map((c) => (
          <Card key={c.id} href={c.href}>
            <Pic src={c.image} ratio={1.78} className="ez:overflow-hidden ez:rounded-lg" />
            {c.meta && <span className="ez:text-sm ez:text-muted">{c.meta}</span>}
            <strong className="ez:font-display ez:text-lg ez:font-title">{c.title}</strong>
            {c.scope && <span className="ez:text-sm ez:text-muted">{c.scope}</span>}
          </Card>
        ))}
      </Cols>
    </Block>
  );
}

export function BeforeAfter({ data }: SectionProps<"before_after">) {
  if (!data.before && !data.after) return null;
  return (
    <section data-slot="before-after" className="ez:grid ez:grid-cols-2 ez:gap-2 ez:text-fg">
      {(
        [
          ["BEFORE", data.before],
          ["AFTER", data.after],
        ] as const
      ).map(([label, src]) => (
        <figure key={label} className="ez:m-0 ez:grid ez:gap-1">
          <Pic src={src} ratio={1} />
          <figcaption className="ez:text-center ez:text-sm ez:text-muted">{label}</figcaption>
        </figure>
      ))}
    </section>
  );
}
