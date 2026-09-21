# World Models Atlas

Public, bilingual, evidence-backed research atlas for the foundations, representative systems, and current signals around world models.

## Local workflow

Requirements: Node.js 22 or newer and npm.

```bash
npm install
npm run dev
```

The development server opens at `http://127.0.0.1:63051/`. Stop only the checkout-owned process recorded under `.runtime/`:

```bash
npm run stop
```

## Validation

```bash
npm run validate:codex
```

`npm run build` emits prerendered HTML for every Turkish and English public route. `npm run validate:codex` runs the production build, unit/contract tests, desktop/mobile browser checks, and `git diff --check`. Standalone `npm test` requires a current build for the prerender assertions.

The build validates the approved catalog before prerendering and emits `research-export.json`, `sitemap.xml`, and `robots.txt`. Each exported signal includes both locales and every linked primary source, evidence classification, verification state, verification date, and a day-normalized freshness timestamp. Versioned catalog, interaction, and export contracts live in `src/data/export.ts` (catalog v3, behavior v3, export v2). Unverified publication, release, and event dates use `null`; undated records sort after dated records. Export v2 preserves source publication dates and paired source review notes alongside verification metadata. WFM does not run simulations or experiments; the separate WML application owns those schemas.

## Portfolio reading path

WFM belongs to the physical-AI layer of the aserdargun.com AI Learning System. The home, method, and relevant concept pages connect primary-source research with WML’s educational prediction experiments and ITL’s synthetic industrial-twin records. These are learning links between independent applications, not shared telemetry or runtime integrations.

## Curated research scan

Run the deterministic offline fixture scan:

```bash
npm run research:scan -- --fixtures tests/fixtures/research
```

Run a live official-source scan:

```bash
npm run research:scan
```

The scanner can write pending candidate records only beneath `research/inbox/`. It cannot edit the public catalog, approve content, commit, push, schedule itself, or deploy. Publishing a candidate requires human source review, evidence classification, and paired Turkish/English editing.

The write boundary is enforced for custom output paths and symbolic links. Concurrent scans publish complete candidate files without replacing existing reviews. Candidate schema v2 hashes a structured source/fingerprint tuple; a missing fingerprint creates a pending first-observation candidate instead of silently claiming the source is unchanged. HTTPS is required throughout redirects. Offline HTML fixtures are small deterministic test inputs, not evidence of a live source verification.

## Evidence contract

- Public claims cite primary sources.
- Evidence status and verification freshness are independent fields.
- Company-reported capabilities remain labeled `reported`.
- Missing values remain `unknown`; unlike benchmarks are not collapsed into one score.
- Only approved signals enter the static public build.
