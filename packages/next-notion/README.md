# next-notion

Customized wrapper for `@jeromefitz/notion` (which ... _takes a deep breath_ ... is a customized wrapper for `@notionhq/client`) for use with `next`.

## Routing

Access to functions for use within `index|...catchAll`:

- `getStaticPropsCatchAll`
- `getStaticPathsCatchAll`

### `getStaticPropsCatchAll`

Requires the following options to be passed:

- `catchAll`: `next` `prop.params` used to generate `pathVariables` (via `notion.custom.getPathVariables`)
- `notionConfig`: Notion configuration file
- `preview`: `next` value for CMS preview functionality

Be sure to pass your Notion Configuration file as `notionConfig`:

```tsx
import { notionConfig } from '../your/notion/configuration/file/here'

// ...

export const getStaticProps = async ({ preview = false, ...props }) => {
  const { catchAll } = props.params

  const { data, pathVariables } = await getStaticPropsCatchAll({
    catchAll,
    notionConfig,
    preview,
  })

  return {
    props: { preview, ...props, ...data, ...pathVariables },
  }
}
```

**Note:** for `index` file(s), you can manually set the `catchAll` prop to inform the Notion Query what shoudl be returned for its index.

```tsx
const catchAll = ['custom-catch-all-prop-here']
```

### `getStaticPathsCatchAll`

```tsx
import { notionConfig } from '../your/notion/configuration/file/here'

// ...

export const getStaticPaths = () => {
  return getStaticPathsCatchAll(notionConfig)
}
```

### Interfaces With

- `notion.custom.getPathVariables`: Assist function to determine the query structure based on `next` routing to get content from

### Caching

Two forms of caching at the moment:

- `json`: Localized generated during build
  - Note: This is good for `development` use.
- `redis`: Edge Key Value Storage via `Upstash`

#### Images

When uploading images to Amazon S3, remember to add:

- `Cache-Control: max-age=18144000, s-maxage=18144000`

This allows `next` to pass-through the cache for images on other CDNs.
