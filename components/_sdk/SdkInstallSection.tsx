import SectionHeader from '@/components/_docs/SectionHeader';
import CodeBlock from '@/components/ui/CodeBlock';
import CopyButton from '@/components/ui/CopyButton';
import { SDK_INSTALL_CODE } from './data';
import { ExternalLink } from 'lucide-react';

export default function SdkInstallSection() {
  return (
    <section id="installation" className="border-b bg-[#f8fafc] border-[#dee0ea]">
      <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
        <SectionHeader label="Setup" title="Connect in one step" subtitle="Requires Python 3.10+. No API key needed to browse crawlers. Add your token to run scraping jobs." titleClassName="my-4" />

        <div className="bg-[#0a2540] rounded-xl overflow-hidden">
          <div className="flex justify-between items-center gap-2 px-4 py-3">
            <span className="leading-[2.06] text-white text-[13px]" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>&gt;_ terminal</span>
            <CopyButton text={SDK_INSTALL_CODE} variant="dark" className="border !border-[#213447] !bg-[#213447]" />
          </div>
          <CodeBlock code={SDK_INSTALL_CODE} language="bash" theme="dark" showLabel={false} codeBg="#0a1b2b" className='[&>pre]:!p-5 [&>pre]:!m-0' />
        </div>

        <div className="flex items-center justify-between mt-4 overflow-x-auto gap-4 pb-1">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[#0A2540]/60">PyPI</span>
            <a href="https://pypi.org/project/lobstrio-sdk/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[14px] text-[#0A2540] border border-[#dde1ee] rounded-md px-3.5 py-2 hover:border-[#FF0000]/40 transition bg-white whitespace-nowrap">pypi.org/project/lobstrio-sdk <ExternalLink className="w-3.5 h-3.5" /></a>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {['Python 3.10+', 'No key to browse', 'Cross-platform'].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-sm font-semibold text-[#0A2540] border border-[#dde1ee] rounded-md px-3.5 py-2 bg-white whitespace-nowrap">
                <img src="/images/check-red-icon.svg" alt="" className="w-3 h-3 shrink-0" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
