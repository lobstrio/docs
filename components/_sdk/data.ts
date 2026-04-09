import type { Step } from '@/components/_docs/StepsColumn';

export const SDK_BAR_FEATURES = [
  { iconSrc: '/images/zap_icon.svg', text: 'Sync & Async' },
  { iconSrc: '/images/layer_icon.svg', text: 'Typed Models' },
  { iconSrc: '/images/refresh_icon.svg', text: 'Auto-Pagination' },
  { iconSrc: '/images/lock_icon.svg', text: 'Automatic Auth' },
];

export const SDK_FEATURES = [
  { iconSrc: '/images/zap_icon.svg', title: 'Sync & Async', description: 'Both `LobstrClient` and `AsyncLobstrClient` with identical API surfaces.' },
  { iconSrc: '/images/layer_icon.svg', title: 'Typed Models', description: 'Dataclass models for every response — no raw dicts in the public API.' },
  { iconSrc: '/images/refresh_icon.svg', title: 'Auto-Pagination', description: 'Lazy `PageIterator` streams all pages on demand with `.iter()` method.' },
  { iconSrc: '/images/lock_icon.svg', title: 'Automatic Authentication', description: 'Token resolved from explicit param, `LOBSTR_TOKEN` env, or `~/.config/lobstr/config.toml`.' },
];

export const SDK_STEPS: Step[] = [
  { n: 1, title: 'Install the package', desc: "One command, zero setup. lobstrio-mcp installs everything you need to connect Claude or Cursor to your lobstr.io account." },
  { n: 2, title: 'Configure your API token', desc: 'Get your token from the lobstr.io dashboard and set LOBSTR_TOKEN in your environment or MCP config.' },
  { n: 3, title: 'Connect to Claude or Cursor', desc: 'Add the server to your MCP config and start asking questions about your squids, crawlers, and tasks.' },
];

export const SDK_INSTALL_CODE = 'pip install lobstrio-sdk';

export const SDK_QUICK_START = `from lobstrio import LobstrClient

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

export const SDK_ASYNC_EXAMPLE = `import asyncio
from lobstrio import AsyncLobstrClient

async def main():
    async with AsyncLobstrClient() as client:
        squids = await client.squids.list()
        for squid in squids.data:
            print(f"{squid.name} ({squid.id})")

asyncio.run(main())`;

export const SDK_API_REFERENCE = [
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
