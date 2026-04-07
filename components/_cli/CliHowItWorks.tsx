import SectionHeader from '@/components/_docs/SectionHeader';
import StepsColumn from '@/components/_docs/StepsColumn';
import TerminalHeader from '@/components/_docs/TerminalHeader';
import { CLI_STEPS } from './data';

export default function CliHowItWorks() {
  return (
    <section className="border-b border-[#dee0ea]">
      <div className="max-w-4xl mx-auto px-6 py-10 md:py-[80px]">
        <SectionHeader label="How it works" title="Up and running in 30 seconds" titleClassName="mb-16" />

        <div className="flex flex-col md:flex-row gap-10">
          <StepsColumn steps={CLI_STEPS} className="w-full md:flex-shrink-0 md:w-[366px]" />

          <div className="w-full md:flex-1 md:w-[367px] rounded-lg overflow-hidden flex flex-col mt-7.5 md:h-[410px]">
            <TerminalHeader />
            <div className="bg-[#0a1b2b] px-6 py-5 text-[14px] font-normal font-mono leading-[2.43] flex-1 flex flex-col gap-0 items-start justify-center">
              <div className="space-y-1.5">
                <p className="text-[#ffffffb3] whitespace-pre-wrap"><span className="text-[#ffffffb3]"># Install</span> <span className="text-white">pip install lobstrio</span> <span className="text-[#ffffffb3]"> # Find a crawler</span> <span className="text-white">lobstr</span></p>
              </div>
              <div className="space-y-1.5">
                <p className="text-white whitespace-pre-wrap">crawlers search <span className="text-[#79b8ff]">&quot;google maps&quot;</span> <span className="text-[#ffffffb3]"> # One-command</span></p>
              </div>
              <div className="space-y-1.5">
                <p className="text-white whitespace-pre-wrap"><span className="text-[#ffffffb3]"># scrape</span> lobstr go google-maps-leads-scraper \
                   <span className="text-[#79b8ff] pl-2 whitespace-pre-wrap break-all">&quot;https://google.com/maps/search/restaurants+paris&quot;</span> \ -o
                </p>
              </div>
              <p className="text-[#ffffffb3] whitespace-pre-wrap">leads.csv ────────────────────────────────────────</p>
              <div className="space-y-2">
                <p className="text-[#4adb98]">──────── ✓ squid created ✓ 200 tasks added ✓ run</p>
                <div className='flex items-center gap-1 text-white text-[14px]'>
                  <span className="text-[#4adb98]">started</span>
                  <div className='h-[13px] overflow-hidden flex items-center'>
                    <span style={{ fontSize: 12 }}>███████████████████░░░░░░░░░░</span>
                  </div>
                  <span>67% ✓ download</span>
                </div>
              </div>
              <p className="text-[#ffffffb3] whitespace-pre-wrap">complete ─────────────────────────────────────────</p>
              <p className="whitespace-pre-wrap text-[#ffffffb3]">──────── <span className="text-[#79b8ff]">Saved</span> <span className="text-white">leads.csv (1 204 rows)</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
