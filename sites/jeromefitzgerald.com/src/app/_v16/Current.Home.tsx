import { Em, Flex, Text } from '@radix-ui/themes'

import { cx } from '@/utils/cx'

const CurrentHome = ({
  disabled = false,
  headline,
  subline,
}: {
  disabled?: boolean
  headline: string
  subline: string
}) => {
  return (
    <Flex
      align="center"
      asChild
      gap="1"
      className={cx(
        'truncate',
        'text-gray-11 transition-colors duration-300',
        !disabled && 'text-accentA-12 group-hover:text-accentA-11',
      )}
      width="100%"
    >
      <Text size={{ initial: '1', md: '3' }}>
        {headline.length === 0 ? (
          <Em>{subline}</Em>
        ) : (
          <>
            <Flex className="truncate">
              <Text as="span">“</Text>
              <Text as="span" className="truncate pr-0.5">
                <Em>{subline}</Em>
              </Text>
              <Text as="span">”</Text>
            </Flex>
            <Text as="span" className="truncate" weight="light">
              –
            </Text>
            <Text
              as="span"
              className="truncate"
              size={{ initial: '1', md: '3' }}
              weight="light"
            >
              {headline}
            </Text>
          </>
        )}
      </Text>
    </Flex>
  )
}

export { CurrentHome }
