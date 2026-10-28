import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Column, Section } from "../../__stories__/helpers";
import { Price } from "./price";

const meta = {
  title: "Components/Price",
  component: Price,
  args: { value: 52000, list: 58000 },
} satisfies Meta<typeof Price>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Section title="sale · regular">
      <Column>
        <Price value={52000} list={58000} />
        <Price value={18000} />
      </Column>
    </Section>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
