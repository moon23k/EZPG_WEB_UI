"use client";

import { useState } from "react";

export function Quantity({
  name = "quantity",
  value,
  min = 1,
  max = 99,
  onChange,
}: {
  name?: string;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}) {
  const [own, setOwn] = useState(value ?? min);
  const current = value ?? own;
  const set = (next: number) => {
    const clamped = Math.max(min, Math.min(max, next));
    setOwn(clamped);
    onChange?.(clamped);
  };
  return (
    <span className="ez-qty">
      <button type="button" aria-label="수량 줄이기" onClick={() => set(current - 1)} disabled={current <= min}>
        −
      </button>
      <input name={name} value={current} readOnly aria-label="수량" inputMode="numeric" />
      <button type="button" aria-label="수량 늘리기" onClick={() => set(current + 1)} disabled={current >= max}>
        +
      </button>
    </span>
  );
}
