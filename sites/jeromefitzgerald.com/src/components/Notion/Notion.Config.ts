/**
 * @todo(next-notion) you do not _need_ to set this
 *  up but you probably _need_ to set this up, haha
 */
import { lazy } from 'react'

const custom = {
  embed: {
    component: lazy(() => import('./Blocks/Embed')),
    element: 'div',
    className: '',
  },
  image: {
    component: lazy(() => import('./Blocks/Image')),
    element: 'img',
    className: '',
  },
  video: {
    component: lazy(() => import('./Blocks/Video')),
    element: 'div',
    className: '',
  },
}

const blocks = {
  bulleted_list: {
    element: 'ul',
    className: 'my-2 flex list-inside list-disc flex-col py-2',
  },
  bulleted_list_item: {
    element: 'li',
    className: 'mb-3 leading-tight',
  },
  callout: {
    element: 'blockquote',
    className:
      'border-l-radix-green11 bg-radix-pinkA5 m-4 rounded border-l-8 p-14 text-xl md:text-3xl',
  },
  column: {
    element: 'div',
    className: 'my-3 flex flex-[1_1] flex-col md:my-3 md:pr-5',
  },
  column_list: {
    element: 'div',
    className: 'my-4 flex flex-col justify-between md:flex-row',
  },
  divider: {
    element: 'hr',
    className: 'my-7 h-7 w-full',
  },
  heading_1: {
    element: 'h1',
    className: 'mb-4 text-3xl font-black md:mb-5 md:text-4xl',
  },
  heading_2: {
    element: 'h2',
    className: 'mb-3 text-2xl font-black md:mb-4 md:text-3xl',
  },
  heading_3: {
    element: 'h3',
    className: 'mb-2 text-xl font-black md:mb-3 md:text-2xl',
  },
  numbered_list: {
    element: 'ol',
    className: 'my-2 flex list-inside list-decimal flex-col py-2',
  },
  numbered_list_item: {
    element: 'li',
    className: 'mb-3 leading-tight',
  },
  paragraph: {
    element: 'p',
    className: 'mb-4 text-lg font-normal leading-normal break-words',
  },
  quote: {
    element: 'blockquote',
    className:
      'border-l-radix-pink11 bg-radix-greenA5 m-4 rounded border-l-8 p-6 text-xl md:p-14 md:text-3xl',
  },
  ...custom,
}

export { blocks }
