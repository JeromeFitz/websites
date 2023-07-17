/**
 * @todo(next-notion) you do not _need_ to set this
 *  up but you probably _need_ to set this up, haha
 */
import { Image } from '@jeromefitz/shared/src/components/Notion/Blocks/Image'
import dynamic from 'next/dynamic'

// import { lazy } from 'react'
// import { Embed } from '@jeromefitz/shared/src/components/Notion/Blocks/Embed'
// import { Video } from '@jeromefitz/shared/src/components/Notion/Blocks/Video'

const custom = {
  embed: {
    component: dynamic(
      () =>
        import('@jeromefitz/shared/src/components/Notion/Blocks/Embed').then(
          (mod) => mod.Embed
        ),
      {
        ssr: false,
      }
    ),
    // component: lazy(() => import('@jeromefitz/shared/src/components/Notion/Blocks/Embed')),
    // component: Embed,
    element: 'div',
    className: '',
  },
  image: {
    // component: lazy(() => import('@jeromefitz/shared/src/components/Notion/Blocks/Image')),
    component: Image,
    element: 'img',
    className: '',
  },
  video: {
    component: dynamic(
      () =>
        import('@jeromefitz/shared/src/components/Notion/Blocks/Video').then(
          (mod) => mod.Video
        ),
      {
        ssr: false,
      }
    ),
    // component: lazy(() => import('@jeromefitz/shared/src/components/Notion/Blocks/Video')),
    // component: Video,
    element: 'div',
    className: '',
  },
}

const blocks = {
  bulleted_list: {
    className: 'my-2 flex list-inside list-disc flex-col py-2',
  },
  bulleted_list_item: {
    className: 'mb-3 leading-tight',
  },
  callout: {
    className:
      'border-l-radix-slate11 bg-radix-slateA5 m-4 rounded border-l-8 p-14 text-xl md:text-3xl',
  },
  column: {
    className: 'my-3 flex flex-[1_1] flex-col md:my-3 md:pr-5',
  },
  column_list: {
    className: 'my-4 flex flex-col justify-between md:flex-row',
  },
  divider: {
    className: 'my-7 h-7 w-full',
  },
  heading_1: {
    className: 'mb-4 text-3xl font-black md:mb-5 md:text-4xl',
  },
  heading_2: {
    className: 'mb-3 text-2xl font-black md:mb-4 md:text-3xl',
  },
  heading_3: {
    className: 'mb-2 text-xl font-black md:mb-3 md:text-2xl',
  },
  numbered_list: {
    className: 'my-2 flex list-inside list-decimal flex-col py-2',
  },
  numbered_list_item: {
    className: 'mb-3 leading-tight',
  },
  paragraph: {
    className: 'mb-4 text-lg font-normal leading-normal break-words',
  },
  quote: {
    className:
      'border-l-radix-pink11 bg-radix-pinkA5 m-4 rounded border-l-8 p-6 text-xl md:p-14 md:text-3xl',
  },
  ...custom,
}

export { blocks }
