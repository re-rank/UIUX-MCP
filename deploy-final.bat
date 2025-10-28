@echo off
chcp 65001 >nul
echo ====================================
echo KRDS MCP - 최종 배포
echo ====================================
echo.

cd "C:\Users\박호진\OneDrive\Desktop\UIUX MCP"

echo [1/3] 변경사항 추가...
git add package.json src/services/krds-loader.ts smithery.yaml
echo.

echo [2/3] 커밋...
git commit -m "fix(smithery): add module field and ESM/CJS compatibility"
echo.

echo [3/3] GitHub 푸시...
git push
echo.

echo ====================================
echo 푸시 완료! ✅
echo ====================================
echo.
echo Smithery 재배포 단계:
echo.
echo 옵션 A: 기존 프로젝트 재빌드
echo   1. Smithery.ai 접속
echo   2. 프로젝트 선택
echo   3. "Rebuild from scratch" 클릭
echo.
echo 옵션 B: 프로젝트 재생성 (권장)
echo   1. Smithery에서 프로젝트 삭제
echo   2. 5분 대기
echo   3. 새 프로젝트 생성 (Runtime: TypeScript)
echo   4. 자동 빌드 성공! 🎉
echo.
pause

