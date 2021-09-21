import cx from 'clsx'
import _map from 'lodash/map'
// import pluralize from 'pluralize'
import useSWR from 'swr'

// import { MetaUL } from '~components/Notion/Meta'
import fetcher from '~lib/fetcher'

const MetaTags = ({ tagParams }) => {
  const { data, error } = useSWR(
    ['/api/notion/query/tags', tagParams],
    (url) => fetcher(`${url}?${tagParams}`),
    {}
  )
  const isError = error
  const isLoading = !error && !data
  if (isError || isLoading) return null

  // const title = pluralize('Tag', data?.results.length)

  return (
    // <MetaUL title={title}>
    <ul key="tagsKeyDog" className={cx('mb-5 flex flex-row flex-wrap gap-2.5')}>
      {_map(data?.results, (item) => (
        <li className={cx(`badge badge-red`)} key={item?.id}>
          {item?.data?.title}
        </li>
      ))}
    </ul>
    // </MetaUL>
  )
}

export default MetaTags
