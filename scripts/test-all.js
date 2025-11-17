#!/usr/bin/env node
const { spawnSync } = require('child_process')

function run(cmd, args) {
  const res = spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' })
  return res.status
}

async function main() {
  // Run unit tests first
  console.log('Running unit tests...')
  const u = run('npm', ['run', 'test:unit'])
  if (u !== 0) process.exit(u)

  // Conditionally run integration tests only if RPC env is present
  const host = process.env.RPC_HOST
  const port = process.env.RPC_PORT
  if (host && port) {
    console.log('RPC env detected — running integration tests...')
    const i = run('npm', ['run', 'test:integration'])
    if (i !== 0) process.exit(i)
  } else {
    console.log('RPC env not set — skipping integration tests.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
