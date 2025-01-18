import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

function CreditsHeader({
  subtitle = 'Some of the wonderful people who make it happen.',
  title = 'Info',
}) {
  return (
    <Box
      className={cx(
        'relative flex h-min w-full flex-none flex-col flex-nowrap place-content-start items-start gap-2 overflow-hidden p-8 pl-4 will-change-transform',
        'border-1 border-gray-7',
        'rounded-3 rounded-b-[0] border-b-0',
        // 'hidden',
        '',
      )}
      id="container--credits--header"
    >
      <Heading
        as="h2"
        className="text-blackA-11 dark:text-whiteA-11 font-medium"
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
    </Box>
  )
}

export { CreditsHeader }
