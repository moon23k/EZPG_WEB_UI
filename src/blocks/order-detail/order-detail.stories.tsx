import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { order } from "../../../fixtures/commerce";
import { Button } from "../../components/button";
import { OrderDetail } from "./order-detail";

const meta: Meta<typeof OrderDetail> = {
  title: "blocks/order-detail",
  component: OrderDetail,
  decorators: [(Story) => <div className="ez:w-full"><Story /></div>, padded],
  args: { order },
};
export default meta;
type Story = StoryObj<typeof OrderDetail>;

export const Shipped: Story = {
  args: {
    actions: (
      <>
        <Button variant="secondary">반품 요청</Button>
        <Button variant="secondary">교환 요청</Button>
        <Button>구매 확정</Button>
      </>
    ),
  },
};
export const PendingPayment: Story = { args: { order: { ...order, status: "pending_payment", shipments: [] } } };
