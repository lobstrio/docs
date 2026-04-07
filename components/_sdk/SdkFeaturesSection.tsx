import Image from 'next/image';
import SectionHeader from '@/components/_docs/SectionHeader';
import { SDK_FEATURES } from './data';

function renderDescription(text: string) {
  const parts = text.split('`');
  return parts.map((part, i) =>
    i % 2 === 1
      ? <code
          key={i}
          className="text-[12px] leading-[1.5] px-[9px] py-[3px] rounded-[4px] border border-[#dde1ee] bg-[#f2f5f9] !text-[#0a2540] !opacity-100"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
        >{part}</code>
      : part
  );
}

export default function SdkFeaturesSection() {
  return (
    <section id="features" className="border-b border-[#dde1ee] py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Features" title="Features" subtitle="Everything you need to integrate lobstr.io into your Python applications." titleClassName="my-4" />
        <div className="grid md:grid-cols-2 gap-5">
          {SDK_FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-[10px] px-[25px] py-[21px] flex flex-col gap-[18px] items-start transition-shadow border border-[#e5e7eb] hover:border-red-300/50 hover:shadow-[8px_8px_13px_0px_rgba(33,52,71,0.05)]">
              <div className="w-[42px] h-[42px] rounded-lg bg-[#fff0f0] flex items-center justify-center shrink-0">
                <Image src={f.iconSrc} alt="" width={24} height={24} className="w-[22px] h-[22px]" />
              </div>
              <h3 className="font-bold text-xl text-[#0a2540]">{f.title}</h3>
              <p className="text-base leading-[26px] text-[#111827]/70">{renderDescription(f.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
