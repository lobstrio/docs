import SectionHeader from '@/components/_docs/SectionHeader';
import QuickStartTabs from '@/components/ui/QuickStartTabs';

interface CliQuickStartProps {
  goHtml: string;
  workflowHtml: string;
  goCode: string;
  workflowCode: string;
}

export default function CliQuickStart({ goHtml, workflowHtml, goCode, workflowCode }: CliQuickStartProps) {
  return (
    <section id="quickstart" className="border-b border-[#dee0ea]">
      <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
        <SectionHeader label="Quick Start" title="What will you scrape?" subtitle="Full workflow: create squid, add tasks, run, get results" />
        <QuickStartTabs goHtml={goHtml} workflowHtml={workflowHtml} goCode={goCode} workflowCode={workflowCode} />
      </div>
    </section>
  );
}
