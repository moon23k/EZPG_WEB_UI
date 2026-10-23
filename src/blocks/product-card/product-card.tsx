import NextLink from "next/link";
import { Badge } from "../../components/badge";
import { Photo } from "../../components/photo";
import { Price } from "../../components/price";
import type { ProductSummary } from "../../types";
import { focusRing } from "../../utils/styles";
import { cn } from "../../utils/cn";

export function ProductCard({ product, priority }: { product: ProductSummary; priority?: boolean }) {
  return (
    <NextLink
      href={`/products/${product.id}`}
      data-slot="product-card"
      className={cn("ez:group ez:grid ez:gap-1.5 ez:rounded-md ez:text-fg ez:no-underline", focusRing)}
    >
      <span className="ez:relative">
        <Photo src={product.cover_url} alt={product.name} priority={priority} />
        {product.sold_out && <Badge tone="warn" className="ez:absolute ez:top-2 ez:left-2">품절</Badge>}
      </span>
      <span className="ez:line-clamp-2 ez:text-sm ez:group-hover:underline">{product.name}</span>
      <Price value={product.sale_price} list={product.list_price} />
    </NextLink>
  );
}
