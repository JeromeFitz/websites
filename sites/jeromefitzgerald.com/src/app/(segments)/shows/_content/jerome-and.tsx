import { Box, Em, Flex, Separator, Strong, Text } from '@radix-ui/themes'

import { image } from '@/app/_v16/_meta'
import { GridWrapper } from '@/app/_v16/Wrapper'
import { bandcamps, jeromeands } from '@/data/bandcamps'

const headline = 'Jerome &'
const subline = 'The Variety Show of Variety Shows'

const Content = () => {
  return (
    <>
      <GridWrapper>
        <Box
          gridColumnStart={{ initial: '1', md: '1' }}
          gridColumnEnd={{ initial: '13', md: '7' }}
        >
          <Flex gap="5" direction="column" width="100%">
            <Text size={{ initial: '7', md: '8' }} weight="bold">
              Info
            </Text>
          </Flex>
        </Box>
        <Box
          gridColumnStart={{ initial: '1', md: '7' }}
          gridColumnEnd={{ initial: '13', md: '13' }}
        >
          <Flex gap={{ initial: '6', md: '8' }} direction="column" width="100%">
            <Text size={{ initial: '6', md: '7' }} weight="regular">
              Since <Strong>2017</Strong> the monthly comedy variety show where
              Jerome hosts a cavalcade of hilarous and talented friends.
            </Text>
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              <Text color="gold">
                <Em>Woody Drennan</Em> (stay gold)
              </Text>{' '}
              claimed that Jerome could do a show with literally anyone. Saying
              <Em>“Yes And”</Em> (shudder), <Strong>Jerome &</Strong> was born at{' '}
              <Strong>Unplanned Comedy</Strong>. A volunteer audience member with no
              improv experience would become the star of the show.
            </Text>
            <Text size={{ initial: '7', md: '8' }} weight="regular">
              <Em>
                That tradition of working without a net has continued ever since.
              </Em>
            </Text>
            <Text size={{ initial: '6', md: '7' }} weight="regular">
              The show quickly evolved to also include special guests with{' '}
              <Strong>a lot</Strong> of experience in improv, music, sketch, and
              stand-up. But due to schedules were folks Jerome did not get to perform
              with or see very often.
            </Text>
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              In its latest iteration at <Strong>Arcade Comedy Theater</Strong>{' '}
              frequent collaborators{' '}
              <Em>Alex Conti, Nonsense, Raina Deerwater, & Sara Kantner</Em> would
              weave absurdist humor through playful character sketches. Complete with
              touring musical acts and of course a clown on stage reading a book
              throughout the entirety of the show.
            </Text>
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              It became parts SNL, parts bacchanal. (Sure that rhymes if you say it a
              certain way.)
            </Text>
            <Text color="gold" size={{ initial: '7', md: '8' }} weight="regular">
              <Em>
                Will the show ever return now that he has moved to Brooklyn? All
                signs point to: <Strong>Probably</Strong>. (He has a lot of pals here
                too.)
              </Em>
            </Text>
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              And oh yea, big shout-out to the one and only{' '}
              <Strong>Nick Jaramillo</Strong> who becomes Jerome on the months that
              he cannot be there.
            </Text>
          </Flex>
        </Box>
      </GridWrapper>
      <Separator orientation="horizontal" size="4" />
      <GridWrapper>
        <Box
          gridColumnStart={{ initial: '1', md: '1' }}
          gridColumnEnd={{ initial: '13', md: '7' }}
        >
          <Flex gap="5" direction="column" width="100%">
            <Text size={{ initial: '7', md: '8' }} weight="bold">
              Musical Guests*
            </Text>
          </Flex>
        </Box>
        <Box
          gridColumnStart={{ initial: '1', md: '7' }}
          gridColumnEnd={{ initial: '13', md: '13' }}
        >
          <Flex gap="5" direction="column" width="100%">
            {bandcamps.map((item, i) => (
              <Text
                // biome-ignore lint/suspicious/noArrayIndexKey: lazy
                key={`guest-musical-${i}`}
                size={{ initial: '6', md: '7' }}
                weight="regular"
              >
                {item.artist}
              </Text>
            ))}
          </Flex>
        </Box>
        <Box
          gridColumnStart={{ initial: '1', md: '1' }}
          gridColumnEnd={{ initial: '13', md: '7' }}
        >
          <Flex gap="5" direction="column" width="100%">
            <Text size={{ initial: '2', md: '3' }} weight="regular">
              <Em>* Small Sampling</Em>
            </Text>
          </Flex>
        </Box>
      </GridWrapper>
      <Separator orientation="horizontal" size="4" />{' '}
      <GridWrapper>
        <Box
          gridColumnStart={{ initial: '1', md: '1' }}
          gridColumnEnd={{ initial: '13', md: '7' }}
        >
          <Flex gap="5" direction="column" width="100%">
            <Text size={{ initial: '7', md: '8' }} weight="bold">
              Special Guests*
            </Text>
          </Flex>
        </Box>
        <Box
          gridColumnStart={{ initial: '1', md: '7' }}
          gridColumnEnd={{ initial: '13', md: '13' }}
        >
          <Flex gap="5" direction="column" width="100%">
            {jeromeands.map((item, i) => (
              <Text
                // biome-ignore lint/suspicious/noArrayIndexKey: lazy
                key={`guest-speical-${i}`}
                size={{ initial: '6', md: '7' }}
                weight="regular"
              >
                {item.artist}
              </Text>
            ))}
          </Flex>
        </Box>
        <Box
          gridColumnStart={{ initial: '1', md: '1' }}
          gridColumnEnd={{ initial: '13', md: '7' }}
        >
          <Flex gap="5" direction="column" width="100%">
            <Text size={{ initial: '2', md: '3' }} weight="regular">
              <Em>* Small Sampling</Em>
            </Text>
          </Flex>
        </Box>
      </GridWrapper>
    </>
  )
}

export { Content, image, headline, subline }
