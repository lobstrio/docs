---
title: Run an operation
description: One route, POST /v2/run, for every operation. The answer comes back in the same request, with what the call cost.
---

## The request

```bash
curl https://api.lobstr.io/v2/run \
  -H "Authorization: Bearer $LOBSTR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "google_maps",
    "operation": "reviews/list",
    "options": {
      "place": "ChIJCar0f49ZwokR6ozLV-dHNTE"
    },
    "fields": ["rating", "author.name"],
    "limit": 2
  }'
```

<ParamField body="source" type="string" required>
The site, as the catalog names it: `google_maps`, `realtor`, `x`...
</ParamField>
<ParamField body="operation" type="string" required>
What to do on it, `resource/verb`: `places/search`, `listings/get`, `tweets/search`...
</ParamField>
<ParamField body="options" type="object">
The operation's input. Each operation's page lists its options; a wrong one is refused before anything runs, with the option at fault in `param`.
</ParamField>
<ParamField body="fields" type="string[]">
Only these fields of each record, by path (`name`, `address.city`). `object`, `id` and `position` always come. Left out: every field.
</ParamField>
<ParamField body="limit" type="integer">
Only the first 1 to 1,000 records of the answer, for an operation that answers several (a search, a list). The call costs the same, and the next page starts after the whole page, not after the records shown. An operation that answers one record refuses it.
</ParamField>
<ParamField body="timeout_s" type="integer">
The most seconds to wait. Each operation has its own default and maximum; past them, the call answers `408 timeout` and costs nothing.
</ParamField>
<ParamField header="Idempotency-Key" type="string">
Makes a retry safe: 1 to 255 printable characters, a UUID for instance. See [Retry safely](#retry-safely).
</ParamField>

## The answer

The envelope first, the records last, in `results`. A real answer, shortened: its cursor and the review id cut, one of its two reviews, its `balance` (the credits left) left out:

```json
{
  "object": "run",
  "id": "run_g4fujoita5bddp3vpnio2nffb4",
  "created_at": "2026-11-26T15:40:42.509Z",
  "livemode": true,
  "source": "google_maps",
  "operation": "reviews/list",
  "version": "1.2.2",
  "schema_url": "https://api.lobstr.io/v2/catalog/google_maps/reviews/list",
  "options": {
    "place": "ChIJCar0f49ZwokR6ozLV-dHNTE",
    "sort": "newest",
    "language": "en"
  },
  "fields": [
    "rating",
    "author.name"
  ],
  "limit": 2,
  "status": "succeeded",
  "count": 2,
  "has_more": true,
  "next": {
    "source": "google_maps",
    "operation": "reviews/list",
    "options": {
      "place": "ChIJCar0f49ZwokR6ozLV-dHNTE",
      "sort": "newest",
      "language": "en",
      "cursor": "gAAAAABrCFL6TJJm0YaD4o…"
    },
    "fields": [
      "rating",
      "author.name"
    ],
    "limit": 2
  },
  "cost": {
    "credits": 4
  },
  "duration_ms": 1176,
  "request_id": "req_7jnlgmgf7ng35bvwdltexonqsm",
  "results": [
    {
      "object": "review",
      "id": "Ci9DQUlRQUNvZENo…",
      "position": 1,
      "rating": {
        "value": 5,
        "scale": 5
      },
      "author": {
        "name": "The350zfreak"
      }
    }
  ]
}
```

<ResponseField name="id" type="string">
The call's id: `GET /v2/runs/{id}` finds it again.
</ResponseField>
<ResponseField name="version" type="string">
The operation's version that ran; `schema_url` is its contract.
</ResponseField>
<ResponseField name="options" type="object">
What ran, the defaults included: how to read the records (their language, their sort).
</ResponseField>
<ResponseField name="fields, limit" type="string[], integer">
As asked, or `null`.
</ResponseField>
<ResponseField name="count, has_more, next" type="integer, boolean, object">
The records in this answer, whether there are more, and the whole call for the next page: [Pagination](/pagination).
</ResponseField>
<ResponseField name="cost, balance" type="object">
The credits this call cost, and the credits left: [Credits and pricing](/credits).
</ResponseField>
<ResponseField name="request_id" type="string">
Also in the `Request-Id` header of every answer, errors included. Quote it when you write to us.
</ResponseField>
<ResponseField name="results" type="object[]">
The records, each with `object`, `id` and `position`, and the fields its operation's page lists.
</ResponseField>

A call that fails answers an error object instead, and costs nothing: [Errors](/errors).

## Retry safely

Send an `Idempotency-Key` with a call you may retry, after a timeout or a lost connection. Within 30 days, the same key with the same body answers the first call's answer again, with the header `Idempotent-Replayed: true`: nothing runs, nothing is charged twice.

- The same key with another body: `409 idempotency_conflict`.
- The same key while the first call still runs: `409 idempotency_in_flight`, retry in 2 seconds.
- A call that failed frees its key: the retry runs.
- Each page is its own call: give each one its own key.

## Your calls

Every call is kept 90 days, with what was sent and what was answered, records aside:

```bash
curl "https://api.lobstr.io/v2/runs?operation=google_maps/reviews/list&status=succeeded" \
  -H "Authorization: Bearer $LOBSTR_API_KEY"
```

<ParamField query="limit" type="integer" default="20">
1 to 100 calls a page, newest first; `next` is the following page's path.
</ParamField>
<ParamField query="operation, status, via" type="string">
Only one operation, `succeeded` or `failed` calls, calls made by `api`, `mcp` or `app`.
</ParamField>
<ParamField query="created_after, created_before" type="string">
Dates in UTC, as `2026-11-09T08:00:00Z`.
</ParamField>

`GET /v2/runs/{id}` is one call. `GET /v2/runs/{id}/response` is its whole answer, records included, as long as your plan keeps answers: 7, 45 or 90 days ([Credits and pricing](/credits#plans)).
