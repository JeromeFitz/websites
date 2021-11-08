import _map from 'lodash/map'
import _title from 'title'

import { ImageWithBackgroundBlur } from '~components/Notion/Layout/ImageLead'
import PageHeading from '~components/PageHeading'
// import { IMAGE__PLACEHOLDER } from '~lib/constants'
import { artists, tracks } from '~data/mock/spotify/top10'
import {
  Badge,
  Box,
  Container,
  Grid,
  Heading,
  Paragraph,
  Section,
  Spacer,
  Text,
} from '~styles/system/components'
import lpad from '~utils/lpad'
import rangeMap from '~utils/rangeMap'

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
      {/*  */}
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
    </>
  )
}

export default Playground
