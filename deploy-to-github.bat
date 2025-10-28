@echo off
chcp 65001 >nul
echo ====================================
echo KRDS MCP Server - GitHub 배포 스크립트
echo ====================================
echo.

REM Git 설치 확인
git --version >nul 2>&1
if errorlevel 1 (
    echo [오류] Git이 설치되어 있지 않습니다.
    echo Git 다운로드: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/5] Git 초기화 중...
if not exist ".git" (
    git init
    echo Git 저장소가 초기화되었습니다.
) else (
    echo Git 저장소가 이미 존재합니다.
)
echo.

echo [2/5] 파일 추가 중...
git add .
echo 모든 파일이 스테이징되었습니다.
echo.

echo [3/5] smithery.yaml 확인 중...
if exist "smithery.yaml" (
    echo ✓ smithery.yaml 파일 존재 확인
) else (
    echo [경고] smithery.yaml 파일이 없습니다!
)
echo.

echo [4/5] 커밋 중...
git commit -m "feat: Add KRDS MCP Server with Smithery support - Implement 9 MCP tools - Support 69 KRDS components - Add complete documentation"
echo 커밋이 완료되었습니다.
echo.

echo [5/5] GitHub 원격 저장소 설정...
echo.
echo GitHub 저장소 URL을 입력하세요:
echo 예: https://github.com/your-username/krds-uiux-mcp-server.git
set /p REPO_URL="URL: "

if "%REPO_URL%"=="" (
    echo [오류] URL이 입력되지 않았습니다.
    pause
    exit /b 1
)

REM 기존 원격 저장소 제거 (있다면)
git remote remove origin 2>nul

git remote add origin %REPO_URL%
git branch -M main
echo.

echo GitHub에 푸시 중...
git push -u origin main

if errorlevel 1 (
    echo.
    echo [오류] 푸시에 실패했습니다.
    echo.
    echo 가능한 원인:
    echo 1. GitHub 인증이 필요할 수 있습니다
    echo 2. 저장소가 존재하지 않을 수 있습니다
    echo 3. 권한이 없을 수 있습니다
    echo.
    echo GitHub Desktop 사용을 권장합니다:
    echo https://desktop.github.com/
    pause
    exit /b 1
)

echo.
echo ====================================
echo 배포 완료! 🎉
echo ====================================
echo.
echo 다음 단계:
echo 1. GitHub 저장소에서 smithery.yaml 파일 확인
echo 2. Smithery.ai에서 저장소 추가 또는 새로고침
echo 3. 자동 빌드 시작!
echo.
pause

