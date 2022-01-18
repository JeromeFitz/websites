import { lpad, rangeMap } from '@jeromefitz/utils'
import _map from 'lodash/map'
import _title from 'title'

import {
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Paragraph,
  Section,
  Skeleton,
  Spacer,
  Text,
} from '@jeromefitz/design-system/components'

import { PageHeading } from '~components/Layout'
import { ImageWithBackgroundBlur } from '~components/Layout/ImageLead'
// import { IMAGE__PLACEHOLDER } from '~lib/constants'
import { artists, tracks } from '~data/mock/spotify/top10'

const properties = {
  title: 'Grid',
  seoDescription: 'Design System',
}

// const base64 = IMAGE__PLACEHOLDER.meta.base64
// const description = IMAGE__PLACEHOLDER.meta.slug
// const image = IMAGE__PLACEHOLDER.meta.img
// const slug = IMAGE__PLACEHOLDER.meta.slug

// const artist = {
//   name: 'Nice Rec',
//   genres: ['hip-hop', 'punk', 'folk', 'new-wave', 'post-punk'],
// }

const Playground = () => {
  return (
    <>
      <PageHeading
        description={properties.title}
        title={properties.seoDescription}
      />
      <Box
        css={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'min-content',
          ox: 'auto',
          oy: 'hidden',
          py: '$1',
          WebkitOverflowScrolling: 'touch',

          // Gap between slides
          $$gap: '$space$5',

          // calculate the left padding to apply to the scrolling list
          // so that the carousel starts aligned with the container component
          // the "1145" and "$5" values comes from the <Container /> component
          '$$scroll-padding': 'max($$gap, calc((100% - 1145px) / 2 + $$gap))',
          pl: '$$scroll-padding',

          // hide scrollbar
          MsOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },

          // Can't have nice grid gap because Safari butchers scroll padding with it
          '& > *': {
            pr: '$$gap',
          },
        }}
      >
        <Skeleton
          css={{
            boxShadow: '0 0 0 1px $colors$slateA5',
            backgroundColor: '$spotify-green',
            mt: '$4',
            minHeight: '200px',
            minWidth: '200px',
          }}
        />
        <Box
          css={{
            boxShadow: '0 0 0 1px $colors$slateA5',
            backgroundColor: '$spotify-green',
            mt: '$4',
            minHeight: '200px',
            minWidth: '200px',
          }}
          className="a-no-focus"
          tabIndex={-1}
        >
          <Flex align="center" direction="column" gap="2">
            <Text size="3" css={{ color: '$spotify-black' }}>
              Text
            </Text>
            <Text size="3">More Text</Text>
          </Flex>
        </Box>
      </Box>
      <Section as="div" size="3">
        <Box>
          <Grid
            align="start"
            css={{
              gridTemplateColumns: '1fr',
              columnGap: '$2',
              rowGap: '$2',
            }}
          >
            {rangeMap(9, (i) => (
              <Text size={9 - i}>Text Size {9 - i}</Text>
            ))}
          </Grid>
          <Container css={{ minHeight: '3rem' }}>
            <Spacer />
          </Container>
          <Grid
            align="start"
            css={{
              gridTemplateColumns: '1fr',
              columnGap: '$2',
              rowGap: '$2',
            }}
          >
            {rangeMap(4, (i) => (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <Heading size={4 - i}>Heading Size {4 - i}</Heading>
            ))}
          </Grid>
        </Box>
      </Section>
      <Spotify />
    </>
  )
}

const Spotify = () => {
  return (
    <>
      <Grid
        align="start"
        css={{
          gridTemplateColumns: '1fr',
          columnGap: '$6  ',
          rowGap: '$6',
          '@bp1': { gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 2fr))' },
        }}
      >
        {/* {rangeMap(10, (i) => (
          <Box key={`box-${i}`}>
            <ImageWithBackgroundBlur
              base64={base64}
              description={description}
              image={image}
              slug={slug}
            />
            <Heading size="2">
              <sup style={{ marginRight: '0.25rem' }}>{i}</sup>
              Nice Rec
            </Heading>
            <Container as="ul">
              {_map(artist.genres.slice(0, 10), (genre) => (
                <Badge as="li" size="2" css={{ p: '$2', m: '$1' }}>
                  {_title(genre)}
                </Badge>
              ))}
            </Container>
          </Box>
        ))} */}
        {_map(artists, (artist, artistIdx) => {
          const { name } = artist
          const { base64, img, slug } = artist.meta
          const description = name

          return (
            <Box key={`top10artists-${artistIdx}`}>
              <ImageWithBackgroundBlur
                base64={base64}
                description={description}
                image={img}
                slug={slug}
              />
              <Container css={{ my: '$3' }}>
                <Heading size="2">
                  {lpad(artistIdx + 1)}. {name}
                </Heading>
              </Container>
              <Container as="ul">
                {_map(artist.genres.slice(0, 10), (genre) => (
                  <Badge
                    as="li"
                    size="2"
                    css={{
                      p: '$3',
                      m: '$1',
                      c: '$hiContrast',
                      border: '1px solid $hiContrast',
                      fontWeigth: '700',
                    }}
                  >
                    {_title(genre)}
                  </Badge>
                ))}
              </Container>
            </Box>
          )
        })}
      </Grid>
      <Grid
        align="start"
        css={{
          gridTemplateColumns: '1fr',
          columnGap: '$6  ',
          rowGap: '$6',
          '@bp1': { gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 2fr))' },
        }}
      >
        {_map(tracks, (item, itemIdx) => {
          const { base64, img, slug } = item.album.meta
          const description = item.album.name

          return (
            <Box key={`top10tracks--${itemIdx}`}>
              <ImageWithBackgroundBlur
                base64={base64}
                description={description}
                image={img}
                slug={slug}
              />
              <Container css={{ my: '$3' }}>
                <Heading size="2" css={{ my: '$1' }}>
                  {lpad(itemIdx + 1)}. “{item.track.name}”
                </Heading>
                <Heading size="1" css={{ my: '$1' }}>
                  {item.artist.name}
                </Heading>

                <Paragraph>
                  <small>
                    <em>Off of... </em>
                  </small>
                  {description} ({item.album.year})
                </Paragraph>
              </Container>
            </Box>
          )
        })}
      </Grid>
    </>
  )
}

export default Playground
