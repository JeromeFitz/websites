import useSWR from 'swr'

import fetcher from '~lib/fetcher'

const Meta = ({ id }) => {
  // console.dir(`id: ${id}`)
  // console.dir(`/api/notion/pages/${id}`)
  const { data, error } = useSWR(() => `/api/notion/pages/${id}`, fetcher, {
    revalidateOnFocus: false,
  })
  // console.dir(`data`)
  // console.dir(data)
  /**
   * @error or @loading
   */
  if (error || !data || data?.data === undefined)
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

  const { title } = data?.data

  return (
    <>
      <li>{title}</li>
    </>
  )
}

export default Meta
