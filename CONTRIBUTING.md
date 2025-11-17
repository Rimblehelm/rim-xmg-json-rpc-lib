## Contributing

Thank you for contributing! This project follows a simple checklist to keep CI, coverage, and releases working smoothly.

### Quick checklist

- [ ] Fork the repo and create a feature branch: `git checkout -b feat/your-change`
- [ ] Run lint, typecheck and tests locally:

```
npm ci
npm run lint
npm run typecheck
npm run test
```

- [ ] (Optional) Run coverage locally to inspect reports:

```
npm run coverage
```

- [ ] If you want coverage posted to Coveralls from CI, add the repository secret `COVERALLS_REPO_TOKEN` in GitHub: `Settings → Secrets and variables → Actions → New repository secret`.
- [ ] Ensure GitHub Actions are enabled for the repository (Settings → Actions). The `coverage` workflow runs on push/PR and sends `coverage/lcov.info` to Coveralls.

### Releasing (maintainer)

- Bump the patch version in `package.json` (example):

```
npm version patch
```

- Commit and tag the release, then push commits and tags:

```
git push origin master
git push --tags
```

- Publish to npm (requires maintainer npm login):

```
npm publish --access public
```

### PR process

- Open a pull request against `master` (or the main branch). Describe the change, link any issues, and ensure CI passes.
- A maintainer will review and merge. After merging, the `coverage` workflow will run and update Coveralls if configured.

If you need help, open an issue or reach out on the repository.
