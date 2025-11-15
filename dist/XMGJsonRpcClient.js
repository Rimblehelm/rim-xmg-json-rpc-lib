import XMGJsonRpcResponse from './XMGJsonRpcResponse';
class XMGJsonRpcClient {
    constructor(host, port, user, pass) {
        console.log('[XMGJsonRpcClient] host:', host);
        console.log('[XMGJsonRpcClient] port:', port);
        if (typeof user === 'string' && user.length > 0) {
            console.log('[XMGJsonRpcClient] user:', user);
        }
        if (typeof pass === 'string' && pass.length > 0) {
            console.log('[XMGJsonRpcClient] pass:', pass);
        }
        this.host = host;
        this.port = port;
        this.user = user;
        this.pass = pass;
    }
    async rpcCall(method, params = []) {
        const body = {
            jsonrpc: '2.0',
            id: XMGJsonRpcClient.idNumber++,
            method,
            params
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        if (typeof this.user === 'string' && this.user.length > 0 && typeof this.pass === 'string' && this.pass.length > 0) {
            const auth = Buffer.from(this.user + ':' + this.pass).toString('base64');
            headers.Authorization = 'Basic ' + auth;
        }
        let url;
        // If host already includes scheme, use as full URL
        if (/^https?:\/\//i.test(this.host)) {
            // If port is not in host, append it
            const hasPort = /:[0-9]+/.test(this.host);
            url = hasPort ? this.host : `${this.host}:${this.port}`;
        }
        else {
            url = `http://${this.host}:${this.port}`;
        }
        console.log('[XMGJsonRpcClient] RPC endpoint URL:', url);
        try {
            return await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });
        }
        catch (err) {
            console.error('[XMGJsonRpcClient] Fetch failed for URL:', url);
            console.error('[XMGJsonRpcClient] Error:', err);
            throw err;
        }
    }
    async getAccount(address) {
        const response = await this.rpcCall('getaccount', [address]);
        const data = await response.json();
        return new XMGJsonRpcResponse(data);
    }
    async getAccountAddress(account) {
        const response = await this.rpcCall('getaccountaddress', [account]);
        const data = await response.json();
        return new XMGJsonRpcResponse(data);
    }
    async getBlock(hashOrHeight) {
        const params = typeof hashOrHeight === 'number'
            ? [Number(hashOrHeight), false]
            : [String(hashOrHeight), false];
        const response = await this.rpcCall('getblock', params);
        const data = await response.json();
        return new XMGJsonRpcResponse(data);
    }
    async getBlockCount() {
        const response = await this.rpcCall('getblockcount');
        const data = await response.json();
        return new XMGJsonRpcResponse(data);
    }
    async getBlockHash(height) {
        const response = await this.rpcCall('getblockhash', [height]);
        const data = await response.json();
        return new XMGJsonRpcResponse(data);
    }
    async getInfo() {
        const response = await this.rpcCall('getinfo');
        const data = await response.json();
        return new XMGJsonRpcResponse(data);
    }
    async getMiningByKhps(hashrateInKhps, blocks) {
        const response = await this.rpcCall('getminingbykhps', [hashrateInKhps, blocks]);
        const data = await response.json();
        return new XMGJsonRpcResponse(data);
    }
    async getMiningInfo() {
        const response = await this.rpcCall('getmininginfo');
        const data = await response.json();
        return new XMGJsonRpcResponse(data);
    }
    async getTransaction(txid) {
        const response = await this.rpcCall('gettransaction', [txid]);
        const data = await response.json();
        return new XMGJsonRpcResponse(data);
    }
    async validateAddress(address) {
        const response = await this.rpcCall('validateaddress', [address]);
        const data = await response.json();
        return new XMGJsonRpcResponse(data);
    }
}
XMGJsonRpcClient.idNumber = 0;
export default XMGJsonRpcClient;
//# sourceMappingURL=XMGJsonRpcClient.js.map