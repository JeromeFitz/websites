import { styled } from '@jeromefitz/design-system/stitches.config'

const LinkHighlight = styled('a', {
  display: 'block',
  color: '$hiContrast',
  textDecoration: 'none',
  outline: 0,
  p: '$2',
  br: '$2',
  '@hover': {
    '&:hover': {
      backgroundColor: '$slateA3',
    },
  },
  '&:focus': {
    boxShadow: '0 0 0 2px $colors$slateA8',
  },
  '&:focus:not(:focus-visible)': {
    boxShadow: 'none',
  },
  variants: {
    variant: {
      contrast: {
        backgroundColor: '$slateA2',
        boxShadow: '0 0 0 2px $colors$slateA7',
        // color: '$slate12',
      },
      subtle: {
        // color: '$hiContrast',
      },
    },
  },
  defaultVariants: {
    variant: 'subtle',
  },
})

export { LinkHighlight }
