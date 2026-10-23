import NextLink from "next/link";
import { EmptyState } from "../../components/empty-state";
import type { OrderStatus } from "../../types";
import { kstDate, won } from "../../utils/cn";
import { STATUS_LABEL } from "../order-detail/order-detail";
import { lineList } from "../parts/line-item";

export type OrderRow = { number: string; status: OrderStatus; total: number; created_at: string };

export function OrderList({
  orders,
  labels = STATUS_LABEL,
  orderHref = (number) => `/orders/${number}`,
}: {
  orders: OrderRow[];
  labels?: Record<OrderStatus, string>;
  orderHref?: (number: string) => string;
}) {
  if (!orders.length) return <EmptyState title="주문 내역이 없어요." />;
  return (
    <ul data-slot="order-list" className={lineList}>
      {orders.map((o) => (
        <li key={o.number}>
          <NextLink
            href={orderHref(o.number)}
            className="ez:grid ez:grid-cols-[1fr_auto] ez:gap-x-3 ez:gap-y-0.5 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:py-3.5 ez:text-fg ez:no-underline ez:hover:bg-surface-alt"
          >
            <strong className="ez:font-semibold">{o.number}</strong>
            <span className="ez:justify-self-end ez:font-bold ez:tabular-nums">{won(o.total)}</span>
            <span className="ez:text-sm ez:text-muted">{kstDate(o.created_at)}</span>
            <span className="ez:justify-self-end ez:text-sm ez:text-primary">{labels[o.status]}</span>
          </NextLink>
        </li>
      ))}
    </ul>
  );
}
