import { cx } from '@jeromefitz/ds/utils/cx'

import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
// import _isEmpty from 'lodash/isEmpty.js'

function ContainerHeaderSidebar({ children }) {
  return (
    <Flex
      asChild
      className={cx(
        'z-0 content-center items-start overflow-auto will-change-transform',
        'md:sticky',
      )}
      data-name="Side Bar"
      flexBasis="0px"
      flexGrow="1"
      flexShrink="0"
      height={{ initial: 'min-content', md: '88vh' }}
      id="header--sidebar"
      justify="between"
      maxHeight={{ initial: 'unset', md: 'unset' }}
      maxWidth={{ initial: 'unset', md: '320px' }}
      mr={{ initial: '0', md: '-1' }}
      position="relative"
      style={{ opacity: 1, transform: 'perspective(1200px)' }}
      top={{ initial: 'unsert', md: '9' }}
      width="100%"
      wrap="nowrap"
    >
      <header>{children}</header>
    </Flex>
  )
}

function HeaderSidebar({
  children = <></>,
  className = '',
  hasBorder = true,
  title = '',
}) {
  // const isTitleEmpty = _isEmpty(title)
  const isTitleEmpty = title === ''
  return (
    <ContainerHeaderSidebar>
      <div
        className={cx(
          'h-min w-full',
          // 'size-full',
          'relative flex flex-none flex-col flex-nowrap place-content-start items-start gap-0 overflow-visible',
          'px-0 pt-0 pb-6 md:p-0',
          hasBorder && 'rounded-3 border-gray-7 border-1',
          className,
        )}
        id="header-top"
      >
        {!isTitleEmpty && (
          <div
            className={cx(
              'relative z-30 flex h-min w-full flex-none flex-col flex-nowrap place-content-start items-start gap-3 overflow-hidden p-5',
              isTitleEmpty && 'hidden',
              '',
            )}
            id="header-info"
          >
            <Heading
              as="h1"
              className={cx(
                'line-clamp-2 font-medium',
                // 'md:min-h-[60px]',
                '',
              )}
              size="6"
            >
              {title}
            </Heading>
          </div>
        )}

        <div
          className={cx(
            // 'h-min w-full ',
            'size-full',
            'relative flex-none',
            'flex flex-col justify-between',
            // 'pb-2',
          )}
          id="header-container"
        >
          {children}
        </div>
      </div>
    </ContainerHeaderSidebar>
  )
}

export { ContainerHeaderSidebar, HeaderSidebar }
