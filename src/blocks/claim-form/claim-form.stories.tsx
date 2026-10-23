import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { order } from "../../../fixtures/commerce";
import { ClaimForm } from "./claim-form";

const meta: Meta<typeof ClaimForm> = {
  title: "blocks/claim-form",
  component: ClaimForm,
  decorators: [(Story) => <div className="ez:w-full"><Story /></div>, padded],
  args: { items: order.items, action: async () => ({ ok: true, message: "반품 요청을 접수했어요." }) },
};
export default meta;
type Story = StoryObj<typeof ClaimForm>;

export const Return: Story = { args: { kind: "return" } };
export const Cancel: Story = { args: { kind: "cancel" } };
