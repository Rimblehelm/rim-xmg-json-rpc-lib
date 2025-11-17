import { describe, it, expect } from 'vitest'
import XMGJsonRpcResponse from '../../src/XMGJsonRpcResponse'

describe('XMGJsonRpcResponse', () => {
  it('constructs a parse-error response when undefined is provided', () => {
    const res = new XMGJsonRpcResponse(undefined as any)
    expect(res.error).not.toBeNull()
    expect(res.id).toBeNull()
    expect(res.result).toBeNull()
    expect(res.error?.code).toBe(-32700)
  })

  it('maps error fields when provided', () => {
    const payload: any = { error: { code: -5, message: 'Something bad' }, id: 42 }
    const res = new XMGJsonRpcResponse(payload)
    expect(res.error).not.toBeNull()
    expect(res.error?.code).toBe(-5)
    expect(res.error?.message).toBe('Something bad')
    expect(res.id).toBe(42)
  })

  it('maps result and id when provided', () => {
    const payload: any = { result: { ok: true }, id: 'abc' }
    const res = new XMGJsonRpcResponse(payload)
    expect(res.error).toBeNull()
    expect(res.result).toEqual({ ok: true })
    expect(res.id).toBe('abc')
  })
})
