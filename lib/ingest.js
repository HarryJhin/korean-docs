// 기존 .md를 에이전트 없이 파싱하는 결정론적 함수. 워크플로우(edit 모드)가 같은 로직을
// 인라인 복제한다(자기완결 제약 — lib/ import 불가). 한쪽 수정 시 양쪽 동기화.

const SOURCE_HEADING = /^##\s+(출처|references)\s*$/i

export function extractTitle(md) {
  const m = (md || '').match(/^#\s+(.+)$/m)
  return m ? m[1].trim() : null
}

export function splitSections(md) {
  const lines = (md || '').split(/\r?\n/)
  const sections = []
  let cur = null
  let inSources = false
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/)
    if (h2) {
      if (cur) sections.push(cur)
      if (SOURCE_HEADING.test(line)) { inSources = true; cur = null; continue }
      inSources = false
      cur = { title: h2[1].trim(), body: [] }
      continue
    }
    if (cur && !inSources) cur.body.push(line)
  }
  if (cur) sections.push(cur)
  return sections.map(s => ({ title: s.title, markdown: s.body.join('\n').trim() }))
}

export function parseSources(md) {
  const out = new Map()
  const lines = (md || '').split(/\r?\n/)
  let inSources = false
  for (const line of lines) {
    if (/^##\s+/.test(line)) { inSources = SOURCE_HEADING.test(line); continue }
    if (!inSources) continue
    const m = line.match(/^\[(\d+)\]\s+(\S.*?)\s*$/)
    if (m) out.set(Number(m[1]), m[2].trim())
  }
  return out
}
