import type { ValidationResult } from '../types/krds.js';
import { KRDSAnalyzer } from '../services/analyzer.js';
import type { KRDSLoader } from '../services/krds-loader.js';

/**
 * 코드 검증 도구
 */
export async function validateCode(
  code: string,
  loader: KRDSLoader
): Promise<ValidationResult & { recommendations?: string[] }> {
  const analyzer = new KRDSAnalyzer();
  
  const result = analyzer.analyzeCode(code);
  const recommendations = analyzer.recommendComponents(code);
  
  return {
    ...result,
    recommendations: recommendations.length > 0 ? recommendations : undefined
  };
}

/**
 * KRDS 준수 여부만 간단히 확인
 */
export function quickValidate(code: string): { isCompliant: boolean; score: number } {
  const analyzer = new KRDSAnalyzer();
  const result = analyzer.analyzeCode(code);
  
  return {
    isCompliant: result.isCompliant,
    score: result.score
  };
}

