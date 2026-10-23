"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/button";
import { won } from "../../utils/cn";
import { Notice } from "../parts/notice";

type Widgets = {
  setAmount: (amount: { currency: "KRW"; value: number }) => Promise<void>;
  renderPaymentMethods: (opts: { selector: string }) => Promise<unknown>;
  renderAgreement: (opts: { selector: string }) => Promise<unknown>;
  requestPayment: (opts: Record<string, string>) => Promise<void>;
};

type TossWindow = Window & {
  TossPayments?: (clientKey: string) => { widgets: (opts: { customerKey: string }) => Widgets };
};

const SDK = "https://js.tosspayments.com/v2/standard";

function loadSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as TossWindow).TossPayments) return resolve();
    const tag = document.createElement("script");
    tag.src = SDK;
    tag.onload = () => resolve();
    tag.onerror = () => reject(new Error("sdk"));
    document.head.appendChild(tag);
  });
}

export type PayRequest = {
  clientKey: string;
  orderId: string;
  orderName: string;
  amount: number;
  successUrl: string;
  failUrl: string;
};

export function PayWidget({ request, mock }: { request: PayRequest; mock?: boolean }) {
  const widgets = useRef<Widgets | null>(null);
  const [ready, setReady] = useState(Boolean(mock));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mock) return;
    let alive = true;
    loadSdk()
      .then(async () => {
        const toss = (window as TossWindow).TossPayments;
        if (!toss || !alive) return;
        const w = toss(request.clientKey).widgets({ customerKey: "ANONYMOUS" });
        await w.setAmount({ currency: "KRW", value: request.amount });
        await w.renderPaymentMethods({ selector: "#ez-pay-methods" });
        await w.renderAgreement({ selector: "#ez-pay-agreement" });
        widgets.current = w;
        if (alive) setReady(true);
      })
      .catch(() => setError("결제창을 불러오지 못했어요. 새로고침 후 다시 시도해 주세요."));
    return () => {
      alive = false;
    };
  }, [mock, request.clientKey, request.amount]);

  const pay = async () => {
    if (mock) {
      const url = new URL(request.successUrl, window.location.origin);
      url.searchParams.set("paymentKey", `mock_${request.orderId}_${Date.now()}`);
      url.searchParams.set("orderId", request.orderId);
      url.searchParams.set("amount", String(request.amount));
      window.location.assign(url.toString());
      return;
    }
    await widgets.current?.requestPayment({
      orderId: request.orderId,
      orderName: request.orderName,
      successUrl: new URL(request.successUrl, window.location.origin).toString(),
      failUrl: new URL(request.failUrl, window.location.origin).toString(),
    });
  };

  return (
    <div data-slot="pay-widget" className="ez:grid ez:gap-3">
      <div id="ez-pay-methods" />
      <div id="ez-pay-agreement" />
      <Notice>결제는 토스페이먼츠 구매안전 서비스로 처리됩니다.</Notice>
      {error && <Notice tone="error">{error}</Notice>}
      <Button block onClick={pay} disabled={!ready}>
        {won(request.amount)} 결제하기
      </Button>
    </div>
  );
}
