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

  const { icon, properties } = data
  const emoji = icon.emoji
  const title = properties['Title'].title[0].plain_text

  return (
    <>
      <h1>
        {emoji}
        {` `}
        {title}
      </h1>
    </>
  )
}

export default Meta
