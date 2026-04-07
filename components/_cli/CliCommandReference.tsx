import SectionHeader from '@/components/_docs/SectionHeader';
import ExploreApiCta from '@/components/_docs/ExploreApiCta';
import { CLI_COMMANDS } from './data';

export default function CliCommandReference() {
  return (
    <section>
      <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
        <SectionHeader label="Reference" title="Command Reference" subtitle="All available commands grouped by resource." />
        <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
          <div className="hidden sm:flex items-stretch bg-[#f0f4f8] border-b border-[#E5E7EB]">
            <span className="w-[48%] px-4 py-[11.5px] flex items-center text-[#11182799] font-semibold leading-[1.31]">Command</span>
            <span className="w-[35%] px-4 py-[11.5px] flex items-center leading-[1.31] text-[#11182799] font-semibold">Description</span>
          </div>
          {CLI_COMMANDS.map((g, i) => (
            <div key={g.group} className={`${i === 0 ? "" : "border-t border-[#E5E7EB]"}`}>
              <div className="px-4 py-2.5 bg-[#f9fafb] border-b border-[#E5E7EB] text-[13px] font-bold tracking-[0.65px]">{g.group}</div>
              <div className="divide-y divide-[#E5E7EB]">
                {g.cmds.map((item) => (
                  <div key={item.cmd} className="flex flex-col sm:flex-row sm:items-stretch">
                    <span className="w-full sm:w-[48%] px-2.5 py-[15px] flex items-center border-b sm:border-b-0 border-[#E5E7EB]">
                      <span
                        className="inline-block text-[12px] text-[#0a2540] font-normal leading-[1.5] px-2 py-0.5 rounded-[4px] border border-[#dee0ea] bg-[#f2f5f9] whitespace-nowrap"
                        style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                      >
                        lobstr {item.cmd}
                      </span>
                    </span>
                    <span className="w-full sm:w-[35%] px-2.5 py-[15px] flex items-center text-[14px] leading-[1.5] text-[#6B7280]">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <ExploreApiCta />
      </div>
    </section>
  );
}
