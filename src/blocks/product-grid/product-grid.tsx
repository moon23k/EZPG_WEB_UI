import { EmptyState } from "../../components/empty-state";
import type { ProductSummary } from "../../types";
import { ProductCard } from "../product-card";

export function ProductGrid({ products, eager = 0 }: { products: ProductSummary[]; eager?: number }) {
  if (!products.length) return <EmptyState title="아직 등록된 상품이 없어요." />;
  return (
    <div data-slot="product-grid" className="ez:grid ez:grid-cols-2 ez:gap-gutter ez:md:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < eager} />
      ))}
    </div>
  );
}
