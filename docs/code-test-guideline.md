# Code Test Guideline

## Scope
- Apply tests based on changed surface: UI wiring, property calculations, and build pipeline.

## Minimum checks
1. `pnpm install --frozen-lockfile`
2. `pnpm run build`
3. `git diff --check`

## Logic verification for steam calculations
- Prefer deterministic checks for `xsteam2` inputs and outputs.
- Add fixture-based assertions for representative states:
  - Saturated liquid around low pressure
  - Saturated vapor around low pressure
  - Superheated vapor point
- Keep tolerance explicit (for example absolute error <= `1e-6` for helper math, UI output rounded to 2 decimals).

## UI interaction smoke checks
- Ensure invalid numeric input is handled with user-facing Korean message.
- Ensure pressure/temperature and pressure/quality flows update all property sections without blanking computed totals.

## CI expectation
- CI should run only fast and deterministic checks by default (`build` + whitespace check).
- Heavier host-dependent checks (Tauri runtime, packaging) should stay manual unless runner setup exists.

## Logging verification results
- Record exact command lines and outcomes in `docs/test-log.md`.
- Mark final status in `docs/progress-tracker.md`.
