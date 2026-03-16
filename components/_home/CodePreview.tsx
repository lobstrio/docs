"use client";

import CopyButton from "@/components/ui/CopyButton";

export default function CodePreview({ html, rawCode }: { html: string; rawCode: string }) {
  return (
    <div className="md:sticky md:top-6">
      <div className="bg-[#0a2540] rounded-xl h-[800px] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center gap-2 px-4 py-3 shrink-0">
          <span className="leading-[2.06] text-[#fff] ml-2">example.py</span>
          <CopyButton text={rawCode} variant="dark" className="ml-auto border !border-[#213447] !bg-[#213447]" />
        </div>
        <div
          className="p-4 overflow-auto flex-1 text-[13px] leading-relaxed !bg-[#0a1b2b] [&_pre]:!bg-[#0a1b2b] [&_code]:!bg-[#0a1b2b]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
