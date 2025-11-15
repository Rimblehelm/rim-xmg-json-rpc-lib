import './XMGJsonRpcError.test';
import './XMGJsonRpcRequest.test';
import './XMGJsonRpcResponse.test';

describe('rim-xmg-json-rpc-lib', () => {
  it('should run all tests', () => {
    expect(true).toBe(true);
  });
});
import './XMGJsonRpcClient.test';
import './XMGJsonRpcError.test';
import './XMGJsonRpcRequest.test';
import './XMGJsonRpcResponse.test';

describe('rim-xmg-json-rpc-lib', () => {
  it('should have correct env vars for testing', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.RPC_HOST).toBe('localhost');
    expect(process.env.RPC_PORT).toBe('8232');
    expect(process.env.RPC_USER).toBe('rimblehelm');
    expect(process.env.RPC_PASS).toBe('h1h0m1n1ng');
  });
  it('should run all tests', () => {
    expect(true).toBe(true);
  });
});
