import type { ReactNode } from "react";

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="ez-empty">
      <p className="ez-empty__title">{title}</p>
      {children}
    </div>
  );
}
