import { Box, KBarFooter, Separator } from '@jeromefitz/design-system/components'
import { useFocusTrap } from '@mantine/hooks'
import dynamic from 'next/dynamic'
import * as React from 'react'

const KBarSearch = dynamic(() =>
  import('@jeromefitz/design-system/components').then((mod: any) => mod.KBarSearch)
)
const KBarSearchResults = dynamic(() =>
  import('@jeromefitz/design-system/components').then(
    (mod: any) => mod.KBarSearchResults
  )
)

/**
 * @note must be wrapped by KBarProvider (see: Providers)
 */
const KBar = () => {
  const trap = useFocusTrap()
  return (
    <>
      <Box css={{ py: '$1', px: '$2' }} ref={trap}>
        <KBarSearch />
      </Box>
      <Separator decorative margin="my2" size="full" />
      <Box css={{ px: '$2' }}>
        <KBarSearchResults />
      </Box>
      <Box css={{ display: 'none', '@bp1': { display: 'block' } }}>
        <Separator decorative margin="my2" size="full" />
        <KBarFooter />
      </Box>
      <Box css={{ py: '$2' }} />
    </>
  )
}

export { KBar }
