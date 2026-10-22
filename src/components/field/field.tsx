import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="ez-field">
      <span className="ez-field__label">{label}</span>
      {children}
      {hint && !error && <span className="ez-field__hint">{hint}</span>}
      {error && (
        <span className="ez-field__error" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("ez-input", className)} {...rest} />;
}

export function TextArea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("ez-input", "ez-input--area", className)} {...rest} />;
}
