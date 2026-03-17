'use client'

import { Box, Grid } from '@radix-ui/themes'

import {
  BookOpenIcon,
  // CalendarIcon,
  HomeIcon,
  InfoCircledIcon,
  MusicalNoteIcon,
  // MicrophoneIcon,
  // ReaderIcon,
  StarIcon,
  TicketIcon,
} from '@/components/Icon'

import { Footer, Header } from './Header'
import { LinkButton } from './LinkButton'

const itemsHeader = [
  {
    href: 'https://jeromefitzgerald.com/',
    icon: HomeIcon,
    text: 'Jerome Fitzgerald',
    textMobile: 'Jerome',
  },
  {
    href: 'https://jeromefitzgerald.com/',
    icon: InfoCircledIcon,
    text: 'About',
    textMobile: 'About',
  },
  {
    href: 'https://jeromefitzgerald.com/',
    icon: StarIcon,
    text: 'Shows',
    textMobile: 'Shows',
  },
]
const itemsFooter = [
  {
    color: 'purple',
    href: 'https://jeromefitzgerald.com/',
    icon: TicketIcon,
    text: 'FRI FEB 26: Firewheel Ensemble @ The Rat (DUMBO)',
    textMobile: 'FRI 02/26: Firewheel Ensemble',
  },
  {
    color: 'mint',
    href: 'https://jeromefitzgerald.com/',
    icon: BookOpenIcon,
    text: '“Raw Dog: The Naked Truth About Hot Dogs“ – Jaime Loftus',
    textMobile: '“Raw Dog: The Naked Truth About Hot Dogs“ – Jaime Loftus',
  },
  {
    color: 'orange',
    href: 'https://jeromefitzgerald.com/',
    icon: MusicalNoteIcon,
    text: '“Echoes” – Sorry',
    textMobile: '“Echoes” – Sorry',
  },
]

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
          {itemsHeader.map((item, i) => {
            let gridColumnStart = { initial: '1', md: '1' }
            let gridColumnEnd = { initial: '13', md: '7' }

            if (i === 1) {
              gridColumnStart = { initial: '1', md: '7' }
              gridColumnEnd = { initial: '7', md: '10' }
            }
            if (i === 2) {
              gridColumnStart = { initial: '7', md: '10' }
              gridColumnEnd = { initial: '13', md: '13' }
            }
            return (
              <Box
                gridColumnStart={gridColumnStart}
                gridColumnEnd={gridColumnEnd}
                // biome-ignore lint/suspicious/noArrayIndexKey: @todo
                key={i}
              >
                <LinkButton
                  icon={<item.icon />}
                  href={item.href}
                  text={item.text}
                  textMobile={item.textMobile}
                />
              </Box>
            )
          })}
        </>
      </Grid>
    </Header>
  )
}

const FooterNavigation = () => {
  return (
    <Footer>
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
          {itemsFooter.map((item, i) => {
            let gridColumnStart = { initial: '1', md: '1' }
            let gridColumnEnd = { initial: '13', md: '7' }

            if (i === 1) {
              gridColumnStart = { initial: '1', md: '7' }
              gridColumnEnd = { initial: '7', md: '10' }
            }
            if (i === 2) {
              gridColumnStart = { initial: '7', md: '10' }
              gridColumnEnd = { initial: '13', md: '13' }
            }
            return (
              <Box
                gridColumnStart={gridColumnStart}
                gridColumnEnd={gridColumnEnd}
                // biome-ignore lint/suspicious/noArrayIndexKey: @todo
                key={i}
              >
                <LinkButton
                  // @ts-ignore
                  color={item.color}
                  icon={<item.icon />}
                  href={item.href}
                  text={item.text}
                  textMobile={item.textMobile}
                />
              </Box>
            )
          })}
        </>
      </Grid>
    </Footer>
  )
}

export { FooterNavigation, HeaderNavigation }
