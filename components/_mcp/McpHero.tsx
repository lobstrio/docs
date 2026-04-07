import { ExternalLink } from 'lucide-react';
import HeroButton from '@/components/ui/HeroButton';

export default function McpHero() {
  return (
    <section>
      <div className="max-w-4xl mx-auto px-6 py-10 md:py-[80px] text-center">
        <div className="inline-flex items-center px-2 py-1 rounded-lg border border-[#FF7F7F] bg-[#FFF2F2] text-[#FF0000] text-sm mb-3.5">
          Model Context Protocol
        </div>
        <h1 className="text-[40px] md:text-[64px] font-[900] text-[#0A2540] leading-[1.22] tracking-normal text-center mb-10">
          Give your AI access <br /> to <span className="text-[#FF0000]">lobstr.io</span> in seconds
        </h1>
        <p className="text-[18px] font-normal text-[#0A2540]/70 max-w-2xl mx-auto leading-[1.78] tracking-normal text-center mb-10">
          Let your AI assistant search documentation, retrieve code examples, and explore scraper configurations — all through the MCP protocol. No API key required.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <HeroButton label="Get started" href="#tools" />
          <a href="#tools" className="inline-flex items-center gap-2 px-5 py-2.5 text-[#FF0000] hover:text-white rounded-lg font-semibold text-lg border border-[#FF0000] hover:bg-[#FF0000] transition">
            View tools <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
