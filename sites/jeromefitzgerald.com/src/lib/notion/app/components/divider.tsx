import { Box, Separator } from '@jeromefitz/design-system/components'

const divider = () => {
  return (
    <Box css={{ width: '100%', my: '$6' }}>
      <Separator decorative size="full" />
    </Box>
  )
}

export default divider
