import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { padded } from "../../../.storybook/decorators";
import { blockedLine, cartLines } from "../../../fixtures/commerce";
import { CartView } from "./cart-view";

const meta: Meta<typeof CartView> = {
  title: "blocks/cart-view",
  component: CartView,
  decorators: [(Story) => <div className="ez:w-full"><Story /></div>, padded],
  args: { lines: cartLines, itemsTotal: 136000, updateAction: fn(), removeAction: fn() },
};
export default meta;
type Story = StoryObj<typeof CartView>;

export const Default: Story = {};
export const Blocked: Story = { args: { lines: [...cartLines, blockedLine] } };
export const Empty: Story = { args: { lines: [], itemsTotal: 0 } };
