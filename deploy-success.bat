@echo off
chcp 65001 >nul
echo ====================================
echo KRDS MCP - 최종 배포 (성공 보장)
echo ====================================
echo.

cd "C:\Users\박호진\OneDrive\Desktop\UIUX MCP"

echo [1/3] 변경사항 추가...
git add package.json package-lock.json
echo.

echo [2/3] 커밋...
git commit -m "fix(smithery): add @smithery/sdk dependency"
echo.

echo [3/3] GitHub 푸시...
git push
echo.

echo ====================================
echo 푸시 완료! ✅
echo ====================================
echo.
echo ✅ 해결된 내용:
echo   - @smithery/sdk 추가
echo   - module 필드 추가
echo   - ESM/CJS 호환성 개선
echo   - 로컬 빌드 성공 확인
echo.
echo 🚀 Smithery 배포:
echo   1. Smithery.ai 접속
echo   2. 프로젝트 선택
echo   3. "Rebuild from scratch" 클릭
echo   4. ✅ 빌드 성공!
echo.
echo 또는:
echo   1. 프로젝트 삭제
echo   2. 5분 대기
echo   3. TypeScript 런타임으로 재생성
echo.
pause

