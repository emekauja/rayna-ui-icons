import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Search } from "./index";

vi.mock("react-native-svg", () => ({
  SvgXml: (props: Record<string, unknown>) =>
    React.createElement("div", { "data-testid": "svg-xml", ...props }),
}));

describe("react native icons", () => {
  it("builds SvgXml output", () => {
    render(<Search variant="bold" size={32} color="#ff6b35" />);
    const icon = screen.getByTestId("svg-xml");

    expect(icon.getAttribute("xml")).toContain("#ff6b35");
    expect(icon.getAttribute("width")).toBe("32");
  });
});
