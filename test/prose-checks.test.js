import { test } from 'node:test'
import assert from 'node:assert/strict'
import { detectS1, countS2, proseScore, stripCode } from '../lib/prose-checks.js'

test('detectS1 flags em-dash and emoji', () => {
  const ids = detectS1('이것은 — 삽입구 🚀 입니다').map(x => x.id)
  assert.ok(ids.includes('em-dash'))
  assert.ok(ids.includes('emoji'))
})

test('detectS1 flags double passive', () => {
  assert.ok(detectS1('이 값은 판단되어진다').some(x => x.id === 'double-passive'))
})

test('stripCode removes fenced and inline code', () => {
  const s = stripCode('문장 ```\nconst a=1;\n``` 그리고 `x;` 끝')
  assert.ok(!s.includes('const a'))
  assert.ok(!s.includes('x;'))
})

test('proseScore is clean on natural Korean', () => {
  assert.equal(proseScore('이 함수는 사용자 ID를 받아 이름을 반환한다.').clean, true)
})

test('semicolons inside code are not flagged', () => {
  assert.equal(proseScore('설명입니다.\n```js\nconst a = 1;\n```\n').clean, true)
})

test('countS2 counts translationese markers', () => {
  const c = countS2('데이터를 통해 분석하고 결과에 대해 논의한다')
  assert.ok(c.through >= 1 && c.about >= 1)
})
