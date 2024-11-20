'use client'
import { InfoCircledIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { NotionEmoji as EmojiWrapper } from 'next-notion/blocks/Emoji'
import { usePathname } from 'next/navigation.js'

function ContainerFooterClient() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  return (
    <Box
      className={cx(
        isHomepage && 'hidden',
        'relative order-1 mb-2 flex h-3 w-full flex-none flex-nowrap content-start items-start justify-between gap-[unset] p-0',
        'md:justify-end md:gap-16',
        // 'md:justify-between',
        // 'overflow-hidden',
      )}
      style={{ opacity: 1 }}
    >
      <Box className={cx('')}>
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
      <Box className={cx('hidden')}>
        <Text
          align={{ initial: 'center', md: 'left' }}
          as="span"
          className="font-mono"
          size={{ initial: '1', md: '2' }}
        >
          <Box className={cx('flex items-center justify-end gap-2')}>
            <Text>Colophon</Text>
            <InfoCircledIcon />
          </Box>
        </Text>
      </Box>
    </Box>
  )
}

export { ContainerFooterClient }
