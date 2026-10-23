import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "components/badge",
  component: Badge,
  tags: ["autodocs"],
  decorators: [padded],
  args: { tone: "neutral", children: "신상품" },
  argTypes: { tone: { control: "inline-radio", options: ["neutral", "primary", "warn"] } },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="ez:flex ez:gap-2">
      <Badge>신상품</Badge>
      <Badge tone="primary">10% 할인</Badge>
      <Badge tone="warn">품절</Badge>
    </div>
  ),
};
