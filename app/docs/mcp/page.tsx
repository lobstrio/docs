import { Metadata } from 'next';
import { codeToHtml } from 'shiki';
import FeaturesBar from '@/components/_home/FeaturesBar';
import McpHero from '@/components/_mcp/McpHero';
import McpToolsSection from '@/components/_mcp/McpToolsSection';
import McpHowItWorks from '@/components/_mcp/McpHowItWorks';
import McpSetupSection from '@/components/_mcp/McpSetupSection';
import McpExamplePrompts from '@/components/_mcp/McpExamplePrompts';
import McpApiReference from '@/components/_mcp/McpApiReference';
import { MCP_BAR_FEATURES, buildMcpPlatforms } from '@/components/_mcp/data';

export const metadata: Metadata = {
  title: 'MCP Server - lobstr.io API Documentation',
  description: 'Connect AI assistants to lobstr.io API documentation using the Model Context Protocol (MCP). Search docs, get code examples, and explore scrapers programmatically.',
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.lobstr.io';
const MCP_URL = `${BASE_URL}/api/mcp`;

export default async function McpPage() {
  const platforms = buildMcpPlatforms(MCP_URL);
  const platformsWithHtml = await Promise.all(
    platforms.map(async (p) => ({
      ...p,
      html: await codeToHtml(p.config, { lang: p.lang, theme: 'github-dark' }),
    }))
  );

  return (
    <div className="min-h-screen bg-white">
      <McpHero />
      <section>
        <FeaturesBar features={MCP_BAR_FEATURES} />
      </section>
      <McpToolsSection />
      <McpHowItWorks />
      <McpSetupSection platforms={platformsWithHtml} mcpUrl={MCP_URL} />
      <McpExamplePrompts />
      <McpApiReference />
    </div>
  );
}
