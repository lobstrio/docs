---
title: Feedback
description: Tell us what went wrong or what you need, from the code or the agent session where it happened. Free.
---

An operation failed in a way its error does not explain, a record lacks a field you need, the operation you need does not exist yet, an error misled you: send it to `POST /v2/feedback`. It reaches the team that builds the operations, with your account, the operation and the call.

```bash
curl https://api.lobstr.io/v2/feedback \
  -H "Authorization: Bearer $LOBSTR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "reviews/list answered no owner reply on a place that has some",
    "kind": "missing_data",
    "operation": "google_maps/reviews/list",
    "run": "run_5marqhincfykpisq3artgziza"
  }'
```

<ParamField body="message" type="string" required>
What happened and what you expected, in a few sentences. Cut at 2,000 characters. Never your users' personal data or secrets.
</ParamField>
<ParamField body="kind" type="string">
`bug`, `missing_data`, `idea` or `other` (the default).
</ParamField>
<ParamField body="operation" type="string">
The operation's id, as `google_maps/reviews/list`.
</ParamField>
<ParamField body="run" type="string">
The `id` of the call concerned, from its answer (`run_...`).
</ParamField>

It answers `201` with the message's id:

```json
{
  "object": "feedback",
  "id": "fbk_7c3kq0hz2m9w4r6t1b8n5d0xa",
  "created_at": "2026-11-25T16:20:00Z",
  "kind": "missing_data",
  "note": "Received by the team that builds lobstr.io's operations. No answer comes back through the API."
}
```

## From an agent

The MCP server's `send_feedback` tool sends it from the session, and its description tells the agent when: see [Agents](/agents).

## Limits

Free, never charged. 20 messages a day per account: one more answers [`feedback_limit_reached`](/errors#feedback_limit_reached) until midnight UTC. A message that is empty, or an `operation` or a `run` that is not an id, answers [`invalid_feedback`](/errors#invalid_feedback) with the field in `param`.
