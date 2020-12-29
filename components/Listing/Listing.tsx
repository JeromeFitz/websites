import useSWR from 'swr'
import cx from 'clsx'
import { Blog, BlogItem } from '~lib/types'
import _map from 'lodash/map'
import Link from 'next/link'
import { getNotionLink } from '~lib/notion/helpers'

// const HOUR = 3600000
const MINUTE = 60000
// const SECOND = 1000

type Props = {
  // blog: Blog
  blogs: Blog[]
  params: any
  relativeUrl: string
}

const Listing = ({ items, ...rest }: Props) => {
  const { data } = useSWR(`/api/notion/${rest.relativeUrl}`, {
    initialData: items,
    refreshInterval: MINUTE,
    revalidateOnFocus: false,
  })

  // @refactor(data) ugh, why do we have double data now?
  const updatedBlogs = data.data || items
  // const updatedBlog = updatedBlogs.find((b: BlogItem) => b.id === blog.id) || blog

  const routeType = rest.params.catchAll[0]

  return (
    <>
      {!!updatedBlogs && (
        <ul>
          {_map(updatedBlogs, (item: BlogItem, itemId) => {
            /**
             * Double-check Verification (NoIndex is fine)
             */
            // @todo(published)
            if (item.Published === 'No') {
              return true
            }
            let event, show, venue
            let key = item.Slug
            if (routeType === 'events') {
              event = item
              show = item.Shows && item.Shows[item.ShowIDs[0]]
              venue = item.Venues && item.Venues[item.VenueIDs[0]]
            }

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
              key = link.as
            }
            return (
              <li className={cx('text-black dark:text-white')} key={itemId}>
                <Link {...link}>{item.Title}</Link>
              </li>
            )
          })}
          )
        </ul>
      )}
    </>
  )
}

export default Listing
