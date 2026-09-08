# WFM working contract

- Build the living research atlas that traces how world models connect perception, prediction, planning, and action through primary sources, wfm (World Models Atlas).
- Keep approved research truth in `src/data/catalog/` and paired locale truth in `src/data/locales/`. The scanner may only write beneath `research/inbox/`; the public build is a prerender of approved signals — never auto-promote a candidate.
- Atlas pages consume only verified primary-source claims with explicit evidence status and verification freshness. Research candidates in `research/inbox/` are observer outputs from the scan, never decision inputs that drive rendered pages.
- Behavior, experiment, world, simulation, metric, and export schema versions are explicit. Update affected versions when semantics change.
- Every approved signal carries its primary-source URL, evidence classification, verification date, and freshness timestamp in the prerendered export. Reject candidates missing primary sources, evidence status, or paired TR/EN copy.
- Keep Turkish and English controls and explanations equivalent. Label model assumptions and simulation units.
- Verify `npm run validate:codex` and review `git diff --check` before handoff.
- Local work only unless the user authorizes external publication. Preserve unrelated work and processes.
