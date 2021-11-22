import _map from 'lodash/map'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~components/Accordion'

import getContentType from './utils/getContentType'
import getContentTypeDetail from './utils/getContentTypeDetail'

const toggle = ({ content, has_children, id }) => {
  if (!has_children) return null
  const title = getContentTypeDetail({ content, id })
  const nodeContent = _map(content.children, (content) => getContentType(content))
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`toggle`}>
        {/* eslint-disable @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <AccordionTrigger>{title}</AccordionTrigger>
        {/* eslint-disable @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <AccordionContent>{nodeContent}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default toggle
