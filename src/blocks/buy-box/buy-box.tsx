"use client";

import { useActionState, useState } from "react";
import { Button, ButtonLink } from "../../components/button";
import { Price } from "../../components/price";
import { Quantity } from "../../components/quantity";
import { Sheet } from "../../components/sheet";
import type { FormAction, FormState, ProductDetail } from "../../types";
import { won } from "../../utils/cn";

export function BuyBox({
  product,
  addAction,
  selling = true,
}: {
  product: ProductDetail;
  addAction: FormAction;
  selling?: boolean;
}) {
  const first = product.variants.find((v) => v.in_stock) ?? product.variants[0];
  const [variantId, setVariantId] = useState(first?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [state, add, pending] = useActionState<FormState, FormData>(async (prev, data) => {
    const next = await addAction(prev, data);
    if (next.ok) setSheetOpen(true);
    return next;
  }, {});
  const variant = product.variants.find((v) => v.id === variantId);
  const blocked = !selling || product.sold_out || !variant?.in_stock;
  const unit = variant?.price ?? product.sale_price;
  return (
    <form className="ez-buybox" action={add}>
      <h1 className="ez-buybox__name">{product.name}</h1>
      <Price value={unit} list={product.list_price > unit ? product.list_price : undefined} />
      {product.variants.length > 1 && (
        <fieldset className="ez-options">
          <legend>{product.option_name ?? "옵션"}</legend>
          {product.variants.map((v) => (
            <label key={v.id} className="ez-option" data-disabled={!v.in_stock || undefined}>
              <input
                type="radio"
                name="variant_id"
                value={v.id}
                checked={variantId === v.id}
                disabled={!v.in_stock}
                onChange={() => setVariantId(v.id)}
              />
              <span>{v.label ?? "기본"}</span>
              <span className="ez-option__price">{v.in_stock ? won(v.price) : "품절"}</span>
            </label>
          ))}
        </fieldset>
      )}
      {product.variants.length <= 1 && <input type="hidden" name="variant_id" value={variantId} />}
      <div className="ez-buybox__row">
        <span>수량</span>
        <Quantity value={quantity} onChange={setQuantity} />
      </div>
      <p className="ez-buybox__total">
        합계 <strong>{won(unit * quantity)}</strong>
      </p>
      {product.non_returnable && (
        <p className="ez-notice" role="note">
          이 상품은 주문 제작 등의 이유로 단순 변심에 의한 교환·반품이 불가합니다.
        </p>
      )}
      {!selling && <p className="ez-notice">지금은 주문을 받지 않는 상점입니다.</p>}
      {state.error && (
        <p className="ez-error" role="alert">
          {state.error}
        </p>
      )}
      <div className="ez-buybox__actions">
        <Button type="submit" variant="secondary" disabled={blocked || pending}>
          {product.sold_out ? "품절" : "장바구니 담기"}
        </Button>
        <Button
          disabled={blocked}
          onClick={() =>
            window.location.assign(`/checkout?item=${encodeURIComponent(variantId)}&qty=${quantity}`)
          }
        >
          바로 구매
        </Button>
      </div>
      <Sheet open={sheetOpen} title="장바구니에 담았어요" onClose={() => setSheetOpen(false)}>
        <p>{state.message}</p>
        <div className="ez-buybox__actions">
          <Button variant="secondary" onClick={() => setSheetOpen(false)}>
            계속 쇼핑
          </Button>
          <ButtonLink href="/cart">장바구니 보기</ButtonLink>
        </div>
      </Sheet>
    </form>
  );
}
