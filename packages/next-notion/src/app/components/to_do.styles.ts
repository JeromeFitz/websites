import { darkTheme, styled } from '@jeromefitz/design-system'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type * as Stitches from '@stitches/react'

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  backgroundColor: '$colors$gray12',
  width: 25,
  height: 25,
  borderRadius: '$0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 10px $colors$blackA7`,
  [`.${darkTheme} &`]: {
    boxShadow: `0 2px 10px $colors$whiteA5`,
  },
  '&:hover': { backgroundColor: '$colors$gray7' },
  '&:focus': { boxShadow: `0 0 0 2px black` },
  '&:disabled': {
    backgroundColor: '$slate3',
    pointerEvents: 'none',
    color: '$slate8',
  },
  '&[data-state="checked"]': {
    backgroundColor: '$colors$gray7',
    pointerEvents: 'none',
    color: '$colors$gray7',
    '&:disabled': {
      backgroundColor: '$slate1',
      pointerEvents: 'none',
      color: '$slate2',
    },
  },
})
const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: '$colors$gray12',
})

const cssLabel: Stitches.CSS = {
  color: '$colors$gray12',
  fontSize: 15,
  lineHeight: 1,
  userSelect: 'none',
}
const StyledLabel = styled('label', cssLabel)

/**
 * @exports
 * @todo(types) This is likely not portable. A type annotation is necessary.
 */
const Checkbox: any = StyledCheckbox
const CheckboxIndicator: any = StyledIndicator
const CheckboxLabel: any = StyledLabel

export { Checkbox, CheckboxIndicator, CheckboxLabel }
