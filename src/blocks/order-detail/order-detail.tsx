import type { ReactNode } from "react";
import { Photo } from "../../components/photo";
import type { OrderStatus, Schemas } from "../../types";
import { cn, kstDate, won } from "../../utils/cn";
import { focusRing } from "../../utils/styles";
import { AddressText } from "../parts/address-text";
import { LineItem, lineList } from "../parts/line-item";
import { Status } from "../parts/status";
import { SummaryRows, type SummaryRow } from "../parts/summary-rows";

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

const STEPS: [OrderStatus, string][] = [
  ["paid", "결제 완료"],
  ["preparing", "상품 준비"],
  ["shipped", "배송 중"],
  ["delivered", "배송 완료"],
];

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
  const step = STEPS.findIndex(([status]) => status === order.status);
  return (
    <article
      data-slot="order-detail"
      className="ez:grid ez:gap-5 ez:text-fg ez:lg:grid-cols-[minmax(0,1fr)_320px] ez:lg:items-start ez:lg:gap-x-10"
    >
      {/* Below desktop the column wrapper dissolves so the amount card can sit between items and shipping. */}
      <div className="ez:contents ez:lg:grid ez:lg:min-w-0 ez:lg:gap-5">
        <header className="ez:grid ez:gap-0.5">
          <div className="ez:flex ez:items-baseline ez:justify-between ez:gap-3">
            <h1 className="ez:m-0 ez:font-body ez:text-base ez:font-semibold">{kstDate(order.created_at)} 주문</h1>
            <span className={cn("ez:text-[13px]", partial ? "ez:font-semibold ez:text-primary" : statusTone(order.status))}>
              {partial ? "부분 환불" : labels[order.status]}
            </span>
          </div>
          <span className="ez:text-[13px] ez:tabular-nums ez:text-muted">주문번호 {order.number}</span>
        </header>
        {step >= 0 && (
          <ol aria-label="배송 단계" className="ez:relative ez:m-0 ez:grid ez:list-none ez:grid-cols-4 ez:p-0">
            <span aria-hidden="true" className="ez:absolute ez:top-1 ez:right-[12.5%] ez:left-[12.5%] ez:h-0.5 ez:bg-primary-border" />
            <span
              aria-hidden="true"
              className="ez:absolute ez:top-1 ez:left-[12.5%] ez:h-0.5 ez:bg-primary"
              style={{ width: `${step * 25}%` }}
            />
            {STEPS.map(([status, label], i) => (
              <li
                key={status}
                aria-current={i === step ? "step" : undefined}
                className={cn(
                  "ez:relative ez:grid ez:justify-items-center ez:gap-1.5 ez:text-[13px]",
                  i === step ? "ez:font-bold ez:text-primary" : "ez:text-muted",
                )}
              >
                <span
                  className={cn(
                    "ez:size-2.5 ez:box-border ez:rounded-full",
                    i <= step ? "ez:bg-primary" : "ez:border-2 ez:border-solid ez:border-muted/50 ez:bg-surface",
                    i === step && "ez:shadow-[0_0_0_4px_var(--ezd-primary-tint)]",
                  )}
                />
                {label}
              </li>
            ))}
          </ol>
        )}
        <ul className={cn(lineList, "ez:border-0 ez:border-t ez:border-solid ez:border-primary-border")}>
          {order.items.map((item) => (
            <LineItem
              key={item.id}
              name={item.product_name}
              amount={won(item.line_total)}
              media={
                imageSrc && <Photo src={imageSrc[item.id]} alt={item.product_name} sizes="56px" className="ez:w-14 ez:aspect-[4/5]" />
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
        <section aria-label="배송" className="ez:grid ez:gap-3 ez:max-lg:order-2">
          <AddressText
            recipient={order.ship_recipient}
            phone={order.ship_phone ?? undefined}
            postalCode={order.ship_postal_code}
            address={order.ship_address}
            detail={order.ship_address_detail}
          />
          {order.shipments.map((s) => {
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
          })}
        </section>
        {actions && <div className="ez:max-lg:order-2">{actions}</div>}
      </div>
      <div className="ez:rounded-md ez:bg-surface-alt ez:p-4 ez:max-lg:order-1 ez:lg:col-start-2 ez:lg:row-start-1 ez:lg:p-5">
        <SummaryRows
          rows={rows}
          total={partial ? { label: "최종 결제 금액", value: order.total - refunded } : { label: "결제 금액", value: order.total }}
        />
      </div>
    </article>
  );
}

// Primary action first and full width on phones, secondary ones in two columns; one row from desktop width.
export function OrderActionBar({ primary, children }: { primary?: ReactNode; children?: ReactNode }) {
  const fill = "ez:[&_[data-slot=button]]:w-full ez:lg:[&_[data-slot=button]]:w-auto";
  return (
    <div data-slot="order-action-bar" className="ez:grid ez:gap-2 ez:lg:flex ez:lg:flex-row-reverse ez:lg:justify-end">
      {primary && <div className={cn("ez:grid ez:lg:flex", fill)}>{primary}</div>}
      {children && <div className={cn("ez:grid ez:grid-cols-2 ez:gap-2 ez:lg:flex", fill)}>{children}</div>}
    </div>
  );
}
