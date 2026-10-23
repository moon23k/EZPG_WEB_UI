import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

const tones = {
  muted: "ez:text-sm ez:text-muted",
  error: "ez:text-sm ez:text-danger",
  info: "ez:rounded-sm ez:border ez:border-solid ez:border-primary-border ez:bg-primary-tint ez:px-3 ez:py-2.5 ez:text-sm ez:text-fg",
};

export function Notice({
  tone = "muted",
  className,
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p data-slot="notice" role={tone === "error" ? "alert" : undefined} className={cn("ez:m-0", tones[tone], className)}>
      {children}
    </p>
  );
}
