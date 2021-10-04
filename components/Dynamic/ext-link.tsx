import cx from 'clsx'
import Slugger from 'github-slugger'
import _startsWith from 'lodash/startsWith'
import NextLink from 'next/link'
import React from 'react'

import Icon from '~components/Icon'
import SplitText from '~components/SplitText'
import getNextLink from '~utils/getNextLink'
import isObject from '~utils/isObject'

import styles from './ext-link.module.css'

// @hack(notion) too much customization
const getText = (text) => (isObject(text) ? text.props.children : text)

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
        aria-label={`Link for ${text}`}
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
          <Icon icon={'ExternalLinkIcon'} />
        </span>
      </a>
    )
  } else {
    const link = getNextLink(props.href)
    const text = getText(props.children)

    return (
      <NextLink as={link.as} href={link.href}>
        <a
          aria-label={`Link for ${text}`}
          className={cx(
            'font-semibold',
            'underline underline-offset-md underline-thickness-sm',
            'hover:text-green-500 dark:hover:text-yellow-200'
          )}
        >
          <SplitText speed={3} splitBy="letter" text={text} />
        </a>
      </NextLink>
    )
  }
}

const nextLink = (props) => {
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
        aria-label={`Link for ${text}`}
        key={key}
        rel="noopener"
        target={props.target || '_blank'}
        className={cx(props?.className, 'font-semibold flex', styles.link)}
      >
        {text}
        <span className="ml-2 mt-1 text-base inline">
          <Icon icon={'ExternalLinkIcon'} />
        </span>
      </a>
    )
  } else {
    const link = getNextLink(props.href)
    const text = getText(props.children)

    return (
      <NextLink as={link.as} href={link.href}>
        <a
          aria-label={`Link for ${text}`}
          className={cx('font-semibold', styles.link)}
        >
          {text}
        </a>
      </NextLink>
    )
  }
}

export { nextLink }

export default extLink
