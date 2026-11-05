import type { SectionProps } from "../../renderer/registry";
import { Bar, Block, Card, Cols, Pic, Rows, Title } from "../kit";
import type { Tile } from "./data";

function blankTiles(count: number, ratio: number) {
  return Array.from({ length: count }, (_, i) => (
    <Card key={i}>
      <Pic ratio={ratio} tone={i} />
      <Bar />
    </Card>
  ));
}

export function CategoryTiles({ data, context, blank }: SectionProps<"category_tiles">) {
  const items: Tile[] = data.items?.length ? data.items : context.categories.map((c) => ({ title: c.name, href: `/products?category=${c.id}` }));
  if (!items.length && !blank) return null;
  if (!items.length) {
    return (
      <section data-slot="category-tiles" data-blank="">
        <Cols m={1} pc={3}>
          {blankTiles(3, 1.8)}
        </Cols>
      </section>
    );
  }
  return (
    <section data-slot="category-tiles">
      <Cols m={1} pc={3}>
        {items.map((t, i) => (
          <Card key={t.title} href={t.href}>
            <Pic src={t.image} ratio={1.8} tone={i} />
            <strong className="ez:font-semibold">{t.title} →</strong>
          </Card>
        ))}
      </Cols>
    </section>
  );
}

export function Curation({ data, blank }: SectionProps<"curation">) {
  const items = data.items ?? [];
  if (!items.length && !blank) return null;
  if (!items.length) {
    return (
      <Block slot="curation" blank>
        <Title>{data.title ?? "기획"}</Title>
        <Cols m={2} pc={4}>
          {blankTiles(4, 1)}
        </Cols>
      </Block>
    );
  }
  return (
    <Block slot="curation">
      {data.title && <Title>{data.title}</Title>}
      <Cols m={2} pc={4}>
        {items.map((t, i) => (
          <Card key={t.title} href={t.href}>
            <Pic src={t.image} ratio={1} tone={i} />
            <span className="ez:text-site-note">
              <span className="ez:text-muted">{`#${String(i + 1).padStart(2, "0")} `}</span>
              {t.title}
            </span>
          </Card>
        ))}
      </Cols>
    </Block>
  );
}

export function StoreInfo({ data, blank }: SectionProps<"store_info">) {
  if (!data.address && !blank) return null;
  return (
    <section data-slot="store-info" data-blank={data.address ? undefined : ""} className="ez:grid ez:gap-4 ez:rounded-md ez:bg-surface-alt ez:p-4 ez:text-fg ez:md:grid-cols-[1.4fr_1fr] ez:md:items-center">
      <Pic src={data.image} ratio={1.7} tone={3} />
      <div className="ez:grid ez:gap-2">
        <strong className="ez:font-display ez:text-site-item">{data.title ?? "쇼룸"}</strong>
        <Rows
          rows={[
            { label: "주소", value: data.address ?? <Bar size="long" /> },
            ...(data.hours || !data.address ? [{ label: "영업시간", value: data.hours ?? <Bar /> }] : []),
            ...(data.phone || !data.address ? [{ label: "전화", value: data.phone ?? <Bar /> }] : []),
          ]}
        />
      </div>
    </section>
  );
}
