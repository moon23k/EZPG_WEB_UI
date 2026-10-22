import { ButtonLink } from "../../components/button";
import { EmptyState } from "../../components/empty-state";
import type { CartLine as Line } from "../../types";
import { won } from "../../utils/cn";
import { CartLine } from "../cart-line";

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
    <div className="ez-cart">
      <ul className="ez-lines">
        {lines.map((line) => (
          <CartLine key={line.variant_id} line={line} updateAction={updateAction} removeAction={removeAction} />
        ))}
      </ul>
      <div className="ez-cart__summary">
        <p>
          상품 합계 <strong>{won(itemsTotal)}</strong>
        </p>
        <p className="ez-muted">배송비는 주문서에서 배송지를 넣으면 계산돼요.</p>
        {blocked ? (
          <p className="ez-error">판매 중지·재고 부족 상품을 빼야 주문할 수 있어요.</p>
        ) : (
          <ButtonLink href="/checkout" block>
            주문하기
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
