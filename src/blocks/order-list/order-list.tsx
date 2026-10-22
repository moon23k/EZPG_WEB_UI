import { EmptyState } from "../../components/empty-state";
import { kstDate, won } from "../../utils/cn";
import { STATUS_LABEL } from "../order-detail/order-detail";

export type OrderRow = { number: string; status: string; total: number; created_at: string };

export function OrderList({ orders }: { orders: OrderRow[] }) {
  if (!orders.length) return <EmptyState title="주문 내역이 없어요." />;
  return (
    <ul className="ez-orders">
      {orders.map((o) => (
        <li key={o.number}>
          <a href={`/orders/${o.number}`}>
            <span>{kstDate(o.created_at)}</span>
            <strong>{o.number}</strong>
            <span>{STATUS_LABEL[o.status] ?? o.status}</span>
            <span>{won(o.total)}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
