import NextLink from "next/link";
import { Photo } from "../../components/photo";
import { Price } from "../../components/price";
import type { ProductSummary } from "../../types";
import { cn, won } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

// Sold out: the photo is dimmed under a label and the price stays, without the sale mark.
export function ProductCard({ product, priority }: { product: ProductSummary; priority?: boolean }) {
  return (
    <NextLink
      href={`/products/${product.id}`}
      data-slot="product-card"
      data-sold-out={product.sold_out || undefined}
      className={cn("ez:group ez:flex ez:flex-col ez:gap-1.5 ez:rounded-md ez:text-fg ez:no-underline", focusRing)}
    >
      <span className="ez:relative ez:block">
        <Photo src={product.cover_url} alt={product.name} priority={priority} className={product.sold_out ? "ez:[&>svg]:hidden" : undefined} />
        {product.sold_out && (
          <span className="ez:absolute ez:inset-0 ez:flex ez:items-center ez:justify-center ez:rounded-md ez:bg-[rgb(28_27_25/0.45)] ez:font-semibold ez:text-[#ffffff]">
            품절
          </span>
        )}
      </span>
      <span className="ez:line-clamp-2 ez:text-sm ez:group-hover:underline">{product.name}</span>
      {product.sold_out ? (
        <span className="ez:font-bold ez:tabular-nums ez:text-muted">{won(product.sale_price)}</span>
      ) : (
        <Price value={product.sale_price} list={product.list_price} />
      )}
    </NextLink>
  );
}
