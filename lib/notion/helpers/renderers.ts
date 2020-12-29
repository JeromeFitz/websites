import React from 'react'
import components from '~components/Dynamic/dynamic'

function applyTags({ children, key, pTagRender = false, tags = [] }) {
  let child = children

  for (const tag of tags) {
    const props: { [key: string]: any } = { key }
    let tagName = tag[0]

    if (!pTagRender && tagName === 'p') tagName = React.Fragment
    if (tagName === 'c') tagName = 'code'

    if (tagName === 'a') {
      props.href = tag[1]
    }

    child = React.createElement(components[tagName] || tagName, props, child)
  }
  return child
}

export function textBlock({ parentKey, pTagRender = true, text = [] }) {
  const children = []
  let key = 0
  const childKey = `${parentKey}--`

  for (const textItem of text) {
    key++
    if (textItem.length === 1) {
      children.push(textItem)
      continue
    }
    children.push(
      applyTags({
        children: textItem[0],
        key: `${childKey}--${key}`,
        pTagRender,
        tags: textItem[1],
      })
    )
  }

  return React.createElement(
    pTagRender ? components.p : components.span,
    { key: parentKey },
    // null,
    ...children
  )
}
