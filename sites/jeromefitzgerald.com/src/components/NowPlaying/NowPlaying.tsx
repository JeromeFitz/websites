import {
  Badge,
  Flex,
  Heading,
  Link,
  Paragraph,
  Separator,
  CardSpotify,
} from '@jeromefitz/design-system/components'
import { styled } from '@jeromefitz/design-system/stitches.config'
// import { ExternalLinkIcon } from '@radix-ui/react-icons'
import Slugger from 'github-slugger'
import _map from 'lodash/map'
import _slice from 'lodash/slice'
import NextLink from 'next/link'
import useSWR from 'swr'
import _title from 'title'

import { nowPlaying } from '~data/spotify'
import fetcher from '~lib/fetcher'

// const HOUR = 3600000
const MINUTE = 60000
// const SECOND = 1000

const initialData = nowPlaying

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
  const slugger = new Slugger()
  // @todo(swr) SWRHook
  const { data } = useSWR<any>(
    // 'http://localhost:3001/v/1/spotify/now-playing',
    '/api/v1/music/now-playing',
    fetcher,
    {
      fallbackData: initialData,
      refreshInterval: MINUTE,
      revalidateOnFocus: false,
    }
  )

  const { is_playing: isPlaying, item } =
    data?.is_playing || !!data?.item?.artist ? data : initialData

  const track = item

  const { album, artist, genres } = track

  const albumYear = album.release_date.slice(0, 4)
  const base64 = album?.image?.base64
  const imageSlug = album?.image?.slug
  const imageData = album?.image
  const imageLabel = `Image of ${artist}’s “${track.name}” album cover`

  const genresData = _slice(genres, 0, 3)

  const title = isPlaying ? 'Listening To' : 'Listening To'

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
            <span>{artist}</span>
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
            {_map(genresData.slice(0, 10), (tag: string) => (
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
              <strong>{albumYear}</strong>.
            </>
          </Paragraph>
          {/* <Paragraph size="1" css={{ py: '$2' }}>
            <>
              <Link
                href={track.external_urls.spotify}
                rel="noopener noreferrer"
                target="_blank"
                variant="spotify"
              >
                Join on <strong>Spotify</strong>.
                <Flex
                  as="span"
                  css={{
                    display: 'inline-block',
                    ml: '$1',
                  }}
                >
                  <ExternalLinkIcon />
                </Flex>
              </Link>
            </>
          </Paragraph> */}
        </CardSpotify>
        <Separator css={{ margin: '0 auto $9', width: '1% !important' }} />
      </Container>
    </Section>
  )
}

export default NowPlaying
