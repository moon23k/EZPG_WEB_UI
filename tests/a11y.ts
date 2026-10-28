import axe from "axe-core";
import { expect } from "vitest";

globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;

export async function expectNoA11yViolations(container: HTMLElement) {
  const { violations } = await axe.run(container, { rules: { "color-contrast": { enabled: false }, region: { enabled: false } } });
  expect(violations.map((v) => `${v.id}: ${v.nodes[0]?.html}`)).toEqual([]);
}
