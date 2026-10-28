import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GuestLookupForm } from "../../index";

const meta: Meta<typeof GuestLookupForm> = {
  title: "Blocks/GuestLookupForm",
  component: GuestLookupForm,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return <GuestLookupForm action={async () => ({ error: "주문번호와 휴대폰 번호가 맞는 주문이 없어요." })} />;
}

export const Default: StoryObj = { render: () => <DefaultExample /> };
