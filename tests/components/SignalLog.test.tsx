import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SignalLog } from "../../src/components/signals/SignalLog";
import { catalog } from "../../src/data/catalog";

describe("SignalLog", () => {
  it("shows approved changes in reverse chronology with separate dates", () => {
    const approvedCount = catalog.signals.filter(({ approved }) => approved).length;
    render(<SignalLog locale="en" />);
    expect(screen.getAllByTestId("signal")).toHaveLength(approvedCount);
    expect(screen.getAllByText("What changed")).toHaveLength(approvedCount);
    expect(screen.getAllByText(/Event date/)).toHaveLength(approvedCount);
    expect(screen.getAllByText(/Published/)).toHaveLength(approvedCount);
    expect(screen.getAllByRole("link", { name: /source/i })).toHaveLength(approvedCount);
  });
});
