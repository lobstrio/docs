---
title: Vercel AI SDK
description: lobstr.io's tools for the Vercel AI SDK, from the lobstrio Node.js SDK. The model finds an operation, reads it and runs it, or calls a tool made for one operation.
---

## Install

```bash
npm install lobstrio ai @ai-sdk/anthropic
export LOBSTR_API_KEY="..."
export ANTHROPIC_API_KEY="..."
```

AI SDK 7, Node.js 18 or later. Your lobstr.io key is in the app, under [API](https://app.lobstr.io/dashboard/api); the free plan has 100 credits a month. The second key is your model's: any AI SDK provider with tool calling works. `ai` is an optional peer dependency of `lobstrio`: its main entry never loads it.

## A first call

```js
import { anthropic } from '@ai-sdk/anthropic'
import { generateText, isStepCount } from 'ai'
import { lobstrTools } from 'lobstrio/ai-sdk'

const { text } = await generateText({
  model: anthropic('claude-sonnet-5-5'),
  tools: await lobstrTools({ operations: ['google_news/articles/search'] }),
  stopWhen: isStepCount(10),
  prompt: 'What does the news say about Tesla today?',
})
console.log(text)
```

The model makes one Google News search: 1 credit. `streamText` takes the same tools.

## The tools

`lobstrTools()` always gives the [MCP server](/agents)'s three tools:

<ResponseField name="lobstr_find_operations" type="tool">
The operations that fit what the model needs, with their price.
</ResponseField>
<ResponseField name="lobstr_get_operation" type="tool">
One operation's options, the fields of its records, its errors.
</ResponseField>
<ResponseField name="lobstr_run_operation" type="tool">
One call, one page of records. `next` is the call for the following page.
</ResponseField>

`operations` adds one tool per operation, named after it (`google_news_articles_search`). Its input schema is the operation's options from the catalog, plus `fields`, and `limit` for a search or a list.

Name the operations when you know them: the model fills one tool and calls it. Leave them out when it must choose among every operation: it then finds, reads and runs, two steps more.

## What the tools answer

- Compact JSON: `count`, `cost`, `has_more`, `next` and the records. Ask for the `fields` you need: a full page is large.
- A failed call comes back to the model as text, the API's message and `doc_url`, and never stops the loop. Without `LOBSTR_API_KEY`, finding and reading operations still work; the first call that runs one answers that the key is missing, and how to give it.
- Each call costs its operation's credits; an empty page and a failed call are free.

For your own key or settings, pass a client: `lobstrTools({ client: new Lobstr({ apiKey: '...' }) })`.

## Example

[ai-sdk-x-monitoring](https://github.com/lobstrio/examples/tree/main/node/ai-sdk-x-monitoring): what X says about a brand today, summarized.
