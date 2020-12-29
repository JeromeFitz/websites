import React from 'react'
import components from '~components/Dynamic/dynamic'

function applyTags(tags = [], children, noPTag = false, key) {
  let child = children

  for (const tag of tags) {
    const props: { [key: string]: any } = { key }
    let tagName = tag[0]

    if (noPTag && tagName === 'p') tagName = React.Fragment
    if (tagName === 'c') tagName = 'code'

    if (tagName === 'a') {
      props.href = tag[1]
    }

    // console.dir(`* applyTags: child`)
    // console.dir(props)

    child = React.createElement(components[tagName] || tagName, props, child)
  }
  return child
}

export function textBlock(text = [], noPTag = false, mainKey) {
  const children = []
  let key = 0
  let childKey = `${mainKey}--`

  for (const textItem of text) {
    key++
    if (textItem.length === 1) {
      children.push(textItem)
      continue
    }
    children.push(
      applyTags(textItem[1], textItem[0], noPTag, `${childKey}--${key}`)
    )
  }
  return React.createElement(
    noPTag ? React.Fragment : components.p,
    { key: mainKey },
    ...children,
    noPTag
  )
}
