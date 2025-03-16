import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

function OL({ children, className = '' }) {
  return (
    <Flex asChild className={className} direction="column" gap="4">
      <ol>{children}</ol>
    </Flex>
  )
}

export { OL }
