import XMGJsonRpcResponse from './XMGJsonRpcResponse'
import type { IXMGJsonRpcResponse } from './XMGJsonRpcResponse'

export default class XMGJsonRpcClient {
  public readonly host: string
  public readonly pass?: string
  public readonly port: number
  public readonly user?: string

  private static idNumber: number = 0

  constructor (host: string, port: number, user?: string, pass?: string) {
    console.log('[XMGJsonRpcClient] host:', host)
    console.log('[XMGJsonRpcClient] port:', port)
    if (typeof user === 'string' && user.length > 0) {
      console.log('[XMGJsonRpcClient] user:', user)
    }
    if (typeof pass === 'string' && pass.length > 0) {
      console.log('[XMGJsonRpcClient] pass:', pass)
    }
    this.host = host
    this.port = port
    this.user = user
    this.pass = pass
  }

  private async rpcCall (method: string, params: unknown[] = []): Promise<Response> {
    const body = {
      jsonrpc: '2.0',
      id: XMGJsonRpcClient.idNumber++,
      method,
      params
    }
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    if (typeof this.user === 'string' && this.user.length > 0 && typeof this.pass === 'string' && this.pass.length > 0) {
      const auth = Buffer.from(this.user + ':' + this.pass).toString('base64')
      headers.Authorization = 'Basic ' + auth
    }

    let url: string
    // If host already includes scheme, use as full URL
    if (/^https?:\/\//i.test(this.host)) {
      // If port is not in host, append it
      const hasPort = /:[0-9]+/.test(this.host)
      url = hasPort ? this.host : `${this.host}:${this.port}`
    } else {
      url = `http://${this.host}:${this.port}`
    }
    console.log('[XMGJsonRpcClient] RPC endpoint URL:', url)
    try {
      return await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      })
    } catch (err) {
      console.error('[XMGJsonRpcClient] Fetch failed for URL:', url)
      console.error('[XMGJsonRpcClient] Error:', err)
      throw err
    }
  }

  public async getAccount (address: string): Promise<XMGJsonRpcResponse> {
    const response = await this.rpcCall('getaccount', [address])
    const data: IXMGJsonRpcResponse = await response.json()
    return new XMGJsonRpcResponse(data)
  }

  public async getAccountAddress (account: string): Promise<XMGJsonRpcResponse> {
    const response = await this.rpcCall('getaccountaddress', [account])
    const data: IXMGJsonRpcResponse = await response.json()
    return new XMGJsonRpcResponse(data)
  }

  public async getBlock (hashOrHeight: string | number): Promise<XMGJsonRpcResponse> {
    const params = typeof hashOrHeight === 'number'
      ? [Number(hashOrHeight), false]
      : [String(hashOrHeight), false]
    const response = await this.rpcCall('getblock', params)
    const data: IXMGJsonRpcResponse = await response.json()
    return new XMGJsonRpcResponse(data)
  }

  public async getBlockCount (): Promise<XMGJsonRpcResponse> {
    const response = await this.rpcCall('getblockcount')
    const data: IXMGJsonRpcResponse = await response.json()
    return new XMGJsonRpcResponse(data)
  }

  public async getBlockHash (height: number): Promise<XMGJsonRpcResponse> {
    const response = await this.rpcCall('getblockhash', [height])
    const data: IXMGJsonRpcResponse = await response.json()
    return new XMGJsonRpcResponse(data)
  }

  public async getInfo (): Promise<XMGJsonRpcResponse> {
    const response = await this.rpcCall('getinfo')
    const data: IXMGJsonRpcResponse = await response.json()
    return new XMGJsonRpcResponse(data)
  }

  public async getMiningByKhps (hashrateInKhps: number, blocks: number): Promise<XMGJsonRpcResponse> {
    const response = await this.rpcCall('getminingbykhps', [hashrateInKhps, blocks])
    const data: IXMGJsonRpcResponse = await response.json()
    return new XMGJsonRpcResponse(data)
  }

  public async getMiningInfo (): Promise<XMGJsonRpcResponse> {
    const response = await this.rpcCall('getmininginfo')
    const data: IXMGJsonRpcResponse = await response.json()
    return new XMGJsonRpcResponse(data)
  }

  public async getTransaction (txid: string): Promise<XMGJsonRpcResponse> {
    const response = await this.rpcCall('gettransaction', [txid])
    const data: IXMGJsonRpcResponse = await response.json()
    return new XMGJsonRpcResponse(data)
  }

  public async validateAddress (address: string): Promise<XMGJsonRpcResponse> {
    const response = await this.rpcCall('validateaddress', [address])
    const data: IXMGJsonRpcResponse = await response.json()
    return new XMGJsonRpcResponse(data)
  }
}
