// @todo(next) esm
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dynamic from 'next/dynamic'
// // // @todo(next) esm
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import { notFound } from 'next/navigation'

import { FourOhFour } from '~app/_errors/404'

const PlaygroundPage = dynamic(
  async () => {
    const { PlaygroundPage: Component } = await import(
      '~components/Playground/index'
    )
    return { default: Component }
  },
  { ssr: false },
)

const isDev = process.env.NODE_ENV === 'development'

export default function Page() {
  // if (!isDev) notFound()
  // @note(next) avoid NEXT_DYNAMIC_NO_SSR_CODE
  if (!isDev) return <FourOhFour isNotPublished={false} segmentInfo={{}} />

  return (
    <>
      <PlaygroundPage />
    </>
  )
}
