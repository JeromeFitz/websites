import useSWR from 'swr'

import fetcher from '~lib/fetcher'

const Meta = ({ id }) => {
  console.dir(`id: ${id}`)
  const { data, error } = useSWR(() => `/api/notion/p/${id}`, fetcher, {
    revalidateOnFocus: true,
  })
  /**
   * @error or @loading
   */
  if (error || !data || data?.parent === undefined || data?.properties === undefined)
    return (
      <>
        <h1>{error ? <>Error</> : <>Loading...</>}</h1>
      </>
    )
  console.dir(data)

  const { properties } = data
  const title = properties['Title'].title[0].plain_text

  return (
    <>
      <h6>{title}</h6>
    </>
  )
}

export default Meta
