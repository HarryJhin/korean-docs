// S1(결정적): 한 번만 나와도 AI 티가 확정되는 패턴. 코드 제외한 산문에만 적용.
export const S1_PATTERNS = [
  { id: 'em-dash', name: 'em dash 삽입구', regex: /—/g },
  { id: 'emoji', name: '이모지 장식', regex: /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/gu },
  { id: 'semicolon', name: '세미콜론(산문 부적합)', regex: /;/g },
  { id: 'double-passive', name: '이중 피동(되어진다/지게 된다)', regex: /(되어[지진]|지게\s*된)/g },
]

// S2(밀도): 1~2회는 자연스러우나 3회+ 누적 시 번역투.
export const S2_MARKERS = [
  { id: 'about', regex: /에\s*대(?:해서?|하여)/g },
  { id: 'through', regex: /(?:을|를)\s*통(?:해|하여)/g },
  { id: 'byPassive', regex: /에\s*의해/g },
  { id: 'can', regex: /\s수\s*있/g },
]

export function stripCode(text) {
  return text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')
}

export function detectS1(text) {
  return S1_PATTERNS.map(p => {
    const matches = [...text.matchAll(p.regex)].map(m => ({ index: m.index, text: m[0] }))
    return { id: p.id, name: p.name, count: matches.length, matches }
  }).filter(r => r.count > 0)
}

export function countS2(text) {
  const counts = {}
  for (const m of S2_MARKERS) counts[m.id] = [...text.matchAll(m.regex)].length
  return counts
}

export function proseScore(text) {
  const prose = stripCode(text)
  const s1 = detectS1(prose)
  return { s1, s2: countS2(prose), clean: s1.length === 0 }
}
