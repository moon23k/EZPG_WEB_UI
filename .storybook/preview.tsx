import type { Decorator, Preview } from "@storybook/nextjs-vite";
import "../src/styles/index.css";
import { ThemeRoot } from "../src/theme/theme-root";

const withTheme: Decorator = (Story) => (
  <ThemeRoot design={null}>
    <div style={{ padding: 16, background: "var(--ezd-surface)", color: "var(--ezd-text)", fontFamily: "var(--ezd-font-body)" }}>
      <Story />
    </div>
  </ThemeRoot>
);

const preview: Preview = {
  decorators: [withTheme],
  parameters: { layout: "fullscreen", nextjs: { appDirectory: true } },
};

export default preview;
