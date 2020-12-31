import Slugger from 'github-slugger'
import _startsWith from 'lodash/startsWith'
import React from 'react'
import Link from 'next/link'

import getNextLink from '~utils/getNextLink'

const extLink = (props) => {
  /**
   * @todo Determine if it starts with http
   */
  const isExternal = _startsWith(props.href, 'http', 0)
  if (isExternal) {
    const slugger = new Slugger()
    const key = slugger.slug(props.href)
    return (
      <a
        {...props}
        key={key}
        rel="noopener"
        target={props.target || '_blank'}
        className="underline underline-offset-sm underline-thickness-sm"
      />
    )
  } else {
    const link = getNextLink(props.href)
    return (
      <Link as={link.as} href={link.href}>
        <a>{props.children}</a>
      </Link>
    )
  }
}

export default extLink
