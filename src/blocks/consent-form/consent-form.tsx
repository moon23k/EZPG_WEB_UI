"use client";

import { useId, useState, type ReactNode } from "react";
import { Checkbox } from "../../components/checkbox";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

export const GUEST_PRIVACY_TEXT =
  "수집 목적: 주문·배송·상담 / 항목: 이름, 휴대폰 번호, 배송지 / 보유 기간: 거래 기록 5년 / 동의를 거부할 수 있으나 거부하면 비회원 주문을 할 수 없습니다.";

export function ConsentForm({
  guest,
  children,
}: {
  guest: boolean;
  children: (ready: boolean) => ReactNode;
}) {
  const [order, setOrder] = useState(false);
  const [privacy, setPrivacy] = useState(!guest);
  const [open, setOpen] = useState(false);
  const detailId = useId();
  return (
    <div data-slot="consent-form" className="ez:grid ez:gap-3">
      {guest && (
        <div className="ez:grid">
          <div className="ez:flex ez:min-h-11 ez:items-center ez:gap-2">
            <Checkbox
              name="privacy_agreed"
              checked={privacy}
              onCheckedChange={(v) => setPrivacy(v === true)}
              label="[필수] 개인정보 수집·이용 동의"
              className="ez:flex-1 ez:items-center"
            />
            <button
              type="button"
              aria-expanded={open}
              aria-controls={detailId}
              aria-label="개인정보 수집·이용 내용 보기"
              onClick={() => setOpen((v) => !v)}
              className={cn("ez:inline-flex ez:h-11 ez:shrink-0 ez:items-center ez:gap-0.5 ez:border-0 ez:bg-transparent ez:px-2 ez:text-[13px] ez:text-muted ez:cursor-pointer", focusRing)}
            >
              보기
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={cn("ez:transition-transform", open && "ez:rotate-180")}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
          <p id={detailId} hidden={!open} className="ez:m-0 ez:ml-7.5 ez:text-[13px] ez:text-muted">
            {GUEST_PRIVACY_TEXT}
          </p>
        </div>
      )}
      <Checkbox
        name="order_agreed"
        checked={order}
        onCheckedChange={(v) => setOrder(v === true)}
        label="[필수] 주문 내용 확인 및 결제 동의"
        className="ez:min-h-11 ez:items-center"
      />
      {children(order && privacy)}
    </div>
  );
}
