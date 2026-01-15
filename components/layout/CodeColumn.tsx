'use client';

import { useState } from 'react';
import { CodeExamples } from '@/lib/types/content';
import CopyButton from '@/components/ui/CopyButton';

interface HighlightedLanguage {
  language: string;
  label: string;
  code: string;
  html: string;
}

interface HighlightedResponse {
  status: number;
  body: string;
  html: string;
}

interface CodeColumnProps {
  examples: CodeExamples;
  highlightedCode: {
    languages: HighlightedLanguage[];
    responses: HighlightedResponse[];
  };
}

/**
 * Get badge class based on status code
 */
function getStatusBadgeClass(status: number): string {
  if (status >= 200 && status < 300) return 'badge-get';
  if (status >= 400 && status < 500) return 'badge-delete';
  if (status >= 500) return 'badge-delete';
  return 'badge-post';
}

/**
 * Get status text for display
 */
function getStatusText(status: number): string {
  const statusTexts: Record<number, string> = {
    100: 'Created',
    120: 'Synchronizing',
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  };
  return statusTexts[status] || '';
}

/**
 * Sticky code column with dynamic tabs for code examples
 * Auto-discovers language folders and response status codes
 */
export default function CodeColumn({ examples, highlightedCode }: CodeColumnProps) {
  const [activeLanguageIndex, setActiveLanguageIndex] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [activeResponseIndex, setActiveResponseIndex] = useState(0);

  // Safety check
  if (!highlightedCode) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <p className="text-text-muted">Loading code examples...</p>
      </div>
    );
  }

  const languages = highlightedCode.languages || [];
  const responses = highlightedCode.responses || [];
  const activeLanguage = languages[activeLanguageIndex];
  const activeResponse = responses[activeResponseIndex];

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Main Tab Switcher: Languages + Response */}
      <div className="flex items-center gap-2 mb-4 border-b border-border">
        {languages.map((lang, index) => (
          <button
            key={lang.language}
            onClick={() => {
              setActiveLanguageIndex(index);
              setShowResponse(false);
            }}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              !showResponse && activeLanguageIndex === index
                ? 'border-accent-red text-accent-red'
                : 'border-transparent text-text-muted hover:text-text-secondary'
            }`}
          >
            {lang.label}
          </button>
        ))}
        {responses.length > 0 && (
          <button
            onClick={() => setShowResponse(true)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              showResponse
                ? 'border-accent-red text-accent-red'
                : 'border-transparent text-text-muted hover:text-text-secondary'
            }`}
          >
            Response
          </button>
        )}
      </div>

      {/* Response Status Selector (only shown when Response tab is active) */}
      {showResponse && responses.length > 1 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {responses.map((response, index) => (
            <button
              key={response.status}
              onClick={() => setActiveResponseIndex(index)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeResponseIndex === index
                  ? getStatusBadgeClass(response.status) + ' ring-2 ring-offset-2 ring-offset-code-bg ring-white/20'
                  : 'bg-surface text-text-muted hover:text-text-secondary border border-border'
              }`}
            >
              {response.status}
            </button>
          ))}
        </div>
      )}

      {/* Code Display */}
      <div className="flex-1 overflow-auto">
        <div className="relative">
          {/* Copy Button */}
          <div className="absolute top-3 right-3 z-10">
            <CopyButton
              text={showResponse ? activeResponse?.body || '' : activeLanguage?.code || ''}
            />
          </div>

          {/* Highlighted Code - Language */}
          {!showResponse && activeLanguage && (
            <div
              className="[&>pre]:!bg-black/30 [&>pre]:!rounded-lg [&>pre]:!p-4 [&>pre]:!pr-16 [&>pre]:!m-0 [&>pre]:!border [&>pre]:!border-border [&>pre]:!overflow-x-auto [&>pre]:!text-sm"
              dangerouslySetInnerHTML={{ __html: activeLanguage.html }}
            />
          )}

          {/* Highlighted Code - Response */}
          {showResponse && activeResponse && (
            <div
              className="[&>pre]:!bg-black/30 [&>pre]:!rounded-lg [&>pre]:!p-4 [&>pre]:!pr-16 [&>pre]:!m-0 [&>pre]:!border [&>pre]:!border-border [&>pre]:!overflow-x-auto [&>pre]:!text-sm"
              dangerouslySetInnerHTML={{ __html: activeResponse.html }}
            />
          )}
        </div>

        {/* Response Status Badge */}
        {showResponse && activeResponse && (
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">Status:</span>
              <span className={`badge ${getStatusBadgeClass(activeResponse.status)}`}>
                {activeResponse.status}
              </span>
              <span className="text-sm text-text-muted">
                {getStatusText(activeResponse.status)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-text-muted">
          Base URL: <code className="text-accent-red">https://api.lobstr.io</code>
        </p>
      </div>
    </div>
  );
}
