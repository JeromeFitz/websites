'use client'
import { cx } from '@jeromefitz/shared/src/utils'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import useSWR from 'swr'

// import { log } from '~utils/log'
// // import { UpcomingEvents } from './UpcomingEvents'

// const DEBUG_KEY = '(notion)/shows/[[..catchAll]]/Item.tsx >> '

const keyPrefixImage = `${process.env.NEXT_PUBLIC__SITE}/image`

function Item({ item }) {
  // log(`${DEBUG_KEY} item`, item)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [effect, setEffect] = useState(false)

  const { data: images } = useSWR('images')

  // @todo(external) first key is image slug
  const imageSlug = !!item?.properties?.seoImage
    ? `${keyPrefixImage}/${Object.keys(item?.properties?.seoImage)[0]}`
    : ''
  const _image = images[imageSlug]

  const image = {
    blurDataURL: _image?.base64,
    ..._image?.img,
  }

  return (
    <motion.div
      // whileHover={{ scale: 1.01 }}
      // whileTap={{ scale: 0.99 }}
      className={cx(
        'inline-block align-top',
        'left-0 top-0 h-64 w-full md:h-72',
        '!absolute'
        // 'overflow-hidden'
      )}
    >
      <div className={cx('block max-w-[3584px]')}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          role="presentation"
          aria-hidden="true"
          src={image?.blurDataURL}
          className={cx(
            'block max-w-full ',
            'inset-0 m-0 h-full w-full p-0',
            'object-cover',
            '!absolute rounded',
            'blur-md',
            'opacity-90 group-hover:opacity-100',
            // 'scale-95 translate-y-1.5',
            'transition-all duration-500'
          )}
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        role="presentation"
        aria-hidden="true"
        src={image?.blurDataURL}
        className={cx(
          'block max-w-full ',
          'inset-0 m-0 h-full w-full p-0',
          'object-cover',
          '!absolute rounded',
          'blur-sm',
          'opacity-0 group-hover:opacity-100',
          // 'scale-100',
          'transition-all duration-500'
        )}
      />
      <div
        className={cx(
          'inline-block align-top',
          'left-0 top-0 h-64 w-full md:h-72',
          '!absolute',
          'overflow-hidden'
        )}
      >
        <AspectRatio.Root asChild ratio={image?.width / image?.height}>
          <Image
            {...image}
            alt=""
            placeholder="blur"
            className={cx(
              'h-full overflow-hidden',
              'inline-block align-top',
              'left-0 top-0 w-full',
              '!absolute rounded',
              'group-hover:-translate-y-1.5 group-hover:scale-[1.01]',
              'transition-all duration-500',
              effect && 'animate-scaleOut',
              ''
            )}
          />
        </AspectRatio.Root>
      </div>
    </motion.div>
    // </div>
  )
}

export { Item }
