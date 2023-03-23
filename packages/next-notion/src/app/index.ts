import dynamic from 'next/dynamic'

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
  [UNSUPPORTED]: dynamic(() => import('./components/_unsupported')),
  //
  [BULLETED_LIST_ITEM]: dynamic(() => import('./components/bulleted_list_item')),
  [BULLETED_LIST]: dynamic(() => import('./components/bulleted_list')),
  [CALLOUT]: dynamic(() => import('./components/callout')),
  [CHECKBOX]: dynamic(() => import('./components/checkbox')),
  [CODE]: dynamic(() => import('./components/code')),
  [COLUMN_LIST]: dynamic(() => import('./components/column_list')),
  [COLUMN]: dynamic(() => import('./components/column')),
  [DATE]: dynamic(() => import('./components/date')),
  [DIVIDER]: dynamic(() => import('./components/divider')),
  [FILES]: dynamic(() => import('./components/files')),
  [HEADING_1]: dynamic(() => import('./components/heading_1')),
  [HEADING_2]: dynamic(() => import('./components/heading_2')),
  [HEADING_3]: dynamic(() => import('./components/heading_3')),
  [IMAGE]: dynamic(() => import('./components/image')),
  [LINK]: dynamic(() => import('./components/link')),
  [MULTI_SELECT]: dynamic(() => import('./components/multi_select')),
  [NUMBERED_LIST_ITEM]: dynamic(() => import('./components/numbered_list_item')),
  [NUMBERED_LIST]: dynamic(() => import('./components/numbered_list')),
  [PARAGRAPH]: dynamic(() => import('./components/paragraph')),
  [QUOTE]: dynamic(() => import('./components/quote')),
  [RELATION]: dynamic(() => import('./components/relation')),
  [RICH_TEXT]: dynamic(() => import('./components/rich_text')),
  [TITLE]: dynamic(() => import('./components/title')),
  [TO_DO]: dynamic(() => import('./components/to_do')),
  [TOGGLE]: dynamic(() => import('./components/toggle')),
  [URL]: dynamic(() => import('./components/url')),
}

const getObjectReturn = {}

export { getContentNode, getObjectReturn, ContentNodes, CONTENT_NODE_TYPES }
