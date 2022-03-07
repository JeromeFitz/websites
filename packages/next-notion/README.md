# next-notion

Customized wrapper for `@jeromefitz/notion` (which ... _takes a deep breath_ ... is a customized wrapper for `@notionhq/client`) for use with `next`.

## Routing

Access to functions for use within `index|...catchAll`:

- `getStaticPathsCatchAll`
- `getStaticPropsCatchAll`

### `getStaticPropsCatchAll`

Requires the following options to be passed:

- `catchAll`: `next` `prop.params` used to generate `pathVariables`
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
