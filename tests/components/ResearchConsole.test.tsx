import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ResearchConsole } from "../../src/components/shell/ResearchConsole";

describe("ResearchConsole", () => {
  it("provides navigation, verification context, locale counterpart, and one main landmark", () => {
    render(<ResearchConsole locale="tr" currentRoute="home" currentPath="/tr?stage=world-model" lastVerified="2026-09-01"><h1>İçerik</h1></ResearchConsole>);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getByRole("navigation", { name: "Ana gezinme" })).toBeInTheDocument();
    expect(screen.getByText(/1 Eyl 2026/)).toBeVisible();
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en?stage=world-model");
    expect(screen.getByRole("link", { current: "page" })).toHaveTextContent("Alan Haritası");
    expect(screen.getByRole("link", { name: "Ana içeriğe geç" })).toHaveAttribute("href", "#main-content");
  });

  it("returns focus after closing mobile navigation", async () => {
    const user = userEvent.setup();
    render(<ResearchConsole locale="en" currentRoute="home" currentPath="/en" lastVerified="2026-09-01"><h1>Content</h1></ResearchConsole>);
    const trigger = screen.getByRole("button", { name: "Open navigation" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Navigation" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Close navigation" }));
    expect(trigger).toHaveFocus();
  });
});
