import { render } from "@testing-library/vue";
import { describe, expect, it } from "vitest";

import { Search } from "./index";

describe("vue icons", () => {
  it("renders an svg element", () => {
    const { container } = render(Search);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("passes variant and color to the generated svg", () => {
    const { container } = render(Search, {
      props: {
        variant: "bold",
        color: "#ff6b35",
      },
    });

    expect(container.innerHTML).toContain("#ff6b35");
  });
});
