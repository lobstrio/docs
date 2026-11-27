---
title: SDKs
description: lobstrio for Python and Node.js, a typed method for each operation, every page in one loop, retries never charged twice, a lobstr command, and tools for LangChain, CrewAI and the Vercel AI SDK.
---

`lobstrio`, the same name on PyPI and npm, open source under Apache 2.0: [lobstrio-python](https://github.com/lobstrio/lobstrio-python), [lobstrio-node](https://github.com/lobstrio/lobstrio-node). Both read your key from `LOBSTR_API_KEY`.

## Install

<CodeGroup>

```bash Python
pip install lobstrio
```

```bash Node.js
npm install lobstrio
```

</CodeGroup>

Python 3.9 or later; Node.js 18 or later, ESM or CommonJS, no dependencies.

## One call

A typed method for each operation, its options and its record checked by your editor:

<CodeGroup>

```python Python
from lobstrio import Lobstr

client = Lobstr()

run = client.google_maps.places.get(place="Gramercy Tavern, New York")
print(run.results[0]["name"], run.cost)
```

```js Node.js
import { Lobstr } from 'lobstrio'

const client = new Lobstr()

const run = await client.googleMaps.places.get({ place: 'Gramercy Tavern, New York' })
console.log(run.results[0].name, run.cost)
```

</CodeGroup>

`client.run("google_maps/places/get", {...})` does the same by the operation's id, and runs an operation newer than your SDK, untyped. The answer keeps the API's fields: [Run an operation](/run).

## Every page

`iterate` follows `next` until there is no more, or until your cap:

<CodeGroup>

```python Python
for review in client.iterate(
    "google_maps/reviews/list", {"place": "ChIJCar0f49ZwokR6ozLV-dHNTE"}, max_records=100
):
    print(review["rating"]["value"], review["text"])
```

```js Node.js
for await (const review of client.iterate('google_maps/reviews/list', { place: 'ChIJCar0f49ZwokR6ozLV-dHNTE' }, { maxRecords: 100 })) {
  console.log(review.rating.value, review.text)
}
```

</CodeGroup>

Each page is a call, at the operation's price: [Pagination](/pagination).

## Retries and errors

Every call sends an `Idempotency-Key` and keeps it across the SDK's retries, so a retry is never charged twice. What can work later is retried (a `retryable` error, a `429` with `retry_after`, a lost connection); the rest is raised with the API's `code`, `message`, `param` and `doc_url`: [Errors](/errors).

## The CLI

Both install a `lobstr` command:

```bash
lobstr run google_maps/places/search query="bakeries in Austin, TX" --limit 5 --fields name,phone
lobstr catalog google maps
lobstr balance
```

## Agent frameworks

The [MCP server](/agents)'s tools for an agent written in code: `lobstr_find_operations`, `lobstr_get_operation` and `lobstr_run_operation`, and one tool per operation if you name them.

<CodeGroup>

```python LangChain
# pip install "lobstrio[langchain]" langchain langchain-anthropic
from langchain.agents import create_agent
from lobstrio.langchain import LobstrToolkit

tools = LobstrToolkit(operations=["google_maps/places/search"]).get_tools()
agent = create_agent("anthropic:claude-sonnet-5-5", tools)
```

```python CrewAI
# pip install "lobstrio[crewai]"
from crewai import Agent
from lobstrio.crewai import lobstr_tools

analyst = Agent(
    role="News analyst",
    goal="Say what the news says about a brand",
    backstory="You read the news for a living.",
    tools=lobstr_tools(operations=["google_news/articles/search"]),
)
```

```js Vercel AI SDK
// npm install lobstrio ai @ai-sdk/anthropic
import { anthropic } from '@ai-sdk/anthropic'
import { generateText, isStepCount } from 'ai'
import { lobstrTools } from 'lobstrio/ai-sdk'

const { text } = await generateText({
  model: anthropic('claude-sonnet-5-5'),
  tools: await lobstrTools(),
  stopWhen: isStepCount(10),
  prompt: 'What does the news say about Tesla today?',
})
```

</CodeGroup>

A guide for each: [LangChain](/langchain), [CrewAI](/crewai), [Vercel AI SDK](/ai-sdk). Agents that use them, end to end: [lobstrio/examples](https://github.com/lobstrio/examples).
