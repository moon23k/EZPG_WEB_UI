import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CategoryChips } from "../../index";

const meta: Meta<typeof CategoryChips> = {
  title: "Sections/CategoryChips",
  component: CategoryChips,
  parameters: { layout: "padded" },
};
export default meta;

const categories = [
  { id: "c1", name: "셔츠" },
  { id: "c2", name: "니트" },
  { id: "c3", name: "소품" },
];

export const All: StoryObj = { render: () => <CategoryChips categories={categories} /> };

export const Selected: StoryObj = { render: () => <CategoryChips categories={categories} current="c2" /> };
