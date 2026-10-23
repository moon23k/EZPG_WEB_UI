import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { OAuthButtons } from "./oauth-buttons";

const meta: Meta<typeof OAuthButtons> = { title: "blocks/oauth-buttons", component: OAuthButtons, decorators: [padded] };
export default meta;
type Story = StoryObj<typeof OAuthButtons>;

export const Default: Story = { args: { next: "/checkout" } };
