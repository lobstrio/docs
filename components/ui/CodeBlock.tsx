import { codeToHtml } from 'shiki';
import { CodeBlockProps } from '@/lib/types/layout.type';
import CopyButton from './CopyButton';

export default async function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  theme = 'dark',
  showCopy = false,
  showLabel = true,
}: CodeBlockProps) {
  const shikiTheme = theme === 'dark' ? 'github-dark' : 'github-light';

  // Safe: Shiki generates trusted HTML at build time from hardcoded code strings, not user input
  const html = await codeToHtml(code, {
    lang: language,
    theme: shikiTheme,
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

  const preStyles = theme === 'dark'
    ? '[&>pre]:!bg-surface [&>pre]:!p-4 [&>pre]:!m-0'
    : '[&>pre]:!bg-[#F6F8FA] [&>pre]:!p-5 [&>pre]:!m-0 [&>pre]:!rounded-b-lg';

  return (
    <div className="relative group">
      {showLabel && (
        <div className="absolute top-3 right-3 z-10">
          <span className="badge bg-surface text-text-secondary text-xs uppercase">
            {language}
          </span>
        </div>
      )}

      {showCopy && (
        <div className={`absolute ${showLabel ? 'top-12' : 'top-3'} right-3 z-10`}>
          <CopyButton text={code} />
        </div>
      )}

      <div
        className={`overflow-x-auto rounded-lg text-sm [&>pre]:!text-[13px] [&>pre]:!leading-relaxed ${preStyles}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
