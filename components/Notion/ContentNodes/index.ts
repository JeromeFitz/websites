import dynamic from 'next/dynamic'

import ContentNodes from './ContentNodes'

const getContentNode = {
  _unsupported: dynamic(() => import('./components/_unsupported')),
  bulleted_list_item: dynamic(() => import('./components/bulleted_list_item')),
  bulleted_list: dynamic(() => import('./components/bulleted_list')),
  callout: dynamic(() => import('./components/callout')),
  checkbox: dynamic(() => import('./components/checkbox')),
  column_list: dynamic(() => import('./components/column_list')),
  column: dynamic(() => import('./components/column')),
  date: dynamic(() => import('./components/date')),
  divider: dynamic(() => import('./components/divider')),
  files: dynamic(() => import('./components/files')),
  heading_1: dynamic(() => import('./components/heading_1')),
  heading_2: dynamic(() => import('./components/heading_2')),
  heading_3: dynamic(() => import('./components/heading_3')),
  image: dynamic(() => import('./components/image')),
  multi_select: dynamic(() => import('./components/multi_select')),
  numbered_list_item: dynamic(() => import('./components/numbered_list_item')),
  numbered_list: dynamic(() => import('./components/numbered_list')),
  paragraph: dynamic(() => import('./components/paragraph')),
  quote: dynamic(() => import('./components/quote')),
  relation: dynamic(() => import('./components/relation')),
  rich_text: dynamic(() => import('./components/rich_text')),
  title: dynamic(() => import('./components/title')),
  to_do: dynamic(() => import('./components/to_do')),
  toggle: dynamic(() => import('./components/toggle')),
  url: dynamic(() => import('./components/url')),
}

export { getContentNode }
export default ContentNodes
