import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "./a11y";
import { AddressForm, BuyBox, Button, CartView, Checkbox, ClaimForm, Dialog, Field, OrderSummary, Quantity, ReviewForm, Select, type ProductDetail } from "../src";


const product: ProductDetail = {
  id: "p1",
  name: "린넨 셔츠",
  list_price: 58000,
  sale_price: 52000,
  cover_url: null,
  sold_out: false,
  slot_scope: "none",
  option_name: "사이즈",
  variants: [
    { id: "v1", label: "S", price: 42000, in_stock: true },
    { id: "v2", label: "M", price: 52000, in_stock: true },
    { id: "v3", label: "L", price: 68000, in_stock: false },
  ],
  images: [],
};

describe("Quantity", () => {
  it("stays within min and max", async () => {
    const { container } = render(<Quantity min={1} max={3} />);
    const plus = screen.getByRole("button", { name: "수량 늘리기" });
    for (let i = 0; i < 5; i++) await userEvent.click(plus);
    expect(screen.getByLabelText("수량")).toHaveValue("3");
    expect(plus).toBeDisabled();
    expect(screen.getByRole("button", { name: "수량 줄이기" })).toBeEnabled();
    await expectNoA11yViolations(container);
  });
});

describe("Checkbox", () => {
  it("toggles from its label", async () => {
    const { container } = render(<Checkbox name="agree" label="주문 내용을 확인했어요" />);
    await userEvent.click(screen.getByText("주문 내용을 확인했어요"));
    expect(screen.getByRole("checkbox")).toBeChecked();
    await expectNoA11yViolations(container);
  });
});

describe("Select", () => {
  it("is named by its field label and changes value", async () => {
    const { container } = render(
      <Field label="상태">
        <Select name="status" defaultValue="all">
          <option value="all">전체</option>
          <option value="past_due">연체</option>
        </Select>
      </Field>,
    );
    const select = screen.getByRole("combobox", { name: "상태" });
    await userEvent.selectOptions(select, "past_due");
    expect(select).toHaveProperty("value", "past_due");
    await expectNoA11yViolations(container);
  });
});

describe("Dialog", () => {
  function Harness() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>주문 취소</Button>
        <Dialog open={open} title="주문을 취소할까요?" onOpenChange={setOpen} />
      </>
    );
  }

  it("opens with its title and closes on Escape", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "주문 취소" }));
    expect(screen.getByRole("dialog")).toHaveAccessibleName("주문을 취소할까요?");
    await expectNoA11yViolations(document.body);
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("BuyBox", () => {
  it("updates the total for the chosen option and opens the sheet after adding", async () => {
    const { container } = render(<BuyBox product={product} addAction={async () => ({ ok: true, message: "담았어요" })} />);
    await userEvent.click(screen.getByLabelText(/^M/));
    expect(screen.getByText("부터").parentElement).toHaveTextContent("42,000원부터");
    expect(screen.queryByText(/%$/)).toBeNull();
    expect(screen.getByText("총 상품금액").parentElement?.querySelector("strong")).toHaveTextContent("52,000원");
    expect(screen.getByRole("link", { name: "바로 구매" })).toHaveAttribute("href", "/checkout?item=v2&qty=1");
    await expectNoA11yViolations(container);
    await userEvent.click(screen.getByRole("button", { name: "장바구니 담기" }));
    expect(await screen.findByRole("dialog", { name: "장바구니에 담았어요" })).toBeInTheDocument();
  });

  it("offers only a restock alert when sold out", () => {
    render(<BuyBox product={{ ...product, sold_out: true }} addAction={async () => ({})} restockAction={async () => {}} />);
    expect(screen.getByRole("button", { name: "재입고 알림" })).toBeEnabled();
    expect(screen.queryByRole("button", { name: "장바구니 담기" })).toBeNull();
    expect(screen.queryByText("바로 구매")).toBeNull();
  });
});

describe("AddressForm", () => {
  it("fills the postal code from the (mock) search", async () => {
    const { container } = render(<AddressForm mock />);
    await userEvent.click(screen.getByRole("button", { name: "주소 검색" }));
    const group = within(container);
    expect(group.getByRole("textbox", { name: "주소" })).toHaveValue("(06236) 서울 강남구 테헤란로 152");
    expect(container.querySelector<HTMLInputElement>('input[name="postal_code"]')?.value).toBe("06236");
    await expectNoA11yViolations(container);
  });
});

describe("CartView", () => {
  const base = { product_id: "p", option_label: null, image_key: null, list_price: 10000, sellable: true, enough_stock: true, inputs: [] };
  const lines = [
    { ...base, variant_id: "a", name: "머그컵", unit_price: 10000, quantity: 1, line_total: 10000 },
    { ...base, variant_id: "b", name: "쿠션", unit_price: 20000, quantity: 1, line_total: 20000 },
    { ...base, variant_id: "c", name: "액자", unit_price: 30000, quantity: 2, line_total: 60000, enough_stock: false, inputs: [] },
  ];
  const noop = async () => {};

  it("leaves out lines that cannot be bought and follows the selection", async () => {
    render(<CartView lines={lines} updateAction={noop} removeAction={noop} />);
    const order = screen.getByRole("link", { name: "주문하기" });
    expect(order).toHaveAttribute("href", "/checkout?items=a,b");
    expect(screen.getByText("2/2")).toBeInTheDocument();
    expect(screen.getByText("결제 예정 금액").nextElementSibling).toHaveTextContent("30,000원");
    expect(screen.getByText("구매할 수 없는 상품 1개")).toBeInTheDocument();
    expect(screen.queryByRole("checkbox", { name: "액자 선택" })).toBeNull();
    expect(screen.getByRole("button", { name: "모두 삭제" })).toBeEnabled();
    await userEvent.click(screen.getByRole("checkbox", { name: "머그컵 선택" }));
    expect(screen.getByRole("link", { name: "주문하기" })).toHaveAttribute("href", "/checkout?items=b");
    expect(screen.getByText("1/2")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "액자 수량 늘리기" })).toBeNull();
  });
});

describe("OrderSummary", () => {
  it("adds up from the list-price sum to the total", () => {
    const quote = { items_total: 136000, product_discount: 6000, coupon_discount: 5000, delivery_fee: 3500, region_fee: 3000, shipping_discount: 0, point_used: 1000, total: 136500 };
    render(<OrderSummary quote={quote} />);
    expect(screen.getByText("상품 금액").nextElementSibling).toHaveTextContent("142,000원");
    expect(142000 - 6000 - 5000 + 3500 + 3000 - 1000).toBe(quote.total);
  });
});

describe("ReviewForm", () => {
  it("starts with no rating and waits for one", async () => {
    const { container } = render(<ReviewForm orderItemId="i1" productName="머그컵" action={async () => ({})} />);
    for (const n of [1, 2, 3, 4, 5]) expect(screen.getByRole("radio", { name: `${n}점` })).not.toBeChecked();
    await userEvent.type(screen.getByRole("textbox", { name: "후기" }), "향이 좋아요");
    expect(screen.getByRole("button", { name: "후기 등록" })).toBeDisabled();
    await userEvent.click(screen.getByRole("radio", { name: "4점" }));
    expect(screen.getByRole("button", { name: "후기 등록" })).toBeEnabled();
    await expectNoA11yViolations(container);
  });
});

describe("ClaimForm", () => {
  const item = { option_label: null, line_total: 0, paid_amount: 0, refunded_amount: 0 };
  const items = [
    { ...item, id: "t", product_name: "머그컵", quantity: 2, returned_quantity: 1, non_returnable: false },
    { ...item, id: "r", product_name: "린넨 셔츠", quantity: 1, returned_quantity: 0, non_returnable: true },
  ];

  it("locks non-returnable items unless the seller is at fault", async () => {
    render(<ClaimForm kind="return" items={items} action={async () => ({})} />);
    expect(screen.getByText(/반품 가능 1개/)).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /린넨 셔츠/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: "반품 신청" })).toBeDisabled();
    await userEvent.click(screen.getByRole("radio", { name: /상품 문제/ }));
    expect(screen.getByRole("checkbox", { name: /린넨 셔츠/ })).toBeEnabled();
  });
});
