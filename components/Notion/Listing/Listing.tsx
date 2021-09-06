// import { useState } from 'react'
import _map from 'lodash/map'
import _sortBy from 'lodash/sortBy'
import useSWR from 'swr'

import useCast, { key, setCast } from '~hooks/people/useCast'
import fetcher from '~lib/fetcher'

const ListItem = ({ id, slug }) => {
  // console.dir(`id: ${id}`)
  // console.dir(`slug: ${slug}`)
  const { data: cast } = useCast({ slug })
  const { data, error } = useSWR(() => `/api/notion/pages/${id}`, fetcher, {
    revalidateOnFocus: true,
  })
  /**
   * @error or @loading
   */
  if (error || !data || data?.parent === undefined || data?.properties === undefined)
    return null
  // console.dir(data)

  // const { properties } = data
  void setCast(`${slug}-${key}`, cast, data)
  // const title = properties['Title'].title[0].plain_text
  // console.dir(`title: ${title}`)

  return null
}

const Listing = ({ items, slug }) => {
  const { data: cast } = useCast({ slug })
  // console.dir(`items`)
  // console.dir(items)
  // console.dir(`slug`)
  // console.dir(slug)
  const cast2 = _sortBy(cast, (c: any) => c.url)

  return (
    <>
      {items.map(
        (item) => !!item && <ListItem key={item.id} id={item.id} slug={slug} />
      )}
      <h5>Cast:</h5>
      <ul className="flex flex-col">
        {_map(cast2, (c: any) => {
          const { properties } = c
          const title = properties['Title'].title[0].plain_text
          console.dir(`c:`)
          console.dir(c)
          return (
            <li className="list-disc list-inside" key={`cast--${c.id}`}>
              {title}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Listing
