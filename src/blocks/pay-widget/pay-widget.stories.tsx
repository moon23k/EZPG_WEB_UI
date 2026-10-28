import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PayWidget } from "../../index";

const meta: Meta<typeof PayWidget> = {
  title: "Blocks/PayWidget",
  component: PayWidget,
  parameters: { layout: "padded" },
};
export default meta;

function MockExample() {
  return (
    <div className="ez:max-w-md">
      <PayWidget
        mock
        request={{
          clientKey: "test_ck",
          orderId: "o1",
          orderName: "린넨 셔츠 외 1건",
          amount: 136500,
          successUrl: "/checkout/result?order=20261022-00012",
          failUrl: "/checkout/result?order=20261022-00012&fail=1",
        }}
      />
    </div>
  );
}

export const Mock: StoryObj = { render: () => <MockExample /> };
