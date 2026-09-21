import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { catalog } from "../../src/data/catalog";
import { formatDate } from "../../src/app/format";
import { EvidenceInspector } from "../../src/components/evidence/EvidenceInspector";

describe("EvidenceInspector", () => {
  it("separates evidence status from verification state", () => {
    render(<EvidenceInspector locale="tr" entityId="world-model" />);
    expect(screen.getByRole("complementary", { name: "Kanıt inceleyici" })).toHaveTextContent("Dünya modeli");
    expect(screen.getByText("Gösterildi")).toBeVisible();
    expect(screen.getByText("Güncel")).toBeVisible();
    expect(screen.getByText(formatDate(catalog.sources.find(({ id }) => id === "source-world-models-2018")!.lastChecked, "tr"))).toBeVisible();
    expect(screen.getByRole("link", { name: /Dünya modeli birincil kaynağını aç/ })).toHaveAttribute("href", "https://arxiv.org/abs/1803.10122");
    expect(screen.getByRole("status")).toHaveTextContent("Dünya modeli seçildi");
  });
});
