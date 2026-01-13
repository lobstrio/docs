import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  loadDocContent,
  getAllDocSlugs,
  loadNavigation,
} from '@/lib/content/content-loader';
import ThreeColumnLayout from '@/components/layout/ThreeColumnLayout';
import Sidebar from '@/components/layout/Sidebar';
import DocContent from '@/components/layout/DocContent';
import CodeColumn from '@/components/layout/CodeColumn';
import { codeToHtml } from 'shiki';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all documentation pages
 * This enables static generation at build time
 */
export async function generateStaticParams() {
  const slugs = await getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const content = await loadDocContent(slug);

    return {
      title: content.seo.title,
      description: content.seo.description,
      openGraph: {
        title: content.seo.title,
        description: content.seo.description,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: content.seo.title,
        description: content.seo.description,
      },
    };
  } catch (error) {
    return {
      title: 'Page Not Found - Lobstr.io API Documentation',
      description: 'The requested documentation page could not be found.',
    };
  }
}

/**
 * Dynamic documentation page
 */
export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const content = await loadDocContent(slug);
    const navigation = await loadNavigation();

    // Generate syntax-highlighted HTML for code examples
    const highlightedCode = {
      curl: await codeToHtml(content.examples.curl || '# No example available', {
        lang: 'bash',
        theme: 'github-dark',
      }),
      python: await codeToHtml(content.examples.python || '# No example available', {
        lang: 'python',
        theme: 'github-dark',
      }),
      response: await codeToHtml(content.examples.response.body || '{}', {
        lang: 'json',
        theme: 'github-dark',
      }),
    };

    return (
      <ThreeColumnLayout
        sidebar={<Sidebar navigation={navigation} />}
        codeColumn={<CodeColumn examples={content.examples} highlightedCode={highlightedCode} />}
      >
        <DocContent content={content} />
      </ThreeColumnLayout>
    );
  } catch (error) {
    notFound();
  }
}
