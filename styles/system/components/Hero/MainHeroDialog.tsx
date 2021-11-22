import * as DialogPrimitive from '@radix-ui/react-dialog-rc'
import { Cross2Icon } from '@radix-ui/react-icons'
import React from 'react'

import { DemoButton } from '../Button/DemoButton'
import { DemoIconButton } from '../Button/DemoIconButton'

import { Flex, Text } from '~styles/system/components'
import { styled } from '~styles/system/stitches.config'

const DialogContent = styled(DialogPrimitive.Content, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bc: '$loContrast',
  br: '$2',
  py: 10,
  px: 10,
  marginTop: -15,
  boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.1)',

  '& ::selection': {
    backgroundColor: '$blueA5',
  },
})

export function MainHeroDialog() {
  // We prevent the initial auto focus because it's a demo rather than a real UI,
  // so the parent page focus is not stolen.
  const initialAutoFocusPrevented = React.useRef(false)

  return (
    <DialogPrimitive.Root modal={false} defaultOpen>
      <DialogPrimitive.Trigger asChild>
        <DemoButton>Open Dialog</DemoButton>
      </DialogPrimitive.Trigger>

      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => {
          // We prevent the initial auto focus because it's a demo rather than a real UI,
          // so the parent page focus is not stolen.
          if (initialAutoFocusPrevented.current === false) {
            event.preventDefault()
            initialAutoFocusPrevented.current = true
          }
        }}
      >
        <DialogPrimitive.Title asChild>
          <Text
            as="h2"
            size="4"
            css={{ fontWeight: '500', mb: '$2', lineHeight: 1.2 }}
          >
            Dialog
          </Text>
        </DialogPrimitive.Title>

        <Text size="2" css={{ lineHeight: 1.5, mb: '$2' }}>
          Far far away, behind the word mountains, far from the countries Vokalia and
          Consonantia, there live the blind texts.
        </Text>

        <Flex justify="end" gap="2">
          <DialogPrimitive.Close asChild>
            <DemoButton variant="gray">OK</DemoButton>
          </DialogPrimitive.Close>

          <DialogPrimitive.Close asChild>
            <DemoButton variant="gray">Cancel</DemoButton>
          </DialogPrimitive.Close>

          <DialogPrimitive.Close asChild>
            <DemoIconButton>
              <Cross2Icon />
            </DemoIconButton>
          </DialogPrimitive.Close>
        </Flex>
      </DialogContent>
    </DialogPrimitive.Root>
  )
}
