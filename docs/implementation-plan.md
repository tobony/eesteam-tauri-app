# Implementation Plan

## Goal
Systematically improve UX clarity, runtime safety, TDD workflow, and CI efficiency for the steam-table app.

## Coverage check against requested items
- [x] UX validation messaging and state visibility
- [x] JS runtime guardrails and DOM safety utilities
- [x] TDD process template (failing test -> fix -> refactor -> regression -> log)
- [x] Unit-test expansion plan (unit/integration/fixtures)
- [x] CI optimization plan (concurrency/version pinning/lint split)
- [x] Phased rollout plan (Phase 1~3)

## Phase 1 (Quick stabilization)
1. Validation and feedback
   - Define spec-pair and value range contracts (e.g., `Quality: 0..1`, `Temperature > 0K`, finite numeric only).
   - Return actionable errors with reason + guide
     - Example: `Quality must be between 0 and 1.`
     - Example: `Pressure and Temperature pair is outside IF97 region.`
   - Expose disable reason on the calculate button.
2. Runtime safety utilities
   - Add DOM-safe wrapper (`getRequiredElement`) and numeric parser (`parseNumberOrError`).
   - Normalize and validate before `xsteam2` calls.
   - Standardize edge-case handling for `NaN`, `Infinity`, negative pressure, and unsupported route pairs.
3. Tests (first expansion set)
   - Add 10~15 unit tests around validation and guard functions.
   - Include boundary checks for `Quality` (0/1) and empty/invalid inputs.

## Phase 2 (Quality hardening)
1. Pure logic split
   - Separate compute layer from UI layer:
     - `computeByTempPress`
     - `computeByPressQual`
     - `computeByPressEnthalpy`
   - Keep UI layer for input -> compute -> render only.
2. Deterministic test growth
   - Add boundary/fixture tests around saturation points (`Tsat_p`) and mixed quality (`0`, `0.5`, `1`).
   - Add display formatting assertions (`toFixed(2)` consistency).
3. CI improvements
   - Add workflow `concurrency` to cancel redundant runs per PR.
   - Pin tool versions explicitly (Node/pnpm).
   - Add lint job when lint config is introduced.

## Phase 3 (UX polish + accessibility)
1. Execution states
   - Show loading/success/error states on click.
   - Clarify whether previous values are preserved on failure.
2. Accessibility
   - Add `aria-live=\"polite\"` for result/error updates.
   - Toggle `aria-invalid` for invalid numeric fields.
   - Improve keyboard flow (Enter-to-calculate and predictable focus order).
3. Documentation updates
   - Update README/manual examples for new UX and validation behavior.

## TDD execution template (per PR)
1. Add failing test first
2. Implement minimum change to pass
3. Refactor safely
4. Add regression test(s)
5. Record exact commands/results in `docs/test-log.md`

## Test structure target
- `tests/unit/` for pure utilities and compute functions
- `tests/integration/` for minimal UI binding checks
- `tests/fixtures/` for deterministic IF97 sample points

## Verification commands
1. `pnpm test`
2. `pnpm run build`
3. `git diff --check`
4. `git status --short --branch`
