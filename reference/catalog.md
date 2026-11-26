---
title: Catalog
description: Every operation and its contract, without a key.
---

## List the operations

<Route method="get" path="/v2/catalog" />

## Read an operation

<Route method="get" path="/v2/catalog/{source}/{resource}/{verb}" />

## Read how an operation's calls went

<Route method="get" path="/v2/catalog/{source}/{resource}/{verb}/status" />
