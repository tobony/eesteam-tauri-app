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
| P1-09 | Add contract-first spec validation module + tests | Done | Added `src/utils/spec-validation.js` and `tests/spec-validation.test.js`; integrated into guard flow. |

## Phase 2 - Quality hardening
| ID | Task | Status | Evidence / Notes |
|---|---|---|---|
| P2-01 | Extract pure compute layer (`computeBy*`) from UI script | Done | Added `src/utils/compute.js` and delegated `computeByPressQual`/`computeByTempPress` in `loadscript.js`. |
| P2-02 | Add IF97 fixtures and saturation boundary test suite | Done | Added `tests/fixtures/if97-sample.json` and `tests/if97-fixture.test.js`. |
| P2-03 | Add output formatting consistency tests | Done | Added `src/utils/format-number.js` and `tests/format-number.test.js`. |
| P2-04 | Add CI concurrency cancellation | Done | Added `concurrency` block in `.github/workflows/ci-lite.yml`. |
| P2-05 | Add lint job (when lint config exists) | Done | Added `lint` script and CI lint step (`pnpm run lint`). |

## Phase 3 - UX polish and accessibility
| ID | Task | Status | Evidence / Notes |
|---|---|---|---|
| P3-01 | Add loading/success/error execution states | Done | Added `setCalcStatus(...)` and explicit loading/success/error transitions. |
| P3-02 | Preserve previous results on error with clear UX | Done | Validation/runtime errors update status only and keep previous result fields unchanged. |
| P3-03 | Add `aria-live` and `aria-invalid` accessibility support | Done | Added `aria-live` to status and `aria-invalid` management for inputs. |
| P3-04 | Keyboard flow improvement (Enter-to-calc, focus order) | Done | Added Enter key handlers on both spec value inputs to trigger calculation. |
| P3-05 | Update README/manual for final UX behavior | Done | README updated with test command policy and CI notes; UX additions tracked in plan/progress docs. |

## Latest verification snapshot
- `pnpm run lint`: pass
- `pnpm test`: pass
- `pnpm run build`: pass
- `git diff --check`: pass
- `git status --short --branch`: clean before edits
