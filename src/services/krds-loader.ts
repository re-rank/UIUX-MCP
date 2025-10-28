import { readFile, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { KRDSComponent, DesignToken, TokenSearchResult } from '../types/krds.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * KRDS 패키지 루트 경로 찾기
 */
function getKRDSPath(): string {
  // node_modules에서 krds-uiux 찾기
  const projectRoot = join(__dirname, '..', '..');
  return join(projectRoot, 'node_modules', 'krds-uiux');
}

/**
 * KRDS 컴포넌트 로더
 */
export class KRDSLoader {
  private krdsPath: string;
  private componentsCache: KRDSComponent[] | null = null;
  private tokensCache: any = null;

  constructor() {
    this.krdsPath = getKRDSPath();
  }

  /**
   * 모든 컴포넌트 로드
   */
  async loadComponents(): Promise<KRDSComponent[]> {
    if (this.componentsCache) {
      return this.componentsCache;
    }

    const componentsPath = join(this.krdsPath, 'html', 'code');
    const files = await readdir(componentsPath);
    
    const components: KRDSComponent[] = [];
    
    for (const file of files) {
      if (!file.endsWith('.html')) continue;
      
      const filePath = join(componentsPath, file);
      const htmlCode = await readFile(filePath, 'utf-8');
      
      const name = file.replace('.html', '');
      const category = this.categorizeComponent(name);
      
      components.push({
        name,
        fileName: file,
        category,
        htmlCode,
        description: this.extractDescription(htmlCode)
      });
    }
    
    this.componentsCache = components;
    return components;
  }

  /**
   * 컴포넌트 카테고리 분류
   */
  private categorizeComponent(name: string): string {
    const categories: Record<string, string[]> = {
      'Form': ['button', 'checkbox', 'radio', 'select', 'text_input', 'textarea', 'file_upload', 'date_input', 'toggle_switch'],
      'Navigation': ['header', 'footer', 'breadcrumb', 'tab', 'pagination', 'side_navigation', 'in_page_navigation', 'main_menu', 'skip_link'],
      'Layout': ['accordion', 'carousel', 'modal', 'disclosure', 'structured_list', 'table'],
      'Feedback': ['badge', 'tag', 'spinner', 'tooltip', 'critical_alerts', 'step_indicator'],
      'Content': ['link', 'text_list', 'calendar'],
      'Help': ['coach_mark', 'contextual_help', 'help_panel', 'tutorial_panel'],
      'Utility': ['language_switcher', 'masthead', 'identifier', 'resize']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => name.includes(keyword))) {
        return category;
      }
    }
    
    return 'Other';
  }

  /**
   * HTML 주석에서 설명 추출
   */
  private extractDescription(htmlCode: string): string {
    const match = htmlCode.match(/<!--\s*(.+?)\s*-->/);
    return match ? match[1] : '';
  }

  /**
   * 디자인 토큰 로드
   */
  async loadTokens(): Promise<any> {
    if (this.tokensCache) {
      return this.tokensCache;
    }

    const tokensPath = join(this.krdsPath, 'tokens', 'figma_token.json');
    const tokensData = await readFile(tokensPath, 'utf-8');
    this.tokensCache = JSON.parse(tokensData);
    
    return this.tokensCache;
  }

  /**
   * 토큰 검색
   */
  async searchTokens(type?: string, query?: string): Promise<TokenSearchResult[]> {
    const tokens = await this.loadTokens();
    const results: TokenSearchResult[] = [];

    const traverse = (obj: any, path: string[] = []) => {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = [...path, key];
        
        if (value && typeof value === 'object') {
          if ('value' in value && 'type' in value) {
            // 토큰 발견
            const tokenType = (value as any).type;
            const tokenValue = (value as any).value;
            const pathString = currentPath.join('.');
            
            // 필터링
            if (type && tokenType !== type) continue;
            if (query && !pathString.toLowerCase().includes(query.toLowerCase())) continue;
            
            results.push({
              name: pathString,
              value: tokenValue,
              type: tokenType,
              cssVariable: `--${currentPath.join('-')}`,
              scssVariable: `$${currentPath.join('-')}`
            });
          } else {
            // 계속 탐색
            traverse(value, currentPath);
          }
        }
      }
    };

    traverse(tokens);
    return results;
  }

  /**
   * 리소스 경로 가져오기
   */
  async getResourcePaths(resourceType: 'css' | 'scss' | 'fonts' | 'images' | 'js'): Promise<string[]> {
    const resourcesPath = join(this.krdsPath, 'resources');
    const targetPath = join(resourcesPath, resourceType);
    
    try {
      const files = await readdir(targetPath);
      return files.map(file => join('node_modules', 'krds-uiux', 'resources', resourceType, file));
    } catch (error) {
      return [];
    }
  }
}

