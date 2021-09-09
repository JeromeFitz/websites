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
  if (error || !data || data?.parent === undefined || data?.data === undefined)
    return (
      <>
        <li>{error ? <>Error</> : <>Loading...</>}</li>
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
