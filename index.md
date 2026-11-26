---
title: Introduction
description: lobstr.io is a web data API for your code and your AI agents. One call, JSON back in seconds, the same fields every time, read on the site the moment you call.
---

## Make a request

One route for every operation, with your [API key](https://app.lobstr.io/dashboard/api):

```bash
curl https://api.lobstr.io/v2/run \
  -H "Authorization: Bearer $LOBSTR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "google_maps",
    "operation": "places/search",
    "options": {
      "query": "bakeries in Austin, TX"
    }
  }'
```

The answer holds the records and what the call cost. Step by step: [Quickstart](/quickstart).

## Use it from your code

```bash
pip install lobstrio    # Python
npm install lobstrio    # Node.js
```

A typed method for each operation, every page in one loop, retries never charged twice: [SDKs](/sdks).

## Use it from an agent

```bash
claude mcp add --transport http lobstr https://api.lobstr.io/v2/mcp \
  --header "Authorization: Bearer YOUR_API_KEY"
```

The same API in five tools, for Claude, ChatGPT, Cursor or any MCP client: [Agents](/agents).

## Explore

<CardGroup cols={2}>
<Card title="Operations" icon="list" href="/operations">
Every operation, its options, its record, its errors and its price.
</Card>
<Card title="Run an operation" icon="play" href="/run">
The request and the answer every call shares, field by field.
</Card>
<Card title="Credits and pricing" icon="credit-card" href="/credits">
A fixed price a call; a failed call is free.
</Card>
<Card title="Batches (v1)" icon="layers" href="/docs">
Squids, tasks and runs: many calls on a schedule, delivered where you work.
</Card>
</CardGroup>
