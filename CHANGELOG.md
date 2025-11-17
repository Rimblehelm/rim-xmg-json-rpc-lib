# Changelog

## v0.0.4 - 2025-11-17

### Added
- Added multiple repository badges to `README.md`: npm downloads, labels workflow, release, Dependabot status.
- Added CI workflow for coverage and Coveralls reporting (`.github/workflows/coverage.yml`).
- Added manual and automatic labels management workflow (`.github/workflows/labels.yml`) and extended label set.
- Added `CONTRIBUTING.md` with a development checklist and release instructions.
- Added issue templates and a PR template referencing `CONTRIBUTING.md`.
- Added `CHANGELOG.md` (this file).

### Changed
- Bumped package version to `0.0.4` and published to npm.
- Updated `README.md` with badges and contributor guidance.
- Adjusted devDependencies to resolve peer dependency conflicts for a cleaner `npm ci` and updated `package-lock.json`.

### Notes
- `npm ci` now runs without peer dependency resolution errors. The install still shows some deprecation and audit warnings; consider running `npm audit fix` and updating dependencies where feasible.
- If you use Coveralls, add the `COVERALLS_REPO_TOKEN` repository secret to enable uploads from CI.

---

For details on contributing and release process, see `CONTRIBUTING.md`.
