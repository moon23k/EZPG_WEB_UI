import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { order } from "../../__stories__/fixtures/commerce";
import { ClaimForm } from "../../index";

const meta: Meta<typeof ClaimForm> = {
  title: "Blocks/ClaimForm",
  component: ClaimForm,
  parameters: { layout: "padded" },
};
export default meta;

function ReturnExample() {
  return <ClaimForm kind="return" items={order.items} imageSrc={{}} returnFee={7000} action={async () => ({ ok: true, message: "반품 신청을 접수했어요." })} />;
}

export const Return: StoryObj = { render: () => <ReturnExample /> };
