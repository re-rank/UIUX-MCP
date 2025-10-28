@echo off
chcp 65001 >nul
echo ====================================
echo KRDS MCP - Smithery 배포
echo ====================================
echo.

cd "C:\Users\박호진\OneDrive\Desktop\UIUX MCP"

echo [1/3] smithery.yaml 확인...
if exist "smithery.yaml" (
    echo ✓ smithery.yaml 존재
    type smithery.yaml
) else (
    echo ✗ smithery.yaml 없음!
    pause
    exit /b 1
)
echo.

echo [2/3] Git에 추가 및 커밋...
git add smithery.yaml
git commit -m "fix(smithery): typescript runtime only"
echo.

echo [3/3] GitHub에 푸시...
git push
echo.

echo ====================================
echo 푸시 완료!
echo ====================================
echo.
echo 다음 단계:
echo 1. GitHub에서 smithery.yaml 파일 확인
echo 2. Smithery 프로젝트 완전 삭제
echo 3. 5분 후 다시 추가 (TypeScript 런타임)
echo 4. 자동 빌드 시작
echo.
pause

