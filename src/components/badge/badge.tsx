import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export function Badge({ tone = "neutral", children }: { tone?: "neutral" | "primary" | "warn"; children: ReactNode }) {
  return <span className={cn("ez-badge", `ez-badge--${tone}`)}>{children}</span>;
}
