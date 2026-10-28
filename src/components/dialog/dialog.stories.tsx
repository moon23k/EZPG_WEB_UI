import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Row } from "../../__stories__/helpers";
import { Button } from "../button/button";
import { Dialog } from "./dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  args: { open: true, title: "주문을 취소할까요?", description: "결제한 금액은 3영업일 안에 돌려드려요.", onOpenChange: () => {} },
} satisfies Meta<typeof Dialog>;
export default meta;

function Confirm() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        주문 취소
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title="주문을 취소할까요?" closeButton={false}>
        <Row>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            닫기
          </Button>
          <Button variant="danger" onClick={() => setOpen(false)}>
            취소하기
          </Button>
        </Row>
      </Dialog>
    </>
  );
}

export const AllVariants: StoryObj<typeof meta> = {
  render: () => <Confirm />,
};

export const Playground: StoryObj<typeof meta> = {};
