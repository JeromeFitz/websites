import { ExternalLinkIcon } from '@radix-ui/react-icons'
import Slugger from 'github-slugger'
import _map from 'lodash/map'
import _title from 'title'

import {
  Badge,
  Box,
  Flex,
  Heading,
  Link,
  Paragraph,
  Separator,
} from '@jeromefitz/design-system/components'
import { CardSpotify } from '@jeromefitz/design-system/components/Card/Spotify'
import { styled } from '@jeromefitz/design-system/stitches.config'

import { wrapped2020 } from '~data/spotify'

const Section = styled('section', {
  minHeight: '100%',
  borderTopWidth: '1px',
  borderColor: '$colors$gray12',
})

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '56rem',
  margin: '0 auto',
  padding: '1rem',
  '@bp1': { padding: 0 },
})

const Artist = () => {
  const slugger = new Slugger()
  const artist = wrapped2020.artist.items[0]

  const base64 = artist.image.base64
  const imageSlug = artist.image.slug
  const imageData = artist.image
  const genresData = artist.genres
  const artistName = artist.name
  const url = artist.external_urls.spotify

  const imageLabel = `Image of ${artistName}`
  return (
    <CardSpotify
      base64={base64}
      image={imageData?.img}
      imageLabel={imageLabel}
      slug={imageSlug}
    >
      <Paragraph
        size="2"
        css={{ color: '$hiContrast', fontWeight: 'bold', fontSize: '$7' }}
      >
        <span>{artistName}</span>
      </Paragraph>
      <Separator css={{ my: '1rem !important', width: '100% !important' }} />
      <Paragraph
        size="2"
        css={{ color: '$hiContrast', fontWeight: '400', fontSize: '$6' }}
      >
        Describing himself as “a DJ first, producer second, and MC last,”{' '}
        <strong>Madlib</strong> is the primary alias of{' '}
        <strong>Otis Jackson, Jr.</strong>, who has become one of the most
        celebrated, prolific, and eclectic artists in hip-hop since emerging on the
        scene in the early ‘90s.
      </Paragraph>
      <Flex
        as="ul"
        css={{
          all: 'unset',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          height: 'auto',
          my: '$1',
          '@bp1': { my: '$2' },
        }}
      >
        {_map(genresData.slice(0, 10), (tag) => (
          <Flex as="li" key={slugger.slug(tag)} css={{ p: '$2' }}>
            <Badge
              size="2"
              css={{
                border: '1px solid $hiContrast',
                fontFamily: '$mono',
                color: '$hiContrast',
              }}
            >
              {_title(tag)}
            </Badge>
          </Flex>
        ))}
      </Flex>
      {/* <Paragraph size="2" css={{ color: '$hiContrast', py: '$1' }}>
            </Paragraph> */}
      <Paragraph size="1" css={{ py: '$2' }}>
        <>
          <Link
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            variant="spotify"
          >
            Join on <strong>Spotify</strong>.
            <Flex
              as="span"
              css={{
                // color: '$slate8',
                display: 'inline-block',
                ml: '$1',
              }}
            >
              <ExternalLinkIcon />
            </Flex>
          </Link>
        </>
      </Paragraph>
    </CardSpotify>
  )
}

const Song = () => {
  const slugger = new Slugger()
  const track = wrapped2020.track.item
  const base64 = track.album.image.base64
  const imageSlug = track.album.image.slug
  const imageData = track.album.image
  const genresData = track.genres
  const artistName = track.artist
  const url = track.external_urls.spotify

  const imageLabel = `Image of ${artistName}`
  return (
    <CardSpotify
      base64={base64}
      image={imageData?.img}
      imageLabel={imageLabel}
      slug={imageSlug}
    >
      <Paragraph
        size="2"
        css={{ color: '$hiContrast', fontWeight: 'bold', fontSize: '$7' }}
      >
        <span>{artistName}</span>
      </Paragraph>
      <Separator css={{ my: '1rem !important', width: '100% !important' }} />
      <Paragraph
        size="2"
        css={{ color: '$hiContrast', fontWeight: 'bold', fontSize: '$6' }}
      >
        “{track.name}”
      </Paragraph>
      <Flex
        as="ul"
        css={{
          all: 'unset',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          height: 'auto',
          my: '$1',
          '@bp1': { my: '$2' },
        }}
      >
        {_map(genresData.slice(0, 10), (tag) => (
          <Flex as="li" key={slugger.slug(tag)} css={{ p: '$2' }}>
            <Badge
              size="2"
              css={{
                border: '1px solid $hiContrast',
                fontFamily: '$mono',
                color: '$hiContrast',
              }}
            >
              {_title(tag)}
            </Badge>
          </Flex>
        ))}
      </Flex>
      <Paragraph size="2" css={{ color: '$hiContrast', py: '$1' }}>
        Off of “<strong>{track.album.name}</strong>” released in{' '}
        <strong>{track.album.release_date.slice(0, 4)}</strong>.
      </Paragraph>
      <Paragraph size="1" css={{ py: '$2' }}>
        <>
          <Link
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            variant="spotify"
          >
            Join on <strong>Spotify</strong>.
            <Flex
              as="span"
              css={{
                // color: '$slate8',
                display: 'inline-block',
                ml: '$1',
              }}
            >
              <ExternalLinkIcon />
            </Flex>
          </Link>
        </>
      </Paragraph>
    </CardSpotify>
  )
}

const YearInReview = () => {
  return (
    <Section>
      <Container>
        <Box css={{ position: 'relative', mt: '$2' }}>
          <Heading size="4" as="h2" css={{ my: '$2' }}>
            Year In Review
          </Heading>
          <Paragraph
            size="2"
            as="p"
            css={{ color: '$colors$gray11', mt: '$1', mb: '$3' }}
          >
            I think it is understated how much music got me through the year that was
            2020.
          </Paragraph>
          <Separator css={{ my: '1rem !important', width: '100% !important' }} />
          <Heading size="3" as="h3" css={{ mt: '$4', my: '$6' }}>
            Artist of the Year
          </Heading>
          <Artist />
          <Heading size="3" as="h3" css={{ mt: '$6', my: '$6' }}>
            Song of the Year
          </Heading>
          <Song />
        </Box>
      </Container>
    </Section>
  )
}

export default YearInReview
