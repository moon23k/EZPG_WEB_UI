import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

// With an icon the state is shown by the icon alone; the title is a visually hidden heading.
// Without one it falls back to a visible title, for messages that need words (errors, not found).
export function EmptyState({
  title,
  description,
  icon,
  count,
  className,
  children,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  count?: number;
  className?: string;
  children?: ReactNode;
}) {
  if (!icon) {
    return (
      <div data-slot="empty-state" className={cn("ez:grid ez:justify-items-center ez:gap-4 ez:px-4 ez:py-12 ez:text-center", className)}>
        <div className="ez:grid ez:gap-1">
          <p className="ez:m-0 ez:font-semibold ez:text-fg">{title}</p>
          {description && <p className="ez:m-0 ez:text-sm ez:text-muted">{description}</p>}
        </div>
        {children}
      </div>
    );
  }
  return (
    <div data-slot="empty-state" className={cn("ez:grid ez:justify-items-center ez:gap-5 ez:px-4 ez:py-10", className)}>
      <h2 className="ez:sr-only">
        {title}
        {description ? ` ${description}` : ""}
      </h2>
      <div className="ez:relative ez:flex ez:size-28 ez:items-center ez:justify-center ez:rounded-[calc(var(--ezd-radius-lg)*1.4)] ez:bg-[color-mix(in_oklab,var(--ezd-primary)_var(--ezd-halo),transparent)]">
        <div className="ez:flex ez:size-20 ez:items-center ez:justify-center ez:rounded-lg ez:bg-primary/10 ez:text-primary">{icon}</div>
        {count !== undefined && (
          // Single-digit centre sits on the tile corner curve (0.29 × radius in, radius capped at half the tile); longer counts grow left.
          <span
            aria-hidden="true"
            data-slot="empty-state-count"
            className={cn(
              "ez:absolute ez:top-[calc(min(var(--ezd-radius-lg),40px)*0.29+4px)] ez:right-[calc(min(var(--ezd-radius-lg),40px)*0.29+4px)]",
              "ez:flex ez:h-6 ez:min-w-6 ez:box-border ez:items-center ez:justify-center ez:rounded-full ez:px-[7px]",
              "ez:bg-[color-mix(in_oklab,var(--ezd-text)_55%,var(--ezd-primary))] ez:text-[#ffffff] ez:text-xs ez:font-bold",
              "ez:font-['Pretendard','Noto_Sans_KR',system-ui,sans-serif]",
              "ez:shadow-[0_0_0_2px_color-mix(in_oklab,var(--ezd-primary)_var(--ezd-halo),var(--ezd-surface))]",
            )}
          >
            {/* Trimmed to cap height so the digit is optically centred. */}
            <span className="ez:block ez:leading-none ez:tabular-nums ez:[text-box:trim-both_cap_alphabetic]">{count}</span>
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
