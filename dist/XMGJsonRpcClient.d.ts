import XMGJsonRpcResponse from './XMGJsonRpcResponse';
export default class XMGJsonRpcClient {
    readonly host: string;
    readonly pass?: string;
    readonly port: number;
    readonly user?: string;
    private static idNumber;
    constructor(host: string, port: number, user?: string, pass?: string);
    private rpcCall;
    getAccount(address: string): Promise<XMGJsonRpcResponse>;
    getAccountAddress(account: string): Promise<XMGJsonRpcResponse>;
    getBlock(hashOrHeight: string | number): Promise<XMGJsonRpcResponse>;
    getBlockCount(): Promise<XMGJsonRpcResponse>;
    getBlockHash(height: number): Promise<XMGJsonRpcResponse>;
    getInfo(): Promise<XMGJsonRpcResponse>;
    getMiningByKhps(hashrateInKhps: number, blocks: number): Promise<XMGJsonRpcResponse>;
    getMiningInfo(): Promise<XMGJsonRpcResponse>;
    getTransaction(txid: string): Promise<XMGJsonRpcResponse>;
    validateAddress(address: string): Promise<XMGJsonRpcResponse>;
}
