import cx from 'clsx'
import _map from 'lodash/map'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useSound } from 'use-sound'

import { useUI } from '~context/ManagedUIContext'
import getInfoType from '~lib/notion/getInfoType'

const Emoji = dynamic(() => import('~components/Emoji'), {
  ssr: false,
})

const ListingFallback = ({ items, routeType }) => {
  const { audio } = useUI()
  const [playActive] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })

  return (
    <>
      <ul className="my-6 w-full flex flex-col">
        {_map(items, (item, itemIndex) => {
          if (
            item?.properties?.slug === null ||
            item?.properties?.slug === undefined
          ) {
            return null
          }

          const { seoDescription, title } = item?.properties
          const { icon } = item
          const emoji = !!icon?.emoji ? icon.emoji : ''
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { as, date, href, slug } = getInfoType(item, routeType)
          return (
            <NextLink as={as} href={href} key={`ifb-${itemIndex}`}>
              <a
                className={cx(
                  'cursor-pointer',
                  'rounded-3xl border',
                  'px-8 py-4 mb-16',
                  'border-gray-300 dark:border-gray-500',
                  'hover:border-black focus:border-black',
                  'focus:shadow-md md:hover:shadow-lg',
                  'dark:hover:border-white dark:focus:border-white',
                  'hover:bg-gray-100 dark:hover:bg-gray-900',
                  'focus:bg-gray-100 dark:focus:bg-gray-900',
                  ''
                )}
                onClick={() => {
                  playActive()
                }}
              >
                <div className={cx('listing--item')}>
                  <div className={cx('listing--date')}>
                    <p className={cx('text-2xl mb-0 pb-0')}>
                      {emoji && <Emoji character={emoji} />}
                    </p>
                  </div>
                  <div className={cx('listing--title')}>
                    <h2>{title}</h2>
                  </div>
                  <div className={cx('listing--description')}>
                    <p>{seoDescription}</p>
                  </div>
                </div>
              </a>
            </NextLink>
          )
        })}
      </ul>
    </>
  )
}

export default ListingFallback
