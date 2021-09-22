import {
  ExternalLinkIcon,
  LibraryIcon,
  LinkIcon,
  LocationMarkerIcon,
  TicketIcon,
} from '@heroicons/react/solid'
import cx from 'clsx'
import _isBefore from 'date-fns/isBefore'
import _parseISO from 'date-fns/parseISO'
import { motion } from 'framer-motion'
import _map from 'lodash/map'
import { useState } from 'react'
import { useMount } from 'react-use'

// import Meta, { MetaTags } from '~components/Notion/Meta'
// import Meta from '~components/Notion/Meta'
// import Relations from '~components/Notion/Relations'
// import usePage from '~hooks/notion/usePage'
// import useRelation, { setRelation } from '~hooks/notion/useRelation'
import FacebookIcon from '~styles/icons/Facebook'
import TwitterIcon from '~styles/icons/Twitter'
import getTimestamp from '~utils/getTimestamp'
import { NotionBlock } from '~utils/notion'
import getContentType from '~utils/notion/getContentType'

// const relationsMap = ['shows', 'eventsLineupShowIds']
// // const relationsMap = ['eventsLineupShowIds']

const copy = {
  cta: {
    buyPast: 'Event Over',
    onSalePast: 'Event Has Passed',
    buyNow: 'Buy Now',
    onSaleNow: 'On Sale Now',
  },
  ticket: {
    cost: 15,
  },
  venue: {
    address: {
      city: 'Pittsburgh',
      lat: 40.4434627,
      lng: -79.9987216,
      neighborhood: 'Downtown',
      zipCode: 15222,
      street: '943 Liberty Ave.',
      state: {
        '2ca5af40-41c8-40fc-8967-051641bb1012': {
          id: '2ca5af40-41c8-40fc-8967-051641bb1012',
          name: 'PA',
          color: 'purple',
          slug: 'pa-1',
        },
      },
    },
    title: 'Arcade Comedy Theater',
    website: 'https://arcadecomedytheater.com',
  },
}

// const TagHidden ({ id }) => {
//   const { data: relations } = useRelation()
//     const { data, isError, isLoading } = usePage({ id })
//   if (isLoading || isError) return null
//   void setRelation(relations, data)
//   return null
// }

const Event = ({ data: dataEvent }) => {
  // console.dir(`Event:`)
  // const { data: relations } = useRelation()
  // console.dir(`relations`)
  // console.dir(relations)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mount, mountSet] = useState(false)
  useMount(() => {
    mountSet(true)
  })

  const { content, info } = dataEvent
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, data: properties } = info
  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    slug,
    title,
    date: { start: dateStart },
  } = properties

  const timestamp = getTimestamp(dateStart)
  const addressFormat = `${copy.venue.address.street}`

  const timestampNow = new Date().toISOString()
  const isEventPast = _isBefore(_parseISO(dateStart), _parseISO(timestampNow))

  const handleBuyClick = () => {
    // console.dir(`handleBuyClick`)
  }

  // console.dir(`Event: properties`)
  // console.dir(properties)

  /**
   * @tags
   */
  // const tagParams = `events=${info?.id}&shows=${info.data.shows.join(
  //   ','
  // )}&eventsLineupShowIds=${info.data.eventsLineupShowIds.join(',')}`

  return (
    <>
      {/* @hack(notion) */}
      {/* <MetaTags tagParams={tagParams} /> */}
      <div id="event--container" className={cx('w-11/12 md:w-full', 'my-4')}>
        <div id="event--header" className={cx('')}>
          <div id="event--header--content">
            <div id="event--header--content--date" className={cx('mb-4 text-xl')}>
              {timestamp.full}
            </div>
            <div
              id="event--header--content--title"
              className={cx('mb-4 text-3xl font-semibold md:truncate')}
            >
              <motion.h3 id="events--listing--title">{title}</motion.h3>
            </div>
            <div
              id="event--header--content--ticket-info"
              className={cx('mb-4 text-lg', isEventPast && 'hidden md:block')}
            >
              {isEventPast ? 'This event has passed.' : `$${copy.ticket.cost}.00`}
            </div>
          </div>
        </div>
        <div
          id="event--content"
          className={cx('flex flex-col', 'md:flex-row-reverse', 'transition-all')}
        >
          <div
            id="event--content--sidebar"
            className={cx(
              'flex flex-col md:flex-shrink-0 transition-all',
              'md:bg-yellow-400 md:dark:bg-yellow-300',
              'md:p-4 md:rounded-xl md:max-h-96 md:ml-2',
              'md:max-w-xs md:min-w-xs md:w-xs',
              'md:dark:text-black text-lg md:text-sm',
              'md:sticky md:top-24',
              isEventPast && 'hidden'
            )}
          >
            <div
              id="event--content--sidebar--cta"
              className={cx('flex flex-col items-center hidden md:flex')}
            >
              <button
                className={cx(
                  'rounded-md p-4 w-full shadow-md md:mt-4 transition-all',
                  isEventPast
                    ? 'cursor-not-allowed bg-gray-200 hover:bg-gray-200 text-black dark:text-black'
                    : 'bg-black hover:bg-gray-700 text-white'
                )}
                type="submit"
                disabled={isEventPast}
                onClick={() => handleBuyClick()}
              >
                {isEventPast ? copy.cta.buyPast : copy.cta.buyNow}
              </button>
              <p className="text-xs center flex justify-start place-content-center items-center md:dark:text-black">
                <span className={cx(isEventPast && 'line-through')}>
                  Ticket Purchase in New Window
                </span>
                <ExternalLinkIcon className="h-4 w-4 ml-2" />
              </p>
            </div>
            <div id="event--content--sidebar--meta" className={cx()}>
              <div
                id="event--content--sidebar--meta--status"
                className={cx(
                  'm-1 py-4 border-b border-solid border-black dark:border-white',
                  'flex flex-row justify-start place-content-center items-center'
                )}
              >
                <TicketIcon className="h-4 w-4 mr-2" />
                <span>{isEventPast ? copy.cta.onSalePast : copy.cta.onSaleNow}</span>
              </div>
              <div
                id="event--content--sidebar--meta--venue"
                className={cx(
                  'm-1 py-4 border-b border-solid border-black dark:border-white',
                  'flex flex-row justify-start place-content-center items-center'
                )}
              >
                <LibraryIcon className="h-4 w-4 mr-2" />
                <span>{copy.venue.title}</span>
              </div>
              <div
                id="event--content--sidebar--meta--venue-address"
                className={cx(
                  'm-1 py-4 border-b border-solid border-black dark:border-white',
                  'flex flex-row justify-start place-content-center items-center'
                )}
              >
                <LocationMarkerIcon className="h-4 w-4 mr-2" />
                <span>
                  {addressFormat}
                  <br />
                  {copy.venue.address.city}, PA{` `}
                  {copy.venue.address.zipCode}
                </span>
              </div>
              {/* <div
                    id="event--content--sidebar--meta--event-start"
                    className={cx('m-1 py-4 border-b border-solid border-black dark:border-white')}
                  >
                    {timestamp.event.hour}
                    {timestamp.event.ampm}
                  </div> */}
            </div>
            <div
              id="event--content--sidebar--social"
              className={cx('flex text-xs my-2 align-center items-center')}
            >
              <div
                id="event--content--sidebar--social--title"
                className={cx('flex flex-1 items-center pr-2')}
              >
                Share with friends
              </div>
              <div id="event--content--sidebar--social--link" className={cx('')}>
                <LinkIcon className="h-4 w-4 mx-2" />
              </div>
              <div id="event--content--sidebar--social--facebook" className={cx('')}>
                <FacebookIcon className="h-5 w-5 mx-2" />
              </div>
              <div id="event--content--sidebar--social--twitter" className={cx('')}>
                <TwitterIcon className="h-5 w-5 mx-2" />
              </div>
            </div>
            <div id="event--content--sidebar--policy"></div>
          </div>
          <div id="event--content--main">
            <div id="event--content--main--badges"></div>
            <div id="event--content--main--description">
              {_map(content.results, (contentItem: NotionBlock) =>
                getContentType(contentItem)
              )}
            </div>
            <div id="event--content--main--lineup"></div>
          </div>
        </div>
        <div id="event--related"></div>
        <div id="event--footer"></div>
      </div>
      {/* @hack(notion) */}
      {/* {!!relationsMap && (
        <>
          <h2 className="text-4xl">Information</h2>
          <div className="spacer--h mb-4" />
          <Relations
            id={id}
            isIndex={false}
            properties={properties}
            relationsMap={['shows', 'eventsLineupShowIds']}
            routeType={'events'}
            slug={slug}
          />
        </>
      )} */}
      <div
        id="event--content--mobile--cta"
        className={cx(
          'flex flex-col items-center p-4',
          // 'bg-gradient-to-b from-gray-700 via-gray-900 to-black',
          'bg-black dark:bg-white shadow shadow-lg',
          'md:hidden transition-all',
          isEventPast ? 'hidden' : 'sticky bottom-0'
        )}
      >
        <button
          className="rounded-md bg-white dark:bg-black hover:bg-gray-700 text-black dark:text-white p-4 w-full shadow-md md:mt-4 transition-all"
          type="submit"
          disabled={isEventPast}
        >
          {copy.cta.buyNow}
        </button>
        <p className="text-xs center text-white dark:text-black flex justify-start place-content-center items-center">
          <span>Ticket Purchase in New Window</span>
          <ExternalLinkIcon className="h-4 w-4 ml-2" />
        </p>
      </div>
    </>
  )
}

export default Event
