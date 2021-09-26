import cx from 'clsx'
import _map from 'lodash/map'
import pluralize from 'pluralize'
import useSWR from 'swr'

import { MetaUL } from '~components/Notion/Meta'
import fetcher from '~lib/fetcher'
import getTitle from '~lib/notion/getTitle'

const MetaRelations = ({ id, ids, relationKey, routeType }) => {
  // const foo = `${relationKey}=${ids.join(',')}`
  /**
   * @debug
   */
  // console.dir(`id`)
  // console.dir(id)
  // console.dir(`ids`)
  // console.dir(ids)
  // console.dir(`relationKey`)
  // console.dir(relationKey)
  const queryParams = !!id
    ? `key=${relationKey}&value=${id}&routeType=${routeType}`
    : `key=${relationKey}&value=${ids.join(',')}&routeType=${routeType}`
  // console.dir(`queryParams`)
  // console.dir(queryParams)

  const databaseType = routeType === 'events' ? 'shows' : 'people'

  const { data, error } = useSWR(
    [`/api/notion/query/${databaseType}`, queryParams],
    (url) => fetcher(`${url}?${queryParams}`),
    { revalidateOnFocus: false }
  )
  const isError = error
  const isLoading = !error && !data
  if (isError || isLoading) return null

  const title = pluralize(getTitle(relationKey), ids.length)

  return (
    <MetaUL id={`relations--container--${relationKey.toLowerCase()}`} title={title}>
      {_map(data?.results, (item) => (
        <li className={cx('first:pt-2')} key={item?.id}>
          {item?.data?.title}
        </li>
      ))}
    </MetaUL>
  )
}

export default MetaRelations
