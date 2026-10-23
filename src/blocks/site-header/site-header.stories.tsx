import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Copy } from "../../../.storybook/preview";
import { SiteHeader } from "./site-header";

const meta: Meta<typeof SiteHeader> = { title: "blocks/site-header", component: SiteHeader };
export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {
  args: { cartCount: 2, signedIn: true },
  render: (args, { loaded }) => <SiteHeader {...args} name={(loaded.copy as Copy).shopName} />,
};
export const Guest: Story = {
  render: (_, { loaded }) => <SiteHeader name={(loaded.copy as Copy).shopName} />,
};
