"use client";

import { useState } from "react";
import { Button } from "../../components/button";
import { Field, Input } from "../../components/field";

type Picked = { zonecode: string; roadAddress: string };

type PostcodeWindow = Window & {
  daum?: { Postcode: new (opts: { oncomplete: (data: Picked) => void }) => { open: () => void } };
};

const SCRIPT = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
const MOCK: Picked = { zonecode: "06236", roadAddress: "서울 강남구 테헤란로 152" };

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as PostcodeWindow).daum?.Postcode) return resolve();
    const tag = document.createElement("script");
    tag.src = SCRIPT;
    tag.onload = () => resolve();
    tag.onerror = () => reject(new Error("postcode"));
    document.head.appendChild(tag);
  });
}

export type AddressValue = {
  recipient?: string;
  phone?: string;
  postal_code?: string;
  address?: string;
  address_detail?: string | null;
};

export function AddressForm({
  initial,
  mock,
  onPostalChange,
}: {
  initial?: AddressValue;
  mock?: boolean;
  onPostalChange?: (postal: string) => void;
}) {
  const [postal, setPostal] = useState(initial?.postal_code ?? "");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [failed, setFailed] = useState(false);
  const apply = (data: Picked) => {
    setPostal(data.zonecode);
    setAddress(data.roadAddress);
    onPostalChange?.(data.zonecode);
  };
  const search = async () => {
    if (mock) return apply(MOCK);
    try {
      await loadScript();
      const daum = (window as PostcodeWindow).daum;
      if (daum) new daum.Postcode({ oncomplete: apply }).open();
    } catch {
      setFailed(true);
    }
  };
  return (
    <fieldset className="ez-address">
      <legend>배송지</legend>
      <Field label="받는 분">
        <Input name="recipient" defaultValue={initial?.recipient} required maxLength={100} autoComplete="name" />
      </Field>
      <Field label="휴대폰 번호">
        <Input name="phone" defaultValue={initial?.phone} required inputMode="tel" autoComplete="tel" />
      </Field>
      <div className="ez-address__postal">
        <Field label="우편번호" error={failed ? "우편번호 검색을 불러오지 못했어요. 잠시 후 다시 눌러 주세요." : undefined}>
          <Input name="postal_code" value={postal} readOnly required placeholder="검색으로 입력" />
        </Field>
        <Button variant="secondary" onClick={search}>
          우편번호 검색
        </Button>
      </div>
      <Field label="주소">
        <Input name="address" value={address} readOnly required />
      </Field>
      <Field label="상세 주소">
        <Input name="address_detail" defaultValue={initial?.address_detail ?? ""} maxLength={300} />
      </Field>
    </fieldset>
  );
}
