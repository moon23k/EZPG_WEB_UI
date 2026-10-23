import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

const badgeVariants = cva(
  "ez:inline-flex ez:items-center ez:rounded-full ez:px-2 ez:py-0.5 ez:text-xs ez:font-bold ez:whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "ez:bg-surface-alt ez:text-fg",
        primary: "ez:bg-primary-tint ez:text-primary",
        warn: "ez:bg-danger-tint ez:text-danger",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export function Badge({ tone, className, ...rest }: VariantProps<typeof badgeVariants> & HTMLAttributes<HTMLSpanElement>) {
  return <span data-slot="badge" className={cn(badgeVariants({ tone }), className)} {...rest} />;
}
