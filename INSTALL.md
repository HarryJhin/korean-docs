# 설치

워크플로우는 현재 Claude Code 마켓플레이스로 배포할 수 없다(plugin.json에 workflow 필드 없음, anthropics/claude-code#66032 참조). 수동 설치한다.

## 1. 리포 클론

```bash
git clone <repo-url> korean-docs && cd korean-docs
```

## 2. 워크플로우 배치

워크플로우는 자기완결 단일 파일이다. 별도 스킬·서브에이전트 설치가 필요 없다.

```bash
mkdir -p ~/.claude/workflows
cp workflows/korean-docs.js ~/.claude/workflows/
```

## 3. (선택) pre-flight 트리거 스킬 배치

자연어 발동 + 실행 전 파라미터(독자·톤) 수집 + 비용 경고를 원하면 스킬도 복사한다. 워크플로우 자체는 이 스킬 없이도 동작한다.

```bash
mkdir -p ~/.claude/skills
cp -R skills/write-korean-docs ~/.claude/skills/
```

## 4. 실행

설치하면 `/korean-docs` 슬래시 커맨드가 자동 생성된다(`/deep-research`와 동일한 방식). 주제를 인자로 넘긴다:
```
/korean-docs JavaScript Array.prototype.flat() 메서드 레퍼런스
```
독자·톤 등을 지정하려면 JSON으로 넘긴다:
```
/korean-docs {"topic":"...","docType":"reference","audience":"...","tone":"..."}
```
`/workflows` UI에서 선택해 실행해도 된다. 3의 스킬을 깔았다면 "한글 레퍼런스 문서 만들어줘" 같은 자연어로도 진입한다(실행 전 파라미터를 묻고 비용을 고지한다).

#66032가 머지되면 `workflows/`를 플러그인 컴포넌트로 동봉해 `/plugin install`로 전환할 예정.
