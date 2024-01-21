import { Button, ButtonLink } from '@jeromefitz/ds/components/Button'
import {
  CalendarIcon,
  ClockIcon,
  ExternalLinkIcon,
  HomeIcon,
} from '@jeromefitz/ds/components/Icon'
import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  SectionWrapper,
  Tags,
} from '@jeromefitz/ds/components/Section'
import { Separator } from '@jeromefitz/ds/components/Separator'
import { cx } from '@jeromefitz/ds/utils/cx'
import { getDataFromCache } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'
// @todo(next) esm
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { draftMode } from 'next/headers'
// @todo(next) esm
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { notFound } from 'next/navigation'

// import { Image } from '~app/(notion)/(utils)/blocks/Image'
import type { PropertiesEvent } from '~app/(notion)/_config'
import { getEventData, CONFIG } from '~app/(notion)/_config'
import { Notion as Blocks } from '~components/Notion'
import { Relations } from '~components/Relations'

// import { Venue } from './Event.Slug.Venue.js'
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
    to: 'people',
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
  },
]

function Ticket({ properties, isFakePortal = false }) {
  const {
    // dateIso,
    dayOfMonthOrdinal,
    dayOfWeek,
    isEventOver,
    monthName,
    time,
    timezone,
    ticketUrl,
    venueTitle,
    // venues,
  } = getEventData(properties)

  const disabledText = isEventOver ? 'Event Has Passed' : 'Tickets Available Soon'

  return (
    <div
      className={cx(
        isFakePortal
          ? 'visible inline md:invisible md:hidden'
          : 'invisible hidden md:visible md:inline',
        '[writing-mode:horizontal-tb]',
        'bg-radix-pinkA9 md:bg-inherit',
        'backdrop-blur-md md:backdrop-blur-none',
        'fixed md:relative',
        'bottom-0 md:bottom-auto',
        'left-0 md:left-auto',
        'w-screen md:w-auto',
        'text-center md:text-left',
        'z-50 md:z-0',
        'px-2 pb-1.5 pt-4 md:p-0',
        'rounded-t md:rounded-none',
        '',
      )}
    >
      <div className="pl-5">
        <p
          className={cx(
            'flex flex-row-reverse items-center justify-end gap-2 text-lg font-bold tracking-tight md:text-2xl',
          )}
        >
          <strong>
            {dayOfWeek}, {monthName} {dayOfMonthOrdinal}
          </strong>
          <CalendarIcon className="size-5" />
        </p>
        <p
          className={cx(
            'flex flex-row-reverse items-center justify-end gap-2 text-lg font-bold tracking-tight md:text-2xl',
          )}
        >
          <strong>
            {time} {timezone}
          </strong>
          <ClockIcon className="size-5" />
        </p>
        <p
          className={cx(
            'flex flex-row-reverse items-baseline justify-end gap-2 text-lg font-bold tracking-tight md:text-2xl',
          )}
        >
          <strong>{venueTitle}</strong>
          <HomeIcon className="relative top-[0.25rem] size-5 md:top-[0.125rem]" />
        </p>
      </div>
      <div className="mt-1 pt-1">
        {ticketUrl && !isEventOver ? (
          // @todo(types)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <ButtonLink
            className={cx(
              'pink-button-outline',
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
              'slate-button-outline',
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
      {/* Content */}
      <Ticket isFakePortal properties={properties} />
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
          <SectionHeaderContent>
            <Tags tags={tags} />
            <Separator className={'my-4'} />
            <Ticket properties={properties} />
          </SectionHeaderContent>
        </SectionHeader>
        <SectionContent>
          <Image properties={properties} />
          <Blocks data={data?.blocks} />
        </SectionContent>
      </SectionWrapper>
      {/* Info */}
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle>Info</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <Relations
            properties={properties}
            relations={RELATIONS}
            relationsSecondary={RELATIONS_SECONDARY}
          />
        </SectionContent>
      </SectionWrapper>
    </>
  )
}

export { Slug }
