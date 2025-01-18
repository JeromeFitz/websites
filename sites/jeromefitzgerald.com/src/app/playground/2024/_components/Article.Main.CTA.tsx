import { ArrowTopRightIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

function ArticleMainCTA({ color = 'accent', href = '/events', type = 'events' }) {
  return (
    <Box
      className={cx('relative h-[266px] w-full flex-none', 'mb-2 mt-6')}
      style={{ opacity: 1, transform: 'perspective(1200px)' }}
    >
      <Box className={cx('contents')}>
        <Button
          asChild
          className={cx(
            'group size-full transition-transform hover:-translate-y-1',
            'flex flex-col flex-nowrap',
            'relative h-[220px] w-[330px] content-end items-end justify-between',
            'px-6 pb-5 pt-6',
          )}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          color={color}
          style={{ height: '100%', width: '100%' }}
          variant="soft"
        >
          <NextLink href={href}>
            <Box className={cx('relative right-0')}>
              <ArrowTopRightIcon
                className={cx(
                  'rounded-3 !size-12 p-2 text-inherit !opacity-100',
                  'transition-colors',
                  'bg-whiteA-9 group-hover:bg-whiteA-10',
                  'dark:bg-blackA-9 dark:group-hover:bg-blackA-10',
                )}
              />
            </Box>
            <Box
              className={cx(
                'relative flex h-min w-full flex-col flex-nowrap place-content-start items-start gap-0.5 p-0',
              )}
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
            </Box>
          </NextLink>
        </Button>
      </Box>
    </Box>
  )
}

export { ArticleMainCTA }
