import { Badge } from "../../components/badge";
import { Photo } from "../../components/photo";
import { Price } from "../../components/price";
import type { ProductSummary } from "../../types";

export function ProductCard({ product, priority }: { product: ProductSummary; priority?: boolean }) {
  return (
    <a href={`/products/${product.id}`} className="ez-card">
      <span className="ez-card__photo">
        <Photo src={product.cover_url} alt={product.name} priority={priority} />
        {product.sold_out && <Badge tone="warn">품절</Badge>}
      </span>
      <span className="ez-card__name">{product.name}</span>
      <Price value={product.sale_price} list={product.list_price} />
    </a>
  );
}
