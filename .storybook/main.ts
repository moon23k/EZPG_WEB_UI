import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  core: { disableTelemetry: true },
  framework: { name: "@storybook/nextjs-vite", options: {} },
  refs: {
    "app-ui": { title: "app-ui (React Native)", url: "http://localhost:6007" },
  },
  viteFinal: (vite) => ({ ...vite, plugins: [...(vite.plugins ?? []), tailwindcss()] }),
};

export default config;
