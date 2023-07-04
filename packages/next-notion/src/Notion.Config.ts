/**
 * @note(next-notion) Default Configuration
 */
import { lazy } from 'react'

const OBJECTS = { BLOCK: 'block', LIST: 'list' }
const TYPES = {
  BLOCK: 'block',
  CHILD_PAGE: 'child_page',
  COLUMN: 'column',
  BULLETED_LIST_ITEM: 'bulleted_list_item',
  NUMBERED_LIST_ITEM: 'numbered_list_item',
}

const blocks = {
  bulleted_list: {
    component: lazy(() => import('./blocks/ListBulleted')),
    element: 'ul',
    className: '',
  },
  bulleted_list_item: {
    component: lazy(() => import('./blocks/RichText')),
    element: 'li',
    className: '',
  },
  callout: {
    component: lazy(() => import('./blocks/RichText')),
    element: 'blockquote',
    className: '',
  },
  column: {
    component: 'div',
    element: 'div',
    className: '',
  },
  column_list: {
    component: lazy(() => import('./blocks/ListColumn')),
    element: 'div',
    className: '',
  },
  divider: {
    component: lazy(() => import('./blocks/Divider')),
    element: 'hr',
    className: '',
  },
  heading_1: {
    component: lazy(() => import('./blocks/RichText')),
    element: 'h1',
    className: '',
  },
  heading_2: {
    component: lazy(() => import('./blocks/RichText')),
    element: 'h2',
    className: '',
  },
  heading_3: {
    component: lazy(() => import('./blocks/RichText')),
    element: 'h3',
    className: '',
  },
  numbered_list: {
    component: lazy(() => import('./blocks/ListBulleted')),
    element: 'ol',
    className: '',
  },
  numbered_list_item: {
    component: lazy(() => import('./blocks/RichText')),
    element: 'li',
    className: '',
  },
  paragraph: {
    component: lazy(() => import('./blocks/RichText')),
    element: 'p',
    className: '',
  },
  quote: {
    component: lazy(() => import('./blocks/RichText')),
    element: 'blockquote',
    className: '',
  },
}

export { blocks, OBJECTS, TYPES }
