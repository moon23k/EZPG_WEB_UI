import NextLink from "next/link";
import { ButtonLink } from "../../components/button";
import { EmptyState } from "../../components/empty-state";
import { Photo } from "../../components/photo";
import type { OrderStatus } from "../../types";
import { cn, won } from "../../utils/cn";
import { STATUS_LABEL, statusTone } from "../order-detail/order-detail";
import { emptyAction, ReceiptIcon } from "../parts/empty-icons";
import { lineList } from "../parts/line-item";

// first_item / item_count / image_url name the order by what was bought; without them the number stands in.
export type OrderRow = {
  number: string;
  status: OrderStatus;
  total: number;
  created_at: string;
  first_item?: string | null;
  item_count?: number;
  image_url?: string | null;
};

const shortDate = (value: string) =>
  new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "2-digit", day: "2-digit" }).format(new Date(value));

export function OrderList({
  orders,
  labels = STATUS_LABEL,
  orderHref = (number) => `/orders/${number}`,
}: {
  orders: OrderRow[];
  labels?: Record<OrderStatus, string>;
  orderHref?: (number: string) => string;
}) {
  if (!orders.length) {
    return (
      <EmptyState icon={<ReceiptIcon />} title="주문 내역이 없어요">
        <ButtonLink href="/products" variant="outline" className={emptyAction}>
          쇼핑하기
        </ButtonLink>
      </EmptyState>
    );
  }
  return (
    <ul data-slot="order-list" className={lineList}>
      {orders.map((o) => {
        const canceled = o.status === "canceled";
        const more = (o.item_count ?? 1) - 1;
        return (
          <li key={o.number}>
            <NextLink
              href={orderHref(o.number)}
              className="ez:flex ez:items-center ez:gap-3 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:py-3.5 ez:text-fg ez:no-underline ez:hover:bg-surface-alt"
            >
              {o.first_item && (
                <Photo src={o.image_url} alt="" sizes="48px" className={cn("ez:w-12 ez:shrink-0 ez:aspect-[4/5]", canceled && "ez:opacity-45")} />
              )}
              <span className="ez:grid ez:min-w-0 ez:flex-1 ez:gap-0.5">
                <strong className={cn("ez:flex ez:min-w-0 ez:gap-1 ez:font-semibold ez:whitespace-nowrap", canceled && "ez:text-muted")}>
                  <span className="ez:min-w-0 ez:truncate">{o.first_item ?? o.number}</span>
                  {more > 0 && <span className="ez:shrink-0 ez:font-normal ez:text-muted">외 {more}건</span>}
                </strong>
                <span className="ez:text-[13px] ez:tabular-nums ez:text-muted">
                  {shortDate(o.created_at)}
                  {o.first_item && ` · ${o.number}`}
                </span>
              </span>
              <span className="ez:grid ez:shrink-0 ez:justify-items-end ez:gap-0.5">
                {canceled ? (
                  <s className="ez:tabular-nums ez:text-muted">{won(o.total)}</s>
                ) : (
                  <strong className="ez:font-semibold ez:tabular-nums">{won(o.total)}</strong>
                )}
                <span className={cn("ez:text-[13px]", statusTone(o.status))}>{labels[o.status]}</span>
              </span>
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
}
