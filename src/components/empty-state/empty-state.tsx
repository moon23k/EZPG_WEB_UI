import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Button, ButtonLink } from "../button/button";

export const emptyAction = "ez:min-h-11 ez:px-6 ez:text-[15px]";

export type EmptyStateAction = { label: string; icon?: ReactNode } & ({ href: string; onPress?: never } | { onPress: () => void; href?: never });

function Action({ action }: { action: EmptyStateAction }) {
  const body = (
    <>
      {action.icon}
      {action.label}
    </>
  );
  return action.href ? (
    <ButtonLink href={action.href} variant="outline" className={emptyAction}>
      {body}
    </ButtonLink>
  ) : (
    <Button variant="outline" onClick={action.onPress} className={emptyAction}>
      {body}
    </Button>
  );
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  children,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: EmptyStateAction;
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
        {action && <Action action={action} />}
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
      {action && <Action action={action} />}
      {children}
    </div>
  );
}
