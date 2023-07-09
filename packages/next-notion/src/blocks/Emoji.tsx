// import dynamic from 'next/dynamic'
import { lazy, Suspense } from 'react'

// const EmojiWrapper = dynamic(
//   // @note(next) outside of page.tsx, need to ignore
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   async () => {
//     const { EmojiWrapper: Component } = await import('./Emoji.client')
//     return { default: Component }
//   },
//   {
//     ssr: false,
//   }
// )

// @note(next) outside of page.tsx, need to ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const EmojiWrapper = lazy(() => import('./Emoji.client'))

function NotionEmoji({ id, text }) {
  return (
    <>
      <Suspense fallback={<>{text}</>}>
        <EmojiWrapper id={id} text={text} />
      </Suspense>
    </>
  )
}

export { NotionEmoji }
