import { describe, expect, it } from "vitest";
import * as pkg from "../src/index";

describe("package entry", () => {
  it("exposes the theme and renderer entry points", () => {
    expect(typeof pkg.ThemeRoot).toBe("function");
    expect(typeof pkg.SiteRenderer).toBe("function");
    expect(typeof pkg.designVars).toBe("function");
  });

  it("exports no undefined bindings", () => {
    const missing = Object.entries(pkg).filter(([, value]) => value === undefined).map(([name]) => name);
    expect(missing).toEqual([]);
  });
});
