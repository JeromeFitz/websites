import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
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
    <Box
      className={cx(
        'bg-accentA-1',
        'rounded-3',
        'relative size-full flex-none',
        'md:h-64 md:w-[1px] md:flex-[1_0_0px]',
        // 'md:w-[308px] md:min-w-[308px] md:max-w-[308px]',
      )}
      style={{ opacity: 1, transform: 'none' }}
    >
      <Box className={cx('contents')}>
        <Button
          asChild
          className={cx(
            'group size-full transition-transform hover:-translate-y-1',
            'flex flex-col flex-nowrap',
            'relative size-full content-end items-end justify-between',
            'pb-5 pt-6',
            'px-0',
          )}
          // @todo(radix) pull in type
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          color={color}
          variant="soft"
        >
          <NextLink href={href}>
            <Box className={cx('relative right-0 px-6')}>
              <Icon
                className={cx(
                  'rounded-3 p-1.5 text-inherit !opacity-100 md:p-2',
                  'transition-colors',
                  'bg-whiteA-9 group-hover:bg-whiteA-10',
                  'dark:bg-blackA-9 dark:group-hover:bg-blackA-10',
                  '!md:size-12 !size-10',
                )}
              />
            </Box>
            <Box
              className={cx(
                'relative flex h-min w-full flex-col flex-nowrap place-content-start items-start gap-0.5 py-0 pl-6 pr-3',
              )}
            >
              <Heading
                as="h3"
                className={cx('font-mono font-medium uppercase')}
                highContrast
                mb="2"
                size="1"
              >
                {title}
              </Heading>
              {children}
            </Box>
          </NextLink>
        </Button>
      </Box>
    </Box>
  )
}

export { CurrentlyItemWrapper, CurrentlyWrapper }
