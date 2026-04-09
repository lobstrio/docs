import SectionHeader from '@/components/_docs/SectionHeader';
import StepsColumn from '@/components/_docs/StepsColumn';
import TerminalHeader from '@/components/_docs/TerminalHeader';
import { MCP_STEPS } from './data';

export default function McpHowItWorks() {
  return (
    <section className="border-b border-[#dee0ea]">
      <div className="max-w-4xl mx-auto px-6 md:px-0 py-[80px]">
        <SectionHeader variant="compact" label="How it works" title="Up and running in 30 seconds" titleClassName="mb-16" />

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          <StepsColumn steps={MCP_STEPS} variant="cards" />

          <div className="rounded-lg overflow-hidden h-full flex flex-col">
            <TerminalHeader />
            <div className="bg-[#0a1b2b] px-6 py-4 text-[13px] font-mono flex-1 flex flex-col gap-5 justify-center">
              <div className="space-y-5">
                <p className="text-[#6b7882]"># Ask your AI assistant</p>
                <p className="text-[#919aa1] text-[15px] leading-[1.6]">&quot;Show me Python code to use an existing LinkedIn scraper and add tasks.&quot;</p>
              </div>
              <hr className="border-[#42545f]" />
              <div className="space-y-3">
                <p className="text-[#00ce95]">✓ <span>get_doc</span> <span className="text-[#50606c]">POST /v1/squids</span></p>
                <p className="text-[#00ce95]">✓ <span>get_code_example</span> <span className="text-[#50606c]">python</span></p>
                <p className="text-[#00ce95]">✓ <span>get_doc</span> <span className="text-[#50606c]">POST /v1/tasks</span></p>
              </div>
              <hr className="border-[#42545f]" />
              <div className="space-y-3">
                <p><span className="text-[#418fc5]">import</span> <span className="text-[#50606c]">requests</span></p>
                <p><span className="text-[#50606c]">url</span> <span className="text-white/40">= </span><span className="text-[#418fc5]">&quot;https://api.lobstr.io/v1/squids&quot;</span></p>
                <p><span className="text-[#50606c]">headers</span> <span className="text-white/40">= </span><span className="text-white/40">{'{'}</span><span className="text-[#418fc5]">&quot;Authorization&quot;: &quot;Token ...&quot;</span><span className="text-white/40">{'}'}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
