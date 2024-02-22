import { Button, ButtonLink } from '@jeromefitz/ds/components/Button/index'
import {
  CalendarIcon,
  ClockIcon,
  ExternalLinkIcon,
  HomeIcon,
} from '@jeromefitz/ds/components/Icon/index'
import { Tags } from '@jeromefitz/ds/components/Section/index'
import { Separator } from '@jeromefitz/ds/components/Separator/index'
import { cx } from '@jeromefitz/ds/utils/cx'
import { getDataFromCache } from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Badge } from '@radix-ui/themes'
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
} from '@/components/Headline/index'
import { Notion as Blocks } from '@/components/Notion/index'
import { Relations } from '@/components/Relations/index'
import { WIP } from '@/components/WIP/index'

// import { Venue } from './Event.Slug.Venue'
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

function Ticket({ isFakePortal = false, properties }) {
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
    // venues,
  } = getEventData(properties)

  const disabledText = isEventOver ? 'Event Has Passed' : 'Tickets Available Soon'

  return (
    <div
      className={cx(
        isFakePortal
          ? 'visible inline lg:invisible lg:hidden'
          : 'invisible hidden lg:visible lg:inline',
        '[writing-mode:horizontal-tb]',
        'bg-[var(--accent-a9)] lg:bg-inherit',
        'backdrop-blur-md lg:backdrop-blur-none',
        'fixed lg:relative',
        'bottom-0 lg:bottom-auto',
        'left-0 lg:left-auto',
        'w-screen lg:w-auto',
        'text-center lg:text-left',
        'z-50 lg:z-0',
        'px-2 pb-1.5 pt-4 lg:p-0',
        'rounded-t lg:rounded-none',
        '',
      )}
    >
      <div className="pl-5">
        <p
          className={cx(
            'flex flex-row-reverse items-center justify-end gap-2 text-lg font-bold tracking-tight lg:text-2xl',
          )}
        >
          <strong>
            {dayOfWeek}, {monthName} {dayOfMonthOrdinal}
          </strong>
          <CalendarIcon className="size-5" />
        </p>
        <p
          className={cx(
            'flex flex-row-reverse items-center justify-end gap-2 text-lg font-bold tracking-tight lg:text-2xl',
          )}
        >
          <strong>
            {time} {timezone}
          </strong>
          <ClockIcon className="size-5" />
        </p>
        <p
          className={cx(
            'flex flex-row-reverse items-baseline justify-end gap-2 text-lg font-bold tracking-tight lg:text-2xl',
          )}
        >
          <strong>{venueTitle}</strong>
          <HomeIcon className="relative top-[0.25rem] size-5 lg:top-[0.125rem]" />
        </p>
      </div>
      <div className="mt-1 pt-1">
        {ticketUrl && !isEventOver ? (
          // @todo(types)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <ButtonLink
            className={cx(
              // @todo(radix-ui) get these custom classes back
              // 'pink-button-outline',
              'mx-0 w-full px-0 py-2 text-xl font-bold',
              'flex-row items-center justify-center gap-1',
            )}
            href={ticketUrl}
          >
            <>Buy Tickets</>
            <ExternalLinkIcon />
          </ButtonLink>
        ) : (
          <Button
            className={cx(
              // 'slate-button-outline',
              'mx-0 w-full px-0 py-2 text-xl font-bold',
              'flex-row items-center justify-center gap-1',
              'cursor-not-allowed',
            )}
            disabled={true}
          >
            <>{disabledText}</>
          </Button>
        )}
      </div>
    </div>
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
      <Ticket isFakePortal properties={properties} />
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>{title}</>
          </HeadlineTitle>
          <HeadlineTitleSub>
            {tags.map(({ color, id, name }) => (
              <Badge color={color} key={id} size="2">
                {name}
              </Badge>
            ))}
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <WIP />
          <Tags tags={tags} />
          <Separator className={'my-4'} />
          <Ticket properties={properties} />
          <Separator className="my-4 opacity-50" />
          <Image properties={properties} />
          <Blocks data={data?.blocks} />
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
