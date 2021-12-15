import { Box, Separator } from '~styles/system/components'

const divider = () => {
  return (
    <Box css={{ width: '100%', my: '$6' }}>
      <Separator css={{ margin: '0', width: '100% !important' }} />
    </Box>
  )
}

export default divider
