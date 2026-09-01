# World Models Atlas — Production Design Contract

Date: 2026-09-01
Status: Approved production direction
Direction: Research Console

## Source Concepts

- Approved desktop reference: `research-console-desktop-v2.png` — 1505×1045. This supersedes the earlier `research-console-desktop.png` candidate because the evidence-state icons in `What Changed` were corrected.
- Approved mobile reference: `research-console-mobile.png` — 860×1829, representing the 390px portrait layout at high raster density.
- Approved structural wireframe: `.superpowers/brainstorm/65862-1788285281/content/research-console-anatomy.html`.

The images define layout, hierarchy, density, palette, component families, and responsive transformation. All real application text, controls, diagrams, icons, and state are code-native.

## Creative Direction

The product should feel like a calm scientific instrument: precise, evidence-aware, and operational without resembling a financial terminal, game HUD, or cyberpunk dashboard.

- Use flat near-black neutrals and thin structural borders.
- Use one phosphor-lime interaction accent and one amber evidence accent.
- Keep surfaces open and connected; avoid nested card grids.
- Let typography, rules, data relationships, and state carry the visual identity.
- Do not introduce decorative gradients, glow fields, particles, neural-network wallpaper, 3D objects, robot imagery, fake terminal copy, or unmeasured charts.

## Color Tokens

```css
--color-page: #0b0e11;
--color-panel: #0f1418;
--color-panel-raised: #11171b;
--color-border: #303941;
--color-border-subtle: #242c32;
--color-text: #f1f4ef;
--color-text-muted: #a7b0b5;
--color-text-dim: #879198;
--color-selection: #c8ff00;
--color-selection-soft: #172000;
--color-reported: #ffa200;
--color-reported-soft: #211500;
--color-question: #a5adb2;
--color-danger: #ff6b57;
--color-focus: #d8ff55;
```

Color rules:

- `selection` marks the current route, selected entity, primary interactive outline, and current verification accent.
- `reported` marks company-reported evidence and review attention.
- Evidence status and verification state always include text and a distinct icon shape; color alone is insufficient.
- White text remains neutral. Lime must not be used for decorative body copy.
- Do not add blue, purple, or multicolor chart palettes without an approved analytical need.

## Typography

Production families:

- Content/UI: Inter Variable, with `ui-sans-serif`, `system-ui`, and `sans-serif` fallbacks.
- Research metadata: IBM Plex Mono, with `ui-monospace`, `SFMono-Regular`, and `monospace` fallbacks.

Type scale:

```text
Display / H1 desktop: 40px / 1.08 / 700 / -0.035em
Display / H1 mobile: 34px / 1.08 / 700 / -0.03em
H2: 28px / 1.15 / 650 / -0.02em
H3: 20px / 1.25 / 600 / -0.01em
Body large: 18px / 1.55 / 400
Body: 16px / 1.55 / 400
UI control: 14px / 1.2 / 500
Metadata: 12px / 1.35 / 500 / 0.035em
Micro label: 11px / 1.2 / 600 / 0.08em uppercase
```

No control may inherit browser-default typography. Metadata may be compact but must remain readable at the production viewport and at 200% zoom.

## Spacing, Geometry, and Elevation

Spacing scale: `4, 8, 12, 16, 24, 32, 48, 64` pixels.

- Desktop outer shell: 1px border; no floating outer shadow.
- Top utility bar: 68px minimum height.
- Desktop left rail: 248px.
- Desktop evidence inspector: 360–392px.
- Center workspace: flexible, minimum 640px before the intermediate layout collapses.
- Main desktop internal gutter: 32px.
- Mobile page gutter: 16px.
- Standard row minimum height: 60px desktop, 64px mobile.
- Touch target minimum: 44×44px.
- Control radius: 4px.
- Panel radius: 6px.
- Mobile selected-stage/evidence surface radius: 6px.
- Elevation is expressed primarily through border contrast. Shadows are limited to overlays and focus separation.

## Desktop Container Anatomy

The 1440px production reference uses:

```text
Top utility bar
┌───────────────────────────────────────────────────────────┐
│ Left navigation │ Main research workspace │ Inspector     │
│ 248px           │ flexible                │ 360–392px     │
└───────────────────────────────────────────────────────────┘
```

Top bar:

- Brand at left: globe mark plus `WORLD MODELS ATLAS`.
- Utilities at right: last verified, primary-source policy, locale switcher.

Left rail:

- `EXPLORE`: Field Map, Concepts, Models, Evolution.
- Divider.
- `TRACK`: Signals, Method.
- Selected route uses a lime left rule, lime icon, and lime label.
- The rail does not contain `What Changed`, `Research Families`, `Saved Views`, counters, or decorative status modules.

Main workspace:

- H1 and one-sentence support.
- Technology map panel with seven directly labeled nodes and typed relationship annotations.
- Evidence-state key beneath the map.
- `What Changed` two-row table.
- `Research Families` three-row table with direct model counts.

Evidence inspector:

- Selected label and evidence-status token.
- Model title.
- Inputs and outputs, using consistent functional icons.
- Last verified date.
- Full-width primary-source action.

## Mobile Container Anatomy

At 390×844:

- Compact header with `WFM`, map/menu control, and locale switcher.
- H1 and support copy.
- Horizontal map becomes an ordered vertical path.
- Each stage is a full-width row with sequence number, functional icon, English technical name, localized role, and disclosure chevron.
- Selected stage uses a lime left rule, lime outline, and lime technical label.
- Selected-stage explanation appears inline immediately after the path.
- Evidence-state tokens wrap without clipping.
- Atlas source preview follows with report date, source-owner disclosure, and full-width primary-source action.

The mobile layout is not a card-grid reinterpretation. It is the same relationship map rewritten into the natural portrait reading order.

## Intermediate Responsive State

At 768–1199px:

- Top utility bar keeps brand, last verified, and locale switcher; source policy may reduce to an icon plus accessible label.
- Left rail collapses to an accessible menu at widths below 960px.
- Main workspace remains primary.
- Evidence inspector moves below the selected map or comparison region as an inline disclosure.
- Comparison tables scroll horizontally with sticky row headings.

No breakpoint may hide source, evidence status, verification date, or the selected entity definition.

## Map Geometry and State

Desktop order:

```text
LLM → VLM → WORLD MODEL → PLANNER → AGENT → PHYSICAL AI → DIGITAL TWIN
```

This is a reading path, not a mandatory architecture claim. Typed secondary edges show latent-prediction, spatial-context, action, and feedback relationships.

- Nodes are rectangular, 4px radius, minimum 84×56px.
- The selected node uses a 2px lime border and a subtle `selection-soft` fill.
- Directed arrows are neutral; a selected relationship may use lime.
- Dashed paths represent non-linear or feedback relationships only when their accessible label explains the semantics.
- Desktop labels remain visible without hover.
- Mobile sequence numbers provide a redundant relationship cue.

## Evidence-State Components

```text
DEMONSTRATED / GÖSTERİLDİ: check inside a circle + text
REPORTED / RAPORLANDI: warning triangle + text
OPEN QUESTION / AÇIK SORU: question mark inside a circle + text
CURRENT: calendar/check mark + text
STALE: clock + text
NEEDS REVIEW: warning diamond + text
WITHDRAWN: crossed document + text
```

Evidence status and verification state are separate component variants and may appear together.

`What Changed` rows in the desktop concept encode:

- Atlas, 01 Sep 2026: amber warning, `reported`.
- Cosmos 3, Jun 2026: lime check, `demonstrated`.

## Research-Family Counts

The initial counts are direct catalog counts and may overlap because one model can belong to more than one family:

- Latent intelligence: 2 models.
- Generative simulation: 4 models.
- Spatial + physical: 4 models.

Do not render the family rows as percentage bars or imply progress/maturity. Show the name and count only.

## Icon Inventory

Use one consistent 1.5px rounded-stroke SVG family:

- globe / product mark;
- field map;
- concepts / overlapping documents;
- models / cube;
- evolution / rising line;
- signals / broadcast;
- method / lab flask;
- check-circle;
- warning-triangle;
- question-circle;
- text;
- image;
- camera pose;
- depth / point field;
- video / play;
- point cloud;
- Gaussian splat;
- calendar;
- external link;
- chevron right;
- menu and close.

Icons use `currentColor`, explicit `viewBox`, rounded caps/joins, and no filled decorative containers beyond the selected-state treatment.

## Motion

- Hover/focus color: 120ms ease-out.
- Inspector and mobile disclosure: 180ms cubic-bezier(0.2, 0.8, 0.2, 1).
- Map selection emphasis: 160ms ease-out; no pulse or infinite animation.
- Route changes do not animate the whole canvas.
- `prefers-reduced-motion: reduce` removes transforms and reduces transitions to immediate state changes.

## Allowed First-Viewport Copy

English desktop:

```text
WORLD MODELS ATLAS
LAST VERIFIED 01 SEP 2026
PRIMARY SOURCES
TR / EN
EXPLORE
FIELD MAP
CONCEPTS
MODELS
EVOLUTION
TRACK
SIGNALS
METHOD
From language to physical intelligence.
Follow how representations become predictions, plans and actions.
LLM
VLM
WORLD MODEL
PLANNER
AGENT
PHYSICAL AI
DIGITAL TWIN
V-JEPA 2 · latent prediction
Atlas · spatial context
DEMONSTRATED
REPORTED
OPEN QUESTION
WHAT CHANGED
RESEARCH FAMILIES
SELECTED
Atlas: A World Model for Spatial Intelligence
INPUTS
OUTPUTS
VERIFIED
OPEN PRIMARY SOURCE
```

Turkish mobile:

```text
WFM
HARİTA
TR / EN
Dilden fiziksel zekâya.
Temsillerin tahminlere, planlara ve eylemlere nasıl dönüştüğünü izleyin.
LLM / ANLAM
VLM / ALGI
WORLD MODEL / SİMÜLASYON
PLANNER / SEÇİM
AGENT / EYLEM
PHYSICAL AI / BEDEN
DIGITAL TWIN / GERİ BESLEME
SEÇİLEN · WORLD MODEL
Temsil edilen bir durumun, isteğe bağlı olarak bir eyleme koşullandırılarak nasıl değişebileceğini tahmin eder.
GÖSTERİLDİ
RAPORLANDI
AÇIK SORU
ATLAS · SPATIAL CONTEXT
01 EYL 2026
World Labs tarafından raporlandı
BİRİNCİL KAYNAĞI AÇ
```

Visible copy may expand below the first viewport through approved route content. No hero eyebrow, marketing CTA, saved-view control, pseudo-system label, fabricated metric, or decorative badge may be added above the fold.

## Component Families

- ResearchConsole shell.
- Utility action.
- Navigation row.
- Field-map node and typed edge.
- Evidence-state token.
- Data row with leading state, content, and disclosure action.
- Research-family count row.
- Evidence inspector fact group.
- Primary-source action.
- Mobile learning-path row.
- Inline evidence disclosure.
- Semantic comparison table.
- Timeline event row.

Each repeated element uses one component with explicit variants. Do not duplicate styling for locale or route-specific copies.

## Fidelity Acceptance

The implementation passes visual review only when:

1. The shell proportions, panel boundaries, and first-viewport density match the desktop concept.
2. The mobile path, selected-state explanation, evidence tokens, and source preview match the mobile concept.
3. All allowed copy is present in the approved order with no invented above-the-fold copy.
4. Typography covers headings, body, metadata, controls, tables, and evidence labels deliberately.
5. Every icon matches the approved stroke weight, size, container, and state.
6. Atlas and Cosmos change rows use the corrected evidence-state encoding.
7. No unexplained bars, gradients, glow effects, extra navigation, or card-grid substitutions appear.
8. Desktop and mobile screenshots have been compared to these concepts with `view_image`, and the fidelity ledger contains no unresolved material mismatch.
