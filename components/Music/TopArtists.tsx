import { ExternalLinkIcon } from '@radix-ui/react-icons'
import _map from 'lodash/map'
// import _reverse from 'lodash/reverse'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import _title from 'title'

import {
  ImageSkeleton,
  ImageWithBackgroundBlur,
} from '~components/Notion/Layout/ImageLead'
import useSpotify from '~hooks/useSpotify'
import fetcher from '~lib/fetcher'
import {
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Paragraph,
  Skeleton,
} from '~styles/system/components'
import lpad from '~utils/lpad'
import rangeMap from '~utils/rangeMap'

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000

const DEFAULT_URL = '/api/spotify/top-artists'

const TA = () => {
  const [url, urlSet] = useState(DEFAULT_URL + `?limit=20&time_range=medium_term`)
  const {
    data: { time_range },
  } = useSpotify()

  const { data, error } = useSWR(url, fetcher, {
    refreshInterval: HOUR,
    revalidateOnFocus: false,
  })

  useEffect(() => {
    urlSet(DEFAULT_URL + `?limit=20&time_range=${time_range}`)
    return () => {}
  }, [time_range])

  const loading = !data && !error

  if (loading) {
    return (
      <>
        {rangeMap(10, (i) => {
          return (
            <>
              <Box key={`top10artists--${i}`}>
                <ImageSkeleton />
                <Container css={{ my: '$3' }}>
                  <Heading size="2">
                    {/* {lpad(i + 1)}.{' '} */}
                    <Skeleton
                      as="div"
                      css={{
                        height: '100%',
                        width: '75%',
                      }}
                    >
                      &nbsp;
                    </Skeleton>
                  </Heading>
                </Container>
              </Box>
            </>
          )
        })}
      </>
    )
  }

  const artists = data?.artists

  return (
    <>
      {_map(artists, (item, itemIdx: number) => {
        const { genres, name } = item
        const { base64, img, slug } = item.meta

        const imageLabel = `Photo of ${name}`
        // const linkLabel = `Link to ${name}” on Spotify`

        return (
          <Box key={`top10artists--${itemIdx}`}>
            <ImageWithBackgroundBlur
              base64={base64}
              description={imageLabel}
              image={img}
              slug={slug}
            />
            <Container css={{ my: '$3', mx: '-$3' }}>
              <Heading size="3" css={{ my: '$2' }}>
                {lpad(itemIdx + 1)}. {name}
              </Heading>
            </Container>
            <Container as="ul" css={{ unset: 'all', mx: '-$3' }}>
              {_map(genres.slice(0, 4), (genre, genreIdx) => (
                <Badge
                  as="li"
                  key={`genre-${genreIdx}`}
                  size="2"
                  css={{
                    p: '$3',
                    m: '$1',
                    c: '$hiContrast',
                    border: '1px solid $hiContrast',
                    fontWeight: '700',
                  }}
                >
                  {_title(genre)}
                </Badge>
              ))}
            </Container>
            <Container css={{ my: '$3', mx: '-$1' }}>
              {genres.length > 4 && (
                <Paragraph size="1" css={{ mt: '-$3', pb: '$2' }}>
                  <small>+ {genres.length - 4} more</small>
                </Paragraph>
              )}
              <Paragraph size="1" css={{ py: '$2' }}>
                <>
                  <Link
                    href={item.url}
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
            </Container>
          </Box>
        )
      })}
    </>
  )
}

const TAContainer = () => {
  return (
    <Box css={{ position: 'relative', mt: '$8' }}>
      <Heading size="3" as="h2" css={{ my: '$5' }}>
        Top Artists
      </Heading>
      <Grid
        align="start"
        css={{
          gridTemplateColumns: '1fr',
          columnGap: '$6  ',
          rowGap: '$6',
          '@bp1': { gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 2fr))' },
        }}
      >
        <TA />
      </Grid>
    </Box>
  )
}

export default TAContainer
