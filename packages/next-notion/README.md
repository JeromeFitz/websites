# next-notion

> 📝 NOTE: This is a local version that is not published yet.
> Attempting to _not_ be `next` specific and more agnostic.
> This will attempt to map out current state and how a setup
> for use with `next` can work with `notion` and `@notionhq/client`.

References:

- [`@notionhq/client`](https://github.com/makenotion/notion-sdk-js): `^2.2.6`
- [`next`](https://github.com/vercel/next.js): `^13.4.9`

## Overview

`next` **Segments** `==` `notion` **Slug**

- **Segments** is the terminology used here to align with _Route Segment Config_ for Next App Dir
- **Slug** is the terminology used here to align with a custom `Property` for Notion

Both can be _whatever_ you want (if you set it up your own way) ideally you are consistent though. (As you will see, my `Notion` naming structure is a bit over-the-top.)
