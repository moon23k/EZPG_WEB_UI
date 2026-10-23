"use client";

import { useActionState, useState } from "react";
import { Button } from "../../components/button";
import { Field, TextArea } from "../../components/field";
import type { FormAction, FormState } from "../../types";
import type { OrderItemView } from "../order-detail/order-detail";
import { Choice, fieldset, legend } from "../parts/choice";
import { form } from "../parts/form";
import { Notice } from "../parts/notice";

const LABEL = { return: "반품", exchange: "교환", cancel: "취소" } as const;

export function ClaimForm({
  kind,
  items,
  action,
}: {
  kind: keyof typeof LABEL;
  items: OrderItemView[];
  action: FormAction;
}) {
  const [state, submit, pending] = useActionState<FormState, FormData>(action, {});
  const [reason, setReason] = useState("");
  if (state.ok) return <Notice>{state.message ?? "요청을 접수했어요."}</Notice>;
  const label = LABEL[kind];
  return (
    <form data-slot="claim-form" action={submit} className={form}>
      <input type="hidden" name="kind" value={kind} />
      <fieldset className={fieldset}>
        <legend className={legend}>{label}할 상품</legend>
        {items.map((item) => (
          <Choice
            key={item.id}
            type="checkbox"
            name="item"
            value={`${item.id}:${item.quantity}`}
            defaultChecked
            label={`${item.product_name} ${item.option_label ?? ""} · ${item.quantity}개`}
            description={item.non_returnable && kind !== "cancel" ? "단순 변심 불가 상품" : undefined}
          />
        ))}
      </fieldset>
      <fieldset className={fieldset}>
        <legend className={legend}>사유</legend>
        <Choice type="radio" name="fault" value="customer" defaultChecked label="단순 변심" />
        {kind !== "cancel" && <Choice type="radio" name="fault" value="seller" label="상품 문제(파손·오배송)" />}
      </fieldset>
      <Field label="자세한 사유">
        <TextArea name="reason" required minLength={2} maxLength={500} value={reason} onChange={(e) => setReason(e.target.value)} />
      </Field>
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <Button type="submit" disabled={pending} className="ez:justify-self-start">
        {label} 요청
      </Button>
    </form>
  );
}
