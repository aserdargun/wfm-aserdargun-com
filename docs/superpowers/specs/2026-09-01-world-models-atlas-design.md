# World Models Atlas — Product and System Design

Date: 2026-09-01
Status: Approved and implemented locally
Working directory: `wfm-aserdargun-com`

## 1. Objective

Build a public, bilingual World Models Atlas that explains the field's foundational concepts, maps how the major technology layers relate, compares representative model families, and records verified changes over time.

The product is a living research publication, not a news feed. Its primary job is to help a reader form a correct mental model of the field. New developments appear in the context of the technology map and are published only after human review.

## 2. Product Decisions

- Public, read-only visitor experience.
- Full Turkish and English content parity.
- Technology-map-first entry point.
- Static evidence atlas with no visitor account, database, or runtime content API.
- Official-source discovery followed by human approval before publication.
- Dark, dense, operational `Research Console` visual direction.
- Source, evidence status, verification date, and uncertainty remain visible throughout the product.

## 3. Audience

The atlas serves three overlapping audiences:

1. Readers learning what a world model is and how it differs from an LLM, VLM, simulator, policy, agent, and digital twin.
2. Technical readers comparing current approaches, modalities, access conditions, evidence, limitations, and use cases.
3. The owner-curator, who regularly reviews first-party developments and promotes approved candidates into the public atlas.

The public interface optimizes for the first two audiences. The curator workflow is repository-based in the first release and is not exposed as a public administration screen.

## 4. Scope

### 4.1 Initial concepts

The opening technology chain is:

`LLM → VLM → World Model → Planner → Agent → Physical AI → Digital Twin`

This is an entry narrative, not a claim that every system contains every stage or that the technologies form one mandatory linear pipeline. Production data uses typed, directional relationships so the map can show combinations, feedback loops, alternatives, and missing stages accurately.

Supporting concepts include:

- observation, state, and latent representation;
- learned dynamics and transition prediction;
- deterministic and probabilistic futures;
- action conditioning and counterfactual rollouts;
- planning and model-predictive control;
- memory and temporal persistence;
- spatial intelligence, geometry, and 3D consistency;
- embodiment, multimodal sensing, and world-action models;
- simulation, synthetic experience, sim-to-real, and real-to-sim;
- uncertainty, causal consistency, object permanence, and long-horizon error.

### 4.2 Initial model set

The first published comparison covers:

- DreamerV3;
- Meta V-JEPA 2;
- Google DeepMind Genie 3;
- NVIDIA Cosmos 3;
- World Labs Atlas;
- Runway GWM-1;
- Waymo World Model;
- Wayve GAIA-3.

The schema must support adding new models without changing page components.

### 4.3 Explicit non-goals for the first release

- No visitor authentication or personalized accounts.
- No browser-based curator CMS.
- No automatic publication from crawled sources.
- No user-generated submissions or comments.
- No model execution, generated-world sandbox, robotics control, or simulation runtime.
- No opaque aggregate leaderboard or single overall model score.
- No dependency on a live backend for the published atlas.

## 5. Information Architecture

Every public route has Turkish and English variants under `/tr` and `/en`. Stable entity identifiers are language-independent; localized labels and slugs map to those identifiers.

### 5.1 Routes

- `/tr` and `/en`: field map and current state overview.
- `/{locale}/concepts`: foundational concept index and relationship views.
- `/{locale}/concepts/{slug}`: concept explanation, diagrams, related models, and evidence.
- `/{locale}/models`: filterable model explorer and comparison matrix.
- `/{locale}/models/{slug}`: model profile, capabilities, evidence, limitations, and change history.
- `/{locale}/evolution`: 2018-to-present milestone timeline.
- `/{locale}/signals`: approved recent developments framed as changes to the map.
- `/{locale}/method`: source policy, evidence taxonomy, assessment method, freshness rules, and limitations.

### 5.2 Primary reading path

1. The reader enters through the field map.
2. Selecting a stage exposes its definition, adjacent stages, representative models, and unresolved questions.
3. Selecting a model opens its evidence panel and full profile.
4. The reader can compare models, move to the historical timeline, or inspect recent changes.
5. URL state preserves the current locale, family filter, capability filter, selected entity, and comparison set.

Back/forward navigation must restore the same meaningful state. Links copied from a filtered or selected view must recreate that view.

## 6. Visual and Interaction Design

### 6.1 Approved direction

The approved direction is `Research Console`, represented by the visual companion artifact:

`.superpowers/brainstorm/65862-1788285281/content/research-console-anatomy.html`

The artifact is a layout and interaction contract, not a pixel-perfect production mockup. A dedicated concept pass will define exact typography, spacing, color values, icons, responsive details, and component states before implementation.

### 6.2 Desktop anatomy

- Top utility bar: product identity, last verified date, source policy indicator, and locale switcher.
- Left navigation: Explore and Track groups.
- Center workspace: headline, technology map, selected-stage context, approved changes, and research-family summary.
- Right evidence inspector: claim status, source-backed description, inputs, outputs, verification date, limitations, and direct primary-source link.

The evidence inspector updates with the current selection. It must remain possible to read essential labels and values without hover.

### 6.3 Mobile anatomy

- The horizontal field map becomes a vertically ordered learning path.
- The current stage and its essential definition remain visible in the primary flow.
- Evidence opens as an accessible drawer or inline disclosure, not as hover-only content.
- Filters use a compact sheet with sufficiently large touch targets.
- Tables retain semantic relationships through horizontal scrolling or a purpose-built comparison view; they are not converted into unrelated card grids.

### 6.4 Visual language

- Near-black neutral background and restrained panel boundaries.
- Phosphor-lime focal accent for current selection and primary interaction.
- Evidence status and verification state use separate labeled tokens with distinct shapes; amber is reserved for reported claims and review attention.
- Neutral gray for context, inactive controls, and unknown states.
- Status always uses a text label or shape in addition to color.
- Typography combines a disciplined interface sans with a monospace research layer for metadata, dates, and evidence states.
- Motion is limited to state transitions, map focus, drawer movement, and change emphasis; reduced-motion users receive an immediate static state.

All bars, marks, and diagrams must encode named data. The production interface must not include decorative progress bars or implied maturity metrics. When a research-family summary uses a bar, it must show a directly labeled count or a documented measure with its denominator.

## 7. Visualization System

The analytical job combines system structure, comparison, time change, and monitoring. The primary artifact families are:

- an annotated node-link technology map for system relationships;
- a semantic comparison matrix for models and capabilities;
- a chronological timeline for milestones;
- a compact change log for approved signals;
- small, directly labeled count or distribution graphics only when the underlying data supports them.

The technology map uses accessible SVG and DOM labels. Standard comparisons use semantic HTML tables before bespoke graphics. WebGL and 3D are excluded because they do not improve the initial analytical tasks.

Direct labels are preferred over detached legends. Important values cannot depend on hover. Keyboard focus, touch selection, and programmatic text descriptions must expose the same relationships.

## 8. Content and Data Model

### 8.1 Entity types

#### Concept

- stable id;
- localized slug, title, summary, and long explanation;
- formulas, diagrams, and examples;
- prerequisites and related concept ids;
- related model and milestone ids;
- evidence references.

#### Model

- stable id, organization, family, and release dates;
- localized name, summary, and limitations;
- input and output modalities;
- representation type;
- action conditioning;
- planning/control support;
- spatial/3D behavior;
- persistence and horizon information;
- robotics, driving, simulation, or other application domains;
- weights, code, API, paper, and product availability;
- hardware or access requirements when known;
- evidence references and change history.

#### Milestone

- stable id and date;
- localized title, explanation, and significance;
- affected concepts, models, families, and capabilities;
- evidence references.

#### Signal

- stable id, discovery date, event date, and publication date;
- localized summary and `what changed` explanation;
- affected entities and fields;
- evidence references;
- curator approval state.

Only approved signals are included in the public build.

#### Evidence

- stable id and canonical URL;
- publisher, author when applicable, source type, and publication date;
- last checked timestamp;
- language and access notes;
- supported claim ids;
- evidence status;
- freshness state;
- optional archived or replacement URL metadata.

#### Claim

- stable id and localized text;
- subject and field being asserted;
- evidence references;
- evidence status;
- verification state;
- optional curator rationale for inferred or synthesized claims.

### 8.2 Evidence status

- `demonstrated`: a cited paper or technical report presents a method and observable result. This label does not imply independent reproduction.
- `reported`: an organization states the capability or outcome without enough published method or data to classify it as demonstrated.
- `inferred`: the atlas derives a bounded conclusion from cited evidence; curator rationale is mandatory.
- `editorial-synthesis`: the atlas combines multiple cited sources into a comparison or field-level interpretation; methodology is mandatory.

### 8.3 Verification state

- `current`: checked within the applicable freshness window.
- `stale`: the last successful check is outside that window.
- `needs-review`: source content, accessibility, or meaning changed materially.
- `withdrawn`: the source or publisher explicitly withdrew the result.

Evidence status and verification state are separate. A demonstrated result can become stale; a newly checked source can still contain only a reported claim.

### 8.4 Bilingual contract

Structure and evidence are canonical and shared. Turkish and English prose are paired by the same stable entity and claim ids.

The build fails when:

- one locale is missing a required entity or claim;
- localized slugs collide;
- a relationship resolves in only one locale;
- required navigation or metadata lacks a translation;
- a public signal is approved in only one language.

Machine translation may assist drafting but never satisfies the publication gate without owner review.

## 9. Source Policy

- Published factual claims require at least one relevant primary source.
- Suitable primary sources include papers, official research pages, technical reports, model cards, official repositories, and first-party release notes.
- Secondary reporting may populate the discovery queue but cannot be the sole public evidence for a technical capability.
- Company claims are labeled as company-reported unless the cited artifact exposes enough method and results for the narrower `demonstrated` label.
- Access limitations, missing details, and unavailable artifacts remain visible.
- Absence of evidence is represented as `unknown`, not as zero capability or poor performance.
- Model comparison does not collapse unlike benchmarks into a single score.

Each public page displays its latest relevant verification date and links directly to evidence.

## 10. Curated Update Pipeline

### 10.1 Flow

```text
Official source registry
        ↓
Source adapters and fetch
        ↓
Normalized candidate records
        ↓
Diff against published entities and claims
        ↓
Non-public build-time research inbox
        ↓
Human evidence review and bilingual editing
        ↓
Promotion into public dataset
        ↓
Validation and static build
```

### 10.2 Discovery behavior

- A source registry records the canonical URL, publisher, source type, expected entity, and check strategy.
- Adapters may cover official HTML pages, RSS/Atom feeds, arXiv metadata, model repositories, and release feeds.
- A weekly scan is the default cadence. The curator can also run an on-demand scan.
- The scanner stores a content fingerprint and extracts bounded metadata. It does not publish prose generated from a source.
- Candidate output describes the detected difference, affected entities, and source URL.
- Unchanged sources do not create duplicate candidates.
- The inbox contains public-source metadata and bounded technical review notes only. Private personal notes and credentials are out of scope.
- Activation of a hosted scheduler, automation, notification, commit, pull request, or deployment is a separate operational authorization. The repository must still provide a deterministic local scan command in the first release.

### 10.3 Promotion behavior

Promotion is an explicit repository edit. The curator verifies the source, assigns evidence and verification states, writes both locales, and links affected claims. Only then does the candidate enter the public dataset.

No scanner or scheduled process may automatically modify published content, commit changes, push branches, or deploy the site.

## 11. Failure and Freshness Behavior

- Source fetch failure preserves the last published content and records the failed check separately.
- A source that exceeds its freshness window displays `stale` with the last successful verification date.
- A source whose content changes materially places affected claims in `needs-review`; it does not silently delete them.
- A withdrawn artifact displays the withdrawal and keeps a transparent historical record.
- Network failure during research scanning cannot break the public static site.
- Missing sources, malformed dates, broken relationships, unpaired locale content, or invalid public approval states fail the build.
- Unknown values remain unknown and are excluded from numeric comparisons that require them.
- External-link checking distinguishes temporary network failure from a confirmed invalid URL.

The public build is stale-but-visible rather than empty-on-error.

## 12. Technical Architecture

### 12.1 Frontend

- React, TypeScript, and Vite.
- Build-time prerendered static output for every public route, followed by client hydration for interactive state.
- Route-aware locale handling and shareable URL state.
- Accessible SVG for the field map; semantic HTML for tables and core content.
- Small, focused components for the shell, map, evidence inspector, filters, comparison matrix, timeline, signal log, and mobile disclosures.
- Design tokens for color roles, typography, spacing, borders, elevation, focus, and motion.

The application must remain useful without animation. Prerendered core explanations and evidence links remain readable if JavaScript enhancement fails.

### 12.2 Data and validation

- Versioned repository data separated from presentation components.
- Runtime schema validation at data ingestion and build time.
- Canonical shared entities plus paired Turkish and English content.
- Deterministic generation of derived indexes, route manifests, comparison fields, and search data.
- Research inbox excluded from the public build.

### 12.3 Update tooling

- A deterministic local scan command.
- Fixture-backed source adapters for normal test runs.
- Live source checks separated from deterministic acceptance tests.
- Candidate diffs written in a reviewable, stable format.

## 13. Accessibility and Responsive Requirements

- Every map node and edge relationship has a keyboard and text equivalent.
- Focus order follows the visible reading order.
- The evidence inspector announces selection changes without stealing focus.
- Status never relies on color alone.
- Touch targets meet mobile sizing expectations.
- Text remains usable at 200% zoom without loss of content or two-dimensional page scrolling.
- Long Turkish words and translated labels do not clip controls or table headers.
- Motion honors `prefers-reduced-motion`.
- Tables expose headers and scopes correctly.
- Mobile drawers and filter sheets trap and return focus appropriately when modal; non-modal disclosures remain in document order.

## 14. Verification Strategy

### 14.1 Dataset tests

- schema validity;
- unique stable ids;
- valid and ordered dates;
- resolvable relationships;
- canonical URL and source metadata requirements;
- source-required public claims;
- rationale-required inferred and editorial claims;
- Turkish/English parity;
- localized slug uniqueness;
- approved-only public signals;
- unknown-value handling;
- duplicate candidate suppression.

Mutation fixtures must prove rejection of missing evidence, orphaned relationships, invalid dates, locale gaps, duplicate ids, invalid evidence states, and falsely comparable unknown values.

### 14.2 Component and integration tests

- locale switching preserves the corresponding entity and state;
- map selection updates the evidence inspector;
- filters and comparison selection round-trip through the URL;
- browser back/forward restores state;
- direct links reproduce selected and filtered views;
- stale and needs-review states render with accessible text;
- reduced-motion and keyboard flows remain complete.

### 14.3 Browser acceptance

- desktop and mobile primary journeys;
- technology-map selection and evidence drill-down;
- model comparison;
- timeline navigation;
- approved signal to affected entity navigation;
- Turkish/English parity checks;
- 200% zoom, narrow mobile width, and long-copy overflow;
- visible focus, contrast, and screen-reader-oriented semantics;
- static route reload behavior.

### 14.4 Visual fidelity

Before implementation, a complete desktop and mobile concept set will define the production visual specification. Final verification must compare the accepted concept and browser screenshots directly, including:

- copy and information hierarchy;
- console shell and panel anatomy;
- typography and control text;
- palette and evidence-state treatment;
- map geometry and selected states;
- spacing and density;
- evidence inspector behavior;
- responsive transformation;
- icon style and focus states.

## 15. Acceptance Criteria

The first release is complete when:

1. All approved routes exist in Turkish and English with validated parity.
2. The technology map supports keyboard, pointer, touch, and direct-link selection.
3. The initial concepts and eight models have source-backed profiles.
4. Every public claim exposes evidence status and verification state.
5. Model filters and comparison state are shareable through the URL.
6. The historical timeline and approved signal log link back to affected concepts and models.
7. The deterministic local scan creates review candidates without modifying public data.
8. Invalid evidence, broken relationships, and locale gaps fail closed.
9. Automated checks and desktop/mobile browser acceptance pass.
10. The rendered product is faithfully verified against the later accepted production concepts.

## 16. Delivery Boundaries

This design authorizes creation of the written specification only. It does not authorize a commit, push, deployment, hosted scheduler, notification, DNS change, or publication. Those operational actions remain separate from implementation and local verification.
