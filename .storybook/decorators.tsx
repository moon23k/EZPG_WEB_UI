import type { Decorator } from "@storybook/nextjs-vite";

export const padded: Decorator = (Story) => (
  <div className="ez:flex ez:flex-col ez:items-start ez:gap-4 ez:p-page ez:py-6">
    <Story />
  </div>
);
