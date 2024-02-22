import { Anchor } from '@jeromefitz/ds/components/Anchor'
// import { MicrophoneIcon } from '@jeromefitz/ds/components/Icon'
import { Separator } from '@jeromefitz/ds/components/Separator'
import { cx } from '@jeromefitz/ds/utils/cx'
import { EmbedSpotify } from '@jeromefitz/shared/components/Notion/Blocks/Embed.Spotify'
import { getDataFromCache } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { PropertiesEpisode } from '@/app/(notion)/_config'

import { CONFIG, getEpisodeData } from '@/app/(notion)/_config'
import { Image } from '@/app/(notion)/events/[[...catchAll]]/_components/Image'
import { Grid } from '@/app/playground/2024/_components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
} from '@/app/playground/2024/_components/Headline'
import { Notion as Blocks } from '@/components/Notion'
import { Relations } from '@/components/Relations'
import { WIP } from '@/components/WIP/index'

const { DATABASE_ID } = CONFIG.EPISODES

type RELATIONS_TYPE = keyof PropertiesEpisode
const RELATIONS: RELATIONS_TYPE[] = [
  'Relation.People.Guest',
  'Relation.People.SoundEngineer',
  // 'Relation.People.Thanks',
  'Relation.Venues',
]
const RELATIONS_SECONDARY = [
  {
    from: 'episodes',
    relations: [
      'Relation.People.Host',
      'Relation.People.Producer',
      'Relation.People.Thanks',
    ],
    to: 'podcasts',
  },
]

const styleIndividual = cx(
  'inline-block text-base font-normal tracking-tight no-underline lg:text-xl',
  '',
)

function Rollups({ properties }) {
  const isPublished = false
  const style = cx(
    styleIndividual,
    isPublished && 'transition-all duration-200',
    isPublished && 'text-[var(--slate-12)] hover:text-[var(--accent-11)]',
  )

  const {
    dayOfMonthOrdinal,
    dayOfWeek,
    duration,
    episode,
    monthName,
    season,
    year,
    // ...props
  } = getEpisodeData(properties)
  // console.dir(props)

  const rollups = [
    // {
    //   id: 'Host',
    //   count: 2,
    //   items: hosts,
    // },
    { data: season, id: 'Season' },
    { data: episode, id: 'Episode' },
    {
      data: `${dayOfWeek}, ${monthName} ${dayOfMonthOrdinal}, ${year}`,
      id: 'Date',
    },
    {
      data: duration,
      id: 'Duration',
    },
  ]

  return (
    <>
      <div className="mb-4 grid w-full grid-cols-12 gap-x-4 gap-y-8">
        {rollups.map((rollup) => {
          const key = `rollup-${rollup.id}`
          return (
            <div className="col-span-6 lg:col-span-4" key={key}>
              <p className="pb-3 font-extrabold uppercase tracking-tight">
                <strong>{rollup.id}</strong>
              </p>
              <ul>
                <li className={'mb-2 lg:mb-0.5'}>
                  <span className={style}>{rollup.data}</span>
                </li>
              </ul>
            </div>
          )
        })}
      </div>
    </>
  )
}

function Links({ properties }) {
  const { href, podcastTitle, spotifyId } = getEpisodeData(properties)
  const [, segment, podcastSlug] = href.split('/')
  const podcastUrl = `/${segment}/${podcastSlug}`
  const spotifyUrl = `https://open.spotify.com/episode/${spotifyId}`
  const isPublished = true
  const style = cx(
    styleIndividual,
    isPublished && 'transition-all duration-200',
    // isPublished && 'text-[var(--slate-12)] hover:text-[var(--accent-11)]'
  )
  return (
    <>
      <div className="my-4 py-4">
        <div className="my-2 py-2">
          <p className="pb-3 font-extrabold uppercase tracking-tight">
            <strong>Listen</strong>
          </p>
          <p className={style}>
            <Anchor
              className={cx(
                style,
                'text-spotify-dark hover:text-spotify dark:text-spotify dark:hover:text-spotify-dark',
              )}
              href={spotifyUrl}
            >
              Spotify
            </Anchor>
          </p>
        </div>
        <div className="my-2 py-2">
          <p className="pb-3 font-extrabold uppercase tracking-tight">
            <strong>Preview</strong>
          </p>
          <EmbedSpotify id={spotifyId} />
        </div>
        <div className="my-2 py-2">
          <p className="pb-3 font-extrabold uppercase tracking-tight">
            <strong>Back to</strong>
          </p>
          <p className={style}>
            <Anchor className={cx(style)} href={podcastUrl}>
              {podcastTitle}
            </Anchor>
          </p>
        </div>
      </div>
    </>
  )
}

async function EpisodeSlug({ revalidate, segmentInfo }) {
  const { isEnabled } = draftMode()
  // console.dir(`EpisodeSlug: segmentInfo => draft: ${isEnabled ? 'y' : 'n'}`)
  // console.dir(segmentInfo)
  // console.dir(`... /podcasts/jer-and-ky-and-guest/danks-for-the-memories-beth-glick`)
  // console.dir(`!!! ${segmentInfo.slug}`)
  const data = await getDataFromCache({
    database_id: DATABASE_ID,
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo,
  })
  const is404 = isObjectEmpty(data?.blocks || {})
  if (is404) return notFound()

  const { properties }: { properties: PropertiesEpisode } = data?.page
  const { isPublished, title } = getEpisodeData(properties)

  if (!isPublished) return notFound()

  return (
    <>
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>{title}</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent>
          <WIP />
          <Image properties={properties} />
          <Blocks data={data?.blocks} />
          <Links properties={properties} />
        </HeadlineContent>
      </Grid>
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="p">
            <>Info</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent className="">
          <Separator className="mb-4 opacity-50" />
          <Rollups properties={properties} />
          <Relations
            properties={properties}
            relations={RELATIONS}
            relationsSecondary={RELATIONS_SECONDARY}
          />
        </HeadlineContent>
      </Grid>
    </>
  )
}

export { EpisodeSlug }
