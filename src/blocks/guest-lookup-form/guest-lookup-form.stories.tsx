import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { GuestLookupForm } from "./guest-lookup-form";

const meta: Meta<typeof GuestLookupForm> = {
  title: "blocks/guest-lookup-form",
  component: GuestLookupForm,
  decorators: [(Story) => <div className="ez:w-full"><Story /></div>, padded],
  args: { action: async () => ({ error: "주문번호와 휴대폰 번호가 맞는 주문이 없어요." }) },
};
export default meta;
type Story = StoryObj<typeof GuestLookupForm>;

export const Default: Story = {};
