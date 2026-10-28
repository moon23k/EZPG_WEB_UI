import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Row, Section } from "../../__stories__/helpers";
import { Badge } from "./badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "품절" },
} satisfies Meta<typeof Badge>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Section title="tone">
      <Row>
        <Badge tone="neutral">기본</Badge>
        <Badge tone="primary">신상품</Badge>
        <Badge tone="danger">품절</Badge>
      </Row>
    </Section>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
