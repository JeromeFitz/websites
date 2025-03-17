import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import { CurrentlyItem } from './Currently.Item'

/**
 * @todo(api) book
 */
function CurrentlyItemWrapper({ titleSub, ...c }) {
  const { color, href, icon, id, title } = c
  const propsParent = { color, href, icon, id, title }

  const isLoading = false
  const headline = isLoading ? '' : titleSub[0]
  const subline = isLoading ? '' : titleSub[1]

  const props = {
    headline,
    id,
    isLoading,
    subline,
  }

  return (
    <CurrentlyWrapper {...propsParent}>
      <CurrentlyItem {...props} />
    </CurrentlyWrapper>
  )
}

function CurrentlyWrapper({ children, ...c }) {
  const color = c.color
  const href = c.href
  // const id = c.id
  const title = c.title

  const Icon = c?.icon

  return (
    <Flex
      align="end"
      className="rounded-md"
      flexBasis="0px"
      flexGrow="1"
      flexShrink="0"
      height={{ initial: '100%', md: 'calc(var(--spacing) * 64)' }}
      // maxWidth={{ md: '308px' }}
      // minWidth={{ md: '308px' }}
      position="relative"
      style={{ opacity: 1, transform: 'none' }}
      width="100%"
    >
      <Box className={cx('contents h-[inherit] w-[inherit]')}>
        <Flex
          align="end"
          asChild
          className=""
          direction="column"
          height="100%"
          justify="between"
          pb="5"
          position="relative"
          pt="4"
          px="0"
          width="100%"
          wrap="nowrap"
        >
          <Button
            asChild
            className={cx(
              'group content-end',
              'hover:-translate-y- transition-transform',
            )}
            color={color}
            variant="soft"
          >
            <NextLink href={href}>
              <Box mr="3" position="relative" right="0">
                <Icon
                  className={cx(
                    'm-2 rounded-md p-2 text-inherit !opacity-100 md:p-2',
                    'transition-colors',
                    'bg-white/95 group-hover:bg-white/75',
                    'dark:bg-black/95 dark:group-hover:bg-black/55',
                    '!md:size-12 !size-10',
                  )}
                />
              </Box>
              <Flex
                className="place-content-start items-start"
                direction="column"
                gap="1"
                height="min-content"
                justify="start"
                pl="6"
                position="relative"
                pr="3"
                py="0"
                width="100%"
                wrap="nowrap"
              >
                <Heading
                  align="left"
                  as="h3"
                  className={cx('font-mono font-medium uppercase')}
                  highContrast
                  mb="2"
                  size="1"
                >
                  {title}
                </Heading>
                {children}
              </Flex>
            </NextLink>
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export { CurrentlyItemWrapper, CurrentlyWrapper }
