import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

/**
 * Syntax-highlighted code block component using Shiki
 * Server-side rendered for better performance
 */
export default async function CodeBlock({
  code,
  language,
  showLineNumbers = false,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark',
    transformers: showLineNumbers
      ? [
          {
            line(node, line) {
              node.properties['data-line'] = line;
            },
          },
        ]
      : [],
  });

  return (
    <div className="relative group">
      {/* Language Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="badge bg-surface text-text-secondary text-xs uppercase">
          {language}
        </span>
      </div>

      {/* Code */}
      <div
        className="overflow-x-auto rounded-lg text-sm [&>pre]:!bg-surface [&>pre]:!p-4 [&>pre]:!m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
