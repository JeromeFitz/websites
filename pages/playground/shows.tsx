import cx from 'clsx'
import { motion } from 'framer-motion'
import Slugger from 'github-slugger'
import _map from 'lodash/map'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import Layout, { Breakout } from '~components/Layout'
import { IMAGE__PLACEHOLDER } from '~lib/constants'
import fetcher from '~lib/fetcher'
import getCatchAll from '~lib/notion/getCatchAll'
import getImages from '~lib/notion/getImages'
import getPathVariables from '~lib/notion/getPathVariables'

const Breadcrumb = dynamic(() => import('~components/Notion/Breadcrumb'), {})

const bgLight = 'from-gray-700 via-gray-900 to-black'
const bgDark = 'dark:from-gray-700 dark:via-gray-900 dark:to-gray-500'

const transitionIn = {
  duration: 0.25,
  type: 'tween',
  ease: 'easeIn',
}
const transitionOut = {
  duration: 0.25,
  type: 'tween',
  ease: 'easeOut',
}
const motionImage = {
  rest: {
    scale: 1,
    transition: transitionOut,
  },
  hover: {
    scale: 0.99,
    transition: transitionOut,
  },
}
// const motionMeta = {
//   rest: {},
//   hover: {},
// }
const motionGlow = {
  rest: {
    opacity: 0,
    transition: transitionOut,
  },
  hover: {
    opacity: 1,
    transition: transitionIn,
  },
}

const ListingItem = ({ index, item }) => {
  const { seoDescription, seoImage, slug, title } = item?.data
  const slugger = new Slugger()
  const { data: images } = useSWR('images')

  // @todo(external)
  const imageSlug = slugger.slug(seoImage?.url)
  const imageData = !!images && images[imageSlug]

  const hasImage = !!imageData && !!imageData.base64

  const blurDataURL = hasImage ? imageData.base64 : IMAGE__PLACEHOLDER?.meta?.base64

  return (
    <>
      <motion.div
        className={cx('flex flex-col')}
        initial="rest"
        whileHover="hover"
        whileDrag="hover"
        whileTap="hover"
        animate="rest"
      >
        <NextLink href={`/shows/${slug}`}>
          <a className={cx('', 'p-2')}>
            <motion.div
              className={cx('relative h-48 md:h-72', 'rounded-xl')}
              variants={motionImage}
              style={{
                backgroundImage: `url(${!!blurDataURL})`,
                backgroundSize: 'cover',
              }}
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
                blurDataURL={blurDataURL}
                className={cx('rounded-xl')}
                placeholder="blur"
                priority={index < 4 ? true : false}
                // layout="responsive"
                // {...IMAGE__PLACEHOLDER?.meta?.img}
                sizes="25vw"
                layout="fill"
                // objectFit="contain"
                objectFit="cover"
                objectPosition={'50% 50%'}
                // src={IMAGE__PLACEHOLDER?.meta?.url}
                src={hasImage ? imageData?.img?.src : seoImage?.url}
              />
            </motion.div>

            <div className={cx('py-2 px-2')}>
              <h3 className={cx('text-xl font-black leading-normal tracking-tight')}>
                {title}
              </h3>
              <p className={cx('prose')}>{seoDescription}</p>
            </div>
          </a>
        </NextLink>
      </motion.div>
    </>
  )
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

  return (
    <>
      {_map(data?.items?.results, (item, index) => {
        const key = item?.id
        return <ListingItem key={key} index={index} item={item} />
      })}
    </>
  )
}

const Shows = (props) => {
  const { mutate } = useSWRConfig()
  const { data: images } = useSWR('images', null, { fallbackData: props.images })
  useEffect(() => {
    void mutate('images', { ...images, ...props.images }, true)
  }, [images, mutate, props.images])
  return (
    <>
      <Layout>
        <Breadcrumb isIndex={true} title={`Playground: Shows`} />
        <Breakout>
          <div
            className={cx(
              '_main',
              'grid gap-2 md:gap-4 ',
              'grid-cols-1 md:grid-cols-3 ',
              'justify-center items-start place-content-center',
              'overflow-hidden',
              'w-full max-w-max',
              'py-4 md:py-6 px-0 md:px-6 my-0 mx-auto',
              ''
            )}
          >
            <Listing />
          </div>
        </Breakout>
      </Layout>
    </>
  )
}

export const getStaticProps = async ({ preview = false, ...props }) => {
  const catchAll = ['shows']
  const clear = false
  const pathVariables = getPathVariables(catchAll)
  /**
   * @cache
   */
  const cache = true
  const data = await getCatchAll({ cache, catchAll, clear, preview })
  const images = !!data ? await getImages({ data, pathVariables }) : []

  const dataReturn = { ...data, images }
  return { props: { preview, ...dataReturn, ...pathVariables, ...props } }
}

export default Shows
