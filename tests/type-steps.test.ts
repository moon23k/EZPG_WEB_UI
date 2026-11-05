import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const OFF_SCALE = /ez:(?:md:|max-md:)?text-(?:xs|sm|base|lg|xl|[2-9]xl|\[\d)/g;

function sources(dir: string): string[] {
  return readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".tsx") && !file.endsWith(".stories.tsx"))
    .map((file) => join(dir, file));
}

describe("home type steps", () => {
  const files = [...sources("src/sections"), "src/blocks/product-card/product-card.tsx"];

  it.each(files)("%s uses only site type steps", (file) => {
    expect(readFileSync(file, "utf8").match(OFF_SCALE) ?? []).toEqual([]);
  });
});
