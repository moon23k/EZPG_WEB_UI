"use client";

import { useState } from "react";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

const step = cn(
  "ez:m-0 ez:p-0 ez:border-0 ez:bg-transparent ez:text-fg ez:cursor-pointer",
  "ez:disabled:cursor-not-allowed ez:disabled:opacity-35",
  focusRing,
);

const sizes = {
  md: { box: "ez:rounded-sm", step: "ez:size-11 ez:text-lg", input: "ez:w-10" },
  sm: { box: "ez:h-8 ez:rounded-md", step: "ez:size-8 ez:text-base", input: "ez:w-8" },
};

export function Quantity({
  name = "quantity",
  value,
  min = 1,
  max = 99,
  onChange,
  label,
  size = "md",
  className,
}: {
  name?: string;
  label?: string;
  size?: keyof typeof sizes;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}) {
  const [own, setOwn] = useState(value ?? min);
  const current = value ?? own;
  const z = sizes[size];
  const prefix = label ? `${label} ` : "";
  const set = (next: number) => {
    const clamped = Math.max(min, Math.min(max, next));
    setOwn(clamped);
    onChange?.(clamped);
  };
  return (
    <span
      data-slot="quantity"
      className={cn(
        "ez:inline-flex ez:items-center ez:box-border ez:border ez:border-solid ez:border-primary-border ez:bg-surface",
        z.box,
        className,
      )}
    >
      <button type="button" className={cn(step, z.step)} aria-label={`${prefix}수량 줄이기`} onClick={() => set(current - 1)} disabled={current <= min}>
        −
      </button>
      <input
        name={name}
        value={current}
        readOnly
        aria-label={`${prefix}수량`}
        inputMode="numeric"
        className={cn(z.input, "ez:m-0 ez:p-0 ez:border-0 ez:bg-transparent ez:text-center ez:text-fg ez:font-body ez:text-base ez:tabular-nums")}
      />
      <button type="button" className={cn(step, z.step)} aria-label={`${prefix}수량 늘리기`} onClick={() => set(current + 1)} disabled={current >= max}>
        +
      </button>
    </span>
  );
}
