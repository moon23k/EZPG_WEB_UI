"use client";

import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { useMemo, useState } from "react";
import { Button, ButtonLink } from "../../components/button";
import { EmptyState } from "../../components/empty-state";
import type { CartLineData as Line } from "../../types";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";
import { CartLine } from "../cart-line";
import { BagIcon, emptyAction } from "../parts/empty-icons";
import { lineList } from "../parts/line-item";
import { SummaryRows } from "../parts/summary-rows";

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

function RemoveMany({ ids, action, children }: { ids: string[]; action: (data: FormData) => void | Promise<void>; children: string }) {
  return (
    <form action={action}>
      {ids.map((id) => (
        <input key={id} type="hidden" name="variant_id" value={id} />
      ))}
      <button
        type="submit"
        disabled={!ids.length}
        className={cn(
          "ez:-mr-2 ez:h-11 ez:border-0 ez:bg-transparent ez:px-2 ez:text-[13px] ez:text-muted ez:cursor-pointer ez:disabled:cursor-not-allowed ez:disabled:opacity-45",
          focusRing,
        )}
      >
        {children}
      </button>
    </form>
  );
}

// Lines that cannot be bought sit apart with no checkbox and are removed together. removeAction may receive several variant_id values.
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
  const [unchecked, setUnchecked] = useState<Set<string>>(new Set());
  const [buyable, blocked] = useMemo(() => {
    const ok = lines.filter((l) => l.sellable && l.enough_stock);
    return [ok, lines.filter((l) => !ok.includes(l))];
  }, [lines]);
  if (!lines.length) {
    return (
      <EmptyState icon={<BagIcon />} title="장바구니가 비어 있어요">
        <ButtonLink href="/products" className={emptyAction}>
          쇼핑하기
        </ButtonLink>
      </EmptyState>
    );
  }
  const picked = buyable.filter((l) => !unchecked.has(l.variant_id));
  const ids = picked.map((l) => l.variant_id);
  const list = picked.reduce((sum, l) => sum + l.list_price * l.quantity, 0);
  const total = picked.reduce((sum, l) => sum + l.line_total, 0);
  const allChecked = picked.length > 0 && picked.length === buyable.length;
  const toggle = (id: string, on: boolean) =>
    setUnchecked((prev) => {
      const next = new Set(prev);
      if (on) next.delete(id);
      else next.add(id);
      return next;
    });
  const row = (line: Line, available: boolean) => (
    <CartLine
      key={line.variant_id}
      line={line}
      updateAction={updateAction}
      removeAction={removeAction}
      imageSrc={imageSrc?.[line.variant_id] ?? null}
      selector={
        available ? (
          <Box checked={!unchecked.has(line.variant_id)} onChange={(on) => toggle(line.variant_id, on)} label={`${line.name} 선택`} />
        ) : (
          <span className="ez:w-5 ez:shrink-0" />
        )
      }
    />
  );
  return (
    <div data-slot="cart-view" className="ez:grid ez:gap-6 ez:lg:grid-cols-[minmax(0,1fr)_340px] ez:lg:items-start ez:text-fg">
      <div>
        <div className="ez:flex ez:h-13 ez:items-center ez:justify-between ez:border-0 ez:border-b ez:border-solid ez:border-primary-border">
          <label className="ez:flex ez:cursor-pointer ez:items-center ez:gap-2.5 ez:text-base">
            <Box
              checked={allChecked}
              disabled={!buyable.length}
              onChange={(on) => setUnchecked(on ? new Set() : new Set(buyable.map((l) => l.variant_id)))}
              label="전체선택"
            />
            전체선택
            <span className="ez:tabular-nums ez:text-muted">
              {picked.length}/{buyable.length}
            </span>
          </label>
          <RemoveMany ids={ids} action={removeAction}>
            선택삭제
          </RemoveMany>
        </div>
        <ul className={lineList}>{buyable.map((line) => row(line, true))}</ul>
        {blocked.length > 0 && (
          <>
            <div className="ez:flex ez:h-11 ez:items-center ez:justify-between ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:text-[13px] ez:text-muted">
              <span>구매할 수 없는 상품 {blocked.length}개</span>
              <RemoveMany ids={blocked.map((l) => l.variant_id)} action={removeAction}>
                모두 삭제
              </RemoveMany>
            </div>
            <ul className={lineList}>{blocked.map((line) => row(line, false))}</ul>
          </>
        )}
      </div>
      <div className="ez:grid ez:gap-4">
        <div className="ez:rounded-md ez:bg-surface-alt ez:p-4 ez:lg:p-5">
          <SummaryRows
            rows={[
              { label: "상품 금액", value: list },
              ...(list > total ? [{ label: "상품 할인", value: list - total, minus: true }] : []),
              { label: "배송비", value: "주문서에서 계산" },
            ]}
            total={{ label: "결제 예정 금액", value: total }}
          />
        </div>
        {picked.length ? (
          <ButtonLink href={`${checkoutHref}?items=${ids.map(encodeURIComponent).join(",")}`} block>
            주문하기
          </ButtonLink>
        ) : (
          <Button block disabled>
            주문하기
          </Button>
        )}
      </div>
    </div>
  );
}
