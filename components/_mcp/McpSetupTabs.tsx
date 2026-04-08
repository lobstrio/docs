'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import McpCopyButton from '@/components/_mcp/McpCopyButton';

function ExternalLinkIcon() {
  return <ExternalLink className="w-3.5 h-3.5 shrink-0" />;
}

interface Platform {
  name: string;
  file?: string;
  html: string;
  config: string;
}

export default function McpSetupTabs({ platforms, mcpUrl }: { platforms: Platform[]; mcpUrl: string }) {
  const [active, setActive] = useState(0);
  const platform = platforms[active];

  return (
    <div>
      <div className=" rounded-xl overflow-hidden">
        {/* Tab bar */}
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-none">
          {platforms.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(i)}
              className={`px-5 py-3 text-sm font-sm font-semibold whitespace-nowrap transition border-b-2 -mb-px ${
                i === active
                  ? 'text-[#FF0000] border-[#FF0000]'
                  : 'text-[#536679] border-transparent'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Dark terminal code block */}
        <div>
          {/* Terminal header */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#0a2540]">
            <span className="text-[13px] text-[#e1e4e8] font-mono">
              &gt;_ {platform.file ?? platform.name}
            </span>
            <McpCopyButton text={platform.config} dark />
          </div>
          <div
            className="[&>pre]:!bg-[#0a1b2b] [&>pre]:!rounded-none [&>pre]:!rounded-b-xl [&>pre]:!p-6 [&>pre]:!m-0 [&>pre]:!text-[13px] [&>pre]:!leading-relaxed [&>pre]:!overflow-auto [&>pre]:!h-[160px] [&_code]:!text-[13px]"
            dangerouslySetInnerHTML={{ __html: platform.html }}
          />
        </div>
      </div>

      {/* Server URL bar */}
      <div className="mt-5.5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0 sm:contents">
          <span className="text-[16px] font-normal text-[#0A2540]/60 shrink-0">Server URL</span>
          <a href={mcpUrl} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#0A2540] bg-white px-[14px] py-2 rounded-[8px] border border-[#DDE1EE] shrink-0 hover:border-[#FF0000]/40 transition" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
            {mcpUrl}
          </a>
          <div className="flex gap-2 shrink-0 sm:ml-auto">
            {['Public endpoint', 'No API key', 'OAuth not required'].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-[14px] font-semibold py-2 rounded-[8px] border border-[#DDE1EE] text-[14px] text-[#0a2540e6]/90 bg-white shrink-0"
              >
                <img src="/images/check-red-icon.svg" alt="" className="w-2.5 h-2.5 shrink-0" /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
