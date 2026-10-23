import { cn, won } from "../../utils/cn";

export function Price({ value, list, className }: { value: number; list?: number; className?: string }) {
  const discounted = list !== undefined && list > value;
  return (
    <span data-slot="price" className={cn("ez:inline-flex ez:flex-wrap ez:items-baseline ez:gap-1.5 ez:tabular-nums", className)}>
      {discounted && (
        <>
          <span className="ez:font-bold ez:text-primary">{Math.floor(((list - value) / list) * 100)}%</span>
          <s className="ez:text-[0.85em] ez:text-muted">{won(list)}</s>
        </>
      )}
      <strong className="ez:font-bold ez:text-fg">{won(value)}</strong>
    </span>
  );
}
