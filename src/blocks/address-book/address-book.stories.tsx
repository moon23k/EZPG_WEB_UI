import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { padded } from "../../../.storybook/decorators";
import { addresses } from "../../../fixtures/commerce";
import { AddressBook } from "./address-book";

const meta: Meta<typeof AddressBook> = {
  title: "blocks/address-book",
  component: AddressBook,
  decorators: [(Story) => <div className="ez:w-full"><Story /></div>, padded],
  args: { addresses, removeAction: fn() },
};
export default meta;
type Story = StoryObj<typeof AddressBook>;

export const Default: Story = {};
export const Empty: Story = { args: { addresses: [] } };
