import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, screen, userEvent, within } from "storybook/test";
import { padded } from "../../../.storybook/decorators";
import { productDetail } from "../../../fixtures/commerce";
import { BuyBox } from "./buy-box";

const meta: Meta<typeof BuyBox> = {
  title: "blocks/buy-box",
  component: BuyBox,
  decorators: [(Story) => <div className="ez:w-full ez:max-w-md"><Story /></div>, padded],
  args: { product: productDetail, addAction: async () => ({ ok: true, message: "라넌큘러스 핸드타이드 · S 1개" }) },
};
export default meta;
type Story = StoryObj<typeof BuyBox>;

export const Default: Story = {};

export const AddToCart: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText(/^M/));
    await expect(canvas.getByText("52,000원", { selector: "strong.ez\\:text-xl" })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "장바구니 담기" }));
    await expect(await screen.findByRole("dialog", { name: "장바구니에 담았어요" })).toBeInTheDocument();
  },
};

export const SoldOut: Story = { args: { product: { ...productDetail, sold_out: true } } };
export const NotSelling: Story = { args: { selling: false } };
export const AddFailed: Story = { args: { addAction: async () => ({ error: "재고가 부족해요. 수량을 줄여 주세요." }) } };
