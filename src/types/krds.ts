/**
 * KRDS 컴포넌트 타입 정의
 */
export interface KRDSComponent {
  name: string;
  fileName: string;
  category: string;
  htmlCode: string;
  description?: string;
}

/**
 * KRDS 디자인 토큰 타입
 */
export interface DesignToken {
  value: string;
  type: string;
  path: string;
}

/**
 * 토큰 검색 결과
 */
export interface TokenSearchResult {
  name: string;
  value: string;
  type: string;
  cssVariable?: string;
  scssVariable?: string;
}

/**
 * 코드 검증 결과
 */
export interface ValidationResult {
  isCompliant: boolean;
  score: number;
  issues: ValidationIssue[];
  suggestions: string[];
  componentsUsed: string[];
}

/**
 * 검증 이슈
 */
export interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  line?: number;
  suggestion?: string;
}

/**
 * 리소스 정보
 */
export interface ResourceInfo {
  type: 'css' | 'scss' | 'fonts' | 'images' | 'js';
  files: string[];
  usage: string;
}

