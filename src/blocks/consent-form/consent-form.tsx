"use client";

import { useState, type ReactNode } from "react";

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
    <div className="ez-consent">
      {guest && (
        <label className="ez-check">
          <input type="checkbox" name="privacy_agreed" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
          <span>
            [필수] 개인정보 수집·이용에 동의합니다.
            <small className="ez-muted">{GUEST_PRIVACY_TEXT}</small>
          </span>
        </label>
      )}
      <label className="ez-check">
        <input type="checkbox" name="order_agreed" checked={order} onChange={(e) => setOrder(e.target.checked)} />
        <span>[필수] 주문 상품, 금액, 배송비, 교환·반품 조건을 확인했으며 결제에 동의합니다.</span>
      </label>
      {children(order && privacy)}
    </div>
  );
}
