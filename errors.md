---
title: Errors
description: One error object for every failure, with what to do. A failed call costs nothing.
---

```json
{
  "error": {
    "type": "authentication_error",
    "code": "missing_api_key",
    "message": "Send your API key as `Authorization: Bearer <key>`; it is on https://app.lobstr.io/dashboard/api",
    "param": null,
    "doc_url": "https://docs.lobstr.io/errors#missing_api_key",
    "request_id": "req_t7nhs6wqq5bojctezxhjqjf45e",
    "retryable": false
  }
}
```

<ResponseField name="type" type="string">
Follows the HTTP status, to branch on: `invalid_request_error` (400, 404, 409, 410, 422), `authentication_error` (401), `billing_error` (402), `rate_limit_error` (429), `site_error` (408, 424, 503), `api_error` (500).
</ResponseField>
<ResponseField name="code" type="string">
What happened, exactly: the list below.
</ResponseField>
<ResponseField name="message" type="string">
What to do, in a sentence a person or an agent can follow.
</ResponseField>
<ResponseField name="param" type="string">
The option at fault, as `options.place`, or `null`.
</ResponseField>
<ResponseField name="retryable, retry_after" type="boolean, integer">
Whether the same call can work later, and in how many seconds (also in the `Retry-After` header).
</ResponseField>

Nothing is charged for a call that fails, whoever's fault it is.

## Every call

<ErrorCode code="missing_api_key" status="401">
No `Authorization` header: send `Authorization: Bearer <key>`.
</ErrorCode>
<ErrorCode code="invalid_api_key" status="401">
The key was mistyped or changed: copy it again from [the app](https://app.lobstr.io/dashboard/api).
</ErrorCode>
<ErrorCode code="insufficient_credits" status="402">
The call costs more credits than are left. The message says both; [plans](https://app.lobstr.io/dashboard/plans).
</ErrorCode>
<ErrorCode code="unknown_operation" status="404">
No such operation on this source: `GET /v2/catalog?source=...` lists them.
</ErrorCode>
<ErrorCode code="timeout" status="408" retryable>
The site did not answer in time. Retry, or raise `timeout_s` up to the operation's maximum.
</ErrorCode>
<ErrorCode code="idempotency_conflict" status="409">
This `Idempotency-Key` was used with another body: use a new key for a new call.
</ErrorCode>
<ErrorCode code="idempotency_in_flight" status="409" retryable>
The first call with this key still runs: retry with the same key in a few seconds.
</ErrorCode>
<ErrorCode code="invalid_body" status="422">
The body is not what `POST /v2/run` takes; `param` says where.
</ErrorCode>
<ErrorCode code="invalid_options" status="422">
An option does not fit the operation's contract; `param` names it, the message says what it takes.
</ErrorCode>
<ErrorCode code="invalid_fields" status="422">
A field asked in `fields` is not in the records; the message lists those that are.
</ErrorCode>
<ErrorCode code="invalid_limit" status="400, 422">
`limit` out of its range (1 to 100 on `GET /v2/runs`), or sent to an operation that answers one record.
</ErrorCode>
<ErrorCode code="invalid_idempotency_key" status="400">
`Idempotency-Key` takes 1 to 255 printable characters, no spaces; a UUID is fine.
</ErrorCode>
<ErrorCode code="concurrency_limit" status="429" retryable>
Your plan's calls at a time are all running: [Limits](/limits).
</ErrorCode>
<ErrorCode code="internal_error" status="500" retryable>
Something broke on our side: retry, and quote the `request_id` if it happens again.
</ErrorCode>
<ErrorCode code="balance_unavailable" status="503" retryable>
Your balance could not be read: nothing ran, retry in a few seconds.
</ErrorCode>
<ErrorCode code="accounts_unavailable" status="503" retryable>
Your connected accounts could not be read: nothing ran, retry in a few seconds.
</ErrorCode>
<ErrorCode code="service_busy" status="503" retryable>
Too many calls at once on your account: retry in a few seconds.
</ErrorCode>

## Connected accounts

When `POST /v2/accounts` connects an account ([Accounts](/accounts)):

<ErrorCode code="invalid_cookies" status="422">
The site did not accept these cookies, or they hold no login: copy them again from a browser where you are logged in.
</ErrorCode>
<ErrorCode code="country_required" status="422">
The country this call comes from could not be told: send `country`, the one you use the account from.
</ErrorCode>
<ErrorCode code="invalid_country" status="422">
This site's accounts go out from one country (Leboncoin: FR): leave `country` out or send that one.
</ErrorCode>
<ErrorCode code="account_not_found" status="404">
No connected account of yours has this id: `GET /v2/accounts` lists them.
</ErrorCode>

## Your calls

When `GET /v2/runs` reads them back ([Run an operation](/run#your-calls)):

<ErrorCode code="run_not_found" status="404">
No call of yours has this id; calls are kept 90 days.
</ErrorCode>
<ErrorCode code="response_not_kept" status="404">
This call's whole answer was not kept: a failed call answered its error only, and `GET /v2/runs/{id}` has it.
</ErrorCode>
<ErrorCode code="response_expired" status="410">
Your plan keeps answers 7, 45 or 90 days, and this one's time is over.
</ErrorCode>
<ErrorCode code="invalid_date" status="400">
`created_after` and `created_before` take a date in UTC, as `2026-11-09T08:00:00Z`.
</ErrorCode>
<ErrorCode code="invalid_status" status="400">
`status` takes `succeeded` or `failed`.
</ErrorCode>
<ErrorCode code="invalid_via" status="400">
`via` takes `api`, `mcp` or `app`.
</ErrorCode>

## Feedback

When `POST /v2/feedback` takes a message ([Feedback](/feedback)):

<ErrorCode code="invalid_feedback" status="422">
The message is empty, or `operation` or `run` is not an id: `param` names the field.
</ErrorCode>
<ErrorCode code="feedback_limit_reached" status="429" retryable>
20 messages a day per account: send the rest after midnight UTC, `retry_after` seconds from now.
</ErrorCode>
<ErrorCode code="feedback_unavailable" status="503" retryable>
The message could not be kept just now: send it again in a minute.
</ErrorCode>

## An operation's own

Each operation lists its errors on its page; here they all are, each once.

<OperationErrors />
