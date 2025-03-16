'use client'
import { InfoCircledIcon } from '@jeromefitz/ds/components/Icon/index'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { NotionEmoji as EmojiWrapper } from 'next-notion/blocks/Emoji'
import { usePathname } from 'next/navigation.js'

const IS_COLOPHON_SHOWN = false

function ContainerFooterClient() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  return (
    <Flex
      className="order-1 flex-none content-start items-start"
      display={{ initial: isHomepage ? 'none' : 'flex' }}
      gap={{ initial: 'unset', md: '9' }}
      height="calc(var(--spacing) * 3)"
      justify={{ initial: 'between', md: IS_COLOPHON_SHOWN ? 'between' : 'end' }}
      mb="2"
      p="0"
      position="relative"
      style={{ opacity: 1 }}
      width="100%"
      wrap="nowrap"
    >
      <Box>
        <Text
          align={{ initial: 'center', md: 'left' }}
          className="font-mono md:mr-1"
          size={{ initial: '1', md: '2' }}
        >
          <Text className="mr-0 size-4 font-sans md:mr-2">
            <EmojiWrapper id={`no-need-2`} text={`©`} />
          </Text>
          <Box as="span" display="inline">
            <Text>Nice Group of People, LLC –&nbsp;</Text>
            <Text className="">{new Date().getFullYear()}</Text>
          </Box>
        </Text>
      </Box>
      <Box display={{ initial: IS_COLOPHON_SHOWN ? 'block' : 'none' }}>
        <Text
          align={{ initial: 'center', md: 'left' }}
          as="span"
          className="font-mono"
          size={{ initial: '1', md: '2' }}
        >
          <Flex className="items-center" gap="2" justify="end">
            <Text>Colophon</Text>
            <InfoCircledIcon />
          </Flex>
        </Text>
      </Box>
    </Flex>
  )
}

export { ContainerFooterClient }
