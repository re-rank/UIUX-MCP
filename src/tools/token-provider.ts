import type { TokenSearchResult } from '../types/krds.js';
import type { KRDSLoader } from '../services/krds-loader.js';

/**
 * 디자인 토큰 검색
 */
export async function searchDesignTokens(
  loader: KRDSLoader,
  type?: string,
  query?: string
): Promise<TokenSearchResult[]> {
  return await loader.searchTokens(type, query);
}

/**
 * 토큰 타입별 개수 통계
 */
export async function getTokenStats(loader: KRDSLoader): Promise<Record<string, number>> {
  const allTokens = await loader.searchTokens();
  const stats: Record<string, number> = {};
  
  allTokens.forEach(token => {
    stats[token.type] = (stats[token.type] || 0) + 1;
  });
  
  return stats;
}

/**
 * 색상 팔레트 가져오기
 */
export async function getColorPalette(loader: KRDSLoader): Promise<TokenSearchResult[]> {
  return await loader.searchTokens('color');
}

