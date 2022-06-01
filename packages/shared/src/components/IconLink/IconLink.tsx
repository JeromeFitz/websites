// import { isObject } from '@jeromefitz/utils'
import { Link } from '@jeromefitz/design-system'
import _startsWith from 'lodash/startsWith'
import { getNextLink } from 'next-notion/src/utils'
import NextLink from 'next/link'

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

const IconLink = (props: any) => {
  const isExternal =
    _startsWith(props.href, 'http', 0) || _startsWith(props.href, 'spotify', 0)
  return isExternal ? <LinkExternal {...props} /> : <LinkInternal {...props} />
}

export { IconLink }
