import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FieldMap } from "../../src/components/map/FieldMap";

describe("FieldMap", () => {
  it("renders seven stages and explains that the sequence is not mandatory", () => {
    render(<FieldMap locale="en" selectedId="world-model" onSelect={() => undefined} />);
    expect(screen.getAllByTestId("primary-stage")).toHaveLength(7);
    expect(screen.getByText(/reading path, not a mandatory architecture/i)).toBeVisible();
    expect(screen.getByText(/feeds back to/i)).toBeInTheDocument();
  });

  it("supports pointer and keyboard selection", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<FieldMap locale="en" selectedId="world-model" onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "Planner" }));
    expect(onSelect).toHaveBeenCalledWith("planner");
    const worldModel = screen.getByRole("button", { name: "World Model" });
    worldModel.focus();
    fireEvent.keyDown(worldModel, { key: "ArrowRight" });
    const planner = screen.getAllByRole("button", { name: "Planner" })[0]!;
    expect(planner).toHaveFocus();
    fireEvent.keyDown(planner, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("planner");
  });
});
