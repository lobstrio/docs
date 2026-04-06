import { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { codeToHtml } from 'shiki';
import CodeBlock from '@/components/ui/CodeBlock';
import CopyButton from '@/components/ui/CopyButton';
import SdkQuickStartTabs from '@/components/ui/SdkQuickStartTabs';
import FeaturesBar from '@/components/_home/FeaturesBar';
import HeroButton from '@/components/ui/HeroButton';

export const metadata: Metadata = {
  title: 'Python SDK - lobstr.io API Documentation',
  description: 'Official Python SDK for the lobstr.io API. Sync and async clients, typed models, auto-pagination, and full API coverage.',
};

const FEATURES = [
  { iconSrc: '/images/zap_icon.svg', title: 'Sync & Async', description: 'Both `LobstrClient` and `AsyncLobstrClient` with identical API surfaces.' },
  { iconSrc: '/images/layer_icon.svg', title: 'Typed Models', description: 'Dataclass models for every response — no raw dicts in the public API.' },
  { iconSrc: '/images/refresh_icon.svg', title: 'Auto-Pagination', description: 'Lazy `PageIterator` streams all pages on demand with `.iter()` method.' },
  { iconSrc: '/images/lock_icon.svg', title: 'Automatic Authentication', description: 'Token resolved from explicit param, `LOBSTR_TOKEN` env, or `~/.config/lobstr/config.toml`.' },
];

const SDK_BAR_FEATURES = [
  { iconSrc: '/images/zap_icon.svg', text: 'Sync & Async' },
  { iconSrc: '/images/layer_icon.svg', text: 'Typed Models' },
  { iconSrc: '/images/refresh_icon.svg', text: 'Auto-Pagination' },
  { iconSrc: '/images/lock_icon.svg', text: 'Automatic Auth' },
];

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

const API_REFERENCE = [
  {
    group: 'User', methods: [
      { sdk: 'client.me()', method: 'GET', path: '/v1/me', slug: 'user-me', description: 'Get authenticated user profile' },
      { sdk: 'client.balance()', method: 'GET', path: '/v1/user/balance', slug: 'get-balance', description: 'Get current credit balance' },
    ]
  },
  {
    group: 'Crawlers', methods: [
      { sdk: 'client.crawlers.list()', method: 'GET', path: '/v1/crawlers', slug: 'list-crawlers', description: 'List all available crawlers' },
      { sdk: 'client.crawlers.get(hash)', method: 'GET', path: '/v1/crawlers/{hash}', slug: 'get-crawler-details', description: 'Get crawler details by hash' },
      { sdk: 'client.crawlers.params(hash)', method: 'GET', path: '/v1/crawlers/{hash}/params', slug: 'get-crawler-parameters', description: 'Get supported parameters for a crawler' },
      { sdk: 'client.crawlers.attributes(hash)', method: 'GET', path: '/v1/crawlers/{hash}/attributes', slug: 'get-crawler-attributes', description: 'Get output attributes for a crawler' },
    ]
  },
  {
    group: 'Squids', methods: [
      { sdk: 'client.squids.create(crawler, name)', method: 'POST', path: '/v1/squids', slug: 'create-squid', description: 'Create a new squid for a crawler' },
      { sdk: 'client.squids.list()', method: 'GET', path: '/v1/squids', slug: 'list-squids', description: 'List all squids in your account' },
      { sdk: 'client.squids.get(hash)', method: 'GET', path: '/v1/squids/{hash}', slug: 'get-squid-details', description: 'Get squid details by hash' },
      { sdk: 'client.squids.update(hash, ...)', method: 'POST', path: '/v1/squids/{hash}', slug: 'update-squid', description: 'Update squid settings or parameters' },
      { sdk: 'client.squids.empty(hash)', method: 'POST', path: '/v1/squids/{hash}/empty', slug: 'empty-squid', description: 'Remove all tasks from a squid' },
      { sdk: 'client.squids.delete(hash)', method: 'DELETE', path: '/v1/squids/{hash}', slug: 'delete-squid', description: 'Permanently delete a squid' },
    ]
  },
  {
    group: 'Tasks', methods: [
      { sdk: 'client.tasks.add(squid, tasks)', method: 'POST', path: '/v1/tasks', slug: 'add-tasks', description: 'Add one or more tasks to a squid' },
      { sdk: 'client.tasks.list(squid)', method: 'GET', path: '/v1/tasks', slug: 'list-tasks', description: 'List tasks for a squid' },
      { sdk: 'client.tasks.get(hash)', method: 'GET', path: '/v1/tasks/{hash}', slug: 'get-task', description: 'Get a single task by hash' },
      { sdk: 'client.tasks.upload(squid, file)', method: 'POST', path: '/v1/tasks/upload', slug: 'upload-tasks', description: 'Bulk upload tasks from a file' },
      { sdk: 'client.tasks.upload_status(id)', method: 'GET', path: '/v1/tasks/upload/{id}', slug: 'check-upload-status', description: 'Check status of a bulk upload' },
      { sdk: 'client.tasks.delete(hash)', method: 'DELETE', path: '/v1/tasks/{hash}', slug: 'delete-task', description: 'Delete a task by hash' },
    ]
  },
  {
    group: 'Runs', methods: [
      { sdk: 'client.runs.start(squid)', method: 'POST', path: '/v1/runs', slug: 'start-run', description: 'Start a new run for a squid' },
      { sdk: 'client.runs.list(squid)', method: 'GET', path: '/v1/runs', slug: 'list-runs', description: 'List all runs for a squid' },
      { sdk: 'client.runs.get(hash)', method: 'GET', path: '/v1/runs/{hash}', slug: 'get-run', description: 'Get run details by hash' },
      { sdk: 'client.runs.stats(hash)', method: 'GET', path: '/v1/runs/{hash}/stats', slug: 'get-run-stats', description: 'Get statistics for a run' },
      { sdk: 'client.runs.tasks(hash)', method: 'GET', path: '/v1/runtasks', slug: 'get-run-tasks', description: 'List tasks executed in a run' },
      { sdk: 'client.runs.abort(hash)', method: 'POST', path: '/v1/runs/{hash}/abort', slug: 'abort-run', description: 'Abort an in-progress run' },
      { sdk: 'client.runs.download(hash)', method: 'GET', path: '/v1/runs/{hash}/download', slug: 'download-run', description: 'Download run results as a file' },
      { sdk: 'client.runs.wait(hash)', method: 'GET', path: '/v1/runs/{hash}', slug: 'get-run', description: 'Poll until run completes' },
    ]
  },
  {
    group: 'Results', methods: [
      { sdk: 'client.results.list(run)', method: 'GET', path: '/v1/results', slug: 'get-results', description: 'Get first page of results for a run' },
      { sdk: 'client.results.iter(run)', method: 'GET', path: '/v1/results', slug: 'get-results', description: 'Lazily iterate all result pages' },
    ]
  },
  {
    group: 'Accounts', methods: [
      { sdk: 'client.accounts.list()', method: 'GET', path: '/v1/accounts', slug: 'list-accounts', description: 'List all connected accounts' },
      { sdk: 'client.accounts.get(hash)', method: 'GET', path: '/v1/accounts/{hash}', slug: 'get-account-details', description: 'Get account details by hash' },
      { sdk: 'client.accounts.types()', method: 'GET', path: '/v1/accounts/types', slug: 'list-account-types', description: 'List supported account types' },
      { sdk: 'client.accounts.sync(type, cookies)', method: 'POST', path: '/v1/synchronize', slug: 'sync-account', description: 'Sync an account using cookies' },
      { sdk: 'client.accounts.delete(hash)', method: 'DELETE', path: '/v1/accounts/{hash}', slug: 'delete-account', description: 'Delete a connected account' },
    ]
  },
  {
    group: 'Delivery', methods: [
      { sdk: 'client.delivery.email(squid, ...)', method: 'POST', path: '/v1/delivery', slug: 'configure-email-delivery', description: 'Configure email delivery for a squid' },
      { sdk: 'client.delivery.google_sheet(squid, ...)', method: 'POST', path: '/v1/delivery', slug: 'configure-google-sheet-delivery', description: 'Configure Google Sheets delivery' },
      { sdk: 'client.delivery.s3(squid, ...)', method: 'POST', path: '/v1/delivery', slug: 'configure-s3-delivery', description: 'Configure Amazon S3 delivery' },
      { sdk: 'client.delivery.webhook(squid, ...)', method: 'POST', path: '/v1/delivery', slug: 'configure-webhook-delivery', description: 'Configure webhook delivery' },
      { sdk: 'client.delivery.sftp(squid, ...)', method: 'POST', path: '/v1/delivery', slug: 'configure-sftp-delivery', description: 'Configure SFTP delivery' },
    ]
  },
];

const STEPS = [
  {
    n: 1,
    title: 'Install the package',
    desc: "One command, zero setup. lobstrio-sdk installs everything you need. Requires Python 3.10+. Only dependency: httpx.",
  },
  {
    n: 2,
    title: 'Configure your API token',
    desc: 'Get your token from the lobstr.io dashboard and set LOBSTR_TOKEN in your environment — or pass it directly to LobstrClient.',
  },
  {
    n: 3,
    title: 'Run and collect results',
    desc: 'Create a squid, add tasks, start a run, and iterate results — all in Python. Use the async client for concurrent workflows.',
  },
];

const HOW_IT_WORKS_CODE = `from lobstrio import LobstrClient

client = LobstrClient()  # reads LOBSTR_TOKEN

squid = client.squids.create(
    crawler="google-maps-leads-scraper",
    name="Restaurants Paris"
)
client.tasks.add(squid=squid.id, tasks=[
    {"url": "https://google.com/maps/search/restaurants+paris"}
])
run = client.runs.start(squid=squid.id)
run = client.runs.wait(run.id)

for page in client.results.iter(run=run.id):
    for place in page.data:
        print(place["name"])`;

const INSTALL_CODE = 'pip install lobstrio-sdk';

const QUICK_START = `from lobstrio import LobstrClient

client = LobstrClient()  # auto-resolves token

# Get account info
user = client.me()
print(f"{user.email} — {client.balance().credits} credits")

# Create a squid and scrape
squid = client.squids.create(
    crawler="google-maps-leads-scraper",
    name="Restaurants Paris"
)
client.squids.update(squid.id, params={"country": "France", "max_results": 50})
client.tasks.add(squid=squid.id, tasks=[
    {"url": "https://google.com/maps/search/restaurants+paris"}
])

# Start and wait for completion
run = client.runs.start(squid=squid.id)
run = client.runs.wait(run.id)

# Get results
for page in client.results.iter(run=run.id):
    for place in page.data:
        print(f"{place['name']} — {place['score']}★")`;

const ASYNC_EXAMPLE = `import asyncio
from lobstrio import AsyncLobstrClient

async def main():
    async with AsyncLobstrClient() as client:
        squids = await client.squids.list()
        for squid in squids.data:
            print(f"{squid.name} ({squid.id})")

asyncio.run(main())`;

export default async function SdkPage() {
  const shikiOpts = { theme: 'github-dark' } as const;
  const bgReplace = (html: string) =>
    html.replace(/(<pre[^>]*style="[^"]*background-color:)[^;]*(;)/, '$1#0a1b2b$2');

  const [quickstartHtml, asyncHtml] = await Promise.all([
    codeToHtml(QUICK_START, { lang: 'python', ...shikiOpts }).then(bgReplace),
    codeToHtml(ASYNC_EXAMPLE, { lang: 'python', ...shikiOpts }).then(bgReplace),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

          {/* Badge */}
          <div className="w-full flex justify-center mb-3.5">
            <div className="px-2 py-1 rounded-lg border border-[#ff7f7f] bg-[#FEF2F2] text-[#ff0000] font-semibold">
              Python SDK
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-[64px] font-black text-[#0a2540] leading-[1.2] md:leading-[78px]max-w-[768px]">
            Automate web{' '}
            <span className="text-red-600">scraping</span>
            <br />
            from Python
          </h1>

          {/* Subheading */}
          <p className="text-lg text-[#111827]/70 leading-8 max-w-[659px] py-10">
            Official Python SDK for the lobstr.io API. Typed models, sync &amp; async clients,
            auto-pagination, and full API coverage — one dependency (httpx).
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <HeroButton label="Quick start" href="#quickstart" />
            <a
              href="https://pypi.org/project/lobstrio-sdk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#ff0000] text-[#ff0000]  font-semibold px-6 py-3 rounded-lg hover:bg-[#ff0000] hover:text-[#fff] transition-colors"
            >
              View on PyPI
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* Features Bar */}
      <section className="">
        <FeaturesBar features={SDK_BAR_FEATURES} />
      </section>

      {/* Features */}
      <section id="features" className="border-y border-[#dde1ee] py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-4 leading-[11px] tracking-[1px] uppercase">Features</p>
          <h2 className="text-[40px] font-black text-center leading-[39px] my-4">Features</h2>
          <p className="text-[#111827]/70 text-base text-center leading-[28px] mb-16">Everything you need to integrate lobstr.io into your Python applications.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-[10px] px-[25px] py-[21px] flex flex-col gap-[18px] items-start transition-shadow border border-[#e5e7eb] hover:border-red-300/50 hover:shadow-[8px_8px_13px_0px_rgba(33,52,71,0.05)]">
                <div className="w-[42px] h-[42px] rounded-lg bg-[#fff0f0] flex items-center justify-center shrink-0">
                  <Image src={f.iconSrc} alt="" width={24} height={24} />
                </div>
                <h3 className="font-bold text-xl text-[#0a2540]">{f.title}</h3>
                <p className="text-base leading-[26px] text-[#111827]/70">{renderDescription(f.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-4 leading-[11px] tracking-[1px] uppercase">How it works</p>
          <h2 className="text-[40px] font-black text-center leading-[39px] mt-4 mb-16">Up and running in 30 seconds</h2>

          <div className="flex flex-col md:flex-row gap-10 md:items-start">
            {/* Steps */}
            <div className="w-full md:flex-shrink-0 md:w-[366px] space-y-0">
              {STEPS.map((step) => (
                <div key={step.n} className="py-7.5 border-b border-[#dee0ea]">
                  <div className="flex gap-2.5 mb-2">
                    <span className="flex-shrink-0 w-7.5 h-7.5 rounded-lg bg-[#fff0f0] text-[#FF0000] text-[13px] font-bold flex items-center justify-center">{step.n}</span>
                    <h3 className="text-[18px] font-bold text-[#111827] leading-[1.56]">{step.title}</h3>
                  </div>
                  <p className="ml-10 text-[#111827]/70 leading-[1.75]">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Code preview */}
            <div className="w-full md:flex-1 rounded-lg overflow-hidden flex flex-col mt-7.5">
              <div className="bg-[#0a2540] px-5 py-3 h-10 flex items-center gap-1.5">
                <span className="rounded-full" style={{ width: 11, height: 11, backgroundColor: 'rgba(255,255,255,0.18)' }} />
                <span className="rounded-full" style={{ width: 11, height: 11, backgroundColor: 'rgba(255,255,255,0.18)' }} />
                <span className="rounded-full" style={{ width: 11, height: 11, backgroundColor: 'rgba(255,255,255,0.18)' }} />
              </div>
              <div className="bg-[#0a1b2b] px-6 py-5 flex-1 text-white text-[13px] font-normal leading-[22px]" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
                <p className="whitespace-pre-wrap"><span className="text-[#ffffffb3]">&#123;</span></p>
                <p className="whitespace-pre-wrap">  <span className="text-[#79b8ff]">&quot;mcpServers&quot;</span><span className="text-[#ffffffb3]">:</span> <span className="text-[#ffffffb3]">&#123;</span></p>
                <p className="whitespace-pre-wrap">    <span className="text-[#79b8ff]">&quot;lobstr&quot;</span><span className="text-[#ffffffb3]">:</span> <span className="text-[#ffffffb3]">&#123;</span></p>
                <p className="whitespace-pre-wrap">      <span className="text-[#79b8ff]">&quot;command&quot;</span><span className="text-[#ffffffb3]">:</span> <span className="text-[#4adb98]">&quot;lobstrio-mcp&quot;</span><span className="text-[#ffffffb3]">,</span></p>
                <p className="whitespace-pre-wrap">      <span className="text-[#79b8ff]">&quot;env&quot;</span><span className="text-[#ffffffb3]">:</span> <span className="text-[#ffffffb3]">&#123;</span></p>
                <p className="whitespace-pre-wrap">        <span className="text-[#79b8ff]">&quot;LOBSTR_TOKEN&quot;</span><span className="text-[#ffffffb3]">:</span> <span className="text-[#4adb98]">&quot;lbstr_xxxxxx&quot;</span></p>
                <p className="whitespace-pre-wrap">      <span className="text-[#ffffffb3]">&#125;</span></p>
                <p className="whitespace-pre-wrap">    <span className="text-[#ffffffb3]">&#125;</span></p>
                <p className="whitespace-pre-wrap">  <span className="text-[#ffffffb3]">&#125;</span></p>
                <p className="whitespace-pre-wrap"><span className="text-[#ffffffb3]">&#125;</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Install */}
      <section id="installation" className="border-b bg-[#f8fafc] border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-4 leading-[11px] tracking-[1px] uppercase">Setup</p>
          <h2 className="text-[40px] font-black text-center leading-[39px] my-4">Connect in one step</h2>
          <p className="text-[#111827b3] text-base text-center leading-[28px] mb-16">Requires Python 3.10+. No API key needed to browse crawlers. Add your token to run scraping jobs.</p>

          <div className="bg-[#0a2540] rounded-xl overflow-hidden">
            <div className="flex justify-between items-center gap-2 px-4 py-3">
              <span className="leading-[2.06] text-white text-[13px]" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>&gt;_ terminal</span>
              <CopyButton text={INSTALL_CODE} variant="dark" className="border !border-[#213447] !bg-[#213447]" />
            </div>
            <CodeBlock code={INSTALL_CODE} language="bash" theme="dark" showLabel={false} codeBg="#0a1b2b" className='[&>pre]:!p-5 [&>pre]:!m-0' />
          </div>

          <div className="flex items-center justify-between mt-4 overflow-x-auto gap-4 pb-1">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[#0A2540]/60">PyPI</span>
              <a href="https://pypi.org/project/lobstrio-sdk/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#0A2540] border border-[#dde1ee] rounded-md px-3.5 py-2 hover:border-[#FF0000]/40 transition bg-white whitespace-nowrap">pypi.org/project/lobstrio-sdk</a>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {['Python 3.10+', 'No key to browse', 'Cross-platform'].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-sm font-semibold text-[#0A2540] border border-[#dde1ee] rounded-md px-3.5 py-2 bg-white whitespace-nowrap">
                  <img src="/images/check-red-icon.svg" alt="" className="w-3 h-3 shrink-0" /> {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quickstart" className="border-b border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-4 leading-[11px] tracking-[1px] uppercase">Reference</p>
          <h2 className="text-[40px] font-black text-center leading-[39px] my-4">Quick Start</h2>
          <p className="text-[#111827b3] text-base text-center leading-[28px] mb-16">Full workflow: create squid, add tasks, run, get results.</p>
          <SdkQuickStartTabs
            quickstartHtml={quickstartHtml}
            asyncHtml={asyncHtml}
            quickstartCode={QUICK_START}
            asyncCode={ASYNC_EXAMPLE}
          />
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="border-b border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-4 leading-[11px] tracking-[1px] uppercase">Reference</p>
          <h2 className="text-[40px] font-black text-center leading-[39px] my-4">API Reference</h2>
          <p className="text-[#111827b3] text-base text-center leading-[28px] mb-16">Every SDK method mapped to its API endpoint.</p>

          <div className="w-full border border-[#e5e7eb] rounded-lg overflow-hidden overflow-x-auto">
            {/* Header */}
            <div className="hidden sm:flex bg-[#f0f4f8]" style={{ borderBottom: '0.8px solid #e5e7eb' }}>
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

            {/* Groups */}
            {API_REFERENCE.map((group) => (
              <div key={group.group}>
                <div
                  className="bg-[#f9fafb] px-4 py-[10px] text-[13px] font-bold text-[#0a2540] tracking-[0.65px] uppercase"
                  style={{ borderBottom: '0.8px solid #e5e7eb', borderTop: '0.8px solid #e5e7eb' }}
                >
                  {group.group}
                </div>
                {group.methods.map((m) => (
                  <div
                    key={`${m.sdk}-${m.path}`}
                    className="flex flex-col sm:flex-row hover:bg-[#fafafa] transition-colors sm:min-w-[640px]"
                    style={{ borderBottom: '0.8px solid #e5e7eb' }}
                  >
                    {/* SDK method */}
                    <div className="sm:w-[37%] px-[10px] py-[15px] flex items-center" style={{ borderRight: '0.8px solid #e5e7eb' }}>
                      <code
                        className="inline-flex items-center h-6 bg-[#f2f5f9] border border-[#dee0ea] text-[#0a2540] text-[12px] px-[9px] py-[3px] rounded"
                        style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                      >{m.sdk}</code>
                    </div>
                    {/* Method badge */}
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
                    {/* Endpoint */}
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
                    {/* Description */}
                    <div className="sm:w-[29%] px-[10px] py-[15px] flex items-center whitespace-pre">
                      <p className="text-[14px] text-[rgba(10,37,64,0.7)] leading-[21px]">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-15 rounded-xl bg-[#0A2540] px-7.5 py-10 text-center">
            <h3 className="text-[24px] font-bold text-white mb-4">Explore the full API documentation</h3>
            <p className="text-[#ffffffb3] mb-7.5 mx-auto">Reuse the same CTA treatment from the cleaner reference page to keep docs pages visually consistent.</p>
            <Link href="/docs/authentication" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] hover:bg-[#cc0000] text-white text-sm font-bold rounded-lg transition">
              Open API docs <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
