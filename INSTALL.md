# 설치

워크플로우는 현재 Claude Code 마켓플레이스로 배포할 수 없다(plugin.json에 workflow 필드 없음, anthropics/claude-code#66032 참조). 수동 설치한다.

## 1. 리포 클론

```bash
git clone <repo-url> korean-docs && cd korean-docs
```

## 2. 워크플로우 배치

```bash
mkdir -p ~/.claude/workflows
cp workflows/korean-docs.js ~/.claude/workflows/
```

## 3. 스킬·서브에이전트 배치

```bash
cp -R skills/writing-korean-prose ~/.claude/skills/
mkdir -p ~/.claude/agents
cp agents/*.md ~/.claude/agents/
```

## 4. 실행

Claude Code에서 `/korean-docs` 또는 Workflow 도구로 호출:
```
Workflow({ name: "korean-docs", args: { topic: "...", docType: "reference", source: "..." } })
```

#66032가 머지되면 `workflows/`를 플러그인 컴포넌트로 동봉해 `/plugin install`로 전환할 예정.
