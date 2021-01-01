/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR from 'swr'
import cx from 'clsx'
// import { Blog, BlogItem } from '~lib/types'
import _map from 'lodash/map'
import _sortBy from 'lodash/sortBy'
import Link from 'next/link'
import { getNotionLink } from '~lib/notion/helpers'
import { textBlock } from '~lib/notion/helpers/renderers'

import SplitText from '~components/SplitText'

// const HOUR = 3600000
const MINUTE = 60000
// const SECOND = 1000

type Props = {
  // blog: Blog
  // blogs: Blog[]
  items: any
  routeData: any
}

const Listing = ({ items, routeData }: Props) => {
  const { data } = useSWR(`/api/notion/${routeData.relativeUrl}`, {
    initialData: items,
    refreshInterval: MINUTE,
    revalidateOnFocus: false,
  })

  const updatedBlogs = data.items || items

  const routeType = routeData.catchAll[0]

  let updatedBlogsNew = updatedBlogs
  // @todo(sort)
  if (routeType === 'shows') {
    updatedBlogsNew = _sortBy(updatedBlogs, [
      (item) => {
        return item.Slug
      },
    ])
  }

  return (
    <>
      {!!updatedBlogsNew && (
        <ul>
          {_map(updatedBlogsNew, (item: any, itemId) => {
            /**
             * Double-check Verification (NoIndex is fine)
             */
            // @todo(published)
            if (item.Published === 'No') {
              return true
            }
            // @todo(any)
            // let event: any, show: any, venue: any
            // // let key = item.Slug
            // @refactor(events) This was ported over, but got lost in shuffle
            // if (routeType === 'events') {
            //   event = item
            //   show = item.Shows && item.Shows[item.ShowIDs[0]]
            //   venue = item.Venues && item.Venues[item.VenueIDs[0]]
            // }

            let link
            if (item?.NextLink) {
              link = {
                as: item.NextLink.as,
                href: item.NextLink.href,
              }
            } else {
              link = {
                href: '/[...catchAll]',
                // routeType === 'events'
                //   ? `/${routeType}/[...catchAll]`
                //   : `/${routeType}/[slug]`,
                as: getNotionLink({
                  slug: item.Slug,
                  routeType,
                  itemDate: routeType === 'events' && item?.Date?.event,
                }),
              }
              // key = link.as
            }
            return (
              <li
                className={cx(
                  'text-2xl md:text-3xl font-semibold',
                  'leading-tight md:leading-tight',
                  'tracking-tight md:ltracking-tight',
                  'py-3 md:py-6'
                )}
                key={itemId}
              >
                <Link {...link}>
                  <a
                    className={cx(
                      'underline underline-thickness-md underline-offset-lg',
                      'hover:text-green-500 dark:hover:text-yellow-200'
                    )}
                    aria-label={item.Title}
                  >
                    <SplitText text={item.Title} />
                  </a>
                </Link>
                <p
                  className={cx(
                    'font-normal pt-2',
                    'text-base md:text-lg',
                    'leading-normal md:tracking-normal',
                    'tracking-normal md:tracking-normal'
                  )}
                >
                  {(!item.preview || item.preview.length === 0) &&
                    '[No Preview Content]'}
                  {(item.preview || []).map((block, idx) => {
                    // console.dir(`> item.preview debugging`)
                    // console.dir(block)
                    // @note(key) Technically, this does not _need_ a key since every
                    return textBlock({
                      parentKey: `${item.Slug}${idx}`,
                      pTagRender: false,
                      text: block,
                    })
                  })}
                </p>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default Listing
