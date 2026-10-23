import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import type { Copy } from "../../../.storybook/preview";
import { padded } from "../../../.storybook/decorators";
import { Button, ButtonLink } from "../button";
import { Price } from "../price";
import { Sheet } from "./sheet";

const meta: Meta<typeof Sheet> = {
  title: "components/sheet",
  component: Sheet,
  tags: ["autodocs"],
  decorators: [padded],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const AddedToCart: Story = {
  render: (_, { loaded }) => {
    const copy = loaded.copy as Copy;
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>{copy.buttonLabel}</Button>
        <Sheet open={open} title="장바구니에 담았어요" onClose={() => setOpen(false)}>
          <div className="ez:grid ez:gap-1">
            <span>{copy.productName}</span>
            <span className="ez:text-sm ez:text-muted">{copy.optionLabel}</span>
            <Price value={52000} list={58000} />
          </div>
          <div className="ez:grid ez:grid-cols-2 ez:gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              계속 쇼핑
            </Button>
            <ButtonLink href="/cart">장바구니 보기</ButtonLink>
          </div>
        </Sheet>
      </>
    );
  },
};
