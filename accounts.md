---
title: Accounts
description: Some operations read what a site shows only to its members. They run with your own account on the site, connected once.
---

These operations need one of your accounts, and go at its pace:

<AccountPaces />

Only your own accounts: there is no pool of bought or shared ones, and nothing runs in a name you did not give us.

## Connect one

Log in to the site in your browser, copy its cookies (a cookie editor's export works as it is), and send them:

```bash
curl https://api.lobstr.io/v2/accounts \
  -H "Authorization: Bearer $LOBSTR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "site": "x",
    "cookies": {
      "auth_token": "...",
      "ct0": "..."
    },
    "country": "FR"
  }'
```

<ParamField body="site" type="string" required>
`x`, `leboncoin` or `sales_navigator`: the sites an operation needs an account for.
</ParamField>
<ParamField body="cookies" type="object | object[]" required>
The site's cookies, as `{name: value}` or a cookie editor's list of `{name, value, domain}`.
</ParamField>
<ParamField body="country" type="string">
The country you use the account from, as `FR` or `US`. Left out, it is the country of the IP that sends this call: right from your browser, wrong from a server elsewhere, where you say it. Behind a VPN, it is the VPN's country. Leboncoin's accounts go out from France: leave it out.
</ParamField>

The site checks the cookies at once, and the account is kept only once the site accepted them: `201` with the account. The same login sent again replaces its session and keeps its id (`200`). Cookies the site refuses answer [`invalid_cookies`](/errors#invalid_cookies), and nothing is kept.

```json
{
  "object": "account",
  "id": "acc_7Hq2Kd9mX4pL",
  "site": "x",
  "name": "acme",
  "status": "ok",
  "country": "FR",
  "paused_until": null,
  "created_at": "2026-11-16T09:12:40.118Z",
  "last_used_at": null
}
```

## Use it

Pass its id as the operation's `account` option. Left out, the first of your accounts on that site with a free slot takes the call.

Every call of an account goes out from an IP of its country, kept for a while and never shared with another account at the same time: a session used from elsewhere looks stolen to the site. Its cookies are encrypted, never answered and never logged.

## Its status

<ResponseField name="ok" type="status">
Ready.
</ResponseField>
<ResponseField name="paused" type="status">
The site slowed it down: it comes back by itself at `paused_until`. Meanwhile, calls without `account` go to your other accounts.
</ResponseField>
<ResponseField name="expired" type="status">
The site logged it out: log in again in your browser and connect it again.
</ResponseField>

## List, read, remove

`GET /v2/accounts` lists yours (`?site=x` for one site), `GET /v2/accounts/{id}` reads one, and `DELETE /v2/accounts/{id}` removes it, its session with it.
