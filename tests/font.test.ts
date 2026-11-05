import { describe, expect, it } from "vitest";
import { applyTemplate, designVars, fontHref, resolveTemplate } from "../src/index";

const design = { font: { display: "Jua", body: "Noto Sans KR" } };

describe("store font", () => {
  it("reaches the page through the theme variables", () => {
    const vars = designVars(design);
    expect(vars["--ezd-font-display"]).toContain('"Jua"');
    expect(vars["--ezd-font-body"]).toContain('"Noto Sans KR"');
  });

  it("falls back to the system font", () => {
    expect(designVars({})["--ezd-font-display"]).toContain("Pretendard");
  });

  it("loads each family once", () => {
    const href = fontHref({ font: { display: "Noto Sans KR", body: "Noto Sans KR" } }) ?? "";
    expect(href.match(/family=/g)).toHaveLength(1);
  });

  it("loads nothing without a font", () => {
    expect(fontHref({})).toBeNull();
  });

  it("keeps the store font over the template default", () => {
    const serif = resolveTemplate("class", "b");
    expect(serif?.look.font).toBe("serif");
    expect(applyTemplate(design, serif).font?.display).toBe("Jua");
    expect(applyTemplate({}, serif).font?.display).toBe("Noto Serif KR");
  });
});
