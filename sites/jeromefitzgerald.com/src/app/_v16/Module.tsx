import { Box, Em, Flex, Heading, Text } from '@radix-ui/themes'

import { BookOpenIcon, MusicalNoteIcon, TicketIcon } from '@/components/Icon'

import { CurrentHome } from './Current.Home'
import { GridWrapper } from './Grid.Wrapper'
import { LinkButton } from './LinkButton'

const ModuleHome = () => {
  return (
    <GridWrapper>
      <Box
        gridColumnStart={{ initial: '1', md: '1' }}
        gridColumnEnd={{ initial: '13', md: '7' }}
        py="2"
        pr="9"
      >
        <Flex asChild gap="5" direction="column" width="100%">
          <Heading as="h1" size={{ initial: '7', md: '8' }} className="font-normal!">
            <Text>Jerome Fitzgerald (he/him)</Text>
            <Flex gap="2" direction="column">
              <Text size={{ initial: '3', md: '6' }}>Actor. Comedian. Writer.</Text>
              <Text size={{ initial: '2', md: '5' }}>
                <Em>… & a healthy dose of Engineering Leadership.</Em>
              </Text>
            </Flex>
          </Heading>
        </Flex>
      </Box>
      <Box
        gridColumnStart={{ initial: '1', md: '7' }}
        gridColumnEnd={{ initial: '13', md: '13' }}
      >
        <Flex asChild gap="5" direction="column" width="100%">
          <Text size={{ initial: '7', md: '8' }} className="font-normal!">
            <Text>&nbsp;</Text>
            <Flex gap="4" direction="column">
              <Text size={{ initial: '3', md: '6' }}>&nbsp;</Text>
              <Text color="gold" size={{ initial: '2', md: '5' }}>
                <Em>Currently…</Em>
              </Text>
              <Flex gap="6" direction="column">
                <LinkButton
                  color="orange"
                  text="“The M. The O. The B. The B.” – Mobb Deep & Big Noyd"
                  textComponent={
                    <CurrentHome
                      headline="Mobb Deep & Big Noyd"
                      subline="The M. The O. The B. The B."
                    />
                  }
                  icon={<MusicalNoteIcon />}
                  size="sm"
                  variant="soft"
                />
                <LinkButton
                  color="mint"
                  text="“Raw Dog: The Naked Truth About Hot Dogs” – Jaime Loftus"
                  textComponent={
                    <CurrentHome
                      headline="Jaime Loftus"
                      subline="Raw Dog: The Naked Truth About Hot Dogs"
                    />
                  }
                  icon={<BookOpenIcon />}
                  size="sm"
                  variant="soft"
                />
                <LinkButton
                  color="purple"
                  disabled
                  text="No Upcoming Events…"
                  textComponent={
                    <CurrentHome
                      disabled
                      headline=""
                      subline="No Upcoming Events…"
                    />
                  }
                  icon={<TicketIcon />}
                  size="sm"
                  variant="soft"
                />
              </Flex>
            </Flex>
          </Text>
        </Flex>
      </Box>
    </GridWrapper>
  )
}

const ModuleAbout = () => {
  return (
    <GridWrapper>
      <Box
        gridColumnStart={{ initial: '1', md: '1' }}
        gridColumnEnd={{ initial: '13', md: '7' }}
        py="2"
        pr="9"
      >
        <Flex width="100%">
          <Heading as="h2" size={{ initial: '7', md: '8' }} className="font-normal!">
            About
          </Heading>
        </Flex>
      </Box>
      <Box
        gridColumnStart={{ initial: '1', md: '7' }}
        gridColumnEnd={{ initial: '13', md: '13' }}
      >
        <Flex
          direction="column"
          justify="start"
          py="2"
          pr="2"
          gap={{ initial: '4', md: '6' }}
        >
          <Text
            size={{ initial: '4', md: '6' }}
            color="gray"
            className="font-normal!"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ad quam
            quidem et ratione accusantium velit ab asperiores mollitia! Sed.
          </Text>
        </Flex>
      </Box>
    </GridWrapper>
  )
}

export { ModuleAbout, ModuleHome }
