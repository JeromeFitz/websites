/**
 * @todo(next-notion) you do not _need_ to set this
 *  up but you probably _need_ to set this up, haha
 */
import { Image } from '@jeromefitz/shared/components/Notion/Blocks/Image'

// import dynamic from 'next/dynamic.js'

// import { lazy } from 'react'
// import { Embed } from '@jeromefitz/shared/components/Notion/Blocks/Embed'
// import { Video } from '@jeromefitz/shared/components/Notion/Blocks/Video'

const custom = {
  caption: {
    className:
      // @note(radix-ui) bg3+text11 passes, not sure what is going on here
      'font-mono mb-2 shadow-xs 2xl:max-w-7xl !bg-accentA-2 dark:bg-accentA-3',
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
  //       ssr: true,
  //     },
  //   ),
  //   // component: Embed,
  //   as: 'div',
  // },
  image: {
    as: 'img',
    className: 'rounded-3',
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
  //       ssr: true,
  //     },
  //   ),
  //   // component: Video,
  //   as: 'div',
  // },
}

const blocks = {
  bulleted_list: {
    className:
      'my-2 flex list-inside list-disc flex-col py-2 font-sans text-base text-5 md:text-5',
  },
  bulleted_list_item: {
    className: 'mb-3 leading-tight',
  },
  callout: {
    className:
      'border-l-gray-11 bg-grayA-5 m-4 rounded-sm border-l-8 p-14 text-5 md:text-6 2xl:max-w-7xl',
  },
  column: {
    className: 'my-3 flex flex-[1_1] flex-col md:my-3 md:pr-5 ',
  },
  column_list: {
    className: 'my-4 flex flex-col justify-between md:flex-row 2xl:max-w-7xl',
  },
  divider: {
    className: 'my-7 h-7 w-full',
  },
  heading_1: {
    as: 'h2',
    className: 'mb-4 text-8 font-medium md:mb-5 md:text-7 font-sans',
  },
  heading_2: {
    as: 'h3',
    className: 'mb-3 text-7 font-medium md:mb-4 md:text-6 font-sans',
  },
  heading_3: {
    as: 'h3',
    className: 'mb-2 text-6 font-medium md:mb-3 md:text-6 font-sans',
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
      'mb-4 text-5 font-normal leading-normal break-words font-sans 2xl:max-w-7xl',
  },
  quote: {
    className:
      'border-l-accent-11 bg-accent-5 m-4 rounded-sm border-l-8 p-6 text-5 md:p-14 md:text-6 font-sans 2xl:max-w-7xl md:m-0',
  },
  ...custom,
}

export { blocks }
