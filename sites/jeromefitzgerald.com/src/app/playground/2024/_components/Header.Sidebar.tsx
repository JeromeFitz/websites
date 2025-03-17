import { cx } from '@jeromefitz/ds/utils/cx'

// import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'

function ContainerHeaderSidebar({ children }) {
  return (
    <Flex
      asChild
      className={cx(
        // 'bg-iris-3',
        // 'rounded-md border-1',
        'z-0 content-center items-start overflow-auto will-change-transform',
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
      position={{ initial: 'relative', md: 'relative' }}
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
  const isTitleEmpty = title === ''
  return (
    <ContainerHeaderSidebar>
      <Flex
        className={cx(
          'place-content-start items-start overflow-visible',
          hasBorder && 'rounded-3 border-gray-7 border-1',
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
        pb="6"
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
            <Heading as="h1" className="line-clamp-2 font-medium" size="6">
              {title}
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
