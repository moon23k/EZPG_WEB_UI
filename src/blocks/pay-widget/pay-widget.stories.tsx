import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { PayWidget } from "./pay-widget";

const meta: Meta<typeof PayWidget> = {
  title: "blocks/pay-widget",
  component: PayWidget,
  decorators: [(Story) => <div className="ez:w-full ez:max-w-md"><Story /></div>, padded],
};
export default meta;
type Story = StoryObj<typeof PayWidget>;

export const Mock: Story = {
  args: {
    mock: true,
    request: {
      clientKey: "test_ck",
      orderId: "o1",
      orderName: "라넌큘러스 핸드타이드 외 1건",
      amount: 130500,
      successUrl: "/checkout/result?order=20261022-00012",
      failUrl: "/checkout/result?order=20261022-00012&fail=1",
    },
  },
};
