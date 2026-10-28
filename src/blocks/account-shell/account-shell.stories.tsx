import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { orders } from "../../__stories__/fixtures/commerce";
import { AccountShell, OrderList } from "../../index";

const meta: Meta<typeof AccountShell> = {
  title: "Blocks/AccountShell",
  component: AccountShell,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return (
    <AccountShell current="/orders">
      <OrderList orders={orders} />
    </AccountShell>
  );
}

export const Default: StoryObj = { render: () => <DefaultExample /> };
