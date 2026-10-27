"use client";

import { useState } from "react";
import type { Schemas } from "../../types";
import { won } from "../../utils/cn";

const due = (value: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export function DepositInfo({ deposit }: { deposit: Schemas["DepositOut"] }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(deposit.account_number);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  return (
    <section
      aria-label="입금 정보"
      data-slot="deposit-info"
      className="ez:grid ez:gap-2 ez:rounded-md ez:border ez:border-solid ez:border-primary-border ez:p-4 ez:text-[13px]"
    >
      <strong className="ez:text-sm">{due(deposit.due_at)}까지 입금해 주세요</strong>
      <dl className="ez:m-0 ez:grid ez:grid-cols-[auto_1fr] ez:gap-x-4 ez:gap-y-1.5 ez:tabular-nums">
        <dt className="ez:text-muted">은행</dt>
        <dd className="ez:m-0">{deposit.bank_name}</dd>
        <dt className="ez:text-muted">계좌번호</dt>
        <dd className="ez:m-0 ez:flex ez:items-center ez:gap-2">
          {deposit.account_number}
          <button
            type="button"
            onClick={copy}
            className="ez:cursor-pointer ez:rounded-md ez:border ez:border-solid ez:border-primary-border ez:bg-transparent ez:px-2 ez:py-0.5 ez:text-[12px] ez:text-fg"
          >
            {copied ? "복사됨" : "복사"}
          </button>
        </dd>
        {deposit.holder && (
          <>
            <dt className="ez:text-muted">예금주</dt>
            <dd className="ez:m-0">{deposit.holder}</dd>
          </>
        )}
        <dt className="ez:text-muted">입금 금액</dt>
        <dd className="ez:m-0 ez:font-semibold">{won(deposit.amount)}</dd>
      </dl>
      <span className="ez:text-muted">기한이 지나면 주문이 자동으로 취소돼요.</span>
    </section>
  );
}
