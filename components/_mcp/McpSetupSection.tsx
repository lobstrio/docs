import SectionHeader from '@/components/_docs/SectionHeader';
import McpSetupTabs from '@/components/_mcp/McpSetupTabs';

interface Platform {
  name: string;
  config: string;
  lang: string;
  file?: string;
  html: string;
}

interface McpSetupSectionProps {
  platforms: Platform[];
  mcpUrl: string;
}

export default function McpSetupSection({ platforms, mcpUrl }: McpSetupSectionProps) {
  return (
    <section id="setup" className="border-b bg-[#f8fafc] border-[#dee0ea]">
      <div className="max-w-4xl mx-auto px-6 py-[80px]">
        <SectionHeader variant="compact" label="Setup" title="Connect in one step" subtitle="No API key. No OAuth. Just one command or config snippet." />
        <McpSetupTabs platforms={platforms} mcpUrl={mcpUrl} />
      </div>
    </section>
  );
}
