import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'

import { Box, Text } from '~styles/system/components'
import { styled } from '~styles/system/stitches.config'

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> &
  React.ComponentProps<typeof TooltipPrimitive.Content> & {
    children: React.ReactElement
    content: React.ReactNode
    multiline?: boolean
  }

const Content = styled(TooltipPrimitive.Content, {
  backgroundColor: '$transparentPanel',
  borderRadius: '$1',
  padding: '$1 $2',

  variants: {
    multiline: {
      true: {
        maxWidth: 250,
        pb: 7,
      },
    },
  },
})

function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  multiline,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

      <Content
        side="top"
        align="center"
        sideOffset={5}
        {...props}
        multiline={multiline}
      >
        <Text
          size="1"
          as="p"
          css={{
            color: '$loContrast',
            lineHeight: multiline ? '20px' : (undefined as any),
          }}
        >
          {content}
        </Text>
        <Box css={{ color: '$transparentExtreme' }}>
          <TooltipPrimitive.Arrow
            offset={5}
            width={11}
            height={5}
            style={{
              fill: 'currentColor',
            }}
          />
        </Box>
      </Content>
    </TooltipPrimitive.Root>
  )
}

export default Tooltip
