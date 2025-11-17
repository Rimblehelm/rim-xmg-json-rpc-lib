
# rim-xmg-json-rpc-lib

## Badges

[![npm version](https://img.shields.io/npm/v/rim-xmg-json-rpc-lib.svg)](https://www.npmjs.com/package/rim-xmg-json-rpc-lib)
[![npm downloads (weekly)](https://img.shields.io/npm/dw/rim-xmg-json-rpc-lib.svg)](https://www.npmjs.com/package/rim-xmg-json-rpc-lib)
[![build](https://github.com/Rimblehelm/rim-xmg-json-rpc-lib/actions/workflows/ci.yml/badge.svg)](https://github.com/Rimblehelm/rim-xmg-json-rpc-lib/actions)
[![tests](https://github.com/Rimblehelm/rim-xmg-json-rpc-lib/actions/workflows/test.yml/badge.svg)](https://github.com/Rimblehelm/rim-xmg-json-rpc-lib/actions)
[![coverage (Coveralls)](https://coveralls.io/repos/github/Rimblehelm/rim-xmg-json-rpc-lib/badge.svg?branch=master)](https://coveralls.io/github/Rimblehelm/rim-xmg-json-rpc-lib?branch=master)
[![coverage (workflow)](https://github.com/Rimblehelm/rim-xmg-json-rpc-lib/actions/workflows/coverage.yml/badge.svg)](https://github.com/Rimblehelm/rim-xmg-json-rpc-lib/actions/workflows/coverage.yml)
[![labels workflow](https://github.com/Rimblehelm/rim-xmg-json-rpc-lib/actions/workflows/labels.yml/badge.svg)](https://github.com/Rimblehelm/rim-xmg-json-rpc-lib/actions/workflows/labels.yml)
[![release](https://img.shields.io/github/v/release/Rimblehelm/rim-xmg-json-rpc-lib.svg)](https://github.com/Rimblehelm/rim-xmg-json-rpc-lib/releases/latest)
[![dependabot status](https://img.shields.io/badge/dependabot-up--to--date-brightgreen.svg)](https://github.com/Rimblehelm/rim-xmg-json-rpc-lib/security/dependabot)
[![license](https://img.shields.io/github/license/Rimblehelm/rim-xmg-json-rpc-lib.svg)](LICENSE)

> Contribution guidelines: see `CONTRIBUTING.md` for the development checklist, tests, linting and release steps.

### Coverage badge note

- **Coveralls badge:** points to the Coveralls report for this repository at `https://coveralls.io/github/Rimblehelm/rim-xmg-json-rpc-lib`. It displays the most recent coverage summary reported by the workflow.
- **Coverage workflow badge:** links to the GitHub Actions run for `.github/workflows/coverage.yml`, which runs tests with coverage and posts `coverage/lcov.info` to Coveralls.

To allow the workflow to submit coverage to Coveralls, add a repository secret named `COVERALLS_REPO_TOKEN` in the GitHub repository settings (Settings → Secrets → Actions). You can obtain the token from your Coveralls project settings if required. Public repositories sometimes allow reporting without a token, but adding the secret ensures reliable uploads.

### Enable Actions & add the secret (quick checklist)

- [ ] Enable GitHub Actions for this repository (Repository Settings → Actions). Most repos have Actions enabled by default.
- [ ] Add a repository secret named `COVERALLS_REPO_TOKEN` (Settings → Secrets and variables → Actions → New repository secret). If required, get the token from your Coveralls project page: `https://coveralls.io/github/Rimblehelm/rim-xmg-json-rpc-lib`.
- [ ] Trigger the `coverage` workflow by pushing a commit or opening a PR; confirm the run under the Actions tab and that the Coveralls badge updates.
[![GitHub stars](https://img.shields.io/github/stars/Rimblehelm/rim-xmg-json-rpc-lib.svg?style=social)](https://github.com/Rimblehelm/rim-xmg-json-rpc-lib/stargazers)

A TypeScript library for interacting with Coin Magi (XMG) JSON-RPC endpoints. Provides client, request, response, and error handling utilities for building applications and tools that communicate with XMG nodes.

## Features
- Type-safe JSON-RPC client for XMG
- Request and response models
- Error handling utilities
- Fully typed interfaces
- Easy integration with Node.js and browser environments

## Installation

```bash
npm install rim-xmg-json-rpc-lib
```

## Usage

### Importing
```typescript
import {
  XMGJsonRpcClient,
  XMGJsonRpcError,
  XMGJsonRpcRequest,
  XMGJsonRpcResponse
} from 'rim-xmg-json-rpc-lib';
```

### Creating a Client
```typescript
const client = new XMGJsonRpcClient('localhost', 8232, 'rpcuser', 'rpcpassword');
```

### Making Requests
```typescript
// Get account info
const response = await client.getAccount('XMG_ADDRESS');
console.log(response.result);
```

## API Reference

### Classes
- **XMGJsonRpcClient**: Main client for making RPC calls.
  - `getAccount(address: string): Promise<XMGJsonRpcResponse>`
  - `getAccountAddress(account: string): Promise<XMGJsonRpcResponse>`
  - `getBlock(hashOrHeight: string | number): Promise<XMGJsonRpcResponse>`
  - `getBlockCount(): Promise<XMGJsonRpcResponse>`
  - `getBlockHash(height: number): Promise<XMGJsonRpcResponse>`
  - `getInfo(): Promise<XMGJsonRpcResponse>`
  - `getMiningByKhps(hashrateInKhps: number, blocks: number): Promise<XMGJsonRpcResponse>`
  - `getMiningInfo(): Promise<XMGJsonRpcResponse>`
  - `getTransaction(txid: string): Promise<XMGJsonRpcResponse>`
  - `validateAddress(address: string): Promise<XMGJsonRpcResponse>`

- **XMGJsonRpcRequest**: Model for JSON-RPC requests.
- **XMGJsonRpcResponse**: Model for JSON-RPC responses.
- **XMGJsonRpcError**: Error model for JSON-RPC errors.

### Interfaces
- `IXMGJsonRpcRequest`
- `IXMGJsonRpcResponse`
- `IXMGJsonRpcError`

## Development

- Source code: [`src/`](src/)
- Build: `npm run build`
- Lint: `npm run lint`
- Test: `npm run test` (uses Vitest, see `.env.testing` for test environment)

## License

MIT

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss major changes first.

## Author

- [rimblehelm](https://github.com/rimblehelm)

## Support

For questions or support, open an issue on GitHub or contact the maintainer.
