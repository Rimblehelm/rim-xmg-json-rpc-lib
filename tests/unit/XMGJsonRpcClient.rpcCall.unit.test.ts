import { beforeEach, describe, it, expect, vi } from 'vitest'
import XMGJsonRpcClient from '../../src/XMGJsonRpcClient'

beforeEach(() => {
  vi.restoreAllMocks()
  ;(XMGJsonRpcClient as any).idNumber = 0
})

describe('rpcCall (private) URL and headers handling', () => {
  it('builds URL for host without scheme', async () => {
    const client = new XMGJsonRpcClient('localhost', 8232)

    const mockResponse = new Response(JSON.stringify({ jsonrpc: '2.0', result: null, id: 0 }), { status: 200 })
    const fetchMock = vi.fn().mockResolvedValue(mockResponse)
    ;(global as any).fetch = fetchMock

    await (client as any).rpcCall('getinfo', [])

    expect(fetchMock).toHaveBeenCalled()
    const [url, opts] = fetchMock.mock.calls[0]
    expect(url).toBe('http://localhost:8232')
    expect(opts.method).toBe('POST')
    const body = JSON.parse(opts.body)
    expect(body.method).toBe('getinfo')
    expect(typeof body.id).toBe('number')
  })

  it('appends port when host includes scheme but no port', async () => {
    const client = new XMGJsonRpcClient('http://example.com', 9000)
    const mockResponse = new Response(JSON.stringify({ jsonrpc: '2.0', result: null, id: 0 }), { status: 200 })
    const fetchMock = vi.fn().mockResolvedValue(mockResponse)
    ;(global as any).fetch = fetchMock

    await (client as any).rpcCall('getinfo')
    const [url] = fetchMock.mock.calls[0]
    expect(url).toBe('http://example.com:9000')
  })

  it('uses host as-is when host includes a port', async () => {
    const client = new XMGJsonRpcClient('https://example.com:4443', 9000)
    const mockResponse = new Response(JSON.stringify({ jsonrpc: '2.0', result: null, id: 0 }), { status: 200 })
    const fetchMock = vi.fn().mockResolvedValue(mockResponse)
    ;(global as any).fetch = fetchMock

    await (client as any).rpcCall('getinfo')
    const [url] = fetchMock.mock.calls[0]
    expect(url).toBe('https://example.com:4443')
  })

  it('adds Authorization header when user and pass provided', async () => {
    const client = new XMGJsonRpcClient('localhost', 8232, 'alice', 's3cret')
    const mockResponse = new Response(JSON.stringify({ jsonrpc: '2.0', result: null, id: 0 }), { status: 200 })
    const fetchMock = vi.fn().mockResolvedValue(mockResponse)
    ;(global as any).fetch = fetchMock

    await (client as any).rpcCall('getinfo')
    const opts = fetchMock.mock.calls[0][1]
    const expectedAuth = 'Basic ' + Buffer.from('alice:s3cret').toString('base64')
    expect(opts.headers.Authorization).toBe(expectedAuth)
  })

  it('rethrows fetch/network errors', async () => {
    const client = new XMGJsonRpcClient('localhost', 8232)
    const fetchMock = vi.fn().mockRejectedValue(new Error('network fail'))
    ;(global as any).fetch = fetchMock

    await expect((client as any).rpcCall('getinfo')).rejects.toThrow('network fail')
  })
})

describe('Public wrapper methods that use rpcCall', () => {
  it('getAccountAddress, getBlockCount, getBlockHash, mining and tx methods', async () => {
    const client = new XMGJsonRpcClient('localhost', 8232)

    // Mock rpcCall to return different results based on method
    vi.spyOn(XMGJsonRpcClient.prototype as any, 'rpcCall').mockImplementation(async (method: string, params?: any[]) => {
      let result: any = null
      switch (method) {
        case 'getaccountaddress': result = { address: 'ADDR1' }; break
        case 'getblockcount': result = 1234; break
        case 'getblockhash': result = 'HASH123'; break
        case 'getminingbykhps': result = { mining: true }; break
        case 'getmininginfo': result = { khps: 100 }; break
        case 'gettransaction': result = { txid: 'TX123' }; break
        case 'validateaddress': result = { isvalid: true }; break
        default: result = null
      }
      return new Response(JSON.stringify({ jsonrpc: '2.0', result, id: 1 }), { status: 200 })
    })

    const a = await client.getAccountAddress('acct')
    expect((a.result as any).address).toBe('ADDR1')

    const bc = await client.getBlockCount()
    expect(bc.result).toBe(1234)

    const bh = await client.getBlockHash(42)
    expect(bh.result).toBe('HASH123')

    const mb = await client.getMiningByKhps(10, 2)
    expect((mb.result as any).mining).toBeTruthy()

    const mi = await client.getMiningInfo()
    expect((mi.result as any).khps).toBe(100)

    const tx = await client.getTransaction('txid')
    expect((tx.result as any).txid).toBe('TX123')

    const va = await client.validateAddress('x')
    expect((va.result as any).isvalid).toBe(true)
  })

  it('calls getInfo and returns parsed response', async () => {
    const client = new XMGJsonRpcClient('localhost', 8232)
    vi.spyOn(XMGJsonRpcClient.prototype as any, 'rpcCall').mockImplementation(async (method: string) => {
      expect(method).toBe('getinfo')
      return new Response(JSON.stringify({ jsonrpc: '2.0', result: { version: '1.2.3' }, id: 1 }), { status: 200 })
    })

    const info = await client.getInfo()
    expect((info.result as any).version).toBe('1.2.3')
  })
})
