import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Row, Section } from "../../__stories__/helpers";
import { Button, ButtonLink } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "저장" },
} satisfies Meta<typeof Button>;
export default meta;

const variants = ["primary", "secondary", "outline", "ghost", "danger"] as const;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <>
      <Section title="variant">
        <Row>
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ))}
        </Row>
      </Section>
      <Section title="size">
        <Row>
          <Button size="sm">작게</Button>
          <Button size="md">보통</Button>
        </Row>
      </Section>
      <Section title="loading · disabled · link">
        <Row>
          <Button loading>저장 중</Button>
          <Button disabled>비활성</Button>
          <ButtonLink href="/products" variant="outline">
            상품 보기
          </ButtonLink>
        </Row>
      </Section>
    </>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
