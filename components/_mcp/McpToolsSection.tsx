import SectionHeader from '@/components/_docs/SectionHeader';
import FeatureCard from '@/components/_docs/FeatureCard';
import { MCP_TOOLS } from './data';

export default function McpToolsSection() {
  return (
    <section id="tools" className="border-b border-[#dee0ea]">
      <div className="max-w-4xl mx-auto px-6 py-[80px]">
        <SectionHeader variant="compact" label="Available Tools" title="Everything your AI needs" subtitle="6 tools for searching, browsing, and retrieving API documentation." />
        <div className="grid md:grid-cols-2 gap-6">
          {MCP_TOOLS.map((tool) => (
            <FeatureCard key={tool.name} tag={tool.tag} title={tool.name} description={tool.description} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
