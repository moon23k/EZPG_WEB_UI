import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { reviews } from "../../../fixtures/commerce";
import { ReviewList } from "./review-list";

const meta: Meta<typeof ReviewList> = {
  title: "blocks/review-list",
  component: ReviewList,
  decorators: [(Story) => <div className="ez:w-full"><Story /></div>, padded],
};
export default meta;
type Story = StoryObj<typeof ReviewList>;

export const Default: Story = {
  args: { count: 2, average: 4.5, items: reviews, notice: [{ title: "숨김 기준", body: "욕설·광고·개인정보가 담긴 후기는 숨길 수 있어요." }] },
};
export const Empty: Story = { args: { count: 0, average: null, items: [] } };
