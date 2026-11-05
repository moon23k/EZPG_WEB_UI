import { EmptyState } from "../../components/empty-state";
import type { ProductSummary } from "../../types";
import { ProductCard } from "../product-card";
import type { GridSpec } from "../../templates/types";
import { pcCols } from "../../sections/kit";
import { cn } from "../../utils/cn";
import { ButtonLink } from "../../components/button";
import { emptyAction, ProductsIcon } from "../parts/empty-icons";

export function ProductGrid({
  products,
  eager = 0,
  emptyHref,
  grid,
  fit,
}: {
  products: ProductSummary[];
  eager?: number;
  emptyHref?: string;
  grid?: GridSpec;
  fit?: boolean;
}) {
  if (!products.length) {
    return (
      <EmptyState icon={<ProductsIcon />} title="등록된 상품이 없어요">
        {emptyHref && (
          <ButtonLink href={emptyHref} variant="outline" className={emptyAction}>
            전체 상품
          </ButtonLink>
        )}
      </EmptyState>
    );
  }
  return (
    <div
      data-slot="product-grid"
      className={cn(
        "ez:grid ez:gap-gutter",
        { 1: "ez:grid-cols-1", 2: "ez:grid-cols-2", 3: "ez:grid-cols-3" }[grid?.m ?? 2],
        pcCols(grid?.pc ?? 4, fit ? products.length : Number.POSITIVE_INFINITY),
      )}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} preload={i < eager} ratio={grid?.ratio} meta={grid?.meta} tone={i} />
      ))}
    </div>
  );
}
