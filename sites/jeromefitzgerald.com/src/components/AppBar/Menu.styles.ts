import {
  // darkTheme,
  keyframes,
  styled,
  Flex,
  SheetClose,
} from '@jeromefitz/design-system'

const slideIn = keyframes({
  from: { transform: '$$transformValue' },
  to: { transform: 'translate3d(0,0,0)' },
})

const slideOut = keyframes({
  from: { transform: 'translate3d(0,0,0)' },
  to: { transform: '$$transformValue' },
})

const RightSlot = styled('div', {
  color: '$colors$slate11',
  marginLeft: 'auto',
  marginRight: '$1',
  paddingLeft: 16,
  verticalAlign: 'center',
  ':focus > &': { color: '$colors$hiContrast' },
  '[data-disabled] &': { color: '$colors$slate8' },
})

const StyledCloseButton = styled(SheetClose, {
  backgroundColor: 'green',
  position: 'absolute',
  bottom: '$4',
  right: '$6',
  zIndex: '9999',
})

const StyledLink = styled('a', Flex, {
  py: '$1',
  textDecoration: 'none',
  width: '100%',
  '& span, & svg': {
    color: '$hiContrast',
  },
})

export { slideIn, slideOut, RightSlot, StyledCloseButton, StyledLink }
