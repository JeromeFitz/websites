import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import NextLink from 'next/link'

import { ArrowTopRightIcon } from '@/components/Icon/index'
import { cx } from '@/utils/cx'

function ArticleMainCTA({ color = 'accent', href = '/events', type = 'events' }) {
  return (
    <Box
      className={cx('relative h-[266px] w-full flex-none', 'mb-2 mt-6')}
      px={{ initial: '1', md: '0' }}
      style={{ opacity: 1, transform: 'perspective(1200px)' }}
    >
      <Box className={cx('group contents size-full')}>
        <Flex
          asChild
          className={cx(
            '!transition-all hover:!-translate-y-2',
            '!shadow-none !transition-all hover:!shadow-md',
            'dark:!shadow-whiteA-3',
          )}
          direction="column"
          gap="8"
          height="220px"
          justify="between"
          pb="5"
          position="relative"
          pt="4"
          px="6"
          width="100%"
          wrap="nowrap"
        >
          {/* @todo(types) */}
          {/* @ts-ignore */}
          <Button asChild color={color} variant="soft">
            <NextLink href={href}>
              <Box mr="4" position="absolute" pt="0" right="0">
                <ArrowTopRightIcon
                  className={cx(
                    'rounded-3 !size-12 p-2 text-inherit !opacity-100',
                    'transition-colors',
                    'bg-whiteA-9 group-hover:bg-whiteA-10',
                    'dark:bg-blackA-9 dark:group-hover:bg-blackA-10',
                  )}
                />
              </Box>
              <Flex
                className={cx('bottom-0 place-content-start items-start')}
                direction="column"
                gap="1"
                height="min-content"
                justify="start"
                mb="4"
                p="0"
                pl="4"
                position="absolute"
                width="100%"
                wrap="nowrap"
              >
                <Heading
                  as="h3"
                  className={cx('mb-2 font-mono font-medium uppercase')}
                  highContrast
                  size="1"
                >
                  Go To
                </Heading>
                <Heading
                  align="left"
                  as="h3"
                  className="font-medium capitalize"
                  size={{ initial: '7', md: '8' }}
                >
                  <Em>All {type}</Em>
                </Heading>
              </Flex>
            </NextLink>
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export { ArticleMainCTA }
