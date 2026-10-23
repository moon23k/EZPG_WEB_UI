import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { quote } from "../../../fixtures/commerce";
import { OrderSummary } from "./order-summary";

const meta: Meta<typeof OrderSummary> = {
  title: "blocks/order-summary",
  component: OrderSummary,
  decorators: [(Story) => <div className="ez:w-full ez:max-w-sm"><Story /></div>, padded],
};
export default meta;
type Story = StoryObj<typeof OrderSummary>;

export const WithDiscounts: Story = { args: { quote } };
export const Simple: Story = {
  args: { quote: { ...quote, product_discount: 0, coupon_discount: 0, region_fee: 0, point_used: 0, total: 139500 } },
};
