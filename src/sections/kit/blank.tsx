import type { CSSProperties } from "react";
import { buttonVariants } from "../../components/button";
import { SYSTEM_BLANK } from "../../theme/system";
import { cn } from "../../utils/cn";

type BarSize = keyof typeof SYSTEM_BLANK | "full";

function width(size: BarSize): CSSProperties {
  return { width: size === "full" ? "100%" : SYSTEM_BLANK[size] };
}

export function Bar({ size = "mid", strong, block, className }: { size?: BarSize; strong?: boolean; block?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      data-slot="blank-bar"
      style={width(size)}
      className={cn(
        "ez:inline-block ez:h-[0.62em] ez:max-w-full ez:rounded-sm ez:align-middle",
        strong ? "ez:bg-tile-blank-strong" : "ez:bg-tile-blank",
        block && "ez:block",
        className,
      )}
    />
  );
}

export function Lines({ strong, className }: { strong?: boolean; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("ez:grid ez:w-full ez:gap-2", className)}>
      <Bar size="full" strong={strong} block />
      <Bar size="tail" strong={strong} block />
    </span>
  );
}

export function BlankStars() {
  return (
    <span aria-hidden="true" data-slot="blank-stars" className="ez:inline-flex ez:gap-0.5 ez:text-tile-blank">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="ez:size-4">
          <path d="M12 3l2.8 5.9 6.4.9-4.6 4.5 1.1 6.4L12 17.7 6.3 20.7l1.1-6.4L2.8 9.8l6.4-.9z" />
        </svg>
      ))}
    </span>
  );
}

export function BlankPrice({ before, after = "원", className }: { before?: string; after?: string; className?: string }) {
  return (
    <span className={cn("ez:inline-flex ez:items-center ez:gap-1 ez:font-semibold", className)}>
      {before}
      <Bar size="short" />
      {after}
    </span>
  );
}

export function BlankChips({ count = 3, first }: { count?: number; first?: string }) {
  return (
    <div aria-hidden="true" data-slot="blank-chips" className="ez:flex ez:gap-2">
      {first && <span className="ez:inline-flex ez:min-h-10 ez:items-center ez:rounded-full ez:bg-primary ez:px-4 ez:text-site-note ez:text-on-primary">{first}</span>}
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="ez:inline-flex ez:min-h-10 ez:items-center ez:rounded-full ez:border ez:border-solid ez:border-primary-border ez:px-4 ez:text-site-note">
          <Bar size="short" />
        </span>
      ))}
    </div>
  );
}

export function BlankButton({ children, variant, className }: { children: string; variant?: "primary" | "outline"; className?: string }) {
  return (
    <span aria-hidden="true" data-slot="blank-button" className={cn(buttonVariants({ variant }), "ez:cursor-default", className)}>
      {children}
    </span>
  );
}
