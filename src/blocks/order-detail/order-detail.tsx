import type { ReactNode } from "react";
import { Photo } from "../../components/photo";
import type { OrderStatus, Schemas } from "../../types";
import { cn, kstDate, won } from "../../utils/cn";
import { focusRing } from "../../utils/styles";
import { AddressText } from "../parts/address-text";
import { LineItem, lineList } from "../parts/line-item";
import { Status } from "../parts/status";
import { SummaryRows, type SummaryRow } from "../parts/summary-rows";
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
  | "id"
  | "product_name"
  | "option_label"
  | "quantity"
  | "line_total"
  | "paid_amount"
  | "refunded_amount"
  | "returned_quantity"
  | "non_returnable"
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
  ship_phone?: string | null;
  items: OrderItemView[];
  shipments: Pick<Schemas["ShipmentOut"], "carrier" | "tracking_no">[];
};

type Shipment = OrderView["shipments"][number];

const TRACKING: Record<string, string> = {
  CJ대한통운: "https://trace.cjlogistics.com/next/tracking.html?wblNo=",
  우체국택배: "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1=",
  한진택배: "https://www.hanjin.com/kor/CMS/DeliveryMgr/WaybillResult.do?mCode=MN038&schLang=KR&wblnumText2=",
  롯데택배: "https://www.lotteglogis.com/home/reservation/tracking/linkView?InvNo=",
  로젠택배: "https://www.ilogen.com/web/personal/trace/",
};

export function trackingUrl(s: Shipment): string | undefined {
  const base = TRACKING[s.carrier.replace(/\s/g, "")];
  return base && `${base}${s.tracking_no.replace(/\D/g, "")}`;
}

// Finished orders step back to the muted colour; everything still moving keeps the primary one.
export function statusTone(status: OrderStatus): string {
  return status === "completed" || status === "canceled" ? "ez:text-muted" : "ez:font-semibold ez:text-primary";
}

const smallButton = "ez:inline-flex ez:h-8 ez:shrink-0 ez:items-center ez:rounded-md ez:border ez:border-solid ez:border-primary-border ez:px-3 ez:text-[13px] ez:text-fg ez:no-underline ez:hover:bg-primary-tint";

export function OrderDetail({
  order,
  actions,
  labels = STATUS_LABEL,
  imageSrc,
  trackingHref = trackingUrl,
}: {
  order: OrderView;
  actions?: ReactNode;
  labels?: Record<OrderStatus, string>;
  imageSrc?: Record<string, string | null>;
  trackingHref?: (shipment: Shipment) => string | undefined;
}) {
  const refunded = order.items.reduce((sum, i) => sum + i.refunded_amount, 0);
  const partial = refunded > 0 && order.status !== "canceled";
  const rows: SummaryRow[] = [
    { label: "상품 금액", value: order.items_total + order.product_discount },
    { label: "할인", value: order.product_discount + order.coupon_discount, minus: true },
    { label: "배송비", value: order.delivery_fee + order.region_fee - order.shipping_discount },
    { label: "적립금 사용", value: order.point_used, minus: true },
  ].filter((row) => row.value > 0 || row.label === "배송비");
  if (partial) rows.push({ label: "결제 금액", value: order.total, strong: true }, { label: "환불 금액", value: refunded, minus: true });
  return (
    <article data-slot="order-detail" className="ez:grid ez:gap-5 ez:text-fg">
      <header className="ez:grid ez:gap-0.5">
        <div className="ez:flex ez:items-baseline ez:justify-between ez:gap-3">
          <h1 className="ez:m-0 ez:font-body ez:text-base ez:font-semibold">{kstDate(order.created_at)} 주문</h1>
          <span className={cn("ez:text-[13px]", partial ? "ez:font-semibold ez:text-primary" : statusTone(order.status))}>
            {partial ? "부분 환불" : labels[order.status]}
          </span>
        </div>
        <span className="ez:text-[13px] ez:tabular-nums ez:text-muted">주문번호 {order.number}</span>
      </header>
      <ul className={cn(lineList, "ez:border-0 ez:border-t ez:border-solid ez:border-primary-border")}>
        {order.items.map((item) => (
          <LineItem
            key={item.id}
            name={item.product_name}
            amount={won(item.line_total)}
            media={
              imageSrc && (
                <Photo src={imageSrc[item.id]} alt={item.product_name} sizes="48px" className="ez:w-12 ez:aspect-[4/5]" />
              )
            }
            meta={
              <>
                <span className="ez:text-[13px] ez:text-muted">
                  {[item.option_label, `${item.quantity}개`, item.returned_quantity > 0 && `${item.returned_quantity}개 환불`]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
                {item.non_returnable && <Status icon="ban">교환·반품 불가</Status>}
              </>
            }
          />
        ))}
      </ul>
      <SummaryRows
        rows={rows}
        total={partial ? { label: "최종 결제 금액", value: order.total - refunded } : { label: "결제 금액", value: order.total }}
      />
      <section aria-label="배송" className="ez:grid ez:gap-3 ez:border-0 ez:border-t ez:border-solid ez:border-primary-border ez:pt-5">
        <AddressText
          recipient={order.ship_recipient}
          phone={order.ship_phone ?? undefined}
          postalCode={order.ship_postal_code}
          address={order.ship_address}
          detail={order.ship_address_detail}
        />
        {order.shipments.length ? (
          order.shipments.map((s) => {
            const href = trackingHref(s);
            return (
              <div key={s.tracking_no} className="ez:flex ez:items-center ez:justify-between ez:gap-3 ez:text-[13px]">
                <span>
                  <span className="ez:text-muted">운송장</span> {s.carrier} <span className="ez:tabular-nums">{s.tracking_no}</span>
                </span>
                {href && (
                  <a href={href} target="_blank" rel="noreferrer" className={cn(smallButton, focusRing)}>
                    배송 조회
                  </a>
                )}
              </div>
            );
          })
        ) : (
          <div role="img" aria-label="배송 시작 전" className="ez:flex ez:h-6 ez:items-center ez:gap-2.5">
            <span className="ez:text-primary">
              <TruckIcon />
            </span>
            <span className="ez:size-2 ez:shrink-0 ez:rounded-full ez:bg-primary" />
            <span className="ez:h-0.75 ez:flex-1 ez:rounded-full ez:bg-muted/40" />
            <span className="ez:text-muted">
              <HomeIcon />
            </span>
          </div>
        )}
      </section>
      {actions && <div className="ez:flex ez:flex-wrap ez:gap-2">{actions}</div>}
    </article>
  );
}
