import NextLink from "next/link";
import type { ReactNode } from "react";
import { Notice } from "./notice";

export const lineList = "ez:m-0 ez:p-0 ez:list-none";

export function LineItem({
  name,
  href,
  option,
  meta,
  problem,
  amount,
  amountNote,
  children,
}: {
  name: string;
  href?: string;
  option?: string | null;
  meta?: ReactNode;
  problem?: string | null;
  amount: ReactNode;
  amountNote?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <li
      data-slot="line-item"
      data-problem={problem ?? undefined}
      className="ez:grid ez:grid-cols-[1fr_auto] ez:items-start ez:gap-x-3 ez:gap-y-2 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:py-4"
    >
      <div className="ez:grid ez:gap-0.5 ez:min-w-0">
        {href ? (
          <NextLink href={href} className="ez:text-base ez:font-semibold ez:tracking-[-0.01em] ez:text-fg ez:no-underline ez:hover:underline">
            {name}
          </NextLink>
        ) : (
          <span className="ez:text-base ez:font-semibold ez:tracking-[-0.01em] ez:text-fg">{name}</span>
        )}
        {option && <span className="ez:text-[13px] ez:text-muted">{option}</span>}
        {meta}
        {problem && <Notice tone="error">{problem}</Notice>}
      </div>
      <div className="ez:grid ez:justify-items-end ez:gap-0.5">
        <strong className="ez:text-base ez:font-semibold ez:tabular-nums ez:text-fg">{amount}</strong>
        {amountNote && <span className="ez:text-[13px] ez:tabular-nums ez:text-muted">{amountNote}</span>}
      </div>
      {children && <div className="ez:col-span-2 ez:flex ez:items-center ez:gap-3">{children}</div>}
    </li>
  );
}
