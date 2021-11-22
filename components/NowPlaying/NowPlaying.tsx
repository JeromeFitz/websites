import { ExternalLinkIcon } from '@radix-ui/react-icons'
import Slugger from 'github-slugger'
import _map from 'lodash/map'
import _slice from 'lodash/slice'
import NextLink from 'next/link'
import useSWR from 'swr'
import _title from 'title'

import fetcher from '~lib/fetcher'
import { spotifyFavoriteTracks } from '~lib/spotify/favorites'
import {
  Badge,
  Flex,
  Heading,
  Link,
  Paragraph,
  Separator,
} from '~styles/system/components'
import { CardSpotify } from '~styles/system/components/Card/Spotify'
import { styled } from '~styles/system/stitches.config'

// const HOUR = 3600000
const MINUTE = 60000
// const SECOND = 1000

const initialData = spotifyFavoriteTracks[0]

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

const NowPlaying = () => {
  const { data } = useSWR('/api/spotify/now-playing', fetcher, {
    fallbackData: initialData,
    refreshInterval: MINUTE,
    revalidateOnFocus: true,
  })
  // @refactor(swr) This a little convulated
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { album, artist, artists, genres, isPlaying, meta, track } =
    data.isPlaying || !!data.artist ? data : initialData
  // const { album, artist, genres, isPlaying, meta, track } = initialData
  const genresData = _slice(genres, 0, 3)

  const title = isPlaying ? 'Listening To' : 'Listening To'

  const slugger = new Slugger()
  const base64 = album?.meta?.base64
  const imageSlug = album?.meta?.slug
  const imageData = album?.meta

  const imageLabel = `Image of ${artist.name}’s “${track.name}” album cover`

  return (
    <Section>
      <Container>
        <Heading as="h3" size="4" css={{ mb: '$3' }}>
          {title}
        </Heading>
        <Separator css={{ margin: '0', width: '100% !important' }} />
        <Paragraph css={{ my: '$4' }}>
          I listen to a lot of music. I do not think that makes me unique, however, I
          enjoy it all the same. If you’d like to see more of my listening habits
          please check out the{' '}
          <NextLink href="/music" passHref>
            <Link
              className="font-black _text-black underline-style-solid underline-offset-md underline-thickness-md"
              css={{ fontWeight: '700' }}
            >
              music
            </Link>
          </NextLink>{' '}
          section. (Though full disclosure, I also like to{' '}
          <NextLink href="/books" passHref>
            <Link
              className="font-black _text-black underline-style-solid underline-offset-md underline-thickness-md"
              css={{ fontWeight: '700' }}
            >
              read
            </Link>
          </NextLink>
          .)
        </Paragraph>
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
            <span>{`“${track.name}”`}</span>
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
            <>
              Off of “<strong>{album.name}</strong>” released in{' '}
              <strong>{album.year}</strong>.
            </>
          </Paragraph>
          <Paragraph size="1" css={{ py: '$2' }}>
            <>
              <Link
                href={track.url}
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
        <Separator css={{ margin: '0 auto $9', width: '1% !important' }} />
      </Container>
    </Section>
  )
}

export default NowPlaying
