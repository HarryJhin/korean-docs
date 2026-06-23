# korean-docs

deep-research를 오마주한 한글 기술 레퍼런스 문서(.md) 생성 워크플로우. 주제·소스를 받아 리서치 → 적대적 사실 검증 → 섹션 초안 → 문체 교정(writing-korean-prose) → 자연스러움 적대 검증 → 조립의 7페이즈를 거친다.

## 무엇이 다른가

- im-not-ai(기계적 humanizer)와 달리 **리서치·생성**까지 한다.
- deep-research와 달리 **한국어 문체 품질 게이트**(번역투·AI슬롭 제거, 존댓말 일관성)를 5·6페이즈에 둔다.

## 설치

[INSTALL.md](./INSTALL.md) 참조. (마켓플레이스 미지원 — 수동 복사)

## 개발

```bash
nvm use            # Node 24 (.nvmrc)
node --test        # 라이브러리·구조 테스트
```

## 수동 스모크 테스트 (e2e)

워크플로우 e2e는 실제 에이전트를 spawn하므로(유료) 자동 테스트가 아니다. 수동 확인:

1. `Workflow({ name: "korean-docs", args: { topic: "예: 어떤 CLI의 명령어 레퍼런스" } })` 실행
2. 반환 `markdown`을 파일(OUT.md)로 저장
3. `node -e "import('./lib/prose-checks.js').then(m => console.log(m.proseScore(require('fs').readFileSync('OUT.md','utf8'))))"` 로 S1 클린 확인
4. 사실 정확성·출처 유효성은 사람이 검수(날조 없는지)

## 범위 (v1)

Diátaxis '레퍼런스' 유형, 단일 .md. 하우투·튜토리얼·설명은 후속.

## 라이선스

MIT. 귀속은 [LICENSE](./LICENSE) 참조.
