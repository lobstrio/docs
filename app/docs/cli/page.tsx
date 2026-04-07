import { Metadata } from 'next';
import { codeToHtml } from 'shiki';
import FeaturesBar from '@/components/_home/FeaturesBar';
import CliHero from '@/components/_cli/CliHero';
import CliFeaturesSection from '@/components/_cli/CliFeaturesSection';
import CliHowItWorks from '@/components/_cli/CliHowItWorks';
import CliInstallSection from '@/components/_cli/CliInstallSection';
import CliQuickStart from '@/components/_cli/CliQuickStart';
import CliCommandReference from '@/components/_cli/CliCommandReference';
import { CLI_BAR_FEATURES, CLI_GO_EXAMPLES, CLI_WORKFLOW_EXAMPLE } from '@/components/_cli/data';

export const metadata: Metadata = {
  title: 'CLI - lobstr.io API Documentation',
  description: 'Command-line interface for the lobstr.io API. Run scrapers, manage squids, download results — all from your terminal.',
};

const bgReplace = (html: string) =>
  html.replace(/(<pre[^>]*style="[^"]*background-color:)[^;]*(;)/, '$1#0a1b2b$2');

export default async function CliPage() {
  const [goHtml, workflowHtml] = await Promise.all([
    codeToHtml(CLI_GO_EXAMPLES, { lang: 'bash', theme: 'github-dark' }).then(bgReplace),
    codeToHtml(CLI_WORKFLOW_EXAMPLE, { lang: 'bash', theme: 'github-dark' }).then(bgReplace),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <CliHero />
      <section>
        <FeaturesBar features={CLI_BAR_FEATURES} />
      </section>
      <CliFeaturesSection />
      <CliHowItWorks />
      <CliInstallSection />
      <CliQuickStart goHtml={goHtml} workflowHtml={workflowHtml} goCode={CLI_GO_EXAMPLES} workflowCode={CLI_WORKFLOW_EXAMPLE} />
      <CliCommandReference />
    </div>
  );
}
