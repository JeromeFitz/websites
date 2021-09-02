import cx from 'clsx'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getInfoType = (item: any, routeType) => {
  console.dir(item)
  const date = item.properties['Date'].date.start.slice(0, 10)
  const slug = item.properties['Slug'].rich_text[0].plain_text
  const [year, month, day] = date.split('-')

  let as = ''

  switch (routeType) {
    case 'blog':
    case 'events':
      as = `/${routeType}/${year}/${month}/${day}/${slug}`
      break
    case 'people':
    case 'podcasts':
    case 'shows':
    case 'users':
    case 'venues':
    default:
      as = `/${routeType}/${slug}`
      break
  }

  return (
    <>
      <Link as={as} href={`/[...catchAll]`} key={`link-${slug}`}>
        <a
          className={cx(
            'font-semibold',
            'underline underline-offset-md underline-thickness-sm',
            'hover:text-green-500 dark:hover:text-yellow-200'
          )}
        >
          {date}: {slug}
        </a>
      </Link>
    </>
  )
}

export default getInfoType
