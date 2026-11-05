import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { templates } from "../src/index";

const frame = JSON.parse(readFileSync("../EZPG/contracts/rules/frame.json", "utf8")) as {
  mains: Record<string, { home: Record<string, string[]> }>;
};

describe("template slots", () => {
  const list = Object.entries(templates).flatMap(([main, items]) => items.map((t) => [t.id, main, t] as const));

  it.each(list)("%s matches the frame rule", (_, main, template) => {
    expect(frame.mains[main].home[template.letter]).toEqual(template.home.map((slot) => slot.kind));
  });
});
