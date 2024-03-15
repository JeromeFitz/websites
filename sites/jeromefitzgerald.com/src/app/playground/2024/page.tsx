import { cx } from '@jeromefitz/ds/utils/cx'
import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

import { FourOhFour } from '@/app/_errors/404'

import { Layout } from './_components/Layout'

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
  if (!env.IS_DEV) return <FourOhFour isNotPublished={false} segmentInfo={{}} />

  return (
    <>
      <SectionContainer />
      <PageFooter />
    </>
  )
}
