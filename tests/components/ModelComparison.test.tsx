import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ModelComparison } from "../../src/components/models/ModelComparison";

describe("ModelComparison", () => {
  it("uses a semantic table and renders unknown without false zeroes", () => {
    render(<ModelComparison locale="tr" modelIds={["atlas", "v-jepa-2"]} />);
    const table = screen.getByRole("table", { name: "Model karşılaştırması" });
    expect(within(table).getAllByRole("columnheader")).toHaveLength(3);
    expect(within(table).getByRole("rowheader", { name: "Mekânsal / 3B" })).toBeVisible();
    expect(within(table).getAllByText("Bilinmiyor").length).toBeGreaterThan(0);
    expect(within(table).queryByText("0")).not.toBeInTheDocument();
  });
});
