import type { Preview } from "@storybook/nextjs-vite";
import "./storybook.css";
import { ThemeRoot } from "../src/theme/theme-root";
import type { Design } from "../src/types";
import serifRounded from "../fixtures/themes/serif-rounded.json";
import handPill from "../fixtures/themes/hand-pill.json";
import boldSquare from "../fixtures/themes/bold-square.json";
import normal from "../fixtures/copy/normal.json";
import longest from "../fixtures/copy/longest.json";

const themes: Record<string, Design | null> = {
  default: null,
  "serif-rounded": serifRounded as Design,
  "hand-pill": handPill as Design,
  "bold-square": boldSquare as Design,
};

const copies = { normal, longest };

export type Copy = typeof normal;

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "상점 테마",
      toolbar: { title: "테마", icon: "paintbrush", items: Object.keys(themes), dynamicTitle: true },
    },
    copy: {
      description: "문구 길이",
      toolbar: { title: "문구", icon: "document", items: ["normal", "longest"], dynamicTitle: true },
    },
  },
  initialGlobals: {
    theme: "default",
    copy: "normal",
    viewport: { value: "mobile", isRotated: false },
  },
  loaders: [async ({ globals }) => ({ copy: copies[globals.copy as keyof typeof copies] ?? normal })],
  decorators: [
    (Story, { globals }) => (
      <ThemeRoot design={themes[globals.theme as string] ?? null}>
        <Story />
      </ThemeRoot>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    viewport: {
      options: {
        mobile: { name: "375", styles: { width: "375px", height: "760px" } },
        tablet: { name: "768", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "1280", styles: { width: "1280px", height: "860px" } },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: "error" },
  },
};

export default preview;
