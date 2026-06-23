---
name: write-korean-docs
description: Use when the user wants to generate a Korean technical reference document (.md) from a topic — runs the korean-docs research → fact-check → prose pipeline. Gathers topic/audience/tone and warns about cost before launching. 트리거 - 한글 기술문서 작성, 한글 레퍼런스 문서 생성, korean-docs 워크플로우 실행.
---

# write-korean-docs (pre-flight)

`korean-docs` 워크플로우의 진입 가이드다. 워크플로우는 리서치 → 적대적 사실검증 → 초안 → 문체교정 → 자연스러움 검증 → 조립으로 한글 기술 레퍼런스 문서(.md)를 생성한다. 이 스킬은 *실행 전 준비*만 담당하고, 실제 생성은 `/korean-docs` 워크플로우가 한다.

## 1. 실행 전 파라미터 수집 (필수)

워크플로우를 띄우기 전에 아래를 확정한다. 빠진 게 있으면 사용자에게 **한 번에** 묻는다(워크플로우는 비싸므로 중간 재질문을 피한다).

- **topic** (필수): 문서 주제. 예: "JavaScript Array.prototype.flat() 메서드 레퍼런스"
- **audience**: 독자. 예: "REST를 처음 쓰는 백엔드 개발자". 없으면 합리적으로 추정하되 사용자에게 확인받는다.
- **tone**: 톤앤매너. 예: "간결하고 중립적인 레퍼런스체, 군더더기 없이". 기본값을 둬도 된다.
- **docType**: 현재 `reference`만 지원(MVP). 하우투·튜토리얼·설명은 후속.
- **source** (선택): 참고 소스 텍스트가 있으면 함께 넘긴다.

## 2. 비용 경고 (필수)

이 워크플로우는 섹션마다 리서치 + 3표 사실검증 + 초안 + 교정 + 자연스러움 검수 에이전트를 spawn한다. 실측 **수백만 토큰·수십 분**이 들 수 있고, 검증 단계에서 레이트리밋이 나면 더 늘어난다. 실행 전에 비용을 고지하고 동의를 받는다.

## 3. 실행

수집·동의가 끝나면 워크플로우를 띄운다. 인자는 객체로 넘긴다.

```
/korean-docs {"topic":"...","docType":"reference","audience":"...","tone":"..."}
```

`/korean-docs` 슬래시 커맨드는 워크플로우 파일이 `~/.claude/workflows/`(또는 프로젝트 `.claude/workflows/`)에 설치돼 있으면 자동 생성된다. 미설치면 INSTALL.md를 참조한다. `/workflows` UI에서 선택해 실행해도 된다.

## 4. 출력 검수 (생성 후)

워크플로우가 끝나면:

1. 반환 `markdown`을 파일로 저장한다.
2. `lib/prose-checks.js`의 `proseScore`로 S1(em dash·이모지·세미콜론·이중피동) 클린 여부를 확인한다.
3. **사실 정확성·출처 유효성은 사람이 검수한다** — 날조된 API·수치가 없는지, `[n]` 인용이 실제 출처와 맞는지.
4. 워크플로우 로그의 "드롭된 섹션" 경고를 확인한다(누락 섹션 여부).
