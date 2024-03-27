/**
 * @todo(radix-ui) issue w/ flex.props.js init order
 *
 * ref: https://github.com/JeromeFitz/websites/pull/2341
 */
// import { Flex } from '@radix-ui/themes'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
import { IconButton } from '@radix-ui/themes/dist/esm/components/icon-button.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import Image from 'next/image'

function Quote({ item }) {
  return (
    <Grid
      asChild
      columns="1"
      height="100%"
      m={{ initial: '1', md: '3' }}
      p={{ initial: '3', md: '6' }}
      rows="1"
      width="100%"
    >
      <section>
        <Box
          className="pointer-events-none -indent-3"
          position="relative"
          pr={{ initial: '0', md: '9' }}
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
                  className="rounded-item !h-auto !w-[36px]"
                  height={item.height}
                  src={item.image}
                  width={item.width}
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
