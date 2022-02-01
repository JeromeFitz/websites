/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  // Container,
  Flex,
  Heading,
  Link,
  Note,
  PageHeading,
  // Paragraph,
  RadioCard,
  RadioCardGroup,
  Section,
  Text,
} from '@jeromefitz/design-system/components'
import useSpotify from '@jeromefitz/design-system/hooks/useSpotify'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import _find from 'lodash/find'
import _map from 'lodash/map'
import _size from 'lodash/size'
// import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { useSound } from 'use-sound'

import { Top, YearInReview } from '~components/Music'
import Seo from '~components/Seo'
import { useUI } from '~context/UI'

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
    'Jerome loves music. Here are his current top artists and tracks.'

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
      <Note>This page is in-progress.</Note>
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
        music, especially local and indie. Like{' '}
        <Link
          href="https://nicerec.bandcamp.com/album/drink-the-blue-sky"
          target="_blank"
          css={{ display: '', alignItems: 'center' }}
          variant="contrast"
        >
          Nice Rec’s, “Drink The Blue Sky” on Bandcamp
          <Flex
            as="span"
            css={{ display: 'inline-block', color: '$hiContrast', ml: '$1' }}
          >
            <ExternalLinkIcon />
          </Flex>
        </Link>
        .
      </Text>
      {/* <Text
        as="p"
        css={{
          my: '$6',
          fontSize: '$6',
          lineHeight: '1.5',
          '& > strong': { color: '$spotify-green' },
        }}
      >
        Links will open in, and all data comes from <strong>Spotify</strong>.
      </Text> */}
      <Text as="p" css={{ my: '$6', fontSize: '$4', lineHeight: '1.4' }}>
        My “Music” library is at over 50 days, and am continuing an ever growing
        vinyl collection (have not yet made the leap to first editions, heh).
      </Text>
      <Section size="1">
        <Box css={{ position: 'sticky', mb: '$3', pb: '$3' }}>
          <Heading
            as="h4"
            size="3"
            id="radiocard"
            css={{ mb: '$3', scrollMarginTop: '$7' }}
          >
            Change time frequency
          </Heading>
          {/* <Paragraph
            size="2"
            css={{ mb: '$3', '& > strong': { color: '$spotify-green' } }}
          >
            I’ve had <strong>Spotify</strong> since March 2020, so you can go back
            that far or two other options currently.
          </Paragraph> */}
          <RadioCardGroup
            defaultValue={selected?.time_range}
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
                  <Flex
                    css={{
                      alignItems: 'center',
                      flexDirection: 'column',
                      '@bp1': { flexDirection: 'row' },
                    }}
                  >
                    <Text
                      size="5"
                      css={{
                        fontWeight: '500',
                        lineHeight: '25px',
                        mr: '$6',
                        // mb: '$2',
                        // '@bp1': { mb: 0 },
                      }}
                    >
                      {plan.name}
                    </Text>
                    <Text
                      size="4"
                      color="gray"
                      css={{ display: 'none', '@bp1': { display: 'block' } }}
                    >
                      {plan.description}
                    </Text>
                  </Flex>
                </RadioCard>
              )
            })}
          </RadioCardGroup>
        </Box>
        <Top key="top-artists" type="top-artists" />
        <Top key="top-tracks" type="top-tracks" />
        <YearInReview />
      </Section>
    </>
  )
}

export default Music
