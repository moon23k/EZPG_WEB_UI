import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { orders } from "../../__stories__/fixtures/commerce";
import { OrderList } from "../../index";

const meta: Meta<typeof OrderList> = {
  title: "Blocks/OrderList",
  component: OrderList,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return <OrderList orders={orders} />;
}

function EmptyExample() {
  return <OrderList orders={[]} />;
}

export const Default: StoryObj = { render: () => <DefaultExample /> };

export const Empty: StoryObj = { render: () => <EmptyExample /> };
