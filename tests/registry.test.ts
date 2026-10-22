import { describe, expect, it } from "vitest";
import manifest from "../manifest.json";
import { sections } from "../src/renderer/registry";

describe("section registry", () => {
  it("matches manifest.json (run `npm run manifest` after changing the registry)", () => {
    expect(manifest.kinds).toEqual(Object.keys(sections).sort());
  });
});
