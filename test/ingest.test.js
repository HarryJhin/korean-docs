import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractTitle, splitSections, parseSources } from '../lib/ingest.js'

const DOC = [
  '# Array.prototype.flat() 레퍼런스',
  '',
  '## 개요',
  '',
  'flat은 중첩 배열을 평탄화한다 [1].',
  '',
  '## 시그니처',
  '',
  '`arr.flat(depth)` 형태다 [2].',
  '',
  '## 출처',
  '',
  '[1] https://example.com/a',
  '[2] https://example.com/b',
  '',
].join('\n')

test('extractTitle returns the first H1 text', () => {
  assert.equal(extractTitle(DOC), 'Array.prototype.flat() 레퍼런스')
  assert.equal(extractTitle('본문만 있음'), null)
})

test('splitSections splits by H2 and excludes the sources section', () => {
  const secs = splitSections(DOC)
  assert.deepEqual(secs.map(s => s.title), ['개요', '시그니처'])
  assert.match(secs[0].markdown, /평탄화한다 \[1\]\./)
  assert.ok(!secs[0].markdown.startsWith('##'), 'heading line stripped from body')
})

test('parseSources maps citation numbers to URLs', () => {
  const src = parseSources(DOC)
  assert.equal(src.get(1), 'https://example.com/a')
  assert.equal(src.get(2), 'https://example.com/b')
  assert.equal(src.size, 2)
})

test('parseSources is empty when no sources block', () => {
  assert.equal(parseSources('## 개요\n\n본문').size, 0)
})
