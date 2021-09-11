// import _map from 'lodash/map'
// import _size from 'lodash/size'
// import _sortBy from 'lodash/sortBy'
import pluralize from 'pluralize'
// import { useEffect, useState } from 'react'
import useSWR from 'swr'

// import useRelation, { setRelation } from '~hooks/people/useRelation'
import fetcher from '~lib/fetcher'
import getTitle from '~lib/notion/getTitle'

// const MetaItemSwr = ({ id, swrKey }) => {
//   const { data: relation } = useRelation({ swrKey })
//   const { data, error } = useSWR(() => `/api/notion/pages/${id}`, fetcher, {
//     revalidateOnFocus: false,
//   })
//   if (error || !data) {
//     return null
//   }
//   void setRelation(swrKey, relation, data)
//   return null
// }

const MetaItem = ({ id }) => {
  const { data: person, error } = useSWR(() => `/api/notion/pages/${id}`, fetcher, {
    fallbackData: {},
    revalidateOnFocus: false,
  })
  /**
   * @error or @loading
   */
  if (error || !person || person === undefined)
    return (
      <>
        {/* <li>{error ? <>Error</> : <>Loading...</>}</li> */}
        <li className="max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-2">
            <div className="flex-1 space-y-0 py-0">
              <div className="h-3.5 bg-gray-600 dark:bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </li>
      </>
    )

  // const { title } = person?.data
  console.dir(`person`)
  console.dir(person)

  // return <li>{title}</li>
  return <li>{person?.data?.title}</li>
}

const Meta = ({ ids, swrKey, title }) => {
  // console.dir(`swrKey `)
  // console.dir(swrKey)
  // const { data: relation } = useRelation({ swrKey })
  // const idSize = _size(ids)
  // const people = _sortBy(relation, (person: any) => person.data?.title)
  // console.dir(ids)
  // console.dir(relation)
  // console.dir(`idSize: ${idSize}`)

  return (
    <>
      {/* {ids.map(
        (item) =>
          !!item && (
            <MetaItemSwr
              id={item}
              key={`${swrKey}--${title}--${item}--swr`}
              swrKey={swrKey}
            />
          )
      )} */}
      <div
        id={`container--people--${title.replace('people', '').toLowerCase()}`}
        className="pl-2 md:pl-1 pr-2 md:pr-0"
      >
        <h5 className="mt-2 font-bold">{pluralize(getTitle(title), ids.length)}</h5>
        <ul className="flex flex-col">
          {/* {people.map((person: any) => {
            return (
              <MetaItem
                data={person}
                key={`${swrKey}--${title}--${person.id}`}
                id={person.id}
              />
            )
          })} */}
          {ids.map((personId: any) => {
            return (
              <MetaItem key={`${swrKey}--${title}--${[personId]}`} id={[personId]} />
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Meta
//
