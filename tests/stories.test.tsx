import { composeStories, setProjectAnnotations } from "@storybook/react";
import { render } from "@testing-library/react";
import type { ComponentType } from "react";
import { describe, expect, it } from "vitest";
import preview from "../.storybook/preview";
import * as core from "../src/core";
import * as root from "../src/index";
import { expectNoA11yViolations } from "./a11y";

setProjectAnnotations(preview);

type StoryModule = Parameters<typeof composeStories>[0];

const modules = import.meta.glob<StoryModule>("../src/**/*.stories.tsx", { eager: true });
const sources = import.meta.glob<string>("../src/**/*.stories.tsx", { eager: true, query: "?raw", import: "default" });

describe.each(Object.entries(modules))("%s", (_, mod) => {
  const stories = Object.entries(composeStories(mod)) as [string, ComponentType][];
  it.each(stories)("%s renders without a11y violations", async (_name, Story) => {
    render(<Story />);
    await expectNoA11yViolations(document.body);
  });
});

it("every component exported from the package has a story", () => {
  const covered = new Set(
    Object.values(sources).flatMap((code) =>
      [...code.matchAll(/import \{([^}]+)\} from "\.\.?\/[^"]+"/g)].flatMap((m) => m[1].split(",").map((n) => n.trim())),
    ),
  );
  const components = Object.entries({ ...core, ...root })
    .filter(([name, value]) => /^[A-Z]/.test(name) && name !== "ThemeRoot" && typeof value === "function")
    .map(([name]) => name);
  expect(components.filter((name) => !covered.has(name))).toEqual([]);
});
