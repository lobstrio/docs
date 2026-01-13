'use client';

import { useState } from 'react';
import { CodeExamples } from '@/lib/types/content';
import CopyButton from '@/components/ui/CopyButton';

interface CodeColumnProps {
  examples: CodeExamples;
  highlightedCode: {
    curl: string;
    python: string;
    response: string;
  };
}

type Tab = 'curl' | 'python' | 'response';

/**
 * Sticky code column with tabs for different code examples
 * Displays cURL, Python, and Response examples with syntax highlighting
 */
export default function CodeColumn({ examples, highlightedCode }: CodeColumnProps) {
  const [activeTab, setActiveTab] = useState<Tab>('curl');

  // Safety check for highlightedCode
  if (!highlightedCode) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <p className="text-text-muted">Loading code examples...</p>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; code: string; html: string }[] = [
    { id: 'curl', label: 'cURL', code: examples.curl, html: highlightedCode.curl },
    { id: 'python', label: 'Python', code: examples.python, html: highlightedCode.python },
    {
      id: 'response',
      label: 'Response',
      code: examples.response.body,
      html: highlightedCode.response,
    },
  ];

  const activeExample = tabs.find((tab) => tab.id === activeTab)!;

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 mb-4 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-accent-blue text-accent-blue'
                : 'border-transparent text-text-muted hover:text-text-secondary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div className="flex-1 overflow-auto">
        <div className="relative">
          {/* Copy Button */}
          <div className="absolute top-3 right-3 z-10">
            <CopyButton text={activeExample.code} />
          </div>

          {/* Highlighted Code */}
          <div
            className="[&>pre]:!bg-black/30 [&>pre]:!rounded-lg [&>pre]:!p-4 [&>pre]:!pr-16 [&>pre]:!m-0 [&>pre]:!border [&>pre]:!border-border [&>pre]:!overflow-x-auto [&>pre]:!text-sm"
            dangerouslySetInnerHTML={{ __html: activeExample.html }}
          />
        </div>

        {/* Response Status Badge */}
        {activeTab === 'response' && (
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">Status:</span>
              <span
                className={`badge ${
                  examples.response.status === 200 ? 'badge-get' : 'badge-delete'
                }`}
              >
                {examples.response.status}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-text-muted">
          Base URL: <code className="text-accent-blue">https://api.lobstr.io</code>
        </p>
      </div>
    </div>
  );
}
