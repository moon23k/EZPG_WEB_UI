import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { padded } from "../../../.storybook/decorators";
import { addresses } from "../../../fixtures/commerce";
import { AddressForm } from "./address-form";

const meta: Meta<typeof AddressForm> = {
  title: "blocks/address-form",
  component: AddressForm,
  decorators: [(Story) => <div className="ez:w-full ez:max-w-md"><Story /></div>, padded],
  args: { mock: true },
};
export default meta;
type Story = StoryObj<typeof AddressForm>;

export const Empty: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "우편번호 검색" }));
    await expect(canvas.getByRole("textbox", { name: "우편번호" })).toHaveValue("06236");
  },
};
export const Filled: Story = { args: { initial: addresses[0] } };
