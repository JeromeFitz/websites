import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
// import { PlaygroundPage } from '~components/Playground'

const isDev = process.env.NODE_ENV === 'development'

const PlaygroundPage = dynamic(
  async () => {
    const { PlaygroundPage: Component } = await import('~components/Playground')
    return { default: Component }
  },
  { ssr: true }
)

export default function Page() {
  if (!isDev) notFound()
  return (
    <>
      <PlaygroundPage />
    </>
  )
}
