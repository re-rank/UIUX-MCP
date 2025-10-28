/**
 * KRDS MCP 서버 간단 테스트 스크립트
 * MCP Inspector 없이 기본 기능 테스트
 */

import { KRDSLoader } from './build/services/krds-loader.js';
import { searchComponents, getComponentCode } from './build/tools/component-search.js';
import { searchDesignTokens } from './build/tools/token-provider.js';
import { validateCode } from './build/tools/code-validator.js';

async function runTests() {
  console.log('🧪 KRDS MCP 서버 테스트 시작\n');
  
  const loader = new KRDSLoader();
  
  try {
    // 테스트 1: 컴포넌트 로드
    console.log('📦 테스트 1: 컴포넌트 로드');
    const components = await loader.loadComponents();
    console.log(`✅ ${components.length}개의 컴포넌트를 로드했습니다.\n`);
    
    // 테스트 2: 버튼 컴포넌트 검색
    console.log('🔍 테스트 2: 버튼 컴포넌트 검색');
    const buttonComponents = await searchComponents(loader, 'button');
    console.log(`✅ ${buttonComponents.length}개의 버튼 관련 컴포넌트를 찾았습니다.`);
    buttonComponents.slice(0, 3).forEach(c => {
      console.log(`   - ${c.name} (${c.category})`);
    });
    console.log();
    
    // 테스트 3: 특정 컴포넌트 코드 가져오기
    console.log('📄 테스트 3: button 컴포넌트 코드 가져오기');
    const button = await getComponentCode(loader, 'button');
    if (button) {
      console.log(`✅ button 컴포넌트를 찾았습니다.`);
      console.log(`   HTML 길이: ${button.htmlCode.length} 문자\n`);
    }
    
    // 테스트 4: 디자인 토큰 검색
    console.log('🎨 테스트 4: primary 색상 토큰 검색');
    const primaryColors = await searchDesignTokens(loader, 'color', 'primary');
    console.log(`✅ ${primaryColors.length}개의 primary 색상을 찾았습니다.`);
    primaryColors.slice(0, 5).forEach(token => {
      console.log(`   - ${token.name}: ${token.value}`);
    });
    console.log();
    
    // 테스트 5: 코드 검증
    console.log('✔️ 테스트 5: 코드 검증');
    const testCode = `
      <button type="button" class="krds-btn">KRDS 버튼</button>
      <div class="my-custom-class">일반 div</div>
    `;
    const validation = await validateCode(testCode, loader);
    console.log(`✅ 검증 완료`);
    console.log(`   준수 여부: ${validation.isCompliant ? '✅' : '❌'}`);
    console.log(`   점수: ${validation.score}/100`);
    console.log(`   이슈: ${validation.issues.length}개`);
    console.log(`   사용된 컴포넌트: ${validation.componentsUsed.join(', ') || '없음'}\n`);
    
    // 테스트 6: 리소스 경로
    console.log('📁 테스트 6: CSS 리소스 경로');
    const cssFiles = await loader.getResourcePaths('css');
    console.log(`✅ ${cssFiles.length}개의 CSS 파일을 찾았습니다.`);
    cssFiles.slice(0, 3).forEach(file => {
      console.log(`   - ${file}`);
    });
    console.log();
    
    console.log('🎉 모든 테스트가 성공적으로 완료되었습니다!');
    console.log('\n✨ MCP 서버가 정상적으로 작동합니다.');
    console.log('💡 이제 Claude Desktop 또는 Cursor에서 사용할 수 있습니다.');
    
  } catch (error) {
    console.error('❌ 테스트 실패:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runTests();

