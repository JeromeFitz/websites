# jeromefitzgerald.com

This website utilizes Notion as its CMS, and its intent is to keep up-to-date with React and for me to proof of concept toolings and ideas.

Oh, and to get people to come to comedy shows. 🤣️

## Highlights

Further breakdown from the root `README`:

- **CMS**: Notion w/ [`@jeromefitz/notion`](https://github.com/JeromeFitz/packages/tree/main/packages/notion)
- **Design System**: [`@jeromefitz/design-system`](https://github.com/JeromeFitz/packages/tree/main/packages/design-system)
  - `radix-ui`
  - `tailwind`
- **Analytics**: [Fathom](https://usefathom.com/ref/GKTEFP)
  - Note: This is a referral code.
- **Packages**:
  - `date-fns`
  - `cmdk`
  - `lodash`
  - `next-sitemap`
  - `next-themes`
  - `plaiceholder`
  - `swr`
  - `>` “...and more!”

## Configuration

Ideally, this would be a more direct configuration `json` or root file. For now, it is not.

```sh
.
└── ./src/config/
    ├── index.ts
    ├── navigation.tsx
    ├── notion.ts
    └── seo.ts
```

### Navigation

`./src/config/navigation.tsx`

Kind of 🤮️ 🤮️ 🤮️ at the moment, haha.

This is doing too much and is attempting to set up three modes of navigation (with links, toggles, icons, ...):

- `kbar` aka Command Center Navigation (not available on Mobile)
  - In process of design refactor with potential for Mobile use
- `mobile` which is a Sheet Component for Mobile Devices
- `desktop` which is a Dropdown Menu for non-Mobile Devices
  - In process of moving to new Navigation Menu

### Notion

`./src/config/notion.ts`

This is probably why you are here. I am still in the midst of organizing the documentation for `@jeromefitz/notion` and `next-notion` which is a Notion API Wrapper that assists with Route Management within `next`.

The eventual export is:

```tsx
export { NOTION, PAGES__HOMEPAGE, PAGES }
```

We get there through:

- `PAGES__HOMEPAGE`: Currently need to hard-code the `slug` for the hompage of your app
- `PAGES`: Currently need to hard-code which `PAGES` you want `@jeromefitz/notion` to query against when generating SSG via `next`
  - A `PAGE` in this parlance is a route-type like `website.com/[this-path]`
- `NOTION`: This holds all of your Notion Database Connection Information and is the setup you need to do to interface with `@jeromefitz/notion`. For each Database Type (Notion) aka Route Type (Next):
  - `active`:
  - `database_id`: Notion UUID
  - `dataTypes`: `'LISTING' | 'LISTING_BY_DATE' | 'SLUG' | 'SLUG_BY_ROUTE'`
  - `hasChild`: Does this route have a route underneath it? `PODCASTS => EPISODES`
  - `infoType`: Is there a specific field that informs what type this is for Notion Querying purposes? (`EVENTS => dateEvent`, `BLOG => datePublished`)
  - `isChild`: Is this route a Child? If so share its Parent here: `EPISODES => PODCASTS`
  - `isChildInfoType`: Is this route a Child? If so share specific field that informs where we should get its Parent slug for `getStaticPaths` (`EPISODES -> PROPERTIES.rollupEpisodes__PodcastsSlugs`)
  - `name`
  - `page_id__seo`: Notion Page UUID from specific Data Item from `SEO` Database
  - `routeMeta`: Does the `next` route contain meta that is useful to Notion? (`blog|events|podcasts`)
  - `routeType`: What is the `routeType` called in `next` (`/shows`)
  - `slug`: Very similar to `routeType`, this matches the `slug` or `Slug` in Notion. (Please note: This _does not_ attempt to discern `slugs` from Notion Titles, this is a specific field you set in Notion.)
  - `ttl`: How long should the cache be set for (`tbd: right now everything is 30d`)

This is still being finalized and cleaned up. Like, why have `hasChild` and `isChild`? Well ... moving to `isChild` identified a pretty intense `hasChild` section that I do not want to refactor right now, haha.

Would be good to introduce dynamic generation of this if possible. There are kind of two modes to this:

1. New Notion Sites with Next
2. Existing Notion Sites with Next

The former you can use to generate and get all the `UUIDs` in an instant, the latter you have to do some manual setup.

This was available in the earliest rendition of all of this pre-Notion API.

#### Localized Functions

Through [`next-notion`](../../packages/next-notion/README.md) we have:

- `getStaticPropsCatchAll`
- `getStaticPathsCatchAll`
- `getPodcastFeed`

“Documentation” lies with [`next-notion`](../../packages/next-notion/README.md)

#### Interfaces With

- `notion.custom.getInfoType`: Assist function to generate links for `next` routing strategy

## Disclaimer

Let’s get this out of the way: Most everything written here could be vastly improved upon. 🥳️

- There is a lot of `lodash` (which I use because I have not commited every thing about `arrays|hashes|objects` to my memory, heh)
- There is a lot `any` w/ TS (you will see a lot of `@todo(types)`, they will come with time [or not])
- I think there is a MIT on this, but truly do whatever you want I will get that altered. Right now looking at `UNLICENSE`
