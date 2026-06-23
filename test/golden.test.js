import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { proseScore } from '../lib/prose-checks.js'

test('golden reference doc passes S1 prose checks', () => {
  const doc = readFileSync(new URL('./fixtures/golden-reference.md', import.meta.url), 'utf8')
  const r = proseScore(doc)
  assert.equal(r.clean, true, JSON.stringify(r.s1))
})
