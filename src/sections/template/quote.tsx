import { ButtonLink } from "../../components/button";
import type { SectionProps } from "../../renderer/registry";
import { Bar, BlankButton, BlankPrice, Block, Card, Chips, Cols, Pic, Rows, Title } from "../kit";

function blankCases(count: number, ratio: number) {
  return Array.from({ length: count }, (_, i) => (
    <Card key={i}>
      <Pic ratio={ratio} tone={i} className="ez:overflow-hidden ez:rounded-lg" />
      <span className="ez:font-display ez:text-site-item">
        <Bar />
      </span>
      <span className="ez:text-site-note">
        <Bar size="long" />
      </span>
    </Card>
  ));
}

export function PriceTiers({ data, blank }: SectionProps<"price_tiers">) {
  const items = data.items ?? [];
  if (!items.length && !blank) return null;
  if (!items.length) {
    return (
      <Block slot="price-tiers" blank>
        <Title>{data.title ?? "가격"}</Title>
        <Rows rows={[0, 1, 2].map(() => ({ label: <Bar />, value: <BlankPrice /> }))} />
      </Block>
    );
  }
  return (
    <Block slot="price-tiers">
      <Title>{data.title ?? "가격"}</Title>
      <Rows rows={items} />
    </Block>
  );
}

export function PackageCards({ data, blank }: SectionProps<"package_cards">) {
  const items = data.items ?? [];
  if (!items.length && !blank) return null;
  if (!items.length) {
    return (
      <Block slot="package-cards" blank>
        <Title>{data.title ?? "상품 · 가격"}</Title>
        <Cols m={1} pc={3}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="ez:grid ez:content-start ez:gap-2 ez:rounded-lg ez:border ez:border-solid ez:border-primary-border ez:p-5 ez:text-fg">
              <span className="ez:text-site-note">
                <Bar />
              </span>
              <BlankPrice className="ez:text-site-figure" />
              <span className="ez:text-site-note">
                <Bar size="long" />
              </span>
              <BlankButton>예약 문의</BlankButton>
            </div>
          ))}
        </Cols>
      </Block>
    );
  }
  return (
    <Block slot="package-cards">
      <Title>{data.title ?? "상품 · 가격"}</Title>
      {data.tabs && <Chips items={data.tabs} />}
      <Cols m={1} pc={3}>
        {items.map((p) => (
          <div key={p.name} className="ez:grid ez:content-start ez:gap-2 ez:rounded-lg ez:border ez:border-solid ez:border-primary-border ez:p-5 ez:text-fg">
            <span className="ez:text-site-note ez:text-muted">{p.name}</span>
            <strong className="ez:text-site-figure ez:text-primary ez:tabular-nums">{p.price}</strong>
            {p.includes && (
              <ul className="ez:m-0 ez:grid ez:gap-1 ez:pl-4 ez:text-site-note">
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

export function CaseGrid({ data, blank }: SectionProps<"case_grid">) {
  const cases = data.cases ?? [];
  if (!cases.length && !blank) return null;
  if (!cases.length) {
    return (
      <Block slot="case-grid" blank>
        <Title>{data.title ?? "작업 사례"}</Title>
        <Cols m={2} pc={4}>
          {blankCases(4, 0.75)}
        </Cols>
      </Block>
    );
  }
  return (
    <Block slot="case-grid">
      <Title>{data.title ?? "작업 사례"}</Title>
      {data.categories && <Chips items={data.categories} />}
      <Cols m={2} pc={4}>
        {cases.map((c, i) => (
          <Card key={c.id} href={c.href}>
            <Pic src={c.image} ratio={0.75} tone={i} />
            <strong className="ez:font-display ez:text-site-item">{c.title}</strong>
            {c.meta && <span className="ez:text-site-note ez:text-muted">{c.meta}</span>}
          </Card>
        ))}
      </Cols>
    </Block>
  );
}

export function CaseCards({ data, blank }: SectionProps<"case_cards">) {
  const cases = data.cases ?? [];
  if (!cases.length && !blank) return null;
  if (!cases.length) {
    return (
      <Block slot="case-cards" blank>
        <Title>{data.title ?? "프로젝트"}</Title>
        <Cols m={1} pc={3}>
          {blankCases(3, 1.78)}
        </Cols>
      </Block>
    );
  }
  return (
    <Block slot="case-cards">
      <Title>{data.title ?? "프로젝트"}</Title>
      {data.categories && <Chips items={data.categories} />}
      <Cols m={1} pc={3}>
        {cases.map((c, i) => (
          <Card key={c.id} href={c.href}>
            <Pic src={c.image} ratio={1.78} tone={i} className="ez:overflow-hidden ez:rounded-lg" />
            {c.meta && <span className="ez:text-site-note ez:text-muted">{c.meta}</span>}
            <strong className="ez:font-display ez:text-site-item">{c.title}</strong>
            {c.scope && <span className="ez:text-site-note ez:text-muted">{c.scope}</span>}
          </Card>
        ))}
      </Cols>
    </Block>
  );
}

export function BeforeAfter({ data, blank }: SectionProps<"before_after">) {
  const empty = !data.before && !data.after;
  if (empty && !blank) return null;
  return (
    <section data-slot="before-after" data-blank={empty ? "" : undefined} className="ez:grid ez:grid-cols-2 ez:gap-2 ez:text-fg">
      {(
        [
          ["BEFORE", data.before],
          ["AFTER", data.after],
        ] as const
      ).map(([label, src], i) => (
        <figure key={label} className="ez:m-0 ez:grid ez:gap-1">
          <Pic src={src} ratio={1} tone={i} />
          <figcaption className="ez:text-center ez:text-site-note ez:text-muted">{label}</figcaption>
        </figure>
      ))}
    </section>
  );
}
