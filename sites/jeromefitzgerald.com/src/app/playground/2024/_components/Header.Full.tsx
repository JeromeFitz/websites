import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
// import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

function HeaderFull({ overline = '', title = '' }) {
  return (
    <header
      className={cx(
        'relative h-min w-full overflow-visible',
        'flex flex-[0_0_auto] flex-col place-content-start items-start gap-12',
        'px-0 pb-24 pt-32',
        'md:pb-12 md:pt-36',
      )}
      data-name="Header: Full"
      id="header--full"
    >
      <Box
        className={cx(
          'relative h-min w-full overflow-hidden p-0',
          'flex flex-row place-content-start items-start',
          'md:grid md:flex-[0_0_auto] md:auto-rows-auto md:justify-center md:gap-6',
          // 'md:grid-cols-4 md:grid-rows-2',
          'md:grid-cols-4 md:grid-rows-1',
        )}
        style={{ opacity: 1, transform: 'perspective(1200px)' }}
      >
        <Box
          className={cx(
            // 'bg-accent-4',
            'relative flex h-min w-[1px] flex-[1_0_0px] flex-col place-content-start items-start gap-4 place-self-start overflow-visible p-0 [align-self:unset] [grid-column:auto_/_span_3]',
            'md:w-full md:flex-[0_0_auto]',
          )}
          id="header--full--content--container"
        >
          <Box
            className={cx(
              'relative size-auto flex-[0_0_auto] whitespace-pre',
              'flex shrink-0 transform-none flex-col justify-start outline-none',
            )}
          >
            <Heading
              as="h2"
              className="text-gray-11 font-medium"
              size={{ initial: '2', md: '4' }}
            >
              {overline}
            </Heading>
          </Box>
          <Box
            className={cx(
              'relative size-auto flex-[0_0_auto] whitespace-pre-wrap break-words [word-break:break-word]',
              'flex shrink-0 transform-none flex-col justify-start outline-none',
            )}
          >
            <Heading
              as="h1"
              className="font-medium"
              size={{ initial: '6', md: '8' }}
            >
              {title}
              {` `}
              {/* <Text className="text-gray-11 mt-3 block">
                Hailing from Pittsburgh, PA.
              </Text> */}
            </Heading>
          </Box>
        </Box>
        <Box
          className={cx(
            'relative h-48 w-full flex-[0_0_auto] place-self-start overflow-hidden',
            'hidden md:grid',
          )}
          id="header--full--spacer"
        />
      </Box>
    </header>
  )
}

export { HeaderFull }
