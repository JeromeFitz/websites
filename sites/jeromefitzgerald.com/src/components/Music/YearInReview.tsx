import {
  Badge,
  Box,
  CardSpotify,
  Flex,
  Heading,
  // Link,
  Paragraph,
  Separator,
} from '@jeromefitz/design-system/components'
import { styled } from '@jeromefitz/design-system/stitches.config'
// import { ExternalLinkIcon } from '@radix-ui/react-icons'
import Slugger from 'github-slugger'
import _map from 'lodash/map'
import { Fragment } from 'react'
import _title from 'title'

import { wrapped2020, wrapped2021 } from '~data/mock/music'
import TextAnnotations from '~lib/notion/app/utils/TextAnnotations'

const years = {
  2021: {
    title: '2021',
    description: (
      <>
        I think it is{' '}
        <TextAnnotations
          annotations={{}}
          href={`https://www.theonion.com/shitty-music-has-helped-moron-through-hardest-times-in-1848340506`}
          id={1848340506}
          key={1848340506}
          plain_text={`understated how much music got me through the year`}
        />{' '}
        that was 2021.
      </>
    ),
  },
  2020: {
    title: '2020',
    description: (
      <>
        I think it is also{' '}
        <TextAnnotations
          annotations={{}}
          href={`https://www.theonion.com/shitty-music-has-helped-moron-through-hardest-times-in-1848340506`}
          id={18483405061}
          key={18483405061}
          plain_text={`understated how much music got me through the year`}
        />{' '}
        that was 2020.
      </>
    ),
  },
}

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

const Artist = ({ year }) => {
  const slugger = new Slugger()
  const artist =
    year === '2021' ? wrapped2021.artist.items[0] : wrapped2020.artist.items[0]

  const base64 = artist.image.base64
  const imageSlug = artist.image.slug
  const imageData = artist.image
  const genresData = artist.genres
  const artistName = artist.name
  // const url = artist.external_urls.spotify

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
        {year === '2021' ? (
          <>
            <strong>James Dewitt Yancey</strong> was an American record producer and
            rapper who emerged in the mid-1990s underground hip hop scene in Detroit,
            Michigan.
            <br />
            <br />
            Although his life and career were short, <strong>
              Jay Dee/J Dilla
            </strong>{' '}
            is widely considered to be one of the most influential producers in the
            hip-hop genre
          </>
        ) : (
          <>
            Describing himself as “a DJ first, producer second, and MC last,”{' '}
            <strong>Madlib</strong> is the primary alias of{' '}
            <strong>Otis Jackson, Jr.</strong>, who has become one of the most
            celebrated, prolific, and eclectic artists in hip-hop since emerging on
            the scene in the early ‘90s.
          </>
        )}
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
      {/* <Paragraph size="1" css={{ py: '$2' }}>
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
      </Paragraph> */}
    </CardSpotify>
  )
}

const Song = ({ year }) => {
  const slugger = new Slugger()
  const track = year === '2021' ? wrapped2021.track.item : wrapped2020.track.item
  const base64 = track.album.image.base64
  const imageSlug = track.album.image.slug
  const imageData = track.album.image
  const genresData = track.genres
  const artistName = track.artist
  // const url = track.external_urls.spotify

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
      {/* <Paragraph size="1" css={{ py: '$2' }}>
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
      </Paragraph> */}
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
          {/* <Paragraph
            size="2"
            as="p"
            css={{
              color: '$colors$gray11',
              mt: '$3',
              mb: '$3',
              '& > strong': { color: '$spotify-green' },
            }}
          >
            This data is from <strong>Spotify</strong> too if you can imagine. Would
            be nice to do more of a breakdown like the{' '}
            <strong>Spotify Wrapped</strong> but here are the top of the pops baby.
          </Paragraph> */}
          {Object.keys(years)
            .sort(function (a: any, b: any) {
              return b - a
            })
            .map((year) => {
              const { title, description } = years[year]
              return (
                <Fragment key={`year-${year}`}>
                  <Separator
                    css={{ my: '1rem !important', width: '100% !important' }}
                  />
                  <Heading size="3" as="h3" css={{ my: '$5' }}>
                    {title}
                  </Heading>
                  <Paragraph
                    size="2"
                    as="p"
                    css={{ color: '$colors$gray11', mt: '$1', mb: '$3' }}
                  >
                    {description}
                  </Paragraph>
                  <Heading size="2" as="h4" css={{ mt: '$4', my: '$6' }}>
                    Artist of the Year ({year})
                  </Heading>
                  <Artist year={year} />
                  <Heading size="2" as="h4" css={{ mt: '$6', my: '$6' }}>
                    Song of the Year ({year})
                  </Heading>
                  <Song year={year} />
                </Fragment>
              )
            })}
        </Box>
      </Container>
    </Section>
  )
}

export default YearInReview
