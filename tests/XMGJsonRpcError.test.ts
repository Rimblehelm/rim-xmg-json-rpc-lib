import { describe, it, expect } from 'vitest'
import XMGJsonRpcError from '../src/XMGJsonRpcError'

describe('XMGJsonRpcError', () => {
  it('should create error with message and code', () => {
    const error = new XMGJsonRpcError(123, 'Test error')
    expect(error.message).toBe('Test error')
    expect(error.code).toBe(123)
  })
})
