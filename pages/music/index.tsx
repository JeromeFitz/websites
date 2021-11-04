/* eslint-disable @typescript-eslint/no-unused-vars */
import { Heading, Paragraph, Text } from '@modulz/design-system'
import cx from 'clsx'
import { motion } from 'framer-motion'
import _find from 'lodash/find'
import _map from 'lodash/map'
import _size from 'lodash/size'
// import dynamic from 'next/dynamic'
// import { useState } from 'react'
// import { useSound } from 'use-sound'

// import { TopArtists, TopTracks } from '~components/Music'
import Seo from '~components/Seo'
// import { useUI } from '~context/ManagedUIContext'
// import useSpotify from '~hooks/useSpotify'
import {
  MOTION_PAGE_VARIANTS,
  // WEBKIT_BACKGROUND__BREAK
} from '~lib/constants'
// import {
//   spotifyFavoriteAlbums,
//   spotifyFavoriteArtists,
// } from '~lib/spotify/favorites'

// const Emoji = dynamic(() => import('~components/Notion/Emoji'), {
//   ssr: false,
// })

// const plans = [
//   {
//     name: 'All Time ',
//     description: 'Since March 2020',
//     time_range: 'long_term',
//   },
//   {
//     name: '~ 6 months',
//     description: 'Past six months',
//     time_range: 'medium_term',
//   },
//   {
//     name: '~ 1 Month',
//     description: 'Past month',
//     time_range: 'short_term',
//   },
// ]

const Music = () => {
  // const { data, setSpotifyTimeRange } = useSpotify()
  // // @todo(spotify): data.time_range === plan.time_range
  // const [selected, setSelected] = useState(
  //   _find(plans, { time_range: data?.time_range })
  // ) // useState(plans[1])

  // const { audio } = useUI()
  // const [playOn] = useSound('/static/audio/pop-up-on.mp3', {
  //   soundEnabled: audio,
  //   volume: 0.25,
  // })

  const url = 'https://jeromefitzgerald.com/music'
  const title = 'Music'
  const description =
    'Jerome loves music. Here are his current top artists and tracks (all data from Spotify).'

  const seo = {
    title: title,
    description: description,
    canonical: url,
    openGraph: {
      url,
      title,
      description,
    },
  }

  return (
    <>
      <Seo {...seo} />
      <motion.div
        key={`page-music`}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={MOTION_PAGE_VARIANTS}
        transition={{ duration: 1, type: 'linear' }}
        className={cx('flex flex-col')}
      >
        <div id="content">
          <Heading size="4">{seo.title}</Heading>
          <Paragraph size="2" as="p" css={{ mt: '$2', mb: '$7' }}>
            {seo.description}
          </Paragraph>
          <Text
            as="p"
            css={{
              my: '$6',
              fontSize: '$6',
              letterSpacing: '-.015em',
              lineHeight: '1.5',
            }}
          >
            My favorite author is{' '}
            <Text
              as="span"
              css={{ display: 'inline', fontSize: 'inherit', fontWeight: '500' }}
            >
              Robert A. Caro
            </Text>{' '}
            and not just because I spent a large chunk of my past year with their
            words (and his wife <span className={cx('font-bold')}>Ina Caro</span>,
            her books on France and Paris should be in{' '}
            <Text
              as="span"
              css={{ display: 'inline', fontSize: 'inherit', fontWeight: '500' }}
            >
              up next
            </Text>{' '}
            but am holding until we can travel again).
          </Text>
          <Text
            as="p"
            css={{
              my: '$6',
              fontSize: '$6',
              letterSpacing: '-.015em',
              lineHeight: '1.5',
            }}
          >
            <Text
              as="span"
              css={{ display: 'inline', fontSize: 'inherit', fontWeight: '500' }}
            >
              Madeline Miller
            </Text>{' '}
            has jump-started me back into the world of fiction after many years of
            unexplainable avoidance.
          </Text>
          <Text as="p" css={{ my: '$6', fontSize: '$5', lineHeight: '1.5' }}>
            They say a CEO reads ~60 books a year. Here is a quick rundown of some of
            the books I am currently reading, have read in the past year, and am
            looking forward to. (Spoiler: I am not a CEO.)
          </Text>
        </div>
      </motion.div>
    </>
  )
}

export default Music
