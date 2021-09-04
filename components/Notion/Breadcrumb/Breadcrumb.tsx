import cx from 'clsx'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import _take from 'lodash/take'
import _lowerCase from 'lodash/lowerCase'

const Breadcrumb = ({ title }) => {
  const router = useRouter()

  let as = ''
  const href = `/[...catchAll]`

  const breadcrumbs = router.asPath.split('/').slice(1)
  const breadcrumbsSize = breadcrumbs.length

  return (
    <nav aria-label="breadcrumb">
      <ol
        className={cx(
          'flex leading-none tracking-wide mb-4 capitalize',
          'divide-x divide-black dark:divide-white',
          'breadcrumb-transition'
        )}
      >
        <li className="pr-2" key={'breadcrumb-'}>
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
            <li className="px-2" key={`breadcrumb-${breadcrumbIndex}`}>
              <NextLink as={as} href={href}>
                {breadcrumb}
              </NextLink>
            </li>
          ) : (
            <li
              className="px-2"
              aria-current="page"
              key={`breadcrumb-${breadcrumbIndex}`}
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
