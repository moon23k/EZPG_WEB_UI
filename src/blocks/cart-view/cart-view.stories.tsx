import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { blockedLine, cartLines } from "../../__stories__/fixtures/commerce";
import { CartView } from "../../index";

const meta: Meta<typeof CartView> = {
  title: "Blocks/CartView",
  component: CartView,
  parameters: { layout: "padded" },
};
export default meta;

async function update() {
  "use server";
}

function BlockedExample() {
  return <CartView lines={[...cartLines, blockedLine]} itemsTotal={220000} updateAction={update} removeAction={update} />;
}

function DefaultExample() {
  return <CartView lines={cartLines} itemsTotal={136000} updateAction={update} removeAction={update} />;
}

function EmptyExample() {
  return <CartView lines={[]} itemsTotal={0} updateAction={update} removeAction={update} />;
}

export const Blocked: StoryObj = { render: () => <BlockedExample /> };

export const Default: StoryObj = { render: () => <DefaultExample /> };

export const Empty: StoryObj = { render: () => <EmptyExample /> };
