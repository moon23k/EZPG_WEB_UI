import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReviewForm } from "../../index";

const meta: Meta<typeof ReviewForm> = {
  title: "Blocks/ReviewForm",
  component: ReviewForm,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return <ReviewForm orderItemId="i1" productName="린넨 셔츠" option="M" imageSrc={null} action={async () => ({ ok: true })} />;
}

export const Default: StoryObj = { render: () => <DefaultExample /> };
