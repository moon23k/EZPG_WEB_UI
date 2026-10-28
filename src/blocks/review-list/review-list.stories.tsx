import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { reviews } from "../../__stories__/fixtures/commerce";
import { ReviewList } from "../../index";

const meta: Meta<typeof ReviewList> = {
  title: "Blocks/ReviewList",
  component: ReviewList,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return (
    <ReviewList
      items={reviews}
      notice={[{ title: "숨김 기준", body: "욕설 · 광고 · 개인정보가 담긴 후기는 숨길 수 있어요." }]}
    />
  );
}

function EmptyExample() {
  return <ReviewList count={0} average={null} items={[]} writeHref="/me/reviews" />;
}

export const Default: StoryObj = { render: () => <DefaultExample /> };

export const Empty: StoryObj = { render: () => <EmptyExample /> };
