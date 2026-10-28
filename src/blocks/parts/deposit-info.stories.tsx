import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DepositInfo } from "../../index";

const meta: Meta<typeof DepositInfo> = {
  title: "Blocks/DepositInfo",
  component: DepositInfo,
  parameters: { layout: "padded" },
};
export default meta;

export const Default: StoryObj = {
  render: () => (
    <DepositInfo
      deposit={{
        bank_code: "088",
        bank_name: "신한은행",
        account_number: "56211234567890",
        holder: "온기상점",
        due_at: "2026-10-29T14:59:00Z",
        amount: 136500,
      }}
    />
  ),
};
