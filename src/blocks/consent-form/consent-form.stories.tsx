import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { Button } from "../../components/button";
import { ConsentForm } from "./consent-form";

const meta: Meta<typeof ConsentForm> = {
  title: "blocks/consent-form",
  component: ConsentForm,
  decorators: [padded],
  args: { children: (ready: boolean) => <Button block disabled={!ready}>130,500원 결제하기</Button> },
};
export default meta;
type Story = StoryObj<typeof ConsentForm>;

export const Guest: Story = { args: { guest: true } };
export const Member: Story = { args: { guest: false } };
