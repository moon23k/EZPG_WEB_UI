import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

export const fieldset = "ez:m-0 ez:grid ez:gap-2 ez:border-0 ez:p-0";
export const legend = "ez:mb-1 ez:p-0 ez:text-sm ez:font-semibold ez:text-fg";

export function Choice({
  label,
  description,
  className,
  ...input
}: { label: ReactNode; description?: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label data-slot="choice" className={cn("ez:flex ez:cursor-pointer ez:items-start ez:gap-2.5 ez:text-fg", className)}>
      <input className={cn("ez:m-0 ez:mt-0.5 ez:size-5 ez:shrink-0 ez:accent-primary", focusRing)} {...input} />
      <span className="ez:grid ez:gap-1">
        <span>{label}</span>
        {description && <span className="ez:text-sm ez:text-muted">{description}</span>}
      </span>
    </label>
  );
}
