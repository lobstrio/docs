import type { Step } from '@/components/_docs/StepsColumn';

export const CLI_BAR_FEATURES = [
  { iconSrc: '/images/zap_icon.svg', text: '5 Command Groups' },
  { iconSrc: '/images/layer_icon.svg', text: '50+ Crawlers' },
  { iconSrc: '/images/refresh_icon.svg', text: 'Python 3.10+' },
  { iconSrc: '/images/lock_icon.svg', text: 'CSV & JSON Export' },
];

export const CLI_FEATURES = [
  { tag: 'One Command', title: 'lobstr go', description: 'The go command combines create, configure, add tasks, run, and download into a single execution. One line from idea to CSV.' },
  { tag: 'Browse', title: '50+ Crawlers', description: 'Search and explore every crawler by slug — Google Maps, LinkedIn, Twitter/X, Instagram, and more. Inspect params and attributes before running.' },
  { tag: 'Export', title: 'CSV & JSON', description: 'Download results as CSV or JSON with a single command. A live progress bar keeps you informed while runs complete in the background.' },
  { tag: 'Delivery', title: 'Webhooks & Cloud', description: 'Configure automated delivery to email, Google Sheets, S3, SFTP, or a webhook endpoint — all from the terminal, no dashboard required.' },
];

export const CLI_STEPS: Step[] = [
  { n: 1, title: 'Install the CLI', desc: "One pip command and you're ready. Requires Python 3.10+. Installs the lobstr command globally." },
  { n: 2, title: 'Find your crawler', desc: 'Search 50+ available crawlers by name. Inspect input parameters and output attributes before running.' },
  { n: 3, title: 'Run and download', desc: 'Fire lobstr go with your URL or keyword. Get a CSV with a live progress bar — real data, no hallucinations.' },
];

export const CLI_INSTALL_CODE = 'pip install lobstrio';

export const CLI_GO_EXAMPLES = `# Scrape Google Maps in one command
lobstr go google-maps-leads-scraper \\
  "https://google.com/maps/search/restaurants+paris" \\
  -o leads.csv

# Keyword-based search
lobstr go google-search-scraper "pizza delivery" --key keyword

# With parameters and concurrency
lobstr go google-maps-leads-scraper url1 url2 \\
  --param max_results=200 --concurrency 3

# Don't download, just kick off
lobstr go twitter-profile-scraper @elonmusk --no-download`;

export const CLI_WORKFLOW_EXAMPLE = `# Step by step
lobstr crawlers search "google maps"
lobstr squid create google-maps-leads-scraper --name "Paris Restaurants"
lobstr task add SQUID_ID "https://google.com/maps/search/restaurants+paris"
lobstr run start SQUID_ID --wait
lobstr results get SQUID_ID --format csv -o results.csv

# Check who you are
lobstr whoami`;

export const CLI_COMMANDS = [
  {
    group: 'Crawlers', cmds: [
      { cmd: 'crawlers ls', description: 'List all available crawlers' },
      { cmd: 'crawlers search <query>', description: 'Search crawlers by keyword' },
      { cmd: 'crawlers show <slug>', description: 'Get crawler details by slug' },
      { cmd: 'crawlers params <slug>', description: 'Get supported parameters for a crawler' },
      { cmd: 'crawlers attrs <slug>', description: 'Get output attributes for a crawler' },
    ]
  },
  {
    group: 'Squids', cmds: [
      { cmd: 'squid create <crawler> --name "My Scraper"', description: 'Create a new squid for a crawler' },
      { cmd: 'squid ls', description: 'List all squids in your account' },
      { cmd: 'squid show <id>', description: 'Get squid details by ID' },
      { cmd: 'squid update <id> --param key=value', description: 'Update squid settings or parameters' },
      { cmd: 'squid empty <id>', description: 'Remove all tasks from a squid' },
      { cmd: 'squid rm <id>', description: 'Permanently delete a squid' },
    ]
  },
  {
    group: 'Tasks', cmds: [
      { cmd: 'task add <squid> <url1> <url2> ...', description: 'Add one or more task URLs to a squid' },
      { cmd: 'task upload <squid> <file.csv>', description: 'Bulk upload tasks from a CSV file' },
      { cmd: 'task ls <squid>', description: 'List tasks for a squid' },
      { cmd: 'task rm <id>', description: 'Delete a task by ID' },
    ]
  },
  {
    group: 'Runs', cmds: [
      { cmd: 'run start <squid> --wait', description: 'Start a new run and optionally wait for completion' },
      { cmd: 'run ls <squid>', description: 'List all runs for a squid' },
      { cmd: 'run show <id>', description: 'Get run details by ID' },
      { cmd: 'run stats <id>', description: 'Get statistics for a run' },
      { cmd: 'run abort <id>', description: 'Abort an in-progress run' },
      { cmd: 'run download <id> -o results.csv', description: 'Download run results to a file' },
    ]
  },
  {
    group: 'Results', cmds: [
      { cmd: 'results get <squid> --format csv -o data.csv', description: 'Get results for a squid and export to file' },
    ]
  },
  {
    group: 'Delivery', cmds: [
      { cmd: 'delivery email <squid> --email user@example.com', description: 'Configure email delivery for a squid' },
      { cmd: 'delivery webhook <squid> --url https://...', description: 'Configure webhook delivery for a squid' },
      { cmd: 'delivery s3 <squid> --bucket my-bucket', description: 'Configure Amazon S3 delivery for a squid' },
    ]
  },
];
