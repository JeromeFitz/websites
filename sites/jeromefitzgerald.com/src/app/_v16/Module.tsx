import {
  Box,
  Code,
  Em,
  Flex,
  Heading,
  Link,
  Separator,
  Strong,
  Text,
} from '@radix-ui/themes'
import NextLink from 'next/link'

import { BookOpenIcon, MusicalNoteIcon, TicketIcon } from '@/components/Icon'

import { Content, image } from '../(segments)/shows/_content/jerome-and'
import { CurrentHome } from './Current.Home'
import { ImageContainer } from './Image'
import { LinkButton } from './LinkButton'
import { GalleryWrapper, GridWrapper } from './Wrapper'

const BackTo = () => {
  return (
    <Flex pb="9" className="text-center" direction="column" width="100%" px="9">
      <Heading as="h4" weight="regular">
        <Em>← Back to all: Shows</Em>
      </Heading>
    </Flex>
  )
}

const ModuleAbout = () => {
  return (
    <>
      <GridWrapper>
        <Box
          gridColumnStart={{ initial: '1', md: '1' }}
          gridColumnEnd={{ initial: '13', md: '7' }}
          py="2"
          pr="9"
        >
          <Flex width="100%">
            <Heading
              as="h2"
              size={{ initial: '7', md: '8' }}
              className="font-normal!"
            >
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
            <Text size={{ initial: '4', md: '6' }} color="gold">
              <Em>
                “Comedy is tragedy - plus time.”
                <br /> – Carol Burnett
              </Em>
            </Text>
            <Text size={{ initial: '4', md: '6' }} weight="light">
              For the past <Code variant="ghost">10+</Code> years I’ve been
              directing, producing, writing, and performing sketch comedy, musicals,
              and improv. Feel free to check some out in the{' '}
              <Link asChild>
                <NextLink href="/shows">Shows section</NextLink>
              </Link>
              .
            </Text>
            <Text size={{ initial: '3', md: '5' }}>
              Based in <Strong>Brooklyn, NY</Strong> (
              <Text className="line-through">Pittsburgh, PA</Text>) I’ve had shows in{' '}
              <Em>Chicago</Em>, <Em>Cleveland</Em>, <Em>Detroit</Em>,{' '}
              <Em>New York City</Em>, <Em>Philadelphia</Em>, <Em>Pittsburgh</Em>,{' '}
              <Em>San Diego</Em>, <Em>San Francisco</Em>, and more.
            </Text>
            <Text size={{ initial: '3', md: '5' }}>
              Perhaps you have seen me in commercials for <Em>AT&T</Em>,{' '}
              <Em>Google</Em>, or <Em>Sucrets</Em>. On the jumbotron before games for
              the <Em>Pittsburgh Pirates</Em> at PNC Park. Or featured in{` `}
              <Em>The Onion</Em>. (It’s okay if not though.)
            </Text>
            <Text size={{ initial: '5', md: '7' }}>
              I’ve also been extremely fortunate to take courses from some of the
              funniest people in the comedy world and as a result –{' '}
              <Strong>thee world</Strong>:
            </Text>
            <Text size={{ initial: '3', md: '5' }}>
              <Em>Craig Cackowski</Em>, <Em>Kevin McDonald</Em>, <Em>Jaime Moyer</Em>
              , <Em>Christine Nangle</Em>, <Em>Natalie Palamides</Em>,{' '}
              <Em>Rich Talarico</Em>, <Em>Reggie Watts</Em>, and “more”!
            </Text>
          </Flex>
        </Box>
      </GridWrapper>
      <GalleryWrapper>
        <ImageContainer image={image} />
      </GalleryWrapper>
      <GridWrapper>
        <Box
          gridColumnStart={{ initial: '1', md: '1' }}
          gridColumnEnd={{ initial: '13', md: '7' }}
          py="2"
          pr="9"
        >
          <Flex width="100%">
            <Heading
              as="h2"
              size={{ initial: '7', md: '8' }}
              className="font-normal!"
            >
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
            <Text size={{ initial: '4', md: '6' }} color="gold">
              <Em>
                “I must confess, I was born at a very early age.”
                <br /> – Groucho Marx
              </Em>
            </Text>
            <Text size={{ initial: '3', md: '5' }}>
              Well, it should go without saying at this point that I am a big fan of
              comedy. And that I like to stare at books, and zone out to music.
            </Text>
          </Flex>
        </Box>
      </GridWrapper>

      <GalleryWrapper>
        <ImageContainer image={image} />
        <Content />
        <BackTo />
      </GalleryWrapper>
    </>
  )
}

const ModuleHome = () => {
  return (
    <>
      <GridWrapper>
        <Box
          gridColumnStart={{ initial: '1', md: '1' }}
          gridColumnEnd={{ initial: '13', md: '7' }}
          py="2"
          pr="9"
        >
          <Flex asChild gap="5" direction="column" width="100%">
            <Heading as="h1" size={{ initial: '7', md: '8' }}>
              <Text>Jerome Fitzgerald (he/him)</Text>
              <Flex gap="2" direction="column">
                <Text size={{ initial: '3', md: '6' }}>
                  Actor. Comedian. Writer.
                </Text>
                <Text size={{ initial: '2', md: '5' }} weight="regular">
                  <Em>… with a healthy dose of Engineering Leadership.</Em>
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
      <GalleryWrapper>
        <ImageContainer image={image} />
      </GalleryWrapper>
    </>
  )
}

const ModuleShow = ({
  headline = 'Jerome &',
  subline = 'The Variety Show of Variety Shows',
}: {
  headline?: string
  subline?: string
}) => {
  return (
    <>
      <GridWrapper>
        <Flex
          align="center"
          direction="column"
          gridColumnStart={{ initial: '1', md: '1' }}
          gridColumnEnd={{ initial: '13', md: '13' }}
          justify="between"
          className="text-center"
          pt={{ initial: '100px', md: '100px' }}
          width="100%"
        >
          <Heading as="h1" size={{ initial: '8', md: '9' }}>
            {headline}
          </Heading>
          <Heading
            as="h3"
            color="gold"
            size={{ initial: '5', md: '7' }}
            className="whitespace-pre-line!"
            weight="regular"
          >
            <Em>{subline}</Em>
          </Heading>
        </Flex>
      </GridWrapper>
      <GalleryWrapper>
        <ImageContainer image={image} />
        <Content />
        <BackTo />
      </GalleryWrapper>
    </>
  )
}

export { ModuleAbout, ModuleHome, ModuleShow }
