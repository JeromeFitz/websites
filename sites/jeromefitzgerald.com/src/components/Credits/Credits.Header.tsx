import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { cx } from '@/utils/cx'

function CreditsHeader({
  subtitle = 'Some of the wonderful people who make it happen.',
  title = 'Info',
}) {
  return (
    <Flex
      className={cx(
        'place-content-start items-start overflow-hidden will-change-transform',
        'rounded-3 rounded-b-[0] border-1 border-gray-7 border-b-0',
      )}
      direction="column"
      flexBasis="auto"
      flexGrow="0"
      flexShrink="0"
      gap="2"
      height="min-content"
      id="container--credits--header"
      p="8"
      pl="4"
      position="relative"
      width="100%"
      wrap="nowrap"
    >
      <Heading
        as="h2"
        className="font-medium text-blackA-11 dark:text-whiteA-11"
        size="6"
      >
        {title}
      </Heading>
      <Text
        className="after:whitespace-pre after:content-['_']"
        color="gray"
        size="3"
      >
        {subtitle}
      </Text>
    </Flex>
  )
}

export { CreditsHeader }
