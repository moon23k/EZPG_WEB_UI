import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { orders } from "../../../fixtures/commerce";
import { OrderList } from "../order-list";
import { AccountShell } from "./account-shell";

const meta: Meta<typeof AccountShell> = {
  title: "blocks/account-shell",
  component: AccountShell,
  decorators: [(Story) => <div className="ez:w-full"><Story /></div>, padded],
};
export default meta;
type Story = StoryObj<typeof AccountShell>;

export const Orders: Story = { args: { current: "/orders", children: <OrderList orders={orders} /> } };
