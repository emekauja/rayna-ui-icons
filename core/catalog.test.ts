import { describe, expect, it } from "vitest";

import { iconCatalog, iconMap } from "./src";

describe("icon catalog", () => {
  it("normalizes icon names uniquely", () => {
    const names = iconCatalog.map((icon) => icon.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("keeps both linear and bold variants for each icon", () => {
    for (const icon of iconCatalog) {
      expect(icon.variants.linear.body.length).toBeGreaterThan(0);
      expect(icon.variants.bold.body.length).toBeGreaterThan(0);
    }
  });

  it("keeps raw aliases searchable", () => {
    expect(iconMap.AlignRight.aliases).toContain("align-left-1");
    expect(iconMap.Search.aliases).toContain("search");
  });
});
