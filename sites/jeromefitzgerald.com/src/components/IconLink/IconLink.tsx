// import { isObject } from '@jeromefitz/utils'
import { Link } from '@jeromefitz/design-system/components'
import _startsWith from 'lodash/startsWith'
import NextLink from 'next/link'

import getNextLink from '~utils/getNextLink'

// @hack(notion) too much customization
const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
const getText = (text: any) => (isObject(text) ? text.props.children : text)

const LinkExternal = (props: any) => {
  const { children, target } = props
  return (
    <Link rel="noopener" target={target || '_blank'} type="icon" {...props}>
      {children}
    </Link>
  )
}

const LinkInternal = (props: any) => {
  const { children, href } = props
  const link = getNextLink(href)
  const text = getText(children)
  return (
    <NextLink as={link.as} href={link.href} passHref>
      <Link type="icon" {...props}>
        {text}
      </Link>
    </NextLink>
  )
}

const IconLinked = (props: any) => {
  const isExternal =
    _startsWith(props.href, 'http', 0) || _startsWith(props.href, 'spotify', 0)
  return isExternal ? <LinkExternal {...props} /> : <LinkInternal {...props} />
}

export default IconLinked
