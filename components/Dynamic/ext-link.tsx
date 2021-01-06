import React from 'react'
import cx from 'clsx'
import Link from 'next/link'
import Slugger from 'github-slugger'
import _startsWith from 'lodash/startsWith'
import { MdOpenInNew } from 'react-icons/md'

import getNextLink from '~utils/getNextLink'

import SplitText from '~components/SplitText'

const extLink = (props) => {
  /**
   * @todo Determine if it starts with http
   */
  const isExternal =
    _startsWith(props.href, 'http', 0) || _startsWith(props.href, 'spotify', 0)
  if (isExternal) {
    const slugger = new Slugger()
    const key = slugger.slug(props.href)
    const text = props.children
    return (
      <a
        {...props}
        aria-label={text}
        key={key}
        rel="noopener"
        target={props.target || '_blank'}
        className={cx(
          props?.className,
          'font-semibold flex',
          'underline underline-offset-md underline-thickness-sm',
          'hover:text-green-500 dark:hover:text-yellow-200'
        )}
      >
        {/* @hack(notion) If you strike a link, ... der. */}
        {typeof text === 'object' ? (
          text
        ) : (
          <SplitText splitBy="letter" speed={3} text={text} />
        )}{' '}
        <span className="ml-2 mt-1 text-base inline">
          <MdOpenInNew />
        </span>
      </a>
    )
  } else {
    const link = getNextLink(props.href)
    const text = props.children
    return (
      <Link as={link.as} href={link.href}>
        <a
          aria-label={text}
          className={cx(
            'font-semibold',
            'underline underline-offset-md underline-thickness-sm',
            'hover:text-green-500 dark:hover:text-yellow-200'
          )}
        >
          <SplitText speed={3} splitBy="letter" text={text} />
        </a>
      </Link>
    )
  }
}

export default extLink
