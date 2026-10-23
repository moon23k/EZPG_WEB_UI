import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { orders } from "../../../fixtures/commerce";
import { OrderList } from "./order-list";

const meta: Meta<typeof OrderList> = {
  title: "blocks/order-list",
  component: OrderList,
  decorators: [(Story) => <div className="ez:w-full"><Story /></div>, padded],
};
export default meta;
type Story = StoryObj<typeof OrderList>;

export const Default: Story = { args: { orders } };
export const Empty: Story = { args: { orders: [] } };
