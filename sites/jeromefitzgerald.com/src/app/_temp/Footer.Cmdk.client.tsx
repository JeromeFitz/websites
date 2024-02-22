'use client'
import { Tooltip } from '@jeromefitz/ds/components/Tooltip/index'

import { Button, Kbd } from '@radix-ui/themes'

import { useStore as _useStore } from '@/store/index'

const useStore = () => {
  return _useStore((store) => ({
    isCmdkOpen: store.isCmdkOpen,
    isCmdkOpenSet: store.isCmdkOpenSet,
  }))
}

function FooterCmdkClient() {
  const { isCmdkOpenSet } = useStore()
  return (
    <Tooltip description={'Open via Cmd ⌘ + K'}>
      <Button
        className="gap-[0.5rem] group-hover:cursor-pointer lg:flex"
        highContrast
        //
        onClick={() => {
          isCmdkOpenSet()
        }}
        radius="medium"
        size="3"
        variant="ghost"
      >
        <span className="gap-[0.25rem] lg:flex">
          <Kbd className="font-mono group-hover:cursor-pointer">⌘ + K</Kbd>
        </span>
        <p className="text-[var(--mauve-12)]">Command Menu</p>
      </Button>
    </Tooltip>
  )
}

export { FooterCmdkClient }
