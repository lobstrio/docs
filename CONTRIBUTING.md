# Contributing to lobstrio-docs

This is the Mintlify source for `docs.lobstr.io` / `help.lobstr.io`. Config in [docs.json](docs.json), core API pages in [docs/](docs/), one folder per scraper under [examples/](examples/), release notes in [changelog/](changelog/), reusable content in [snippets/](snippets/). Edits are live-rendered — no build step.

## Docs are part of the definition of done

**A scraper enhancement is not complete until its docs reflect it.** If you change a scraper's parameters, response fields, or account requirements, update the matching page(s) under `examples/<scraper-slug>/` in the same change — not as a follow-up. This applies equally to:

- A new or renamed parameter → update `add-tasks.mdx` / `update-settings.mdx`.
- A new or changed response field, or a new possible value for an existing field → update `get-results.mdx`, including an example response for the new shape where the field's possible values aren't obvious from the type alone.
- A scraper that starts (or stops) requiring a synced platform account → use the `<AccountSyncRequired platform="..." />` snippet (see below), or remove it.
- Anything user-visible → add an entry to [changelog/](changelog/) (see the most recent dated file for format).

Docs PRs that only fix typos or formatting don't need a changelog entry. Everything else does.

## The account-sync snippet

Don't hand-write "this scraper requires a synced X account" prose per page — it drifts (wording, cookie names, and which scrapers actually need it have all diverged in the past). Instead:

```mdx
import { AccountSyncRequired } from '/snippets/account-sync-required.mdx';

<AccountSyncRequired platform="LinkedIn" />
```

Place it near the top of `add-tasks.mdx` (and `update-settings.mdx` if that page also has an `accounts` field), right after the intro paragraph. See [docs/link-account-to-squid.mdx](docs/link-account-to-squid.mdx) for the general account-linking flow this snippet points to.

Only add it where the requirement is real — confirm with engineering/product if you're not sure a scraper actually needs a synced account before adding the note; a false positive is as bad as a missing one.

## Before merging

- If you added a new page, register it in [docs.json](docs.json)'s nav — an unlisted page is invisible to readers even though it renders.
- If you touched `examples/index.mdx`'s scraper count or gallery, double-check it against the actual number of folders under `examples/` — this has drifted before.
