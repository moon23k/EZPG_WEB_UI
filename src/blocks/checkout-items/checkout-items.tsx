import { Photo } from "../../components/photo";
import type { CartLineData } from "../../types";
import { cn, won } from "../../utils/cn";
import { focusRing } from "../../utils/styles";
import { LineItem, lineList } from "../parts/line-item";

export type CheckoutLine = Pick<CartLineData, "variant_id" | "name" | "option_label" | "quantity" | "line_total">;

// Folded: count, total and the first item at a readable size. Opening it lists every line with its amount.
export function CheckoutItems({ lines, imageSrc }: { lines: CheckoutLine[]; imageSrc?: Record<string, string | null> }) {
  const [first] = lines;
  if (!first) return null;
  return (
    <details data-slot="checkout-items" className="ez:group ez:text-fg">
      <summary className={cn("ez:grid ez:cursor-pointer ez:list-none ez:gap-3 ez:rounded-md ez:[&::-webkit-details-marker]:hidden", focusRing)}>
        <span className="ez:flex ez:items-center ez:justify-between ez:gap-3">
          <strong className="ez:font-semibold">주문 상품 {lines.length}개</strong>
          <span className="ez:flex ez:items-center ez:gap-1.5 ez:tabular-nums ez:whitespace-nowrap">
            {won(lines.reduce((sum, l) => sum + l.line_total, 0))}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="ez:text-muted ez:transition-transform ez:group-open:rotate-180"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </span>
        <span className="ez:flex ez:items-center ez:gap-3 ez:group-open:hidden">
          <Photo src={imageSrc?.[first.variant_id]} alt="" sizes="56px" className="ez:w-14 ez:shrink-0 ez:aspect-[4/5]" />
          <span className="ez:grid ez:min-w-0 ez:gap-0.5">
            <span className="ez:line-clamp-2">{first.name}</span>
            <span className="ez:text-[13px] ez:text-muted">
              {[first.option_label, `${first.quantity}개`, lines.length > 1 && `외 ${lines.length - 1}건`].filter(Boolean).join(" · ")}
            </span>
          </span>
        </span>
      </summary>
      <ul className={cn(lineList, "ez:mt-1")}>
        {lines.map((line) => (
          <LineItem
            key={line.variant_id}
            name={line.name}
            option={[line.option_label, `${line.quantity}개`].filter(Boolean).join(" · ")}
            amount={won(line.line_total)}
            media={<Photo src={imageSrc?.[line.variant_id]} alt="" sizes="40px" className="ez:w-10 ez:aspect-[4/5]" />}
          />
        ))}
      </ul>
    </details>
  );
}
