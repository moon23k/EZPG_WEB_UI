import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { padded } from "../../../.storybook/decorators";
import { blockedLine, cartLines } from "../../../fixtures/commerce";
import { CartLine } from "./cart-line";

const meta: Meta<typeof CartLine> = {
  title: "blocks/cart-line",
  component: CartLine,
  decorators: [(Story) => <ul className="ez:m-0 ez:w-full ez:list-none ez:p-0"><Story /></ul>, padded],
  args: { line: cartLines[0], updateAction: fn(), removeAction: fn() },
};
export default meta;
type Story = StoryObj<typeof CartLine>;

export const Default: Story = {};
export const OutOfStock: Story = { args: { line: blockedLine } };
