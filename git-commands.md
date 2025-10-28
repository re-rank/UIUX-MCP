# Git 커밋 및 푸시 가이드

현재 `smithery.yaml` 파일이 생성되었지만 Git에 커밋되지 않아 Smithery가 감지하지 못하고 있습니다.

## 해결 방법: Git 커밋 및 푸시

### 1단계: Git 초기화 (아직 안 했다면)

```bash
cd "C:\Users\박호진\OneDrive\Desktop\UIUX MCP"
git init
```

### 2단계: 모든 파일 추가

```bash
git add .
```

또는 개별 파일 추가:

```bash
git add smithery.yaml
git add package.json
git add tsconfig.json
git add src/
git add build/
git add README.md
git add SETUP_GUIDE.md
git add DEPLOYMENT.md
git add .gitignore
git add .npmignore
```

### 3단계: 커밋

```bash
git commit -m "feat: Add KRDS MCP Server with Smithery support

- Implement 9 MCP tools for KRDS design system
- Add smithery.yaml configuration
- Support 69 KRDS components
- Include design token search functionality
- Add code validation and compliance checking
- Complete documentation (README, SETUP_GUIDE, DEPLOYMENT)"
```

### 4단계: GitHub 저장소 생성 및 연결

**GitHub에서:**
1. GitHub.com 접속
2. "New repository" 클릭
3. Repository name: `krds-uiux-mcp-server`
4. Public으로 설정
5. "Create repository" 클릭

**로컬에서:**

```bash
git remote add origin https://github.com/your-username/krds-uiux-mcp-server.git
git branch -M main
git push -u origin main
```

### 5단계: Smithery 재시도

GitHub에 푸시한 후:
1. Smithery.ai 접속
2. 저장소 새로고침 또는 다시 추가
3. `smithery.yaml`이 감지되면 자동 빌드 시작

## 중요 파일 확인 체크리스트

반드시 다음 파일들이 Git에 포함되어야 합니다:

- ✅ `smithery.yaml` (필수!)
- ✅ `package.json`
- ✅ `tsconfig.json`
- ✅ `src/` 디렉토리
- ✅ `README.md`

다음 파일들은 제외됩니다 (.gitignore):

- ❌ `node_modules/`
- ❌ `build/` (선택적)
- ❌ `.env`

## 파일 확인

현재 smithery.yaml 파일 위치:
```
C:\Users\박호진\OneDrive\Desktop\UIUX MCP\smithery.yaml
```

파일이 제대로 생성되었는지 확인:
```bash
type smithery.yaml
```

또는 파일 탐색기에서 직접 확인하세요.

## 문제 해결

### smithery.yaml이 보이지 않는 경우

Windows 탐색기에서 "숨김 파일 표시" 옵션을 켜세요.

### Git이 설치되지 않은 경우

Git 다운로드: https://git-scm.com/download/win

### 커밋 시 사용자 정보 요구

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 대안: GitHub Desktop 사용

Git 명령어가 복잡하다면 GitHub Desktop 사용:

1. GitHub Desktop 다운로드: https://desktop.github.com/
2. 앱에서 "Add Local Repository" 선택
3. 폴더 선택: `C:\Users\박호진\OneDrive\Desktop\UIUX MCP`
4. "Create Repository" 또는 "Add Repository"
5. 왼쪽에서 변경사항 확인 (smithery.yaml 포함되어 있는지)
6. Commit 메시지 작성
7. "Commit to main" 클릭
8. 상단의 "Publish repository" 또는 "Push origin" 클릭

## 다음 단계

GitHub에 푸시 완료 후:
- Smithery에서 저장소 URL 입력 또는 새로고침
- 자동 빌드 시작됨
- 빌드 로그에서 진행상황 확인
- 성공 시 MCP 레지스트리에 등록됨

## 확인 사항

푸시 후 GitHub 저장소에서 확인:
- `smithery.yaml` 파일이 보이는가?
- `src/` 폴더가 있는가?
- `package.json`이 있는가?

모두 보이면 Smithery가 정상적으로 감지할 것입니다!

