import { cx } from '@jeromefitz/shared/src/utils'
import Image from 'next/image'
import { Suspense } from 'react'

// import { Anchor } from '~components/Anchor'
import { Debug } from '~components/Debug'
import { PageHeading } from '~ui/PageHeading'
// import { log } from '~utils/log'

// const ROUTE_TYPE = 'testing'
// const DEBUG_KEY = `${ROUTE_TYPE}/page.tsx >> `

async function getImage(url): Promise<any> {
  const { getPlaiceholder } = await import('plaiceholder')
  return await getPlaiceholder(url)
}

async function Page() {
  const url = 'https://images.unsplash.com/photo-1529362487499-b149087a4f62'
  // const { base64, img }: { base64: string; img: any } = await getImage(url)
  const { img }: { string; img: any } = await getImage(url)

  // log(`${DEBUG_KEY} base64`, base64)
  // log(`${DEBUG_KEY} img`, img)

  const data = {}
  const pathVariables = {}

  return (
    <>
      {/* @note(next) Debug does not cause: deopted into client-side rendering */}
      {/* @todo(next) Debug could be Suspensed */}
      <Suspense>
        <Debug data={data} pathVariables={pathVariables} />
      </Suspense>
      <PageHeading overline={`testing`} title={'Testing'} />
      <div
        className={cx(
          'pointer-events-none relative block w-full mix-blend-screen',
          // 'hidden',
          ''
        )}
      >
        <section className={cx('blue-bg-int h-96', '')} />
        <section className={cx('yellow-bg-int h-96', '')} />
        <section className={cx('green-bg-int h-96', '')} />
        <section className={cx('purple-bg-int h-96', '')} />
        <section className={cx('gold-bg-int h-96', '')} />
        <section className={cx('mauve-bg h-96', '')} />
      </div>
      <nav
        className={cx(
          'left-14 top-12 max-w-full font-black',
          'text-radix-mauve12 fixed mix-blend-difference',
          'text-4xl md:text-8xl',
          // 'hidden',
          ''
        )}
      >
        <ul className={cx('flex list-none flex-col')}>
          <li
            // tabIndex="0"
            className={cx(
              'inline-flex items-center text-ellipsis whitespace-nowrap',
              'py-8'
            )}
            id="nav__dashboard"
            // name="Dashboard"
          >
            Dashboard
          </li>
          <li
            // tabIndex="0"
            className={cx(
              'inline-flex items-center text-ellipsis whitespace-nowrap',
              'py-8'
            )}
            id="nav__messages"
            // name="Messages"
          >
            Messages
          </li>
          <li
            // tabIndex="0"
            className={cx(
              'inline-flex items-center text-ellipsis whitespace-nowrap',
              'py-8'
            )}
            id="nav__users"
            // name="Users"
          >
            Users
          </li>
          <li
            // tabIndex="0"
            className={cx(
              'inline-flex items-center text-ellipsis whitespace-nowrap',
              'py-8'
            )}
            id="nav__settings"
            // name="Settings"
          >
            Settings
          </li>
        </ul>
      </nav>
      <div className="mb-24">
        <div className="fixed">
          <h1 className="text-6xl font-black tracking-tight md:text-9xl">
            Jerome Fitzgerald
          </h1>
        </div>
        <div className="fixed">
          <Image {...img} alt="alt3r" priority={true} />
        </div>
      </div>
    </>
  )
}

export default Page
