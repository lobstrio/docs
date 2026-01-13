import fs from 'fs';
import path from 'path';
import { DocContent, Navigation } from '../types/content';

/**
 * Load code example from file
 */
function loadCodeExample(slug: string, type: 'curl' | 'python' | 'response'): string {
  const filePath = path.join(process.cwd(), 'content', 'code-examples', type, slug);

  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.warn(`Code example not found: ${filePath}`);
    return '';
  }
}

/**
 * Load documentation content for a specific slug
 */
export async function loadDocContent(slug: string): Promise<DocContent> {
  const filePath = path.join(process.cwd(), 'content', 'docs', `${slug}.json`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const content: DocContent = JSON.parse(fileContent);

    // Load code examples from files
    content.examples = {
      curl: loadCodeExample(slug, 'curl'),
      python: loadCodeExample(slug, 'python'),
      response: {
        status: 200,
        body: loadCodeExample(slug, 'response'),
      },
    };

    return content;
  } catch (error) {
    throw new Error(`Failed to load content for slug: ${slug}`);
  }
}

/**
 * Get all available document slugs
 */
export async function getAllDocSlugs(): Promise<string[]> {
  const docsDir = path.join(process.cwd(), 'content', 'docs');

  try {
    // Check if directory exists
    if (!fs.existsSync(docsDir)) {
      return [];
    }

    const files = fs.readdirSync(docsDir);
    const slugs = files
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace('.json', ''));

    return slugs;
  } catch (error) {
    console.error('Error reading docs directory:', error);
    return [];
  }
}

/**
 * Load navigation structure
 */
export async function loadNavigation(): Promise<Navigation> {
  const filePath = path.join(process.cwd(), 'content', 'navigation.json');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const navigation: Navigation = JSON.parse(fileContent);
    return navigation;
  } catch (error) {
    // Return default navigation if file doesn't exist
    return {
      sections: [
        {
          title: 'Getting Started',
          items: [
            { title: 'Authentication', slug: 'authentication' },
          ],
        },
        {
          title: 'User',
          items: [
            { title: 'Get User Profile', slug: 'user-me' },
            { title: 'Get Balance', slug: 'get-balance' },
          ],
        },
      ],
    };
  }
}

/**
 * Check if a doc exists
 */
export async function docExists(slug: string): Promise<boolean> {
  const filePath = path.join(process.cwd(), 'content', 'docs', `${slug}.json`);
  return fs.existsSync(filePath);
}
