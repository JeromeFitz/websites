import cx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import _lowerCase from 'lodash/lowerCase'
import _take from 'lodash/take'
// import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'

// import Avatar from '~components/Avatar'
import Icon from '~components/Icon'
import useSticky from '~hooks/useSticky'
import { WEBKIT_BACKGROUND__BREAK } from '~lib/constants'

// const ThemeMode = dynamic(
//   () => import('~components/Layout').then((mod) => mod.ThemeMode),
//   {
//     ssr: false,
//   }
// )

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Breadcrumb = ({ isIndex, title }) => {
  const router = useRouter()
  let as = ''
  const href = `/[...catchAll]`

  const breadcrumbs = router.asPath.split('/').slice(1)
  const breadcrumbsSize = breadcrumbs.length
  const isHomepage = breadcrumbsSize === 1 && breadcrumbs[0] === ''
  // console.dir(`breadcrumbsSize: ${breadcrumbsSize}`)
  // console.dir(`isHomepage: ${isHomepage}`)

  const stickyRef = useRef(null)
  const { isFix } = useSticky(stickyRef)

  // console.dir(`isFix: ${isFix}`)

  return (
    <>
      <motion.nav
        aria-label="Article Navigation"
        className={cx(
          `flex flex-row sticky top-0 items-center`,
          `overflow-hidden`, // `bg-blur bg-opacity-50 dark:bg-opacity-50`,
          // `pointer-events-auto`,
          // `bg-white dark:bg-black`,
          'bg-primary text-secondary',
          isFix && 'py-2 border-b border-black dark:border-white',
          `py-4`,
          `z-20`,
          ``
        )}
        ref={stickyRef}
        layout
        // transition={{ duration: 0.25 }}
        animate={
          {
            // y: isFix ? [0, -150] : [-150, 0],
            // rotate: 0,
            // opacity: isFix ? 1 : 0,
            // display: isFix ? 'none' : 'block',
          }
        }
      >
        {/* <span className="flex-inline">
          <Avatar name={title} />
        </span> */}
        <AnimatePresence>
          <motion.ol
            className={cx(
              'flex-inline flex flex-row',
              'leading-none tracking-tight capitalize',
              'breadcrumb-transition',
              'font-medium',
              'text-lg md:text-xl',
              'items-center',
              'divide-black dark:divide-white divide-x',
              ``
            )}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: isFix ? 1 : 0 }}
            exit={{ opacity: 0 }}
          >
            <li className="pr-2 cursor-pointer" key={'breadcrumb-'}>
              <NextLink as={'/'} href={'/'}>
                <a
                  aria-label={`Link to homepage of jeromefitzgerald.com`}
                  title={`Link to homepage of jeromefitzgerald.com`}
                >
                  {/* {isFix ?  <Icon icon={'HomeIcon'} /> : isIndex ? title : ''} */}
                  {!isFix && isHomepage ? (
                    // 'Jerome Fitzgerald'
                    ''
                  ) : (
                    <Icon icon={'HomeIcon'} />
                  )}
                </a>
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
                <motion.li
                  className="px-2"
                  key={`breadcrumb-${breadcrumbIndex}`}
                  layout
                  animate={
                    {
                      // y: isFix ? [0, -150] : [-150, 0],
                      // rotate: 0,
                      // opacity: isFix ? 0 : 1,
                      // display: isFix ? 'none' : 'block',
                    }
                  }
                  transition={{ duration: 0.125 }}
                >
                  <NextLink as={as} href={href}>
                    {breadcrumb}
                  </NextLink>
                </motion.li>
              ) : (
                <motion.li
                  className={cx('px-2 font-bold _text-black dark:_text-white')}
                  aria-current="page"
                  key={`breadcrumb-${breadcrumbIndex}`}
                  layout
                  animate={
                    {
                      // y: isFix ? [150, 0] : [0, 150],
                      // rotate: 0,
                      // opacity: isFix ? 1 : 0,
                    }
                  }
                  transition={{ duration: 0.125 }}
                >
                  {_title}
                </motion.li>
              )
            })}
          </motion.ol>
        </AnimatePresence>
        {/* <div className="ml-auto">
          <ThemeMode />
        </div> */}
      </motion.nav>

      {
        <>
          <AnimatePresence>
            <motion.h3
              className={cx(
                'flex flex-row items-center',
                'gradient text-2xl md:text-4xl',
                'leading-tight md:leading-tight',
                'mt-0 mb-3'
                // 'z-0'
              )}
              style={WEBKIT_BACKGROUND__BREAK}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {isHomepage ? 'Jerome Fitzgerald' : title}
            </motion.h3>
          </AnimatePresence>
          <div className={cx('spacer bg-gray-600 dark:bg-gray-300')} />
        </>
      }
    </>
  )
}

export default Breadcrumb
