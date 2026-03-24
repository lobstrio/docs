import Head from './head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CtaSection from '@/components/_home/CtaSection';
import HowItWorks from '@/components/_home/HowItWorks';
import FeaturesBar from '@/components/_home/FeaturesBar';
import HeroSection from '@/components/_home/HeroSection';
import ApiReference from '@/components/_home/ApiReference';
import { PYTHON_EXAMPLE } from '@/lib/home/code-example';
import { codeToHtml } from 'shiki';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.lobstr.io';

export default async function HomePage() {
  const highlightedCode = await codeToHtml(PYTHON_EXAMPLE, {
    lang: 'python',
    theme: 'github-dark',
  });

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Head
        title="lobstr.io API Documentation"
        description="Official API documentation for lobstr.io — web scraping automation platform. 50+ ready-made crawlers, simple REST API, and structured JSON output."
        url={siteUrl}
        image={`${siteUrl}/images/default-meta-image.png`}
      />
      <Header />
      <HeroSection />
      <FeaturesBar />
      <HowItWorks code={highlightedCode} rawCode={PYTHON_EXAMPLE} />      <ApiReference />
      <CtaSection />
      <Footer />
    </div>
  );
}
