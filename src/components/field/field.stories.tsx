import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Copy } from "../../../.storybook/preview";
import { padded } from "../../../.storybook/decorators";
import { Field, Input, TextArea } from "./field";

const meta: Meta<typeof Field> = {
  title: "components/field",
  component: Field,
  tags: ["autodocs"],
  decorators: [padded],
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <Field label="받는 분" className="ez:w-full">
      <Input name="recipient" placeholder="이름" autoComplete="name" />
    </Field>
  ),
};

export const States: Story = {
  render: (_, { loaded }) => {
    const copy = loaded.copy as Copy;
    return (
      <div className="ez:grid ez:w-full ez:gap-4">
        <Field label="휴대폰 번호" hint="주문 조회에 사용해요.">
          <Input name="phone" inputMode="tel" defaultValue="010-1234-5678" />
        </Field>
        <Field label="주문번호" error="주문번호 형식이 맞지 않아요.">
          <Input name="number" aria-invalid defaultValue="2026" />
        </Field>
        <Field label="주소">
          <Input name="address" readOnly value={copy.address} />
        </Field>
        <Field label="후기">
          <TextArea name="body" defaultValue={copy.reviewBody} />
        </Field>
        <Field label="비활성">
          <Input disabled placeholder="입력할 수 없어요" />
        </Field>
      </div>
    );
  },
};
