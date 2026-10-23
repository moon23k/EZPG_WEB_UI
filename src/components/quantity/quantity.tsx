"use client";

import { useState } from "react";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

const step = cn(
  "ez:size-11 ez:m-0 ez:p-0 ez:border-0 ez:bg-transparent ez:text-fg ez:text-lg ez:cursor-pointer",
  "ez:disabled:cursor-not-allowed ez:disabled:opacity-35",
  focusRing,
);

export function Quantity({
  name = "quantity",
  value,
  min = 1,
  max = 99,
  onChange,
  className,
}: {
  name?: string;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}) {
  const [own, setOwn] = useState(value ?? min);
  const current = value ?? own;
  const set = (next: number) => {
    const clamped = Math.max(min, Math.min(max, next));
    setOwn(clamped);
    onChange?.(clamped);
  };
  return (
    <span
      data-slot="quantity"
      className={cn(
        "ez:inline-flex ez:items-center ez:rounded-sm ez:border ez:border-solid ez:border-primary-border ez:bg-surface",
        className,
      )}
    >
      <button type="button" className={step} aria-label="수량 줄이기" onClick={() => set(current - 1)} disabled={current <= min}>
        −
      </button>
      <input
        name={name}
        value={current}
        readOnly
        aria-label="수량"
        inputMode="numeric"
        className="ez:w-10 ez:m-0 ez:p-0 ez:border-0 ez:bg-transparent ez:text-center ez:text-fg ez:font-body ez:text-base ez:tabular-nums"
      />
      <button type="button" className={step} aria-label="수량 늘리기" onClick={() => set(current + 1)} disabled={current >= max}>
        +
      </button>
    </span>
  );
}
