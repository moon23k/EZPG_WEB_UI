"use client";

import { useActionState, useState } from "react";
import { Button } from "../../components/button";
import { Field, TextArea } from "../../components/field";
import { Photo } from "../../components/photo";
import type { FormAction, FormState } from "../../types";
import { cn } from "../../utils/cn";
import { fieldset, legend } from "../parts/choice";
import { form } from "../parts/form";
import { Notice } from "../parts/notice";

const star = "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z";

// The rating starts empty and is required, so no score is given on the buyer's behalf. The hint shows why the button waits.
export function ReviewForm({
  orderItemId,
  productName,
  option,
  imageSrc,
  action,
}: {
  orderItemId: string;
  productName: string;
  option?: string | null;
  imageSrc?: string | null;
  action: FormAction;
}) {
  const [state, submit, pending] = useActionState<FormState, FormData>(action, {});
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  if (state.ok) return <Notice>{productName} 후기를 남겼어요.</Notice>;
  return (
    <form data-slot="review-form" action={submit} className={form}>
      <input type="hidden" name="order_item_id" value={orderItemId} />
      <div className="ez:flex ez:items-center ez:gap-3">
        {imageSrc !== undefined && <Photo src={imageSrc} alt="" sizes="40px" className="ez:w-10 ez:shrink-0 ez:aspect-[4/5]" />}
        <span className="ez:grid">
          <strong className="ez:font-semibold">{productName}</strong>
          {option && <span className="ez:text-[13px] ez:text-muted">{option}</span>}
        </span>
      </div>
      <fieldset className={fieldset}>
        <legend className={legend}>별점</legend>
        <div className="ez:-ml-1 ez:flex">
          {[1, 2, 3, 4, 5].map((n) => (
            <label
              key={n}
              className={cn(
                "ez:flex ez:size-11 ez:cursor-pointer ez:items-center ez:justify-center ez:rounded-md",
                "ez:has-focus-visible:outline-2 ez:has-focus-visible:outline-primary",
                n <= rating ? "ez:text-primary" : "ez:text-muted/70",
              )}
            >
              <input type="radio" name="rating" value={n} required checked={rating === n} onChange={() => setRating(n)} className="ez:sr-only" />
              <span className="ez:sr-only">{n}점</span>
              <svg width="32" height="32" viewBox="0 0 24 24" fill={n <= rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" aria-hidden="true">
                <path d={star} />
              </svg>
            </label>
          ))}
        </div>
      </fieldset>
      <Field label="후기" hint={`5자 이상 · ${body.length.toLocaleString("ko-KR")} / 2,000`}>
        <TextArea name="body" required minLength={5} maxLength={2000} value={body} onChange={(e) => setBody(e.target.value)} />
      </Field>
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <Button type="submit" block disabled={pending || !rating || body.trim().length < 5}>
        후기 등록
      </Button>
    </form>
  );
}
