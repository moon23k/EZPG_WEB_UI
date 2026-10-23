import { ButtonLink } from "../../components/button";
import { EmptyState } from "../../components/empty-state";
import type { CartLineData as Line } from "../../types";
import { won } from "../../utils/cn";
import { CartLine } from "../cart-line";
import { lineList } from "../parts/line-item";
import { Notice } from "../parts/notice";

export function CartView({
  lines,
  itemsTotal,
  updateAction,
  removeAction,
}: {
  lines: Line[];
  itemsTotal: number;
  updateAction: (data: FormData) => void | Promise<void>;
  removeAction: (data: FormData) => void | Promise<void>;
}) {
  if (!lines.length) {
    return (
      <EmptyState title="장바구니가 비어 있어요.">
        <ButtonLink href="/products">상품 보러 가기</ButtonLink>
      </EmptyState>
    );
  }
  const blocked = lines.some((l) => !l.sellable || !l.enough_stock);
  return (
    <div data-slot="cart-view" className="ez:grid ez:gap-6 ez:md:grid-cols-[2fr_1fr] ez:md:items-start">
      <ul className={lineList}>
        {lines.map((line) => (
          <CartLine key={line.variant_id} line={line} updateAction={updateAction} removeAction={removeAction} />
        ))}
      </ul>
      <div className="ez:grid ez:gap-3 ez:rounded-md ez:bg-surface-alt ez:p-5">
        <p className="ez:m-0 ez:flex ez:justify-between ez:tabular-nums">
          상품 합계 <strong>{won(itemsTotal)}</strong>
        </p>
        <Notice>배송비는 주문서에서 배송지를 넣으면 계산돼요.</Notice>
        {blocked ? (
          <Notice tone="error">판매 중지·재고 부족 상품을 빼야 주문할 수 있어요.</Notice>
        ) : (
          <ButtonLink href="/checkout" block>
            주문하기
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
