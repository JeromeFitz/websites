import { Box } from '@jeromefitz/design-system/components'

const NavSkip = () => {
  return (
    <Box
      as="a"
      href="#main"
      id="skip-link"
      css={{
        position: 'relative',
        left: '0',
        top: '0',
        right: 'auto',
        bottom: 'auto',
        zIndex: '10',
        display: 'block',
        width: '100%',
        height: '40px',
        marginTop: '-40px',
        padding: '8px',
        backgroundColor: '$colors$violet9',
        color: 'white',
        fontSize: '.9rem',
        lineHeight: '1.5',
        fontWeight: '500',
        textAlign: 'center',
        '&:focus': {
          mt: 0,
          outline: 0,
        },
        '&:focus:not(:focus-visible)': {
          outline: 0,
        },
      }}
    >
      Skip to main content
    </Box>
  )
}

export { NavSkip }
