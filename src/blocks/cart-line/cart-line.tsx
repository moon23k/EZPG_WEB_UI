import { buttonVariants } from "../../components/button";
import { Price } from "../../components/price";
import type { CartLineData as Line } from "../../types";
import { won } from "../../utils/cn";
import { LineItem } from "../parts/line-item";

const textButton = buttonVariants({ variant: "ghost", size: "sm" });

export function CartLine({
  line,
  updateAction,
  removeAction,
}: {
  line: Line;
  updateAction: (data: FormData) => void | Promise<void>;
  removeAction: (data: FormData) => void | Promise<void>;
}) {
  const problem = !line.sellable ? "판매 중지" : !line.enough_stock ? "재고 부족" : null;
  return (
    <LineItem
      name={line.name}
      href={`/products/${line.product_id}`}
      option={line.option_label}
      meta={<Price value={line.unit_price} list={line.list_price} className="ez:text-sm" />}
      problem={problem}
      amount={won(line.line_total)}
    >
      <form action={updateAction} className="ez:flex ez:items-center ez:gap-1">
        <input type="hidden" name="variant_id" value={line.variant_id} />
        <select
          name="quantity"
          defaultValue={line.quantity}
          aria-label={`${line.name} 수량`}
          className="ez:min-h-10 ez:rounded-sm ez:border ez:border-solid ez:border-primary-border ez:bg-surface ez:px-2 ez:text-fg ez:font-body"
        >
          {Array.from({ length: Math.max(10, line.quantity) }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button type="submit" className={textButton}>
          변경
        </button>
      </form>
      <form action={removeAction} className="ez:ml-auto">
        <input type="hidden" name="variant_id" value={line.variant_id} />
        <button type="submit" className={textButton} aria-label={`${line.name} 삭제`}>
          삭제
        </button>
      </form>
    </LineItem>
  );
}
