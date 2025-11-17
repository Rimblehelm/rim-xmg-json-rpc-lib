import { describe, it, expect } from 'vitest'
import XMGJsonRpcClient from '../../src/XMGJsonRpcClient'

// Integration tests require a running RPC daemon and the following env vars:
// RPC_HOST, RPC_PORT, RPC_USER, RPC_PASS
const host = process.env.RPC_HOST
const port = process.env.RPC_PORT ? Number(process.env.RPC_PORT) : undefined
const user = process.env.RPC_USER
const pass = process.env.RPC_PASS

if (!host || !port) {
  // Skip integration tests when environment is not configured.
  describe.skip('XMGJsonRpcClient integration (skipped, requires RPC env)', () => {
    it('skipped', () => {})
  })
} else {
  describe('XMGJsonRpcClient integration (requires RPC)', () => {
    it('can call getblockcount from a real daemon', async () => {
      const client = new XMGJsonRpcClient(host, port, user, pass)
      const res = await client.getBlockCount()
      // Expect a numeric result when daemon responds correctly
      expect(typeof res.result).toBe('number')
    })
  })
}
