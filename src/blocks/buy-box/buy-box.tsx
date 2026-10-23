"use client";

import { useActionState, useState } from "react";
import { Badge } from "../../components/badge";
import { Button, ButtonLink } from "../../components/button";
import { Photo } from "../../components/photo";
import { Price } from "../../components/price";
import { Quantity } from "../../components/quantity";
import { Sheet } from "../../components/sheet";
import type { FormAction, FormState, ProductDetail } from "../../types";
import { cn, won } from "../../utils/cn";
import { fieldset, legend } from "../parts/choice";
import { Notice } from "../parts/notice";
import { Status } from "../parts/status";

const bell = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

// Variant prices are final prices with no list price of their own, so a discount is shown only when every variant shares one price.
export function BuyBox({
  product,
  addAction,
  restockAction,
  selling = true,
  checkoutPath = "/checkout",
}: {
  product: ProductDetail;
  addAction: FormAction;
  restockAction?: (data: FormData) => void | Promise<void>;
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
  const soldOut = product.sold_out || (product.variants.length > 0 && !product.variants.some((v) => v.in_stock));
  const variant = product.variants.find((v) => v.id === variantId);
  const blocked = !selling || soldOut || !variant?.in_stock;
  const unit = variant?.price ?? product.sale_price;
  const prices = product.variants.map((v) => v.price);
  const from = new Set(prices).size > 1 ? Math.min(...prices) : null;
  const options = product.variants.length > 1;
  return (
    <form data-slot="buy-box" action={add} className="ez:grid ez:max-w-120 ez:gap-4 ez:text-fg">
      <div className="ez:grid ez:gap-1">
        <h1 className="ez:m-0 ez:font-display ez:font-title ez:text-2xl ez:tracking-brand">{product.name}</h1>
        {soldOut ? (
          <span className="ez:flex ez:items-center ez:gap-2">
            <strong className="ez:text-lg ez:font-bold ez:tabular-nums ez:text-muted">
              {won(from ?? product.sale_price)}
              {from !== null && <span className="ez:font-normal">부터</span>}
            </strong>
            <Badge tone="warn">품절</Badge>
          </span>
        ) : from !== null ? (
          <span className="ez:text-lg ez:tabular-nums">
            <strong className="ez:font-bold">{won(from)}</strong>
            <span className="ez:text-muted">부터</span>
          </span>
        ) : (
          <Price value={unit} list={product.list_price > unit ? product.list_price : undefined} className="ez:text-lg" />
        )}
      </div>
      {!selling && !soldOut && (
        <p className="ez:m-0 ez:flex ez:items-center ez:gap-2 ez:rounded-md ez:bg-surface-alt ez:p-3 ez:text-sm">
          <Status icon="alert">지금은 주문을 받지 않는 상점이에요</Status>
        </p>
      )}
      {options ? (
        <fieldset disabled={!selling} className={cn(fieldset, !selling && "ez:opacity-50")}>
          <legend className={legend}>{product.option_name ?? "옵션"}</legend>
          {product.variants.map((v) => (
            <label
              key={v.id}
              className={cn(
                "ez:flex ez:cursor-pointer ez:items-center ez:justify-between ez:gap-3 ez:rounded-md ez:border ez:border-solid ez:border-primary-border ez:p-3",
                "ez:has-checked:border-[1.5px] ez:has-checked:border-primary ez:has-checked:bg-primary-tint ez:has-focus-visible:outline-2 ez:has-focus-visible:outline-offset-2 ez:has-focus-visible:outline-primary",
                "ez:has-disabled:cursor-not-allowed ez:has-disabled:text-muted/70",
              )}
            >
              <input
                type="radio"
                name="variant_id"
                value={v.id}
                checked={selling && !soldOut && variantId === v.id}
                disabled={!v.in_stock}
                onChange={() => setVariantId(v.id)}
                className="ez:sr-only"
              />
              <span className="ez:min-w-0">
                {!v.in_stock && "(품절) "}
                {v.label ?? "기본"}
              </span>
              <span className="ez:shrink-0 ez:whitespace-nowrap ez:text-sm ez:tabular-nums">{won(v.price)}</span>
            </label>
          ))}
        </fieldset>
      ) : (
        <input type="hidden" name="variant_id" value={variantId} />
      )}
      {soldOut ? (
        restockAction ? (
          <Button type="submit" variant="outline" formAction={restockAction} block>
            {bell}
            재입고 알림
          </Button>
        ) : (
          <Button variant="outline" disabled block>
            품절
          </Button>
        )
      ) : selling ? (
        <>
          <div className="ez:flex ez:items-center ez:justify-between">
            <span className="ez:text-sm ez:font-semibold">수량</span>
            <Quantity value={quantity} onChange={setQuantity} size="sm" />
          </div>
          <div className="ez:grid ez:gap-1.5">
            <p className="ez:m-0 ez:flex ez:items-baseline ez:justify-between ez:gap-3">
              <span>총 상품금액</span>
              <strong className="ez:text-xl ez:font-semibold ez:tracking-[-0.02em] ez:tabular-nums ez:whitespace-nowrap">
                {(unit * quantity).toLocaleString("ko-KR")}
                <span className="ez:text-base">원</span>
              </strong>
            </p>
            {product.non_returnable && <Status icon="ban">교환·반품 불가</Status>}
          </div>
          {state.error && <Notice tone="error">{state.error}</Notice>}
          <div className="ez:grid ez:grid-cols-2 ez:gap-2">
            <Button type="submit" variant="outline" disabled={blocked || pending}>
              장바구니 담기
            </Button>
            {blocked ? (
              <Button disabled>바로 구매</Button>
            ) : (
              <ButtonLink href={`${checkoutPath}?item=${encodeURIComponent(variantId)}&qty=${quantity}`}>바로 구매</ButtonLink>
            )}
          </div>
        </>
      ) : null}
      <Sheet open={sheetOpen} title="장바구니에 담았어요" onClose={() => setSheetOpen(false)}>
        <div className="ez:flex ez:items-center ez:gap-3">
          <Photo src={product.cover_url} alt="" sizes="64px" className="ez:w-16 ez:shrink-0 ez:aspect-[4/5]" />
          <div className="ez:grid ez:gap-0.5">
            <span>{product.name}</span>
            <span className="ez:text-[13px] ez:text-muted">
              {[options ? variant?.label : null, `${quantity}개`].filter(Boolean).join(" · ")}
            </span>
            <strong className="ez:font-semibold ez:tabular-nums">{won(unit * quantity)}</strong>
          </div>
        </div>
        <div className="ez:grid ez:grid-cols-2 ez:gap-2">
          <Button variant="secondary" onClick={() => setSheetOpen(false)}>
            계속 쇼핑하기
          </Button>
          <ButtonLink href="/cart">장바구니 보기</ButtonLink>
        </div>
      </Sheet>
    </form>
  );
}
