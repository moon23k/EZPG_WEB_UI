import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Button } from "../button/button";
import { Sheet } from "./sheet";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  args: { open: true, title: "장바구니에 담았어요", onOpenChange: () => {} },
} satisfies Meta<typeof Sheet>;
export default meta;

function Opener() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>장바구니 담기</Button>
      <Sheet open={open} onOpenChange={setOpen} title="장바구니에 담았어요">
        <Button block onClick={() => setOpen(false)}>
          계속 쇼핑하기
        </Button>
      </Sheet>
    </>
  );
}

export const AllVariants: StoryObj<typeof meta> = {
  render: () => <Opener />,
};

export const Playground: StoryObj<typeof meta> = {};
