import { ProductGrid } from "../../blocks/product-grid";
import type { SectionProps } from "../../renderer/registry";

export function ProductList({ data, context }: SectionProps) {
  return (
    <section className="ez-section">
      <h2>{(data.title as string | null) ?? "상품"}</h2>
      <ProductGrid products={context.products.slice(0, 8)} eager={2} />
      <a className="ez-link" href="/products">
        전체 상품 보기
      </a>
    </section>
  );
}
