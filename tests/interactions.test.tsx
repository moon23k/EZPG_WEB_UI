import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { AddressForm, BuyBox, Button, Checkbox, Dialog, Quantity, type ProductDetail } from "../src";

// jsdom has no layout or canvas, so contrast is not checked here.
async function expectNoA11yViolations(container: HTMLElement) {
  const { violations } = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
  expect(violations.map((v) => `${v.id}: ${v.nodes[0]?.html}`)).toEqual([]);
}

const product: ProductDetail = {
  id: "p1",
  name: "라넌큘러스 핸드타이드",
  list_price: 58000,
  sale_price: 52000,
  cover_url: null,
  sold_out: false,
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

describe("Dialog", () => {
  function Harness() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>주문 취소</Button>
        <Dialog open={open} title="주문을 취소할까요?" onClose={() => setOpen(false)} />
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
    expect(screen.getByText("합계").querySelector("strong")).toHaveTextContent("52,000원");
    expect(screen.getByRole("link", { name: "바로 구매" })).toHaveAttribute("href", "/checkout?item=v2&qty=1");
    await expectNoA11yViolations(container);
    await userEvent.click(screen.getByRole("button", { name: "장바구니 담기" }));
    expect(await screen.findByRole("dialog", { name: "장바구니에 담았어요" })).toBeInTheDocument();
  });

  it("blocks buying when sold out", () => {
    render(<BuyBox product={{ ...product, sold_out: true }} addAction={async () => ({})} />);
    expect(screen.getByRole("button", { name: "품절" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "바로 구매" })).toBeDisabled();
  });
});

describe("AddressForm", () => {
  it("fills the postal code from the (mock) search", async () => {
    const { container } = render(<AddressForm mock />);
    await userEvent.click(screen.getByRole("button", { name: "우편번호 검색" }));
    const group = within(container);
    expect(group.getByRole("textbox", { name: "우편번호" })).toHaveValue("06236");
    expect(group.getByRole("textbox", { name: "주소" })).toHaveValue("서울 강남구 테헤란로 152");
    await expectNoA11yViolations(container);
  });
});
