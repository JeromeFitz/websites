'use client'
import { useOs } from '@mantine/hooks'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Kbd } from '@radix-ui/themes/dist/esm/components/kbd.js'
import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { useStore as _useStore } from '@/store/index'

const useStore = () => {
  return _useStore((store) => ({
    isCmdkOpen: store.isCmdkOpen,
    isCmdkOpenSet: store.isCmdkOpenSet,
  }))
}

function FooterCmdkClient({ isLoading }) {
  const { isCmdkOpenSet } = useStore()
  const os = useOs()
  const isMac = os === 'macos'
  const key = isMac ? '⌘' : 'Ctrl'
  // const button = isMac ? 'Cmd' : 'Ctrl'
  return (
    <Skeleton loading={isLoading}>
      <Button
        className="gap-2 font-mono hover:cursor-pointer lg:flex"
        highContrast
        onClick={() => {
          isCmdkOpenSet()
        }}
        radius="medium"
        size="3"
        variant="ghost"
      >
        <Text className="text-gray-12 mr-1" size="2">
          Command Menu
        </Text>
        <Box className="gap-1 lg:flex">
          <Kbd className="group-hover:cursor-pointer">{key}</Kbd>
          <Kbd className="group-hover:cursor-pointer">K</Kbd>
        </Box>
      </Button>
    </Skeleton>
  )
}

export { FooterCmdkClient }
