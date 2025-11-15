import XMGJsonRpcError from './XMGJsonRpcError';
export interface IXMGJsonRpcResponse {
    error: XMGJsonRpcError | null;
    id: number | string | null;
    result: unknown;
}
export default class XMGJsonRpcResponse implements IXMGJsonRpcResponse {
    readonly error: XMGJsonRpcError | null;
    readonly id: number | string | null;
    readonly result: unknown;
    constructor(jsonObject?: IXMGJsonRpcResponse);
}
