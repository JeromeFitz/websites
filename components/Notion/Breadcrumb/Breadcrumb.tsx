import { useRouter } from 'next/router'
import NextLink from 'next/link'
import _take from 'lodash/take'
import _lowerCase from 'lodash/lowerCase'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Breadcrumb = ({ emoji, title }) => {
  const router = useRouter()

  let as = ''
  const href = `/[...catchAll]`

  const breadcrumbs = router.asPath.split('/').slice(1)
  const breadcrumbsSize = breadcrumbs.length

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-black divide-x divide-black tracking-wide mb-4 capitalize">
        <li className="pr-2 text-gray-500">
          <NextLink as={'/'} href={'/'}>
            Home
          </NextLink>
        </li>
        {breadcrumbs.map((breadcrumb, breadcrumbIndex) => {
          const take = _take(breadcrumbs, breadcrumbIndex + 1)
          const isLast = breadcrumbsSize === breadcrumbIndex + 1
          as = `/${take.join('/')}`

          const _title =
            _lowerCase(title) === 'blog' || _lowerCase(title) === 'events'
              ? breadcrumb
              : title

          return !isLast ? (
            <li className="px-2 text-gray-700" key={breadcrumbIndex}>
              <NextLink as={as} href={href}>
                {breadcrumb}
              </NextLink>
            </li>
          ) : (
            <li
              className="px-2 text-gray-900"
              aria-current="page"
              key={breadcrumbIndex}
            >
              {_title}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
