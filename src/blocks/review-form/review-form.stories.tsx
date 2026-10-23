import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { ReviewForm } from "./review-form";

const meta: Meta<typeof ReviewForm> = {
  title: "blocks/review-form",
  component: ReviewForm,
  decorators: [(Story) => <div className="ez:w-full"><Story /></div>, padded],
  args: { orderItemId: "i1", productName: "라넌큘러스 핸드타이드", action: async () => ({ ok: true }) },
};
export default meta;
type Story = StoryObj<typeof ReviewForm>;

export const Default: Story = {};
export const Failed: Story = { args: { action: async () => ({ error: "후기는 5자 이상 써 주세요." }) } };
