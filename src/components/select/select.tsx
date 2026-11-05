import type { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span data-slot="select" className={cn("ez:relative ez:grid ez:w-full", className)}>
      <select
        className={cn(
          "ez:box-border ez:w-full ez:m-0 ez:min-h-12 ez:appearance-none ez:pl-3 ez:pr-9 ez:py-2.5 ez:rounded-sm ez:border ez:border-solid ez:border-primary-border",
          "ez:bg-surface ez:text-fg ez:font-body ez:text-base ez:cursor-pointer",
          "ez:disabled:cursor-not-allowed ez:disabled:bg-surface-alt ez:disabled:opacity-45 ez:aria-invalid:border-danger",
          focusRing,
        )}
        {...rest}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 16 16"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
        className="ez:pointer-events-none ez:absolute ez:right-3 ez:top-1/2 ez:-translate-y-1/2 ez:text-muted"
      >
        <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
