import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import products from "../../__stories__/fixtures/products.json";
import { ProductGrid } from "../../index";

const meta: Meta<typeof ProductGrid> = {
  title: "Blocks/ProductGrid",
  component: ProductGrid,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return <ProductGrid products={products} eager={2} />;
}

function FitExample() {
  return <ProductGrid products={products.slice(0, 3)} grid={{ m: 2, pc: 4, ratio: 1 }} fit />;
}

function EmptyExample() {
  return <ProductGrid products={[]} emptyHref="/products" />;
}

export const Default: StoryObj = { render: () => <DefaultExample /> };

export const Fit: StoryObj = { render: () => <FitExample /> };

export const Empty: StoryObj = { render: () => <EmptyExample /> };
