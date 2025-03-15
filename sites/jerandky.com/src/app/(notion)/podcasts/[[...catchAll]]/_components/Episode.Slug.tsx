import { Anchor } from '@jeromefitz/ds/components/Anchor'
// import { MicrophoneIcon } from '@jeromefitz/ds/components/Icon'
import {
  SectionContent,
  SectionHeader,
  // SectionHeaderContent,
  SectionHeaderTitle,
  // SectionHero,
  SectionWrapper,
  // Tags,
} from '@jeromefitz/ds/components/Section'
import { cx } from '@jeromefitz/ds/utils/cx'
import { EmbedSpotify } from '@jeromefitz/shared/components/Notion/Blocks/Embed.Spotify'
import { getDataFromCache } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
// import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { PropertiesEpisode } from '../../../_config'

import { Notion as Blocks } from '../../../../../components/Notion'
import { Relations } from '../../../../../components/Relations'
import { CONFIG, getEpisodeData } from '../../../_config'
import { Image } from './Image'

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
  'inline-block text-base font-normal tracking-tight no-underline md:text-xl',
  '',
)

async function EpisodeSlug({ revalidate, segmentInfo }) {
  const { isEnabled } = await draftMode()
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

  // eslint-disable-next-line no-unsafe-optional-chaining
  const { properties }: { properties: PropertiesEpisode } = data?.page
  const { isPublished, title } = getEpisodeData(properties)

  if (!isPublished) return notFound()

  return (
    <>
      {/* Hero */}
      {/* <SectionHero title={title} /> */}
      {/* Content */}
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <Image properties={properties} />
          <Separator my="4" orientation="horizontal" size="4" />
          <Blocks data={data?.blocks} />
          <Links properties={properties} />
        </SectionContent>
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle>Info</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <Rollups properties={properties} />
          <Relations
            properties={properties}
            relations={RELATIONS}
            relationsSecondary={RELATIONS_SECONDARY}
          />
        </SectionContent>
      </SectionWrapper>
      {/* <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle>Upcoming Episodes</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <UpcomingEpisodes properties={properties} />
        </SectionContent>
      </SectionWrapper> */}
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
    // isPublished && 'text-gray-12 hover:text-accent-11'
  )
  return (
    <>
      <Box className="my-4 py-4">
        <Box className="my-2 py-2">
          <Text className="pb-3 font-extrabold tracking-tight uppercase">
            <Strong>Listen</Strong>
          </Text>
          <Text className={style}>
            <Anchor
              className={cx(
                style,
                'text-spotify-dark hover:text-spotify dark:text-spotify dark:hover:text-spotify-dark',
              )}
              href={spotifyUrl}
            >
              Spotify
            </Anchor>
          </Text>
        </Box>
        <Box className="my-2 py-2">
          <Text className="pb-3 font-extrabold tracking-tight uppercase">
            <Strong>Preview</Strong>
          </Text>
          <EmbedSpotify id={spotifyId} />
        </Box>
        <Box className="my-2 py-2">
          <Text className="pb-3 font-extrabold tracking-tight uppercase">
            <Strong>Back to</Strong>
          </Text>
          <Text className={style}>
            <Anchor className={cx(style)} href={podcastUrl}>
              {podcastTitle}
            </Anchor>
          </Text>
        </Box>
      </Box>
    </>
  )
}

function Rollups({ properties }) {
  const isPublished = false
  const style = cx(
    styleIndividual,
    isPublished && 'transition-all duration-200',
    isPublished && 'hover:text-accent-11 text-gray-12',
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
      <Box className="mb-4 grid w-full grid-cols-12 gap-x-4 gap-y-8">
        {rollups.map((rollup) => {
          const key = `rollup-${rollup.id}`
          return (
            <Box className="col-span-6 md:col-span-4" key={key}>
              <Text className="pb-3 font-extrabold tracking-tight uppercase">
                <Strong>{rollup.id}</Strong>
              </Text>
              <ul>
                <li className={'mb-2 md:mb-0.5'}>
                  <Text className={style}>{rollup.data}</Text>
                </li>
              </ul>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

export { EpisodeSlug }
