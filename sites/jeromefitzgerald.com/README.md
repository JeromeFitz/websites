# jeromefitzgerald.com

This website utilizes `notion` as its CMS, and its intent is to keep up-to-date with `next|react` and for me to proof of concept toolings and ideas.

Oh, and to get people to come to comedy shows. 🤣️

## Highlights

Further breakdown from the root `README`:

- **CMS**: Notion w/ [`@jeromefitz/notion`](https://github.com/JeromeFitz/packages/tree/main/packages/notion)
- **Design System**: [`@jeromefitz/design-system`](https://github.com/JeromeFitz/packages/tree/main/packages/design-system)
  - `radix-ui`
  - `tailwind`
- **Analytics**: [Fathom](https://usefathom.com/ref/GKTEFP)
  - Note: Referral Link
- **Packages**:
  - `date-fns`
  - `cmdk`
  - `lodash`
  - `next-themes`
  - `plaiceholder`
  - `swr`
  - `>` “...and more!”

## Configuration

For `v13` this has moved away from one giant `json` configuration (or multiple self-referencing ones) into smaller bite sized portions.

To hook up `notion` we have moved to **environment variables**:

- Check out `env-required` in `next-config`
- Note: Will be _moving away_ from this most likely for multi-site 😑
  - With proper API Permissions via `notion` you are good to go with public
  - At one point was thinking of DEV/PROD variations but that is --- TOO MUCH!

### Segments

#### Notion

By relying on **formulas** within `notion` it is possible to greatly reduce the query logic that was in prior versions.

- `Slug.Preview`: Create Formula to mimic segment (route) in `next` within `notion`
  - Use this property as the basis for any [[...catchAll]]
    - This removes the need for a complicated `Blog|Event` Date Search
    - Also removes the need for a `Slug` and `RouteType` Match Sequence
    - Create `Slug` as you would before, then customize what type it is in `Slug.Preview` and call `Slug.Preview` in your `@notionhq/client` query
- Handle `Date` formatting at `notion` level not `next`
  - `Date.DayOfMonth`
  - `Date.DayOfMonthOrdinal`
  - `Date.DayOfWeek`
  - `Date.DayOfWeekAbbr`
  - `Date.DaysUntilEvent`
  - `Date.HoursUntilEvent`
  - `Date.ISO`
  - `Date.Month`
  - `Date.MonthName`
  - `Date.MonthNameAbbr`
  - `Date.Time`
  - `Date.Timezone`
  - `Date.WeekNumber`
  - `Date.Year`
- Add `ID` Formula to have direct knowledge within `properties` of a return query without any finagling

#### Next

For each `next` segment (routing) there is a comparable `notion` database.

- `[Notion-DB].constants.ts`: Outlines variables needed by `next` to query `notion`
  - `DATABASE_ID`: The `notion` DB you want to query
  - `SEGMENT`: The `next` segment you want to utilize
- `[Notion-DB].types.ts`: Outlines what fields are available to `next` via `notion`
  - Set up your own type checking via `@notionhq/client`
  - Instead of it being hard-coded as before, you can create your own.
  - This is manual (unlike before), but more configurable (unlike before)

##### Example

**Events:**

Configuration for segments (routes): `/blog` && `/blog/[...]`

- `./app/(notion)/blog/[[...catchAll]]/Blog.constants.ts`
- `./app/(notion)/blog/[[...catchAll]]/Blog.types.ts`

## `next-notion`

This is still being figured out and/or `@jeromefitz/notion`. For `v13` init this is housed within `sites/jeromefitzgerald.com` in `./src/app/(notion)/(utils)` until it can be refactored away:

### Blocks

Components for a `1:1` coming from `notion` into `react`. Can pass custom styling to these (most are unstyled, or are going to be).

Identified in: `./Notion.Blocks.ts`

- [x] Callout
- [x] Column
- [x] ColumnList
- [x] Divider
- [x] Embed
- [x] Embed.Twitter (uh... heh)
- [x] Heading
  - Assumes you have a `h1` elsewhere (Site Heading)
  - `@todo` make this configurable?
  - [x] Heading1 => `h2`
  - [x] Heading2 => `h3`
  - [x] Heading3 => `h4`
- [x] Link
- [x] ListBulleted
- [x] ListItem
- [x] ListNumbered
- [x] Paragraph
- [x] Quote
- [x] Video
- [x] Video.YouTube

**Custom:**

- [x] Emoji: Pass text and determine if `a11y` assistance can be applied
- [x] Image
  - [x] Alt Text: Custom Query to pull **first** comment as the `a11y` text from `notion`
  - [x] Caption: Handle formatting through `TextAnnotions` Component
  - [x] Expiration: Image hosted by `notion`? Determine if need to re-request
  - [x] Plaiceholder: Get image optimizations (blurData, height, width, etc.)
- [x] TextAnnotations: Pass text and determine what `annotations` need to be applied

### Setup

### Queries

Light wrapper around `@notionhq/client`

Custom Callouts:

- `getDatabaseQuery`: This is where we pass `Slug.Preview` to query `notion`
  - Perhaps we can change this to be dynamic as to what you _want_ to call your field
- `getColumnData`: Create logic for HTML rendering
- `

### Utils

#### `getPropertyTypeData`

Moved to `next-notion`

You pass a typed `notion` field it does the lift to get it into a more digestible format.

**Note:** Goal is to keep `getPropertyTypeData` and move the data you want back to be custom to you via `[Notion-DB].utils.ts`

- If we can align on what we expect from `notion` based on its API Type
- Then you can control how you want the return data key'ed back
  - Though ideally -- the less custom the better or you need to re-type
    - `notion` how are fields named?
    - `next` how does `react` churn it out?
    - A bit much right now

### Cache

Types of cache to make a distinction about:

- Redis KV
- Next Build + Deduplication
- React Cache

During building of this it used to be important to not hit `notion` about 1,000 times a second. But the refactor has limited the calls tremendously along with the deduplication of requests.

You _most likely_ do not need a fail-safe Redis KV and can do all of this on the fly with `RSC`. So will want to show how you can do that soon(ish).

#### `getCustom`

Lol, I see it is still called `getCustom`. Nice. Well, yes, need to name this better and then find a way to bypass it if you do not want.

- `getKey`: Based on `segmentInfo` what should the key be
- `getCache`: Pass `key` get `data`
- `setCache`: Pass `key` set `data`
- `getCustom`: Should _not_ need this long-term but it does some customizations still about creating SEO information and more
  - Ideally this was handled in `[Notion-DB].utils`, consider roadmap

`OVERRIDE_CACHE` is an environment variable to skip `getCache` and force `setCache`.

## Disclaimer

Let’s get this out of the way: Most everything written here could be vastly improved upon. 🥳️

- There is a lot of `lodash` (which I use because I have not commited every thing about `arrays|hashes|objects` to my memory, heh)
- There is a lot `any` w/ TS (you will see a lot of `@todo(types)`, they will come with time [or not])
- I think there is a MIT on this, but truly do whatever you want I will get that altered. Right now looking at `UNLICENSE`
