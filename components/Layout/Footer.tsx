import cx from 'clsx'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'

import Icon from '~components/Icon'

// import NowPlaying from '~components/NowPlaying'
const NowPlayingWithNoSSR = dynamic(() => import('~components/NowPlaying'), {
  ssr: false,
})

const Footer = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <>
      {mounted && (
        <>
          {process.env.NEXT_PUBLIC__SITE === 'jeromefitzgerald.com' && (
            <NowPlayingWithNoSSR />
          )}
          <footer
            className={cx(
              'bg-primary text-secondary ',
              'bg-gradient-to-b from-gray-50 dark:from-gray-900',
              ' border-t border-black dark:border-white'
            )}
          >
            <section
              className={cx(
                'flex flex-col md:flex-row',
                'md:justify-between md:items-center',
                'w-full py-8 my-0 md:py-8 mx-auto max-w-4xl'
              )}
            >
              <div
                className={cx(
                  'flex flex-col md:flex-row',
                  'md:justify-between',
                  'md:items-center',
                  `w-full max-w-4xl m-auto py-4 md:p-8`
                )}
              >
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex flex-row mb-2">
                    <span className="mr-2 text-base inline-flex">
                      <Icon icon={'AnnotationIcon'} />
                    </span>
                    <Link href="/colophon">
                      <a className="font-semibold underline-style-solid underline-offset-md underline-thickness-md">
                        Colophon
                      </a>
                    </Link>
                  </div>
                  <div className="flex flex-row mb-2">
                    <span className="mr-2 text-base inline-flex">
                      <Icon icon={'InformationCircleIcon'} />
                    </span>
                    <span>
                      <strong>Note: </strong> This site is a work-in-progress.
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-end">
                  <div className="flex flex-row mb-2">
                    <span>
                      <span>Copyright</span> © 2021
                    </span>
                  </div>
                  <div className="flex flex-row mb-2">
                    <span className="font-semibold">Nice Group of People, LLC</span>
                  </div>
                </div>
              </div>
            </section>
          </footer>
        </>
      )}
    </>
  )
}

export default memo(Footer)
