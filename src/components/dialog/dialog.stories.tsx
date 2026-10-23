import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, userEvent, within, screen } from "storybook/test";
import type { Copy } from "../../../.storybook/preview";
import { padded } from "../../../.storybook/decorators";
import { Button } from "../button";
import { Dialog } from "./dialog";

const meta: Meta<typeof Dialog> = {
  title: "components/dialog",
  component: Dialog,
  tags: ["autodocs"],
  decorators: [padded],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (_, { loaded }) => {
    const copy = loaded.copy as Copy;
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>주문 취소</Button>
        <Dialog open={open} title="주문을 취소할까요?" description={copy.faqAnswer} onClose={() => setOpen(false)}>
          <div className="ez:flex ez:justify-end ez:gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              닫기
            </Button>
            <Button onClick={() => setOpen(false)}>취소하기</Button>
          </div>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "주문 취소" }));
    const dialog = await screen.findByRole("dialog");
    await expect(dialog).toHaveAccessibleName("주문을 취소할까요?");
    await userEvent.keyboard("{Escape}");
    await expect(screen.queryByRole("dialog")).toBeNull();
  },
};
