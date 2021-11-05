/* eslint-disable @typescript-eslint/no-unused-vars */

import _find from 'lodash/find'
import _map from 'lodash/map'
import _size from 'lodash/size'
// import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { useSound } from 'use-sound'

import { TopArtists, TopTracks } from '~components/Music'
import PageHeading from '~components/PageHeading'
import Seo from '~components/Seo'
import { useUI } from '~context/ManagedUIContext'
import useSpotify from '~hooks/useSpotify'
import {
  Container,
  Flex,
  Heading,
  RadioCard,
  RadioCardGroup,
  Paragraph,
  Section,
  Text,
} from '~styles/system/components'

// import {
//   spotifyFavoriteAlbums,
//   spotifyFavoriteArtists,
// } from '~lib/spotify/favorites'

// const Emoji = dynamic(() => import('~components/Notion/Emoji'), {
//   ssr: false,
// })

const plans = [
  {
    id: 0,
    name: '* All Time',
    description: 'Since March 2020',
    time_range: 'long_term',
  },
  {
    id: 1,
    name: '~ 6 month',
    description: 'Past six months',
    time_range: 'medium_term',
  },
  {
    id: 2,
    name: '~ 1 month',
    description: 'Past month',
    time_range: 'short_term',
  },
]

const Music = () => {
  const { data, setSpotifyTimeRange } = useSpotify()

  const [selected, setSelected] = useState(
    _find(plans, { time_range: data?.time_range })
  )

  const { audio } = useUI()
  const [playOn] = useSound('/static/audio/pop-up-on.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })

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

  const handleSpotifyTimeRange2 = async (time_range) => {
    // console.dir(time_range)
    setSelected(time_range)
    playOn()
    await setSpotifyTimeRange(data, time_range)
  }

  return (
    <>
      <Seo {...seo} />
      <PageHeading title={seo.title} description={seo.description} />
      <Text
        as="p"
        css={{
          my: '$6',
          fontSize: '$6',
          letterSpacing: '-.015em',
          lineHeight: '1.5',
        }}
      >
        Musical Taste
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
        Please support artists by going to shows (when we can again), purchasing
        music, especially local and indie. Like Nice Rec’s, “Drink The Blue Sky” on
        Bandcamp.
      </Text>
      <Text as="p" css={{ my: '$6', fontSize: '$5', lineHeight: '1.5' }}>
        Links will open in, and all data comes from Spotify. (My “Music” library is
        at over 50 days, and am continuing an ever growing vinyl collection [have not
        yet made the leap to first editions, heh].)
      </Text>
      <Section size="1">
        <Container size="5" css={{ position: 'sticky' }}>
          <Heading as="h4" id="radiocard" css={{ mb: '$3', scrollMarginTop: '$7' }}>
            Change time frequency
          </Heading>
          <Paragraph css={{ mb: '$3' }}>
            I’ve had <strong>Spotify</strong> since March 2020, so you can go back
            that far or two other options currently.
          </Paragraph>
          <RadioCardGroup
            value={selected?.time_range}
            onValueChange={handleSpotifyTimeRange2}
          >
            {plans.map((plan) => {
              return (
                <RadioCard
                  key={plan.name}
                  value={plan.time_range}
                  css={{
                    mb: '$2',
                    width: 'var(--width-11_12)',
                    fontFamily: '$mono',
                  }}
                >
                  <Flex css={{ alignItems: 'center' }}>
                    <Text
                      size="5"
                      css={{ fontWeight: '500', lineHeight: '25px', mr: '$6' }}
                    >
                      {plan.name}
                    </Text>
                    <Text size="4" color="gray">
                      {plan.description}
                    </Text>
                  </Flex>
                </RadioCard>
              )
            })}
          </RadioCardGroup>
        </Container>
        <TopArtists />
        <TopTracks />
      </Section>
    </>
  )
}

export default Music
