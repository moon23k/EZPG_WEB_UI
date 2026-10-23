import NextLink from "next/link";
import type { ReactNode } from "react";
import { Photo } from "../../components/photo";
import type { CartLineData as Line } from "../../types";
import { cn, won } from "../../utils/cn";
import { focusRing } from "../../utils/styles";
import { Status } from "../parts/status";

const stepButton = cn(
  "ez:size-8 ez:m-0 ez:p-0 ez:border-0 ez:bg-transparent ez:text-base ez:text-fg ez:cursor-pointer",
  "ez:disabled:cursor-not-allowed ez:disabled:text-muted/50",
  focusRing,
);

// One cart row. Quantity buttons submit the new quantity directly, so the row needs no client JS.
export function CartLine({
  line,
  updateAction,
  removeAction,
  selector,
  imageSrc,
}: {
  line: Line;
  updateAction: (data: FormData) => void | Promise<void>;
  removeAction: (data: FormData) => void | Promise<void>;
  selector?: ReactNode;
  imageSrc?: string | null;
}) {
  const available = line.sellable && line.enough_stock;
  const listTotal = line.list_price * line.quantity;
  const discount = listTotal > line.line_total ? Math.floor(((listTotal - line.line_total) / listTotal) * 100) : 0;
  return (
    <li
      data-slot="cart-line"
      data-available={available || undefined}
      className="ez:flex ez:gap-3 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:py-4"
    >
      {selector}
      <NextLink href={`/products/${line.product_id}`} className={cn("ez:w-18 ez:shrink-0 ez:rounded-md", focusRing, !available && "ez:opacity-45")}>
        <Photo src={imageSrc} alt={line.name} sizes="72px" className="ez:aspect-[4/5]" />
      </NextLink>
      <div className="ez:flex ez:min-w-0 ez:flex-1 ez:flex-col">
        <div className="ez:flex ez:items-start ez:gap-1">
          <NextLink
            href={`/products/${line.product_id}`}
            className={cn(
              "ez:flex-1 ez:text-base ez:font-semibold ez:leading-[22px] ez:tracking-[-0.01em] ez:no-underline ez:hover:underline",
              available ? "ez:text-fg" : "ez:text-muted",
            )}
          >
            {line.name}
          </NextLink>
          <form action={removeAction}>
            <input type="hidden" name="variant_id" value={line.variant_id} />
            <button
              type="submit"
              aria-label={`${line.name} 삭제`}
              className={cn("ez:-my-[11px] ez:-mr-3.5 ez:flex ez:size-11 ez:items-center ez:justify-center ez:border-0 ez:bg-transparent ez:p-0 ez:text-muted ez:cursor-pointer", focusRing)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </form>
        </div>
        <div className="ez:mt-1 ez:flex ez:items-baseline ez:justify-between ez:gap-2 ez:text-[13px] ez:leading-[18px] ez:whitespace-nowrap">
          {!line.sellable ? (
            <Status icon="alert" tone="danger">판매 중지</Status>
          ) : !line.enough_stock ? (
            <Status icon="alert" tone="danger">재고 부족</Status>
          ) : (
            <span className="ez:truncate ez:text-muted">{line.option_label}</span>
          )}
          {discount > 0 && available && (
            <span className="ez:flex ez:items-baseline ez:gap-1.5">
              <span className="ez:font-semibold ez:text-primary">{discount}%</span>
              <s className="ez:tabular-nums ez:text-muted">
                <span className="ez:sr-only">정가 </span>
                {won(listTotal)}
              </s>
            </span>
          )}
        </div>
        <div className="ez:mt-auto ez:flex ez:items-end ez:justify-between ez:pt-3">
          <form action={updateAction} className="ez:inline-flex ez:h-8 ez:items-center ez:rounded-md ez:border ez:border-solid ez:border-primary-border">
            <input type="hidden" name="variant_id" value={line.variant_id} />
            <button type="submit" name="quantity" value={line.quantity - 1} disabled={line.quantity <= 1} aria-label={`${line.name} 수량 줄이기`} className={stepButton}>
              −
            </button>
            <span
              aria-label={`수량 ${line.quantity}개`}
              className={cn("ez:w-8 ez:text-center ez:text-base ez:tabular-nums", line.enough_stock ? "ez:text-fg" : "ez:font-semibold ez:text-danger")}
            >
              {line.quantity}
            </span>
            <button type="submit" name="quantity" value={line.quantity + 1} disabled={!available} aria-label={`${line.name} 수량 늘리기`} className={stepButton}>
              +
            </button>
          </form>
          <strong className={cn("ez:text-base ez:font-semibold ez:leading-[22px] ez:tracking-[-0.01em] ez:tabular-nums", available ? "ez:text-fg" : "ez:text-muted")}>
            {discount > 0 && available && <span className="ez:sr-only">할인가 </span>}
            {won(line.line_total)}
          </strong>
        </div>
      </div>
    </li>
  );
}
