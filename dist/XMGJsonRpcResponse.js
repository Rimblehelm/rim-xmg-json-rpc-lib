import XMGJsonRpcError from './XMGJsonRpcError';
export default class XMGJsonRpcResponse {
    constructor(jsonObject) {
        if (jsonObject === undefined || jsonObject === null) {
            this.error = new XMGJsonRpcError(-32700, `Parse error: Invalid JSON was received by the server.\n${jsonObject}`);
            this.id = null;
            this.result = null;
        }
        else {
            this.error = null;
            this.id = null;
            this.result = null;
            if ((jsonObject === null || jsonObject === void 0 ? void 0 : jsonObject.error) !== undefined && (jsonObject === null || jsonObject === void 0 ? void 0 : jsonObject.error) !== null) {
                this.error = new XMGJsonRpcError(jsonObject.error.code, jsonObject.error.message);
            }
            if ((jsonObject === null || jsonObject === void 0 ? void 0 : jsonObject.id) !== undefined && (jsonObject === null || jsonObject === void 0 ? void 0 : jsonObject.id) !== null) {
                this.id = jsonObject.id;
            }
            if ((jsonObject === null || jsonObject === void 0 ? void 0 : jsonObject.result) !== undefined && (jsonObject === null || jsonObject === void 0 ? void 0 : jsonObject.result) !== null) {
                this.result = jsonObject.result;
            }
        }
    }
}
//# sourceMappingURL=XMGJsonRpcResponse.js.map