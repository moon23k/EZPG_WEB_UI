import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { addresses } from "../../__stories__/fixtures/commerce";
import { AddressForm } from "../../index";

const meta: Meta<typeof AddressForm> = {
  title: "Blocks/AddressForm",
  component: AddressForm,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return (
    <div className="ez:max-w-md">
      <AddressForm mock />
    </div>
  );
}

function FilledExample() {
  return (
    <div className="ez:max-w-md">
      <AddressForm initial={addresses[0]} mock />
    </div>
  );
}

export const Default: StoryObj = { render: () => <DefaultExample /> };

export const Filled: StoryObj = { render: () => <FilledExample /> };
