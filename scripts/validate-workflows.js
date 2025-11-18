#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const yaml = require('yaml')

const workflowsDir = path.join(__dirname, '..', '.github', 'workflows')

function findYamlFiles(dir) {
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.yml') || f.endsWith('.yaml'))
    .map(f => path.join(dir, f))
}

const files = findYamlFiles(workflowsDir)
if (files.length === 0) {
  console.log('No workflow files found in', workflowsDir)
  process.exit(0)
}

let errors = 0
for (const file of files) {
  const rel = path.relative(process.cwd(), file)
  process.stdout.write(`== ${rel} ==\n`)
  try {
    const content = fs.readFileSync(file, 'utf8')
    // parse to detect syntax errors
    yaml.parse(content)
    console.log('OK')
  } catch (err) {
    errors++
    console.log('ERROR:')
    console.log(err.message)
  }
}

if (errors) {
  console.error(`\nValidation failed: ${errors} file(s) have YAML errors.`)
  process.exit(2)
} else {
  console.log('\nAll workflow YAML files parsed OK.')
  process.exit(0)
}
