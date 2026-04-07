import { ExternalLink } from 'lucide-react';
import HeroButton from '@/components/ui/HeroButton';

export default function SdkHero() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="w-full flex justify-center mb-3.5">
          <div className="px-2 py-1 rounded-lg border border-[#ff7f7f] bg-[#FEF2F2] text-[#ff0000] font-semibold">
            Python SDK
          </div>
        </div>
        <h1 className="text-5xl md:text-[64px] font-black text-[#0a2540] leading-[1.2] md:leading-[78px] max-w-[768px]">
          Automate web{' '}
          <span className="text-red-600">scraping</span>
          <br />
          from Python
        </h1>
        <p className="text-lg text-[#111827]/70 leading-8 max-w-[659px] py-10">
          Official Python SDK for the lobstr.io API. Typed models, sync &amp; async clients,
          auto-pagination, and full API coverage — one dependency (httpx).
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <HeroButton label="Quick start" href="#quickstart" />
          <a
            href="https://pypi.org/project/lobstrio-sdk/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#ff0000] text-[#ff0000] font-semibold px-6 py-3 rounded-lg hover:bg-[#ff0000] hover:text-[#fff] transition-colors"
          >
            View on PyPI
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
