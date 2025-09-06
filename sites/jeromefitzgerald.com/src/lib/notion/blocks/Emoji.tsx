import { EmojiWrapper } from './Emoji.server'

// import { lazy, Suspense } from 'react'

// // @note(next) outside of page.tsx, need to ignore
//
// // @ts-ignore
// const EmojiWrapper = lazy(() => import('./Emoji.client'))

// function NotionEmoji({ id, text }) {
//   return (
//     <>
//       <Suspense fallback={<>{text}</>}>
//         <EmojiWrapper id={id} text={text} />
//       </Suspense>
//     </>
//   )
// }

function NotionEmoji({ id, text }: { id: string; text: string }) {
  return <EmojiWrapper id={id} text={text} />
}

export { NotionEmoji }
