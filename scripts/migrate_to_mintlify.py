#!/usr/bin/env python3
"""
migrate_to_mintlify.py

Converts lobstrio-docs (Next.js JSON-based) to Mintlify MDX format.

Sources:
  content/docs/*.json                  → docs/*.mdx          (core API pages)
  content/docs/examples/**/*.json      → examples/**/*.mdx   (scraper pages from JSON)
  GET /v1/crawlers/{id}/attributes     → examples/*/get-results.mdx (live API, all 43 crawlers)
  content/navigation.json              → mint.json

Usage:
    python scripts/migrate_to_mintlify.py
    python scripts/migrate_to_mintlify.py --output /path/to/output
"""

import argparse
import json
import re
import urllib.error
import urllib.request
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

REPO_ROOT = Path(__file__).parent.parent
CONTENT_DIR = REPO_ROOT / "content"
DOCS_DIR = CONTENT_DIR / "docs"
CODE_DIR = CONTENT_DIR / "code-examples"
NAVIGATION_FILE = CONTENT_DIR / "navigation.json"

API_BASE = "https://api.lobstr.io"

# ---------------------------------------------------------------------------
# File helpers
# ---------------------------------------------------------------------------

def read_file(path: Path) -> str | None:
    if path.exists() and path.is_file():
        return path.read_text(encoding="utf-8").strip()
    return None


def get_code_example(slug: str, lang: str) -> str | None:
    """Read code example: content/code-examples/{lang}/{slug}"""
    return read_file(CODE_DIR / lang / slug)


def get_all_responses(slug: str) -> dict[str, str]:
    """Return {status_code: content} for all response files for this slug."""
    resp_dir = CODE_DIR / "response" / slug
    if not resp_dir.exists():
        return {}
    return {
        f.name: f.read_text(encoding="utf-8").strip()
        for f in sorted(resp_dir.iterdir())
        if f.is_file()
    }

# ---------------------------------------------------------------------------
# MDX component renderers
# ---------------------------------------------------------------------------

PROTIP_TAG = {"tip": "Tip", "note": "Note", "warning": "Warning"}


def _example_str(example) -> str:
    """Format an example value for inline display."""
    if example is None or example == "":
        return ""
    # Booleans must come before int check (bool is subclass of int in Python)
    if isinstance(example, bool):
        return f" Example: `{str(example).lower()}`"
    return f" Example: `{example}`"


def render_response_fields(fields: list) -> str:
    lines = []
    for f in fields:
        name = f.get("path") or f.get("name", "")
        ftype = f.get("type", "string")
        desc = f.get("description", "")
        ex = _example_str(f.get("example"))
        lines += [f'<ResponseField name="{name}" type="{ftype}">', f"  {desc}{ex}", "</ResponseField>", ""]
    return "\n".join(lines)


def render_body_params(params: list) -> str:
    lines = []
    for p in params:
        name = p.get("name", "")
        ptype = p.get("type", "string")
        req = " required" if p.get("required") else ""
        desc = p.get("description", "")
        ex = _example_str(p.get("example"))
        lines += [f'<ParamField body="{name}" type="{ptype}"{req}>', f"  {desc}{ex}", "</ParamField>", ""]
    return "\n".join(lines)


def render_query_params(params: list) -> str:
    lines = []
    for p in params:
        name = p.get("name", "")
        ptype = p.get("type", "string")
        req = " required" if p.get("required") else ""
        desc = p.get("description", "")
        ex = _example_str(p.get("example"))
        lines += [f'<ParamField query="{name}" type="{ptype}"{req}>', f"  {desc}{ex}", "</ParamField>", ""]
    return "\n".join(lines)


def render_headers(headers: list) -> str:
    lines = []
    for h in headers:
        req = " required" if h.get("required") else ""
        desc = h.get("description", "")
        val = h.get("value", "")
        lines += [
            f'<ParamField header="{h["key"]}" type="string"{req}>',
            f"  {desc}. Value: `{val}`",
            "</ParamField>",
            "",
        ]
    return "\n".join(lines)


def render_markdown_table(columns: list, rows: list) -> str:
    header = "| " + " | ".join(c["header"] for c in columns) + " |"
    sep = "| " + " | ".join("---" for _ in columns) + " |"
    body = [
        "| " + " | ".join(str(row.get(c["key"], "")) for c in columns) + " |"
        for row in rows
    ]
    return "\n".join([header, sep] + body)


def render_section(section: dict, heading_level: int = 3) -> str:
    """
    Render a single section dict to MDX text.

    heading_level=3 when called inline via {{RENDER:key}} (inside introduction).
    heading_level=2 when called as a standalone top-level section.
    """
    parts = []
    title = section.get("title", "")
    hashes = "#" * heading_level

    if title:
        parts.append(f"{hashes} {title}\n")

    content = section.get("content")
    fields = section.get("fields")
    parameters = section.get("parameters")   # request-body params inside a section
    columns = section.get("columns")
    rows = section.get("rows")

    # Plain text content (may coexist with fields)
    if content and not fields:
        parts.append(content + "\n")

    # ResponseField list
    if fields:
        if content:
            parts.append(content + "\n")
        parts.append(render_response_fields(fields))

    # Inline request-body parameters
    if parameters:
        parts.append(render_body_params(parameters))

    # Markdown table
    if columns and rows:
        parts.append(render_markdown_table(columns, rows) + "\n")

    return "\n".join(parts)


def resolve_renders(introduction: str, sections: dict) -> tuple[str, set]:
    """
    Replace {{RENDER:key}} directives with rendered section content.
    Returns (resolved_text, set_of_rendered_keys).
    """
    rendered_keys: set = set()

    def replacer(match):
        key = match.group(1)
        rendered_keys.add(key)
        return render_section(sections[key], heading_level=3) if key in sections else ""

    resolved = re.sub(r"\{\{RENDER:(\w+)\}\}", replacer, introduction)
    return resolved, rendered_keys

# ---------------------------------------------------------------------------
# Core converter: doc JSON → MDX string
# ---------------------------------------------------------------------------

def doc_to_mdx(doc: dict, slug: str) -> str:
    title = doc.get("title", "")
    description = doc.get("description", "")
    metadata = doc.get("metadata", {})
    content = doc.get("content", {})

    method = metadata.get("method", "")
    endpoint = metadata.get("endpoint", "")

    # Frontmatter
    fm = ["---", f'title: "{title}"', f'description: "{description}"']
    if method and endpoint:
        fm.append(f'api: "{method} {API_BASE}{endpoint}"')
    fm.append("---")

    parts = ["\n".join(fm)]

    # Introduction (resolve {{RENDER:key}} inline)
    introduction = content.get("introduction", "")
    sections = content.get("sections", {})

    if introduction:
        resolved, rendered_keys = resolve_renders(introduction, sections)
        parts.append(resolved.strip())
    else:
        rendered_keys = set()

    # Headers
    headers = content.get("headers", [])
    if headers:
        parts.append("\n## Headers\n")
        parts.append(render_headers(headers))

    # Query parameters (GET endpoints)
    query_params = content.get("parameters", [])
    if query_params:
        parts.append("\n## Query Parameters\n")
        parts.append(render_query_params(query_params))

    # Remaining sections (not already rendered inline)
    for key, section in sections.items():
        if key not in rendered_keys:
            parts.append(f"\n## {section.get('title', key)}\n")
            section_no_title = {k: v for k, v in section.items() if k != "title"}
            parts.append(render_section(section_no_title, heading_level=3))

    # ProTips
    for tip in content.get("proTips", []):
        tag = PROTIP_TAG.get(tip.get("type", "tip"), "Note")
        parts.append(f"\n<{tag}>\n  {tip.get('content', '')}\n</{tag}>")

    # Code examples
    curl = get_code_example(slug, "curl")
    python = get_code_example(slug, "python")
    if curl or python:
        code = ["\n## Code Examples\n", "<CodeGroup>"]
        if curl:
            code += ["```bash cURL", curl, "```"]
        if python:
            code += ["", "```python Python", python, "```"]
        code.append("</CodeGroup>")
        parts.append("\n".join(code))

    # Response examples (all status codes)
    responses = get_all_responses(slug)
    if responses:
        resp = ["\n## Response\n"]
        for status, body in responses.items():
            resp += [f"```json {status}", body, "```", ""]
        parts.append("\n".join(resp))

    return "\n\n".join(parts)

# ---------------------------------------------------------------------------
# API-driven get-results generator
# ---------------------------------------------------------------------------

def fetch_json(url: str) -> dict:
    with urllib.request.urlopen(url, timeout=10) as resp:
        return json.loads(resp.read())


def attributes_to_mdx(crawler: dict, attributes: list) -> str:
    crawler_name = crawler["name"]

    fm = "\n".join([
        "---",
        'title: "Get Results"',
        f'description: "Retrieve scraped data from {crawler_name}"',
        f'api: "GET {API_BASE}/v1/results"',
        "---",
    ])

    parts = [
        fm,
        f"Retrieve scraped data from your **{crawler_name}** runs.",

        "## Headers\n"
        + '<ParamField header="Authorization" type="string" required>\n'
        + "  Your API authentication token. Value: `Token YOUR_API_KEY`\n"
        + "</ParamField>",

        "## Query Parameters\n"
        + render_query_params([
            {"name": "squid",  "type": "string",  "required": True,  "description": "Hash of the squid to get results from"},
            {"name": "run",    "type": "string",  "required": False, "description": "Hash of a specific run (optional)"},
            {"name": "page",   "type": "integer", "required": False, "description": "Page number (default: 1)", "example": "1"},
        ]),

        "## Result Fields\n"
        + "Each result object contains the following fields:\n\n"
        + render_response_fields(attributes),
    ]

    return "\n\n".join(parts)

# ---------------------------------------------------------------------------
# mint.json generator
# ---------------------------------------------------------------------------

def build_mint_json(navigation: dict) -> dict:
    api_groups     = [{"group": "Overview", "pages": ["index"]}]
    example_groups = []

    for section in navigation.get("sections", []):
        title = section["title"]

        if "subsections" in section:
            for sub in section["subsections"]:
                pages = []
                for item in sub.get("items", []):
                    slug = item["slug"]
                    pages.append(slug if slug.startswith("examples/") else f"docs/{slug}")
                example_groups.append({"group": sub["title"], "pages": pages})
        else:
            pages = [f"docs/{item['slug']}" for item in section.get("items", [])]
            api_groups.append({"group": title, "pages": pages})

    dev_groups = [
        {"group": "Developer Tools", "pages": ["docs/sdk", "docs/cli", "docs/mcp"]},
    ]

    return {
        "name": "lobstr.io",
        "logo": {
            "light": "/logo/light.svg",
            "dark": "/logo/dark.svg"
        },
        "favicon": "/favicon.svg",
        "colors": {
            "primary": "#ff0000",
            "light": "#ff3333",
            "dark": "#cc0000"
        },
        "topbarLinks": [
            {"name": "lobstr.io", "url": "https://lobstr.io"}
        ],
        "topbarCtaButton": {
            "name": "Get Started",
            "url": "https://app.lobstr.io"
        },
        "api": {
            "baseUrl": API_BASE,
            "auth": {"method": "bearer"}
        },
        "navigation": {
            "tabs": [
                {"tab": "API Reference",   "groups": api_groups},
                {"tab": "Examples",        "groups": example_groups},
                {"tab": "Developer Tools", "groups": dev_groups},
            ]
        },
    }

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Migrate lobstrio-docs to Mintlify MDX")
    parser.add_argument(
        "--output",
        default=str(REPO_ROOT / "mintlify-output"),
        help="Output directory (default: lobstrio-docs/mintlify-output)",
    )
    args = parser.parse_args()

    out = Path(args.output)
    (out / "docs").mkdir(parents=True, exist_ok=True)
    (out / "examples").mkdir(parents=True, exist_ok=True)

    print("=== Mintlify Migration ===\n")

    # ── Step 1: Core API endpoint docs ───────────────────────────────────────
    print("Step 1: Converting core API docs...")
    count = 0
    for json_file in sorted(DOCS_DIR.glob("*.json")):
        doc = json.loads(json_file.read_text(encoding="utf-8"))
        slug = doc.get("slug", json_file.stem)
        (out / "docs" / f"{json_file.stem}.mdx").write_text(doc_to_mdx(doc, slug))
        count += 1
    print(f"  {count} files → docs/\n")

    # ── Step 2: Scraper example docs (from existing JSON) ────────────────────
    print("Step 2: Converting scraper example docs from JSON...")
    count = 0
    for json_file in sorted(DOCS_DIR.glob("examples/**/*.json")):
        doc = json.loads(json_file.read_text(encoding="utf-8"))
        slug = doc.get("slug", "")
        # slug = "examples/{scraper}/{page}"
        parts = Path(slug).parts   # ("examples", "scraper-slug", "page-name")
        if len(parts) < 3:
            print(f"  ✗ unexpected slug: {slug}")
            continue
        _, scraper, page = parts[0], parts[1], parts[2]
        dest_dir = out / "examples" / scraper
        dest_dir.mkdir(parents=True, exist_ok=True)
        (dest_dir / f"{page}.mdx").write_text(doc_to_mdx(doc, slug))
        print(f"  examples/{scraper}/{page}.mdx")
        count += 1
    print(f"\n  {count} files → examples/\n")

    # ── Step 3: Generate get-results.mdx for all crawlers via live API ────────
    print("Step 3: Generating get-results.mdx from live API attributes...")
    try:
        crawlers = fetch_json(f"{API_BASE}/v1/crawlers").get("data", [])
        print(f"  {len(crawlers)} crawlers found in API\n")
        api_count = 0
        for crawler in crawlers:
            cid, cslug = crawler["id"], crawler["slug"]
            try:
                attrs = fetch_json(f"{API_BASE}/v1/crawlers/{cid}/attributes").get("data", [])
            except urllib.error.URLError as e:
                print(f"  ✗ {cslug}: {e}")
                continue
            dest = out / "examples" / cslug
            dest.mkdir(parents=True, exist_ok=True)
            (dest / "get-results.mdx").write_text(attributes_to_mdx(crawler, attrs))
            print(f"  ✓ examples/{cslug}/get-results.mdx  ({len(attrs)} fields)")
            api_count += 1
        print(f"\n  {api_count}/{len(crawlers)} get-results pages generated from API\n")
    except Exception as e:
        print(f"  ✗ Could not reach API: {e}\n")

    # ── Step 4: mint.json ─────────────────────────────────────────────────────
    print("Step 4: Generating mint.json...")
    navigation = json.loads(NAVIGATION_FILE.read_text(encoding="utf-8"))
    mint = build_mint_json(navigation)
    (out / "mint.json").write_text(json.dumps(mint, indent=2))
    print("  ✓ mint.json\n")

    # ── Step 5: Static assets (favicon, logo, index) ─────────────────────────
    print("Step 5: Copying static assets and generating index page...")

    # Favicon
    favicon_src = REPO_ROOT / "app" / "icon.svg"
    if favicon_src.exists():
        (out / "favicon.svg").write_bytes(favicon_src.read_bytes())
        print("  ✓ favicon.svg")

    # Index / landing page
    index_mdx = '''\
---
title: "lobstr.io API Documentation"
description: "The most powerful and easy-to-use data collection API. 50+ ready-made crawlers, simple REST endpoints, structured JSON output."
---

<CardGroup cols={3}>
  <Card title="Quick Start" icon="bolt" href="/docs/authentication">
    Get your API key and make your first request in minutes.
  </Card>
  <Card title="50+ Crawlers" icon="spider-web" href="/docs/list-crawlers">
    Google Maps, LinkedIn, Twitter, Instagram, and more — ready to use.
  </Card>
  <Card title="Python SDK" icon="python" href="/docs/sdk">
    Typed models, auto-pagination, sync and async clients.
  </Card>
</CardGroup>

## Core Concepts

The lobstr.io API is built around three primitives:

- **Squid** — a configured scraper instance tied to a crawler and your settings
- **Task** — a URL or keyword the squid will scrape
- **Run** — a single execution of a squid against its tasks

<Steps>
  <Step title="Authenticate">
    Include `Authorization: Token YOUR_API_KEY` in every request.
  </Step>
  <Step title="Create a squid">
    Pick a crawler and create a squid with your settings.
  </Step>
  <Step title="Add tasks">
    Add URLs or keywords as tasks to the squid.
  </Step>
  <Step title="Start a run">
    Trigger a run and poll for completion.
  </Step>
  <Step title="Get results">
    Fetch structured JSON results from `GET /v1/results`.
  </Step>
</Steps>

## Developer Tools

<CardGroup cols={3}>
  <Card title="Python SDK" icon="python" href="/docs/sdk">
    `pip install lobstrio-sdk`
  </Card>
  <Card title="CLI" icon="terminal" href="/docs/cli">
    `pip install lobstrio`
  </Card>
  <Card title="MCP Server" icon="robot" href="/docs/mcp">
    Connect Claude or Cursor to the docs.
  </Card>
</CardGroup>
'''
    (out / "index.mdx").write_text(index_mdx)
    print("  ✓ index.mdx\n")

    print("Step 6: Generating logo SVGs...")

    logo_dir = out / "logo"
    logo_dir.mkdir(exist_ok=True)
    svg_base = (
        '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="36" viewBox="0 0 160 36">\n'
        '  <text y="28" font-family="\'Source Sans 3\', \'Source Sans Pro\', sans-serif" font-size="26" font-weight="700" fill="#ff0000">lobstr.io</text>\n'
        '  <text x="108" y="28" font-family="\'Source Sans 3\', \'Source Sans Pro\', sans-serif" font-size="22" font-weight="400" fill="{docs_color}">docs</text>\n'
        '</svg>\n'
    )
    (logo_dir / "light.svg").write_text(svg_base.format(docs_color="#0E1117"))
    (logo_dir / "dark.svg").write_text(svg_base.format(docs_color="#FFFFFF"))
    print("  ✓ logo/light.svg")
    print("  ✓ logo/dark.svg\n")

    print(f"=== Done — output in: {out} ===\n")
    print("Next steps:")
    print("  1. Review mintlify-output/ — spot-check a few .mdx files")
    print("  2. Sign up / log in at mintlify.com, create a project, connect your GitHub repo")
    print("  3. Copy mintlify-output/ contents to the repo root and push")
    print("  4. Mintlify auto-deploys on every push to main")


if __name__ == "__main__":
    main()
