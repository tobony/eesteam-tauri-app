# Implementation Plan

## Goal
Systematically improve UX clarity, runtime safety, TDD workflow, and CI efficiency for the steam-table app.

## Scope and principles
- Keep current business calculation behavior compatible unless explicitly changing a known bug.
- Prefer incremental, test-first changes with small reviewable commits.
- Keep UI/DOM handling separate from pure compute logic over time.

## Phase 1 - Quick stabilization (in-flight)
### 1.1 Input contracts and validation
- Define pair-level contract table for supported spec combinations.
- Define value-level constraints:
  - `Quality`: 0..1
  - `Temperature`: finite and > 0 K
  - `Pressure`: finite and >= 0
  - all numeric entries must be finite
- Validation result format: `{ ok: boolean, code: string, message: string, hint?: string }`.

### 1.2 Immediate user feedback
- Show validation failures immediately on calculate button click.
- Include cause + fix guidance in message text.
- Keep previous successful results visible when validation fails.

### 1.3 Runtime guardrails
- Guard unavailable engine methods (`xsteam2.*`) before invocation.
- Convert thrown runtime errors to user-visible status.
- Standardize fallback behavior for unsupported route pairs.

### 1.4 First test expansion
- Unit tests for:
  - clamp quality boundaries
  - invalid/non-finite spec values
  - unsupported route mapping
- Target: minimum 10 assertions across validation/guard modules.

## Phase 2 - Quality hardening
### 2.1 Pure compute extraction
- Extract pure functions from `loadscript.js`:
  - `computeByTempPress`
  - `computeByPressQual`
  - `computeByPressEnthalpy`
- Keep UI layer only for:
  - collect input
  - invoke compute
  - render output/errors

### 2.2 Deterministic test growth
- Add fixture-based tests for representative IF97 points:
  - saturated liquid
  - saturated vapor
  - superheated state
- Add boundary tests around saturation transition and quality `0`, `0.5`, `1`.
- Add formatting tests (`toFixed(2)` consistency) for user-visible fields.

### 2.3 CI upgrades
- Add workflow `concurrency` to cancel redundant runs per PR.
- Keep Node/pnpm versions explicit and stable.
- Add optional lint job when lint config is introduced.

## Phase 3 - UX polish and accessibility
### 3.1 Execution-state UX
- Introduce explicit status lifecycle:
  - `loading`
  - `success`
  - `error`
- Clarify behavior for preserving previous results on failure.

### 3.2 Accessibility
- Add `aria-live="polite"` for status/result updates.
- Toggle `aria-invalid` on invalid input fields.
- Ensure keyboard accessibility (Enter-to-calculate + focus order).

### 3.3 Documentation completion
- Update README and manual snippets to reflect new UX and validation behavior.
- Keep `docs/test-log.md` aligned with actual verification commands/outcomes.

## TDD workflow template (required per logic change)
1. Add failing test first.
2. Implement minimum fix to pass.
3. Refactor safely.
4. Add regression test.
5. Record commands and outcomes in `docs/test-log.md`.

## Deliverable mapping
- Implementation plan source: `docs/implementation-plan.md`
- Status source: `docs/progress-tracker.md`
- Verification source: `docs/test-log.md`

## Verification commands
1. `pnpm test`
2. `pnpm run build`
3. `git diff --check`
4. `git status --short --branch`

## Next execution step (improved, ready to implement)
### Sprint N+1 objective (1 week)
Deliver a safe split between UI and compute paths with measurable tests.

### Task N+1.1 - Contract-first validation module
- Create `src/utils/spec-validation.js` with:
  - `validateSpecValue(type, value)`
  - `validateSpecPairContract(spec1Type, spec2Type)`
  - standardized error codes (`INVALID_NUMBER`, `OUT_OF_RANGE`, `UNSUPPORTED_PAIR`)
- Add unit tests first (target: +8 assertions minimum).
- Acceptance:
  - invalid values produce stable error code + human-readable guidance.
  - all currently supported pairs pass contract checks.

### Task N+1.2 - Compute layer extraction (minimal slice)
- Extract first pure compute functions:
  - `computeByPressQual`
  - `computeByTempPress`
- Keep current output shape unchanged to avoid UI breakage.
- Acceptance:
  - `loadscript.js` route handler delegates these two paths to extracted pure functions.
  - no regression in existing test suite.

### Task N+1.3 - Error-state UX contract
- Define button status contract:
  - `loading`: `Calculating...`
  - `success`: `Results Available`
  - `error`: `Calculation error: <message>`
- Preserve previous successful output on error path.
- Acceptance:
  - status transitions covered by at least 2 integration-like tests (or documented manual checks if DOM harness unavailable).

### Task N+1.4 - CI small hardening
- Add `concurrency` block to `ci-lite` to cancel stale PR runs.
- Keep scope minimal: no new dependencies.
- Acceptance:
  - workflow syntax valid.
  - existing CI steps unchanged and still green.

### N+1 verification gate
1. `pnpm test`
2. `pnpm run build`
3. `git diff --check`
4. update `docs/progress-tracker.md` for N+1 tasks (`In Progress` -> `Done/Blocked`)
5. append command outcomes in `docs/test-log.md`
