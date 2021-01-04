import { useEffect, useState } from 'react'
import Link from 'next/link'
import cx from 'clsx'
import { MdInfo } from 'react-icons/md'
import { FaPencilRuler } from 'react-icons/fa'

import NowPlaying from '~components/NowPlaying'

const Footer = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <>
      {mounted && (
        <>
          <NowPlaying />
          <footer className={cx('bg-secondary text-primary mx-2')}>
            <section
              className={cx(
                'flex flex-row justify-between items-center',
                'w-full py-8 my-0 md:py-8 mx-auto max-w-4xl'
              )}
            >
              <div
                className={cx(
                  'flex w-full max-w-4xl m-auto py-4 md:p-8',
                  'justify-between',
                  'items-center'
                )}
              >
                <div className="text-sm">
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
                  <strong>Note:</strong>{' '}
                  <span>This site is a work-in-progress.</span>
                </div>
                <div className="text-sm" style={{ textAlign: 'end' }}>
                  <span>Copyright</span> © 2020
                  <br />
                  <span className="font-semibold">Nice Group of People, LLC</span>
                </div>
              </div>
            </section>
          </footer>
        </>
      )}
    </>
  )
}

export default Footer
