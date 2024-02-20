import { cx } from '@jeromefitz/ds/utils/cx'

import { Top } from '~app/playground/2024/_components/Top'

function Section() {
  return <div className={cx()}></div>
}

function SectionContainer() {
  return (
    <>
      <Top />
      <Section />
    </>
  )
}

function PageFooter() {
  return <div className={cx()}></div>
}

export default function Page() {
  return (
    <>
      <SectionContainer />
      <PageFooter />
    </>
  )
}
