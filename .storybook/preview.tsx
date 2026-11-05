import type { Decorator, Preview } from "@storybook/nextjs-vite";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "../src/styles/index.css";
import { ThemeRoot } from "../src/theme/theme-root";
import type { Design } from "../src/types";
import boldSquare from "./themes/bold-square.json";
import handPill from "./themes/hand-pill.json";
import serifRounded from "./themes/serif-rounded.json";

const themes: Record<string, Design | null> = {
  ezpg: null,
  "bold-square": boldSquare as Design,
  "hand-pill": handPill as Design,
  "serif-rounded": serifRounded as Design,
};

const withTheme: Decorator = (Story, { globals }) => (
  <ThemeRoot design={themes[globals.theme] ?? null}>
    <div style={{ padding: 16, background: "var(--ezd-surface)", color: "var(--ezd-text)", fontFamily: "var(--ezd-font-body)" }}>
      <Story />
    </div>
  </ThemeRoot>
);

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "상점 테마",
      toolbar: {
        title: "테마",
        icon: "paintbrush",
        items: [
          { value: "ezpg", title: "EZPG 기본" },
          { value: "bold-square", title: "bold-square" },
          { value: "hand-pill", title: "hand-pill" },
          { value: "serif-rounded", title: "serif-rounded" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "ezpg" },
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
    viewport: {
      options: {
        mobile: { name: "휴대폰 390", styles: { width: "390px", height: "844px" }, type: "mobile" },
        desktop: { name: "데스크톱 1440", styles: { width: "1440px", height: "900px" }, type: "desktop" },
      },
    },
  },
};

export default preview;
