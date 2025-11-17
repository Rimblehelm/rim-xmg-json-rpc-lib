import { describe, it, expect } from 'vitest'
import XMGJsonRpcError from '../../src/XMGJsonRpcError'

describe('XMGJsonRpcError', () => {
  it('should set code and message properties', () => {
    const err = new XMGJsonRpcError(-1, 'Test error')
    expect(err.code).toBe(-1)
    expect(err.message).toBe('Test error')
  })
})
