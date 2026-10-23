import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { Price } from "./price";

const meta: Meta<typeof Price> = {
  title: "components/price",
  component: Price,
  tags: ["autodocs"],
  decorators: [padded],
  args: { value: 52000, list: 58000 },
};

export default meta;
type Story = StoryObj<typeof Price>;

export const Discounted: Story = {};

export const Regular: Story = { args: { value: 42000, list: 42000 } };

export const Large: Story = { args: { value: 1080000, list: 1200000 }, render: (args) => <Price {...args} className="ez:text-2xl" /> };
