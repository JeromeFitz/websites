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
    // component: ListBulleted,
    as: 'ul',
    className: '',
    component: lazy(() => import('./blocks/ListBulleted')),
  },
  bulleted_list_item: {
    // component: RichText,
    as: 'li',
    className: '',
    component: lazy(() => import('./blocks/RichText')),
  },
  callout: {
    // component: RichText,
    as: 'blockquote',
    className: '',
    component: lazy(() => import('./blocks/RichText')),
  },
  column: {
    as: 'div',
    className: '',
    component: 'div',
  },
  column_list: {
    // component: ListColumn,
    as: 'div',
    className: '',
    component: lazy(() => import('./blocks/ListColumn')),
  },
  divider: {
    // component: Divider,
    as: 'hr',
    className: '',
    component: lazy(() => import('./blocks/Divider')),
  },
  heading_1: {
    // component: RichText,
    as: 'h1',
    className: '',
    component: lazy(() => import('./blocks/RichText')),
  },
  heading_2: {
    // component: RichText,
    as: 'h2',
    className: '',
    component: lazy(() => import('./blocks/RichText')),
  },
  heading_3: {
    // component: RichText,
    as: 'h3',
    className: '',
    component: lazy(() => import('./blocks/RichText')),
  },
  numbered_list: {
    // component: ListBulleted,
    as: 'ol',
    className: '',
    component: lazy(() => import('./blocks/ListBulleted')),
  },
  numbered_list_item: {
    // component: RichText,
    as: 'li',
    className: '',
    component: lazy(() => import('./blocks/RichText')),
  },
  paragraph: {
    // component: RichText,
    as: 'p',
    className: '',
    component: lazy(() => import('./blocks/RichText')),
  },
  quote: {
    // component: RichText,
    as: 'blockquote',
    className: '',
    component: lazy(() => import('./blocks/RichText')),
  },
}

export { OBJECTS, TYPES, blocks }
