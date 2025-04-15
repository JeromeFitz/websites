// import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
// import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { cx } from '@/utils/cx'

function ContainerHeaderSidebar({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      asChild
      className={cx(
        // 'bg-iris-3',
        // 'rounded-md border-1',
        'z-0 content-center items-start overflow-auto will-change-transform',
        'md:top-[calc(var(--spacing)_*_22)]',
      )}
      data-name="Side Bar"
      display="inline-flex"
      flexBasis="0px"
      flexGrow="1"
      flexShrink="0"
      height={{ initial: 'min-content', md: '88vh' }}
      id="header--sidebar"
      justify="between"
      maxHeight={{ initial: 'unset', md: 'unset' }}
      maxWidth={{ initial: 'unset', md: '320px' }}
      mr={{ initial: '0', md: '-1' }}
      mt={{ initial: '0', md: '9' }}
      position={{ initial: 'relative', md: 'sticky' }}
      pt={{ initial: '0', md: '0' }}
      style={{ opacity: 1, transform: 'perspective(1200px)' }}
      // top={{ initial: 'unset', md: 'unset' }}
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasBorder = true,
  title = '',
}) {
  // const isTitleEmpty = title === ''
  const isTitleEmpty = true
  return (
    <ContainerHeaderSidebar>
      <Flex
        className={cx(
          'place-content-start items-start overflow-visible',
          // hasBorder && 'rounded-3 border-gray-7 border-1',
          className,
        )}
        direction="column"
        flexBasis="auto"
        flexGrow="0"
        flexShrink="0"
        gap="0"
        height="min-content"
        id="header-top"
        p={{ md: '0' }}
        pb="5"
        position="relative"
        pt="0"
        px="0"
        width="100%"
        wrap="nowrap"
      >
        {!isTitleEmpty && (
          <Flex
            className={cx(
              'z-30 place-content-start items-start overflow-hidden',
              isTitleEmpty && 'hidden',
              'border-gray-7 border-b-1',
            )}
            direction="column"
            flexBasis="auto"
            flexGrow="0"
            flexShrink="0"
            gap="3"
            height="min-content"
            id="header-info"
            p="5"
            position="relative"
            width="100%"
            wrap="nowrap"
          >
            <Heading as="h1" className="min-h-15 line-clamp-2 font-medium" size="6">
              {title}
              {/* {hasBorder ? (
                <>{title}</>
              ) : (
                <>
                  <Text
                    className="text-accentA-12"
                    size={{ initial: '6', md: '8' }}
                    weight="medium"
                  >
                    <Em>{title}</Em>
                  </Text>
                </>
              )} */}
            </Heading>
          </Flex>
        )}
        <Flex
          direction="column"
          flexBasis="auto"
          flexGrow="0"
          flexShrink="0"
          height="100%"
          id="header-container"
          justify="between"
          position="relative"
          top="0"
          width="100%"
        >
          {children}
        </Flex>
      </Flex>
    </ContainerHeaderSidebar>
  )
}

export { ContainerHeaderSidebar, HeaderSidebar }
