import { styled } from '@modulz/design-system'
import _startsWith from 'lodash/startsWith'
import NextLink from 'next/link'

import getNextLink from '~utils/getNextLink'
import isObject from '~utils/isObject'

// @hack(notion) too much customization
const getText = (text: any) => (isObject(text) ? text.props.children : text)

const IconLink = styled('a', {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: '$1',
  outline: 0,
  padding: '0 $1',
  margin: '0 -$1',
  '& + &': {
    marginTop: '$2',
  },
  '&:hover': {
    textDecoration: 'underline',
  },
  '&:focus': {
    boxShadow: '0 0 0 1px',
    textDecoration: 'none',
  },
  variants: {
    variant: {
      blue: {
        color: '$blue11',
        textDecorationColor: '$blue4',
        '&:focus': {
          outlineColor: '$blue8',
        },
      },
      subtle: {
        color: '$slate11',
        textDecorationColor: '$slate4',
        '&:focus': {
          outlineColor: '$slate8',
        },
      },
      contrast: {
        color: '$hiContrast',
        textDecoration: 'underline',
        textDecorationColor: '$slate4',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$slate7',
          },
        },
        '&:focus': {
          outlineColor: '$slate8',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'contrast',
  },
})

const LinkExternal = (props: any) => {
  const { children, target } = props
  return (
    <IconLink rel="noopener" target={target || '_blank'} {...props}>
      {children}
    </IconLink>
  )
}

const LinkInternal = (props: any) => {
  const { children, href } = props
  const link = getNextLink(href)
  const text = getText(children)
  return (
    <NextLink as={link.as} href={link.href}>
      <IconLink {...props}>{text}</IconLink>
    </NextLink>
  )
}

const IconLinked = (props: any) => {
  const isExternal =
    _startsWith(props.href, 'http', 0) || _startsWith(props.href, 'spotify', 0)
  return isExternal ? <LinkExternal {...props} /> : <LinkInternal {...props} />
}
export default IconLinked
