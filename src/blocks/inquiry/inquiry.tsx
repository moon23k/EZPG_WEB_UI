import NextLink from "next/link";
import type { ReactNode } from "react";
import { Badge } from "../../components/badge";
import { EmptyState } from "../../components/empty-state";
import { cn } from "../../utils/cn";
import { lineList } from "../parts/line-item";

export type InquiryRow = {
  id: string;
  status: "open" | "answered" | "closed";
  needs_partner: boolean;
  preview: string;
  product_name?: string | null;
  order_number?: string | null;
  last_message_at: string;
};

export type InquiryMessageView = { author: "customer" | "partner" | "ai"; body: string; created_at: string };

const STATUS: Record<InquiryRow["status"], string> = { open: "답변 대기", answered: "답변 완료", closed: "종료" };

const AUTHOR: Record<InquiryMessageView["author"], string> = { customer: "나", partner: "판매자", ai: "AI 답변" };

const when = (value: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export function InquiryList({ inquiries, href = (id) => `/inquiries/${id}` }: { inquiries: InquiryRow[]; href?: (id: string) => string }) {
  if (!inquiries.length) return <EmptyState title="남긴 문의가 없어요" />;
  return (
    <ul data-slot="inquiry-list" className={cn(lineList, "ez:max-w-180")}>
      {inquiries.map((q) => (
        <li key={q.id}>
          <NextLink
            href={href(q.id)}
            className="ez:grid ez:gap-0.5 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:py-3.5 ez:text-fg ez:no-underline ez:hover:bg-surface-alt"
          >
            <span className="ez:flex ez:items-baseline ez:justify-between ez:gap-3">
              <strong className="ez:line-clamp-1 ez:font-semibold">{q.preview}</strong>
              <span className={cn("ez:shrink-0 ez:text-[13px]", q.status === "answered" ? "ez:font-semibold ez:text-primary" : "ez:text-muted")}>
                {STATUS[q.status]}
              </span>
            </span>
            <span className="ez:text-[13px] ez:tabular-nums ez:text-muted">
              {[q.product_name, q.order_number && `주문 ${q.order_number}`, when(q.last_message_at)].filter(Boolean).join(" · ")}
            </span>
          </NextLink>
        </li>
      ))}
    </ul>
  );
}

export function InquiryThread({ messages, footer }: { messages: InquiryMessageView[]; footer?: ReactNode }) {
  return (
    <section data-slot="inquiry-thread" className="ez:grid ez:max-w-180 ez:gap-4">
      <ol className={cn(lineList, "ez:grid ez:gap-3")}>
        {messages.map((m, i) => (
          <li
            key={`${m.created_at}-${i}`}
            className={cn(
              "ez:grid ez:gap-1 ez:rounded-lg ez:p-3.5",
              m.author === "customer" ? "ez:bg-surface-alt" : "ez:border ez:border-solid ez:border-primary-border",
            )}
          >
            <span className="ez:flex ez:items-center ez:gap-2 ez:text-[13px] ez:text-muted">
              {m.author === "ai" ? <Badge tone="primary">{AUTHOR.ai}</Badge> : <span className="ez:font-semibold ez:text-fg">{AUTHOR[m.author]}</span>}
              <span className="ez:tabular-nums">{when(m.created_at)}</span>
            </span>
            <p className="ez:m-0 ez:whitespace-pre-wrap">{m.body}</p>
          </li>
        ))}
      </ol>
      {footer}
    </section>
  );
}
