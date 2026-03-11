import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@raynaui/icons-core", () => ({
  iconCatalog: [
    {
      name: "Search",
      pascalName: "Search",
      sourceName: "search",
      kebabName: "search",
      aliases: ["search"],
      searchText: "search",
      variants: {
        linear: { viewBox: "0 0 24 24", body: '<path fill="__ICON_COLOR__" d="M0 0" />' },
        bold: { viewBox: "0 0 24 24", body: '<path fill="__ICON_COLOR__" d="M0 0" />' },
      },
    },
    {
      name: "Wallet",
      pascalName: "Wallet",
      sourceName: "wallet",
      kebabName: "wallet",
      aliases: ["wallet"],
      searchText: "wallet",
      variants: {
        linear: { viewBox: "0 0 24 24", body: '<path fill="__ICON_COLOR__" d="M0 0" />' },
        bold: { viewBox: "0 0 24 24", body: '<path fill="__ICON_COLOR__" d="M0 0" />' },
      },
    },
    {
      name: "Palette",
      pascalName: "Palette",
      sourceName: "palette",
      kebabName: "palette",
      aliases: ["palette"],
      searchText: "palette",
      variants: {
        linear: { viewBox: "0 0 24 24", body: '<path fill="__ICON_COLOR__" d="M0 0" />' },
        bold: { viewBox: "0 0 24 24", body: '<path fill="__ICON_COLOR__" d="M0 0" />' },
      },
    },
    {
      name: "AiStars",
      pascalName: "AiStars",
      sourceName: "ai-stars",
      kebabName: "ai-stars",
      aliases: ["AI-stars"],
      searchText: "ai-stars",
      variants: {
        linear: { viewBox: "0 0 24 24", body: '<path fill="__ICON_COLOR__" d="M0 0" />' },
        bold: { viewBox: "0 0 24 24", body: '<path fill="__ICON_COLOR__" d="M0 0" />' },
      },
    },
    {
      name: "Bot",
      pascalName: "Bot",
      sourceName: "bot",
      kebabName: "bot",
      aliases: ["bot"],
      searchText: "bot",
      variants: {
        linear: { viewBox: "0 0 24 24", body: '<path fill="__ICON_COLOR__" d="M0 0" />' },
        bold: { viewBox: "0 0 24 24", body: '<path fill="__ICON_COLOR__" d="M0 0" />' },
      },
    },
  ],
}));

vi.mock("rayna-ui-icons/react", () => {
  const makeIcon = (name: string) => (props: Record<string, unknown>) =>
    React.createElement("svg", { "data-testid": name, ...props });

  return {
    Search: makeIcon("Search"),
    Wallet: makeIcon("Wallet"),
    Palette: makeIcon("Palette"),
    AiStars: makeIcon("AiStars"),
    Bot: makeIcon("Bot"),
  };
});

import { App } from "./App";

describe("homepage app", () => {
  it("filters icons by search term", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Search icons"), {
      target: { value: "wallet" },
    });

    expect(
      screen.getByRole("button", { name: /^Open Wallet$/i })
    ).not.toBeNull();
  });

  it("switches framework install copy", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("tab", { name: "Vue" }));

    expect(
      screen.getAllByText("pnpm add rayna-ui-icons vue").length
    ).toBeGreaterThan(0);
  });
});
