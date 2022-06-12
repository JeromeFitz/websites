import { Box, Separator } from '@jeromefitz/design-system'

const divider = () => {
  return (
    <Box css={{ width: '100%', my: '$7' }}>
      <Separator decorative size="full" />
    </Box>
  )
}

export default divider
