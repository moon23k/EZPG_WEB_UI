import type { ReactNode } from "react";
import { Badge } from "../../components/badge";
import { kstDate, won } from "../../utils/cn";

export const STATUS_LABEL: Record<string, string> = {
  pending_payment: "결제 대기",
  paid: "결제 완료",
  preparing: "상품 준비 중",
  shipped: "배송 중",
  delivered: "배송 완료",
  completed: "구매 확정",
  canceled: "주문 취소",
};

export type OrderAction = "pay" | "cancel" | "request_cancel" | "return" | "exchange" | "complete" | "review";

export const ORDER_ACTIONS: Record<string, OrderAction[]> = {
  pending_payment: ["pay", "cancel"],
  paid: ["cancel"],
  preparing: ["request_cancel"],
  shipped: ["return", "exchange", "complete"],
  delivered: ["return", "exchange", "complete"],
  completed: ["review"],
  canceled: [],
};

export type OrderItemView = {
  id: string;
  product_name: string;
  option_label: string | null;
  quantity: number;
  paid_amount: number;
  refunded_amount: number;
  non_returnable: boolean;
};

export type OrderView = {
  number: string;
  status: string;
  created_at: string;
  total: number;
  delivery_fee: number;
  region_fee: number;
  ship_recipient: string;
  ship_address: string;
  ship_address_detail: string | null;
  items: OrderItemView[];
  shipments: { carrier: string; tracking_no: string; status: string }[];
};

export function OrderDetail({ order, actions }: { order: OrderView; actions?: ReactNode }) {
  return (
    <article className="ez-order">
      <header className="ez-order__head">
        <h1>주문 {order.number}</h1>
        <Badge tone="primary">{STATUS_LABEL[order.status] ?? order.status}</Badge>
        <span className="ez-muted">{kstDate(order.created_at)}</span>
      </header>
      <ul className="ez-lines">
        {order.items.map((item) => (
          <li key={item.id} className="ez-line">
            <div className="ez-line__info">
              <span className="ez-line__name">{item.product_name}</span>
              {item.option_label && <span className="ez-line__option">{item.option_label}</span>}
              <span className="ez-muted">{item.quantity}개</span>
              {item.non_returnable && <span className="ez-muted">교환·반품 불가 상품</span>}
              {item.refunded_amount > 0 && <span className="ez-muted">환불 {won(item.refunded_amount)}</span>}
            </div>
            <strong className="ez-line__total">{won(item.paid_amount)}</strong>
          </li>
        ))}
      </ul>
      <dl className="ez-summary">
        <div>
          <dt>배송비</dt>
          <dd>{won(order.delivery_fee + order.region_fee)}</dd>
        </div>
        <div className="ez-summary__total">
          <dt>결제 금액</dt>
          <dd>{won(order.total)}</dd>
        </div>
      </dl>
      <section className="ez-order__ship">
        <h2>배송지</h2>
        <p>
          {order.ship_recipient} · {order.ship_address} {order.ship_address_detail ?? ""}
        </p>
        {order.shipments.map((s) => (
          <p key={s.tracking_no} className="ez-muted">
            {s.carrier} {s.tracking_no}
          </p>
        ))}
      </section>
      {actions && <div className="ez-order__actions">{actions}</div>}
    </article>
  );
}
