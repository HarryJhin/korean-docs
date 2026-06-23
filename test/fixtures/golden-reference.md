# configng.load 레퍼런스

## 개요

`load`는 설정 파일을 읽어 객체로 반환한다. 파일이 없으면 기본값을 쓴다.

## 항목

### load(path)

경로의 YAML을 파싱해 반환한다. 코드 블록의 세미콜론은 산문 검사 대상이 아니다.

```js
const cfg = load('./config.yaml');
console.log(cfg.port);
```

반환값은 일반 객체다. 파싱에 실패하면 예외를 던진다.

## 에러

경로가 없으면 `FileNotFound`를 던진다. 권한이 없으면 `PermissionDenied`를 던진다.
