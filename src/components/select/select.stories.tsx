import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Column, Section } from "../../__stories__/helpers";
import { Field } from "../field/field";
import { Select } from "./select";

const meta = {
  title: "Components/Select",
  component: Select,
  args: { "aria-label": "정렬", children: <option>최신순</option> },
} satisfies Meta<typeof Select>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Section title="state">
      <Column>
        <Field label="배송 메모">
          <Select defaultValue="door">
            <option value="door">문 앞에 놓아 주세요</option>
            <option value="call">도착 전 연락 주세요</option>
          </Select>
        </Field>
        <Select aria-label="비활성" disabled>
          <option>선택할 수 없음</option>
        </Select>
      </Column>
    </Section>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
