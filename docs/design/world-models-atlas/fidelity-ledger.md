# World Models Atlas — Fidelity Ledger

Date: 2026-09-01
Status: Local implementation accepted for validation
Reference desktop: `research-console-desktop-v2.png`
Reference mobile: `research-console-mobile.png`
Rendered desktop: `implementation-desktop.png` at 1505×1045
Rendered mobile: `implementation-mobile.png` at 390×844

## Comparison

| Area | Accepted reference | Implemented result | Status |
| --- | --- | --- | --- |
| Shell anatomy | 68px utility bar, 248px navigation, flexible workspace, 360–392px inspector | Same three-region grid at desktop; inspector moves below the workspace before mobile collapse | Matched |
| Navigation | Exact Explore and Track groups with lime current-route rule | Exact approved labels and order; mobile uses a focus-returning modal navigation | Matched |
| Palette | Near-black surfaces, lime interaction state, amber reported evidence | Exact role palette; dim text was raised from `#727d84` to `#879198` after axe found sub-AA contrast | Accessible adjustment |
| Typography | Inter for UI, IBM Plex Mono for research metadata | Local package assets, matching sans/mono roles and approved scale | Matched |
| Field map | Seven-stage reading path, selected World Model, visible feedback relation | Seven keyboard-selectable DOM nodes over accessible SVG relations; mobile becomes an ordered vertical path | Matched |
| Evidence encoding | Demonstrated and current in lime; reported in amber; shapes plus labels | Check, exclamation, dot, and other non-color shapes accompany every state label | Matched |
| Change log | Compact What Changed rows tied to source and evidence state | Reverse-chronological source-backed signals; Atlas remains reported and Cosmos 3 demonstrated | Matched |
| Mobile reflow | One-column learning path, compact navigation, no horizontal overflow | 390×844 acceptance confirms one-column path, 44px navigation controls, and zero document overflow | Matched |

## Above-the-fold copy

The rendered Turkish first viewport preserves the approved core copy:

- `WORLD MODELS / 2026`
- `Dilden fiziksel zekâya`
- `Tahmin, planlama ve eylem katmanları`
- `World Model`
- `Ne değişti`

The supporting introduction is original atlas copy rather than image-baked text. It states the evidence-backed research purpose without adding decorative statistics; the only count shown is the literal eight-model catalog size.

## Deliberate deviations

1. The implementation uses code-native Lucide icons and real DOM text; no text or icon is rasterized from the concept.
2. Mobile keeps the full seven-stage path before the evidence inspector. The inspector remains reachable in the same document flow instead of duplicating a shortened evidence card above the path.
3. The dim-text token changed to `#879198` because `#727d84` produced a 4.39:1 contrast ratio on the panel surface. This is the only palette deviation and preserves the intended hierarchy.
4. Desktop node widths adapt to the real Turkish strings, so the Digital Twin node sits on the feedback row rather than following a fixed illustration coordinate.
5. Browser screenshots were captured with Playwright because the built-in IAB control surface was unavailable in the active tool set. Both screenshots were inspected at original resolution.

## Core interaction verified

`/tr?stage=world-model` → select `Planner` → URL becomes `stage=planner` → evidence selection updates → browser Back restores World Model. Model capability and comparison selections also survive a reload through URL state.
