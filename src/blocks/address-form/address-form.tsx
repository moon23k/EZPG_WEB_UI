"use client";

import { useId, useState } from "react";
import { Button } from "../../components/button";
import { Field, Input } from "../../components/field";
import { cn } from "../../utils/cn";
import { fieldset, legend } from "../parts/choice";

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
  const addressId = useId();
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
    <fieldset data-slot="address-form" className={cn(fieldset, "ez:gap-3.5")}>
      <legend className={cn(legend, "ez:mb-2 ez:text-lg ez:font-bold")}>배송지</legend>
      <Field label="받는 분">
        <Input name="recipient" defaultValue={initial?.recipient} required maxLength={100} autoComplete="name" />
      </Field>
      <Field label="휴대폰 번호">
        <Input name="phone" defaultValue={initial?.phone} required inputMode="tel" autoComplete="tel" placeholder="010-0000-0000" />
      </Field>
      {/* Postal code and road address come from one search; the visible field opens it. */}
      <input type="hidden" name="postal_code" value={postal} />
      <input type="hidden" name="address" value={address} />
      <div className="ez:grid ez:gap-1.5">
        <label htmlFor={addressId} className="ez:text-sm ez:font-semibold ez:text-fg">
          주소
        </label>
        <div className="ez:grid ez:grid-cols-[minmax(0,1fr)_auto] ez:gap-2">
          <Input
            id={addressId}
            value={postal ? `(${postal}) ${address}` : ""}
            readOnly
            required
            placeholder="주소 검색"
            onClick={search}
            className="ez:cursor-pointer"
          />
          <Button variant="secondary" onClick={search} aria-label="주소 검색">
            검색
          </Button>
        </div>
        {failed && (
          <span className="ez:text-xs ez:text-danger" role="alert">
            주소 검색을 불러오지 못했어요. 잠시 후 다시 눌러 주세요.
          </span>
        )}
      </div>
      <Field label="상세 주소">
        <Input name="address_detail" defaultValue={initial?.address_detail ?? ""} maxLength={300} placeholder="동·호수 등" />
      </Field>
    </fieldset>
  );
}
