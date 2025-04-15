import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import NextLink from 'next/link'

export default function NotFound() {
  const item = {
    id: '404',
    subtitle: 'Not Found',
    title: '404',
  }

  return (
    <>
      <Flex
        align="start"
        asChild
        direction="column"
        gap="1"
        justify="between"
        key={item.id}
        my="4"
        py="2"
        width="100%"
      >
        <section>
          <Heading as="h2" highContrast size="5">
            “{item.title}”
          </Heading>
          <Heading as="h3" highContrast size="4">
            {item.subtitle}
          </Heading>
          <hr className="my-2 w-full" />
          <Text>Nothing so see here.</Text>
          <Link asChild highContrast>
            <NextLink href="/">Go Home</NextLink>
          </Link>
        </section>
      </Flex>
    </>
  )
}
