# Contributing to lobstr.io API Documentation

Thank you for your interest in contributing! This guide covers how to add new documentation, fix issues, and submit changes.

## Getting Started

```bash
git clone https://github.com/lobstrio/lobstrio-docs.git
cd lobstrio-docs
npm install
cp .env.example .env  # set NEXT_PUBLIC_SITE_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/                    # Next.js App Router pages
  docs/
    [...slug]/          # Dynamic doc pages (from JSON)
    mcp/                # MCP server page
    sdk/                # Python SDK page
    cli/                # CLI page
components/             # React components
content/
  docs/                 # Documentation JSON files
  code-examples/        # Code snippets (curl, python, response)
  navigation.json       # Sidebar structure
lib/                    # Utilities and types
```

## Adding New API Documentation

Each endpoint needs 4 things:

1. **Doc file** — `content/docs/{slug}.json`
2. **cURL example** — `content/code-examples/curl/{slug}`
3. **Python example** — `content/code-examples/python/{slug}`
4. **Response example** — `content/code-examples/response/{slug}/{status-code}`

See [DOCS_GUIDE.md](DOCS_GUIDE.md) for the full JSON schema and field reference.

After creating the files, add the page to `content/navigation.json`.

## Adding Scraper Examples

Each scraper needs 3 endpoints (add-tasks, update-settings, get-results) following the same structure under `content/docs/examples/{scraper-slug}/`.

## Code Style

- TypeScript throughout
- Tailwind CSS for styling
- Follow the existing patterns in the codebase
- Use the shared `CodeBlock` component for syntax-highlighted code

## Commits

Use the `[front-apiDocs]` prefix:

```
[front-apiDocs] feat: add new scraper documentation
[front-apiDocs] fix: correct response example for get-results
[front-apiDocs] chore: update dependencies
```

## Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Make your changes
4. Run `npm run build` to verify
5. Submit a pull request against `main`

## MCP Server

The documentation is also available via MCP at `/api/mcp`. If you add new docs, the MCP server picks them up automatically — no extra config needed.

## License

By contributing, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).
