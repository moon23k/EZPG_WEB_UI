import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export function EmptyState({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}) {
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
