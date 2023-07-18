import dynamic from 'next/dynamic'
// import { notFound } from 'next/navigation'

import { FourOhFour } from '~app/_errors/404'

const PlaygroundPage = dynamic(
  async () => {
    const { PlaygroundPage: Component } = await import('~components/Playground')
    return { default: Component }
  },
  { ssr: false }
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
