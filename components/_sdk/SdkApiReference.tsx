import Link from 'next/link';
import SectionHeader from '@/components/_docs/SectionHeader';
import ExploreApiCta from '@/components/_docs/ExploreApiCta';
import { SDK_API_REFERENCE } from './data';

export default function SdkApiReference() {
  return (
    <section id="api-reference">
      <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
        <SectionHeader label="Reference" title="API Reference" subtitle="Every SDK method mapped to its API endpoint." titleClassName="my-4" />

        <div className="w-full border border-[#e5e7eb] rounded-lg overflow-hidden overflow-x-auto">
          <div className="hidden sm:flex bg-[#f0f4f8]">
            {(['SDK Method', 'API', 'Endpoint', 'Description'] as const).map((h, i) => (
              <div
                key={h}
                className={[
                  'px-4 py-[11px] text-[13px] font-semibold text-[rgba(17,24,39,0.6)] whitespace-nowrap',
                  i === 0 ? 'w-[37%]' : i === 1 ? 'w-[7%] text-center' : i === 2 ? 'w-[27%]' : 'w-[29%]',
                ].join(' ')}
                style={i > 0 ? { borderLeft: '0.8px solid #e5e7eb' } : {}}
              >
                {h}
              </div>
            ))}
          </div>

          {SDK_API_REFERENCE.map((group) => (
            <div key={group.group}>
              <div
                className="bg-[#f9fafb] px-4 py-[10px] text-[13px] font-bold text-[#0a2540] tracking-[0.65px] border-y border-[#e5e7eb] uppercase"
              >
                {group.group}
              </div>
              {group.methods.map((m, i) => (
                <div
                  key={`${m.sdk}-${m.path}`}
                  className={`flex flex-col sm:flex-row hover:bg-[#fafafa] transition-colors sm:min-w-[640px] ${
      i !== group.methods.length - 1 ? "border-b border-[#e5e7eb]" : ""
    }`}
                  // style={{ borderBottom: '0.8px solid #e5e7eb' }}
                >
                  <div className="sm:w-[37%] px-[10px] py-[15px] flex items-center" style={{ borderRight: '0.8px solid #e5e7eb' }}>
                    <code
                      className="inline-flex items-center h-6 bg-[#f2f5f9] border border-[#dee0ea] text-[#0a2540] text-[12px] px-[9px] py-[3px] rounded"
                      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                    >{m.sdk}</code>
                  </div>
                  <div className="hidden sm:flex sm:w-[7%] px-[5px] py-[14px] items-center justify-center" style={{ borderRight: '0.8px solid #e5e7eb' }}>
                    <span
                      className={[
                        'inline-flex items-center justify-center border px-[7px] pt-[2px] pb-px rounded text-[11px] font-bold whitespace-nowrap',
                        m.method === 'GET'    ? 'bg-[#ebfbf4] border-[#4adb98] text-[#10b981]' :
                        m.method === 'POST'   ? 'bg-[rgba(121,184,255,0.14)] border-[#79b8ff] text-[#79b8ff]' :
                                                'bg-[#fff2f2] border-[#ff7f7f] text-red-600',
                      ].join(' ')}
                      style={{ borderWidth: '0.8px', fontFamily: 'var(--font-jetbrains-mono)' }}
                    >
                      {m.method === 'DELETE' ? 'DEL' : m.method}
                    </span>
                  </div>
                  <div className="sm:w-[27%] px-[10px] py-[11px] flex items-center gap-2" style={{ borderRight: '0.8px solid #e5e7eb' }}>
                    <span className="sm:hidden shrink-0">
                      <span
                        className={[
                          'inline-flex items-center justify-center border px-[7px] pt-[2px] pb-px rounded text-[11px] font-bold whitespace-nowrap',
                          m.method === 'GET'    ? 'bg-[#ebfbf4] border-[#4adb98] text-[#10b981]' :
                          m.method === 'POST'   ? 'bg-[rgba(121,184,255,0.14)] border-[#79b8ff] text-[#79b8ff]' :
                                                  'bg-[#fff2f2] border-[#ff7f7f] text-red-600',
                        ].join(' ')}
                        style={{ borderWidth: '0.8px', fontFamily: 'var(--font-jetbrains-mono)' }}
                      >
                        {m.method === 'DELETE' ? 'DEL' : m.method}
                      </span>
                    </span>
                    <Link href={`/docs/${m.slug}`} className="text-[14px] text-[#FF0000] hover:underline break-all leading-[21px]">
                      {m.path}
                    </Link>
                  </div>
                  <div className="sm:w-[29%] px-[10px] py-[15px] flex items-center whitespace-pre">
                    <p className="text-[14px] text-[rgba(10,37,64,0.7)] leading-[21px]">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <ExploreApiCta />
      </div>
    </section>
  );
}
