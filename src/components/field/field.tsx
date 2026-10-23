import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

export function Field({
  label,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label data-slot="field" className={cn("ez:grid ez:gap-1.5 ez:text-fg", className)}>
      <span className="ez:text-sm ez:font-semibold">{label}</span>
      {children}
      {hint && !error && <span className="ez:text-xs ez:text-muted">{hint}</span>}
      {error && (
        <span className="ez:text-xs ez:text-danger" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

const control = cn(
  "ez:box-border ez:w-full ez:m-0 ez:px-3 ez:py-2.5 ez:rounded-sm ez:border ez:border-solid ez:border-primary-border",
  "ez:bg-surface ez:text-fg ez:font-body ez:text-base ez:placeholder:text-muted",
  "ez:read-only:bg-surface-alt ez:disabled:opacity-45 ez:aria-invalid:border-danger",
  focusRing,
);

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input data-slot="input" className={cn(control, "ez:min-h-12", className)} {...rest} />;
}

export function TextArea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea data-slot="textarea" className={cn(control, "ez:min-h-30 ez:resize-y", className)} {...rest} />;
}
