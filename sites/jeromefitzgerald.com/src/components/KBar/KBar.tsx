import { Box, Separator } from '@jeromefitz/design-system'
import { KBarFooter } from '@jeromefitz/design-system/custom'
import { useFocusTrap } from '@mantine/hooks'
import dynamic from 'next/dynamic'
import * as React from 'react'

const KBarSearch = dynamic(() =>
  import('@jeromefitz/design-system/custom').then((mod: any) => mod.KBarSearch)
)
const KBarSearchResults = dynamic(() =>
  import('@jeromefitz/design-system/custom').then(
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
      <Box css={{ py: '$2', px: '$3' }} ref={trap}>
        {/* <KBarSearch defaultPlaceholder="Type to search menu" /> */}
        <KBarSearch />
      </Box>
      <Separator decorative my="3" size="full" />
      <Box css={{ px: '$4' }}>
        <KBarSearchResults />
      </Box>
      <Box css={{ display: 'none', '@bp1': { display: 'block' } }}>
        <Separator decorative my="3" size="full" />
        <KBarFooter />
      </Box>
      <Box css={{ py: '$3' }} />
    </>
  )
}

export { KBar }
