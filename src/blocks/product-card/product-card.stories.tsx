import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import products from "../../../fixtures/products.json";
import { ProductCard } from "./product-card";

const meta: Meta<typeof ProductCard> = {
  title: "blocks/product-card",
  component: ProductCard,
  decorators: [(Story) => <div className="ez:w-44"><Story /></div>, padded],
};
export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = { args: { product: products[0] } };
export const SoldOut: Story = { args: { product: products[2] } };
