"use client";

import { useActionState, useState } from "react";
import { Button, ButtonLink } from "../../components/button";
import { Price } from "../../components/price";
import { Quantity } from "../../components/quantity";
import { Sheet } from "../../components/sheet";
import type { FormAction, FormState, ProductDetail } from "../../types";
import { cn, won } from "../../utils/cn";
import { fieldset, legend } from "../parts/choice";
import { Notice } from "../parts/notice";
import { Status } from "../parts/status";

export function BuyBox({
  product,
  addAction,
  selling = true,
  checkoutPath = "/checkout",
}: {
  product: ProductDetail;
  addAction: FormAction;
  selling?: boolean;
  checkoutPath?: string;
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
    <form data-slot="buy-box" action={add} className="ez:grid ez:gap-4 ez:text-fg">
      <div className="ez:grid ez:gap-1">
        <h1 className="ez:m-0 ez:font-display ez:font-title ez:text-2xl ez:tracking-brand">{product.name}</h1>
        <Price value={unit} list={product.list_price > unit ? product.list_price : undefined} className="ez:text-lg" />
      </div>
      {product.variants.length > 1 ? (
        <fieldset className={fieldset}>
          <legend className={legend}>{product.option_name ?? "옵션"}</legend>
          {product.variants.map((v) => (
            <label
              key={v.id}
              className={cn(
                "ez:flex ez:cursor-pointer ez:items-center ez:gap-2.5 ez:rounded-sm ez:border ez:border-solid ez:border-primary-border ez:px-3 ez:py-3",
                "ez:has-checked:border-primary ez:has-checked:bg-primary-tint ez:has-disabled:cursor-not-allowed ez:has-disabled:opacity-45",
              )}
            >
              <input
                type="radio"
                name="variant_id"
                value={v.id}
                checked={variantId === v.id}
                disabled={!v.in_stock}
                onChange={() => setVariantId(v.id)}
                className="ez:m-0 ez:size-4 ez:accent-primary"
              />
              <span className="ez:flex-1">{v.label ?? "기본"}</span>
              <span className="ez:text-sm ez:tabular-nums ez:text-muted">{v.in_stock ? won(v.price) : "품절"}</span>
            </label>
          ))}
        </fieldset>
      ) : (
        <input type="hidden" name="variant_id" value={variantId} />
      )}
      <div className="ez:flex ez:items-center ez:justify-between">
        <span className="ez:text-sm ez:font-semibold">수량</span>
        <Quantity value={quantity} onChange={setQuantity} />
      </div>
      <p className="ez:m-0 ez:flex ez:items-center ez:justify-between ez:gap-3">
        {product.non_returnable ? <Status icon="ban">교환·반품 불가</Status> : <span>합계</span>}
        <strong className="ez:text-xl ez:font-semibold ez:tracking-[-0.02em] ez:tabular-nums">
          {(unit * quantity).toLocaleString("ko-KR")}
          <span className="ez:text-base">원</span>
        </strong>
      </p>
      {!selling && <Status icon="alert">주문을 받지 않는 상점이에요</Status>}
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <div className="ez:grid ez:grid-cols-2 ez:gap-2">
        <Button type="submit" variant="secondary" disabled={blocked || pending}>
          {product.sold_out ? "품절" : "장바구니 담기"}
        </Button>
        {blocked ? (
          <Button disabled>바로 구매</Button>
        ) : (
          <ButtonLink href={`${checkoutPath}?item=${encodeURIComponent(variantId)}&qty=${quantity}`}>바로 구매</ButtonLink>
        )}
      </div>
      <Sheet open={sheetOpen} title="장바구니에 담았어요" description={state.message} onClose={() => setSheetOpen(false)}>
        <div className="ez:grid ez:grid-cols-2 ez:gap-2">
          <Button variant="secondary" onClick={() => setSheetOpen(false)}>
            계속 쇼핑
          </Button>
          <ButtonLink href="/cart">장바구니 보기</ButtonLink>
        </div>
      </Sheet>
    </form>
  );
}
