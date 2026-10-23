import { won } from "../../utils/cn";

export type SummaryRow = { label: string; value: number; minus?: boolean };

export function SummaryRows({ rows, total }: { rows: SummaryRow[]; total: SummaryRow }) {
  return (
    <dl data-slot="summary" className="ez:m-0 ez:grid ez:gap-1.5 ez:tabular-nums">
      {rows.map((row) => (
        <div key={row.label} className="ez:flex ez:justify-between ez:gap-3">
          <dt className="ez:text-muted">{row.label}</dt>
          <dd className="ez:m-0">{row.minus ? `−${won(row.value)}` : won(row.value)}</dd>
        </div>
      ))}
      <div className="ez:flex ez:justify-between ez:gap-3 ez:border-0 ez:border-t ez:border-solid ez:border-primary-border ez:pt-2 ez:font-bold">
        <dt>{total.label}</dt>
        <dd className="ez:m-0">{won(total.value)}</dd>
      </div>
    </dl>
  );
}
