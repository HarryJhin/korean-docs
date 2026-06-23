import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const skill = readFileSync(new URL('../skills/write-korean-docs/SKILL.md', import.meta.url), 'utf8')

test('pre-flight skill has valid frontmatter', () => {
  assert.match(skill, /^---/)
  assert.match(skill, /name:\s*write-korean-docs/)
  assert.match(skill, /description:\s*\S+/)
})

test('pre-flight skill stays independent (no personal global config)', () => {
  assert.ok(!/writing-korean-prose/.test(skill), 'must not reference a personal skill')
})

test('pre-flight skill points at the /korean-docs workflow and warns about cost', () => {
  assert.ok(skill.includes('/korean-docs'), 'references the workflow command')
  assert.ok(skill.includes('비용'), 'includes a cost warning')
})
