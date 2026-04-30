# Implementation Plan

## Goal
Improve app UX, JavaScript error prevention, and testability using incremental TDD-friendly changes.

## Step 1 - Planning and tracking setup
- Mark tracker items as `In Progress`.
- Define execution sequence, verification commands, and completion criteria.
- Commit planning artifacts only.

## Step 2 - UX and runtime-safety improvements
- Add explicit validation for unsupported inputs before running IF97 calculations.
- Show user-visible error messages on invalid inputs.
- Fix spec routing bug for `(Entropy, Temp.)` pair.
- Reuse `blendByQuality` helper for remaining mixed-state calculations.
- Commit code changes with focused scope.

## Step 3 - TDD and unit-test expansion
- Add unit tests for validation and routing helpers.
- Keep existing `node --test` runner.
- Ensure tests remain deterministic and runner-independent.
- Commit tests and documentation updates.

## Step 4 - CI and documentation alignment
- Update CI to run tests/build/diff checks for relevant pull requests.
- Sync README/testing guideline/progress tracker/test log with actual commands and outcomes.
- Final commit and report.

## Verification commands
1. `pnpm test`
2. `pnpm run build`
3. `git diff --check`
4. `git status --short --branch`
