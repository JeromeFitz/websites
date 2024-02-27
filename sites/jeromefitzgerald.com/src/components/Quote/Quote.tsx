import { Box, Em, Flex, Grid, IconButton, Text } from '@radix-ui/themes'
import Image from 'next/image'

function Quote({ item }) {
  return (
    <Grid
      asChild
      columns="1"
      height="100%"
      m={{ initial: '1', lg: '3' }}
      p={{ initial: '3', lg: '6' }}
      rows="1"
      width="100%"
    >
      <section>
        <Box
          className="pointer-events-none indent-[calc(var(--space-3)_*_-1)]"
          position="relative"
          pr={{ initial: '0', lg: '9' }}
          width="100%"
        >
          <Text size="7">
            <Text as="span">“</Text>
            <Text as="span">{item.content}</Text>
            <Text as="span">”</Text>
          </Text>
        </Box>
        <Flex
          align="center"
          asChild
          direction="row"
          gap="5"
          justify="end"
          ml="auto"
          pt="8"
        >
          <footer className="pointer-events-none">
            <Flex align="end" direction="column" gap="1" justify="start">
              <Text as="span" size="5" weight="medium">
                {item.who}
              </Text>
              <Text as="span" size="2">
                <Em>{item.where}</Em>
              </Text>
            </Flex>
            <Box>
              <IconButton
                className="select-none"
                radius="full"
                // @note(a11y) does not link out so no need for keyboard focus
                tabIndex={-1}
                variant="ghost"
              >
                <Image
                  alt={`Logo for ${item.where}`}
                  className="rounded-[var(--radius-full)]"
                  height="36"
                  src={item.image}
                  width="36"
                />
              </IconButton>
            </Box>
          </footer>
        </Flex>
      </section>
    </Grid>
  )
}

export { Quote }
