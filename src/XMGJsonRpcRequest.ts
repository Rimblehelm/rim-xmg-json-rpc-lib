export interface IXMGJsonRpcRequest {
  readonly id: number | string
  readonly jsonrpc: string
  readonly method: string
  readonly params?: unknown
}

export default class XMGJsonRpcRequest implements IXMGJsonRpcRequest {
  public readonly id: number | string
  public readonly jsonrpc: string
  public readonly method: string
  public readonly params?: unknown

  constructor (options: IXMGJsonRpcRequest) {
    this.id = options.id
    this.jsonrpc = options.jsonrpc
    this.method = options.method
    this.params = options.params
  }
}
