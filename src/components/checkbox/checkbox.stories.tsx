import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { padded } from "../../../.storybook/decorators";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "components/checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  decorators: [padded],
  args: { label: "주문 내용을 확인했어요", name: "agree" },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("주문 내용을 확인했어요"));
    await expect(canvas.getByRole("checkbox")).toBeChecked();
  },
};

export const States: Story = {
  render: () => (
    <div className="ez:grid ez:gap-3">
      <Checkbox label="개인정보 수집 · 이용 동의 (필수)" description="주문 처리와 배송에만 사용하고 5년 후 삭제해요." defaultChecked />
      <Checkbox label="마케팅 정보 수신 (선택)" />
      <Checkbox label="선택할 수 없는 항목" disabled />
    </div>
  ),
};
