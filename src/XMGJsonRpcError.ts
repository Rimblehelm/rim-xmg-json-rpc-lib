export interface IXMGJsonRpcError {
  code: number
  message: string
}

export default class XMGJsonRpcError implements IXMGJsonRpcError {
  public readonly code: number
  public readonly message: string

  constructor (code: number, message: string) {
    this.code = code
    this.message = message
  }
}
