import { styled } from '~styles/system/stitches.config'

import { Text } from './Text'

export const Link = styled('a', {
  alignItems: 'center',
  gap: '$1',
  flexShrink: 0,
  outline: 'none',
  textDecorationLine: 'none',
  textUnderlineOffset: '3px',
  textDecorationColor: '$slate4',
  transition: 'all 0.25s ease-in-out',
  '& > strong': { transition: 'all 0.25s ease-in-out' },
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  lineHeight: 'inherit',
  '@hover': {
    '&:hover': {
      textDecorationLine: 'underline',
    },
  },
  '&:focus': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineOffset: '2px',
    textDecorationLine: 'none',
  },
  [`& ${Text}`]: {
    color: 'inherit',
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
        textDecorationColor: '$slate7',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$slate8',
          },
        },
        '&:focus': {
          outlineColor: '$slate8',
        },
      },
      spotify: {
        color: '$spotify-black',
        textDecoration: 'underline',
        textDecorationColor: '$spotify-black',
        '.dark-theme &': {
          color: '$spotify-white',
          textDecorationColor: '$spotify-white',
        },
        '@hover': {
          '&:hover': {
            '& > strong': { color: '$spotify-green' },
            color: '$slate12',
            textDecorationColor: '$spotify-green',
          },
        },
        '&:focus': {
          outlineColor: '$spotify-green',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'contrast',
  },
})
