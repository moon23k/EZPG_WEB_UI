"use client";

import { useActionState, useState } from "react";
import { Button } from "../../components/button";
import { Field, TextArea } from "../../components/field";
import type { FormAction, FormState } from "../../types";
import { Choice, fieldset, legend } from "../parts/choice";
import { form } from "../parts/form";
import { Notice } from "../parts/notice";

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
  if (state.ok) return <Notice>{productName} 후기를 남겼어요.</Notice>;
  return (
    <form data-slot="review-form" action={submit} className={form}>
      <input type="hidden" name="order_item_id" value={orderItemId} />
      <strong>{productName}</strong>
      <fieldset className={fieldset}>
        <legend className={legend}>별점</legend>
        <div className="ez:flex ez:flex-wrap ez:gap-4">
          {[5, 4, 3, 2, 1].map((n) => (
            <Choice key={n} type="radio" name="rating" value={n} defaultChecked={n === 5} label={`${n}점`} />
          ))}
        </div>
      </fieldset>
      <Field label="후기">
        <TextArea name="body" required minLength={5} maxLength={2000} value={body} onChange={(e) => setBody(e.target.value)} />
      </Field>
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <Button type="submit" disabled={pending} className="ez:justify-self-start">
        후기 등록
      </Button>
    </form>
  );
}
