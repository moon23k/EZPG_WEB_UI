import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Column, Section } from "../../__stories__/helpers";
import { Field, Input, TextArea } from "./field";

const meta = {
  title: "Components/Field",
  component: Field,
  args: { label: "받는 분", children: <Input defaultValue="" /> },
} satisfies Meta<typeof Field>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Section title="state">
      <Column>
        <Field label="받는 분">
          <Input />
        </Field>
        <Field label="휴대폰 번호" hint="숫자만 입력해 주세요">
          <Input inputMode="numeric" />
        </Field>
        <Field label="이메일" error="이메일 형식이 아니에요">
          <Input defaultValue="hello@" aria-invalid />
        </Field>
        <Field label="요청 사항">
          <TextArea />
        </Field>
      </Column>
    </Section>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
