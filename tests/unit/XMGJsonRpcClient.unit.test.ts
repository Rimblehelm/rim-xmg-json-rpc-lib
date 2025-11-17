import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import XMGJsonRpcClient from '../../src/XMGJsonRpcClient'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('XMGJsonRpcClient (unit, mocked)', () => {
  it('should instantiate and call getAccount using a mocked rpcCall', async () => {
    const port = 8232

    // Spy on the private rpcCall method and return a mocked Response
    const mockResponseBody = { jsonrpc: '2.0', result: { balance: 42 }, id: 1 }
    const mockedResponse = new Response(JSON.stringify(mockResponseBody), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

    vi.spyOn(XMGJsonRpcClient.prototype as any, 'rpcCall').mockImplementation(async () => mockedResponse)

    const client = new XMGJsonRpcClient('localhost', port, 'user', 'pass')
    const res = await client.getAccount('SOME_ADDRESS')
    expect(res.result.balance).toBe(42)
  })
})
