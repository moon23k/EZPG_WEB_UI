import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { addresses, quote } from "../../../fixtures/commerce";
import { AddressForm } from "../address-form";
import { OrderSummary } from "../order-summary";
import { CheckoutLayout } from "./checkout-layout";

const meta: Meta<typeof CheckoutLayout> = {
  title: "blocks/checkout-layout",
  component: CheckoutLayout,
  decorators: [(Story) => <div className="ez:w-full"><Story /></div>, padded],
};
export default meta;
type Story = StoryObj<typeof CheckoutLayout>;

export const Default: Story = {
  args: { main: <AddressForm initial={addresses[0]} mock />, aside: <OrderSummary quote={quote} /> },
};
