import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Row, Section } from "../../__stories__/helpers";
import { Quantity } from "./quantity";

const meta = {
  title: "Components/Quantity",
  component: Quantity,
  args: { value: 1, label: "수량", onChange: () => {} },
} satisfies Meta<typeof Quantity>;
export default meta;

function Counter({ size }: { size: "md" | "sm" }) {
  const [value, setValue] = useState(1);
  return <Quantity value={value} onChange={setValue} size={size} label="수량" />;
}

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Section title="size">
      <Row>
        <Counter size="md" />
        <Counter size="sm" />
      </Row>
    </Section>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
