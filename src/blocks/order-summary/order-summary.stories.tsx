import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { quote } from "../../__stories__/fixtures/commerce";
import { OrderSummary } from "../../index";

const meta: Meta<typeof OrderSummary> = {
  title: "Blocks/OrderSummary",
  component: OrderSummary,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return (
    <div className="ez:max-w-sm">
      <OrderSummary quote={quote} />
    </div>
  );
}

export const Default: StoryObj = { render: () => <DefaultExample /> };
