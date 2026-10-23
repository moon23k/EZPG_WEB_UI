import NextLink from "next/link";
import { Photo } from "../../components/photo";
import type { ProductSummary } from "../../types";
import { cn, won } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

// Sold out: the photo is dimmed under a label and the price stays, without the sale mark.
export function ProductCard({ product, priority }: { product: ProductSummary; priority?: boolean }) {
  const sale = product.list_price > product.sale_price ? Math.floor(((product.list_price - product.sale_price) / product.list_price) * 100) : 0;
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
      {/* The list price takes its own small line, kept even when empty, so sale prices line up across a row. */}
      <span className="ez:grid ez:tabular-nums ez:whitespace-nowrap">
        <s className={cn("ez:text-[13px] ez:text-muted", !(sale > 0 && !product.sold_out) && "ez:invisible")}>
          <span className="ez:sr-only">정가 </span>
          {won(product.list_price)}
        </s>
        <span className="ez:flex ez:items-baseline ez:gap-1.5">
          {sale > 0 && !product.sold_out && <strong className="ez:font-bold ez:text-primary">{sale}%</strong>}
          <strong className={cn("ez:font-bold", product.sold_out ? "ez:text-muted" : "ez:text-fg")}>{won(product.sale_price)}</strong>
        </span>
      </span>
    </NextLink>
  );
}
