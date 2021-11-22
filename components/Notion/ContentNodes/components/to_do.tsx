import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import { Flex } from '~styles/system/components'
import { darkTheme, styled } from '~styles/system/stitches.config'

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  backgroundColor: '$colors$gray12',
  width: 25,
  height: 25,
  borderRadius: 4,
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
const Label = styled('label', {
  color: '$colors$gray12',
  fontSize: 15,
  lineHeight: 1,
  userSelect: 'none',
})

// Exports
const Checkbox = StyledCheckbox
const CheckboxIndicator = StyledIndicator

const to_do = ({ content, id }) => {
  return (
    <Flex css={{ alignItems: 'center', my: '$2' }}>
      <Checkbox disabled checked={content.checked} id={id}>
        <CheckboxIndicator>
          <CheckIcon />
        </CheckboxIndicator>
      </Checkbox>
      <Label css={{ paddingLeft: 15 }} htmlFor={id}>
        {content.text[0].plain_text}
      </Label>
    </Flex>
  )
}

export default to_do
