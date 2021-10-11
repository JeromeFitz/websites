import cx from 'clsx'
import { motion } from 'framer-motion'
import Slugger from 'github-slugger'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import NextLink from 'next/link'
import useSWR from 'swr'
import { useSound } from 'use-sound'

import { useUI } from '~context/ManagedUIContext'
import { WEBKIT_BACKGROUND } from '~lib/constants'
import getInfoType from '~utils/notion/getInfoType'

const Emoji = dynamic(() => import('~components/Notion/Emoji'), {
  ssr: false,
})

// const cardVariants = {
//   hover: {
//     scale: 1.025,
//   },
//   initial: {
//     scale: 0.75,
//   },
// }

// const glowVariants = {
//   hover: {
//     opacity: 0.5,
//   },
//   initial: {
//     scale: 0.9,
//     opacity: 0,
//   },
// }

const bgLight = 'from-gray-200 via-gray-400 to-gray-600'
const bgDark = 'dark:from-gray-300 dark:via-gray-500 dark:to-gray-300'

const Link = ({ item, itemIndex, routeType }) => {
  const { audio } = useUI()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [playActive] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, date, href, slug } = getInfoType(item, routeType)
  const { icon, data: properties } = item
  const { seoDescription, seoImage, title } = properties
  const key = `link-${slug}`
  const emoji = !!icon?.emoji ? icon.emoji : ''

  const isGlass = false
  // const depth = 2

  const slugger = new Slugger()
  const { data: images } = useSWR('images')
  // @todo(external)
  const imageSlug = slugger.slug(seoImage)
  const imageData = !!images && images[imageSlug]

  // console.dir(`imageData`)
  // console.dir(imageData)

  const hasImage = false

  return (
    <li className={cx('relative list-none cursor-pointer my-4 md:my-8 w-full')}>
      <NextLink as={as} href={href} key={key}>
        <a
          className={cx()}
          onClick={() => {
            playActive()
          }}
        >
          <>
            <motion.div
              className={cx(
                'absolute top-0 left-0 w-full h-full blur-md rounded-2xl',
                // 'bg-white',
                'bg-gradient-to-r',
                bgLight,
                bgDark,
                ''
              )}
              // id="glow"
              // variants={glowVariants}
              whileHover={{
                opacity: 1,
                scale: isDark ? 1.25 : 1,
              }}
              whileTap={{
                opacity: isDark ? 1 : 0.75,
                scale: isDark ? 0.95 : 0.95,
              }}
              initial={{ opacity: isDark ? 1 : 0.75, scale: 0.95 }}
              animate={{ opacity: isDark ? 1 : 0.75, scale: 0.95 }}
            />
            <motion.div
              className={cx(
                'absolute rounded-sm top-1/2 left-1/2',
                'bg-gradient-to-r',
                bgLight,
                bgDark,
                'blur-lg duration-500'
              )}
              whileHover={{
                opacity: 1,
                scale: isDark ? 1.5 : 1.25,
              }}
              whileTap={{
                opacity: isDark ? 1 : 0.75,
                scale: isDark ? 1 : 0.95,
              }}
              initial={{ opacity: isDark ? 1 : 0.75, scale: isDark ? 1 : 0.95 }}
              animate={{ opacity: isDark ? 1 : 0.75, scale: isDark ? 1 : 0.95 }}
            />
            <motion.div
              // id="card"
              className={cx(
                'relative',
                'flex flex-col md:flex-row',
                isGlass ? ' bg-black blur-md' : 'bg-white',
                'drop-shadow-2xl',
                'rounded-xl border overflow-hidden',
                itemIndex % 2 == 0 && 'md:flex-row-reverse'
              )}
              // variants={cardVariants}
              transition={{
                // type: 'tween',
                // ease: 'easeOut',
                // delay: 0.15,
                duration: 0.25,
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.95 }}
              animate={{ scale: 0.95 }}
              whileHover={{ scale: 1 }}
            >
              <div
                // id="card--body"
                className={cx(
                  'relative overflow-hidden px-9 py-3 md:py-6 md:my-6',
                  hasImage ? 'md:w-7/12' : ''
                )}
              >
                <div
                  // id="card--title"
                  className={cx(
                    'text-black tracking-tighter bg-clip-text',
                    'bg-gradient-to-r from-black to-gray-600',
                    'text-lg font-bold md:font-semibold md:text-2xl',
                    'pt-5 md:pt-2'
                  )}
                  style={{
                    marginBlockEnd: '0px',
                    marginBottom: '0px !important',
                    // background: 'linear-gradient(90deg,#8cb1ff 0%,#abe8ff 100%)',
                    ...WEBKIT_BACKGROUND,
                  }}
                >
                  {emoji && <Emoji character={emoji} />}
                  {title}
                </div>
                <p className={cx('mt-4 md:mt-8 text-black: dark:text-black')}>
                  {seoDescription}
                </p>
              </div>
              <div
                className={cx(
                  'md:w-5/12 h-full',
                  hasImage ? 'md:w-5/12' : 'hidden'
                  // 'md:drop-shadow-xl md:scale-105'
                )}
              >
                {!!imageData ? (
                  <NextImage
                    alt={`Image for ${''}`}
                    blurDataURL={imageData.base64}
                    className={cx('absolute rounded')}
                    key={imageSlug}
                    layout="responsive"
                    placeholder="blur"
                    title={`Image for ${''}`}
                    {...imageData.img}
                  />
                ) : null}
                {/* <ImageCaption caption={seoImageDescription} /> */}
              </div>
            </motion.div>

            {/* {emoji && <Emoji character={emoji} />} */}
            {/* {title} */}
          </>
        </a>
      </NextLink>
      {/* {!!seoDescription && <p className={cx('prose pb-2')}>{seoDescription}</p>} */}
    </li>
  )
}

export default Link
