/**
 * @note(next-notion) Default Configuration
 */
// import { lazy } from 'react'
import { Divider } from './blocks/Divider'
import { ListBulleted } from './blocks/ListBulleted'
import { ListColumn } from './blocks/ListColumn'
import { RichText } from './blocks/RichText'

const OBJECTS = { BLOCK: 'block', LIST: 'list' }
const TYPES = {
  BLOCK: 'block',
  CHILD_PAGE: 'child_page',
  COLUMN: 'column',
  BULLETED_LIST_ITEM: 'bulleted_list_item',
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
    // component: lazy(() => import('./blocks/ListBulleted')),
    component: ListBulleted,
    element: 'ul',
    className: '',
  },
  bulleted_list_item: {
    // component: lazy(() => import('./blocks/RichText')),
    component: RichText,
    element: 'li',
    className: '',
  },
  callout: {
    // component: lazy(() => import('./blocks/RichText')),
    component: RichText,
    element: 'blockquote',
    className: '',
  },
  column: {
    component: 'div',
    element: 'div',
    className: '',
  },
  column_list: {
    // component: lazy(() => import('./blocks/ListColumn')),
    component: ListColumn,
    element: 'div',
    className: '',
  },
  divider: {
    // component: lazy(() => import('./blocks/Divider')),
    component: Divider,
    element: 'hr',
    className: '',
  },
  heading_1: {
    // component: lazy(() => import('./blocks/RichText')),
    component: RichText,
    element: 'h1',
    className: '',
  },
  heading_2: {
    // component: lazy(() => import('./blocks/RichText')),
    component: RichText,
    element: 'h2',
    className: '',
  },
  heading_3: {
    // component: lazy(() => import('./blocks/RichText')),
    component: RichText,
    element: 'h3',
    className: '',
  },
  numbered_list: {
    // component: lazy(() => import('./blocks/ListBulleted')),
    component: ListBulleted,
    element: 'ol',
    className: '',
  },
  numbered_list_item: {
    // component: lazy(() => import('./blocks/RichText')),
    component: RichText,
    element: 'li',
    className: '',
  },
  paragraph: {
    // component: lazy(() => import('./blocks/RichText')),
    component: RichText,
    element: 'p',
    className: '',
  },
  quote: {
    // component: lazy(() => import('./blocks/RichText')),
    component: RichText,
    element: 'blockquote',
    className: '',
  },
}

export { blocks, OBJECTS, TYPES }
