import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

function CodeGhost({ children }: { children: React.ReactNode }) {
  return <Code variant="ghost">{children}</Code>
}
function CurrentlyItem({
  headline,
  id = '',
  isLoading,
  subline,
}: {
  headline: string
  id?: string
  isLoading: boolean
  subline: string
}) {
  const Component = id === 'events' ? CodeGhost : Text
  return (
    <Skeleton loading={isLoading} minWidth="100%">
      <Heading
        align="left"
        as="h3"
        className="text-accentA-12 transition-colors duration-300 group-hover:text-accentA-11"
        size={{ initial: '3', md: '4' }}
        weight="medium"
      >
        <Component as="span">{headline}</Component>
        <Text className="hidden"> – </Text>
        <br />
        <Text className="line-clamp-1" size={{ initial: '4', md: '5' }}>
          <Text as="span">“</Text>
          <Text as="span" className="pr-0.5">
            <Em>{subline}</Em>
          </Text>
          <Text as="span">”</Text>
        </Text>
      </Heading>
    </Skeleton>
  )
}

export { CurrentlyItem }
