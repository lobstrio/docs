---
title: Credits and pricing
description: Each operation has a fixed price a call, in credits, whatever the call brings back. A failed call is free.
---

An operation costs the same credits on every call: 1 for a Google Maps place, 20 for a page of Google Maps search, 100 for a page of Leboncoin search. Each operation's page says its price and what it does not charge: a failed call always, an empty page for most searches. One balance pays for every operation.

## Plans

| | Free | Starter | Pro | Team |
| --- | --- | --- | --- | --- |
| A month | $0 | $20 | $100 | $500 |
| Credits a month | 100 | 10,000 | 100,000 | 1,000,000 |
| 1,000 credits | | $2 | $1 | $0.50 |
| Calls at a time | 1 | 2 | 10 | 50 |
| Answers kept | 7 days | 45 days | 45 days | 90 days |

Every operation is on every plan. Paid yearly, a plan costs 20% less. More than 1,000,000 credits a month: [talk to us](https://cal.com/lobstrio/demo). The whole comparison and the billing questions: [pricing](https://www.lobstr.io/pricing).

## What a call cost

Every answer says it, with the credits left:

```json
{
  "cost": {
    "credits": 20
  },
  "balance": {
    "credits": 99980
  }
}
```

`GET /v2/balance` says the credits left and your plan, with what one credit costs on it:

<ResponseField name="credits" type="number">
What you can spend now: your balance, minus what calls running at this moment hold.
</ResponseField>
<ResponseField name="plan" type="object">
`name`, `credits_per_month`, `concurrent_calls`, `billing` (`month` or `year`), `price` and `credit_price` (`null` on Free), each `{amount, currency}`.
</ResponseField>

A call's price is held when it starts and settled when it ends: two calls never spend the same credits. A call that costs more than what is left answers `402` [`insufficient_credits`](/errors#insufficient_credits), before anything runs.
