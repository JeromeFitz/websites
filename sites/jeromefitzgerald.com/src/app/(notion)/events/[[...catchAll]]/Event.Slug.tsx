/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import https from 'node:https'

import { Button, ButtonLink } from '@jeromefitz/ds/components/Button'
import {
  CalendarIcon,
  ClockIcon,
  ExternalLinkIcon,
  LocationMarkerIcon,
} from '@jeromefitz/ds/components/Icon'
import { Separator } from '@jeromefitz/ds/components/Separator'
import { cx } from '@jeromefitz/shared/src/utils/cx'
import { isObjectEmpty } from '@jeromefitz/utils'
// import { Client } from '@notionhq/client'
import { Redis } from '@upstash/redis'
import { slug as _slug } from 'github-slugger'
import { draftMode } from 'next/headers'
import NextImage from 'next/image'
import { notFound } from 'next/navigation'
import { isImageExpired } from 'next-notion/src/utils/getAwsImage'
import validUrl from 'valid-url'

import { CONSTANTS } from '~app/(notion)/(config)/constants'
// import { Image } from '~app/(notion)/(utils)/blocks/Image'
import type { PropertiesEvent } from '~app/(notion)/(config)/segments'
import {
  getEventData,
  getPropertyTypeDataEvent,
} from '~app/(notion)/(config)/segments'
import { getDataFromCache } from '~app/(notion)/(config)/utils'
import { Notion as Blocks } from '~components/Notion'
import { Relations } from '~components/Relations'
import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  SectionWrapper,
  Tags,
} from '~components/Section'

// @ts-ignore
import { Venue } from './Event.Slug.Venue'

const { DATABASE_ID } = CONSTANTS.EVENTS

// const notion = new Client({ auth: process.env.NOTION_API_KEY })

const redis = Redis.fromEnv({ agent: new https.Agent({ keepAlive: true }) })

const CACHE_KEY_PREFIX__IMAGE = `${process.env.NEXT_PUBLIC__SITE}/image`

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

async function Image({ properties }) {
  /**
   * Image Information
   */
  const imageSeoDescription = getPropertyTypeDataEvent(
    properties,
    'SEO.Image.Description'
  )
  const imageSeo = getPropertyTypeDataEvent(properties, 'SEO.Image')[0]
  // console.dir(`imageSeo:`)
  // console.dir(imageSeo)
  /**
   * @todo(next) this image piece should be abstracted out and return nothing if undefined
   */
  const imageUrl = !!imageSeo ? imageSeo[imageSeo.type].url : undefined
  // console.dir(`imageSeoDescription:`)
  // console.dir(imageSeoDescription)
  // console.dir(`imageUrl:`)
  // console.dir(imageUrl)

  let key = '',
    slugImage = ''

  if (imageUrl) {
    if (validUrl.isHttpsUri(imageUrl)) {
      slugImage = _slug(imageUrl.includes('?') ? imageUrl.split('?')[0] : imageUrl)
      key = `${CACHE_KEY_PREFIX__IMAGE}/${slugImage}`.toLowerCase()
    }
  }

  // console.dir(`key:`)
  // console.dir(key)
  // console.dir(`slugImage:`)
  // console.dir(slugImage)

  const cache: any = await redis.get(key)
  const isCached = !!cache && !isObjectEmpty(cache)
  let image = !!cache ? { ...cache } : {}

  // console.dir(`cache:`)
  // console.dir(cache)
  // console.dir(`isCached:`)
  // console.dir(isCached)
  // console.dir(`image:`)
  // console.dir(image)

  // @ts-ignore
  const isExpired = isImageExpired(image)
  if (!isCached && !!imageUrl) {
    const { getImage } = await import(
      '@jeromefitz/shared/src/lib/plaiceholder/getImage'
    )
    const imageData = await getImage(imageUrl)
    image.blurDataURL = imageData?.base64
    image = {
      alt: imageSeoDescription,
      ...image,
      ...imageData?.img,
    }
  }

  // console.dir(`isExpired:`)
  // console.dir(isExpired)
  // console.dir(`image:`)
  // console.dir(image)

  return (
    <>
      {!!imageUrl && (
        <>
          <Separator className={cx('my-4')} />
          <NextImage
            className="flex w-full justify-center"
            placeholder="blur"
            unoptimized={process.env.NODE_ENV !== 'production'}
            {...image}
          />
        </>
      )}
    </>
  )
}

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
    // @ts-ignore
    venues,
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
        ''
      )}
    >
      <div className="pl-5">
        <h4
          className={cx(
            'flex flex-row items-center justify-start gap-2 text-lg font-bold tracking-tight md:text-2xl'
          )}
        >
          <CalendarIcon className="h-5 w-5" />
          {dayOfWeek}, {monthName} {dayOfMonthOrdinal}
        </h4>
        <h5
          className={cx(
            'flex flex-row items-center justify-start gap-2 text-lg font-bold tracking-tight md:text-2xl'
          )}
        >
          <ClockIcon className="h-5 w-5" />
          {time} {timezone}
        </h5>
        <h6
          className={cx(
            'flex flex-row items-center justify-start gap-2 text-lg font-bold tracking-tight md:text-2xl'
          )}
        >
          <LocationMarkerIcon className="h-5 w-5" />
          {venueTitle}
        </h6>
      </div>
      <div className="mt-1 pt-1">
        {ticketUrl && !isEventOver ? (
          <ButtonLink
            className={cx(
              'pink-button-outline',
              'mx-0 w-full px-0 py-2 text-xl font-bold',
              'flex-row items-center justify-center gap-1'
            )}
            href={ticketUrl}
          >
            <>Buy Tickets</>
            <ExternalLinkIcon />
          </ButtonLink>
        ) : (
          <Button
            className={cx(
              'gray-button-outline',
              'mx-0 w-full px-0 py-2 text-xl font-bold',
              'flex-row items-center justify-center gap-1',
              'cursor-not-allowed'
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
