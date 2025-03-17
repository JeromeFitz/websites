import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

import { ContainerFooterClient } from './Container.Footer.Client'
import { Currently } from './Currently'

function ContainerFooter() {
  return (
    <Flex
      className="z-0 md:z-10"
      direction="row"
      flexBasis="auto"
      flexGrow="0"
      flexShrink="0"
      height="100%"
      position="relative"
      style={{ opacity: 1, transform: 'perspective(1200px)' }}
      width="100%"
    >
      <Box className="contents size-full">
        <Flex
          asChild
          className="place-content-start items-start overflow-visible"
          direction="column"
          gap="9"
          height="min-content"
          p="0"
          pb={{ md: '0' }}
          position="relative"
          pt={{ md: '9' }}
          px={{ md: '0' }}
          style={{ opacity: 1 }}
          width="100%"
          wrap="nowrap"
        >
          <footer>
            <Currently />
            <ContainerFooterClient />
          </footer>
        </Flex>
      </Box>
    </Flex>
  )
}

export { ContainerFooter }
