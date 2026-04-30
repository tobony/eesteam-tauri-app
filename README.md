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
