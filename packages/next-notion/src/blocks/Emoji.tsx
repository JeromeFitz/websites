import { EmojiWrapper } from './Emoji.server.js'
// import { lazy, Suspense } from 'react'

// // @note(next) outside of page.tsx, need to ignore
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

function NotionEmoji({ id, text }) {
  return <EmojiWrapper id={id} text={text} />
}

export { NotionEmoji }
