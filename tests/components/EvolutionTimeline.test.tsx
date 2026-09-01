import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EvolutionTimeline } from "../../src/components/timeline/EvolutionTimeline";

describe("EvolutionTimeline", () => {
  it("renders milestones in chronological order with evidence links", () => {
    render(<EvolutionTimeline locale="en" />);
    const dates = screen.getAllByTestId("milestone-date").map((node) => node.getAttribute("dateTime"));
    expect(dates).toEqual([...dates].sort());
    expect(screen.getAllByRole("link", { name: /primary source/i }).length).toBeGreaterThan(0);
  });
});
