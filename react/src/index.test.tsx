import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Search } from "./index";

describe("react icons", () => {
  it("renders the default variant", () => {
    const { container } = render(<Search />);
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.innerHTML).toContain("currentColor");
  });

  it("applies variant, size, and color props", () => {
    const { container } = render(
      <Search variant="bold" size={32} color="#ff6b35" />
    );
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("32");
    expect(container.innerHTML).toContain("#ff6b35");
  });
});
