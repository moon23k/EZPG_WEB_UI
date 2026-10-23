import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { business } from "../../../fixtures/commerce";
import { SiteFooter } from "./site-footer";

const meta: Meta<typeof SiteFooter> = {
  title: "blocks/site-footer",
  component: SiteFooter,
  args: {
    storeName: "온기꽃방",
    hosting: "EZPG",
    policies: [
      { key: "terms", title: "이용약관" },
      { key: "privacy", title: "개인정보처리방침" },
    ],
  },
};
export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = { args: { business, closing: "10월 3일은 휴무입니다." } };
export const NoBusiness: Story = { args: { business: null } };
