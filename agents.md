---
title: Agents
description: The MCP server gives Claude, ChatGPT, Cursor or any MCP client the whole API in five tools. Every page is also there in Markdown.
---

## Connect the MCP server

`https://api.lobstr.io/v2/mcp`, with your API key:

<Tabs>
<Tab title="Claude Code">

```bash
claude mcp add --transport http lobstr https://api.lobstr.io/v2/mcp \
  --header "Authorization: Bearer YOUR_API_KEY"
```

</Tab>
<Tab title="Any MCP client">

```json
{
  "mcpServers": {
    "lobstr": {
      "url": "https://api.lobstr.io/v2/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

</Tab>
<Tab title="A URL only">

For a client that takes a URL and no header, the key goes in it:

```text
https://api.lobstr.io/v2/mcp?api_key=YOUR_API_KEY
```

</Tab>
</Tabs>

Or paste this to your agent:

```text
Connect the lobstr.io MCP server (https://api.lobstr.io/v2/mcp)
with my API key. Then find the operation that fits,
tell me what it costs, and get every bakery in Lyon
from Google Maps with its phone number.
```

## Five tools

<ResponseField name="find_operations" type="tool">
The operations that fit what you need, with their price.
</ResponseField>
<ResponseField name="get_operation" type="tool">
Its options, the fields of its records, its errors.
</ResponseField>
<ResponseField name="run_operation" type="tool">
One page of records, what it cost, and the call for the next page.
</ResponseField>
<ResponseField name="get_balance" type="tool">
The credits left, and what one credit costs on your plan.
</ResponseField>
<ResponseField name="send_feedback" type="tool">
What went wrong or what you need, to lobstr.io's team: an error that does not explain, a missing field or operation. Free. See [Feedback](/feedback).
</ResponseField>

They go through the API itself: an agent gets the same answers, errors and prices as your code. Listing the tools needs no key.

## For agents that read

- [lobstr.io/llms.txt](https://www.lobstr.io/llms.txt): lobstr.io in one page, every operation with its price.
- [api.lobstr.io/v2/catalog.md](https://api.lobstr.io/v2/catalog.md): every operation; each one's whole contract at `/v2/catalog/{source}/{resource}/{verb}.md`.
- [api.lobstr.io/v2/openapi.json](https://api.lobstr.io/v2/openapi.json): the API, for a client generator.
- **Copy page**, at the top of every page here: the page in Markdown, to paste to your agent.
