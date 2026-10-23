import { Link } from "../../components/link";
import { ProductGrid } from "../../blocks/product-grid";
import type { SectionProps } from "../../renderer/registry";

export function ProductList({ data, context }: SectionProps<"product_grid">) {
  if (!context.products.length) return null;
  return (
    <section data-slot="product-grid-section" className="ez:grid ez:gap-4 ez:text-fg">
      <div className="ez:flex ez:items-baseline ez:justify-between ez:gap-3">
        <h2 className="ez:m-0 ez:font-display ez:font-title ez:text-2xl ez:tracking-brand">{data.title ?? "상품"}</h2>
        <Link href="/products" className="ez:shrink-0 ez:text-sm ez:text-muted">
          전체 상품 보기
        </Link>
      </div>
      <ProductGrid products={context.products.slice(0, 8)} eager={2} />
    </section>
  );
}
