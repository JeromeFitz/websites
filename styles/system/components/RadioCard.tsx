import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import React from 'react'

import { styled, CSS } from '~styles/system/stitches.config'

export const RadioCardGroup = styled(RadioGroupPrimitive.Root, {
  display: 'block',
})

const StyledRadioButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$round',
  width: 25,
  height: 25,
  boxShadow: 'inset 0 0 0 1px $colors$slate7',
  flexShrink: 0,
  mr: '$3',
})

const StyledRadioIndicator = styled('div', {
  borderRadius: '$round',
  width: 15,
  height: 15,
  backgroundColor: '$mauve9',
  transform: 'scale(0)',
})

const StyledRadio = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  display: 'flex',
  alignItems: 'center',
  borderRadius: '$2',
  boxShadow: 'inset 0 0 0 1px $colors$slate7',
  p: '$3',
  '@hover': {
    '&:hover': {
      boxShadow: 'inset 0 0 0 1px $colors$slate8',
    },
  },
  '&[data-state="checked"]': {
    boxShadow: 'inset 0 0 0 1px $colors$mauve8, 0 0 0 1px $colors$mauve8 !important',
    [`& ${StyledRadioIndicator}`]: {
      transform: 'scale(1)',
    },
  },
})

type RadioGroupItemPrimitiveProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>
type RadioCardProps = RadioGroupItemPrimitiveProps & { css?: CSS }

// eslint-disable-next-line react/display-name
export const RadioCard = React.forwardRef<
  React.ElementRef<typeof StyledRadio>,
  RadioCardProps
>((props, forwardedRef) => (
  <StyledRadio {...props} ref={forwardedRef}>
    <StyledRadioButton>
      <StyledRadioIndicator />
    </StyledRadioButton>
    {props.children}
  </StyledRadio>
))
