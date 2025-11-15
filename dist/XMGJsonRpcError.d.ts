export interface IXMGJsonRpcError {
    code: number;
    message: string;
}
export default class XMGJsonRpcError implements IXMGJsonRpcError {
    readonly code: number;
    readonly message: string;
    constructor(code: number, message: string);
}
