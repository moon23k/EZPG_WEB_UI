import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { padded } from "../../../.storybook/decorators";
import { Quantity } from "./quantity";

const meta: Meta<typeof Quantity> = {
  title: "components/quantity",
  component: Quantity,
  decorators: [padded],
  args: { min: 1, max: 5 },
};

export default meta;
type Story = StoryObj<typeof Quantity>;

export const Default: Story = {};

export const ClampsToRange: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const plus = canvas.getByRole("button", { name: "수량 늘리기" });
    for (let i = 0; i < 6; i++) await userEvent.click(plus);
    await expect(canvas.getByLabelText("수량")).toHaveValue("5");
    await expect(plus).toBeDisabled();
  },
};
