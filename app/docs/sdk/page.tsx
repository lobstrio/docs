import { Metadata } from 'next';
import { codeToHtml } from 'shiki';
import FeaturesBar from '@/components/_home/FeaturesBar';
import SdkHero from '@/components/_sdk/SdkHero';
import SdkFeaturesSection from '@/components/_sdk/SdkFeaturesSection';
import SdkHowItWorks from '@/components/_sdk/SdkHowItWorks';
import SdkInstallSection from '@/components/_sdk/SdkInstallSection';
import SdkQuickStart from '@/components/_sdk/SdkQuickStart';
import SdkApiReference from '@/components/_sdk/SdkApiReference';
import { SDK_BAR_FEATURES, SDK_QUICK_START, SDK_ASYNC_EXAMPLE } from '@/components/_sdk/data';

export const metadata: Metadata = {
  title: 'Python SDK - lobstr.io API Documentation',
  description: 'Official Python SDK for the lobstr.io API. Sync and async clients, typed models, auto-pagination, and full API coverage.',
};

const bgReplace = (html: string) =>
  html.replace(/(<pre[^>]*style="[^"]*background-color:)[^;]*(;)/, '$1#0a1b2b$2');

export default async function SdkPage() {
  const [quickstartHtml, asyncHtml] = await Promise.all([
    codeToHtml(SDK_QUICK_START, { lang: 'python', theme: 'github-dark' }).then(bgReplace),
    codeToHtml(SDK_ASYNC_EXAMPLE, { lang: 'python', theme: 'github-dark' }).then(bgReplace),
  ]);

  return (
    <>
      <SdkHero />
      <section>
        <FeaturesBar features={SDK_BAR_FEATURES} />
      </section>
      <SdkFeaturesSection />
      <SdkHowItWorks />
      <SdkInstallSection />
      <SdkQuickStart quickstartHtml={quickstartHtml} asyncHtml={asyncHtml} quickstartCode={SDK_QUICK_START} asyncCode={SDK_ASYNC_EXAMPLE} />
      <SdkApiReference />
    </>
  );
}
