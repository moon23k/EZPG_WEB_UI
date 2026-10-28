import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OAuthButtons } from "../../index";

const meta: Meta<typeof OAuthButtons> = {
  title: "Blocks/OAuthButtons",
  component: OAuthButtons,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return <OAuthButtons next="/checkout" />;
}

export const Default: StoryObj = { render: () => <DefaultExample /> };
