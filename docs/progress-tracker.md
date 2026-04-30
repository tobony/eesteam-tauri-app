# Progress Tracker

## Status legend
- `Done`: completed and verified
- `In Progress`: actively being implemented
- `Planned`: agreed but not started
- `Blocked`: cannot proceed due to dependency/constraint

## Phase 1 - Quick stabilization
| ID | Task | Status | Evidence / Notes |
|---|---|---|---|
| P1-01 | Add repo-level AGENTS guidance | Done | `AGENTS.md` added and used as workflow baseline. |
| P1-02 | Add code test guideline document | Done | `docs/code-test-guideline.md` added. |
| P1-03 | Add lightweight PR CI workflow | Done | `.github/workflows/ci-lite.yml` added with build/test/diff checks. |
| P1-04 | Introduce `blendByQuality` helper and replace duplicate mixed formulas | Done | `src/utils/quality.js` + call sites updated. |
| P1-05 | Add validation and route guard utilities | Done | `src/utils/calculation-guards.js` added with clamp/validate/route helpers. |
| P1-06 | Runtime fallback hardening for missing engine functions | Done | Guard checks for `xsteam2.p_hx` and `xsteam2.p_sx`, caught and surfaced. |
| P1-07 | Add baseline unit tests for quality + guards | Done | `tests/quality.test.js`, `tests/calculation-guards.test.js` present and passing. |
| P1-08 | Track verification outcomes in docs | Done | `docs/test-log.md` maintained with executed commands. |

## Phase 2 - Quality hardening
| ID | Task | Status | Evidence / Notes |
|---|---|---|---|
| P2-01 | Extract pure compute layer (`computeBy*`) from UI script | Planned | Not started; `src/loadscript.js` still contains mixed UI+compute concerns. |
| P2-02 | Add IF97 fixtures and saturation boundary test suite | Planned | Fixture files and boundary suite not yet created. |
| P2-03 | Add output formatting consistency tests | Planned | `toFixed(2)` rendering consistency checks pending. |
| P2-04 | Add CI concurrency cancellation | Planned | Workflow currently has no `concurrency` block. |
| P2-05 | Add lint job (when lint config exists) | Planned | Lint config/job not yet introduced. |

## Phase 3 - UX polish and accessibility
| ID | Task | Status | Evidence / Notes |
|---|---|---|---|
| P3-01 | Add loading/success/error execution states | Planned | Button text updates exist, but full explicit state model pending. |
| P3-02 | Preserve previous results on error with clear UX | Planned | Needs explicit rendering policy and tests. |
| P3-03 | Add `aria-live` and `aria-invalid` accessibility support | Planned | Not yet implemented in result/input regions. |
| P3-04 | Keyboard flow improvement (Enter-to-calc, focus order) | Planned | Needs explicit UX handling and verification. |
| P3-05 | Update README/manual for final UX behavior | In Progress | README partially updated; final UX/accessibility docs pending. |

## Latest verification snapshot
- `pnpm test`: pass
- `pnpm run build`: pass
- `git diff --check`: pass
- `git status --short --branch`: clean before edits
