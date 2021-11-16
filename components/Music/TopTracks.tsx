import { CrossCircledIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import _map from 'lodash/map'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import {
  ImageSkeleton,
  ImageWithBackgroundBlur,
} from '~components/Notion/Layout/ImageLead'
import useSpotify from '~hooks/useSpotify'
import fetcher from '~lib/fetcher'
import {
  Box,
  Container,
  Grid,
  Flex,
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

const DEFAULT_URL = '/api/spotify/top-tracks'

const TT = () => {
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

  if (!data?.isPlaying)
    return (
      <Flex justify="start" align="center">
        <Paragraph>
          <Flex
            as="span"
            css={{
              // color: '$slate8',
              display: 'inline-block',
              mr: '$1',
            }}
          >
            <CrossCircledIcon />
          </Flex>
          Spotify API is currently down
        </Paragraph>
      </Flex>
    )

  if (loading) {
    return (
      <>
        {rangeMap(10, (i) => {
          return (
            <>
              <Box key={`top10tracks--${i}`}>
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

  return (
    <>
      {_map(data?.tracks, (item, itemIdx: number) => {
        const { base64, img, slug } = item.album.meta
        const description = item.album.name

        const imageLabel = `Image of ${item.artist.name}’s “${item.album.name}” album cover`
        // const linkLabel = `Link to ${item.artist.name}’s “${item.album.name}” on Spotify`

        return (
          <Box key={`top10tracks--${itemIdx}`}>
            <ImageWithBackgroundBlur
              base64={base64}
              description={imageLabel}
              image={img}
              slug={slug}
            />
            <Container css={{ my: '$3', mx: '-$3' }}>
              <Heading size="3" css={{ my: '$2' }}>
                {lpad(itemIdx + 1)}. {item.artist.name}
              </Heading>
              <Heading size="2" css={{ my: '$2' }}>
                “{item.track.name}”
              </Heading>

              <Paragraph>
                <small>
                  <em>Off of... </em>
                </small>
                {description} ({item.album.year})
              </Paragraph>
              <Paragraph size="1" css={{ py: '$2' }}>
                <>
                  <Link
                    href={item.album.url}
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

const TopTracks = () => {
  return (
    <>
      <Box css={{ position: 'relative', mt: '$8' }}>
        <Heading size="3" as="h2" css={{ my: '$5' }}>
          Top Tracks
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
          <TT />
        </Grid>
      </Box>
    </>
  )
}

export default TopTracks
