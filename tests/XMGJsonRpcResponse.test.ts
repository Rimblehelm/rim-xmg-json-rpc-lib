import { describe, it, expect } from 'vitest'
import XMGJsonRpcResponse from '../src/XMGJsonRpcResponse'

describe('XMGJsonRpcResponse', () => {
  it('should create a response with result and id', () => {
    const res = new XMGJsonRpcResponse({
      error: null,
      id: 1,
      result: 'result'
    })
    expect(res.result).toBe('result')
    expect(res.id).toBe(1)
  })
})
