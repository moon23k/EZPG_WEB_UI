"use client";

import { useActionState, useState } from "react";
import { Button } from "../../components/button";
import { Field, TextArea } from "../../components/field";
import type { FormAction, FormState } from "../../types";
import type { OrderItemView } from "../order-detail/order-detail";

export function ClaimForm({
  kind,
  items,
  action,
}: {
  kind: "return" | "exchange" | "cancel";
  items: OrderItemView[];
  action: FormAction;
}) {
  const [state, submit, pending] = useActionState<FormState, FormData>(action, {});
  const [reason, setReason] = useState("");
  if (state.ok) return <p className="ez-muted">{state.message ?? "요청을 접수했어요."}</p>;
  const label = kind === "return" ? "반품" : kind === "exchange" ? "교환" : "취소";
  return (
    <form action={submit} className="ez-form">
      <input type="hidden" name="kind" value={kind} />
      <fieldset>
        <legend>{label}할 상품</legend>
        {items.map((item) => (
          <label key={item.id} className="ez-check">
            <input type="checkbox" name="item" value={`${item.id}:${item.quantity}`} defaultChecked />
            <span>
              {item.product_name} {item.option_label ?? ""} · {item.quantity}개
              {item.non_returnable && kind !== "cancel" ? " (단순 변심 불가)" : ""}
            </span>
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>사유</legend>
        <label className="ez-check">
          <input type="radio" name="fault" value="customer" defaultChecked /> 단순 변심
        </label>
        {kind !== "cancel" && (
          <label className="ez-check">
            <input type="radio" name="fault" value="seller" /> 상품 문제(파손·오배송)
          </label>
        )}
      </fieldset>
      <Field label="자세한 사유">
        <TextArea name="reason" required minLength={2} maxLength={500} value={reason} onChange={(e) => setReason(e.target.value)} />
      </Field>
      {state.error && (
        <p className="ez-error" role="alert">
          {state.error}
        </p>
      )}
      <Button type="submit" disabled={pending}>
        {label} 요청
      </Button>
    </form>
  );
}
