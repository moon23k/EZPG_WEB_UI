import type { ReactNode } from "react";
import { Badge } from "../../components/badge";
import type { OrderStatus, Schemas } from "../../types";
import { kstDate, won } from "../../utils/cn";
import { OrderSummary } from "../order-summary";
import { AddressText } from "../parts/address-text";
import { LineItem, lineList } from "../parts/line-item";
import { Notice } from "../parts/notice";
import { HomeIcon, TruckIcon } from "../parts/empty-icons";

export const STATUS_LABEL: Record<OrderStatus, string> = {
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
} satisfies Record<OrderStatus, OrderAction[]>;

export type OrderItemView = Pick<
  Schemas["OrderItemOut"],
  "id" | "product_name" | "option_label" | "quantity" | "paid_amount" | "refunded_amount" | "non_returnable"
>;

export type OrderView = Pick<
  Schemas["OrderOut"],
  | "number"
  | "status"
  | "created_at"
  | "items_total"
  | "product_discount"
  | "coupon_discount"
  | "delivery_fee"
  | "region_fee"
  | "shipping_discount"
  | "point_used"
  | "total"
  | "ship_recipient"
  | "ship_postal_code"
  | "ship_address"
  | "ship_address_detail"
> & {
  items: OrderItemView[];
  shipments: Pick<Schemas["ShipmentOut"], "carrier" | "tracking_no">[];
};

const section = "ez:grid ez:gap-2";
const heading = "ez:m-0 ez:font-body ez:text-base ez:font-semibold";

export function OrderDetail({
  order,
  actions,
  labels = STATUS_LABEL,
}: {
  order: OrderView;
  actions?: ReactNode;
  labels?: Record<OrderStatus, string>;
}) {
  return (
    <article data-slot="order-detail" className="ez:grid ez:gap-6 ez:text-fg">
      <header className="ez:flex ez:flex-wrap ez:items-center ez:gap-x-3 ez:gap-y-1">
        <h1 className="ez:m-0 ez:font-body ez:text-xl ez:font-semibold">주문 {order.number}</h1>
        <Badge tone="primary">{labels[order.status]}</Badge>
        <span className="ez:text-sm ez:text-muted">{kstDate(order.created_at)}</span>
      </header>
      <ul className={lineList}>
        {order.items.map((item) => (
          <LineItem
            key={item.id}
            name={item.product_name}
            option={item.option_label}
            amount={won(item.paid_amount)}
            meta={
              <>
                <Notice>{item.quantity}개</Notice>
                {item.non_returnable && <Notice>교환·반품 불가 상품</Notice>}
                {item.refunded_amount > 0 && <Notice>환불 {won(item.refunded_amount)}</Notice>}
              </>
            }
          />
        ))}
      </ul>
      <OrderSummary quote={order} />
      <section className={section}>
        <h2 className={heading}>배송지</h2>
        <AddressText
          recipient={order.ship_recipient}
          postalCode={order.ship_postal_code}
          address={order.ship_address}
          detail={order.ship_address_detail}
        />
        {order.shipments.length ? (
          order.shipments.map((s) => (
            <Notice key={s.tracking_no}>
              {s.carrier} {s.tracking_no}
            </Notice>
          ))
        ) : (
          <div role="img" aria-label="배송 시작 전" className="ez:mt-2 ez:flex ez:items-center ez:gap-2.5">
            <span className="ez:flex ez:size-10 ez:shrink-0 ez:items-center ez:justify-center ez:rounded-lg ez:bg-primary/10 ez:text-primary">
              <TruckIcon />
            </span>
            <span className="ez:size-2 ez:shrink-0 ez:rounded-full ez:bg-primary" />
            <span className="ez:h-0.75 ez:flex-1 ez:rounded-full ez:bg-muted/25" />
            <span className="ez:shrink-0 ez:text-muted/75">
              <HomeIcon />
            </span>
          </div>
        )}
      </section>
      {actions && <div className="ez:flex ez:flex-wrap ez:gap-2">{actions}</div>}
    </article>
  );
}
