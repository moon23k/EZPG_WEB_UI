import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { blockedLine, cartLines } from "../../__stories__/fixtures/commerce";
import { CartLine } from "../../index";

const meta: Meta<typeof CartLine> = {
  title: "Blocks/CartLine",
  component: CartLine,
  parameters: { layout: "padded" },
};
export default meta;

async function update() {
  "use server";
}

function DefaultExample() {
  return (
    <ul className="ez:m-0 ez:list-none ez:p-0">
      <CartLine line={cartLines[0]} updateAction={update} removeAction={update} />
      <CartLine line={blockedLine} updateAction={update} removeAction={update} />
    </ul>
  );
}

export const Default: StoryObj = { render: () => <DefaultExample /> };
