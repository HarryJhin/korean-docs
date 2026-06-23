---
name: write-korean-docs
description: Use when the user wants to generate a Korean technical reference document (.md) from a topic — the conversational entry guide to the korean-docs research → fact-check → prose workflow. If the topic is underspecified, ask 1-2 clarifying questions, then launch. 트리거 - 한글 기술문서 작성, 한글 레퍼런스 문서 생성, korean-docs 워크플로우 실행.
---

# write-korean-docs (pre-flight)

`korean-docs` 워크플로우의 **대화형 진입 가이드**다. 워크플로우는 리서치 → 적대적 사실검증 → 초안 → 문체교정 → 자연스러움 검증 → 조립으로 한글 기술 레퍼런스 문서(.md)를 생성한다. 이 스킬은 *실행 전 준비*만 담당하고, 실제 생성은 `/korean-docs` 워크플로우가 한다.

`/deep-research`처럼 동작한다: 사용자에게 **옵션 폼(JSON)을 채우게 하지 않는다.** 자연어로 주제를 받고, 모호하면 한두 가지만 되묻고, 그 답을 주제 문장에 녹여 워크플로우에 넘긴다.

## 1. 주제 확정 (필수)

**필수 입력은 `topic` 하나뿐**이다. 나머지(독자·톤·문서유형)는 워크플로우의 아웃라인 단계가 주제 문장에서 추론하므로, 사용자가 명시하지 않으면 묻지 않아도 된다.

- **topic** (필수): 문서 주제. 예: "JavaScript `Array.prototype.flat()` 메서드 레퍼런스"
- 주제가 **너무 막연하면**(예: "JS 문서 써줘") 한두 가지만 되묻는다 — 어떤 대상(API·CLI·설정)인지, 누가 읽는지. 워크플로우는 비싸므로 **재질문은 한 번에 모아서** 한다.
- 사용자가 독자·톤을 말했다면 받아 적되, **별도 필드로 분리하지 말고** 주제 문장에 자연스럽게 이어 붙인다(아래 §3). 명시 안 하면 워크플로우가 알아서 추론한다.

> 현재 `docType`은 `reference`만 지원(MVP). 하우투·튜토리얼·설명은 후속.

## 2. 비용 경고 (필수)

이 워크플로우는 섹션마다 리서치 + 3표 사실검증 + 초안 + 교정 + 자연스러움 검수 에이전트를 spawn한다. 실측 **수백만 토큰·수십 분**이 들 수 있고, 검증 단계에서 레이트리밋이 나면 더 늘어난다. 실행 전에 비용을 고지하고 동의를 받는다.

## 3. 실행 — 자연어로 넘긴다

동의가 끝나면 워크플로우를 띄운다. **인자는 자연어 문자열 하나**다. 독자·톤을 모았다면 주제 문장에 녹여서 한 줄로 넘긴다 — JSON 객체로 조립하지 마라.

```
/korean-docs JavaScript Array.prototype.flat() 메서드 레퍼런스. 독자는 flat을 처음 쓰는 프론트 개발자, 톤은 군더더기 없는 간결한 레퍼런스체.
```

주제만 있으면 그대로 한 줄이면 된다:

```
/korean-docs JavaScript Array.prototype.flat() 메서드 레퍼런스
```

워크플로우는 이 문자열을 받아 `topic`으로 쓰고, 문장에 녹인 독자·톤을 아웃라인 단계가 추출·추론한다. `/korean-docs` 슬래시 커맨드는 워크플로우 파일이 `~/.claude/workflows/`(또는 프로젝트 `.claude/workflows/`)에 설치돼 있으면 자동 생성된다. 미설치면 INSTALL.md를 참조한다. `/workflows` UI에서 선택해 실행해도 된다.

## 4. 출력 검수 (생성 후)

워크플로우가 끝나면:

1. 반환 `markdown`을 파일로 저장한다.
2. `lib/prose-checks.js`의 `proseScore`로 S1(em dash·이모지·세미콜론·이중피동) 클린 여부를 확인한다.
3. **사실 정확성·출처 유효성은 사람이 검수한다** — 날조된 API·수치가 없는지, `[n]` 인용이 실제 출처와 맞는지.
4. 워크플로우 로그의 "드롭된 섹션" 경고를 확인한다(누락 섹션 여부).
