import XMGJsonRpcError from './XMGJsonRpcError'
export interface IXMGJsonRpcResponse {
  error: XMGJsonRpcError | null
  id: number | string | null
  result: unknown
}
export default class XMGJsonRpcResponse implements IXMGJsonRpcResponse {
  public readonly error: XMGJsonRpcError | null
  public readonly id: number | string | null
  public readonly result: unknown

  constructor (jsonObject?: IXMGJsonRpcResponse) {
    if (jsonObject === undefined || jsonObject === null) {
      this.error = new XMGJsonRpcError(-32700, `Parse error: Invalid JSON was received by the server.\n${jsonObject}`)
      this.id = null
      this.result = null
    } else {
      this.error = null
      this.id = null
      this.result = null

      if (jsonObject?.error !== undefined && jsonObject?.error !== null) {
        this.error = new XMGJsonRpcError(jsonObject.error.code, jsonObject.error.message)
      }

      if (jsonObject?.id !== undefined && jsonObject?.id !== null) {
        this.id = jsonObject.id
      }

      if (jsonObject?.result !== undefined && jsonObject?.result !== null) {
        this.result = jsonObject.result
      }
    }
  }
}
