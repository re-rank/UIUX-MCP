# KRDS UI/UX MCP Server

한국 정부 디지털 서비스를 위한 디자인 시스템인 **KRDS (Korea Responsive Design System)**를 AI 어시스턴트와 통합하여 사용할 수 있는 MCP (Model Context Protocol) 서버입니다.

## 🎯 주요 기능

### 1. **컴포넌트 검색 및 제공**
- 65개 이상의 KRDS HTML 컴포넌트 검색
- 카테고리별 필터링 (Form, Navigation, Layout 등)
- 즉시 사용 가능한 HTML 코드 스니펫 제공

### 2. **디자인 토큰 관리**
- KRDS 디자인 토큰 검색 (색상, 간격, 타이포그래피)
- CSS/SCSS 변수 형태로 제공
- 전체 색상 팔레트 조회

### 3. **코드 검증 및 개선**
- HTML/CSS 코드의 KRDS 가이드라인 준수 여부 검증
- 접근성 및 시맨틱 HTML 검사
- 개선 제안 및 대체 컴포넌트 추천

### 4. **리소스 정보**
- CSS, SCSS, 폰트, 이미지 등 리소스 파일 경로 제공
- 각 리소스 사용법 안내

## 📦 설치

### Smithery를 통한 설치 (추천)

Smithery에서 원클릭으로 설치:

```bash
npx @smithery/cli install krds-uiux-mcp-server
```

또는 [Smithery](https://smithery.ai)에서 직접 설치

### 수동 설치

```bash
# 프로젝트 클론
git clone https://github.com/your-repo/krds-uiux-mcp-server
cd krds-uiux-mcp-server

# 의존성 설치
npm install

# 빌드
npm run build
```

## 🚀 사용법

### MCP 설정 (Claude Desktop 또는 Cursor)

MCP 클라이언트 설정 파일에 다음을 추가하세요:

#### Claude Desktop (`claude_desktop_config.json`)
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

#### Cursor (`.cursor/mcp.json` 또는 설정에서)
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

## 🛠️ 사용 가능한 도구

### 1. `search_krds_components`
KRDS 컴포넌트를 검색합니다.

**매개변수:**
- `query` (선택): 검색 키워드 (예: "button", "input")
- `category` (선택): 카테고리 (예: "Form", "Navigation")

**예시:**
```
"버튼 컴포넌트를 찾아줘"
"Form 카테고리의 모든 컴포넌트를 보여줘"
```

### 2. `get_component_code`
특정 컴포넌트의 전체 HTML 코드를 가져옵니다.

**매개변수:**
- `componentName` (필수): 컴포넌트 이름 (예: "button", "text_input")

**예시:**
```
"button 컴포넌트의 코드를 보여줘"
"modal 컴포넌트 코드가 필요해"
```

### 3. `list_component_categories`
모든 컴포넌트 카테고리 목록을 가져옵니다.

**예시:**
```
"KRDS에 어떤 카테고리가 있어?"
```

### 4. `list_all_components`
모든 컴포넌트 이름 목록을 가져옵니다.

**예시:**
```
"사용 가능한 모든 컴포넌트를 보여줘"
```

### 5. `search_design_tokens`
디자인 토큰을 검색합니다.

**매개변수:**
- `type` (선택): 토큰 타입 (예: "color", "spacing")
- `query` (선택): 검색 키워드 (예: "primary", "blue")

**예시:**
```
"primary 색상 토큰을 찾아줘"
"spacing 토큰을 보여줘"
```

### 6. `get_color_palette`
전체 색상 팔레트를 가져옵니다.

**예시:**
```
"KRDS 색상 팔레트를 보여줘"
```

### 7. `get_token_stats`
디자인 토큰 통계를 가져옵니다.

**예시:**
```
"토큰 통계를 보여줘"
```

### 8. `validate_krds_compliance`
코드를 검증하고 개선 제안을 제공합니다.

**매개변수:**
- `code` (필수): 검증할 HTML/CSS 코드

**예시:**
```
"이 HTML 코드가 KRDS 가이드라인을 따르는지 확인해줘"
```

### 9. `get_krds_resources`
리소스 파일 정보를 가져옵니다.

**매개변수:**
- `resourceType` (필수): "css", "scss", "fonts", "images", "js" 중 하나

**예시:**
```
"KRDS CSS 파일 경로를 알려줘"
"폰트 리소스 정보를 보여줘"
```

## 💡 사용 예시

AI 어시스턴트에게 다음과 같이 요청할 수 있습니다:

1. **컴포넌트 찾기**
   - "KRDS 버튼 컴포넌트를 찾아서 코드를 보여줘"
   - "모달 창을 만들고 싶어, KRDS 컴포넌트가 있나?"

2. **코드 검증**
   - "이 HTML이 KRDS 표준을 따르는지 확인해줘"
   - "접근성 문제가 있는지 검토해줘"

3. **디자인 토큰**
   - "primary 색상 값을 알려줘"
   - "KRDS에서 사용하는 모든 색상을 보여줘"

4. **리소스 정보**
   - "KRDS CSS를 프로젝트에 어떻게 추가하나요?"
   - "사용 가능한 폰트는 어떤 게 있어?"

## 🏗️ 프로젝트 구조

```
krds-uiux-mcp-server/
├── src/
│   ├── index.ts                 # MCP 서버 진입점
│   ├── tools/
│   │   ├── component-search.ts  # 컴포넌트 검색 도구
│   │   ├── token-provider.ts    # 디자인 토큰 제공 도구
│   │   └── code-validator.ts    # 코드 검증 도구
│   ├── services/
│   │   ├── krds-loader.ts       # KRDS 패키지 로더
│   │   └── analyzer.ts          # 코드 분석기
│   └── types/
│       └── krds.ts              # 타입 정의
├── build/                       # 빌드 결과물
├── node_modules/
│   └── krds-uiux/              # KRDS 패키지
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 개발

### 빌드
```bash
npm run build
```

### 개발 모드
```bash
npm run dev
```

### 테스트 실행
```bash
# MCP Inspector로 테스트
npx @modelcontextprotocol/inspector node build/index.js
```

## 📚 KRDS 정보

KRDS (Korea Responsive Design System)는 대한민국 디지털 정부를 위한 공식 디자인 시스템입니다.

- **공식 웹사이트:** [www.krds.go.kr](https://www.krds.go.kr/)
- **GitHub:** [github.com/KRDS-uiux/krds-uiux](https://github.com/KRDS-uiux/krds-uiux)
- **npm 패키지:** `krds-uiux`

## 🤝 기여

이슈와 풀 리퀘스트는 언제나 환영합니다!

## 📄 라이센스

ISC

## 🚢 배포

### Smithery에 배포하기

1. **저장소 준비**
   ```bash
   git add .
   git commit -m "Add smithery.yaml configuration"
   git push
   ```

2. **Smithery에 등록**
   - [Smithery](https://smithery.ai)에 방문
   - GitHub 저장소 연결
   - 자동으로 빌드 및 배포됨

### 로컬 배포

```bash
npm run build
```

빌드된 `build/index.js` 파일을 MCP 클라이언트 설정에서 직접 참조할 수 있습니다.

## 🔗 관련 링크

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [KRDS GitHub](https://github.com/KRDS-uiux/krds-uiux)
- [KRDS 공식 웹사이트](https://www.krds.go.kr/)
- [Smithery](https://smithery.ai) - MCP 서버 배포 플랫폼

