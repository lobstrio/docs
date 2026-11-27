---
title: LangChain
description: lobstr.io's tools for a LangChain agent, from the lobstrio Python SDK. The agent finds an operation, reads it and runs it, or calls a tool made for one operation.
---

## Install

```bash
pip install "lobstrio[langchain]" langchain langchain-anthropic
export LOBSTR_API_KEY="..."
export ANTHROPIC_API_KEY="..."
```

Python 3.11 or later. Your lobstr.io key is in the app, under [API](https://app.lobstr.io/dashboard/api); the free plan has 100 credits a month. The second key is your model's: any chat model with tool calling works.

## A first agent

```python
from langchain.agents import create_agent
from lobstrio.langchain import LobstrToolkit

tools = LobstrToolkit(operations=["google_maps/places/search"]).get_tools()
agent = create_agent("anthropic:claude-sonnet-5-5", tools)

question = "Five dentists in Austin, TX, with their phone"
answer = agent.invoke({"messages": [{"role": "user", "content": question}]})
print(answer["messages"][-1].content)
```

The agent makes one Google Maps search: 20 credits.

## The tools

Every toolkit has the [MCP server](/agents)'s three tools:

<ResponseField name="lobstr_find_operations" type="tool">
The operations that fit what the agent needs, with their price.
</ResponseField>
<ResponseField name="lobstr_get_operation" type="tool">
One operation's options, the fields of its records, its errors.
</ResponseField>
<ResponseField name="lobstr_run_operation" type="tool">
One call, one page of records. `next` is the call for the following page.
</ResponseField>

`operations` adds one tool per operation, named after it (`google_maps_places_search`). Its arguments are the operation's options, plus `fields`, and `limit` for a search or a list.

Name the operations when you know them: the agent fills one tool and calls it. Leave them out when it must choose among every operation: it then finds, reads and runs, two steps more.

```python
tools = LobstrToolkit().get_tools()                                   # every operation, three tools
tools = LobstrToolkit(operations=["websites/contacts/get"]).get_tools()  # plus one of its own
```

## What the tools answer

- Compact JSON: `count`, `cost`, `has_more`, `next` and the records. Ask for the `fields` you need: a full page is large.
- An API error comes back to the agent as text, with its `doc_url`, not as an exception: the agent reads it and fixes its call. Without `LOBSTR_API_KEY`, finding and reading operations still work; the first call that runs one answers that the key is missing, and how to give it.
- Each call costs its operation's credits; an empty page and a failed call are free. The catalog is read once, for the toolkit's lifetime.

For your own key or settings, pass a client: `LobstrToolkit(client=Lobstr(api_key="...", max_retries=3))`.

## Example

[langchain-leads](https://github.com/lobstrio/examples/tree/main/python/langchain-leads): businesses of a kind in a US city from Google Maps, their emails from their websites, written to a CSV.
