import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import NextLink from 'next/link'

import type { NotionColor } from '@/lib/drizzle/schemas/_notion/types'

import { cx } from '@/utils/cx'

import { CurrentlyItem } from './Currently.Item'

/**
 * @todo(api) book
 */
function CurrentlyItemWrapper({
  titleSub,
  ...c
}: {
  color: NotionColor
  href: string
  icon: any
  id: string
  title: string
  titleSub: string
}) {
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

function CurrentlyWrapper({
  children,
  ...c
}: {
  children: React.ReactNode
  color: NotionColor
  href: string
  icon: any
  id: string
  title: string
}) {
  const color = c.color
  const href = c.href
  const title = c.title

  const Icon = c?.icon

  return (
    <Flex
      align="end"
      className={cx(
        'transition-all duration-300',
        '!transition-all hover:!-translate-y-2',
        '!rounded-sm !shadow-none !transition-all',
      )}
      flexBasis="0px"
      flexGrow="1"
      flexShrink="0"
      height={{ initial: '100%', md: 'calc(var(--spacing) * 64)' }}
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
              '!shadow-[inset_0_0_0_1px_var(--accent-a7)]',
              '!hover:shadow-[inset_0_0_0_1px_var(--accent-a8)]',
            )}
            color={color}
            radius="large"
            variant="soft"
          >
            <NextLink className={cx('')} href={href}>
              <Box mr="3" position="relative" right="0">
                <Icon
                  className={cx(
                    'm-2 rounded-md p-2 text-inherit !opacity-100 md:p-2',
                    'transition-colors',
                    // 'bg-white/75 group-hover:bg-white/95',
                    // 'dark:bg-black/55 dark:group-hover:bg-black/95',
                    'bg-whiteA-10 group-hover:bg-whiteA-9',
                    'dark:bg-blackA-10 dark:group-hover:bg-blackA-9',
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
