"use client";

import { useActionState, useState } from "react";
import { Button } from "../../components/button";
import { Checkbox } from "../../components/checkbox";
import { Field, TextArea } from "../../components/field";
import { Photo } from "../../components/photo";
import { Quantity } from "../../components/quantity";
import type { FormAction, FormState } from "../../types";
import { cn } from "../../utils/cn";
import type { OrderItemView } from "../order-detail/order-detail";
import { Choice, fieldset, legend } from "../parts/choice";
import { form } from "../parts/form";
import { Notice } from "../parts/notice";
import { Status } from "../parts/status";

const LABEL = { return: "반품", exchange: "교환", cancel: "취소" } as const;

// Nothing is chosen up front. Items marked non-returnable open up only for a seller-fault reason.
export function ClaimForm({
  kind,
  items,
  action,
  imageSrc,
}: {
  kind: keyof typeof LABEL;
  items: OrderItemView[];
  action: FormAction;
  imageSrc?: Record<string, string | null>;
}) {
  const [state, submit, pending] = useActionState<FormState, FormData>(action, {});
  const [fault, setFault] = useState<string | null>(null);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [reason, setReason] = useState("");
  if (state.ok) return <Notice>{state.message ?? "요청을 접수했어요."}</Notice>;
  const label = LABEL[kind];
  const open = items.map((item) => ({ item, left: item.quantity - item.returned_quantity })).filter((x) => x.left > 0);
  const locked = (item: OrderItemView) => kind !== "cancel" && item.non_returnable && fault !== "seller";
  const chosen = open.filter(({ item }) => picked[item.id] && !locked(item));
  return (
    <form data-slot="claim-form" action={submit} className={form}>
      <input type="hidden" name="kind" value={kind} />
      <fieldset className={fieldset}>
        <legend className={legend}>사유</legend>
        <Choice type="radio" name="fault" value="customer" required checked={fault === "customer"} onChange={() => setFault("customer")} label="단순 변심" />
        {kind !== "cancel" && (
          <Choice type="radio" name="fault" value="seller" checked={fault === "seller"} onChange={() => setFault("seller")} label="상품 문제 (파손·오배송)" />
        )}
      </fieldset>
      <fieldset className={fieldset}>
        <legend className={legend}>{label}할 상품</legend>
        {open.map(({ item, left }) => {
          const off = locked(item);
          return (
            <div key={item.id} className={cn("ez:flex ez:items-center ez:gap-3", off && "ez:text-muted")}>
              <Checkbox
                aria-label={`${item.product_name} 선택`}
                label={<span className="ez:sr-only">{item.product_name}</span>}
                disabled={off}
                checked={Boolean(picked[item.id]) && !off}
                onCheckedChange={(v) => setPicked((p) => ({ ...p, [item.id]: v === true ? left : 0 }))}
                className="ez:items-center ez:gap-0"
              />
              {imageSrc && (
                <Photo src={imageSrc[item.id]} alt="" sizes="40px" className={cn("ez:w-10 ez:shrink-0 ez:aspect-[4/5]", off && "ez:opacity-45")} />
              )}
              <span className="ez:grid ez:min-w-0 ez:flex-1">
                <span className="ez:truncate">
                  {item.product_name}
                  {item.option_label && <span className="ez:text-muted"> {item.option_label}</span>}
                </span>
                {off ? (
                  <Status icon="ban">교환·반품 불가</Status>
                ) : (
                  <span className="ez:text-[13px] ez:text-muted">
                    {label} 가능 {left}개
                  </span>
                )}
              </span>
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
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <Button type="submit" block disabled={pending || !fault || !chosen.length}>
        {label} 신청
      </Button>
    </form>
  );
}
