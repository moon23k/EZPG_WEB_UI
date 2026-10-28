import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import products from "../../__stories__/fixtures/products.json";
import { ProductCard } from "../../index";

const meta: Meta<typeof ProductCard> = {
  title: "Blocks/ProductCard",
  component: ProductCard,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return (
    <div className="ez:grid ez:max-w-md ez:grid-cols-2 ez:gap-gutter">
      <ProductCard product={products[2]} />
      <ProductCard product={products[0]} />
    </div>
  );
}

export const Default: StoryObj = { render: () => <DefaultExample /> };
