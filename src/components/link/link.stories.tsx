import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "../../__stories__/helpers";
import { Link } from "./link";

const meta = {
  title: "Components/Link",
  component: Link,
  args: { href: "/policy/terms", children: "이용약관" },
} satisfies Meta<typeof Link>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Section title="inline">
      <p style={{ margin: 0 }}>
        주문하면 <Link href="/policy/terms">이용약관</Link>에 동의한 것으로 봐요.
      </p>
    </Section>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
