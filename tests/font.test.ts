import { readFileSync } from "node:fs";
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

  it("requests only the weights the set ships", () => {
    const href = fontHref({
      font: {
        display: "Sunflower",
        body: "Noto Sans KR",
        load: [
          { family: "Sunflower", weights: [500, 700] },
          { family: "Noto Sans KR", weights: [400, 700] },
        ],
      },
    });
    expect(href).toContain("family=Sunflower:wght@500;700");
    expect(href).toContain("family=Noto%20Sans%20KR:wght@400;700");
  });

  it("requests nothing for the bundled set", () => {
    expect(fontHref({ font: { display: "Pretendard", body: "Pretendard", load: [] } })).toBeNull();
  });

  it("carries bold and italic per level", () => {
    const vars = designVars({
      font: {
        styles: {
          title: { weight: 400, style: "italic" },
          subtitle: { weight: 600, style: "normal" },
          body: { weight: 700, style: "italic" },
        },
      },
    });
    expect(vars["--ezd-title-weight"]).toBe("400");
    expect(vars["--ezd-display-weight"]).toBe("400");
    expect(vars["--ezd-title-style"]).toBe("italic");
    expect(vars["--ezd-subtitle-style"]).toBe("normal");
    expect(vars["--ezd-body-weight"]).toBe("700");
  });

  it("keeps controls and figures upright", () => {
    const css = readFileSync("src/styles/legacy.css", "utf8");
    const upright = css.slice(0, css.indexOf("font-style: normal;"));
    for (const slot of ["site-header", "site-footer", "button"]) expect(upright).toContain(`[data-slot="${slot}"]`);
    expect(css).toMatch(/text-site-figure"\], \[class\*="tabular-nums"\]\) \{\s+font-style: normal;/);
  });

  it("defaults to the fixed hierarchy", () => {
    const vars = designVars({});
    expect([vars["--ezd-title-weight"], vars["--ezd-subtitle-weight"], vars["--ezd-body-weight"]]).toEqual(["700", "600", "400"]);
    expect(vars["--ezd-body-style"]).toBe("normal");
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
