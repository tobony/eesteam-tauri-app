# eeSteam App

## Development
```bash
pnpm install
pnpm tauri dev
```

## Build
```bash
pnpm tauri build
```

## Testing and checks
```bash
pnpm run lint
pnpm test
pnpm run build
git diff --check
```

Detailed testing policy is documented in `docs/code-test-guideline.md`.

## CI
- Lightweight CI workflow is defined in `.github/workflows/ci-lite.yml`.
- It runs fast checks (`pnpm install --frozen-lockfile`, `pnpm run build`, `git diff --check`).

## Install App
Install `/version/eeSteam_0.9.5_x64-setup.exe`.

<img width="500" alt="image" src="https://github.com/user-attachments/assets/f2032e5f-5715-4987-9844-1b26133cdf7f">


## Manual Release (Tauri, Windows)
Run `.github/workflows/manual-release-tauri.yml` via **Actions > manual-release-tauri > Run workflow**.

Required input:
- `tag_name` (example: `v0.1.0`)

Optional inputs:
- `release_name`
- `target_commitish` (default: `main`)
- `draft`
- `prerelease`

The workflow builds Tauri on `windows-latest`, collects bundle artifacts (`.msi/.exe/.zip/.msix`) via glob search, renames them with the tag suffix, uploads them to GitHub Release, and writes uploaded file paths to the step summary.
