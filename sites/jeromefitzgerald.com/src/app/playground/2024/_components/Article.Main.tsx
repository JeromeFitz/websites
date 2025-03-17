import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

/**
 * @todo(a11y) should this be article instead of main
 */
function ArticleMain({ children }) {
  return (
    <Flex
      asChild
      className="place-content-start items-start overflow-visible"
      direction="column"
      flexBasis={{ md: '0px' }}
      flexGrow={{ md: '1' }}
      flexShrink={{ md: '0' }}
      gap={{ initial: '3', md: '6' }}
      height="min-content"
      mt="9"
      p="0"
      position="relative"
      style={{ opacity: 1, transform: 'none' }}
      width={{ initial: '100%', md: '1px' }}
      wrap="nowrap"
    >
      <main id="skip-nav" role="main">
        {children}
      </main>
    </Flex>
  )
}

export { ArticleMain }
