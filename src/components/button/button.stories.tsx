import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Copy } from "../../../.storybook/preview";
import { padded } from "../../../.storybook/decorators";
import { Button, ButtonLink } from "./button";

const meta: Meta<typeof Button> = {
  title: "components/button",
  component: Button,
  decorators: [padded],
  args: { variant: "primary", size: "md", block: false, disabled: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "ghost"] },
    size: { control: "inline-radio", options: ["md", "sm"] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args, { loaded }) => <Button {...args}>{(loaded.copy as Copy).buttonLabel}</Button>,
};

export const Variants: Story = {
  render: (_, { loaded }) => {
    const label = (loaded.copy as Copy).buttonLabel;
    return (
      <>
        <Button>{label}</Button>
        <Button variant="secondary">{label}</Button>
        <Button variant="ghost">{label}</Button>
        <Button size="sm">{label}</Button>
        <Button disabled>{label}</Button>
      </>
    );
  },
};

export const Block: Story = {
  render: (_, { loaded }) => (
    <div className="ez:w-full ez:grid ez:gap-2">
      <Button block>{(loaded.copy as Copy).buttonLabel}</Button>
      <ButtonLink href="/cart" variant="secondary" block>
        장바구니 보기
      </ButtonLink>
    </div>
  ),
};
