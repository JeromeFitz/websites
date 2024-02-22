/**
 * @todo(next-notion) you do not _need_ to set this
 *  up but you probably _need_ to set this up, haha
 */
import { Image } from '@jeromefitz/shared/components/Notion/Blocks/Image'

// import dynamic from 'next/dynamic'

// import { lazy } from 'react'
// import { Embed } from '@jeromefitz/shared/components/Notion/Blocks/Embed'
// import { Video } from '@jeromefitz/shared/components/Notion/Blocks/Video'

const custom = {
  caption: {
    className:
      // @note(radix-ui) bg3+text11 passes, not sure what is going on here
      'font-mono mb-2 shadow-sm 2xl:max-w-7xl !bg-[var(--accent-a2)] dark:bg-[var(--accent-a3)]',
  },
  // @note(next)  we are not using this, so no need to take the hit
  // embed: {
  //   className: '',
  //   // component: lazy(() => import('@jeromefitz/shared/components/Notion/Blocks/Embed')),
  //   component: dynamic(
  //     () =>
  //       import('@jeromefitz/shared/components/Notion/Blocks/Embed').then(
  //         (mod) => mod.Embed,
  //       ),
  //     {
  //       ssr: false,
  //     },
  //   ),
  //   // component: Embed,
  //   as: 'div',
  // },
  image: {
    as: 'img',
    className: '',
    // component: lazy(() => import('@jeromefitz/shared/components/Notion/Blocks/Image')),
    component: Image,
  },
  // @note(next)  we are not using this, so no need to take the hit
  // video: {
  //   className: '',
  //   // component: lazy(() => import('@jeromefitz/shared/components/Notion/Blocks/Video')),
  //   component: dynamic(
  //     () =>
  //       import('@jeromefitz/shared/components/Notion/Blocks/Video').then(
  //         (mod) => mod.Video,
  //       ),
  //     {
  //       ssr: false,
  //     },
  //   ),
  //   // component: Video,
  //   as: 'div',
  // },
}

const blocks = {
  bulleted_list: {
    className: 'my-2 flex list-inside list-disc flex-col py-2 font-sans text-base',
  },
  bulleted_list_item: {
    className: 'mb-3 leading-tight',
  },
  callout: {
    className:
      'border-l-[var(--mauve-11)] bg-[var(--mauve-a5)] m-4 rounded border-l-8 p-14 text-xl lg:text-3xl 2xl:max-w-7xl',
  },
  column: {
    className: 'my-3 flex flex-[1_1] flex-col lg:my-3 lg:pr-5 ',
  },
  column_list: {
    className: 'my-4 flex flex-col justify-between lg:flex-row 2xl:max-w-7xl',
  },
  divider: {
    className: 'my-7 h-7 w-full',
  },
  heading_1: {
    as: 'h2',
    className: 'mb-4 text-3xl font-black lg:mb-5 lg:text-4xl font-sans',
  },
  heading_2: {
    as: 'h3',
    className: 'mb-3 text-2xl font-black lg:mb-4 lg:text-3xl font-sans',
  },
  heading_3: {
    as: 'h3',
    className: 'mb-2 text-xl font-black lg:mb-3 lg:text-2xl font-sans',
  },
  numbered_list: {
    className:
      'my-2 flex list-inside list-decimal flex-col py-2 font-sans text-base',
  },
  numbered_list_item: {
    className: 'mb-3 leading-tight',
  },
  paragraph: {
    className:
      'mb-4 text-lg font-normal leading-normal break-words font-sans 2xl:max-w-7xl',
  },
  quote: {
    className:
      'border-l-[var(--accent-11)] bg-[var(--accent-5)] m-4 rounded border-l-8 p-6 text-xl lg:p-14 lg:text-3xl font-sans 2xl:max-w-7xl',
  },
  ...custom,
}

export { blocks }
