export interface IXMGJsonRpcRequest {
    readonly id: number | string;
    readonly jsonrpc: string;
    readonly method: string;
    readonly params?: unknown;
}
export default class XMGJsonRpcRequest implements IXMGJsonRpcRequest {
    readonly id: number | string;
    readonly jsonrpc: string;
    readonly method: string;
    readonly params?: unknown;
    constructor(options: IXMGJsonRpcRequest);
}
