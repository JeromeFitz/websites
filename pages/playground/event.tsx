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
// import Image from 'next/image'
import useSWR from 'swr'

import Layout from '~components/Layout'
import Meta from '~components/Notion/Meta'
// import Title from '~components/Notion/Title'
import { MOTION_PAGE_VARIANTS } from '~lib/constants'
import fetcher from '~lib/fetcher'
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

const Event = () => {
  const { data: dataEvent, error } = useSWR(
    () => `/api/notion/events/2020/05/09/jerome-and`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  )
  const isError = error
  const isLoading = !error && !dataEvent

  if (isError || isLoading) {
    return <h1>Loading...</h1>
  }

  console.dir(dataEvent)

  const { content, info } = dataEvent
  const { data, id, slug } = info
  const {
    title,
    date: { start: dateStart },
  } = data

  const timestamp = getTimestamp(dateStart)
  const addressFormat = `${copy.venue.address.street}`

  const timestampNow = new Date().toISOString()
  const isEventPast = _isBefore(_parseISO(dateStart), _parseISO(timestampNow))

  const handleBuyClick = () => {
    console.dir(`handleBuyClick`)
  }

  return (
    <>
      <Layout>
        {/* <Title emoji={``} id={id} title={title} /> */}
        <motion.div
          key={id}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={MOTION_PAGE_VARIANTS}
          transition={{ delay: 0.25, duration: 1, type: 'linear' }}
          className={cx('flex flex-col')}
        >
          <div id="event--container" className={cx('w-11/12 md:w-full', 'my-4')}>
            <div id="event--header" className={cx('')}>
              <div id="event--header--content">
                <div
                  id="event--header--content--date"
                  className={cx('mb-4 text-xl')}
                >
                  {timestamp.full}
                </div>
                <div
                  id="event--header--content--title"
                  className={cx('mb-4 text-3xl font-semibold md:truncate')}
                >
                  {title}
                </div>
                <div
                  id="event--header--content--ticket-info"
                  className={cx('mb-4 text-lg', isEventPast && 'hidden md:block')}
                >
                  {isEventPast
                    ? 'This event has passed.'
                    : `$${copy.ticket.cost}.00`}
                </div>
              </div>
            </div>
            <div
              id="event--content"
              className={cx(
                'flex flex-col',
                'md:flex-row-reverse',
                'transition-all'
              )}
            >
              <div
                id="event--content--sidebar"
                className={cx(
                  'flex flex-col md:flex-shrink-0 transition-all',
                  'md:bg-yellow-400 md:dark:bg-yellow-300',
                  'md:p-4 md:rounded-xl md:max-h-96 md:ml-2',
                  'md:max-w-xs md:min-w-xs md:w-xs',
                  'md:dark:text-black text-lg md:text-sm',
                  'md:sticky md:top-24'
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
                <div id="event--content--sidebar--meta">
                  <div
                    id="event--content--sidebar--meta--status"
                    className={cx(
                      'm-1 py-4 border-b border-solid border-black dark:border-white',
                      'flex flex-row justify-start place-content-center items-center'
                    )}
                  >
                    <TicketIcon className="h-4 w-4 mr-2" />
                    <span>
                      {isEventPast ? copy.cta.onSalePast : copy.cta.onSaleNow}
                    </span>
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
                  <div
                    id="event--content--sidebar--social--facebook"
                    className={cx('')}
                  >
                    <FacebookIcon className="h-5 w-5 mx-2" />
                  </div>
                  <div
                    id="event--content--sidebar--social--twitter"
                    className={cx('')}
                  >
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
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-12 sm:gap-x-8 md:py-16">
            <div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
              <p className="text-sm font-medium text-white sm:mb-1 sm:text-gray-500">
                Entire house
              </p>
              <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">
                Beach House in Collingwood
              </h2>
            </div>
            <div className="col-start-1 row-start-2 px-4 sm:pb-16">
              <div className="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="text-violet-600"
                >
                  <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
                </svg>
                <div className="ml-1">
                  <span className="text-black">4.94</span>
                  <span className="sm:hidden md:inline">(128)</span>
                </div>
                <div className="text-base font-normal mx-2">·</div>
                <div>Collingwood, Ontario</div>
              </div>
              <hr className="w-16 border-gray-300 hidden sm:block" />
            </div>
            <div className="col-start-1 row-start-3 space-y-3 px-4">
              <p className="flex items-center text-black text-sm font-medium">
                <img
                  src="https://tailwindcss.com/_next/static/media/kevin-francis.c9970f19128315df0cfda2b4f54eb981.jpg"
                  alt=""
                  className="w-6 h-6 rounded-full mr-2 bg-gray-100"
                />
                Hosted by Kevin Francis
              </p>
              <button
                type="button"
                className="bg-violet-100 text-violet-700 text-base font-semibold px-6 py-2 rounded-lg"
              >
                Check availability
              </button>
            </div>
            <div className="col-start-1 row-start-1 flex sm:col-start-2 sm:row-span-3">
              <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
                <div className="relative col-span-3 row-span-2 md:col-span-2">
                  <img
                    src="https://tailwindcss.com/_next/static/media/beach-house.dc0f86781422bcb8f89e64d49cd7adf6.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg"
                  />
                </div>
                <div className="relative hidden md:block">
                  <img
                    src="https://tailwindcss.com/_next/static/media/beach-house-interior.13945f821153afd28151b5dac3e5d713.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100"
                  />
                </div>
                <div className="relative hidden md:block">
                  <img
                    src="https://tailwindcss.com/_next/static/media/beach-house-view.bf6f10434bf4589aebba4d3c33834cc2.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div> */}
        </motion.div>
      </Layout>
    </>
  )
}

export default Event
