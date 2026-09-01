# World Models Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and locally verify a public, bilingual, evidence-backed World Models Atlas with a Research Console interface, static prerendered routes, shareable exploration state, and a human-gated source discovery pipeline.

**Architecture:** A React + TypeScript + Vite frontend prerenders every public Turkish and English route, then hydrates interactive map, comparison, filter, and evidence-inspector state in the browser. Versioned catalog modules and paired locale content are validated before build; a separate Node scanner writes review candidates but cannot alter the public catalog.

**Tech Stack:** Node.js 22, npm, React, TypeScript, Vite, React Router, Zod, Vitest, Testing Library, Playwright, axe-core, accessible SVG, semantic HTML, CSS custom properties.

**Spec:** `docs/superpowers/specs/2026-09-01-world-models-atlas-design.md`

## Global Constraints

- Public routes exist under `/tr` and `/en` with complete content parity.
- The opening narrative is `LLM → VLM → World Model → Planner → Agent → Physical AI → Digital Twin`, but production data uses typed relationships and never claims the chain is mandatory or linear.
- Published factual claims require primary-source evidence and expose both evidence status and verification state.
- Unknown values remain `unknown`; no aggregate leaderboard or fabricated maturity score is allowed.
- The source scanner may create review candidates only; it must never edit public data, commit, push, notify, or deploy.
- Every public route is prerendered at build time and hydrates for interactive behavior.
- Essential content and evidence links remain readable without animation and before hydration.
- Desktop, mobile portrait, keyboard, reduced-motion, 200% zoom, and long Turkish-copy states are first-class acceptance surfaces.
- No commit, push, deployment, hosted scheduler, notification, DNS change, or publication without separate explicit authorization.

## File and Responsibility Map

### Project and build

- `package.json`: dependencies and Setup/Run/Validate/Stop scripts.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: strict TypeScript boundaries.
- `vite.config.ts`: React build and test configuration.
- `playwright.config.ts`: local browser acceptance configuration.
- `index.html`: Vite document shell.
- `scripts/prerender.mjs`: render the route manifest into static HTML after Vite build.
- `scripts/preview-control.mjs`: start, report, and ownership-safely stop the local preview.

### Catalog and localization

- `src/data/types.ts`: canonical entity, claim, evidence, relation, and locale types.
- `src/data/schema.ts`: Zod schemas matching the canonical types.
- `src/data/catalog/sources.ts`: primary-source registry.
- `src/data/catalog/claims.ts`: atomic public claims and evidence links.
- `src/data/catalog/concepts.ts`: technology stages and supporting concepts.
- `src/data/catalog/models.ts`: the initial eight model profiles.
- `src/data/catalog/timeline.ts`: milestones from 2018 onward.
- `src/data/catalog/signals.ts`: approved recent changes.
- `src/data/locales/en.ts`, `src/data/locales/tr.ts`: paired visible content keyed by stable ids.
- `src/data/catalog.ts`: assembled immutable catalog.
- `src/data/validate.ts`: cross-entity, source, approval, date, and locale validation.
- `src/data/derived.ts`: route manifest, indexes, comparison rows, and source lookups.

### Application and routes

- `src/main.tsx`: browser hydration entry.
- `src/entry-server.tsx`: static render entry used by prerendering.
- `src/app/App.tsx`: application composition and route tree.
- `src/app/routes.ts`: canonical locale route definitions and route manifest.
- `src/app/url-state.ts`: parse and serialize selected entity, filters, and compare ids.
- `src/app/locale.ts`: locale parsing and counterpart-route resolution.
- `src/components/shell/ResearchConsole.tsx`: top bar, navigation, main workspace, evidence panel.
- `src/components/shell/TopUtilityBar.tsx`: verification, source policy, and language controls.
- `src/components/shell/SidebarNav.tsx`: desktop navigation and current-route state.
- `src/components/shell/MobileNav.tsx`: accessible compact navigation.
- `src/components/map/FieldMap.tsx`: typed SVG/DOM technology map.
- `src/components/map/FieldMapTextAlternative.tsx`: ordered text equivalent and mobile learning path.
- `src/components/evidence/EvidenceInspector.tsx`: selected claim/model evidence detail.
- `src/components/evidence/EvidenceToken.tsx`: labeled evidence and verification states.
- `src/components/models/ModelFilters.tsx`: shareable model filters.
- `src/components/models/ModelComparison.tsx`: semantic comparison matrix.
- `src/components/timeline/EvolutionTimeline.tsx`: chronological milestone view.
- `src/components/signals/SignalLog.tsx`: approved changes and affected entities.
- `src/pages/HomePage.tsx`, `ConceptIndexPage.tsx`, `ConceptPage.tsx`, `ModelIndexPage.tsx`, `ModelPage.tsx`, `EvolutionPage.tsx`, `SignalsPage.tsx`, `MethodPage.tsx`, `NotFoundPage.tsx`: route-level reading experiences.

### Visual system

- `src/styles/tokens.css`: approved color, typography, spacing, focus, border, elevation, and motion tokens.
- `src/styles/global.css`: reset, document defaults, accessibility utilities, and responsive shell.
- `src/styles/components.css`: shared console, map, table, timeline, drawer, and state styles.
- `public/fonts/`: only locally licensed font files selected by the accepted Image Gen concept; otherwise use the documented system stack.
- `docs/design/world-models-atlas/`: accepted desktop/mobile concept images and fidelity ledger.

### Research scanning

- `research/sources.json`: scanner endpoints and expected entity mappings.
- `research/inbox/.gitkeep`: non-public candidate output directory marker.
- `scripts/research/scan.mjs`: fetch, fingerprint, normalize, diff, and write candidates.
- `scripts/research/lib/fetch-source.mjs`: bounded fetch behavior and timeout handling.
- `scripts/research/lib/fingerprint.mjs`: normalized SHA-256 fingerprints.
- `scripts/research/lib/candidate.mjs`: stable candidate schema and duplicate suppression.
- `tests/fixtures/research/`: deterministic official-source response fixtures.

### Tests

- `tests/helpers/catalog-fixture.ts`: isolated valid catalog factory for mutation tests.
- `tests/data/catalog-contract.test.ts`: schema and derived-index contract against the isolated fixture.
- `tests/data/catalog.test.ts`: published seed catalog and derived indexes.
- `tests/data/catalog-mutations.test.ts`: fail-closed malformed data fixtures.
- `tests/app/locale.test.ts`, `url-state.test.ts`, `prerender.test.ts`: navigation and static route contracts.
- `tests/components/FieldMap.test.tsx`, `EvidenceInspector.test.tsx`, `ModelComparison.test.tsx`: interaction and semantics.
- `tests/research/scan.test.ts`: deterministic candidate generation and failure behavior.
- `tests/e2e/atlas.spec.ts`: desktop/mobile core journeys.
- `tests/e2e/accessibility.spec.ts`: keyboard, reduced motion, zoom, and axe checks.

---

### Task 1: Produce and Approve the Production Visual Concepts

**Files:**
- Create: `docs/design/world-models-atlas/research-console-desktop.png`
- Create: `docs/design/world-models-atlas/research-console-mobile.png`
- Create: `docs/design/world-models-atlas/design-contract.md`

**Interfaces:**
- Consumes: approved wireframe `.superpowers/brainstorm/65862-1788285281/content/research-console-anatomy.html` and Sections 5–7 of the spec.
- Produces: accepted desktop/mobile concept paths and an exact design-token/component inventory used by Tasks 6–11.

- [ ] **Step 1: Generate the full desktop concept with Image Gen**

Generate a 1440×1000 Research Console screen containing the top utility bar, two-level left navigation, center technology map, selected World Model state, current-change rows, and right evidence inspector. Require real labels from the spec, near-black neutral surfaces, phosphor-lime interaction accent, amber reported-status token, readable sans/monospace hierarchy, code-native UI text, no decorative metrics, no gradients used as atmosphere, and no unrequested cards or badges.

- [ ] **Step 2: Inspect the desktop image**

Use `view_image` at original detail. Reject clipped labels, unreadable metadata, generic sci-fi decoration, color-only evidence states, unexplained bars, inconsistent icons, or incomplete downstream regions. Regenerate until the whole primary surface is readable and implementable.

- [ ] **Step 3: Generate the matching mobile concept**

Generate a 390×844 sibling state using the same tokens. Require a vertical learning path, compact navigation, selected-stage explanation, evidence disclosure, and visible source/verification state without hover.

- [ ] **Step 4: Inspect the mobile image**

Use `view_image` at original detail. Reject horizontal overflow, clipped Turkish-capable controls, small tap targets, hidden evidence, or a card-grid reinterpretation of the desktop map.

- [ ] **Step 5: Write the design contract**

Record exact visible copy, allowed first-viewport labels, sampled color values, type scale, font stack, spacing scale, radii, borders, icon inventory, container anatomy, evidence-token shapes, map geometry, desktop/mobile transformation, motion timing, and reduced-motion behavior in `docs/design/world-models-atlas/design-contract.md`.

- [ ] **Step 6: Obtain concept approval before code**

Show both concepts to the user. Coding begins only after the images and design contract are approved. Preserve any requested revision in new concept files rather than silently changing the accepted images.

- [ ] **Step 7: Review checkpoint**

Run:

```bash
test -s docs/design/world-models-atlas/research-console-desktop.png
test -s docs/design/world-models-atlas/research-console-mobile.png
rg -n "copy|color|type|spacing|icon|mobile|motion" docs/design/world-models-atlas/design-contract.md
```

Expected: both image files are non-empty and the contract covers every required inventory category. Do not commit without separate authorization.

---

### Task 2: Establish the Toolchain and Failing Acceptance Harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `playwright.config.ts`
- Create: `index.html`
- Create: `src/vite-env.d.ts`
- Create: `tests/setup.ts`
- Create: `tests/data/catalog-contract.test.ts`
- Create: `tests/e2e/atlas.spec.ts`

**Interfaces:**
- Consumes: Node.js `>=22.0.0` and the accepted design contract from Task 1.
- Produces: `npm run dev`, `build`, `preview`, `test`, `test:e2e`, `validate`, and `stop`; Vitest and Playwright test discovery.

- [ ] **Step 1: Write the package contract**

Create scripts with these exact responsibilities:

```json
{
  "scripts": {
    "dev": "node scripts/preview-control.mjs start --mode dev",
    "build": "tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs",
    "preview": "node scripts/preview-control.mjs start --mode preview",
    "stop": "node scripts/preview-control.mjs stop",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "research:scan": "node scripts/research/scan.mjs",
    "validate": "npm run test && npm run build && npm run test:e2e"
  },
  "engines": { "node": ">=22.0.0" }
}
```

Install only the production and development dependencies required by the declared stack. Resolve current compatible versions from official package documentation before installation and preserve the generated lockfile.

- [ ] **Step 2: Write the first failing dataset test**

Create `tests/data/catalog-contract.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { validateCatalog } from "../../src/data/validate";
import { makeValidCatalog } from "../helpers/catalog-fixture";

describe("catalog contract", () => {
  it("accepts a valid bilingual fixture", () => {
    const catalog = makeValidCatalog();
    expect(validateCatalog(catalog)).toEqual([]);
    expect(Object.keys(catalog.locales)).toEqual(["en", "tr"]);
  });
});
```

- [ ] **Step 3: Write the first failing browser test**

Create `tests/e2e/atlas.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("opens the Turkish field map and selects World Model", async ({ page }) => {
  await page.goto("/tr");
  await expect(page.getByRole("heading", { name: "Dilden fiziksel zekâya" })).toBeVisible();
  await page.getByRole("button", { name: "World Model" }).click();
  await expect(page.getByRole("complementary", { name: "Kanıt inceleyici" })).toContainText("Dünya modeli");
});
```

- [ ] **Step 4: Run tests and confirm the harness fails for missing implementation**

Run:

```bash
npm test -- tests/data/catalog-contract.test.ts
npm run test:e2e -- tests/e2e/atlas.spec.ts
```

Expected: dataset import failure and browser connection/page failure, proving both harnesses are active.

- [ ] **Step 5: Add strict TypeScript and test configuration**

Enable `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noFallthroughCasesInSwitch`, and `noEmit` for application type checking. Configure Vitest for `jsdom`, `tests/setup.ts`, and `tests/**/*.test.{ts,tsx}`. Configure Playwright with Chromium, `baseURL: http://127.0.0.1:4173`, a web server running `npm run preview`, retries `0` locally, trace on first retry, and desktop plus 390×844 projects.

- [ ] **Step 6: Review checkpoint**

Run `npm install`, `npm exec vite -- --version`, `npm exec vitest -- --version`, and `npm exec playwright -- --version`. Record the resolved versions in the lockfile and plan execution notes. Do not commit without separate authorization.

---

### Task 3: Define Catalog Contracts and Fail-Closed Validation

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/schema.ts`
- Create: `src/data/catalog.ts`
- Create: `src/data/validate.ts`
- Create: `src/data/derived.ts`
- Create: `tests/helpers/catalog-fixture.ts`
- Modify: `tests/data/catalog-contract.test.ts`
- Create: `tests/data/catalog-mutations.test.ts`

**Interfaces:**
- Consumes: Zod and Vitest from Task 2.
- Produces: `Catalog`, `validateCatalog(catalog): CatalogIssue[]`, `assertValidCatalog(catalog): Catalog`, `deriveCatalog(catalog): DerivedCatalog`, and exact stable ids used by all UI tasks.

- [ ] **Step 1: Write mutation tests before schemas**

Cover these exact failures in `tests/data/catalog-mutations.test.ts`:

```ts
expect(issueCodes(withoutClaimEvidence)).toContain("CLAIM_EVIDENCE_REQUIRED");
expect(issueCodes(withMissingTurkishLabel)).toContain("LOCALE_PARITY");
expect(issueCodes(withDuplicateModelId)).toContain("DUPLICATE_ID");
expect(issueCodes(withUnknownRelationTarget)).toContain("ORPHAN_RELATION");
expect(issueCodes(withInferredClaimWithoutRationale)).toContain("RATIONALE_REQUIRED");
expect(issueCodes(withUnapprovedPublicSignal)).toContain("SIGNAL_NOT_APPROVED");
expect(issueCodes(withInvalidDate)).toContain("INVALID_DATE");
expect(issueCodes(withUnknownNumericScore)).toContain("FALSE_COMPARABILITY");
```

Use a `makeValidCatalog()` fixture that returns a fresh deep copy for each mutation.

- [ ] **Step 2: Run mutation tests and verify failure**

Run `npm test -- tests/data/catalog-mutations.test.ts`.

Expected: FAIL because catalog types, fixtures, and validation functions do not exist.

- [ ] **Step 3: Define canonical types**

Define these unions and boundaries in `src/data/types.ts`:

```ts
export type Locale = "en" | "tr";
export type EntityKind = "concept" | "model" | "milestone" | "signal";
export type EvidenceStatus = "demonstrated" | "reported" | "inferred" | "editorial-synthesis";
export type VerificationState = "current" | "stale" | "needs-review" | "withdrawn";
export type Availability = "open-weights" | "open-code" | "api" | "limited-preview" | "closed" | "unknown";
export type RelationKind = "precedes" | "informs" | "predicts" | "plans-with" | "acts-through" | "feeds-back-to" | "alternative-to" | "contains";

export interface CatalogIssue {
  code:
    | "CLAIM_EVIDENCE_REQUIRED"
    | "LOCALE_PARITY"
    | "DUPLICATE_ID"
    | "ORPHAN_RELATION"
    | "RATIONALE_REQUIRED"
    | "SIGNAL_NOT_APPROVED"
    | "INVALID_DATE"
    | "FALSE_COMPARABILITY"
    | "SCHEMA_INVALID";
  path: string;
  message: string;
}
```

Define `Source`, `Evidence`, `Claim`, `Concept`, `Model`, `Milestone`, `Signal`, `Relation`, `LocaleContent`, and `Catalog` exactly once in this file. Optional capability values use `boolean | "unknown"`; numeric measures use `{ value: number; unit: string; denominator?: string } | "unknown"`.

- [ ] **Step 4: Implement schema and cross-entity validation**

Use Zod for field-level parsing. Implement cross-entity checks in `validateCatalog` without throwing so tests can assert all failures at once. `assertValidCatalog` throws one `AggregateError` containing every formatted issue. Verify ISO dates by parse plus round-trip, not by regex alone.

- [ ] **Step 5: Implement derived indexes**

`deriveCatalog` returns immutable maps keyed by id, relations grouped by source and target, claims grouped by entity, evidence grouped by claim, locale counterpart slugs, comparison rows, and a sorted route manifest. It must call `assertValidCatalog` before deriving anything.

- [ ] **Step 6: Run focused tests**

Run:

```bash
npm test -- tests/data/catalog-contract.test.ts tests/data/catalog-mutations.test.ts
```

Expected: all schema and mutation tests pass.

- [ ] **Step 7: Review checkpoint**

Run `npm exec tsc -- --noEmit` and `git diff --check`. Do not commit without separate authorization.

---

### Task 4: Seed the Bilingual Evidence Catalog

**Files:**
- Create: `src/data/catalog/sources.ts`
- Create: `src/data/catalog/claims.ts`
- Create: `src/data/catalog/concepts.ts`
- Create: `src/data/catalog/models.ts`
- Create: `src/data/catalog/timeline.ts`
- Create: `src/data/catalog/signals.ts`
- Create: `src/data/locales/en.ts`
- Create: `src/data/locales/tr.ts`
- Modify: `src/data/catalog.ts`
- Create: `tests/data/catalog.test.ts`

**Interfaces:**
- Consumes: catalog types and validation from Task 3; primary sources identified in the approved research.
- Produces: a valid catalog containing both locales, the seven opening stages, supporting concepts, eight initial models, timeline milestones, approved signals, atomic claims, and canonical primary-source evidence.

- [ ] **Step 1: Expand acceptance tests for the seed**

Assert exact stable ids and coverage:

```ts
expect(catalog.models.map(({ id }) => id)).toEqual([
  "dreamer-v3",
  "v-jepa-2",
  "genie-3",
  "cosmos-3",
  "atlas",
  "gwm-1",
  "waymo-world-model",
  "gaia-3"
]);
expect(catalog.concepts.map(({ id }) => id)).toEqual(expect.arrayContaining([
  "llm", "vlm", "world-model", "planner", "agent", "physical-ai", "digital-twin",
  "latent-state", "action-conditioning", "uncertainty", "sim-to-real"
]));
expect(catalog.sources.every(({ url }) => url.startsWith("https://"))).toBe(true);
```

Add a parity loop asserting every public entity id has `en` and `tr` title, summary, and slug fields.

- [ ] **Step 2: Run seed tests and verify failure**

Run `npm test -- tests/data/catalog.test.ts`.

Expected: FAIL because the catalog is empty.

- [ ] **Step 3: Add canonical primary sources**

Include the 2018 World Models paper, DreamerV3 paper, Meta V-JEPA 2 research page and paper, DeepMind Genie 3 announcement, NVIDIA Cosmos 3 paper/repository, World Labs Atlas page, Runway GWM-1 research page, Waymo World Model page, and Wayve GAIA-3 page. Store canonical URLs without tracking parameters, publication dates, source types, expected entities, and last-checked `2026-09-01`.

- [ ] **Step 4: Add atomic claims and explicit statuses**

Each capability statement must be an individual claim. Examples:

```ts
{
  id: "claim-vjepa2-action-conditioned-planning",
  subjectId: "v-jepa-2",
  field: "planning",
  evidenceIds: ["evidence-meta-vjepa2-paper"],
  evidenceStatus: "demonstrated",
  verificationState: "current"
}
```

```ts
{
  id: "claim-atlas-1440p-minute-video",
  subjectId: "atlas",
  field: "video-output",
  evidenceIds: ["evidence-worldlabs-atlas"],
  evidenceStatus: "reported",
  verificationState: "current"
}
```

Do not convert company-reported capabilities into independent validation.

- [ ] **Step 5: Add concepts, models, timeline, and signals**

Use typed relations for the map. The field-map order is a reading sequence, while feedback relations explicitly connect `digital-twin` or physical observations back to `world-model`. Timeline items include 2018 World Models, PlaNet/Dreamer lineage, MuZero, Genie, GameNGen/DIAMOND, V-JEPA 2, Genie 3, Cosmos 3, Waymo World Model, GWM-1, and Atlas where primary-source evidence is present.

- [ ] **Step 6: Add paired Turkish and English content**

Write concise, original explanations. Keep claims aligned by stable id and preserve differences in natural phrasing rather than literal translation. The Turkish H1 is `Dilden fiziksel zekâya`; the English H1 is `From language to physical intelligence`.

- [ ] **Step 7: Validate all content**

Run:

```bash
npm test -- tests/data/catalog.test.ts tests/data/catalog-mutations.test.ts
npm exec tsc -- --noEmit
```

Expected: all data tests and type checks pass with exactly eight initial models and no locale gaps.

- [ ] **Step 8: Review checkpoint**

Inspect every `reported`, `inferred`, and `editorial-synthesis` claim for correct status and rationale. Run `git diff --check`. Do not commit without separate authorization.

---

### Task 5: Implement Locale Routing, URL State, and Static Prerendering

**Files:**
- Create: `src/app/routes.ts`
- Create: `src/app/locale.ts`
- Create: `src/app/url-state.ts`
- Create: `src/app/App.tsx`
- Create: `src/main.tsx`
- Create: `src/entry-server.tsx`
- Create: `scripts/prerender.mjs`
- Create: `scripts/preview-control.mjs`
- Create: `tests/app/locale.test.ts`
- Create: `tests/app/url-state.test.ts`
- Create: `tests/app/prerender.test.ts`
- Create: `src/pages/NotFoundPage.tsx`

**Interfaces:**
- Consumes: `DerivedCatalog` and locale slugs from Task 4.
- Produces: `getRouteManifest(): RouteRecord[]`, `parseAtlasUrl(url): AtlasUrlState`, `serializeAtlasUrl(state): string`, `getLocaleCounterpart(path, locale): string`, browser hydration, server render, and static route files.

- [ ] **Step 1: Write locale and URL-state tests**

Cover locale counterparts, invalid locale fallback, deduplicated compare ids, stable filter sorting, selected entity preservation, and back-button-safe query strings:

```ts
expect(getLocaleCounterpart("/tr/models/atlas?family=spatial", "en"))
  .toBe("/en/models/atlas?family=spatial");

expect(parseAtlasUrl(new URL("https://atlas.test/en/models?compare=atlas,v-jepa-2,atlas")))
  .toMatchObject({ locale: "en", compare: ["atlas", "v-jepa-2"] });
```

Write `tests/app/prerender.test.ts` to expect `dist/tr/index.html`, `dist/en/index.html`, model detail routes, and `<html lang="tr">` or `<html lang="en">`.

- [ ] **Step 2: Run tests and verify failure**

Run `npm test -- tests/app`.

Expected: FAIL because routing and prerender modules do not exist.

- [ ] **Step 3: Implement pure locale and URL codecs**

Parse only allowlisted filters and catalog ids. Ignore invalid values without throwing. Serialize query keys in this order: `stage`, `family`, `capability`, `compare`. Compare ids are stable-sorted by catalog order.

- [ ] **Step 4: Implement shared route composition**

`App` accepts `{ routerMode: "browser" | "static"; url?: string }`. Both modes render the same route components. Unknown localized slugs render the localized not-found page and link back to the correct field map.

- [ ] **Step 5: Implement prerendering**

The build first creates client assets and `dist-ssr/entry-server.js`. Then `scripts/prerender.mjs` imports that server bundle, renders every route from `getRouteManifest`, injects locale-specific title/description/canonical/alternate metadata, writes `dist/<route>/index.html`, and removes only the generated checkout-local `dist-ssr/` directory after success. The script fails if any route renders an error boundary or misses its H1.

- [ ] **Step 6: Implement ownership-safe preview control**

Store PID, cwd, mode, URL, and start time beneath `.runtime/wfm-preview.json`. `stop` may signal only the recorded PID after proving its cwd equals the checkout. A free port is never sufficient ownership evidence. Add `.runtime/` to `.gitignore` during this task.

- [ ] **Step 7: Run route tests**

Run:

```bash
npm test -- tests/app
npm run build
```

Expected: locale and URL tests pass; every route in the manifest exists as static HTML.

- [ ] **Step 8: Review checkpoint**

Use `rg -n "<html lang=|canonical|alternate" dist/tr/index.html dist/en/index.html` and `git diff --check`. Do not commit without separate authorization.

---

### Task 6: Build the Research Console Shell

**Files:**
- Create: `src/components/shell/ResearchConsole.tsx`
- Create: `src/components/shell/TopUtilityBar.tsx`
- Create: `src/components/shell/SidebarNav.tsx`
- Create: `src/components/shell/MobileNav.tsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/components.css`
- Create: `tests/components/ResearchConsole.test.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: accepted Task 1 design contract, route definitions, locale counterpart function, and catalog last-checked date.
- Produces: `ResearchConsole`, persistent desktop/mobile navigation, top utility metadata, `main` and evidence-panel slots, and design tokens used by later components.

- [ ] **Step 1: Write shell semantics tests**

Assert one `main`, a labeled primary navigation, locale switch preserving the counterpart route, a visible last-verified value, one current-page marker, skip link, and mobile menu behavior. Verify opening and closing the mobile modal returns focus to its trigger.

- [ ] **Step 2: Run the test and verify failure**

Run `npm test -- tests/components/ResearchConsole.test.tsx`.

Expected: FAIL because shell components do not exist.

- [ ] **Step 3: Implement tokens from the accepted concept**

Define exact custom properties for background, raised surface, border, primary text, muted text, selection lime, reported amber, focus ring, status shapes, content/UI/metadata font stacks, type scale, spacing scale, radii, and transition durations. Add a `prefers-reduced-motion: reduce` branch setting state transitions to `0.01ms` with no transform animation.

- [ ] **Step 4: Implement semantic shell components**

Keep `ResearchConsole` compositional:

```tsx
<ResearchConsole
  locale={locale}
  currentRoute={routeId}
  lastVerified={catalog.meta.lastVerified}
  evidenceInspector={inspector}
>
  {page}
</ResearchConsole>
```

The desktop evidence column may be absent on pages with no selection, but its main-column width must remain stable. Mobile uses an inline disclosure unless the accepted concept explicitly requires a modal drawer.

- [ ] **Step 5: Run component and type tests**

Run:

```bash
npm test -- tests/components/ResearchConsole.test.tsx
npm exec tsc -- --noEmit
```

Expected: tests pass with no accessibility warnings.

- [ ] **Step 6: Review checkpoint**

Start `npm run dev`, inspect `/tr` and `/en` at desktop and 390px, then stop with `npm run stop`. Do not commit without separate authorization.

---

### Task 7: Implement the Field Map and Evidence Inspector

**Files:**
- Create: `src/components/map/FieldMap.tsx`
- Create: `src/components/map/FieldMapTextAlternative.tsx`
- Create: `src/components/evidence/EvidenceInspector.tsx`
- Create: `src/components/evidence/EvidenceToken.tsx`
- Create: `src/pages/HomePage.tsx`
- Create: `tests/components/FieldMap.test.tsx`
- Create: `tests/components/EvidenceInspector.test.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/styles/components.css`

**Interfaces:**
- Consumes: typed concept relations, localized content, claims, evidence lookups, and `AtlasUrlState`.
- Produces: `FieldMap({ locale, selectedId, onSelect })`, mobile text path, evidence inspector, and working `/tr` and `/en` home routes.

- [ ] **Step 1: Write map interaction tests**

Test seven primary stage buttons, typed relation descriptions, selection callback, ArrowLeft/ArrowRight movement within the main reading sequence, Enter selection, visible focus, and the mobile ordered text equivalent. Assert the map description says the sequence is a reading path rather than a mandatory architecture.

- [ ] **Step 2: Write evidence inspector tests**

Assert selected entity title, localized summary, evidence status label, verification state label, last-checked date, primary-source name/link, unknown-value rendering, and polite selection announcement. The inspector must not move focus automatically.

- [ ] **Step 3: Run tests and verify failure**

Run `npm test -- tests/components/FieldMap.test.tsx tests/components/EvidenceInspector.test.tsx`.

Expected: FAIL because map and inspector do not exist.

- [ ] **Step 4: Implement the map with accessible SVG and DOM controls**

SVG draws typed edges with markers; positioned HTML buttons provide robust text, focus, and touch behavior. Every edge is also listed in a visually hidden relationship description referenced by `aria-describedby`. Use no Canvas or WebGL.

- [ ] **Step 5: Connect selection to URL state**

Selecting a stage calls `history.pushState` through the router with `stage=<id>`. Initial render reads the URL. Back and forward restore selection and inspector content.

- [ ] **Step 6: Implement evidence states**

`EvidenceToken` renders both status text and a non-color shape. `EvidenceInspector` distinguishes `demonstrated` from `reported`, and evidence status from freshness. Direct source links use descriptive accessible names.

- [ ] **Step 7: Run focused tests**

Run:

```bash
npm test -- tests/components/FieldMap.test.tsx tests/components/EvidenceInspector.test.tsx
npm run build
```

Expected: tests and prerender pass; both home routes contain map labels before hydration.

- [ ] **Step 8: Review checkpoint**

Verify keyboard selection, mobile learning path, direct `?stage=world-model`, and browser back behavior locally. Do not commit without separate authorization.

---

### Task 8: Implement Concepts and Model Exploration

**Files:**
- Create: `src/pages/ConceptIndexPage.tsx`
- Create: `src/pages/ConceptPage.tsx`
- Create: `src/pages/ModelIndexPage.tsx`
- Create: `src/pages/ModelPage.tsx`
- Create: `src/components/models/ModelFilters.tsx`
- Create: `src/components/models/ModelComparison.tsx`
- Create: `tests/components/ModelComparison.test.tsx`
- Create: `tests/e2e/models.spec.ts`
- Modify: `src/app/App.tsx`
- Modify: `src/styles/components.css`

**Interfaces:**
- Consumes: derived concept/model indexes, localized route slugs, URL codecs, and evidence inspector.
- Produces: concept index/detail routes, model explorer/detail routes, filters, and a URL-backed semantic comparison matrix.

- [ ] **Step 1: Write comparison tests**

Assert rows for representation type, inputs, outputs, action conditioning, planning, spatial/3D, persistence, application, availability, and evidence. Unknown renders as localized `Unknown`/`Bilinmiyor`, never `0` or a negative icon. Table headers use `scope="col"`; dimension names use `scope="row"`.

- [ ] **Step 2: Write E2E model workflow**

```ts
test("filters and compares models with shareable state", async ({ page }) => {
  await page.goto("/en/models");
  await page.getByRole("checkbox", { name: "Spatial / 3D" }).check();
  await page.getByRole("checkbox", { name: "Atlas" }).check();
  await page.getByRole("checkbox", { name: "V-JEPA 2" }).check();
  await expect(page).toHaveURL(/capability=spatial-3d/);
  await expect(page).toHaveURL(/compare=atlas%2Cv-jepa-2/);
  await expect(page.getByRole("table", { name: "Model comparison" })).toBeVisible();
});
```

- [ ] **Step 3: Run tests and verify failure**

Run `npm test -- tests/components/ModelComparison.test.tsx`.

Expected: FAIL because explorer components do not exist.

- [ ] **Step 4: Implement concept pages**

The index groups by map stage and supporting mechanism. Detail pages contain short definition, technical explanation, typed relationships, formula/example where available, related models, open questions, and claim-level evidence.

- [ ] **Step 5: Implement model filters and comparison**

Filters are native checkboxes grouped by family, capability, domain, and availability. The compare set is limited to four models to preserve readable analysis; attempting a fifth announces the limit without clearing prior selections. Mobile comparison uses a horizontally scrollable semantic table with sticky row labels.

- [ ] **Step 6: Implement model profiles**

Show organization, dates, approach family, modalities, representation, action conditioning, planning, spatial behavior, persistence, applications, availability, limitations, claims, evidence, and change history. Never infer a value when data is unknown.

- [ ] **Step 7: Run tests**

Run:

```bash
npm test -- tests/components/ModelComparison.test.tsx
npm run build
npm run test:e2e -- tests/e2e/models.spec.ts
```

Expected: component, route, and browser flows pass in both desktop and mobile projects.

- [ ] **Step 8: Review checkpoint**

Open a copied comparison URL in a fresh tab and verify identical state. Check Turkish long labels and 200% zoom. Do not commit without separate authorization.

---

### Task 9: Implement Evolution, Signals, and Methodology

**Files:**
- Create: `src/components/timeline/EvolutionTimeline.tsx`
- Create: `src/components/signals/SignalLog.tsx`
- Create: `src/pages/EvolutionPage.tsx`
- Create: `src/pages/SignalsPage.tsx`
- Create: `src/pages/MethodPage.tsx`
- Create: `tests/components/EvolutionTimeline.test.tsx`
- Create: `tests/components/SignalLog.test.tsx`
- Create: `tests/e2e/research-reading.spec.ts`
- Modify: `src/app/App.tsx`
- Modify: `src/styles/components.css`

**Interfaces:**
- Consumes: sorted milestones, approved signals, affected-entity relations, evidence taxonomy, and source policy.
- Produces: timeline, change log, and transparent methodology routes.

- [ ] **Step 1: Write timeline and signal tests**

Assert chronological ordering, direct date labels, affected-entity links, evidence links, and exclusion of unapproved signals. Assert every signal answers `what changed` and exposes event date separately from publication date.

- [ ] **Step 2: Run tests and verify failure**

Run `npm test -- tests/components/EvolutionTimeline.test.tsx tests/components/SignalLog.test.tsx`.

Expected: FAIL because timeline and signal components do not exist.

- [ ] **Step 3: Implement the timeline**

Use an ordered list as the semantic substrate. Desktop adds an aligned time rail; mobile preserves one-column chronological reading. Filters may narrow by family but do not remove dates from screen-reader output.

- [ ] **Step 4: Implement the signal log**

Signals display date, localized change summary, affected map stages/models, evidence status, verification state, and source. No infinite feed or engagement sorting is allowed; order is reverse chronological with stable pagination only when needed.

- [ ] **Step 5: Implement methodology**

Publish the four evidence statuses, four verification states, source eligibility rules, freshness behavior, unknown handling, comparison limitations, company-claim caveat, and exact last-updated date. Link methodology tokens from every evidence inspector.

- [ ] **Step 6: Run tests**

Run:

```bash
npm test -- tests/components/EvolutionTimeline.test.tsx tests/components/SignalLog.test.tsx
npm run build
npm run test:e2e -- tests/e2e/research-reading.spec.ts
```

Expected: all route, ordering, and evidence-navigation tests pass.

- [ ] **Step 7: Review checkpoint**

Inspect all dates and source labels against the catalog; run `git diff --check`. Do not commit without separate authorization.

---

### Task 10: Implement the Human-Gated Research Scanner

**Files:**
- Create: `research/sources.json`
- Create: `research/inbox/.gitkeep`
- Create: `scripts/research/scan.mjs`
- Create: `scripts/research/lib/fetch-source.mjs`
- Create: `scripts/research/lib/fingerprint.mjs`
- Create: `scripts/research/lib/candidate.mjs`
- Create: `tests/fixtures/research/meta-vjepa2.html`
- Create: `tests/fixtures/research/worldlabs-atlas.html`
- Create: `tests/research/scan.test.ts`
- Modify: `.gitignore`
- Modify: `package.json`

**Interfaces:**
- Consumes: public official-source URLs, expected entity ids, prior fingerprints, and fixture files.
- Produces: `scanSources(options): Promise<ScanReport>`, stable candidate JSON, `npm run research:scan`, and no public-catalog mutation.

- [ ] **Step 1: Write scanner tests**

Cover unchanged sources, changed sources, timeouts, HTTP errors, duplicate candidate suppression, bounded response size, canonical URL preservation, and public data immutability:

```ts
expect(report.status).toBe("partial");
expect(report.failures[0]?.code).toBe("FETCH_TIMEOUT");
expect(await hashDirectory("src/data/catalog")).toBe(publicCatalogHashBefore);
```

Assert candidate fields: `id`, `sourceId`, `entityIds`, `detectedAt`, `previousFingerprint`, `nextFingerprint`, `changeSummary`, `sourceUrl`, and `reviewState: "pending"`.

- [ ] **Step 2: Run scanner tests and verify failure**

Run `npm test -- tests/research/scan.test.ts`.

Expected: FAIL because scanner modules do not exist.

- [ ] **Step 3: Implement bounded fetching**

Use native Node `fetch` with a 15-second abort timeout, maximum 2 MB response body, explicit user agent, redirect limit, and `text/html`, XML, JSON, or plain text allowlist. Never execute source scripts. Return structured failures instead of throwing away the rest of the scan.

- [ ] **Step 4: Implement normalization and fingerprints**

Normalize line endings, collapse irrelevant whitespace, remove known tracking query parameters from discovered canonical URLs, and hash with SHA-256. Do not use generated prose as the fingerprint input.

- [ ] **Step 5: Implement stable candidates**

Candidate id is the SHA-256 of `sourceId + previousFingerprint + nextFingerprint`. An existing id is not rewritten. The scanner writes through a temporary file and atomic rename, but only beneath `research/inbox/`.

- [ ] **Step 6: Add source registry and deterministic fixture mode**

`research/sources.json` maps official sources to the initial model ids. `npm run research:scan -- --fixtures tests/fixtures/research` must perform no network requests. The normal command may access the network and reports `ready`, `partial`, or `blocked` with a run timestamp.

- [ ] **Step 7: Prove scanner isolation**

Run:

```bash
npm test -- tests/research/scan.test.ts
npm run research:scan -- --fixtures tests/fixtures/research
git diff -- src/data
```

Expected: tests pass, candidate output is deterministic, and `git diff -- src/data` is empty.

- [ ] **Step 8: Review checkpoint**

Confirm `.gitignore` excludes generated inbox candidates while preserving `.gitkeep`. Do not enable a hosted schedule, notification, commit, push, or deployment.

---

### Task 11: Complete Accessibility, Responsive, and Visual Fidelity Work

**Files:**
- Create: `tests/e2e/accessibility.spec.ts`
- Create: `docs/design/world-models-atlas/fidelity-ledger.md`
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Modify: `src/styles/components.css`
- Modify: components with defects discovered during browser comparison.

**Interfaces:**
- Consumes: accepted Task 1 concept images and the fully functional Tasks 6–10 UI.
- Produces: keyboard-complete, mobile-complete, zoom-safe, reduced-motion-safe UI and a five-plus-point fidelity ledger.

- [ ] **Step 1: Write accessibility browser tests**

Test skip link, landmark uniqueness, full keyboard map selection, locale switch focus, mobile navigation focus return, evidence disclosure, compare limit announcement, reduced-motion computed styles, 200% zoom at 1280×720, 390×844 overflow, and axe critical/serious violations.

- [ ] **Step 2: Run tests and record failures**

Run `npm run test:e2e -- tests/e2e/accessibility.spec.ts`.

Expected: any current accessibility or overflow defects fail with specific selectors and screenshots.

- [ ] **Step 3: Fix functional accessibility defects**

Repair semantics, labeling, focus order, disclosure state, status redundancy, contrast, touch targets, zoom reflow, and long-copy wrapping until the focused suite passes.

- [ ] **Step 4: Capture native-size browser screenshots**

Capture desktop at the accepted concept's dimensions and mobile at 390×844. Use the built-in Browser/IAB first; use Playwright screenshots only if Browser/IAB is unavailable or unreliable and record the fallback reason.

- [ ] **Step 5: Compare concept and render with `view_image`**

Inspect the accepted desktop concept and current desktop screenshot, then the mobile pair. Check copy, shell anatomy, type hierarchy, palette, evidence tokens, map geometry, source-panel treatment, spacing, responsive transformation, icons, focus, and motion.

- [ ] **Step 6: Write and close the fidelity ledger**

For each mismatch, record concept evidence, render evidence, repair, and final state. Include at least five concrete comparison points and an above-the-fold copy diff. Continue fixing until no material mismatch remains.

- [ ] **Step 7: Run the accessibility suite again**

Run:

```bash
npm run test:e2e -- tests/e2e/accessibility.spec.ts
```

Expected: desktop and mobile projects pass with no critical or serious axe violations and no horizontal document overflow.

- [ ] **Step 8: Review checkpoint**

Use `view_image` on the accepted concepts and final browser screenshots in the same QA pass. Do not commit without separate authorization.

---

### Task 12: Run Full Local Acceptance and Clean Handoff

**Files:**
- Create: `README.md`
- Create: `docs/research-method.md`
- Modify: `package.json`
- Modify: any file needed to fix validation defects.

**Interfaces:**
- Consumes: complete application, scanner, tests, concept images, and fidelity ledger.
- Produces: documented Setup/Run/Validate/Stop workflow, green aggregate validation, cleanly stopped checkout-owned preview, and an evidence-backed local handoff.

- [ ] **Step 1: Document the local lifecycle**

README includes Node 22 prerequisite, `npm install`, `npm run dev`, local URL discovery, `npm run research:scan -- --fixtures tests/fixtures/research`, `npm run validate`, `npm run stop`, data locations, bilingual publication rules, and the no-auto-publish boundary.

- [ ] **Step 2: Document research methodology**

`docs/research-method.md` explains primary-source eligibility, evidence and verification states, weekly/on-demand discovery, candidate review, bilingual promotion, stale behavior, and unknown handling. It must match the public Method page terminology exactly.

- [ ] **Step 3: Run focused deterministic checks**

Run:

```bash
npm test
npm run research:scan -- --fixtures tests/fixtures/research
npm run build
```

Expected: all unit/component/data/scanner tests pass; fixture scan is deterministic; every public route prerenders.

- [ ] **Step 4: Run full browser acceptance**

Run:

```bash
npm run test:e2e
```

Expected: all desktop and mobile projects pass for map, concepts, models, timeline, signals, methodology, accessibility, URL state, and static route reloads.

- [ ] **Step 5: Run aggregate validation**

Run `npm run validate`.

Expected: exit code `0` with no skipped required suites.

- [ ] **Step 6: Inspect production output**

Verify representative `/tr`, `/en`, concept, model, evolution, signals, and method HTML files exist; hashed assets return correct MIME types under local preview; source links are present; research inbox is absent from `dist`.

- [ ] **Step 7: Stop only the checkout-owned process**

Run `npm run stop`, then verify the preview state file records a clean stop. Do not kill any process without recorded checkout ownership.

- [ ] **Step 8: Inspect repository state**

Run:

```bash
git status --short --branch
git diff --check
git diff --stat
```

Expected: only intentional project files and persistent concept artifacts are present; no runtime PID files, generated inbox candidates, screenshots outside the approved design evidence directory, or debug artifacts remain.

- [ ] **Step 9: Final local handoff**

Report implemented routes, catalog counts, source/evidence coverage, test counts, browser surfaces checked, accepted concept paths, fidelity status, process cleanup, and literal external action state:

```text
commit=none
push=none
deploy=none
```

Do not commit, push, deploy, enable automation, or alter DNS without a new explicit instruction.
