import SectionHeader from '@/components/_docs/SectionHeader';
import { MCP_EXAMPLE_PROMPTS } from './data';

export default function McpExamplePrompts() {
  return (
    <section id="examples" className="border-b border-[#dee0ea]">
      <div className="max-w-4xl mx-auto px-6 py-[80px]">
        <SectionHeader variant="compact" label="Example Prompts" title="What will you ask?" subtitle="Once connected, try asking your AI assistant:" />
        <div className="space-y-4">
          {MCP_EXAMPLE_PROMPTS.map((prompt, i) => (
            <div key={i} className="flex items-center gap-3 border border-[#dee0ea] rounded-lg px-6 py-4 hover:border-[#FF0000] hover:[box-shadow:8px_8px_13px_0_rgba(33,52,71,0.07)] transition">
              <img src="/images/arrow-red-icon.svg" alt="" className="w-2 h-2 shrink-0" />
              <span className="text-[16px] font-semibold leading-[1.63]">{prompt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
