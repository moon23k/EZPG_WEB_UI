import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { resolveTemplate, SiteRenderer } from "../src/index";
import type { TemplateMain } from "../src/templates/types";

const context = { products: [], categories: [], faqs: [], shipping: null, flags: {} };
const designs: [TemplateMain, string][] = [
  ["shop", "a"],
  ["shop", "b"],
  ["shop", "c"],
  ["shop", "d"],
  ["class", "a"],
  ["class", "b"],
  ["class", "c"],
  ["stay", "a"],
  ["stay", "b"],
  ["stay", "c"],
  ["quote", "a"],
  ["quote", "b"],
  ["quote", "c"],
  ["quote", "d"],
];

function page(main: TemplateMain, letter: string, arranged = false) {
  const template = resolveTemplate(main, letter);
  const { container } = render(<SiteRenderer page={{ sections: [], arranged }} context={context} template={template} />);
  return { template, root: container.querySelector('[data-slot="site-renderer"]') as HTMLElement };
}

describe.each(designs)("blank %s %s", (main, letter) => {
  it("keeps every template section on screen", () => {
    const { template, root } = page(main, letter);
    expect(root.children.length).toBe(template!.home.length);
  });

  it("marks every blank section so the partner preview can jump to its input", () => {
    const { template, root } = page(main, letter);
    const missing = template!.home
      .map((slot) => slot.kind)
      .filter((kind) => !["search_bar"].includes(kind))
      .filter((kind) => !root.querySelector(`[data-blank][data-slot="${kind.replace(/_/g, "-")}"]`));
    expect(missing).toEqual([]);
  });

  it("invents no prices, ratings or figures", () => {
    const { root } = page(main, letter);
    root.querySelector('[data-slot="process-steps"]')?.remove();
    const text = root.textContent ?? "";
    expect(text).not.toMatch(/\d[\d,]*원|\d{2,}|\d\.\d|★/);
  });

  it("lays blank cards out in several columns", () => {
    const { root } = page(main, letter);
    const stacked = [...root.querySelectorAll('[class*="ez:gap-gutter"]')].filter((grid) => grid.children.length > 1 && grid.className.includes("ez:md:grid-cols-1"));
    expect(stacked).toHaveLength(0);
  });

  it("offers nothing to click or buy", () => {
    const { root } = page(main, letter);
    expect(root.querySelectorAll("a")).toHaveLength(0);
    expect(root.querySelectorAll("button:not(form button)")).toHaveLength(0);
  });
});

describe("blank scope", () => {
  it("leaves a partner arranged page alone", () => {
    expect(page("stay", "a", true).root.children).toHaveLength(0);
  });

  it("stays hidden without a template", () => {
    const { container } = render(<SiteRenderer page={{ sections: [{ kind: "reviews", data: {} }] }} context={context} />);
    expect(container.querySelector('[data-slot="reviews"]')).not.toBeInTheDocument();
  });
});
