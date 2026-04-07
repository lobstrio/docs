import SectionHeader from '@/components/_docs/SectionHeader';
import SdkQuickStartTabs from '@/components/ui/SdkQuickStartTabs';

interface SdkQuickStartProps {
  quickstartHtml: string;
  asyncHtml: string;
  quickstartCode: string;
  asyncCode: string;
}

export default function SdkQuickStart({ quickstartHtml, asyncHtml, quickstartCode, asyncCode }: SdkQuickStartProps) {
  return (
    <section id="quickstart" className="border-b border-[#dee0ea]">
      <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
        <SectionHeader label="Reference" title="Quick Start" subtitle="Full workflow: create squid, add tasks, run, get results." titleClassName="my-4" />
        <SdkQuickStartTabs
          quickstartHtml={quickstartHtml}
          asyncHtml={asyncHtml}
          quickstartCode={quickstartCode}
          asyncCode={asyncCode}
        />
      </div>
    </section>
  );
}
