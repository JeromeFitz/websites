// import { ArrowRightIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

// import { Badge, Button, Flex, Select } from '@radix-ui/themes'
// import Image from 'next/image'
// // eslint-disable-next-line no-restricted-imports
// import NextLink from 'next/link'

import { FourOhFour } from '~app/_errors/404'

import { Banner } from './_components/Banner'
import { NavigationDesktop } from './_components/Navigation.desktop'
import { NavigationMobile } from './_components/Navigation.mobile'
import { Top } from './_components/Top'

const isDev = process.env.NODE_ENV === 'development'

function Navigation() {
  return (
    <div
      className={cx(
        '[--header-height:64px]',
        'min-h-[var(--header-height)]',
        'sticky top-0 flex justify-center',
        'z-50',
        // 'bg-[yellow]',
        'w-full max-w-full',

        'bg-white dark:bg-black',
        '',
        'shadow-sm',
      )}
    >
      <header
        className={cx(
          '[--full:calc(1400px+calc(2*24px))]',
          '[--page-margin:24px]',
          'flex flex-row items-center',
          'm-auto w-[var(--full)] px-[var(--page-margin)]',
        )}
      >
        <div className={cx('hidden items-center justify-center md:flex')}>
          <NavigationDesktop />
        </div>

        <div
          className={cx(
            'flex shrink grow basis-0 items-center justify-center',
            // 'md:hidden',
            '',
          )}
        >
          <div className={cx('ml-auto')}>
            <NavigationMobile />
          </div>
        </div>
      </header>
    </div>
  )
}

function Section() {
  return <div className={cx()}></div>
}

function SectionContainer() {
  return (
    <div className={cx('relative')}>
      <div
        className={cx(
          'inset-y-0 z-50 flex w-full flex-col items-center',
          'pt-10 md:pt-0',
        )}
      >
        <Banner />
        <Top />
        <Section />
      </div>
    </div>
  )
}

function Footer() {
  return <div className={cx()}></div>
}

export default function Page() {
  if (!isDev) return <FourOhFour isNotPublished={false} segmentInfo={{}} />

  return (
    <>
      <Navigation />
      <SectionContainer />
      <Footer />
    </>
  )
}
