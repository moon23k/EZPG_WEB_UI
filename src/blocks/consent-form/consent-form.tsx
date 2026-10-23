"use client";

import { useState, type ReactNode } from "react";
import { Checkbox } from "../../components/checkbox";

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
  return (
    <div data-slot="consent-form" className="ez:grid ez:gap-3">
      {guest && (
        <Checkbox
          name="privacy_agreed"
          checked={privacy}
          onCheckedChange={(v) => setPrivacy(v === true)}
          label="[필수] 개인정보 수집·이용에 동의합니다."
          description={GUEST_PRIVACY_TEXT}
        />
      )}
      <Checkbox
        name="order_agreed"
        checked={order}
        onCheckedChange={(v) => setOrder(v === true)}
        label="[필수] 주문 상품, 금액, 배송비, 교환·반품 조건을 확인했으며 결제에 동의합니다."
      />
      {children(order && privacy)}
    </div>
  );
}
