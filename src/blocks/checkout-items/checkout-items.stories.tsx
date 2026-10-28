import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { cartLines } from "../../__stories__/fixtures/commerce";
import { CheckoutItems } from "../../index";

const meta: Meta<typeof CheckoutItems> = {
  title: "Blocks/CheckoutItems",
  component: CheckoutItems,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return (
    <div className="ez:max-w-sm">
      <CheckoutItems lines={cartLines} imageSrc={{}} />
    </div>
  );
}

export const Default: StoryObj = { render: () => <DefaultExample /> };
