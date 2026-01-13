import { DocContent as DocContentType } from '@/lib/types/content';
import ProTip from '@/components/ui/ProTip';
import CopyForLLMButton from '@/components/ui/CopyForLLMButton';
import ParametersList from '@/components/docs/ParametersList';
import ResponseFieldsList from '@/components/docs/ResponseFieldsList';
import { getMethodBadgeClass } from '@/lib/utils/code-generator';
import { marked } from 'marked';

interface DocContentProps {
  content: DocContentType;
}

/**
 * Main documentation content component
 * Displays the explanatory content with headings, parameters, and pro-tips
 */
export default function DocContent({ content }: DocContentProps) {
  const methodBadgeClass = getMethodBadgeClass(content.metadata.method);

  // Process introduction - separate text from section markers
  const processIntroduction = () => {
    const text = content.content.introduction;
    const markerRegex = /\{\{RENDER:(\w+)\}\}/g;

    // Remove all {{RENDER:}} markers from the text
    const cleanText = text.replace(markerRegex, '');

    // Parse the clean markdown
    const html = marked.parse(cleanText, {
      async: false,
      breaks: true,
      gfm: true,
    }) as string;

    return html;
  };

  // Collect all sections to render at the end
  const renderSections = () => {
    if (!content.content.sections) return null;

    const sections: JSX.Element[] = [];
    const text = content.content.introduction;
    const markerRegex = /\{\{RENDER:(\w+)\}\}/g;
    let match;

    while ((match = markerRegex.exec(text)) !== null) {
      const sectionName = match[1];
      const section = content.content.sections?.[sectionName];

      if (section) {
        if ('fields' in section) {
          sections.push(
            <ResponseFieldsList
              key={sectionName}
              title={section.title}
              fields={section.fields}
            />
          );
        } else if ('parameters' in section) {
          sections.push(
            <ParametersList
              key={sectionName}
              title={section.title}
              parameters={section.parameters}
            />
          );
        }
      }
    }

    return sections;
  };

  const introductionHtml = processIntroduction();
  const sections = renderSections();

  return (
    <div className="prose prose-invert max-w-none">
      {/* Header with Copy for LLM Button */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`badge ${methodBadgeClass}`}>
              {content.metadata.method}
            </span>
            <code className="text-sm text-text-secondary bg-surface px-3 py-1 rounded">
              {content.metadata.endpoint}
            </code>
          </div>
          <h1 className="text-5xl font-bold mb-4 mt-0">{content.title}</h1>
          <p className="text-xl text-text-secondary">{content.description}</p>
        </div>
        <div className="ml-4">
          <CopyForLLMButton content={content} />
        </div>
      </div>

      {/* Introduction */}
      <div
        className="text-lg leading-relaxed mb-8"
        dangerouslySetInnerHTML={{ __html: introductionHtml }}
      />

      {/* Headers Section */}
      {content.content.headers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Headers</h2>
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">
                    Key
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">
                    Value
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">
                    Required
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.content.headers.map((header, index) => (
                  <tr
                    key={index}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3">
                      <code className="text-sm text-accent-blue">
                        {header.key}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-sm text-text-secondary">
                        {header.value}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-sm ${
                          header.required ? 'text-accent-green' : 'text-text-muted'
                        }`}
                      >
                        {header.required ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Parameters Section */}
      {content.content.parameters.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Parameters</h2>
          <div className="space-y-4">
            {content.content.parameters.map((param, index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <code className="text-base text-accent-blue font-semibold">
                      {param.name}
                    </code>
                    <span className="text-sm text-text-muted ml-2">
                      {param.type}
                    </span>
                  </div>
                  <span
                    className={`badge text-xs ${
                      param.required ? 'badge-get' : 'bg-surface'
                    }`}
                  >
                    {param.required ? 'Required' : 'Optional'}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{param.description}</p>
                {param.example && (
                  <div className="mt-2">
                    <span className="text-xs text-text-muted">Example: </span>
                    <code className="text-sm text-accent-green">
                      {param.example}
                    </code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Response Fields and Custom Sections */}
      {sections && sections.length > 0 && (
        <div className="mb-8">
          {sections}
        </div>
      )}

      {/* Pro Tips */}
      {content.content.proTips.length > 0 && (
        <div className="my-8 space-y-4">
          {content.content.proTips.map((tip, index) => (
            <ProTip key={index} type={tip.type}>
              {tip.content}
            </ProTip>
          ))}
        </div>
      )}

      {/* Additional Notes */}
      {content.content.additionalNotes && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">Additional Notes</h2>
          <p className="text-text-secondary leading-relaxed">
            {content.content.additionalNotes}
          </p>
        </div>
      )}
    </div>
  );
}
