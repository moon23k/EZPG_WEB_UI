import type { ReactNode } from "react";
import { cn, won } from "../../utils/cn";
import { lineList } from "../parts/line-item";

export type ClaimKindName = "cancel" | "return" | "exchange";
export type ClaimStatusName = "requested" | "collecting" | "collected" | "held" | "completed" | "rejected" | "withdrawn";

export type ClaimView = {
  id: string;
  kind: ClaimKindName;
  status: ClaimStatusName;
  reason: string;
  refund_amount: number;
  reject_reason?: string | null;
  approve_note?: string | null;
  created_at: string;
};

const KIND: Record<ClaimKindName, string> = { cancel: "취소", return: "반품", exchange: "교환" };

const STATUS: Record<ClaimKindName, Record<ClaimStatusName, string>> = {
  cancel: {
    requested: "취소 요청",
    collecting: "취소 처리 중",
    collected: "취소 처리 중",
    held: "취소 보류",
    completed: "취소 완료",
    rejected: "취소 거절",
    withdrawn: "취소 철회",
  },
  return: {
    requested: "반품 요청",
    collecting: "회수 중",
    collected: "회수 완료 · 환불 대기",
    held: "반품 보류",
    completed: "환불 완료",
    rejected: "반품 거절",
    withdrawn: "반품 철회",
  },
  exchange: {
    requested: "교환 요청",
    collecting: "회수 중",
    collected: "회수 완료 · 재발송 대기",
    held: "교환 보류",
    completed: "교환 상품 발송",
    rejected: "교환 거절",
    withdrawn: "교환 철회",
  },
};

const CLOSED: ClaimStatusName[] = ["completed", "rejected", "withdrawn"];

export const WITHDRAWABLE: ClaimStatusName[] = ["requested", "collecting"];

const day = (value: string) =>
  new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "2-digit", day: "2-digit" }).format(new Date(value));

export function ClaimStatus({ claims, action }: { claims: ClaimView[]; action?: (claim: ClaimView) => ReactNode }) {
  if (!claims.length) return null;
  return (
    <section data-slot="claim-status" className="ez:mt-8 ez:grid ez:gap-2">
      <h2 className="ez:m-0 ez:font-body ez:text-lg ez:font-semibold">취소 · 반품 · 교환</h2>
      <ul className={lineList}>
        {claims.map((c) => {
          const closed = CLOSED.includes(c.status);
          const note = c.status === "rejected" ? c.reject_reason : c.approve_note;
          return (
            <li key={c.id} className="ez:grid ez:gap-1 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:py-3.5">
              <span className="ez:flex ez:items-baseline ez:justify-between ez:gap-3">
                <strong className={cn("ez:font-semibold", closed ? "ez:text-fg" : "ez:text-primary")}>{STATUS[c.kind][c.status]}</strong>
                <span className="ez:text-[13px] ez:tabular-nums ez:text-muted">
                  {KIND[c.kind]} · {day(c.created_at)}
                </span>
              </span>
              <span className="ez:text-muted">{c.reason}</span>
              {note && <span>{note}</span>}
              {c.status === "completed" && c.refund_amount > 0 && (
                <span className="ez:tabular-nums">환불 {won(c.refund_amount)}</span>
              )}
              {action?.(c)}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
