import SectionHeader from '@/components/_docs/SectionHeader';
import StepsColumn from '@/components/_docs/StepsColumn';
import TerminalHeader from '@/components/_docs/TerminalHeader';
import { SDK_STEPS } from './data';

export default function SdkHowItWorks() {
  return (
    <section className="border-b border-[#dee0ea]">
      <div className="max-w-4xl mx-auto px-6 py-10 md:py-[80px]">
        <SectionHeader label="How it works" title="Up and running in 30 seconds" titleClassName="mt-4 mb-16" />

        <div className="flex flex-col md:flex-row gap-10 items-start">
          <StepsColumn steps={SDK_STEPS} variant="cards" className="w-full md:w-[53%] shrink-0" />

          <div className="w-full md:flex-1 rounded-lg overflow-hidden flex flex-col mt-7.5 md:mt-0">
            <div className='flex justify-between items-center bg-[#0a2540] pr-5'>
              <TerminalHeader /> <span className='text-[13px] text-[#e1e4e8]' style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>claude_desktop_config.json</span>
            </div>
            <div className="bg-[#0a1b2b] px-6 py-5 flex-1 text-white text-[13px] font-normal leading-[22px]" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
              <p className="whitespace-pre-wrap"><span className="text-[#ffffffb3]">&#123;</span></p>
              <p className="whitespace-pre-wrap">  <span className="text-[#79b8ff]">&quot;mcpServers&quot;</span><span className="text-[#ffffffb3]">:</span> <span className="text-[#ffffffb3]">&#123;</span></p>
              <p className="whitespace-pre-wrap">    <span className="text-[#79b8ff]">&quot;lobstr&quot;</span><span className="text-[#ffffffb3]">:</span> <span className="text-[#ffffffb3]">&#123;</span></p>
              <p className="whitespace-pre-wrap">      <span className="text-[#79b8ff]">&quot;command&quot;</span><span className="text-[#ffffffb3]">:</span> <span className="text-[#4adb98]">&quot;lobstrio-mcp&quot;</span><span className="text-[#ffffffb3]">,</span></p>
              <p className="whitespace-pre-wrap">      <span className="text-[#79b8ff]">&quot;env&quot;</span><span className="text-[#ffffffb3]">:</span> <span className="text-[#ffffffb3]">&#123;</span></p>
              <p className="whitespace-pre-wrap">        <span className="text-[#79b8ff]">&quot;LOBSTR_TOKEN&quot;</span><span className="text-[#ffffffb3]">:</span> <span className="text-[#4adb98]">&quot;lbstr_xxxxxx&quot;</span></p>
              <p className="whitespace-pre-wrap">      <span className="text-[#ffffffb3]">&#125;</span></p>
              <p className="whitespace-pre-wrap">    <span className="text-[#ffffffb3]">&#125;</span></p>
              <p className="whitespace-pre-wrap">  <span className="text-[#ffffffb3]">&#125;</span></p>
              <p className="whitespace-pre-wrap"><span className="text-[#ffffffb3]">&#125;</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
