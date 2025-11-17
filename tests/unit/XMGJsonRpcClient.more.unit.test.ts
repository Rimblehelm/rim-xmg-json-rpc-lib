import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import XMGJsonRpcClient from '../../src/XMGJsonRpcClient'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('XMGJsonRpcClient additional methods (unit, mocked)', () => {
  it('should call getBlock with numeric height and parse result', async () => {
    const mockedResponse = new Response(JSON.stringify({ jsonrpc: '2.0', result: { blocks: 100 }, id: 1 }), { status: 200 })
    vi.spyOn(XMGJsonRpcClient.prototype as any, 'rpcCall').mockImplementation(async (method: string, params: any[]) => {
      expect(method).toBe('getblock')
      // numeric height uses [Number, false]
      expect(Array.isArray(params)).toBeTruthy()
      return mockedResponse
    })

    const client = new XMGJsonRpcClient('localhost', 8232)
    const res = await client.getBlock(123)
    expect(res.result.blocks).toBe(100)
  })

  it('should call getBlock with string hash and parse result', async () => {
    const mockedResponse = new Response(JSON.stringify({ jsonrpc: '2.0', result: { hash: 'abc' }, id: 2 }), { status: 200 })
    vi.spyOn(XMGJsonRpcClient.prototype as any, 'rpcCall').mockImplementation(async (method: string, params: any[]) => {
      expect(method).toBe('getblock')
      // string hash uses [String, false]
      expect(typeof params[0]).toBe('string')
      return mockedResponse
    })

    const client = new XMGJsonRpcClient('localhost', 8232)
    const res = await client.getBlock('0xdeadbeef')
    expect((res.result as any).hash).toBe('abc')
  })

  it('propagates fetch/rpc errors from rpcCall', async () => {
    vi.spyOn(XMGJsonRpcClient.prototype as any, 'rpcCall').mockImplementation(async () => { throw new Error('network') })
    const client = new XMGJsonRpcClient('localhost', 8232)
    await expect(client.getInfo()).rejects.toThrow('network')
  })
})
