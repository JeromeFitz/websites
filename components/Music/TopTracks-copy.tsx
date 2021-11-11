import _map from 'lodash/map'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
// import _title from 'title'

import { ImageWithBackgroundBlur } from '~components/Notion/Layout/ImageLead'
// import { Track } from '~components/Music'
import useSpotify from '~hooks/useSpotify'
import fetcher from '~lib/fetcher'
import {
  // Badge,
  Box,
  // Carousel,
  // CarouselArrowButton,
  // CarouselSlideList,
  // CarouselSlide,
  // CarouselNext,
  // CarouselPrevious,
  Container,
  // Flex,
  Grid,
  Heading,
  Paragraph,
  // Text,
} from '~styles/system/components'
import lpad from '~utils/lpad'

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000

const DEFAULT_URL = '/api/spotify/top-tracks'

const TopTracks = () => {
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

  if (loading) return null

  return (
    <Box css={{ position: 'relative', mt: '$8' }}>
      <Heading size="2" as="h2" css={{ my: '$5' }}>
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
        {_map(data?.tracks, (item, itemIdx: number) => {
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
    </Box>
  )

  // return (
  //   <ul>
  //     {loading
  //       ? [...Array(10).keys()].map((index: number) => (
  //           <Track key={`track-temp-${index}`} loading={true} ranking={index + 1} />
  //         ))
  //       : data?.tracks.map((track, index: number) => (
  //           <Track
  //             key={`track-perm-${index}`}
  //             loading={loading}
  //             ranking={index + 1}
  //             {...track}
  //           />
  //         ))}
  //   </ul>
  // )
}

export default TopTracks
