@echo off
chcp 65001 >nul
echo ====================================
echo KRDS MCP Server - 파일 확인
echo ====================================
echo.

echo [필수 파일 확인]
echo.

if exist "smithery.yaml" (
    echo ✓ smithery.yaml - 존재
) else (
    echo ✗ smithery.yaml - 없음 [중요!]
)

if exist "package.json" (
    echo ✓ package.json - 존재
) else (
    echo ✗ package.json - 없음
)

if exist "tsconfig.json" (
    echo ✓ tsconfig.json - 존재
) else (
    echo ✗ tsconfig.json - 없음
)

if exist "src" (
    echo ✓ src/ - 존재
) else (
    echo ✗ src/ - 없음
)

if exist "build" (
    echo ✓ build/ - 존재
) else (
    echo ✗ build/ - 없음 [npm run build 실행 필요]
)

if exist "README.md" (
    echo ✓ README.md - 존재
) else (
    echo ✗ README.md - 없음
)

echo.
echo [Git 상태 확인]
echo.

if exist ".git" (
    echo ✓ Git 저장소 초기화됨
    echo.
    echo 변경된 파일:
    git status --short 2>nul
    if errorlevel 1 (
        echo [Git이 설치되어 있지 않습니다]
    )
) else (
    echo ✗ Git 저장소 미초기화
    echo   → 'git init' 실행 필요
)

echo.
echo [빌드 확인]
echo.

if exist "build\index.js" (
    echo ✓ 빌드 완료
) else (
    echo ✗ 빌드 필요 - 'npm run build' 실행
)

echo.
echo [smithery.yaml 내용 미리보기]
echo.
if exist "smithery.yaml" (
    type smithery.yaml | findstr /C:"name:" /C:"version:" /C:"entrypoint:"
) else (
    echo smithery.yaml 파일이 없습니다!
)

echo.
echo ====================================
echo.
pause

