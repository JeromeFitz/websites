'use client'
// import { Box, Flex, Grid, Heading, Paragraph, Text } from '@jeromefitz/design-system'
import { PROPERTIES } from '@jeromefitz/notion/constants'
import type { Show } from '@jeromefitz/notion/schema'
import getTitle from '@jeromefitz/notion/utils/getTitle'
import { cx } from '@jeromefitz/shared/src/utils'
import _map from 'lodash/map'
import _size from 'lodash/size'
// import _sortBy from 'lodash/sortBy'
import _startsWith from 'lodash/startsWith'
import { fetcher } from 'next-notion/src/lib/fetcher'
import pluralize from 'pluralize'
import useSWRImmutable from 'swr/immutable'

import { notionConfig } from '~config/index'
// import { log } from '~utils/log'

const { NOTION } = notionConfig

const rollupExclude = [
  // PROPERTIES.rollupEvents__People_Guest_Music.key,
  PROPERTIES.rollupEvents__People_Cast.key,
  PROPERTIES.rollupEvents__Shows.key,
  PROPERTIES.rollupEvents__Venues.key,
  PROPERTIES.rollupShows__People_Cast_Slug.key,
  PROPERTIES.rollupShows__Tags.key,
]
const rollupExcludeEvent = [PROPERTIES.rollupShows__People_Cast_Past.key]

const Meta = ({ data, isTitleHidden = false, routeType }) => {
  // log(`Meta > data`, data)
  // if (!data) return null
  const { id } = data?.info
  const properties = data?.info?.properties
  const rollupKeys: any[] = []
  _map(
    Object.keys(properties),
    (k: any) =>
      _startsWith(k, 'rollup') &&
      !rollupExclude.includes(k) &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [NOTION.EVENTS.routeType, NOTION.SHOWS.routeType].includes(routeType) &&
      !rollupExcludeEvent.includes(k) &&
      rollupKeys.push(k)
  )

  let size = 0
  _map(rollupKeys, (r) => (size = size + _size(properties[r])))

  if (size === 0) return null

  return (
    <>
      <div className="my-8">
        <p
          className={cx(
            isTitleHidden && 'hidden',
            'my-2 py-2',
            'md:my-6 md:py-6',
            'border-t-[1px] border-solid font-extrabold',
            'mauve-border',
            'text-2xl leading-tight',
            'md:text-4xl md:leading-tight'
          )}
        >
          Info
        </p>

        <div
          style={{
            '& ul': { listStyle: 'none', margin: '0', padding: '0' },
          }}
          className="m-auto grid grid-cols-6 gap-8"
        >
          {_map(rollupKeys, (rollupKey, rollupKeyIdx) => {
            const meta = properties[rollupKey]
            const metaSize = _size(meta)
            if (!meta || metaSize === 0 || rollupExclude.includes(rollupKey))
              return null

            const key = `${id}-rollupKey-${rollupKeyIdx}`

            return (
              <Rollup
                _key={key}
                data={properties}
                key={key}
                rollupKey={rollupKey}
                routeType={routeType}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Rollup = ({ _key, data, rollupKey, routeType }) => {
  const meta = data[rollupKey]
  const metaSize = _size(meta)
  const title = pluralize(getTitle(rollupKey), metaSize)

  return (
    <>
      <div
        className={cx(
          'col-span-3 mb-4 flex flex-col md:col-start-[span_2] md:mb-8'
          // metaSize > 4 ? 'md:col-start-[span_2]' : 'md:col-start-[span_1]'
        )}
      >
        <h4
          className={cx(
            'border-t-[1px] border-solid py-3 font-extrabold uppercase tracking-tight',
            // 'border-zinc-900 dark:border-zinc-50',
            'mauve-border'
          )}
        >
          {title}
        </h4>
        <ul>
          {_map(meta, (item, itemIdx) => {
            const keySub = `${_key}-${itemIdx}`
            // if (
            //   rollupKey === PROPERTIES.rollupEvents__People_Cast.key &&
            //   routeType === NOTION.EVENTS.routeType
            // ) {
            //   return <Cast data={data} key={keySub} />
            // }
            return (
              <li key={keySub} className="my-2 md:my-0.5">
                <p className="text-base font-normal tracking-tight md:text-xl">
                  {item}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

/**
 * @custom(notion) get the cast of the "first" show
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Cast = ({ data }) => {
  const { data: showData } = useSWRImmutable<Show>(
    [`/api/v1/cms/pages/${data?.relationEvents__Shows[0]}`],
    (url) => fetcher(url),
    {}
  )

  const cast = showData?.rollupShows__People_Cast
  if (!cast) return null

  return (
    <>
      {_map(cast, (item, itemIdx) => {
        return (
          <li key={`iiii-${itemIdx}`}>
            <p className="text-base font-normal md:text-xl">{item}</p>
          </li>
        )
      })}
    </>
  )
}

export { Meta }
