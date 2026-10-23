import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Copy } from "../../../.storybook/preview";
import { ButtonLink } from "../button";
import { EmptyState } from "./empty-state";

const meta: Meta<typeof EmptyState> = {
  title: "components/empty-state",
  component: EmptyState,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: (_, { loaded }) => {
    const copy = loaded.copy as Copy;
    return <EmptyState title={copy.emptyTitle} description={copy.emptyBody} />;
  },
};

export const WithAction: Story = {
  render: (_, { loaded }) => {
    const copy = loaded.copy as Copy;
    return (
      <EmptyState title={copy.emptyTitle} description={copy.emptyBody}>
        <ButtonLink href="/products">상품 보러 가기</ButtonLink>
      </EmptyState>
    );
  },
};
