import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Column, Section } from "../../__stories__/helpers";
import { Checkbox } from "./checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: { label: "주문 정보 수집에 동의합니다" },
} satisfies Meta<typeof Checkbox>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Section title="state">
      <Column>
        <Checkbox label="꺼짐" />
        <Checkbox label="켜짐" defaultChecked />
        <Checkbox label="설명 있음" description="결제와 배송에만 씁니다." />
        <Checkbox label="비활성" disabled />
      </Column>
    </Section>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
