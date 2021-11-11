import merge from 'lodash/merge'
import React from 'react'

import { VariantProps, CSS } from '~styles/system/stitches.config'

import { Text } from './Text'

const DEFAULT_TAG = 'h1'

type TextSizeVariants = Pick<VariantProps<typeof Text>, 'size'>
type HeadingSizeVariants = '1' | '2' | '3' | '4'
type HeadingVariants = { size?: HeadingSizeVariants } & Omit<
  VariantProps<typeof Text>,
  'size'
>
type HeadingProps = React.ComponentProps<typeof DEFAULT_TAG> &
  HeadingVariants & { css?: CSS; as?: any }

// eslint-disable-next-line react/display-name
export const Heading = React.forwardRef<
  React.ElementRef<typeof DEFAULT_TAG>,
  HeadingProps
>((props, forwardedRef) => {
  // '2' here is the default heading size variant
  const { size = '1', ...textProps } = props
  // This is the mapping of Heading Variants to Text variants
  const textSize: Record<HeadingSizeVariants, TextSizeVariants['size']> = {
    1: { '@initial': '4', '@bp2': '5' },
    2: { '@initial': '6', '@bp2': '7' },
    3: { '@initial': '7', '@bp2': '8' },
    4: { '@initial': '8', '@bp2': '9' },
  }

  // This is the mapping of Heading Variants to Text css
  const textCss: Record<HeadingSizeVariants, CSS> = {
    1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: '20px',
      '@bp2': { lineHeight: '23px' },
    },
    2: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: '25px',
      '@bp2': { lineHeight: '30px' },
    },
    3: {
      fontWeight: 700,
      letterSpacing: '-0.04em',
      lineHeight: '33px',
      '@bp2': { lineHeight: '41px' },
    },
    4: {
      fontWeight: 700,
      letterSpacing: '-0.05em',
      lineHeight: '35px',
      '@bp2': { lineHeight: '55px' },
    },
  }

  return (
    <Text
      as={DEFAULT_TAG}
      {...textProps}
      ref={forwardedRef}
      size={textSize[size]}
      css={{
        fontVariantNumeric: 'proportional-nums',
        ...merge(textCss[size], props.css),
      }}
    />
  )
})
