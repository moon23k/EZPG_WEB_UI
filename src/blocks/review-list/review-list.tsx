import { ButtonLink } from "../../components/button";
import { kstDate } from "../../utils/cn";
import { lineList } from "../parts/line-item";
import { Notice } from "../parts/notice";
import { emptyAction, PencilIcon, StarIcon } from "../parts/empty-icons";

export type ReviewItem = {
  id: string;
  rating: number;
  body: string;
  reply?: string | null;
  created_at: string;
};

// count and average come from the items unless the server knows more (paged lists).
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
    <section data-slot="review-list" aria-label="후기" className="ez:grid ez:gap-3 ez:text-fg">
      <h2 className="ez:m-0 ez:font-body ez:text-lg ez:font-semibold">
        후기{total > 0 && ` ${total}`}
        {mean !== null && <span className="ez:text-sm ez:font-normal ez:text-muted"> · 평균 {mean.toFixed(1)}점</span>}
      </h2>
      {!items.length && (
        <div className="ez:flex ez:flex-wrap ez:items-center ez:justify-between ez:gap-4">
          <div role="img" aria-label="후기 0개, 평점 없음" className="ez:-ml-0.5 ez:flex ez:items-center ez:gap-1 ez:text-muted">
            {[1, 2, 3, 4, 5].map((n) => (
              <StarIcon key={n} />
            ))}
          </div>
          {writeHref && (
            <ButtonLink href={writeHref} variant="outline" className={emptyAction}>
              <PencilIcon />첫 후기 쓰기
            </ButtonLink>
          )}
        </div>
      )}
      <ul className={lineList}>
        {items.map((r) => (
          <li key={r.id} className="ez:grid ez:gap-1.5 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:py-3.5">
            <span role="img" aria-label={`${r.rating}점`} className="ez:text-primary">
              {"★".repeat(r.rating)}
              <span className="ez:text-primary-border">{"★".repeat(5 - r.rating)}</span>
            </span>
            <p className="ez:m-0 ez:whitespace-pre-line">{r.body}</p>
            {r.reply && <p className="ez:m-0 ez:rounded-sm ez:bg-surface-alt ez:p-3 ez:text-sm">판매자 답변: {r.reply}</p>}
            <Notice>{kstDate(r.created_at)}</Notice>
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
