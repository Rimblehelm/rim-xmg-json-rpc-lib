import { describe, it, expect } from 'vitest'
import XMGJsonRpcRequest from '../src/XMGJsonRpcRequest'

describe('XMGJsonRpcRequest', () => {
  it('should create a request with method and params', () => {
    const req = new XMGJsonRpcRequest({
      id: 1,
      jsonrpc: '2.0',
      method: 'testMethod',
      params: [1, 2]
    })
    expect(req.method).toBe('testMethod')
    expect(req.params).toEqual([1, 2])
  })
})
