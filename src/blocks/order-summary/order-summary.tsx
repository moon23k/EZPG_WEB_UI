import type { Quote } from "../../types";
import { won } from "../../utils/cn";

export function OrderSummary({ quote }: { quote: Quote }) {
  const rows: [string, number, boolean][] = [
    ["상품 금액", quote.items_total, false],
    ["상품 할인", quote.product_discount, true],
    ["쿠폰 할인", quote.coupon_discount, true],
    ["배송비", quote.delivery_fee, false],
    ["지역 추가 배송비", quote.region_fee, false],
    ["배송비 할인", quote.shipping_discount, true],
    ["적립금 사용", quote.point_used, true],
  ];
  return (
    <dl className="ez-summary">
      {rows
        .filter(([label, value]) => value > 0 || label === "배송비")
        .map(([label, value, minus]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{minus ? `−${won(value)}` : won(value)}</dd>
          </div>
        ))}
      <div className="ez-summary__total">
        <dt>결제 금액</dt>
        <dd>{won(quote.total)}</dd>
      </div>
    </dl>
  );
}
