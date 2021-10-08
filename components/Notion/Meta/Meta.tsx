// import cx from 'clsx'
// import _filter from 'lodash/filter'
import _map from 'lodash/map'
// import _orderBy from 'lodash/orderBy'
// import _size from 'lodash/size'
import pluralize from 'pluralize'
// import { useEffect, useState } from 'react'
// import { useSWRConfig } from 'swr'

import usePage from '~hooks/notion/usePage'
import getTitle from '~lib/notion/getTitle'
// import rangeMap from '~utils/rangeMap'

const LiGhost = () => (
  <div className="max-w-sm w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-2">
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
      </div>
    </div>
  </div>
)

// @hack(swr)
const MetaSwr = ({ id }) => {
  // const { mutate } = useSWRConfig()
  const { data, isError, isLoading } = usePage({ id })
  // void mutate(`/api/notion/pages/${id}`)
  if (isError || isLoading)
    return (
      <li>
        <LiGhost />
      </li>
    )
  return <li>{data?.data?.title}</li>
}

const Meta = ({ ids, swrKey, title }) => {
  // const { cache } = useSWRConfig()
  // console.dir(`cache`)
  // console.dir(cache)
  // // const [data, dataSet] = useState()
  // // const [hasData, hasDataSet] = useState(false)
  // // useEffect(() => {
  // //   console.dir(`useEffect: inbound`)
  // //   const dataPrep = {}
  // //   _map(ids, (id) => {
  // //     const dataGet = cache.get(`/api/notion/pages/${id}`)
  // //     if (!!dataGet) dataPrep[id] = dataGet
  // //   })
  // //   // @todo(any)
  // //   const dataGet: any = _orderBy(
  // //     _filter(dataPrep, (relation: any) => ids.includes(relation.id)),
  // //     ['data.title'],
  // //     ['asc']
  // //   )
  // //   dataSet(dataGet)
  // //   hasDataSet(!!dataGet && _size(dataGet) > 0)
  // //   // return () => {}
  // // }, [cache, ids])

  return (
    <div className="flex flex-col" id={`${swrKey}--container`}>
      <h5 className="font-semibold">{pluralize(getTitle(title), ids.length)}</h5>
      <ul className="flex flex-col">
        {_map(ids, (id) => (
          <MetaSwr id={id} key={`swr-li--${swrKey}--${id}`} />
        ))}
      </ul>
      {/* <ul className="flex flex-col">
        {rangeMap(ids.length, (id) => {
          // console.dir(`rangeMap(${id})`)
          return hasData && !!data && !!data[id] ? (
            // <li key={`swr-visible--${swrKey}--${id}`}>{data[id]?.data?.title}</li>
            <MetaSwr
              id={data[id]}
              key={`swr-visible--${swrKey}--${id}`}
              visible={true}
            />
          ) : (
            <LiGhost key={`swr-visible--${swrKey}----${id}`} />
          )
        })}
      </ul> */}
    </div>
  )
}

export default Meta
