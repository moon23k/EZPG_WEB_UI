"use client";

import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { useMemo, useState } from "react";
import { Button, ButtonLink } from "../../components/button";
import { EmptyState } from "../../components/empty-state";
import type { CartLineData as Line } from "../../types";
import { cn, won } from "../../utils/cn";
import { focusRing } from "../../utils/styles";
import { CartLine } from "../cart-line";
import { ArrowIcon, BagIcon, emptyAction } from "../parts/empty-icons";
import { lineList } from "../parts/line-item";

const boxClass = cn(
  "ez:size-5 ez:shrink-0 ez:box-border ez:p-0 ez:rounded-sm ez:border-2 ez:border-solid ez:border-muted ez:bg-surface ez:text-on-primary ez:cursor-pointer",
  "ez:data-[state=checked]:border-primary ez:data-[state=checked]:bg-primary",
  "ez:disabled:cursor-not-allowed ez:disabled:border-primary-border ez:disabled:bg-surface-alt",
  focusRing,
);

function Box(props: { checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void; label: string }) {
  return (
    <CheckboxPrimitive.Root
      checked={props.checked}
      disabled={props.disabled}
      onCheckedChange={(v) => props.onChange?.(v === true)}
      aria-label={props.label}
      className={boxClass}
    >
      <CheckboxPrimitive.Indicator className="ez:flex ez:items-center ez:justify-center">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

// Lines that cannot be bought are left out automatically; the order button always reflects what will be bought.
export function CartView({
  lines,
  updateAction,
  removeAction,
  checkoutHref = "/checkout",
  imageSrc,
}: {
  lines: Line[];
  itemsTotal?: number;
  updateAction: (data: FormData) => void | Promise<void>;
  removeAction: (data: FormData) => void | Promise<void>;
  checkoutHref?: string;
  imageSrc?: Record<string, string | null>;
}) {
  const buyable = useMemo(() => lines.filter((l) => l.sellable && l.enough_stock).map((l) => l.variant_id), [lines]);
  const [unchecked, setUnchecked] = useState<Set<string>>(new Set());
  if (!lines.length) {
    return (
      <EmptyState icon={<BagIcon />} count={0} title="장바구니에 담긴 상품이 없어요">
        <ButtonLink href="/products" className={emptyAction}>
          쇼핑하기
          <ArrowIcon />
        </ButtonLink>
      </EmptyState>
    );
  }
  const selected = buyable.filter((id) => !unchecked.has(id));
  const total = lines.filter((l) => selected.includes(l.variant_id)).reduce((sum, l) => sum + l.line_total, 0);
  const allChecked = selected.length > 0 && selected.length === buyable.length;
  const toggle = (id: string, on: boolean) =>
    setUnchecked((prev) => {
      const next = new Set(prev);
      if (on) next.delete(id);
      else next.add(id);
      return next;
    });
  const href = `${checkoutHref}?items=${selected.map(encodeURIComponent).join(",")}`;
  return (
    <div data-slot="cart-view" className="ez:grid ez:gap-6 ez:md:grid-cols-[2fr_1fr] ez:md:items-start ez:text-fg">
      <div>
        <label className="ez:flex ez:h-13 ez:cursor-pointer ez:items-center ez:gap-2.5 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:text-base">
          <Box
            checked={allChecked}
            disabled={!buyable.length}
            onChange={(on) => setUnchecked(on ? new Set() : new Set(buyable))}
            label="전체 선택"
          />
          전체 선택
          <span className="ez:tabular-nums ez:text-muted">
            {selected.length}/{lines.length}
          </span>
        </label>
        <ul className={lineList}>
          {lines.map((line) => {
            const available = buyable.includes(line.variant_id);
            return (
              <CartLine
                key={line.variant_id}
                line={line}
                updateAction={updateAction}
                removeAction={removeAction}
                imageSrc={imageSrc?.[line.variant_id] ?? null}
                selector={
                  <Box
                    checked={available && !unchecked.has(line.variant_id)}
                    disabled={!available}
                    onChange={(on) => toggle(line.variant_id, on)}
                    label={`${line.name} 선택`}
                  />
                }
              />
            );
          })}
        </ul>
      </div>
      <div className="ez:grid ez:gap-4 ez:md:rounded-md ez:md:bg-surface-alt ez:md:p-5">
        <p className="ez:m-0 ez:flex ez:items-baseline ez:justify-between">
          <span className="ez:text-base">상품 합계</span>
          <strong className="ez:text-xl ez:font-semibold ez:tracking-[-0.02em] ez:tabular-nums">
            {total.toLocaleString("ko-KR")}
            <span className="ez:text-base">원</span>
          </strong>
        </p>
        {selected.length ? (
          <ButtonLink href={href} block>
            {won(total)} 주문하기
          </ButtonLink>
        ) : (
          <Button block disabled>
            {won(0)} 주문하기
          </Button>
        )}
      </div>
    </div>
  );
}
