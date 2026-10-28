import { cva, type VariantProps } from "class-variance-authority";
import NextLink from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import type { ButtonSize, ButtonVariant } from "../../theme/contract";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

export const buttonVariants = cva(
  [
    "ez:inline-flex ez:items-center ez:justify-center ez:gap-1.5 ez:box-border ez:m-0",
    "ez:rounded-button ez:border ez:border-solid ez:border-transparent",
    "ez:font-body ez:font-semibold ez:no-underline ez:cursor-pointer ez:select-none",
    "ez:transition-colors ez:disabled:cursor-not-allowed ez:disabled:opacity-45",
    focusRing,
  ],
  {
    variants: {
      variant: {
        primary: "ez:bg-primary ez:text-on-primary ez:hover:bg-primary-hover",
        secondary: "ez:bg-transparent ez:border-primary-border ez:text-fg ez:hover:bg-primary-tint",
        ghost: "ez:bg-transparent ez:text-fg ez:hover:bg-primary-tint",
        outline: "ez:bg-transparent ez:border-[1.5px] ez:border-primary ez:text-primary ez:hover:bg-primary-tint",
        danger: "ez:bg-danger ez:text-on-danger ez:hover:bg-danger/90",
      } satisfies Record<ButtonVariant, string>,
      size: {
        md: "ez:min-h-12 ez:px-5 ez:text-base",
        sm: "ez:min-h-9 ez:px-3 ez:text-sm",
      } satisfies Partial<Record<ButtonSize, string>>,
      block: { true: "ez:w-full" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({
  variant,
  size,
  block,
  loading = false,
  disabled,
  className,
  type = "button",
  children,
  ...rest
}: Variants & { loading?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      data-slot="button"
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="ez:size-4 ez:shrink-0 ez:animate-spin ez:rounded-full ez:border-2 ez:border-solid ez:border-current ez:border-r-transparent"
        />
      )}
      {children}
    </button>
  );
}

export function ButtonLink({ variant, size, block, className, ...rest }: Variants & ComponentProps<typeof NextLink>) {
  return (
    <NextLink data-slot="button" className={cn(buttonVariants({ variant, size, block }), className)} {...rest} />
  );
}
