"use client";

import { useActionState, useState } from "react";
import { Button } from "../../components/button";
import { Field, TextArea } from "../../components/field";
import { Photo } from "../../components/photo";
import { Quantity } from "../../components/quantity";
import type { FormAction, FormState } from "../../types";
import { cn, won } from "../../utils/cn";
import { focusRing } from "../../utils/styles";
import type { OrderItemView } from "../order-detail/order-detail";
import { Choice, fieldset, legend } from "../parts/choice";
import { form } from "../parts/form";
import { Notice } from "../parts/notice";
import { Status } from "../parts/status";
import { SummaryRows } from "../parts/summary-rows";

const LABEL = { return: "반품", exchange: "교환", cancel: "취소" } as const;

// Nothing is chosen up front. Items marked non-returnable open up only for a seller-fault reason.
// Each item row is one tap target; the refund estimate uses what was paid per item, less the return fee for a change of mind.
export function ClaimForm({
  kind,
  items,
  action,
  imageSrc,
  returnFee = 0,
}: {
  kind: keyof typeof LABEL;
  items: OrderItemView[];
  action: FormAction;
  imageSrc?: Record<string, string | null>;
  returnFee?: number;
}) {
  const [state, submit, pending] = useActionState<FormState, FormData>(action, {});
  const [fault, setFault] = useState<string | null>(null);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [reason, setReason] = useState("");
  if (state.ok) return <Notice>{state.message ?? "요청을 접수했어요."}</Notice>;
  const label = LABEL[kind];
  const unit = (item: OrderItemView) => Math.round(item.paid_amount / item.quantity);
  const open = items.map((item) => ({ item, left: item.quantity - item.returned_quantity })).filter((x) => x.left > 0);
  const locked = (item: OrderItemView) => kind !== "cancel" && item.non_returnable && fault !== "seller";
  const chosen = open.filter(({ item }) => picked[item.id] && !locked(item));
  const amount = chosen.reduce((sum, { item }) => sum + unit(item) * picked[item.id], 0);
  const fee = kind === "return" && fault === "customer" ? Math.min(returnFee, amount) : 0;
  const row = "ez:py-2.5";
  return (
    <form data-slot="claim-form" action={submit} className={form}>
      <input type="hidden" name="kind" value={kind} />
      <fieldset className={cn(fieldset, "ez:gap-0")}>
        <legend className={legend}>사유</legend>
        <Choice type="radio" name="fault" value="customer" required checked={fault === "customer"} onChange={() => setFault("customer")} label="단순 변심" className={row} />
        {kind !== "cancel" && (
          <Choice type="radio" name="fault" value="seller" checked={fault === "seller"} onChange={() => setFault("seller")} label="상품 문제 (파손·오배송)" className={row} />
        )}
      </fieldset>
      <fieldset className={cn(fieldset, "ez:gap-0")}>
        <legend className={legend}>{label}할 상품</legend>
        {open.map(({ item, left }) => {
          const off = locked(item);
          return (
            <div key={item.id} className={cn("ez:flex ez:min-h-16 ez:items-center ez:gap-3", off && "ez:text-muted")}>
              <label className={cn("ez:flex ez:min-w-0 ez:flex-1 ez:items-center ez:gap-3 ez:py-2", off ? "ez:cursor-not-allowed" : "ez:cursor-pointer")}>
                <input
                  type="checkbox"
                  disabled={off}
                  checked={Boolean(picked[item.id]) && !off}
                  onChange={(e) => setPicked((p) => ({ ...p, [item.id]: e.target.checked ? left : 0 }))}
                  className={cn("ez:m-0 ez:size-5 ez:shrink-0 ez:accent-primary", focusRing)}
                />
                {imageSrc && (
                  <Photo src={imageSrc[item.id]} alt="" sizes="44px" className={cn("ez:w-11 ez:shrink-0 ez:aspect-[4/5]", off && "ez:opacity-45")} />
                )}
                <span className="ez:grid ez:min-w-0">
                  <span>
                    {item.product_name}
                    {item.option_label && <span className="ez:text-muted"> {item.option_label}</span>}
                  </span>
                  {off ? (
                    <Status icon="ban">교환·반품 불가</Status>
                  ) : (
                    <span className="ez:text-[13px] ez:tabular-nums ez:text-muted">
                      {won(unit(item))} · {label} 가능 {left}개
                    </span>
                  )}
                </span>
              </label>
              {!off && left > 1 && (
                <Quantity
                  name={`qty_${item.id}`}
                  label={item.product_name}
                  size="sm"
                  min={1}
                  max={left}
                  value={picked[item.id] || left}
                  onChange={(n) => setPicked((p) => ({ ...p, [item.id]: n }))}
                />
              )}
            </div>
          );
        })}
      </fieldset>
      {chosen.map(({ item }) => (
        <input key={item.id} type="hidden" name="item" value={`${item.id}:${picked[item.id]}`} />
      ))}
      <Field label="자세한 사유">
        <TextArea name="reason" required minLength={2} maxLength={500} value={reason} onChange={(e) => setReason(e.target.value)} />
      </Field>
      {kind !== "exchange" && chosen.length > 0 && (
        <div className="ez:rounded-md ez:bg-surface-alt ez:p-4">
          <SummaryRows
            rows={[
              { label: "상품 금액", value: amount },
              ...(fee > 0 ? [{ label: "반품 배송비 (단순 변심)", value: fee, minus: true }] : []),
            ]}
            total={{ label: "환불 예정 금액", value: amount - fee }}
          />
        </div>
      )}
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <Button type="submit" block disabled={pending || !fault || !chosen.length}>
        {label} 신청
      </Button>
    </form>
  );
}
