# 🚢 KRDS MCP 서버 배포 가이드

## Smithery 배포

Smithery는 MCP 서버를 쉽게 배포하고 공유할 수 있는 플랫폼입니다.

### 필수 파일 ✅

다음 파일들이 모두 준비되어 있습니다:

- ✅ `smithery.yaml` - Smithery 설정 파일
- ✅ `package.json` - npm 패키지 설정
- ✅ `tsconfig.json` - TypeScript 설정
- ✅ `src/` - 소스 코드
- ✅ `README.md` - 문서

### 배포 프로세스

#### 1. GitHub 저장소 준비

```bash
# Git 초기화 (아직 안 했다면)
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit: KRDS MCP Server"

# GitHub 저장소에 푸시
git remote add origin https://github.com/your-username/krds-uiux-mcp-server.git
git push -u origin main
```

#### 2. Smithery에 등록

1. **Smithery 방문**
   - https://smithery.ai 접속
   - GitHub 계정으로 로그인

2. **저장소 연결**
   - "Add Server" 또는 "New Project" 클릭
   - GitHub 저장소 선택
   - `krds-uiux-mcp-server` 선택

3. **자동 빌드**
   - Smithery가 자동으로 `smithery.yaml` 감지
   - `npm install` → `npm run build` 자동 실행
   - 빌드 성공 확인

4. **배포 완료**
   - MCP 레지스트리에 자동 등록
   - 다른 사용자들이 설치 가능

### Smithery.yaml 설명

```yaml
name: krds-uiux-mcp-server              # 프로젝트 이름
version: 1.0.0                          # 버전
description: KRDS 디자인 시스템 MCP 서버

build:
  type: node                            # Node.js 프로젝트
  commands:                             # 빌드 명령어
    - npm install
    - npm run build
  entrypoint: build/index.js            # 진입점

runtime:
  node: ">=18.0.0"                      # Node.js 최소 버전

mcp:
  serverName: krds-uiux
  capabilities:
    - tools                             # tools 기능 지원
  tools:                                # 제공하는 도구 목록
    - name: search_krds_components
      description: ...
```

## 로컬 배포

### 빌드

```bash
npm run build
```

### 테스트

```bash
node test-mcp.js
```

### MCP 클라이언트 설정

#### Cursor

`.cursor/mcp.json` 또는 설정에서:

```json
{
  "mcpServers": {
    "krds-uiux": {
      "command": "node",
      "args": ["C:/Users/박호진/OneDrive/Desktop/UIUX MCP/build/index.js"]
    }
  }
}
```

#### Claude Desktop

`claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "krds-uiux": {
      "command": "node",
      "args": ["C:/Users/박호진/OneDrive/Desktop/UIUX MCP/build/index.js"]
    }
  }
}
```

## NPM 배포 (선택)

NPM에도 배포하려면:

### 1. NPM 계정 준비

```bash
npm login
```

### 2. 버전 확인

`package.json`의 버전이 올바른지 확인

### 3. 배포

```bash
npm publish
```

### 4. 사용자 설치

```bash
npm install -g krds-uiux-mcp-server
```

## Docker 배포 (선택)

### Dockerfile 생성

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["node", "build/index.js"]
```

### 빌드 및 실행

```bash
docker build -t krds-mcp-server .
docker run -it krds-mcp-server
```

## 버전 업데이트

### 1. 버전 번호 변경

```bash
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
```

### 2. 변경사항 커밋

```bash
git add .
git commit -m "v1.0.1: Bug fixes and improvements"
git push
```

### 3. GitHub 릴리스 생성

- GitHub 저장소 → Releases → "Create new release"
- 태그: `v1.0.1`
- 제목: "Version 1.0.1"
- 설명: 변경 내역 작성

### 4. Smithery 자동 업데이트

- Smithery가 자동으로 새 버전 감지
- 자동 빌드 및 배포

## 배포 체크리스트

배포 전 확인사항:

- [ ] 모든 테스트 통과 (`node test-mcp.js`)
- [ ] 빌드 성공 (`npm run build`)
- [ ] README.md 업데이트
- [ ] smithery.yaml 최신 버전 확인
- [ ] package.json 버전 업데이트
- [ ] 변경 내역 문서화
- [ ] Git 커밋 및 푸시
- [ ] GitHub 릴리스 생성

## 문제 해결

### Smithery 빌드 실패

```
Error: insufficientBuildFiles
```

**해결:** `smithery.yaml` 파일이 있는지 확인

```
Error: Build failed
```

**해결:** `npm run build` 로컬에서 먼저 테스트

### 런타임 오류

```
Error: Cannot find module
```

**해결:** `package.json`의 `dependencies` 확인

### Node.js 버전 오류

```
Error: Node version too old
```

**해결:** Node.js 18 이상으로 업그레이드

## 모니터링

### Smithery 대시보드

- 설치 통계 확인
- 빌드 로그 확인
- 사용자 피드백 확인

### GitHub Insights

- 스타 수
- 포크 수
- 이슈 및 PR 관리

## 지원

- **문서:** [README.md](./README.md)
- **설정:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **이슈:** GitHub Issues
- **KRDS:** https://www.krds.go.kr/

