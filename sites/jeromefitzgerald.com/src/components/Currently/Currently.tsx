import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import _filter from 'lodash/filter'

import { currently } from '@/data/currently'
import { cx } from '@/utils/cx'

function Currently() {
  const items = _filter(currently, { isActive: true })
  return (
    <Flex
      align="end"
      className={cx(
        'place-content-center items-center overflow-visible',
        'order-[0]',
      )}
      direction="column"
      gap="10"
      height={{ initial: 'min-content', md: '266px' }}
      justify="center"
      p="0"
      px={{ initial: '1', md: '0' }}
      style={{ opacity: 1 }}
      width="100%"
      wrap="nowrap"
    >
      <Flex
        className={cx('place-content-start items-start')}
        direction={{ initial: 'column', md: 'row' }}
        gap="6"
        height="min-content"
        justify={{ initial: 'start', md: 'between' }}
        p="0"
        position="relative"
        style={{ opacity: 1 }}
        width="100%"
        wrap="nowrap"
      >
        <Flex
          className="content-center items-center overflow-visible rounded-md"
          content="center"
          direction="row"
          gap="10"
          justify="start"
          maxWidth={{ initial: 'unset', md: '320px' }}
          position="relative"
          pr="0"
          style={{ opacity: 1 }}
          width={{ initial: 'unset', md: '318px' }}
        >
          <Text
            className="text-accentA-12"
            size={{ initial: '7', md: '8' }}
            weight="medium"
          >
            <Em>
              Currently…
              <sup
                aria-hidden={true}
                className="hidden align-super text-3 md:inline-block md:text-5"
              >
                {items.length}
              </sup>
            </Em>
          </Text>
        </Flex>
        {items.map((c, idx) => {
          if (!c?.isActive) return null

          const key = `currently-${idx}-${c.id}`

          const Component = c.component
          const titleSub = c?.titleSub.split(' – ')
          const props = { ...c, titleSub }

          // @ts-ignore
          return <Component key={key} {...props} />
        })}
      </Flex>
    </Flex>
  )
}

export { Currently }
