import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import products from "../../../fixtures/products.json";
import { ProductGrid } from "./product-grid";

const meta: Meta<typeof ProductGrid> = { title: "blocks/product-grid", component: ProductGrid, decorators: [padded] };
export default meta;
type Story = StoryObj<typeof ProductGrid>;

export const Default: Story = { args: { products, eager: 2 } };
export const Empty: Story = { args: { products: [] } };
