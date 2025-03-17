import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

function UL({ children, className = '' }) {
  return (
    <Flex asChild className={className} direction="column" gap="4">
      <ul>{children}</ul>
    </Flex>
  )
}

export { UL }
