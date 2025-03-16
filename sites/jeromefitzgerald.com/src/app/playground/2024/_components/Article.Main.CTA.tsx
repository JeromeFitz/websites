import { ArrowTopRightIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

function ArticleMainCTA({ color = 'accent', href = '/events', type = 'events' }) {
  return (
    <Box
      className={cx('relative h-[266px] w-full flex-none', 'mt-6 mb-2')}
      style={{ opacity: 1, transform: 'perspective(1200px)' }}
    >
      <Box className="contents size-full">
        <Flex
          asChild
          className={cx(
            'group transition-transform hover:-translate-y-1',
            // 'content-end items-end',
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
