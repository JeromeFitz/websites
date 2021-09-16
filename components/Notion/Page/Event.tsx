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
import _size from 'lodash/size'

import Meta from '~components/Notion/Meta'
import FacebookIcon from '~styles/icons/Facebook'
import TwitterIcon from '~styles/icons/Twitter'
import getTimestamp from '~utils/getTimestamp'
import { NotionBlock } from '~utils/notion'
import getContentType from '~utils/notion/getContentType'

const relationsMap = ['eventsLineupShowIds']

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

const Event = ({ data: dataEvent }) => {
  const { content, info } = dataEvent
  const { data, slug } = info
  const {
    title,
    date: { start: dateStart },
  } = data

  const timestamp = getTimestamp(dateStart)
  const addressFormat = `${copy.venue.address.street}`

  const timestampNow = new Date().toISOString()
  const isEventPast = _isBefore(_parseISO(dateStart), _parseISO(timestampNow))

  const handleBuyClick = () => {
    // console.dir(`handleBuyClick`)
  }

  return (
    <>
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
              <motion.h3 id="events--listing--title" layoutId="foo">
                {title}
              </motion.h3>
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
      {!!relationsMap && (
        <div
          id="container--people"
          className={cx('grid', 'grid-cols-2 gap-3', 'md:grid-cols-3 md:gap-4')}
        >
          {_map(relationsMap, (relationKey) => {
            const ids = data[relationKey]
            const idsSize = _size(ids)
            const swrKey = `${slug}--${relationKey}`
            if (idsSize === 0) {
              return null
            } else {
              return (
                <Meta
                  ids={ids}
                  key={`${slug}--${relationKey}--container`}
                  swrKey={`/${swrKey}`.toLowerCase()}
                  title={relationKey}
                />
              )
            }
          })}
        </div>
      )}
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
