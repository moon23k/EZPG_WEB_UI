import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { addresses, cartLines, quote } from "../../__stories__/fixtures/commerce";
import { AddressForm, CheckoutItems, CheckoutLayout, OrderSummary } from "../../index";

const meta: Meta<typeof CheckoutLayout> = {
  title: "Blocks/CheckoutLayout",
  component: CheckoutLayout,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return (
    <CheckoutLayout
      main={<AddressForm initial={addresses[0]} mock />}
      aside={
        <>
          <CheckoutItems lines={cartLines} imageSrc={{}} />
          <OrderSummary quote={quote} />
        </>
      }
    />
  );
}

export const Default: StoryObj = { render: () => <DefaultExample /> };
