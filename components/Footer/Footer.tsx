import Link from 'next/link'
import cx from 'clsx'
import { MdInfo } from 'react-icons/md'
import { FaPencilRuler } from 'react-icons/fa'

import NowPlaying from '~components/NowPlaying'

const Footer = () => {
  return (
    <>
      <NowPlaying />
      <footer className={cx('bg-primary')}>
        <section
          className={cx(
            'flex flex-row justify-between items-center',
            'w-full py-8 my-0 md:my-8 mx-auto max-w-4xl',
            'bg-primary'
          )}
        >
          <div
            className={cx(
              'flex w-full max-w-4xl m-auto py-4 md:p-8',
              'justify-between',
              'items-center'
            )}
          >
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="mr-2 text-base inline-flex">
                <FaPencilRuler />
              </span>
              <Link href="/colophon">
                <a className="text-sm font-semibold">Colophon</a>
              </Link>
              <br />
              <span className="mr-2 text-base inline-flex">
                <MdInfo />
              </span>
              <strong>Note:</strong> This site is a work-in-progress.
            </div>
            <div
              className="text-sm text-gray-600 dark:text-gray-300"
              style={{ textAlign: 'end' }}
            >
              <span>Copyright</span> © 2020
              <br />
              <span className="font-semibold">Nice Group of People, LLC</span>
            </div>
          </div>
        </section>
      </footer>
    </>
  )
}

export default Footer
