import fs from 'fs';
import path from 'path';
import { DocContent, Navigation, ResponseExample, LanguageExample } from '../types/content';

/**
 * Language display labels
 */
const LANGUAGE_LABELS: Record<string, string> = {
  curl: 'cURL',
  python: 'Python',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  go: 'Go',
  ruby: 'Ruby',
  php: 'PHP',
  java: 'Java',
  csharp: 'C#',
  rust: 'Rust',
  node: 'Node.js',
};

/**
 * Get display label for a language folder
 */
function getLanguageLabel(folder: string): string {
  return LANGUAGE_LABELS[folder.toLowerCase()] || folder.charAt(0).toUpperCase() + folder.slice(1);
}

/**
 * Dynamically discover and load all language examples for a slug
 */
function loadLanguageExamples(slug: string): LanguageExample[] {
  const codeExamplesDir = path.join(process.cwd(), 'content', 'code-examples');
  const examples: LanguageExample[] = [];

  try {
    const folders = fs.readdirSync(codeExamplesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name !== 'response')
      .map(dirent => dirent.name);

    for (const folder of folders) {
      const filePath = path.join(codeExamplesDir, folder, slug);

      if (fs.existsSync(filePath)) {
        const code = fs.readFileSync(filePath, 'utf-8');
        examples.push({
          language: folder,
          label: getLanguageLabel(folder),
          code,
        });
      }
    }

    // Sort: curl first, then python, then alphabetically
    const priority = ['curl', 'python'];
    examples.sort((a, b) => {
      const aIndex = priority.indexOf(a.language);
      const bIndex = priority.indexOf(b.language);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.label.localeCompare(b.label);
    });
  } catch (error) {
    console.warn(`Error loading language examples for ${slug}:`, error);
  }

  return examples;
}

/**
 * Load all response examples for a slug from folder structure:
 * content/code-examples/response/{slug}/200, 401, 404, etc.
 */
function loadResponseExamples(slug: string): ResponseExample[] {
  const slugResponseDir = path.join(process.cwd(), 'content', 'code-examples', 'response', slug);
  const responses: ResponseExample[] = [];

  try {
    // Check if the slug folder exists
    if (!fs.existsSync(slugResponseDir)) {
      return responses;
    }

    const files = fs.readdirSync(slugResponseDir);

    for (const file of files) {
      // Each file should be named as a status code (200, 401, 404, etc.)
      const status = parseInt(file, 10);
      if (!isNaN(status)) {
        const filePath = path.join(slugResponseDir, file);
        const stat = fs.statSync(filePath);

        // Only read files, not directories
        if (stat.isFile()) {
          const body = fs.readFileSync(filePath, 'utf-8');
          responses.push({ status, body });
        }
      }
    }

    // Sort by status code (success codes first)
    responses.sort((a, b) => a.status - b.status);
  } catch (error) {
    console.warn(`Error loading response examples for ${slug}:`, error);
  }

  return responses;
}

/**
 * Load documentation content for a specific slug
 */
export async function loadDocContent(slug: string): Promise<DocContent> {
  const filePath = path.join(process.cwd(), 'content', 'docs', `${slug}.json`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const content: DocContent = JSON.parse(fileContent);

    // Load code examples from files (dynamic discovery)
    content.examples = {
      languages: loadLanguageExamples(slug),
      responses: loadResponseExamples(slug),
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
