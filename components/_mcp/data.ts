import type { Step } from '@/components/_docs/StepsColumn';

export const MCP_BAR_FEATURES = [
  { iconSrc: '/images/tools-icon.svg', text: '6 Tools' },
  { iconSrc: '/images/layer_icon.svg', text: '31 Scrapers' },
  { iconSrc: '/images/auth-icon.svg', text: 'Auth None' },
  { iconSrc: '/images/http-icon.svg', text: 'HTTP transport' },
];

export const MCP_TOOLS = [
  { name: 'list_docs', description: 'Browse all core API documentation pages with category filtering and pagination.', tag: 'Navigation' },
  { name: 'list_examples', description: 'View all 31 scrapers with example documentation and their available endpoints.', tag: 'Examples' },
  { name: 'get_doc', description: 'Get full endpoint documentation including request body, response fields, and code examples.', tag: 'Reference' },
  { name: 'search_docs', description: 'Keyword search across all documentation — titles, descriptions, and endpoint paths.', tag: 'Search' },
  { name: 'get_code_example', description: 'Get cURL, Python, or API response examples for any endpoint.', tag: 'Code' },
  { name: 'get_navigation', description: 'Get the full sidebar navigation structure showing how docs are organized.', tag: 'Structure' },
];

export const MCP_STEPS: Step[] = [
  { n: 1, title: 'Add the MCP server', desc: 'One command in Claude Code, or add a JSON snippet to your Claude Desktop or Cursor config.' },
  { n: 2, title: 'Ask anything', desc: 'Your AI now has full access to all lobstr.io docs — just ask in plain language.' },
  { n: 3, title: 'Get instant answers', desc: 'Code examples, endpoint specs, scraper configs — retrieved in real time, no hallucinations.' },
];

export const MCP_EXAMPLE_PROMPTS = [
  'How do I create a squid and start scraping Google Maps?',
  'Show me the Python code for adding tasks to a scraper',
  'What parameters does the LinkedIn Profile Scraper accept?',
  'List all delivery configuration options (email, S3, webhook)',
  'How do I handle rate limiting in the lobstr.io API?',
];

export const MCP_API_METHODS = [
  { method: 'initialize', description: 'Handshake — returns server info and capabilities' },
  { method: 'tools/list', description: 'List all available tools with input schemas' },
  { method: 'tools/call', description: 'Execute a tool with arguments' },
];

export function buildMcpPlatforms(mcpUrl: string) {
  return [
    {
      name: 'Claude Code',
      config: `claude mcp add lobstrio-docs \\\n  --transport http \\\n  ${mcpUrl}`,
      lang: 'bash',
    },
    {
      name: 'Claude Desktop',
      config: JSON.stringify({ mcpServers: { 'lobstrio-docs': { type: 'http', url: mcpUrl } } }, null, 2),
      lang: 'json',
    },
    {
      name: 'Cursor',
      config: JSON.stringify({ mcpServers: { 'lobstrio-docs': { type: 'http', url: mcpUrl } } }, null, 2),
      lang: 'json',
      file: '.cursor/mcp.json',
    },
    {
      name: 'Any MCP Client',
      config: `curl -X POST ${mcpUrl} \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "search_docs",
      "arguments": { "query": "squid", "limit": 2 }
    },
    "id": 1
  }'

# Response:
# {
#   "jsonrpc": "2.0",
#   "id": 1,
#   "result": {
#     "content": [{
#       "type": "text",
#       "text": "Found 2 result(s) for \\"squid\\":\\n\\n1. Create Squid (POST /v1/squids)..."
#     }]
#   }
# }`,
      lang: 'bash',
    },
  ];
}
