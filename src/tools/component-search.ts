import type { KRDSComponent } from '../types/krds.js';
import type { KRDSLoader } from '../services/krds-loader.js';

/**
 * 컴포넌트 검색 도구
 */
export async function searchComponents(
  loader: KRDSLoader,
  query?: string,
  category?: string
): Promise<KRDSComponent[]> {
  const allComponents = await loader.loadComponents();
  
  let results = allComponents;
  
  // 카테고리 필터
  if (category) {
    results = results.filter(c => 
      c.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // 검색어 필터
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) ||
      c.category.toLowerCase().includes(lowerQuery) ||
      (c.description && c.description.toLowerCase().includes(lowerQuery))
    );
  }
  
  return results;
}

/**
 * 특정 컴포넌트 코드 가져오기
 */
export async function getComponentCode(
  loader: KRDSLoader,
  componentName: string
): Promise<KRDSComponent | null> {
  const allComponents = await loader.loadComponents();
  
  return allComponents.find(c => 
    c.name === componentName || c.name === componentName.replace(/_/g, '-')
  ) || null;
}

/**
 * 모든 카테고리 목록 가져오기
 */
export async function listCategories(loader: KRDSLoader): Promise<string[]> {
  const allComponents = await loader.loadComponents();
  const categories = new Set(allComponents.map(c => c.category));
  return Array.from(categories).sort();
}

/**
 * 컴포넌트 목록 (이름만)
 */
export async function listComponentNames(loader: KRDSLoader): Promise<string[]> {
  const allComponents = await loader.loadComponents();
  return allComponents.map(c => c.name).sort();
}

