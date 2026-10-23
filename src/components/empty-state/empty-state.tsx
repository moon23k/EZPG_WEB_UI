import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

// With an icon the state is shown by the icon alone and the title is read only by screen readers.
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
    <div role="status" data-slot="empty-state" className={cn("ez:grid ez:justify-items-center ez:gap-4 ez:px-4 ez:py-10", className)}>
      <div className="ez:relative ez:flex ez:size-28 ez:items-center ez:justify-center ez:rounded-[calc(var(--ezd-radius-lg)*1.4)] ez:bg-primary/5">
        <div className="ez:flex ez:size-20 ez:items-center ez:justify-center ez:rounded-lg ez:bg-primary/10 ez:text-primary">{icon}</div>
        {count !== undefined && (
          <span
            aria-hidden="true"
            className="ez:absolute ez:top-3 ez:right-3 ez:flex ez:h-5.5 ez:min-w-5.5 ez:box-border ez:items-center ez:justify-center ez:rounded-full ez:border-[1.5px] ez:border-solid ez:border-muted/75 ez:bg-surface ez:px-1.5 ez:text-xs ez:font-bold ez:text-muted"
          >
            {count}
          </span>
        )}
      </div>
      <span className="ez:sr-only">
        {title}
        {description ? ` ${description}` : ""}
      </span>
      {children}
    </div>
  );
}
