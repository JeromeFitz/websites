'use client'

import { Box, Grid } from '@radix-ui/themes'

import {
  CalendarIcon,
  HomeIcon,
  InfoCircledIcon,
  MicrophoneIcon,
  StarIcon,
} from '@/components/Icon'

import { Header } from './Header'
import { LinkButton } from './LinkButton'

const HeaderNavigation = () => {
  return (
    <Header>
      <Grid
        align="center"
        columns={{ initial: '12', md: '12' }}
        gap="2"
        justify="center"
        px={{ initial: '3', md: '6' }}
        py={{ initial: '3', md: '6' }}
        width="100%"
      >
        <>
          <Box gridColumnStart="1" gridColumnEnd={{ initial: '13', md: '7' }}>
            <LinkButton
              icon={<HomeIcon />}
              text="Jerome Fitzgerald"
              textMobile="Jerome"
            />
          </Box>
          <Box
            gridColumnStart={{ initial: '1', md: '7' }}
            gridColumnEnd={{ initial: '7', md: '10' }}
          >
            <LinkButton icon={<InfoCircledIcon />} text="About" />
          </Box>
          {/* <Box
            gridColumnStart={{ initial: '1', md: '7' }}
            gridColumnEnd={{ initial: '7', md: '10' }}
          >
            <LinkButton icon={<MicrophoneIcon />} text="Podcasts" />
          </Box> */}
          <Box
            gridColumnStart={{ initial: '7', md: '10' }}
            gridColumnEnd={{ initial: '13', md: '13' }}
          >
            <LinkButton icon={<StarIcon />} text="Shows" />
          </Box>
          <Box
            gridColumnStart={{ initial: '1', md: '7' }}
            gridColumnEnd={{ initial: '13', md: '13' }}
          >
            <LinkButton icon={<CalendarIcon />} text="Upcoming Events" />
          </Box>
        </>
      </Grid>
    </Header>
  )
}

export { HeaderNavigation }
