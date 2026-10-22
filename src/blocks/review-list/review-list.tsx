import { EmptyState } from "../../components/empty-state";
import { kstDate } from "../../utils/cn";

export type ReviewItem = {
  id: string;
  rating: number;
  body: string;
  reply?: string | null;
  created_at: string;
};

export function ReviewList({
  count,
  average,
  items,
  notice,
}: {
  count: number;
  average: number | null;
  items: ReviewItem[];
  notice?: { title?: string; body?: string }[];
}) {
  return (
    <section className="ez-reviews" aria-label="후기">
      <h2>
        후기 {count}
        {average !== null && <span className="ez-muted"> · 평균 {average.toFixed(1)}점</span>}
      </h2>
      {!items.length && <EmptyState title="아직 후기가 없어요." />}
      <ul>
        {items.map((r) => (
          <li key={r.id}>
            <span aria-label={`${r.rating}점`}>{"★".repeat(r.rating)}</span>
            <p>{r.body}</p>
            {r.reply && <p className="ez-reviews__reply">판매자 답변: {r.reply}</p>}
            <span className="ez-muted">{kstDate(r.created_at)}</span>
          </li>
        ))}
      </ul>
      {notice && notice.length > 0 && (
        <details className="ez-muted">
          <summary>후기 운영 기준</summary>
          {notice.map((n, i) => (
            <p key={i}>
              {n.title} {n.body}
            </p>
          ))}
        </details>
      )}
    </section>
  );
}
