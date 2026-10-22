"use client";

import { useActionState, useState } from "react";
import { Button } from "../../components/button";
import { Field, TextArea } from "../../components/field";
import type { FormAction, FormState } from "../../types";

export function ReviewForm({
  orderItemId,
  productName,
  action,
}: {
  orderItemId: string;
  productName: string;
  action: FormAction;
}) {
  const [state, submit, pending] = useActionState<FormState, FormData>(action, {});
  const [body, setBody] = useState("");
  if (state.ok) return <p className="ez-muted">{productName} 후기를 남겼어요.</p>;
  return (
    <form action={submit} className="ez-form ez-review-form">
      <input type="hidden" name="order_item_id" value={orderItemId} />
      <strong>{productName}</strong>
      <fieldset className="ez-rating">
        <legend>별점</legend>
        {[5, 4, 3, 2, 1].map((n) => (
          <label key={n}>
            <input type="radio" name="rating" value={n} defaultChecked={n === 5} />
            {n}점
          </label>
        ))}
      </fieldset>
      <Field label="후기">
        <TextArea name="body" required minLength={5} maxLength={2000} value={body} onChange={(e) => setBody(e.target.value)} />
      </Field>
      {state.error && (
        <p className="ez-error" role="alert">
          {state.error}
        </p>
      )}
      <Button type="submit" disabled={pending}>
        후기 등록
      </Button>
    </form>
  );
}
