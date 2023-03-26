import { lazy } from 'react'

import { CONTENT_NODE_TYPES } from './constants'
import ContentNodes from './ContentNodes'

const {
  UNSUPPORTED,
  BULLETED_LIST_ITEM,
  BULLETED_LIST,
  CALLOUT,
  CHECKBOX,
  CODE,
  COLUMN_LIST,
  COLUMN,
  DATE,
  DIVIDER,
  FILES,
  HEADING_1,
  HEADING_2,
  HEADING_3,
  IMAGE,
  LINK,
  MULTI_SELECT,
  NUMBERED_LIST_ITEM,
  NUMBERED_LIST,
  PARAGRAPH,
  QUOTE,
  RELATION,
  RICH_TEXT,
  TITLE,
  TO_DO,
  TOGGLE,
  URL,
} = CONTENT_NODE_TYPES

// @todo(types) This is likely not portable. A type annotation is necessary.
const getContentNode: any = {
  [UNSUPPORTED]: lazy(() => import('./components/_unsupported')),
  //
  [BULLETED_LIST_ITEM]: lazy(() => import('./components/bulleted_list_item')),
  [BULLETED_LIST]: lazy(() => import('./components/bulleted_list')),
  [CALLOUT]: lazy(() => import('./components/callout')),
  [CHECKBOX]: lazy(() => import('./components/checkbox')),
  [CODE]: lazy(() => import('./components/code')),
  [COLUMN_LIST]: lazy(() => import('./components/column_list')),
  [COLUMN]: lazy(() => import('./components/column')),
  [DATE]: lazy(() => import('./components/date')),
  [DIVIDER]: lazy(() => import('./components/divider')),
  [FILES]: lazy(() => import('./components/files')),
  [HEADING_1]: lazy(() => import('./components/heading_1')),
  [HEADING_2]: lazy(() => import('./components/heading_2')),
  [HEADING_3]: lazy(() => import('./components/heading_3')),
  [IMAGE]: lazy(() => import('./components/image')),
  [LINK]: lazy(() => import('./components/link')),
  [MULTI_SELECT]: lazy(() => import('./components/multi_select')),
  [NUMBERED_LIST_ITEM]: lazy(() => import('./components/numbered_list_item')),
  [NUMBERED_LIST]: lazy(() => import('./components/numbered_list')),
  [PARAGRAPH]: lazy(() => import('./components/paragraph')),
  [QUOTE]: lazy(() => import('./components/quote')),
  [RELATION]: lazy(() => import('./components/relation')),
  [RICH_TEXT]: lazy(() => import('./components/rich_text')),
  [TITLE]: lazy(() => import('./components/title')),
  [TO_DO]: lazy(() => import('./components/to_do')),
  [TOGGLE]: lazy(() => import('./components/toggle')),
  [URL]: lazy(() => import('./components/url')),
}

const getObjectReturn = {}

export { getContentNode, getObjectReturn, ContentNodes, CONTENT_NODE_TYPES }
