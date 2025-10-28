#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

import { KRDSLoader } from './services/krds-loader.js';
import { searchComponents, getComponentCode, listCategories, listComponentNames } from './tools/component-search.js';
import { searchDesignTokens, getTokenStats, getColorPalette } from './tools/token-provider.js';
import { validateCode } from './tools/code-validator.js';

/**
 * KRDS UI/UX MCP 서버
 */
class KRDSMCPServer {
  private server: Server;
  private loader: KRDSLoader;

  constructor() {
    this.server = new Server(
      {
        name: 'krds-uiux-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.loader = new KRDSLoader();
    this.setupHandlers();
  }

  private setupHandlers(): void {
    // 도구 목록 제공
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.getTools(),
      };
    });

    // 도구 실행
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'search_krds_components':
            return await this.handleSearchComponents(args);
          
          case 'get_component_code':
            return await this.handleGetComponentCode(args);
          
          case 'list_component_categories':
            return await this.handleListCategories();
          
          case 'list_all_components':
            return await this.handleListComponents();
          
          case 'search_design_tokens':
            return await this.handleSearchTokens(args);
          
          case 'get_color_palette':
            return await this.handleGetColorPalette();
          
          case 'get_token_stats':
            return await this.handleGetTokenStats();
          
          case 'validate_krds_compliance':
            return await this.handleValidateCode(args);
          
          case 'get_krds_resources':
            return await this.handleGetResources(args);

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private getTools(): Tool[] {
    return [
      {
        name: 'search_krds_components',
        description: 'KRDS 컴포넌트를 검색합니다. 검색어나 카테고리로 필터링할 수 있습니다.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: '검색할 키워드 (예: button, input, modal)',
            },
            category: {
              type: 'string',
              description: '컴포넌트 카테고리 (예: Form, Navigation, Layout)',
            },
          },
        },
      },
      {
        name: 'get_component_code',
        description: '특정 KRDS 컴포넌트의 전체 HTML 코드와 정보를 가져옵니다.',
        inputSchema: {
          type: 'object',
          properties: {
            componentName: {
              type: 'string',
              description: '컴포넌트 이름 (예: button, text_input, modal)',
            },
          },
          required: ['componentName'],
        },
      },
      {
        name: 'list_component_categories',
        description: '모든 KRDS 컴포넌트 카테고리 목록을 가져옵니다.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'list_all_components',
        description: '모든 KRDS 컴포넌트 이름 목록을 가져옵니다.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'search_design_tokens',
        description: 'KRDS 디자인 토큰을 검색합니다 (색상, 간격, 타이포그래피 등).',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              description: '토큰 타입 (예: color, spacing, typography)',
            },
            query: {
              type: 'string',
              description: '검색할 키워드 (예: primary, blue, font)',
            },
          },
        },
      },
      {
        name: 'get_color_palette',
        description: 'KRDS 전체 색상 팔레트를 가져옵니다.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_token_stats',
        description: '디자인 토큰 통계 정보를 가져옵니다.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'validate_krds_compliance',
        description: 'HTML/CSS 코드를 분석하여 KRDS 가이드라인 준수 여부를 확인하고 개선 제안을 제공합니다.',
        inputSchema: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: '검증할 HTML 또는 CSS 코드',
            },
          },
          required: ['code'],
        },
      },
      {
        name: 'get_krds_resources',
        description: 'KRDS 리소스 파일 경로와 사용법을 가져옵니다.',
        inputSchema: {
          type: 'object',
          properties: {
            resourceType: {
              type: 'string',
              description: '리소스 타입 (css, scss, fonts, images, js)',
              enum: ['css', 'scss', 'fonts', 'images', 'js'],
            },
          },
          required: ['resourceType'],
        },
      },
    ];
  }

  // 핸들러 메서드들
  private async handleSearchComponents(args: any) {
    const results = await searchComponents(this.loader, args?.query, args?.category);
    
    const text = results.length > 0
      ? `찾은 컴포넌트 (${results.length}개):\n\n` +
        results.map(c => 
          `📦 ${c.name}\n` +
          `   카테고리: ${c.category}\n` +
          `   설명: ${c.description || '설명 없음'}\n` +
          `   파일: ${c.fileName}`
        ).join('\n\n')
      : '검색 결과가 없습니다.';
    
    return {
      content: [{ type: 'text', text }],
    };
  }

  private async handleGetComponentCode(args: any) {
    if (!args?.componentName) {
      throw new Error('componentName이 필요합니다.');
    }

    const component = await getComponentCode(this.loader, args.componentName);
    
    if (!component) {
      return {
        content: [{
          type: 'text',
          text: `컴포넌트 "${args.componentName}"을 찾을 수 없습니다.`,
        }],
      };
    }

    const text = 
      `# ${component.name}\n\n` +
      `**카테고리:** ${component.category}\n` +
      `**설명:** ${component.description || '설명 없음'}\n\n` +
      `## HTML 코드\n\n` +
      `\`\`\`html\n${component.htmlCode}\n\`\`\`\n\n` +
      `## 사용법\n\n` +
      `1. KRDS CSS 파일을 프로젝트에 포함시킵니다:\n` +
      `   \`<link rel="stylesheet" href="node_modules/krds-uiux/resources/css/krds.css">\`\n\n` +
      `2. 위 HTML 코드를 복사하여 사용하세요.\n\n` +
      `3. 필요에 따라 클래스와 내용을 수정하세요.`;

    return {
      content: [{ type: 'text', text }],
    };
  }

  private async handleListCategories() {
    const categories = await listCategories(this.loader);
    const text = `KRDS 컴포넌트 카테고리:\n\n${categories.map(c => `• ${c}`).join('\n')}`;
    
    return {
      content: [{ type: 'text', text }],
    };
  }

  private async handleListComponents() {
    const components = await listComponentNames(this.loader);
    const text = `KRDS 컴포넌트 목록 (${components.length}개):\n\n${components.map(c => `• ${c}`).join('\n')}`;
    
    return {
      content: [{ type: 'text', text }],
    };
  }

  private async handleSearchTokens(args: any) {
    const results = await searchDesignTokens(this.loader, args?.type, args?.query);
    
    if (results.length === 0) {
      return {
        content: [{
          type: 'text',
          text: '검색 결과가 없습니다.',
        }],
      };
    }

    const text = `찾은 디자인 토큰 (${results.length}개):\n\n` +
      results.slice(0, 50).map(token => 
        `🎨 ${token.name}\n` +
        `   값: ${token.value}\n` +
        `   타입: ${token.type}\n` +
        `   CSS: var(${token.cssVariable})\n` +
        `   SCSS: ${token.scssVariable}`
      ).join('\n\n') +
      (results.length > 50 ? `\n\n... 그 외 ${results.length - 50}개` : '');
    
    return {
      content: [{ type: 'text', text }],
    };
  }

  private async handleGetColorPalette() {
    const colors = await getColorPalette(this.loader);
    
    const text = `KRDS 색상 팔레트 (${colors.length}개):\n\n` +
      colors.slice(0, 30).map(color => 
        `🎨 ${color.name}: ${color.value}`
      ).join('\n') +
      (colors.length > 30 ? `\n\n... 그 외 ${colors.length - 30}개 색상` : '');
    
    return {
      content: [{ type: 'text', text }],
    };
  }

  private async handleGetTokenStats() {
    const stats = await getTokenStats(this.loader);
    
    const text = `디자인 토큰 통계:\n\n` +
      Object.entries(stats)
        .sort((a, b) => b[1] - a[1])
        .map(([type, count]) => `• ${type}: ${count}개`)
        .join('\n');
    
    return {
      content: [{ type: 'text', text }],
    };
  }

  private async handleValidateCode(args: any) {
    if (!args?.code) {
      throw new Error('code가 필요합니다.');
    }

    const result = await validateCode(args.code, this.loader);
    
    const text = 
      `# KRDS 가이드라인 준수 검증 결과\n\n` +
      `**준수 여부:** ${result.isCompliant ? '✅ 준수' : '❌ 미준수'}\n` +
      `**점수:** ${result.score}/100\n\n` +
      (result.componentsUsed.length > 0 
        ? `**사용된 KRDS 컴포넌트:** ${result.componentsUsed.join(', ')}\n\n` 
        : '') +
      (result.issues.length > 0
        ? `## 발견된 문제 (${result.issues.length}개)\n\n` +
          result.issues.map(issue => {
            const icon = issue.type === 'error' ? '🔴' : issue.type === 'warning' ? '🟡' : 'ℹ️';
            return `${icon} **${issue.type.toUpperCase()}**: ${issue.message}\n` +
                   (issue.suggestion ? `   💡 ${issue.suggestion}` : '');
          }).join('\n\n') + '\n\n'
        : '문제가 발견되지 않았습니다! ✨\n\n') +
      (result.suggestions.length > 0
        ? `## 개선 제안\n\n${result.suggestions.map(s => `• ${s}`).join('\n')}\n\n`
        : '') +
      (result.recommendations && result.recommendations.length > 0
        ? `## 추천 KRDS 컴포넌트\n\n${result.recommendations.map(r => `• ${r}`).join('\n')}`
        : '');
    
    return {
      content: [{ type: 'text', text }],
    };
  }

  private async handleGetResources(args: any) {
    if (!args?.resourceType) {
      throw new Error('resourceType이 필요합니다.');
    }

    const files = await this.loader.getResourcePaths(args.resourceType);
    
    const usageMap: Record<string, string> = {
      css: 'HTML에서 사용: <link rel="stylesheet" href="node_modules/krds-uiux/resources/css/krds.css">',
      scss: 'SCSS 파일에서 import: @import "node_modules/krds-uiux/resources/scss/krds";',
      fonts: '폰트는 CSS 파일에 이미 포함되어 있습니다.',
      images: 'HTML에서 사용: <img src="node_modules/krds-uiux/resources/img/image.png">',
      js: 'JavaScript에서 import: import "node_modules/krds-uiux/resources/js/krds.js";',
    };

    const text = 
      `# KRDS ${args.resourceType.toUpperCase()} 리소스\n\n` +
      `**파일 개수:** ${files.length}개\n\n` +
      (files.length > 0
        ? `**파일 목록:**\n${files.map(f => `• ${f}`).join('\n')}\n\n`
        : '파일이 없습니다.\n\n') +
      `**사용법:**\n${usageMap[args.resourceType as keyof typeof usageMap] || '사용법 정보가 없습니다.'}`;
    
    return {
      content: [{ type: 'text', text }],
    };
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    console.error('KRDS UI/UX MCP 서버가 시작되었습니다.');
  }
}

// 서버 시작
const server = new KRDSMCPServer();
server.run().catch((error) => {
  console.error('서버 시작 중 오류 발생:', error);
  process.exit(1);
});

