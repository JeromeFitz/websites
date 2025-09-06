import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
// import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'

import { cx } from '@/utils/cx'

// import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

function HeaderFull({
  count = 0,
  overline = '',
  title = '',
}: {
  count?: number
  overline?: string
  title: string
}) {
  return (
    <Flex
      asChild
      className="place-content-start items-start overflow-visible"
      data-name="Header: Full"
      direction="column"
      flexBasis="auto"
      flexGrow="0"
      flexShrink="0"
      gap="12"
      height="min-content"
      pb={{ initial: 'calc(var(--spacing) * 6)', md: 'calc(var(--spacing) * 0)' }}
      position="relative"
      pt={{ initial: 'calc(var(--spacing) * 24)', md: 'calc(var(--spacing) * 32)' }}
      px="0"
      width="100%"
    >
      <header id="header--full">
        <Flex
          className={cx(
            'relative h-min w-full overflow-hidden p-0',
            'flex flex-row place-content-start items-start',
            'md:grid md:flex-[0_0_auto] md:auto-rows-auto md:justify-center md:gap-6',
            // 'md:grid-cols-4 md:grid-rows-2',
            'md:grid-cols-4 md:grid-rows-1',
          )}
          style={{ opacity: 1, transform: 'perspective(1200px)' }}
        >
          <Flex
            className={cx(
              'place-content-start items-start place-self-start overflow-visible [align-self:unset] [grid-column:auto_/_span_3]',
            )}
            direction="column"
            flexBasis={{ initial: '0px', md: 'auto' }}
            flexGrow={{ initial: '1', md: '0' }}
            flexShrink={{ initial: '0', md: '0' }}
            gap="4"
            height="min-content"
            id="header--full--content--container"
            p="0"
            position="relative"
            width={{ initial: '100%', md: '100%' }}
          >
            <Flex
              className={cx('outline-hidden transform-none whitespace-pre')}
              direction="column"
              flexBasis="auto"
              flexGrow="0"
              flexShrink="0"
              height="auto"
              justify="start"
              position="relative"
              width="auto"
            >
              <Heading
                as="h2"
                className="text-gray-11 font-medium"
                size={{ initial: '2', md: '4' }}
              >
                {overline}
              </Heading>
            </Flex>
            <Flex
              className={cx(
                'whitespace-pre-wrap break-words [word-break:break-word]',
                'outline-hidden transform-none',
              )}
              direction="column"
              flexBasis="auto"
              flexGrow="0"
              flexShrink="0"
              height="auto"
              justify="start"
              position="relative"
              width="auto"
            >
              <Heading
                as="h1"
                className="font-medium"
                size={{ initial: '8', md: '9' }}
              >
                {title}
                {!!count && (
                  <sup aria-hidden={true} className="text-3 md:text-6 align-super">
                    {` `}
                    {count}
                  </sup>
                )}
              </Heading>
            </Flex>
          </Flex>
          <Flex
            className="place-self-start overflow-hidden"
            display={{ initial: 'none', md: 'flex' }}
            flexBasis="auto"
            flexGrow="0"
            flexShrink="0"
            height="calc(var(--spacing) * 32)"
            id="header--full--spacer"
            position="relative"
            width="100%"
          />
        </Flex>
      </header>
    </Flex>
  )
}

export { HeaderFull }
