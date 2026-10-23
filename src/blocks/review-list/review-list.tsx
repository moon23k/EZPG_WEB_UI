import { ButtonLink } from "../../components/button";
import { kstDate } from "../../utils/cn";
import { lineList } from "../parts/line-item";
import { PencilIcon } from "../parts/empty-icons";

export type ReviewItem = {
  id: string;
  rating: number;
  body: string;
  reply?: string | null;
  created_at: string;
  author?: string | null;
  option?: string | null;
};

// count and average come from the items unless the server knows more (paged lists).
// Each review leads with rating, author, option and date; the seller reply sits indented under the body.
export function ReviewList({
  count = 0,
  average,
  items,
  notice,
  writeHref,
}: {
  count?: number;
  average?: number | null;
  items: ReviewItem[];
  notice?: { title?: string; body?: string }[];
  writeHref?: string;
}) {
  const total = Math.max(count, items.length);
  const mean = !total ? null : (average ?? (items.length ? items.reduce((sum, r) => sum + r.rating, 0) / items.length : null));
  return (
    <section data-slot="review-list" aria-label="후기" className="ez:grid ez:max-w-180 ez:gap-3 ez:text-fg">
      <h2 className="ez:m-0 ez:font-body ez:text-lg ez:font-semibold">
        후기{total > 0 && ` ${total}`}
        {mean !== null && <span className="ez:text-sm ez:font-normal ez:text-muted"> · 평균 {mean.toFixed(1)}점</span>}
      </h2>
      {!items.length && (
        <div className="ez:flex ez:flex-wrap ez:items-center ez:justify-between ez:gap-3">
          <p className="ez:m-0 ez:text-sm ez:text-muted">아직 후기가 없어요</p>
          {writeHref && (
            <ButtonLink href={writeHref} variant="outline" size="sm" className="ez:min-h-10 ez:px-3.5">
              <PencilIcon />첫 후기 쓰기
            </ButtonLink>
          )}
        </div>
      )}
      <ul className={lineList}>
        {items.map((r) => (
          <li key={r.id} className="ez:grid ez:gap-1.5 ez:border-0 ez:border-t ez:border-solid ez:border-primary-border ez:py-3.5">
            <div className="ez:flex ez:flex-wrap ez:items-center ez:gap-x-2">
              <span role="img" aria-label={`${r.rating}점`} className="ez:tracking-[1px] ez:text-primary">
                {"★".repeat(r.rating)}
                <span className="ez:text-muted/70">{"★".repeat(5 - r.rating)}</span>
              </span>
              <span className="ez:text-[13px] ez:text-muted">{[r.author, r.option, kstDate(r.created_at)].filter(Boolean).join(" · ")}</span>
            </div>
            <p className="ez:m-0 ez:whitespace-pre-line">{r.body}</p>
            {r.reply && (
              <p className="ez:m-0 ez:ml-3 ez:rounded-sm ez:bg-surface-alt ez:px-3 ez:py-2.5 ez:text-sm">
                <strong className="ez:font-semibold">판매자</strong> {r.reply}
              </p>
            )}
          </li>
        ))}
      </ul>
      {notice && notice.length > 0 && (
        <details className="ez:text-sm ez:text-muted">
          <summary className="ez:cursor-pointer">후기 운영 기준</summary>
          <div className="ez:mt-2 ez:grid ez:gap-1">
            {notice.map((n, i) => (
              <p key={i} className="ez:m-0">
                {n.title} {n.body}
              </p>
            ))}
          </div>
        </details>
      )}
    </section>
  );
}
