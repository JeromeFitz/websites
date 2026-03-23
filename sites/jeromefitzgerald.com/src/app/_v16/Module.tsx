import type { Image } from './types'

import {
  Box,
  Code,
  Em,
  Flex,
  Grid,
  Heading,
  Link,
  // Separator,
  Strong,
  Text,
} from '@radix-ui/themes'
import NextLink from 'next/link'
import { Fragment } from 'react'

import { Anchor } from '@/components/Anchor/Anchor'
import { BookOpenIcon, MusicalNoteIcon, TicketIcon } from '@/components/Icon'

// import { DataJeromeAnd } from '../(segments)/shows/_content/jerome-and'
import { CurrentHome } from './Current.Home'
// import { ImageContainer } from './Image'
import { ImageGallery } from './ImageGallery'
import { LinkButton } from './LinkButton'
import { GridWrapper, WrapperLeft, WrapperRight } from './Wrapper'

const BackTo = () => {
  return (
    <Flex pb="9" className="text-center" direction="column" width="100%" px="9">
      <Heading as="h4" weight="regular">
        <Em>
          <Anchor href="/shows">← Back to all: Shows</Anchor>
        </Em>
      </Heading>
    </Flex>
  )
}

const ModuleAbout = () => {
  return (
    <>
      <GridWrapper>
        <WrapperLeft>
          <Heading as="h2" size={{ initial: '7', md: '8' }} className="font-normal!">
            About
          </Heading>
        </WrapperLeft>
        <WrapperRight>
          <Text size={{ initial: '4', md: '6' }} color="pink">
            <Em>
              “Comedy is tragedy - plus time.”
              <br /> – Carol Burnett
            </Em>
          </Text>
          <Text size={{ initial: '4', md: '6' }} weight="light">
            For the past <Code variant="ghost">10+</Code> years I’ve been directing,
            producing, writing, and performing sketch comedy, musicals, and improv.
            Feel free to check some out in the{' '}
            <Link asChild>
              <NextLink href="/shows">Shows section</NextLink>
            </Link>
            .
          </Text>
          <Text size={{ initial: '3', md: '5' }}>
            Based in <Strong>NYC</Strong> (
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
            <Em>Craig Cackowski</Em>, <Em>Kevin McDonald</Em>, <Em>Jaime Moyer</Em>,{' '}
            <Em>Christine Nangle</Em>, <Em>Natalie Palamides</Em>,{' '}
            <Em>Rich Talarico</Em>, <Em>Reggie Watts</Em>, and “more”!
          </Text>
        </WrapperRight>
      </GridWrapper>
      {/* <GalleryWrapper>
        <ImageContainer image={DataJeromeAnd.image} />
      </GalleryWrapper> */}
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
            <Text size={{ initial: '4', md: '6' }} color="pink">
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

      {/* <GalleryWrapper>
        <ImageContainer image={DataJeromeAnd.image} />
        <DataJeromeAnd.content />
        <BackTo />
      </GalleryWrapper> */}
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
                <Text color="pink" size={{ initial: '2', md: '5' }}>
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
                    size="3"
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
                    size="3"
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
                    size="3"
                    variant="soft"
                  />
                </Flex>
              </Flex>
            </Text>
          </Flex>
        </Box>
      </GridWrapper>
      {/* <GalleryWrapper>
        <ImageContainer image={DataJeromeAnd.image} />
      </GalleryWrapper> */}
    </>
  )
}

const ModuleImageGallery = ({ images }: { images: Image[] }) => {
  return (
    <>
      <ImageGallery images={images} />
      {/* <GridWrapper>
        <WrapperRight>
          <Text size={{ initial: '4', md: '6' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            voluptatibus, similique ipsa neque nisi vel voluptatum aperiam fuga
            repellat architecto velit ipsum distinctio quis dolore rerum modi nihil
            culpa necessitatibus vitae qui voluptas pariatur illum aut ab!
            Consectetur possimus ipsum voluptatem ex sapiente placeat reprehenderit,
            tempore ratione, expedita quisquam assumenda non! Atque vel eaque natus
            officiis dolorem rem odio accusantium facere. Quae nisi voluptatibus
            reiciendis iusto explicabo corporis aspernatur doloribus cupiditate
            mollitia dicta? Rem modi molestias quisquam ipsam quia illum mollitia
            optio necessitatibus unde culpa, animi quod eveniet inventore, delectus
            expedita quo magni veritatis obcaecati. Minus mollitia excepturi a
            tempore.
          </Text>
          <ImageGallery count={2} />
        </WrapperRight>
      </GridWrapper> */}
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
            color="pink"
            size={{ initial: '5', md: '7' }}
            className="whitespace-pre-line!"
            weight="regular"
          >
            <Em>{subline}</Em>
          </Heading>
        </Flex>
      </GridWrapper>
      {/* <GalleryWrapper>
        <ImageContainer image={DataJeromeAnd.image} />
        <DataJeromeAnd.content />
        <BackTo />
      </GalleryWrapper> */}
    </>
  )
}

type Credit = {
  headline: string
  id: number
  subline: string | null
}

const cast: Credit[] = [
  { headline: 'Cast', id: 0, subline: null },
  { headline: 'Jerome Fitzgerald', id: 1, subline: null },
  { headline: 'Jesse LE', id: 2, subline: null },
  { headline: 'Jerome Fitzgerald', id: 3, subline: null },
  { headline: 'Jesse LE', id: 4, subline: null },
  { headline: 'Jerome Fitzgerald', id: 5, subline: null },
  { headline: 'Jesse LE', id: 6, subline: null },
  { headline: 'Jerome Fitzgerald', id: 7, subline: null },
  { headline: 'Jesse LE', id: 8, subline: null },
  { headline: 'Jerome Fitzgerald', id: 9, subline: null },
  { headline: 'Jesse LE', id: 10, subline: null },
]
const crew: Credit[] = [
  { headline: 'Crew', id: 0, subline: null },
  { headline: 'Jerome Fitzgerald', id: 1, subline: 'Producer, Writer' },
  { headline: 'Jesse LE', id: 2, subline: 'Director, Writer' },
  { headline: 'Aaron Tarnow', id: 3, subline: 'Technical Director' },
]
const thanks: Credit[] = [
  { headline: 'Thanks', id: 0, subline: null },
  { headline: 'Andre Gregory', id: 1, subline: 'Inspiration' },
  { headline: 'Wallace Shawn', id: 2, subline: 'Inspiration' },
  { headline: 'William Lardinois', id: 3, subline: 'Tending Bar' },
  { headline: 'Driftwood Oven', id: 4, subline: 'Film Location' },
]
const emeritus: Credit[] = [
  { headline: 'Emeritus', id: 0, subline: null },
  { headline: 'Andre Gregory', id: 1, subline: 'Inspiration' },
  { headline: 'Wallace Shawn', id: 2, subline: 'Inspiration' },
  { headline: 'William Lardinois', id: 3, subline: 'Tending Bar' },
  { headline: 'Driftwood Oven', id: 4, subline: 'Film Location' },
]

const loop = [cast, crew, thanks, emeritus]

const v16__ModuleCredits = () => {
  return (
    <GridWrapper>
      <WrapperLeft>
        <Heading as="h2" size={{ initial: '7', md: '8' }} className="font-normal!">
          Credits
        </Heading>
      </WrapperLeft>
      <WrapperRight>
        {loop.map((l, i) => {
          return (
            <Flex
              className="rounded-3 bg-accent-3"
              direction="column"
              width="100%"
              // biome-ignore lint/suspicious/noArrayIndexKey: @todo
              key={`credits-${i}`}
            >
              {/* @ts-ignore */}
              <ModuleCredit items={l} />
            </Flex>
          )
        })}
      </WrapperRight>
    </GridWrapper>
  )
}

const v16__ModuleCredit = ({ items }: { items: Credit[] }) => {
  const creditType = items[0].headline
  // @ts-ignore
  // biome-ignore lint/correctness/noUndeclaredVariables: @todo
  const _items = DataJeromeAnd[creditType.toLowerCase()]
  if (_items === undefined || _items?.length === 0) return null

  return (
    <Flex direction="column" gap="3" p={{ initial: '2', md: '4' }}>
      <Heading as="h3">{creditType}</Heading>
      <Grid className="h-fit" columns={{ initial: '2', md: '3' }} gap="3">
        {_items.map((item: any) => {
          const isHeading = item.id === 0
          if (isHeading) return
          const isStrong =
            !!item.subline &&
            item.subline !== 'Cast' &&
            item.subline !== 'Thanks' &&
            item.subline !== 'Cast Emeritus'
          const Component = isStrong ? Strong : Fragment
          return (
            <Text
              as="span"
              className="block whitespace-pre-line"
              key={`item-${creditType.toLowerCase()}--${item.id}`}
              size={item.id === 0 ? '6' : '3'}
            >
              <Component className="block">{item.headline}</Component>
              {isStrong && item.subline}
            </Text>
          )
        })}
      </Grid>
    </Flex>
  )
}

const ModuleCredits = ({ data }: { data: any }) => {
  return (
    <>
      {loop.map((l, i) => {
        return (
          <Flex
            direction="column"
            width="100%"
            // biome-ignore lint/suspicious/noArrayIndexKey: @todo
            key={`credits-${i}`}
          >
            <ModuleCredit data={data} items={l} />
          </Flex>
        )
      })}
    </>
  )
}

const ModuleCredit = ({ data, items }: { data: any; items: Credit[] }) => {
  const creditType = items[0].headline
  const _items = data[creditType.toLowerCase()]
  if (_items === undefined || _items?.length === 0) return null

  return (
    <Flex direction="column" gap="3" pb={{ initial: '4', md: '6' }}>
      <Text className="" size={{ initial: '6', md: '8' }}>
        <Em>{creditType}</Em>
      </Text>
      <Grid className="h-fit" columns={{ initial: '2', md: '3' }} gap="3">
        {_items.map((item: any) => {
          const isHeading = item.id === 0
          if (isHeading) return
          const isStrong =
            !!item.subline &&
            item.subline !== 'Cast' &&
            item.subline !== 'Thanks' &&
            item.subline !== 'Cast Emeritus'
          const Component = isStrong ? Strong : Fragment
          return (
            <Text
              as="span"
              className="block whitespace-pre-line"
              key={`item-${creditType.toLowerCase()}--${item.id}`}
              size={item.id === 0 ? '6' : '4'}
            >
              <Component className="block">{item.headline}</Component>
              {isStrong && (
                <Text as="p" size="3">
                  <Em>{item.subline}</Em>
                </Text>
              )}
            </Text>
          )
        })}
      </Grid>
    </Flex>
  )
}

export {
  ModuleAbout,
  ModuleCredit,
  ModuleCredits,
  ModuleHome,
  ModuleImageGallery,
  ModuleShow,
}
