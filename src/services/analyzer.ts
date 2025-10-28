import type { ValidationResult, ValidationIssue } from '../types/krds.js';

/**
 * KRDS 코드 분석기
 */
export class KRDSAnalyzer {
  /**
   * HTML/CSS 코드를 분석하여 KRDS 가이드라인 준수 여부 확인
   */
  analyzeCode(code: string): ValidationResult {
    const issues: ValidationIssue[] = [];
    const suggestions: string[] = [];
    const componentsUsed: string[] = [];

    // KRDS 클래스명 패턴 검사
    const krdsClassPattern = /class="([^"]*)"/g;
    let match;
    let hasKRDSClass = false;
    let totalClasses = 0;
    let krdsClasses = 0;

    while ((match = krdsClassPattern.exec(code)) !== null) {
      const classes = match[1].split(/\s+/);
      totalClasses += classes.length;
      
      classes.forEach(cls => {
        if (cls.startsWith('krds-')) {
          hasKRDSClass = true;
          krdsClasses++;
          
          // 컴포넌트 이름 추출
          const componentName = cls.replace('krds-', '').split('-')[0];
          if (!componentsUsed.includes(componentName)) {
            componentsUsed.push(componentName);
          }
        }
      });
    }

    // KRDS 클래스 사용 검증
    if (!hasKRDSClass && totalClasses > 0) {
      issues.push({
        type: 'warning',
        message: 'KRDS 클래스명이 발견되지 않았습니다.',
        suggestion: 'KRDS 디자인 시스템의 표준 컴포넌트를 사용하세요. 클래스명은 "krds-"로 시작해야 합니다.'
      });
      suggestions.push('KRDS 컴포넌트 라이브러리에서 적절한 컴포넌트를 검색해보세요.');
    }

    // 인라인 스타일 검사
    const inlineStylePattern = /style="([^"]*)"/g;
    const inlineStyles = code.match(inlineStylePattern);
    
    if (inlineStyles && inlineStyles.length > 0) {
      issues.push({
        type: 'warning',
        message: `${inlineStyles.length}개의 인라인 스타일이 발견되었습니다.`,
        suggestion: 'KRDS 디자인 토큰과 CSS 클래스를 사용하여 일관된 스타일을 유지하세요.'
      });
      suggestions.push('디자인 토큰 검색 기능을 사용하여 표준 색상, 간격 값을 찾아보세요.');
    }

    // 접근성 검사: alt 속성
    const imgWithoutAlt = /<img(?![^>]*alt=)/g;
    const imgWithoutAltMatches = code.match(imgWithoutAlt);
    
    if (imgWithoutAltMatches) {
      issues.push({
        type: 'error',
        message: `${imgWithoutAltMatches.length}개의 이미지에 alt 속성이 누락되었습니다.`,
        suggestion: '접근성을 위해 모든 이미지에 alt 속성을 추가하세요.'
      });
    }

    // 접근성 검사: button type 속성
    const buttonWithoutType = /<button(?![^>]*type=)/g;
    const buttonWithoutTypeMatches = code.match(buttonWithoutType);
    
    if (buttonWithoutTypeMatches) {
      issues.push({
        type: 'warning',
        message: `${buttonWithoutTypeMatches.length}개의 버튼에 type 속성이 누락되었습니다.`,
        suggestion: '버튼의 의도를 명확히 하기 위해 type="button", type="submit", type="reset" 중 하나를 지정하세요.'
      });
    }

    // 의미론적 HTML 검사
    const hasSemanticElements = /<(header|footer|nav|main|article|section|aside)/.test(code);
    if (code.length > 200 && !hasSemanticElements) {
      issues.push({
        type: 'info',
        message: '의미론적 HTML 요소 사용을 고려해보세요.',
        suggestion: '<header>, <nav>, <main>, <footer> 등의 시맨틱 태그를 사용하면 접근성과 SEO가 향상됩니다.'
      });
    }

    // 점수 계산
    let score = 100;
    issues.forEach(issue => {
      if (issue.type === 'error') score -= 15;
      else if (issue.type === 'warning') score -= 10;
      else if (issue.type === 'info') score -= 5;
    });
    score = Math.max(0, score);

    // KRDS 사용률 보너스
    if (totalClasses > 0) {
      const krdsUsageRate = krdsClasses / totalClasses;
      if (krdsUsageRate > 0.8) {
        score = Math.min(100, score + 10);
        issues.push({
          type: 'info',
          message: 'KRDS 클래스 사용률이 높습니다! 잘하고 계십니다.'
        });
      }
    }

    return {
      isCompliant: issues.filter(i => i.type === 'error').length === 0 && score >= 70,
      score,
      issues,
      suggestions,
      componentsUsed
    };
  }

  /**
   * 컴포넌트 추천
   */
  recommendComponents(code: string): string[] {
    const recommendations: string[] = [];

    // 버튼 패턴 검사
    if (/<button/.test(code) && !/krds-btn/.test(code)) {
      recommendations.push('button - KRDS 표준 버튼 컴포넌트');
    }

    // 입력 필드 검사
    if (/<input[^>]*type="text"/.test(code) && !/krds-text-input/.test(code)) {
      recommendations.push('text_input - KRDS 텍스트 입력 컴포넌트');
    }

    // 체크박스 검사
    if (/<input[^>]*type="checkbox"/.test(code) && !/krds-checkbox/.test(code)) {
      recommendations.push('checkbox - KRDS 체크박스 컴포넌트');
    }

    // 라디오 버튼 검사
    if (/<input[^>]*type="radio"/.test(code) && !/krds-radio/.test(code)) {
      recommendations.push('radio_button - KRDS 라디오 버튼 컴포넌트');
    }

    // 테이블 검사
    if (/<table/.test(code) && !/krds-table/.test(code)) {
      recommendations.push('table - KRDS 테이블 컴포넌트');
    }

    // 모달 패턴 검사
    if (/(modal|popup|dialog)/i.test(code) && !/krds-modal/.test(code)) {
      recommendations.push('modal - KRDS 모달 컴포넌트');
    }

    return recommendations;
  }
}

