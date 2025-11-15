import { describe, it, expect } from 'vitest'
import XMGJsonRpcClient from '../src/XMGJsonRpcClient'
import { config } from 'dotenv'

config({ path: '.env.testing' })

const host = process.env.RPC_HOST ?? 'localhost'
const port = process.env.RPC_PORT ?? '8232'
const user = process.env.RPC_USER ?? ''
const pass = process.env.RPC_PASS ?? ''

describe('XMGJsonRpcClient', () => {
  it('should instantiate correctly with env vars', () => {
    const client = new XMGJsonRpcClient(host, Number(port), user, pass)
    expect(client).toBeInstanceOf(XMGJsonRpcClient)
  })
  // Add more tests for request, error handling, etc.
})
