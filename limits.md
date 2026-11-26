---
title: Limits
description: Your plan's calls at a time, each call's deadline, and the pace of your own accounts. Every limit answers at once, and nothing is charged.
---

## Calls at a time

Each plan runs a number of calls at the same time, from 1 on Free to 50 on Team ([plans](/credits#plans)). One more answers `429` [`concurrency_limit`](/errors#concurrency_limit) at once, with `retry_after`: nothing ran, nothing was charged. Retry when a call has finished, or take a [larger plan](https://app.lobstr.io/dashboard/plans). Above Team, [talk to us](https://cal.com/lobstrio/demo).

## Each call's deadline

Each operation waits for the site up to its own deadline; `timeout_s` sets a shorter or longer one, up to its maximum. Past it, the call answers `408` [`timeout`](/errors#timeout) and costs nothing.

## Your accounts' pace

The operations that run with [your own account](/accounts) go at the site's pace, counted across all your calls: two calls on one account do not go faster, they share its pace.

<AccountPaces />

A busy account answers `429` [`account_rate_limited`](/errors#account_rate_limited) at once, with `retry_after` in seconds, and a call is never held waiting on our side. An account past its day's calls answers [`account_quota_exceeded`](/errors#account_quota_exceeded) until midnight UTC. Both are free. More accounts, more calls: each one has its own pace.
