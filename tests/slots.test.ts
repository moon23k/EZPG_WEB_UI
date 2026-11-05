import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { templates } from "../src/index";

const FRAME = "../EZPG/contracts/rules/frame.json";

describe.skipIf(!existsSync(FRAME))("template slots", () => {
  const list = Object.entries(templates).flatMap(([main, items]) => items.map((t) => [t.id, main, t] as const));

  it.each(list)("%s matches the frame rule", (_, main, template) => {
    const frame = JSON.parse(readFileSync(FRAME, "utf8")) as { mains: Record<string, { home: Record<string, string[]> }> };
    expect(frame.mains[main].home[template.letter]).toEqual(template.home.map((slot) => slot.kind));
  });
});
