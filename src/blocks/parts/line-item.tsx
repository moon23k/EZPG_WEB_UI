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
  children,
}: {
  name: string;
  href?: string;
  option?: string | null;
  meta?: ReactNode;
  problem?: string | null;
  amount: ReactNode;
  children?: ReactNode;
}) {
  return (
    <li
      data-slot="line-item"
      data-problem={problem ?? undefined}
      className="ez:grid ez:grid-cols-[1fr_auto] ez:items-center ez:gap-x-3 ez:gap-y-2 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:py-3.5"
    >
      <div className="ez:grid ez:gap-0.5 ez:min-w-0">
        {href ? (
          <NextLink href={href} className="ez:font-semibold ez:text-fg ez:no-underline ez:hover:underline">
            {name}
          </NextLink>
        ) : (
          <span className="ez:font-semibold ez:text-fg">{name}</span>
        )}
        {option && <span className="ez:text-sm ez:text-muted">{option}</span>}
        {meta}
        {problem && <Notice tone="error">{problem}</Notice>}
      </div>
      <strong className="ez:self-start ez:font-bold ez:tabular-nums ez:text-fg">{amount}</strong>
      {children && <div className="ez:col-span-2 ez:flex ez:items-center ez:gap-3">{children}</div>}
    </li>
  );
}
