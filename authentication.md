---
title: Authentication
description: One API key, sent with every call.
---

Your API key is in the app, under [API](https://app.lobstr.io/dashboard/api). Send it in the `Authorization` header:

```bash
curl https://api.lobstr.io/v2/balance \
  -H "Authorization: Bearer $LOBSTR_API_KEY"
```

`Token <key>`, the form of the v1 API, works too: the same key serves both.

## What needs no key

The catalog, the OpenAPI file and the Markdown pages are public: `GET /v2/catalog`, `/v2/catalog/{source}/{resource}/{verb}` and its status, `/v2/catalog.md`, `/v2/openapi.json`.

## Keep it on your side

Call the API from your server, not from a web page: browsers are only allowed from app.lobstr.io. A key in a page's code is a key anyone can read.

## When it is refused

| Code | Status | What to do |
| --- | --- | --- |
| [`missing_api_key`](/errors#missing_api_key) | 401 | Send the header `Authorization: Bearer <key>`. |
| [`invalid_api_key`](/errors#invalid_api_key) | 401 | Copy the key again from [the app](https://app.lobstr.io/dashboard/api): it was mistyped or changed. |
