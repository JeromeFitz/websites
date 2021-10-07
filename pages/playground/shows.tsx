import cx from 'clsx'
import { motion } from 'framer-motion'
import _map from 'lodash/map'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import NextLink from 'next/link'
import useSWR from 'swr'

import Layout, { Breakout } from '~components/Layout'
import { IMAGE__PLACEHOLDER } from '~lib/constants'
import fetcher from '~lib/fetcher'

const Breadcrumb = dynamic(() => import('~components/Notion/Breadcrumb'), {})

const bgLight = 'from-gray-700 via-gray-900 to-black'
const bgDark = 'dark:from-gray-700 dark:via-gray-900 dark:to-gray-500'

const blurDataURL = IMAGE__PLACEHOLDER?.meta?.base64

const motionImage = {
  rest: {
    scale: 1,
    x: 0,
    transition: {
      duration: 0.25,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    scale: 0.99,
    x: 0,
    transition: {
      duration: 0.25,
      type: 'tween',
      ease: 'easeOut',
    },
  },
}

// const motionMeta = {
//   rest: {},
//   hover: {},
// }

const motionGlow = {
  rest: { opacity: 0, ease: 'easeOut', duration: 0.25, type: 'tween' },
  hover: {
    opacity: 0.75,
    transition: {
      duration: 0.25,
      type: 'tween',
      ease: 'easeIn',
    },
  },
}

const Listing = () => {
  const { data, error } = useSWR(`/api/notion/shows`, fetcher, {
    revalidateOnFocus: false,
  })
  /**
   * @error or @loading
   */
  const isError = error
  const isLoading = !error && !data

  if (isError || isLoading) return null
  // console.dir(`data`)
  // console.dir(data)
  return (
    <>
      {_map(data?.items?.results, (item) => {
        const { seoDescription, slug, title } = item?.data
        const key = item?.id
        return (
          <motion.div
            className={cx('flex flex-col')}
            key={key}
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <NextLink href={`/shows/${slug}`}>
              <a className={cx('', 'p-2')}>
                <motion.div
                  className={cx('relative h-48 md:h-96', 'rounded-xl')}
                  variants={motionImage}
                >
                  <motion.div
                    className={cx(
                      'absolute top-0 left-0 w-full h-full blur-lg rounded-xl',
                      !!blurDataURL ? '' : `${bgLight} ${bgDark}`,
                      ''
                    )}
                    variants={motionGlow}
                    style={
                      !!blurDataURL
                        ? {
                            backgroundImage: `url(${blurDataURL})`,
                            backgroundSize: 'cover',
                          }
                        : {}
                    }
                  />
                  <NextImage
                    blurDataURL={IMAGE__PLACEHOLDER?.meta?.base64}
                    className={cx('rounded-xl')}
                    placeholder="blur"
                    // priority={true}
                    // layout="responsive"
                    // {...IMAGE__PLACEHOLDER?.meta?.img}
                    sizes="50vw"
                    layout="fill"
                    objectFit="contain"
                    // objectFit="cover"
                    // objectPosition={'50% 50%'}
                    src={IMAGE__PLACEHOLDER?.meta?.url}
                  />
                </motion.div>

                <div className={cx('py-2 px-2')}>
                  <h3 className={cx('text-xl font-black')}>{title}</h3>
                  <p className={cx('prose')}>{seoDescription}</p>
                </div>
              </a>
            </NextLink>
          </motion.div>
        )
      })}
    </>
  )
}

const Shows = () => {
  return (
    <>
      <Layout>
        <Breadcrumb isIndex={true} title={`Playground: Shows`} />
        <Breakout>
          <div className={cx(`min-h-full py-6`, `bg-gray-100`)}>
            <div
              className={cx(
                `flex flex-col w-full max-w-4xl`,
                `px-2 mx-auto md:px-8`,
                `bg-gray-500`,
                ``
              )}
            >
              <h1>Sound System</h1>
            </div>
          </div>
          <div
            className={cx(
              '_main',
              'grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 md:auto-cols-auto',
              'justify-center items-start place-content-center',
              'overflow-hidden',
              'my-8 py-16',
              'w-full max-w-7xl',
              'py-0 px-6 my-0 mx-auto',
              // 'relative',
              ''
            )}
          >
            {/* <div
              className={cx(
                '_container',
                'flex flex-row flex-wrap',
                'w-full max-w-7xl',
                'h-full',
                'justify-between items-start',
                'py-0 px-6 my-0 mx-auto'
              )}
            > */}
            <Listing />
            {/* </div> */}
          </div>
        </Breakout>
      </Layout>
    </>
  )
}

export default Shows
