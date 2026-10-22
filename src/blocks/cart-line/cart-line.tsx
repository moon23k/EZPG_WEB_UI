import { Price } from "../../components/price";
import type { CartLine as Line } from "../../types";
import { won } from "../../utils/cn";

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
    <li className="ez-line" data-problem={problem ?? undefined}>
      <div className="ez-line__info">
        <a href={`/products/${line.product_id}`} className="ez-line__name">
          {line.name}
        </a>
        {line.option_label && <span className="ez-line__option">{line.option_label}</span>}
        <Price value={line.unit_price} list={line.list_price} />
        {problem && <span className="ez-error">{problem}</span>}
      </div>
      <form action={updateAction} className="ez-line__qty">
        <input type="hidden" name="variant_id" value={line.variant_id} />
        <select name="quantity" defaultValue={line.quantity} aria-label={`${line.name} 수량`}>
          {Array.from({ length: Math.max(10, line.quantity) }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button type="submit" className="ez-link">
          변경
        </button>
      </form>
      <strong className="ez-line__total">{won(line.line_total)}</strong>
      <form action={removeAction}>
        <input type="hidden" name="variant_id" value={line.variant_id} />
        <button type="submit" className="ez-link" aria-label={`${line.name} 삭제`}>
          삭제
        </button>
      </form>
    </li>
  );
}
