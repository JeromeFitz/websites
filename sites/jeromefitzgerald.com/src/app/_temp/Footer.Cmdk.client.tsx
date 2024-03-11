'use client'
import { useOs } from '@mantine/hooks'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Kbd } from '@radix-ui/themes/dist/esm/components/kbd.js'

import { useStore as _useStore } from '@/store/index'

const useStore = () => {
  return _useStore((store) => ({
    isCmdkOpen: store.isCmdkOpen,
    isCmdkOpenSet: store.isCmdkOpenSet,
  }))
}

function FooterCmdkClient() {
  const { isCmdkOpenSet } = useStore()
  const os = useOs()
  const isMac = os === 'macos'
  const key = isMac ? '⌘' : 'Ctrl'
  // const button = isMac ? 'Cmd' : 'Ctrl'
  return (
    <Button
      className="gap-[0.5rem] group-hover:cursor-pointer lg:flex"
      highContrast
      onClick={() => {
        isCmdkOpenSet()
      }}
      radius="medium"
      size="3"
      variant="ghost"
    >
      <span className="gap-[0.25rem] lg:flex">
        <Kbd className="font-mono group-hover:cursor-pointer">{key} + K</Kbd>
      </span>
      <p className="text-gray-12">Command Menu</p>
    </Button>
  )
}

export { FooterCmdkClient }
