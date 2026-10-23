import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

const icons = {
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5v.01" />
    </>
  ),
  ban: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6l12.8 12.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

// Inline status: a 14px icon and a short label, no container.
export function Status({
  icon,
  tone = "muted",
  className,
  children,
}: {
  icon: keyof typeof icons;
  tone?: "muted" | "danger";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      data-slot="status"
      className={cn(
        "ez:inline-flex ez:items-center ez:gap-1 ez:text-[13px] ez:leading-[18px]",
        tone === "danger" ? "ez:font-semibold ez:text-danger" : "ez:text-muted",
        className,
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={tone === "danger" ? 2.2 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="ez:shrink-0"
      >
        {icons[icon]}
      </svg>
      {children}
    </span>
  );
}
