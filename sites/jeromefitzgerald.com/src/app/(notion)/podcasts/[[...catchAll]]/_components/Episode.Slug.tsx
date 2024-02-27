import { AnchorUnstyled as Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { Callout } from '@jeromefitz/ds/components/Callout/index'
import { Separator } from '@jeromefitz/ds/components/Separator/index'
import { cx } from '@jeromefitz/ds/utils/cx'
import { EmbedSpotify } from '@jeromefitz/shared/components/Notion/Blocks/Embed.Spotify'
import { getDataFromCache } from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Box, Flex, Grid as GridRadix, Link, Strong, Text } from '@radix-ui/themes'
import { draftMode } from 'next/headers.js'
import { notFound } from 'next/navigation.js'

import type { PropertiesEpisode } from '@/app/(notion)/_config/index'

import { CONFIG, getEpisodeData } from '@/app/(notion)/_config/index'
import { Image } from '@/app/(notion)/events/[[...catchAll]]/_components/Image'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
} from '@/components/Headline/index'
import { Notion as Blocks } from '@/components/Notion/index'
import { Relations } from '@/components/Relations/index'

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

function Rollups({ properties }) {
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
    <GridRadix columns="12" gapX="4" gapY="8" mb="4" width="100%">
      {rollups.map((rollup) => {
        const key = `rollup-${rollup.id}`
        return (
          <Box
            // className="col-span-6 lg:col-span-4"
            gridColumn={{ initial: 'span 6 / span 6', lg: 'span 4 / span 4' }}
            key={key}
          >
            <Text className="uppercase">
              <Strong>{rollup.id}</Strong>
            </Text>
            <ul>
              <Box asChild mb={{ initial: '2', lg: '1' }}>
                <li>
                  <Text as="span">{rollup.data}</Text>
                </li>
              </Box>
            </ul>
          </Box>
        )
      })}
    </GridRadix>
  )
}

function Links({ properties }) {
  const { href, podcastTitle, spotifyId } = getEpisodeData(properties)
  const [, segment, podcastSlug] = href.split('/')
  const podcastUrl = `/${segment}/${podcastSlug}`
  const spotifyUrl = `https://open.spotify.com/episode/${spotifyId}`

  return (
    <>
      <Box my="4" py="4">
        <Box my="2" py="2">
          <Text className="uppercase" weight="bold">
            <Strong>Listen</Strong>
          </Text>
          <Flex align="center" asChild>
            <Link asChild>
              <Anchor
                className={cx(
                  'text-spotify-dark hover:text-spotify dark:text-spotify dark:hover:text-spotify-dark',
                )}
                href={spotifyUrl}
              >
                Spotify
              </Anchor>
            </Link>
          </Flex>
        </Box>
        <Box my="2" py="2">
          <Text className="uppercase" weight="bold">
            <Strong>Preview</Strong>
          </Text>
          <EmbedSpotify id={spotifyId} />
        </Box>
        <Box my="2" py="2">
          <Text className="uppercase" weight="bold">
            <Strong>Back to</Strong>
          </Text>
          <Flex align="center" asChild>
            <Link asChild mt="3">
              <Anchor href={podcastUrl}>{podcastTitle}</Anchor>
            </Link>
          </Flex>
        </Box>
      </Box>
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
      <Grid>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>{title}</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent>
          <Callout size="1" variant="outline" />
          <Image properties={properties} />
          <Blocks data={data?.blocks} />
          <Links properties={properties} />
        </HeadlineContent>
      </Grid>
      <Grid>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h2">
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
