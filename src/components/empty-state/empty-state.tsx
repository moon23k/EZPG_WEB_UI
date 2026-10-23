import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

// Icon tile, one short line and a way forward. Without an icon the title is bold, for messages that need words (errors, not found).
export function EmptyState({
  title,
  description,
  icon,
  className,
  children,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
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
    <div data-slot="empty-state" className={cn("ez:grid ez:justify-items-center ez:gap-4 ez:px-4 ez:py-10 ez:text-center", className)}>
      <div className="ez:flex ez:size-28 ez:items-center ez:justify-center ez:rounded-[calc(var(--ezd-radius-lg)*1.4)] ez:bg-[color-mix(in_oklab,var(--ezd-primary)_var(--ezd-halo),transparent)]">
        <div className="ez:flex ez:size-20 ez:items-center ez:justify-center ez:rounded-lg ez:bg-primary/10 ez:text-primary">{icon}</div>
      </div>
      <div className="ez:grid ez:gap-1">
        <h2 className="ez:m-0 ez:font-body ez:text-base ez:font-normal ez:text-fg">{title}</h2>
        {description && <p className="ez:m-0 ez:text-sm ez:text-muted">{description}</p>}
      </div>
      {children}
    </div>
  );
}
