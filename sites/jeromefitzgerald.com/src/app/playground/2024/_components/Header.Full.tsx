import { cx } from '@jeromefitz/ds/utils/cx'

import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
// import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
// import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

function HeaderFull({ overline = '', title = '' }) {
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
      pb={{ intial: 'calc(var(--spacing) * 24)', md: 'calc(var(--spacing) * 12)' }}
      position="relative"
      pt={{ intial: 'calc(var(--spacing) * 32)', md: 'calc(var(--spacing) * 36)' }}
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
              '[grid-column:auto_/_span_3] place-content-start items-start place-self-start [align-self:unset] overflow-visible',
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
              className={cx('transform-none whitespace-pre outline-hidden')}
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
                'break-words [word-break:break-word] whitespace-pre-wrap',
                'transform-none outline-hidden',
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
                size={{ initial: '6', md: '8' }}
              >
                {title}
                {` `}
                {/* <Text className="block mt-3 text-gray-11">
                Hailing from Pittsburgh, PA.
              </Text> */}
              </Heading>
            </Flex>
          </Flex>
          <Flex
            className="place-self-start overflow-hidden"
            display={{ initial: 'none', md: 'flex' }}
            flexBasis="auto"
            flexGrow="0"
            flexShrink="0"
            height="calc(var(--spacing) * 48)"
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
