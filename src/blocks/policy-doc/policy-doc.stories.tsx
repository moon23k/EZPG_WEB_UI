import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PolicyDoc } from "../../index";

const meta: Meta<typeof PolicyDoc> = {
  title: "Blocks/PolicyDoc",
  component: PolicyDoc,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return (
    <PolicyDoc
      title="교환 · 반품 안내"
      sections={[
        { heading: "신청 기간", text: "상품을 받은 날부터 7일 안에 신청할 수 있어요." },
        { heading: "배송비", text: "단순 변심: 왕복 7,000원\n상품 문제: 판매자 부담" },
      ]}
    />
  );
}

export const Default: StoryObj = { render: () => <DefaultExample /> };
