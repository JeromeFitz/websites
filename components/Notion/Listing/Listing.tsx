import cx from 'clsx'
import _capitalize from 'lodash/capitalize'
import _map from 'lodash/map'
import NextLink from 'next/link'

import Link from '~components/Notion/Link'
import getTimestamp from '~utils/getTimestamp'
import getInfoType from '~utils/notion/getInfoType'

const Listing = ({ items, routeType }) => {
  return (
    <>
      {routeType !== 'events' && (
        <h5 className="text-3xl font-bold mt-2 pt-2 pb-2">
          {_capitalize(routeType)}
        </h5>
      )}

      {_map(items.results, (item, itemIndex) => {
        // const item = items.results[iIndex]
        if (item.data.slug === null || item.data.slug === undefined) {
          return null
        }

        const {
          date: { start: dateStart },
          seoDescription,
          title,
        } = item?.data
        const timestamp = getTimestamp(dateStart)
        // console.dir(`item`)
        // console.dir(item)
        // console.dir(`timestamp`)
        // console.dir(timestamp)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { as, date, href, slug } = getInfoType(item, routeType)

        if (routeType === 'events') {
          return (
            <>
              <div className="mt-12">
                <div
                  className={cx(
                    'flex flex-row',
                    'shadow-lg rounded-lg',
                    'md:shadow-xl md:rounded-xl'
                  )}
                >
                  <div
                    className={cx(
                      'block px-4 py-2 rounded-md',
                      'text-center',
                      'mr-3 max-h-16 w-16',
                      'md:mr-4 md:max-h-20 md:w-20',
                      'sticky top-28 md:top-24',
                      'bg-gray-800 dark:bg-gray-200',
                      'shadow-2xl'
                    )}
                  >
                    <time dateTime={item.data.date.start}>
                      <h5
                        className={cx(
                          'text-xs font-bold tracking-widest uppercase',
                          'text-gray-400 dark:text-gray-600',
                          'text-align-center'
                        )}
                      >
                        {timestamp.event.monthAbbreviation}
                      </h5>
                      <h1
                        className={cx(
                          'text-2xl md:text-3xl font-bold tracking-tighter',
                          'text-gray-200 dark:text-gray-800'
                        )}
                      >
                        {timestamp.event.date}
                      </h1>
                    </time>
                  </div>
                  <div className={cx('flex flex-col mb-20')}>
                    {/* <Link key={itemIndex} item={item} routeType={routeType} /> */}
                    <NextLink as={as} href={href}>
                      <a className={cx('cursor-pointer')}>
                        <>
                          <div
                            className={
                              cx()
                              // 'bg-inherit bg-white dark:bg-black',
                              // 'sticky top-24'
                            }
                          >
                            <h3 id="events--listing--title">{title}</h3>
                            <h4 id="events--listing--meta">
                              <span className="uppercase">
                                {timestamp.event.dayAbbreviation}{' '}
                              </span>
                              {timestamp.event.time}
                            </h4>
                          </div>
                          <p id="events--listing--info">
                            {!!seoDescription && (
                              <p className={cx('prose pb-2')}>{seoDescription}</p>
                            )}
                          </p>
                        </>
                      </a>
                    </NextLink>
                  </div>
                </div>
              </div>
            </>
          )
        } else {
          return (
            <>
              <Link key={itemIndex} item={item} routeType={routeType} />
            </>
          )
        }
      })}
    </>
  )
}
export default Listing
