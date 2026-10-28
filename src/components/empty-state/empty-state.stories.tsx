import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "../../__stories__/helpers";
import { EmptyState } from "./empty-state";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  args: { title: "아직 주문이 없어요", action: { label: "상품 보기", href: "/products" } },
} satisfies Meta<typeof EmptyState>;
export default meta;

const Bag = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <>
      <Section title="icon · action(href)">
        <EmptyState icon={<Bag />} title="장바구니가 비어 있어요" action={{ label: "상품 보기", href: "/products" }} />
      </Section>
      <Section title="no icon · action(onPress)">
        <EmptyState title="페이지를 불러오지 못했어요" description="잠시 뒤 다시 시도해 주세요." action={{ label: "다시 시도", onPress: () => {} }} />
      </Section>
    </>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
