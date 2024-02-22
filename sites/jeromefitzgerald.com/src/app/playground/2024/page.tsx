import { cx } from '@jeromefitz/ds/utils/cx'

import { FourOhFour } from '~app/_errors/404'

import { Layout } from './_components/Layout'
// import { PageHome as Layout } from './_components/Page.Home'

const isDev = process.env.NODE_ENV === 'development'

function Section() {
  return <div className={cx()}></div>
}

function SectionContainer() {
  return (
    <div className={cx('relative')}>
      <div
        className={cx(
          'inset-y-0 z-50 flex w-full flex-col items-center',
          'pt-10 lg:pt-0',
          'mx-auto max-w-screen-xl',
        )}
      >
        <Layout />
        <Section />
      </div>
    </div>
  )
}

function PageFooter() {
  return <div className={cx()}></div>
}

export default function Page() {
  if (!isDev) return <FourOhFour isNotPublished={false} segmentInfo={{}} />

  return (
    <>
      <SectionContainer />
      <PageFooter />
    </>
  )
}
