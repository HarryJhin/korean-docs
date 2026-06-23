import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const wfUrl = new URL('../workflows/korean-docs.js', import.meta.url)
const src = readFileSync(wfUrl, 'utf8')

test('workflow syntax is valid', () => {
  execFileSync(process.execPath, ['--check', wfUrl.pathname]) // 구문 오류 시 throw
})
test('workflow declares meta and 7 phases', () => {
  assert.match(src, /export const meta/)
  for (const p of ['스코프','리서치','사실 검증','초안','문체 교정','자연스러움 검증','조립']) {
    assert.ok(src.includes(p), `phase ${p} missing`)
  }
})
test('workflow wires bundled agents', () => {
  assert.ok(src.includes("agentType: 'fact-verifier'"))
  assert.ok(src.includes("agentType: 'prose-editor'"))
  assert.ok(src.includes("agentType: 'naturalness-reviewer'"))
})
test('workflow has no forbidden runtime APIs', () => {
  assert.ok(!/\bimport\s/.test(src), 'no import')
  assert.ok(!/\brequire\(/.test(src), 'no require')
  assert.ok(!/Date\.now|Math\.random/.test(src), 'no Date.now/Math.random')
})
