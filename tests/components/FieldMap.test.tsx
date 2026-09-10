import { fireEvent, render, screen, within } from "@testing-library/react";
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
    const { container } = render(<FieldMap locale="en" selectedId="world-model" onSelect={onSelect} />);
    const desktop = within(container.querySelector(".field-map__desktop") as HTMLElement);
    await user.click(desktop.getByRole("button", { name: "Planner" }));
    expect(onSelect).toHaveBeenCalledWith("planner");
    const worldModel = desktop.getByRole("button", { name: "World model" });
    worldModel.focus();
    fireEvent.keyDown(worldModel, { key: "ArrowRight" });
    const planner = desktop.getByRole("button", { name: "Planner" });
    expect(planner).toHaveFocus();
    onSelect.mockClear();
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith("planner");
  });
});
