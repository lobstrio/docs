import SectionHeader from '@/components/_docs/SectionHeader';
import FeatureCard from '@/components/_docs/FeatureCard';
import { CLI_FEATURES } from './data';

export default function CliFeaturesSection() {
  return (
    <section id="features" className="border-b border-[#dde1ee]">
      <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
        <SectionHeader label="Features" title="Full control from your terminal" subtitle="Everything you need to scrape at scale — no UI, no browser, no problem" />
        <div className="grid md:grid-cols-2 gap-5">
          {CLI_FEATURES.map((f) => (
            <FeatureCard key={f.title} tag={f.tag} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
