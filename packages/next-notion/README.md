# next-notion

Customized wrapper for `@jeromefitz/notion` (which ... _takes a deep breath_ ... is a customized wrapper for `@notionhq/client`) for use with `next`.

- `@jeromefitz/notion` as a Skeleton where only the logic is provided.

Then one could use their own styling system via which Components they pass to `getContentNode`\*.

## Components

### Architecture

```sh
./src/app/
├─ components/
│  ├─ _unsupported_.tsx
│  ├─ bulleted_list_item.tsx
│  ├─ bulleted_list.tsx
│  ├─ callout.tsx
│  ├─ checkbox.tsx
│  ├─ column_list.tsx
│  ├─ column.tsx
│  ├─ date.tsx
│  ├─ files.tsx
│  ├─ heading_1.tsx
│  ├─ heading_2.tsx
│  ├─ heading_3.tsx
│  ├─ image.tsx
│  ├─ multi_select.tsx
│  ├─ numbered_list_item.tsx
│  ├─ numbered_list.tsx
│  ├─ paragraph.tsx
│  ├─ quote.tsx
│  ├─ relation.tsx
│  ├─ rich_text.tsx
│  ├─ title.tsx
│  ├─ to_do.tsx
│  ├─ toggle.tsx
│  ├─ url.tsx
├─ utils/
│  ├─ getContentNodes.tx
│  ├─ getContentType.tx
│  ├─ getContentTypeDetail.tsx
│  ├─ TextAnnotations.tsx
├─ ContentNodes.tsx
├─ index.ts
```

### ContentNodes

Receives `content` and `images` which comes from `@jeromefitz/notion`.

Cycles through each `node` via `getContentNodes` (=> `getContentType`) to determine:

- `ul`
- `ol`
- `*`

This is to wrap `li` (`bulleted_list_item|numbered_list_item`) accordingly.

Similiarly these components also cycle through `getContentNodes` for its `content`:

- `callout`
- `column_list` (=> `column`)
-
- `toggle` will cycle through its `content` for its children.

### getContentTypeDetail

For any `text` based component, this is called to get its attributions, to feed into `TextAnnotations`.

- `href`
- `plain_text`
- `annotations`

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

### Next.js

Cannot port these over until we can abstract away from `Next` in this component system.

Not sure how to do that just yet, maybe accept a Component for an `a|image` wrapper.

Though also, I am sensing a very opinionated theme throughout all of this, haha.

So maybe for now this only works with `Next` if we move it over early.

#### image

Currently tied to `next/future/image`

#### TextAnnotations

Currently tied to `next/link`

This is where we determine if the `Text` is a `Text` or `Link` and apply all annotations.

#### next/dynamic

This is used as the hash for `getContentNode`, which cannot currently get ported over.

Most likely the way to call these section of Components will be to create your own `getContentNode` as you would not want to load all of these if you do not have to and add your own logic to SSR only the first `X` components in the tree.

```tsx
const getContentNode = {
  _unsupported: dynamic(() => import('./components/_unsupported')),
  bulleted_list_item: dynamic(() => import('./components/bulleted_list_item')),
  bulleted_list: dynamic(() => import('./components/bulleted_list')),
  callout: dynamic(() => import('./components/callout')),
  checkbox: dynamic(() => import('./components/checkbox')),
  column_list: dynamic(() => import('./components/column_list')),
  column: dynamic(() => import('./components/column')),
  date: dynamic(() => import('./components/date')),
  divider: dynamic(() => import('./components/divider')),
  files: dynamic(() => import('./components/files')),
  heading_1: dynamic(() => import('./components/heading_1')),
  heading_2: dynamic(() => import('./components/heading_2')),
  heading_3: dynamic(() => import('./components/heading_3')),
  image: dynamic(() => import('./components/image')),
  multi_select: dynamic(() => import('./components/multi_select')),
  numbered_list_item: dynamic(() => import('./components/numbered_list_item')),
  numbered_list: dynamic(() => import('./components/numbered_list')),
  paragraph: dynamic(() => import('./components/paragraph')),
  quote: dynamic(() => import('./components/quote')),
  relation: dynamic(() => import('./components/relation')),
  rich_text: dynamic(() => import('./components/rich_text')),
  title: dynamic(() => import('./components/title')),
  to_do: dynamic(() => import('./components/to_do')),
  toggle: dynamic(() => import('./components/toggle')),
  url: dynamic(() => import('./components/url')),
}
```
