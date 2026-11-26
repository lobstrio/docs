# lobstr.io docs

The source of [docs.lobstr.io](https://docs.lobstr.io?utm_source=docs-repo&utm_medium=readme), in Markdown, as it is published: the API v2 at the root, the batches (v1) in `docs/`, `examples/` and `changelog/`.

| | |
| --- | --- |
| [index.md](index.md) | Introduction |
| [quickstart.md](quickstart.md) | From your API key to your first answer, in a minute |
| [agents.md](agents.md) | The MCP server, for Claude, ChatGPT, Cursor and any MCP client |
| [operations.md](operations.md) | Every operation, with its price |
| [reference/](reference) | The API reference |
| [changelog/](changelog) | What changed, API v2 and batches (v1) |

Each page is also served in Markdown at its address plus `.md` (for example [docs.lobstr.io/quickstart.md](https://docs.lobstr.io/quickstart.md)), and [llms.txt](https://docs.lobstr.io/llms.txt) lists them all. Every operation's whole contract is in the [catalog](https://api.lobstr.io/v2/catalog.md).

Something wrong or missing? Open an issue, or tell us from the API, free: `POST /v2/feedback`.

The previous docs site is tagged [`legacy-site`](https://github.com/lobstrio/docs/tree/legacy-site).
