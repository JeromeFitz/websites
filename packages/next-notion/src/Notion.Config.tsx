/**
 * @note(next-notion) Default Configuration
 */
import { lazy } from 'react'
// import { Divider } from './blocks/Divider'
// import { ListBulleted } from './blocks/ListBulleted'
// import { ListColumn } from './blocks/ListColumn'
// import { RichText } from './blocks/RichText'

const OBJECTS = { BLOCK: 'block', LIST: 'list' }
const TYPES = {
  BLOCK: 'block',
  BULLETED_LIST_ITEM: 'bulleted_list_item',
  CHILD_PAGE: 'child_page',
  COLUMN: 'column',
  NUMBERED_LIST_ITEM: 'numbered_list_item',
}

/**
 * blocks left:
 * - audio
 * - bookmark
 * - breadcrumb
 * - code
 * - divider
 * - embed
 * - equation
 * - image
 * - link_to_page
 * - pdf
 * - synced_block
 * - table_of_contents
 * - table_row
 * - template
 * - to_do
 * - toggle
 * - video
 */
const blocks = {
  bulleted_list: {
    className: '',
    component: lazy(() => import('./blocks/ListBulleted')),
    // component: ListBulleted,
    element: 'ul',
  },
  bulleted_list_item: {
    className: '',
    component: lazy(() => import('./blocks/RichText')),
    // component: RichText,
    element: 'li',
  },
  callout: {
    className: '',
    component: lazy(() => import('./blocks/RichText')),
    // component: RichText,
    element: 'blockquote',
  },
  column: {
    className: '',
    component: 'div',
    element: 'div',
  },
  column_list: {
    className: '',
    component: lazy(() => import('./blocks/ListColumn')),
    // component: ListColumn,
    element: 'div',
  },
  divider: {
    className: '',
    component: lazy(() => import('./blocks/Divider')),
    // component: Divider,
    element: 'hr',
  },
  heading_1: {
    className: '',
    component: lazy(() => import('./blocks/RichText')),
    // component: RichText,
    element: 'h1',
  },
  heading_2: {
    className: '',
    component: lazy(() => import('./blocks/RichText')),
    // component: RichText,
    element: 'h2',
  },
  heading_3: {
    className: '',
    component: lazy(() => import('./blocks/RichText')),
    // component: RichText,
    element: 'h3',
  },
  numbered_list: {
    className: '',
    component: lazy(() => import('./blocks/ListBulleted')),
    // component: ListBulleted,
    element: 'ol',
  },
  numbered_list_item: {
    className: '',
    component: lazy(() => import('./blocks/RichText')),
    // component: RichText,
    element: 'li',
  },
  paragraph: {
    className: '',
    component: lazy(() => import('./blocks/RichText')),
    // component: RichText,
    element: 'p',
  },
  quote: {
    className: '',
    component: lazy(() => import('./blocks/RichText')),
    // component: RichText,
    element: 'blockquote',
  },
}

export { OBJECTS, TYPES, blocks }
