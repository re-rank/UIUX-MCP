# KRDS MCP 서버 설정 가이드

## Cursor에서 설정하기

### 방법 1: Cursor 설정 UI 사용 (추천)

1. **Cursor 열기**
   - Cursor를 실행합니다.

2. **설정 열기**
   - `Ctrl + ,` (Windows/Linux) 또는 `Cmd + ,` (Mac)
   - 또는 왼쪽 하단 톱니바퀴 아이콘 클릭 → "Settings"

3. **MCP 서버 추가**
   - 설정 검색창에 "MCP" 입력
   - "Model Context Protocol" 섹션 찾기
   - "Add Server" 또는 "Edit Config" 클릭

4. **서버 정보 입력**
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

5. **Cursor 재시작**
   - Cursor를 완전히 종료하고 다시 시작합니다.

### 방법 2: 설정 파일 직접 수정

1. **설정 파일 열기**
   
   **Windows:**
   ```
   %APPDATA%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json
   ```
   
   또는 프로젝트 루트에:
   ```
   .cursor/mcp.json
   ```

2. **JSON 내용 추가**
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

3. **저장 후 Cursor 재시작**

## Claude Desktop에서 설정하기

### Windows

1. **설정 파일 위치**
   ```
   %APPDATA%\Claude\claude_desktop_config.json
   ```

2. **파일 열기 (파일 탐색기에서)**
   - `Win + R` 누르고 `%APPDATA%\Claude` 입력
   - `claude_desktop_config.json` 파일을 메모장으로 열기

3. **JSON 내용 추가**
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

4. **저장 후 Claude Desktop 재시작**

### macOS

1. **설정 파일 위치**
   ```
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```

2. **터미널에서 편집**
   ```bash
   nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

3. **JSON 내용 추가** (위와 동일, 경로만 수정)

4. **저장 후 Claude Desktop 재시작**

## 사용 확인하기

### Cursor에서

1. 채팅 창을 엽니다 (`Ctrl + L`)
2. 다음과 같이 요청해보세요:
   ```
   KRDS 버튼 컴포넌트를 찾아줘
   ```
   ```
   KRDS에서 사용 가능한 컴포넌트 목록을 보여줘
   ```
   ```
   primary 색상 값을 알려줘
   ```

### Claude Desktop에서

1. 새 대화를 시작합니다
2. 위와 동일한 질문을 해보세요

### 확인 방법

MCP 서버가 제대로 연결되면:
- 🔧 도구 아이콘이 활성화됩니다
- AI가 KRDS 관련 질문에 정확하게 답변합니다
- 컴포넌트 코드를 직접 제공합니다

## 문제 해결

### 서버가 연결되지 않는 경우

1. **Node.js 설치 확인**
   ```bash
   node --version
   ```
   - v18 이상이어야 합니다

2. **빌드 확인**
   ```bash
   cd "C:\Users\박호진\OneDrive\Desktop\UIUX MCP"
   npm run build
   ```

3. **경로 확인**
   - 설정 파일의 경로가 정확한지 확인
   - 백슬래시(`\`) 대신 슬래시(`/`) 사용 권장

4. **로그 확인**
   - Cursor: Developer Tools 열기 (`Ctrl + Shift + I`)
   - Claude Desktop: 로그 파일 확인

### 테스트 실행

```bash
cd "C:\Users\박호진\OneDrive\Desktop\UIUX MCP"
node test-mcp.js
```

모든 테스트가 통과하면 MCP 서버가 정상 작동하는 것입니다.

## 예제 사용법

### 컴포넌트 찾기
```
"KRDS 모달 컴포넌트를 찾아서 코드를 보여줘"
"Form 카테고리에 있는 컴포넌트들을 알려줘"
```

### 디자인 토큰
```
"KRDS primary 색상 값이 뭐야?"
"전체 색상 팔레트를 보여줘"
```

### 코드 검증
```
"이 HTML 코드가 KRDS 가이드라인을 따르는지 확인해줘:
<button class="my-btn">버튼</button>"
```

### 리소스 정보
```
"KRDS CSS 파일을 프로젝트에 어떻게 추가하나요?"
```

## 추가 정보

- **공식 문서:** [README.md](./README.md)
- **KRDS 웹사이트:** https://www.krds.go.kr/
- **MCP 프로토콜:** https://modelcontextprotocol.io/

## 업데이트

KRDS 패키지가 업데이트되면:

```bash
cd "C:\Users\박호진\OneDrive\Desktop\UIUX MCP"
npm update krds-uiux
npm run build
```

그 후 Cursor 또는 Claude Desktop을 재시작하세요.

