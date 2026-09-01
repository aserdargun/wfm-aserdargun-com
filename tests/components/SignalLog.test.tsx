import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SignalLog } from "../../src/components/signals/SignalLog";

describe("SignalLog", () => {
  it("shows approved changes in reverse chronology with separate dates", () => {
    render(<SignalLog locale="en" />);
    expect(screen.getAllByTestId("signal")).toHaveLength(4);
    expect(screen.getAllByText("What changed")).toHaveLength(4);
    expect(screen.getAllByText(/Event date/)).toHaveLength(4);
    expect(screen.getAllByText(/Published/)).toHaveLength(4);
    expect(screen.getAllByRole("link", { name: /source/i })).toHaveLength(4);
  });
});
