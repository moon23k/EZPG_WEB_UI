import { won } from "../../utils/cn";

export type SummaryRow = { label: string; value: number | string; minus?: boolean; strong?: boolean };

const amount = (row: SummaryRow) => (typeof row.value === "string" ? row.value : row.minus ? `−${won(row.value)}` : won(row.value));

export function SummaryRows({ rows, total }: { rows: SummaryRow[]; total: { label: string; value: number } }) {
  return (
    <dl data-slot="summary" className="ez:m-0 ez:grid ez:gap-2 ez:tabular-nums ez:text-fg">
      {rows.map((row) => (
        <div key={row.label} className="ez:flex ez:items-baseline ez:justify-between ez:gap-3 ez:text-[13px]">
          <dt className={row.strong ? undefined : "ez:text-muted"}>{row.label}</dt>
          <dd className={typeof row.value === "string" ? "ez:m-0 ez:text-muted" : "ez:m-0"}>{amount(row)}</dd>
        </div>
      ))}
      <div className="ez:mt-1 ez:flex ez:items-baseline ez:justify-between ez:gap-3 ez:border-0 ez:border-t ez:border-solid ez:border-primary-border ez:pt-3">
        <dt className="ez:text-base">{total.label}</dt>
        <dd className="ez:m-0 ez:text-xl ez:font-semibold ez:tracking-[-0.02em]">
          {total.value.toLocaleString("ko-KR")}
          <span className="ez:text-base">원</span>
        </dd>
      </div>
    </dl>
  );
}
