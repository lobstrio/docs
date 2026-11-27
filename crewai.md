---
title: CrewAI
description: lobstr.io's tools for a CrewAI agent, from the lobstrio Python SDK. The agent finds an operation, reads it and runs it, or calls a tool made for one operation.
---

## Install

```bash
pip install "lobstrio[crewai]"
export LOBSTR_API_KEY="..."
export OPENAI_API_KEY="..."
```

Python 3.10 to 3.13. Your lobstr.io key is in the app, under [API](https://app.lobstr.io/dashboard/api); the free plan has 100 credits a month. The second key is your crew's model, CrewAI's default; any model CrewAI supports works.

## A first crew

```python
from crewai import Agent, Crew, Task
from lobstrio.crewai import lobstr_tools

analyst = Agent(
    role="News analyst",
    goal="Say what the news says about a brand",
    backstory="You read the news for a living.",
    tools=lobstr_tools(operations=["google_news/articles/search"]),
)
task = Task(
    description="What does the news say about Tesla this week?",
    expected_output="Five bullet points, each with its source",
    agent=analyst,
)
print(Crew(agents=[analyst], tasks=[task]).kickoff())
```

The agent makes one Google News search: 1 credit.

## The tools

Every call of `lobstr_tools` gives the [MCP server](/agents)'s three tools:

<ResponseField name="lobstr_find_operations" type="tool">
The operations that fit what the agent needs, with their price.
</ResponseField>
<ResponseField name="lobstr_get_operation" type="tool">
One operation's options, the fields of its records, its errors.
</ResponseField>
<ResponseField name="lobstr_run_operation" type="tool">
One call, one page of records. `next` is the call for the following page.
</ResponseField>

`operations` adds one tool per operation, named after it (`google_news_articles_search`). Its arguments are the operation's options, plus `fields`, and `limit` for a search or a list. Their contracts are read when you call `lobstr_tools`.

Name the operations when you know them: the agent fills one tool and calls it. Leave them out when it must choose among every operation: it then finds, reads and runs, two steps more.

## What the tools answer

- Compact JSON: `count`, `cost`, `has_more`, `next` and the records. Ask for the `fields` you need: a full page is large.
- An API error comes back to the agent as text, with its `doc_url`, not as an exception: the agent reads it and fixes its call. Without `LOBSTR_API_KEY`, finding and reading operations still work; the first call that runs one answers that the key is missing, and how to give it.
- Each call costs its operation's credits; an empty page and a failed call are free.

For your own key or settings, pass a client: `lobstr_tools(client=Lobstr(api_key="...", max_retries=3))`.
