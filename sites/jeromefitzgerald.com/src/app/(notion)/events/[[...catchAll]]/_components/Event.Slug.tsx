import { AnchorUnstyled as Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { Callout } from '@jeromefitz/ds/components/Callout/index'
import {
  CalendarIcon,
  ClockIcon,
  HomeIcon,
} from '@jeromefitz/ds/components/Icon/index'
import { Separator } from '@jeromefitz/ds/components/Separator/index'
import { getDataFromCache } from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { draftMode } from 'next/headers.js'
import { notFound } from 'next/navigation.js'

// import { Image } from '@/app/(notion)/(utils)/blocks/Image'
import type { PropertiesEvent } from '@/app/(notion)/_config/index'

import { CONFIG, getEventData } from '@/app/(notion)/_config/index'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
  HeadlineTitleText,
} from '@/components/Headline/index'
import { Notion as Blocks } from '@/components/Notion/index'
import { Relations } from '@/components/Relations/index'

import { Venue } from './Event.Slug.Venue'
import { Image } from './Image'

const { DATABASE_ID } = CONFIG.EVENTS

/**
 * @note(notion) Yea these "titles" are not really user friendly :X
 */
// type RELATIONS_TYPE = { key: keyof PropertiesEvent; title: string }
// const RELATIONS: RELATIONS_TYPE[] = [
//   { key: 'Relation.Shows.Primary', title: 'Primary' },
//   { key: 'Relation.Shows.Supporting', title: 'Supporting' },
//   { key: 'Relation.People.HouseManager', title: 'HouseManager' },
//   { key: 'Relation.People.Interns', title: 'Interns' },
//   { key: 'Relation.People.StageManager', title: 'StageManager' },
// ]
type RELATIONS_TYPE = keyof PropertiesEvent
const RELATIONS: RELATIONS_TYPE[] = [
  'Relation.Shows.Primary',
  'Relation.Shows.Supporting',
  'Relation.Shows.Music',
  'Relation.People.Guests',
  // 'Relation.People.HouseManager',
  // 'Relation.People.Interns',
  // 'Relation.People.StageManager',
]

const RELATIONS_SECONDARY = [
  {
    from: 'events',
    relations: [
      'Relation.People.Cast',
      'Relation.People.Director',
      'Relation.People.Director.Musical',
      'Relation.People.Director.Technical',
      'Relation.People.Music',
      'Relation.People.Producer',
      'Relation.People.Thanks',
      'Relation.People.Writer',
    ],
    to: 'people',
  },
]

function Ticket({ properties }) {
  const {
    // dateIso,
    dayOfMonthOrdinal,
    dayOfWeek,
    isEventOver,
    monthName,
    ticketUrl,
    time,
    timezone,
    venueTitle,
    venues,
  } = getEventData(properties)

  const disabledText = isEventOver ? 'Event Has Passed' : 'Tickets Available Soon'

  return (
    <>
      <Flex align="start" direction="column" width="100%">
        <Flex
          align="center"
          direction="row-reverse"
          gap="1"
          justify="end"
          width="100%"
          wrap="nowrap"
        >
          <Text size={{ initial: '2', lg: '3' }} weight="bold">
            {dayOfWeek}, {monthName} {dayOfMonthOrdinal}
          </Text>
          <CalendarIcon className="size-4 lg:size-5" />
        </Flex>
        <Flex
          align="center"
          direction="row-reverse"
          gap="1"
          justify="end"
          width="100%"
          wrap="nowrap"
        >
          <Text weight="bold">
            {time} {timezone}
          </Text>
          <ClockIcon className="size-4 lg:size-5" />
        </Flex>
        <Flex
          align="start"
          direction="row-reverse"
          gap="1"
          justify="end"
          width="100%"
          wrap="nowrap"
        >
          <Text weight="bold">
            {venueTitle}
            <Text as="span" weight="regular">
              <Venue id={venues[0]?.id} />
            </Text>
          </Text>
          <HomeIcon className="mt-[0.2rem] size-4 lg:mt-[0.125rem] lg:size-5" />
        </Flex>
      </Flex>

      <Flex align="center" justify="start" mt="1" width="100%">
        {ticketUrl && !isEventOver ? (
          <Button asChild variant="surface">
            <Anchor href={ticketUrl}>Buy Tickets</Anchor>
          </Button>
        ) : (
          <Button disabled={true}>
            <>{disabledText}</>
          </Button>
        )}
      </Flex>
    </>
  )
}

async function Slug({ revalidate, segmentInfo }) {
  const { isEnabled } = draftMode()
  // const { slug } = segmentInfo
  const data = await getDataFromCache({
    database_id: DATABASE_ID,
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo,
  })
  const noData = isObjectEmpty(data?.blocks || {})
  const is404 = noData

  // console.dir(`noData:           ${noData ? 'y' : 'n'}`)
  // console.dir(`is404:            ${is404 ? 'y' : 'n'}`)

  if (is404) return notFound()

  const { properties }: { properties: PropertiesEvent } = data?.page
  const { isPublished, tags, title } = getEventData(properties)

  // console.dir(`isPublished:      ${isPublished ? 'y' : 'n'}`)

  if (!isPublished) return notFound()

  return (
    <>
      <Grid>
        <HeadlineColumnA>
          <HeadlineTitleText
            aria-hidden={true}
            aria-label={title}
            className="hidden"
          >
            <>{title}</>
          </HeadlineTitleText>
          <HeadlineTitleSub>
            {tags.map(({ color, id, name }) => (
              <Badge color={color} key={id} size="2">
                <Code variant="ghost">{name}</Code>
              </Badge>
            ))}
            <Ticket properties={properties} />
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <Heading size={{ initial: '7', lg: '9' }}>{title}</Heading>
          <Separator className={'my-4'} />
          <Callout size="1" variant="outline" />
          <Separator className="my-4 opacity-50" />
          <Image properties={properties} />
          <Blocks data={data?.blocks} />
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

export { Slug }
