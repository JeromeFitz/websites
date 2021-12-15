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

import {
  spotifyFavoriteAlbums,
  spotifyFavoriteArtists,
} from '~lib/spotify/favorites'

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
  const base64 = spotifyFavoriteArtists[0]?.artists[0].meta.base64
  const imageSlug = spotifyFavoriteArtists[0]?.artists[0]?.meta?.slug
  const imageData = spotifyFavoriteArtists[0]?.artists[0]?.meta
  const genresData = spotifyFavoriteArtists[0].genres
  const artist = {
    name: spotifyFavoriteArtists[0].artist.name,
  }
  const url = spotifyFavoriteArtists[0]?.artists[0]?.url

  const imageLabel = `Image of ${artist.name}`
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
        <span>{artist.name}</span>
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
  const base64 = spotifyFavoriteAlbums[0]?.album.meta.base64
  const imageSlug = spotifyFavoriteAlbums[0]?.artists[0]?.meta?.slug
  const imageData = spotifyFavoriteAlbums[0]?.artists[0]?.meta
  const genresData = spotifyFavoriteAlbums[0].genres
  const artist = {
    name: spotifyFavoriteAlbums[0].artist.name,
  }
  const url = spotifyFavoriteAlbums[0]?.track?.url

  const imageLabel = `Image of ${artist.name}`
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
        <span>{artist.name}</span>
      </Paragraph>
      <Separator css={{ my: '1rem !important', width: '100% !important' }} />
      <Paragraph
        size="2"
        css={{ color: '$hiContrast', fontWeight: 'bold', fontSize: '$6' }}
      >
        “{spotifyFavoriteAlbums[0].track.name}”
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
        Off of “<strong>{spotifyFavoriteAlbums[0].album.name}</strong>” released in{' '}
        <strong>{spotifyFavoriteAlbums[0].album.year}</strong>.
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
