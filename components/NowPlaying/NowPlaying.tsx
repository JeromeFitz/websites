import { ExternalLinkIcon } from '@radix-ui/react-icons'
import cx from 'clsx'
// import { useAnimation, motion } from 'framer-motion'
import Slugger from 'github-slugger'
import _map from 'lodash/map'
import _slice from 'lodash/slice'
import NextLink from 'next/link'
// import { useEffect } from 'react'
// import { useInView } from 'react-intersection-observer'
// import useSWR, { useSWRConfig } from 'swr'
import useSWR from 'swr'
import _title from 'title'

// import { CardWithGlow, CardWithGlowProps } from '~components/Card'
// import Icon from '~components/Icon'
import { WEBKIT_BACKGROUND__BREAK } from '~lib/constants'
import fetcher from '~lib/fetcher'
import { spotifyFavoriteTracks } from '~lib/spotify/favorites'
import { Badge, Flex, Paragraph, Separator } from '~styles/system/components'
import { CardSpotify } from '~styles/system/components/Card/Spotify'
import { styled } from '~styles/system/stitches.config'

// const HOUR = 3600000
const MINUTE = 60000
// const SECOND = 1000

const initialData = spotifyFavoriteTracks[0]
// const variants = {
//   visible: { opacity: 1, transition: { duration: 1 } },
//   hidden: { opacity: 0 },
// }

//
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

const Header = styled('h3', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: '$8',
  lineHeight: 1.25,
  mt: 0,
  mb: 3,
})

// const Separator = styled('div', {
//   width: '100%',
//   height: '0.125rem',
//   '@bp1': { height: '1px' },
// })

// const LocalImage = ({ imageData, imageSlug, loading, meta }) => {
//   return (
//     <>
//       {!!imageData && !loading ? (
//         <NextImage
//           alt={`Image for ${meta?.name}`}
//           blurDataURL={imageData.base64}
//           className={cx('rounded')}
//           key={imageSlug}
//           layout="intrinsic"
//           placeholder="blur"
//           title={`Image for ${meta?.name}`}
//           {...imageData.img}
//         />
//       ) : (
//         <div
//           className={cx('rounded animate-pulse bg-black')}
//           style={{
//             height: imageData.img.height,
//             width: imageData.img.width,
//           }}
//         />
//       )}
//       {/* <ImageCaption caption={seoImageDescription} /> */}
//     </>
//   )
// }

const NowPlaying = () => {
  // const [ref, refInView] = useInView()
  // const controls = useAnimation()
  // useEffect(() => {
  //   if (refInView) {
  //     void controls.start('visible')
  //   }
  // }, [controls, refInView])

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
  /**
   * @images
   */
  // const { mutate } = useSWRConfig()
  // const { data: images } = useSWR('images')
  // useEffect(() => {
  //   const newImage = !!meta && {
  //     [meta.slug]: {
  //       base64: meta.base64,
  //       id: meta.slug,
  //       img: meta.img,
  //       url: meta.url,
  //     },
  //   }
  //   !!newImage && void mutate('images', { ...images, ...newImage })
  // }, [images, meta, mutate])

  const title = isPlaying ? 'Listening To' : 'Listening To'

  // const queryParams = !!album
  //   ? `url=${album?.imageUrl}`
  //   : `url=${`https://i.scdn.co/image/ab67616d0000b27377b08ffd1ea32abba3672bb6`}`

  // const { data: spotifyImage } = useSWR(
  //   [`/api/images`, queryParams],
  //   (url) => fetcher(`${url}?${queryParams}`),
  //   { revalidateOnFocus: false }
  // )
  // console.dir(`album`)
  // console.dir(album)
  // console.dir(`artists`)
  // console.dir(artists)
  // console.dir(`artist`)
  // console.dir(artist)
  // console.dir(`track`)
  // console.dir(track)
  // console.dir(`meta`)
  // console.dir(meta)

  const slugger = new Slugger()
  // const imageSlug = slugger.slug(album?.imageUrl)
  // const imageData = !!imageSlug && !!images && images[imageSlug]
  const base64 = album?.meta?.base64
  const imageSlug = album?.meta?.slug
  const imageData = album?.meta

  return (
    <Section>
      <Container>
        <Header style={WEBKIT_BACKGROUND__BREAK}>{title}</Header>
        <Separator css={{ margin: '0', width: '100% !important' }} />
        <Paragraph css={{ my: '$4' }}>
          I listen to a lot of music. I do not think that makes me unique, however, I
          enjoy it all the same. If you’d like to see more of my listening habits
          please check out the{' '}
          <NextLink href="/music" passHref>
            <a className="font-black _text-black underline-style-solid underline-offset-md underline-thickness-md">
              music
            </a>
          </NextLink>{' '}
          section. (Though full disclosure, I also like to{' '}
          <NextLink href="/books" passHref>
            <a className="font-black _text-black underline-style-solid underline-offset-md underline-thickness-md">
              read
            </a>
          </NextLink>
          .)
        </Paragraph>
        <CardSpotify base64={base64} image={imageData?.img} slug={imageSlug}>
          <Paragraph size="2" css={{ fontWeight: 'bold', fontSize: '$7' }}>
            <span>{artist.name}</span>
          </Paragraph>
          <Separator css={{ my: '1rem !important', width: '100% !important' }} />
          <Paragraph size="2" css={{ fontWeight: 'bold', fontSize: '$6' }}>
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
                    fontFamily: '$mono',
                  }}
                >
                  {_title(tag)}
                </Badge>
              </Flex>
            ))}
          </Flex>
          <Paragraph size="2" css={{ pb: '$1' }}>
            <>
              Off of “<span className={cx('font-bold')}>{album.name}</span>” released
              in <span className={cx('font-bold')}>{album.year}</span>.
            </>
          </Paragraph>
          <Paragraph size="1" css={{ pb: '$1' }}>
            <>
              <a
                aria-label={`Link to ${track.name}`}
                className={cx(
                  'underline-style-solid underline-offset-md underline-thickness-md',
                  '_text-black'
                )}
                href={track.uri}
                rel="noopener noreferrer"
                target="_blank"
                title={`Link to ${track.name}`}
              >
                Join along here.
                <Flex
                  as="span"
                  css={{
                    color: '$slate8',
                    display: 'inline-block',
                    ml: '$1',
                  }}
                >
                  <ExternalLinkIcon />
                </Flex>
              </a>
            </>
          </Paragraph>
        </CardSpotify>
        <Separator css={{ margin: '0 auto $9', width: '1% !important' }} />
      </Container>
    </Section>
  )
}

export default NowPlaying
