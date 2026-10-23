"use client";

import { useId, useState, type ReactNode } from "react";
import { Checkbox } from "../../components/checkbox";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

export const GUEST_PRIVACY_TEXT =
  "수집 목적: 주문·배송·상담 / 항목: 이름, 휴대폰 번호, 배송지 / 보유 기간: 거래 기록 5년 / 동의를 거부할 수 있으나 거부하면 비회원 주문을 할 수 없습니다.";

export type ConsentTerm = { title: string; body: ReactNode };

function Term({ term }: { term: ConsentTerm }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className="ez:grid">
      <div className="ez:flex ez:min-h-8 ez:items-center ez:justify-between ez:gap-2 ez:text-[13px] ez:text-muted">
        <span>{term.title}</span>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${term.title} 보기`}
          onClick={() => setOpen((v) => !v)}
          className={cn("ez:-mr-2 ez:h-8 ez:shrink-0 ez:border-0 ez:bg-transparent ez:px-2 ez:text-[13px] ez:text-muted ez:underline ez:cursor-pointer", focusRing)}
        >
          보기
        </button>
      </div>
      <div id={id} hidden={!open} className="ez:pb-2 ez:text-[13px] ez:text-muted">
        {term.body}
      </div>
    </li>
  );
}

// One declaration right above the pay button covers every listed term; each term can be opened in place.
export function ConsentForm({
  guest,
  terms,
  children,
}: {
  guest: boolean;
  terms?: ConsentTerm[];
  children: (ready: boolean) => ReactNode;
}) {
  const [agreed, setAgreed] = useState(false);
  const list = terms ?? (guest ? [{ title: "개인정보 수집·이용 동의", body: GUEST_PRIVACY_TEXT }] : []);
  return (
    <div data-slot="consent-form" className="ez:grid ez:gap-3">
      <div className="ez:grid ez:gap-1">
        <Checkbox
          name="order_agreed"
          checked={agreed}
          onCheckedChange={(v) => setAgreed(v === true)}
          label="주문 내용을 확인했으며, 아래 내용에 모두 동의합니다."
        />
        {guest && agreed && <input type="hidden" name="privacy_agreed" value="on" />}
        {list.length > 0 && (
          <ul className="ez:m-0 ez:list-none ez:p-0 ez:pl-7.5">
            {list.map((term) => (
              <Term key={term.title} term={term} />
            ))}
          </ul>
        )}
      </div>
      {children(agreed)}
    </div>
  );
}
