'use client';

import { useState } from 'react';
import CopyButton from '@/components/ui/CopyButton';

const TABS = ['Quickstart', 'Async Client'] as const;
type Tab = typeof TABS[number];

interface SdkQuickStartTabsProps {
  quickstartHtml: string;
  asyncHtml: string;
  quickstartCode: string;
  asyncCode: string;
}

export default function SdkQuickStartTabs({ quickstartHtml, asyncHtml, quickstartCode, asyncCode }: SdkQuickStartTabsProps) {
  const [active, setActive] = useState<Tab>('Quickstart');

  const html = active === 'Quickstart' ? quickstartHtml : asyncHtml;
  const code = active === 'Quickstart' ? quickstartCode : asyncCode;
  const filename = active === 'Quickstart' ? 'quickstart.py' : 'async_example.py';

  return (
    <>
      {/* Tab switcher */}
      <div className="flex justify-center mb-11">
        <div className="inline-flex items-center bg-[#f2f5f9] border border-[#dee0ea] rounded-lg p-1 gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-5 py-2 rounded-md text-[13px] font-semibold leading-normal transition cursor-pointer ${
                active === tab ? 'bg-[#FF0000] text-white shadow-sm' : 'text-[#536679]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Code window */}
      <div className="bg-[#0a2540] rounded-xl overflow-hidden">
        <div className="flex justify-between items-center gap-2 px-4 py-3">
          <span className="text-[#e1e4e8] text-[13px]" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
            {'>'}_&nbsp; {filename}
          </span>
          <CopyButton text={code} variant="dark" className="border !border-[#213447] !bg-[#213447]" />
        </div>
        <div
          className="h-[362px] overflow-y-auto overflow-x-hidden text-sm [&>pre]:!text-[13px] [&>pre]:!leading-relaxed [&>pre]:!whitespace-pre-wrap [&>pre]:!break-words [&_code]:!whitespace-pre-wrap [&_code]:!break-words [&>pre]:!p-5 [&>pre]:!m-0 [&>pre]:!min-h-full"
          style={{ backgroundColor: '#0a1b2b' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}
