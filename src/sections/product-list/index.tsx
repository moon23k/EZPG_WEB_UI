import { Link } from "../../components/link";
import { ProductGrid } from "../../blocks/product-grid";
import type { SectionProps } from "../../renderer/registry";
import { CategoryChips } from "../category-menu";

const SHOWN = 8;

function fullRows(count: number, m: number, pc: number): number {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const both = (m * pc) / gcd(m, pc);
  return count < pc ? count : Math.floor(count / both) * both || Math.floor(count / pc) * pc;
}

export function ProductList({ data, context, grid, variant }: SectionProps<"product_grid">) {
  if (!context.products.length) return null;
  const shown = context.products.slice(0, fullRows(Math.min(context.products.length, SHOWN), grid?.m ?? 2, grid?.pc ?? 4));
  return (
    <section data-slot="product-grid-section" className="ez:grid ez:gap-4 ez:text-fg">
      <div className="ez:flex ez:items-baseline ez:justify-between ez:gap-3">
        <h2 className="ez:m-0 ez:text-site-section">{data.title ?? "상품"}</h2>
        {context.products.length > shown.length && (
          <Link href="/products" className="ez:shrink-0 ez:text-site-note ez:text-muted">
            전체 보기
          </Link>
        )}
      </div>
      {variant !== "plain" && <CategoryChips categories={context.categories} />}
      <ProductGrid products={shown} eager={2} grid={grid} fit />
    </section>
  );
}
