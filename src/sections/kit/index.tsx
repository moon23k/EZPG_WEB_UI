import NextLink from "next/link";
import { Children, type ReactNode } from "react";
import { Photo } from "../../components/photo";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

export type Row = { label: string; value?: string };

export const line = "ez:border-solid ez:border-primary-border ez:[border-width:var(--ezd-line)]";

export function Title({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="ez:flex ez:items-baseline ez:justify-between ez:gap-3">
      <h2 className="ez:m-0 ez:text-site-section">{children}</h2>
      {aside}
    </div>
  );
}

export function Block({ slot, children, className }: { slot: string; children: ReactNode; className?: string }) {
  return (
    <section data-slot={slot} className={cn("ez:grid ez:gap-4 ez:text-fg", className)}>
      {children}
    </section>
  );
}

export function Pic({
  src,
  alt = "",
  ratio,
  className,
  tone,
  strong,
  iconClassName,
}: {
  src?: string | null;
  alt?: string;
  ratio?: number;
  className?: string;
  tone?: number;
  strong?: boolean;
  iconClassName?: string;
}) {
  return (
    <div style={ratio ? { aspectRatio: ratio } : undefined} className={cn("ez:relative ez:w-full", className)}>
      <Photo
        src={src}
        alt={alt}
        tone={tone}
        strong={strong}
        iconClassName={iconClassName}
        className={cn(ratio && "ez:absolute ez:inset-0 ez:aspect-auto ez:h-full")}
        sizes="(max-width: 768px) 100vw, 640px"
      />
    </div>
  );
}

export function Rows({ rows }: { rows: Row[] }) {
  if (!rows.length) return null;
  return (
    <table className="ez:w-full ez:border-collapse ez:text-site-note">
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} className="ez:border-0 ez:border-b ez:border-solid ez:border-primary-border">
            <th scope="row" className="ez:py-2.5 ez:pr-3 ez:text-left ez:font-normal ez:text-muted">
              {r.label}
            </th>
            {r.value !== undefined && <td className="ez:py-2.5 ez:text-right ez:tabular-nums">{r.value}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="ez:m-0 ez:grid ez:list-none ez:grid-cols-2 ez:gap-2 ez:p-0 ez:md:auto-cols-fr ez:md:grid-flow-col ez:md:grid-cols-none">
      {steps.map((s, i) => (
        <li key={s} className="ez:grid ez:gap-1 ez:rounded-md ez:bg-surface-alt ez:p-3 ez:text-site-note">
          <strong className="ez:text-primary ez:tabular-nums">{i + 1}</strong>
          {s}
        </li>
      ))}
    </ol>
  );
}

export function Chips({ items, current = 0 }: { items: string[]; current?: number }) {
  return (
    <ul className="ez:m-0 ez:flex ez:list-none ez:gap-2 ez:overflow-x-auto ez:p-0">
      {items.map((c, i) => (
        <li
          key={c}
          className={cn(
            "ez:shrink-0 ez:rounded-button ez:px-3 ez:py-1.5 ez:text-site-note ez:whitespace-nowrap",
            i === current ? "ez:bg-primary ez:text-on-primary" : "ez:bg-surface-alt ez:text-fg",
          )}
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

export function Fold({ title, children, open }: { title: string; children: ReactNode; open?: boolean }) {
  return (
    <details open={open} className="ez:group ez:border-0 ez:border-b ez:border-solid ez:border-primary-border">
      <summary className="ez:flex ez:min-h-12 ez:cursor-pointer ez:list-none ez:items-center ez:justify-between ez:gap-3 ez:py-3 ez:font-semibold ez:[&::-webkit-details-marker]:hidden">
        {title}
        <span aria-hidden="true" className="ez:text-muted ez:transition-transform ez:group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="ez:pb-4">{children}</div>
    </details>
  );
}

export function Card({ href, children, className }: { href?: string; children: ReactNode; className?: string }) {
  const cls = cn("ez:grid ez:content-start ez:gap-1.5 ez:text-fg ez:no-underline", line, "ez:[padding:calc(var(--ezd-line)*8)]", className);
  if (!href) return <div className={cls}>{children}</div>;
  return (
    <NextLink href={href} className={cn(cls, "ez:rounded-md", focusRing)}>
      {children}
    </NextLink>
  );
}

const PC_COLS: Record<number, string> = {
  1: "ez:md:grid-cols-1",
  2: "ez:md:grid-cols-2",
  3: "ez:md:grid-cols-3",
  4: "ez:md:grid-cols-4",
  5: "ez:md:grid-cols-5",
  6: "ez:md:grid-cols-6",
};

export function pcCols(pc: number, count: number): string {
  return PC_COLS[Math.max(1, Math.min(pc, count))];
}

export function Cols({ m = 1, pc = 3, children }: { m?: 1 | 2 | 3; pc?: 3 | 4 | 6; children: ReactNode }) {
  return (
    <div className={cn("ez:grid ez:gap-gutter", { 1: "ez:grid-cols-1", 2: "ez:grid-cols-2", 3: "ez:grid-cols-3" }[m], pcCols(pc, Children.count(children)))}>
      {children}
    </div>
  );
}

export const statusText = { open: "여유", few: "마감 임박", full: "마감" } as const;

export type Status = keyof typeof statusText;
