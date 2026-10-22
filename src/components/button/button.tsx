import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "ghost";

type Common = { variant?: Variant; block?: boolean };

export function Button({
  variant = "primary",
  block,
  className,
  type = "button",
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn("ez-btn", `ez-btn--${variant}`, block && "ez-btn--block", className)}
      {...rest}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  block,
  className,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn("ez-btn", `ez-btn--${variant}`, block && "ez-btn--block", className)}
      {...rest}
    />
  );
}
