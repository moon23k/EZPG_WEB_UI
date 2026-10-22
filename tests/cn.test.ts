import { describe, expect, it } from "vitest";
import { cn } from "../src/utils/cn";

describe("cn", () => {
  it("lets a later ez: class replace an earlier one in the same group", () => {
    expect(cn("ez:rounded-md", "ez:rounded-button")).toBe("ez:rounded-button");
    expect(cn("ez:p-4", "ez:p-gutter")).toBe("ez:p-gutter");
    expect(cn("ez:bg-primary", "ez:bg-surface")).toBe("ez:bg-surface");
    expect(cn("ez:font-body", "ez:font-display")).toBe("ez:font-display");
  });

  it("keeps classes from different groups", () => {
    expect(cn("ez:text-sm", "ez:text-danger")).toBe("ez:text-sm ez:text-danger");
    expect(cn("ez:font-display", "ez:font-title")).toBe("ez:font-display ez:font-title");
  });

  it("drops falsy values and leaves unprefixed classes alone", () => {
    expect(cn("ez-btn", false, null, undefined, "mt-4")).toBe("ez-btn mt-4");
  });
});
