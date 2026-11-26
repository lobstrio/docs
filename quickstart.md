---
title: Quickstart
description: From your API key to your first answer, in a minute.
---

<Steps>
<Step title="Get your API key">

It is in the app, under [API](https://app.lobstr.io/dashboard/api). Keep it in an environment variable, never in your code:

```bash
export LOBSTR_API_KEY="your_api_key"
```

</Step>
<Step title="Run an operation">

One call, `POST /v2/run`, with the operation and its options. Here `google_maps/places/get`, one place on Google Maps by its name and city:

<CodeGroup>

```bash cURL
curl https://api.lobstr.io/v2/run \
  -H "Authorization: Bearer $LOBSTR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "google_maps",
    "operation": "places/get",
    "options": {
      "place": "Le Bouchon des Filles, Lyon"
    }
  }'
```

```python Python
import os, requests

r = requests.post(
    "https://api.lobstr.io/v2/run",
    headers={"Authorization": f"Bearer {os.environ['LOBSTR_API_KEY']}"},
    json={
        "source": "google_maps",
        "operation": "places/get",
        "options": {
            "place": "Le Bouchon des Filles, Lyon",
        },
    },
)
print(r.json()["results"][0]["name"])
```

```js JavaScript
const r = await fetch('https://api.lobstr.io/v2/run', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.LOBSTR_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    source: 'google_maps',
    operation: 'places/get',
    options: {
      place: 'Le Bouchon des Filles, Lyon',
    },
  }),
})
console.log((await r.json()).results[0].name)
```

</CodeGroup>

</Step>
<Step title="Read the answer">

The data is in the answer: no job to poll, no webhook to wait for. Shortened:

```json
{
  "object": "run",
  "id": "run_p4mhm5p5yff6hghsas6wqpwusa",
  "source": "google_maps",
  "operation": "places/get",
  "status": "succeeded",
  "count": 1,
  "has_more": false,
  "next": null,
  "cost": {
    "credits": 1
  },
  "duration_ms": 1652,
  "results": [
    {
      "object": "place",
      "name": "Le Bouchon des Filles",
      "phone": "+33478304044",
      "rating": {
        "value": 4.6,
        "scale": 5,
        "count": 2237
      }
    }
  ]
}
```

</Step>
</Steps>

<Tip>
A failed call is free, and so is a place that is not found: you pay for the data you get.
</Tip>
