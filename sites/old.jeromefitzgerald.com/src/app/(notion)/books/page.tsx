import {
  BookmarkIcon as Bookmark,
  BookOpenIcon as BookOpen,
  CheckCircledIcon as CheckCircled,
  Pencil2Icon as PencilWithPaper,
} from '@jeromefitz/ds/components/Icon'
import type { Page } from '@jeromefitz/notion/schema'
import { cx } from '@jeromefitz/shared/src/utils'
import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import { Suspense } from 'react'

import { getDataCms, getMetadata } from '~app/(notion)/getMetadata'
import { Debug } from '~components/Debug'
// @todo(next) https://github.com/vercel/next.js/issues/46756
// import { Icon } from '@jeromefitz/ds/Icon'
import { PageHeading } from '~ui/PageHeading'
// import { log } from '~utils/log'

const ROUTE_TYPE = 'books'
// const DEBUG_KEY = `${ROUTE_TYPE}/page.tsx >> `

const getItemsByStatus = (data, status) => {
  return _filter(_orderBy(data, ['author', 'slug'], ['asc']), ['status', status])
}

const STATUS = {
  IN_PROGRESS: {
    id: 'IN_PROGRESS',
    emoji: '📚️',
    icon: <BookOpen />,
    slug: 'in-progress',
    title: 'In Progress',
  },
  COMPLETE: {
    id: 'COMPLETE',
    emoji: '🏁️',
    icon: <CheckCircled />,
    slug: 'complete',
    title: 'Complete',
  },
  PENDING: {
    id: 'PENDING',
    emoji: '🔜️',
    icon: <Bookmark />,
    slug: 'pending',
    title: 'Pending',
  },
}

export async function generateMetadata() {
  const catchAll = [ROUTE_TYPE]
  const data = await getDataCms(catchAll)
  const { metadata } = getMetadata({ catchAll, data })
  return metadata
}

export const preload = () => {
  const catchAll = [ROUTE_TYPE]
  void getDataCms(catchAll)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Page({ preview = false, ...props }) {
  const catchAll = [ROUTE_TYPE]
  const data = await getDataCms(catchAll)
  // const { content, images } = data
  const { pathVariables } = getMetadata({ catchAll, data })

  // const { items } = data
  // log(`${DEBUG_KEY} items`, items)

  const items = data?.items?.results.map(
    (item: {
      properties: {
        author: string
        isPublished: string
        slug: string
        status: string[]
        subtitle: string
        title: string
      }
    }) => {
      const {
        author,
        isPublished,
        slug,
        status: _status,
        subtitle,
        title,
      } = item?.properties
      const status = _status[Object.keys(_status)[0]].name

      return { author, isPublished, slug, status, subtitle, title }
    }
  )

  const itemsByStatus = _map(STATUS, (status) => {
    return {
      data: getItemsByStatus(items, status.title),
      ...status,
    }
  })

  return (
    <>
      {/* @note(next) Debug does not cause: deopted into client-side rendering */}
      {/* @todo(next) Debug could be Suspensed */}
      <Suspense>
        <Debug data={data} pathVariables={pathVariables} />
      </Suspense>
      <PageHeading overline={`books`} title={'Books'} />
      {/* @todo(remove) at some point in the next few weeks would be cool to remove this haha */}
      <div
        id="footer--construction-0"
        className={cx('my-4 w-full p-4', 'bg-radix-slate1 rounded', 'shadow')}
      >
        <h3
          className={cx('text-3xl font-black', 'flex flex-row items-center', 'my-2')}
        >
          <span className="mr-2">
            <PencilWithPaper className="h-6 w-6" />
          </span>
          <span>
            {` `}
            Please Note
          </span>
        </h3>
        <p className="mx-0 my-4 text-lg">Still working on this page.</p>
      </div>
      <div id="footer--construction-1" className={cx('my-4 w-full p-4')}>
        <h3
          className={cx('text-3xl font-black', 'flex flex-row items-center', 'my-2')}
        >
          <span className="mr-2">
            <BookOpen className="h-6 w-6" />
          </span>
          <span>
            {` `}
            Currently Reading
          </span>
        </h3>
        <p className="mx-0 my-4 text-lg">
          Trying to capture some of the books I want to read and help spur me on a
          bit here, heh.
        </p>
        {!!itemsByStatus &&
          _map(itemsByStatus, (type, typeIndex) => {
            return (
              <div key={`types-${typeIndex}`} className={cx('my-4', '')}>
                <h5 className={cx('my-4', 'text-xl font-bold')}>{type.title}</h5>
                <ul>
                  {_map(type.data, (item) => {
                    return (
                      <li
                        key={`item--${item?.slug}`}
                        className={cx('my-4 flex flex-col md:my-3')}
                      >
                        <span
                          className={cx(
                            'text-lg font-bold',
                            'before:-ml-1 before:content-[open-quote] md:before:-ml-2',
                            'after:content-[close-quote]'
                          )}
                        >
                          {item?.title}
                          {!!item?.subtitle && `: ${item?.subtitle}`}
                        </span>

                        <span className={cx('text-lg')}>{item?.author}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
      </div>
    </>
  )
}
