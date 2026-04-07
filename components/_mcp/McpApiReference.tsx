import SectionHeader from '@/components/_docs/SectionHeader';
import ExploreApiCta from '@/components/_docs/ExploreApiCta';
import { MCP_API_METHODS } from './data';

export default function McpApiReference() {
  return (
    <section>
      <div className="max-w-4xl mx-auto px-6 py-[80px]">
        <SectionHeader variant="compact" label="Reference" title="API Reference" subtitle="The MCP server uses JSON-RPC 2.0 over HTTP POST." />

        <div className="border border-[#dee0ea] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f2f5f9] border-b border-[#dde1ee]">
                <th className="text-left px-5 py-3 text-[16px] font-semibold text-[#0A2540]/60">Method</th>
                <th className="text-left px-5 py-3 text-[16px] font-semibold text-[#0A2540]/60">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dee0ea]">
              {MCP_API_METHODS.map((m) => (
                <tr key={m.method}>
                  <td className="px-5 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-[#FF0000]/25 bg-[#FF0000]/[0.04] font-mono text-[12px] leading-none text-[#FF0000]">{m.method}</span></td>
                  <td className="px-5 py-3 text-[16px] font-light text-[#0a2540]">{m.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ExploreApiCta />
      </div>
    </section>
  );
}
