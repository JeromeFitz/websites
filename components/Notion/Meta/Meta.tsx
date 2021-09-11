import _map from 'lodash/map'
// import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import pluralize from 'pluralize'
// import { useEffect, useReducer, useState } from 'react'
import useSWR from 'swr'

import { setRelation } from '~hooks/people/useRelation'
import fetcher from '~lib/fetcher'
import getTitle from '~lib/notion/getTitle'
import rangeMap from '~utils/rangeMap'

const LiGhost = () => (
  <div className="max-w-sm w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-2">
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
      </div>
    </div>
  </div>
)

const MetaItem = ({ id, swrKey }) => {
  // console.dir(`(MetaItem) swrKey: ${swrKey}`)
  // const { data } = useRelation({ swrKey })
  const { data } = useSWR(swrKey, {
    fallbackData: {},
    revalidateOnFocus: true,
  })

  const { data: item, error: itemError } = useSWR(
    () => (!!id ? `/api/notion/pages/${id}` : null),
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  /**
   * @error or @loading
   */
  if (itemError || !item || item === undefined) return null
  void setRelation(swrKey, data, item)
  return null
}

const Meta = ({ ids, swrKey, title }) => {
  console.dir(`(Meta) swrKey: ${swrKey}`)
  const { data } = useSWR(swrKey, {
    fallbackData: {},
  })

  return (
    <div className="flex flex-col" id={`${swrKey}--container`}>
      <h5 className="font-semibold">{pluralize(getTitle(title), ids.length)}</h5>
      {_map(ids, (id) => (
        <MetaItem key={`${swrKey}--${id}--hidden`} id={id} swrKey={swrKey} />
      ))}
      <ul className="flex flex-col">
        {/* {_map(data, (person) => (
          <li key={`${swrKey}--${person.id}`}>{person.data.title}</li>
        ))} */}
        {rangeMap(ids.length, (i) => {
          console.dir(`data`)
          console.dir(data)
          return _size(data) > 0 ? (
            <LiGhost key={`${swrKey}--${i}`} />
          ) : (
            <LiGhost key={`${swrKey}--${i}`} />
          )
        })}
      </ul>
    </div>
  )
}

export default Meta
//
