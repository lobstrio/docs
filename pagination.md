---
title: Pagination
description: A call is one page. When there is more, the answer holds the whole call for the next one.
---

A search or a list answers one page of the site, as the site shows it: 20 places on Google Maps, 35 listings on Leboncoin. When there is more, `has_more` is `true` and `next` is the next call, whole. Send it as it is; it is `null` after the last page.

```json
{
  "has_more": true,
  "next": {
    "source": "google_maps",
    "operation": "reviews/list",
    "options": {
      "place": "ChIJc_459AHr9EcRd0ALc7vrjcI",
      "sort": "newest",
      "language": "en",
      "cursor": "gAAAAABq_G0yXBz0j4bINFws…"
    }
  }
}
```

## Every page, in a loop

<CodeGroup>

```python Python
import os, requests

call = {
    "source": "google_maps",
    "operation": "reviews/list",
    "options": {
        "place": "ChIJc_459AHr9EcRd0ALc7vrjcI",
    },
}
reviews = []
while call and len(reviews) < 25:
    r = requests.post(
        "https://api.lobstr.io/v2/run",
        headers={"Authorization": f"Bearer {os.environ['LOBSTR_API_KEY']}"},
        json=call,
    )
    r.raise_for_status()
    answer = r.json()
    reviews += answer["results"]
    call = answer["next"]
```

```js JavaScript
let call = {
  source: 'google_maps',
  operation: 'reviews/list',
  options: {
    place: 'ChIJc_459AHr9EcRd0ALc7vrjcI',
  },
}
const reviews = []
while (call && reviews.length < 25) {
  const r = await fetch('https://api.lobstr.io/v2/run', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.LOBSTR_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(call),
  })
  const answer = await r.json()
  if (!r.ok) throw new Error(answer.error.message)
  reviews.push(...answer.results)
  call = answer.next
}
```

</CodeGroup>

Stop when you have enough: each page is a call, at the operation's price. A page without records costs nothing.

## The cursor

`cursor` is opaque: it holds where the site's own paging stands, sealed. It only goes on with the search it came from: changed options answer [`invalid_cursor`](/errors#invalid_cursor). Leave it out to start again at the first page.

## With `limit`

`limit` trims the answer, not the page. With `"limit": 2`, a page of 10 reviews answers reviews 1 and 2, and `next` goes on at review 11.

## Operations without a next page

A get or a check answers one record. Some searches answer everything in one call, as Google News' 100 articles: their pages say so, and `next` is always `null`.
