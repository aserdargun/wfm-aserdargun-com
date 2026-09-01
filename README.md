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
npm test
npm run build
npm run test:e2e
```

`npm run build` emits prerendered HTML for every Turkish and English public route. `npm run validate` runs the complete local acceptance chain.

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

## Evidence contract

- Public claims cite primary sources.
- Evidence status and verification freshness are independent fields.
- Company-reported capabilities remain labeled `reported`.
- Missing values remain `unknown`; unlike benchmarks are not collapsed into one score.
- Only approved signals enter the static public build.
