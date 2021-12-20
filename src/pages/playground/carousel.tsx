import { TagIcon } from '@heroicons/react/outline'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  // ExternalLinkIcon,
} from '@radix-ui/react-icons'
import _map from 'lodash/map'
import _size from 'lodash/size'
import NextLink from 'next/link'
import * as React from 'react'
import _title from 'title'

// import { ImageWithBackgroundBlur } from '~components/Layout/ImageLead'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  // Badge,
  Box,
  Carousel,
  CarouselSlideList,
  CarouselSlide,
  CarouselNext,
  CarouselPrevious,
  // Container,
  Flex,
  Link,
  // Paragraph,
  Section,
  Text,
} from '@jeromefitz/design-system/components'
import { Empty } from '@jeromefitz/design-system/components/Hero/Empty'
import { HeroImage } from '@jeromefitz/design-system/components/Hero/HeroImage'
import { MainHeroDialog } from '@jeromefitz/design-system/components/Hero/MainHeroDialog'
import { darkTheme, styled } from '@jeromefitz/design-system/stitches.config'

import { CarouselArrowButton, GrabBox, FocusArea } from '~components/Carousel'
import { Breakout } from '~components/Container'
import { PageHeading } from '~components/Layout'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { artists, tracks } from '~data/mock/spotify/top10'
import lpad from '~utils/lpad'
import rangeMap from '~utils/rangeMap'

const properties = {
  title: 'Carousel',
  seoDescription: 'Example',
}
const css_info = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '0.5rem',
}
const css_icon = {
  width: '1rem',
}
const backgrounds = [
  {
    light: 'linear-gradient(120deg, $indigo6, $crimson5)',
    dark: 'linear-gradient(120deg, $indigo4, $plum3)',
  },
  {
    light: 'linear-gradient(120deg, $crimson5, $blue5)',
    dark: 'linear-gradient(120deg, $plum3, $blue3)',
  },
  {
    light: 'linear-gradient(120deg, $blue5, $lime3)',
    dark: 'linear-gradient(120deg, $blue3, $sand6)',
  },
  {
    light: 'linear-gradient(120deg, $lime3, $pink4)',
    dark: 'linear-gradient(120deg, $sand6, $pink3)',
  },
  {
    light: 'linear-gradient(120deg, $pink4, $gold5)',
    dark: 'linear-gradient(120deg, $pink3, $gold4)',
  },
  {
    light: 'linear-gradient(120deg, $gold5, $tomato5)',
    dark: 'linear-gradient(120deg, $gold4, $crimson4)',
  },
  {
    light: 'linear-gradient(120deg, $tomato5, $indigo7)',
    dark: 'linear-gradient(120deg, $crimson4, $indigo5)',
  },
  {
    light: 'linear-gradient(120deg, $indigo7, $cyan3)',
    dark: 'linear-gradient(120deg, $indigo5, $cyan7)',
  },
  {
    light: 'linear-gradient(120deg, $cyan3, $mint5)',
    dark: 'linear-gradient(120deg, $cyan7, $teal6)',
  },
  {
    light: 'linear-gradient(120deg, $mint5, $red3)',
    dark: 'linear-gradient(120deg, $teal6, $plum4)',
  },
]
const backgroundsSize = _size(backgrounds)

const DemoContainer = styled('a', {
  display: 'flex',
  position: 'relative',
  ai: 'center',
  jc: 'center',
  width: 300,
  height: 400,
  borderRadius: '$3',
  mb: '$2',

  // Content slightly above vertical center feels perfectly centred
  pb: '$3',

  // Can't select text because the carousel is draggable
  userSelect: 'none',
  // cursor: 'default',

  '@bp1': {
    width: 400,
  },
})

const CarouselWithImages = () => {
  const lastUsedFocusArea = React.useRef<HTMLElement>(null)
  const isRoving = React.useRef(false)

  React.useEffect(() => {
    lastUsedFocusArea.current = document.querySelector('[data-focus-area]')
  }, [])

  const onFocusAreaFocus = React.useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      lastUsedFocusArea.current = event.currentTarget
    },
    []
  )

  // We are implementing a simple roving tab index with some tweaks
  const onFocusAreaKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.target === event.currentTarget) {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          const allAreas = Array.from(
            document.querySelectorAll<HTMLElement>('[data-focus-area]')
          )
          const thisIndex = allAreas.findIndex((el) => el === event.currentTarget)
          const nextIndex = Math.min(thisIndex + 1, allAreas.length - 1)
          const nextDemo = allAreas[nextIndex]
          isRoving.current = true
          nextDemo.focus()
          ;(nextDemo as any).scrollIntoViewIfNeeded?.(true)
          lastUsedFocusArea.current = nextDemo
          isRoving.current = false
        }

        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          const allAreas = Array.from(
            document.querySelectorAll<HTMLElement>('[data-focus-area]')
          )
          const thisIndex = allAreas.findIndex((el) => el === event.currentTarget)
          const prevIndex = Math.max(thisIndex - 1, 0) // thisIndex - 1 >= 0 ? thisIndex - 1 : allAreas.length - 1;
          const prevDemo = allAreas[prevIndex]
          isRoving.current = true
          prevDemo.focus()
          ;(prevDemo as any).scrollIntoViewIfNeeded?.(true)
          lastUsedFocusArea.current = prevDemo
          isRoving.current = false
        }

        // Tab key press moves focus to the next element after the carousel
        if (event.key === 'Tab' && event.shiftKey === false) {
          const selector =
            'a, button, input, select, textarea, [data-focus-area-exit]'
          const elements = Array.from(
            document.querySelectorAll<HTMLElement>(selector)
          ).filter(
            (element) =>
              element.tabIndex !== -1 || element.hasAttribute('data-focus-area-exit')
          )

          // Find last exit guard
          elements.reverse()
          const lastExit = elements.find((el) =>
            el.matches('[data-focus-area-exit]')
          )
          elements.reverse()
          const lastExitIndex = elements.indexOf(lastExit)
          const nextElement = elements[lastExitIndex + 1]

          if (nextElement) {
            event.preventDefault()
            nextElement.focus()
          }
        }

        // Shift + Tab key press moves focus to the previous element before the carousel
        if (event.key === 'Tab' && event.shiftKey) {
          const selector =
            'a, button, input, select, textarea, [data-focus-area-entry]'
          const elements = Array.from(
            document.querySelectorAll<HTMLElement>(selector)
          ).filter(
            (element) =>
              element.tabIndex !== -1 ||
              element.hasAttribute('data-focus-area-entry')
          )

          // Find first entry guard
          const firstEntry = elements.find((el) =>
            el.matches('[data-focus-area-entry]')
          )
          const firstEntryIndex = elements.indexOf(firstEntry)
          const prevElement = elements[firstEntryIndex - 1]

          if (prevElement) {
            event.preventDefault()
            prevElement.focus()
          }
        }
      }
    },
    []
  )

  React.useEffect(() => {
    // @todo(complexity) 11
    // eslint-disable-next-line complexity
    const tabListener = (event: KeyboardEvent) => {
      // Catch that Tab that lands into carousel contents from
      // elsewhere, and redirect focus to the nearest focus area
      if (
        event.key === 'Tab' &&
        event.shiftKey === false &&
        event.target instanceof HTMLElement &&
        !event.target.hasAttribute('data-focus-area')
      ) {
        const selector =
          'a, button, input, select, textarea, [data-focus-area-entry]'
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(selector)
        ).filter(
          (element) =>
            element.tabIndex !== -1 ||
            element === event.target ||
            element.hasAttribute('data-focus-area-entry')
        )

        // Find first entry guard
        const firstEntryIndex = elements.findIndex((el) =>
          el.hasAttribute('data-focus-area-entry')
        )

        if (elements.indexOf(event.target) + 1 === firstEntryIndex) {
          event.preventDefault()
          lastUsedFocusArea.current?.focus()
        }
      }

      // Catch that Shift + Tab that lands into carousel contents from
      // elsewhere, and redirect focus to the nearest focus area
      if (
        event.key === 'Tab' &&
        event.shiftKey &&
        event.target instanceof HTMLElement &&
        !event.target.hasAttribute('data-focus-area')
      ) {
        const selector = 'a, button, input, select, textarea, [data-focus-area-exit]'
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(selector)
        ).filter(
          (element) =>
            element.tabIndex !== -1 ||
            element === event.target ||
            element.hasAttribute('data-focus-area-exit')
        )

        // Find last exit guard
        elements.reverse()
        const lastExit = elements.find((el) =>
          el.hasAttribute('data-focus-area-exit')
        )
        elements.reverse()
        const lastExitIndex = elements.indexOf(lastExit)

        if (elements.indexOf(event.target) - 1 === lastExitIndex) {
          event.preventDefault()
          lastUsedFocusArea.current?.focus()
        }
      }
    }

    document.addEventListener('keydown', tabListener)
    return () => document.removeEventListener('keydown', tabListener)
  }, [])

  return (
    <Section
      css={{
        paddingTop: '$4',
        // Starting at 850px viewport height, grow the padding top from $5 until it's $9.
        '@media (min-width: 900px) and (min-height: 850px)': {
          paddingTop: 'min($9, calc($5 + 0.35 * (100vh - 850px)))',
        },
      }}
    >
      <Breakout>
        <Box css={{ position: 'relative' }}>
          <Carousel>
            <CarouselSlideList
              css={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridAutoColumns: 'min-content',
                ox: 'auto',
                oy: 'hidden',
                py: '$1',
                WebkitOverflowScrolling: 'touch',

                // Gap between slides
                $$gap: '$space$5',

                // calculate the left padding to apply to the scrolling list
                // so that the carousel starts aligned with the container component
                // the "1145" and "$5" values comes from the <Container /> component
                '$$scroll-padding': 'max($$gap, calc((100% - 1145px) / 2 + $$gap))',
                pl: '$$scroll-padding',

                // hide scrollbar
                MsOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },

                // Can't have nice grid gap because Safari butchers scroll padding with it
                '& > *': {
                  pr: '$$gap',
                },
              }}
            >
              {/* {rangeMap(10, (i) => { */}
              {/* {_map(artists, (artist, i) => { */}
              {_map(tracks, (track, i) => {
                const bgIndex = i > backgroundsSize ? backgroundsSize : i

                // @hack for testing
                // const _href = artist.url
                // const _title1 = artist.name
                // const _title2 = 'Invasion'
                // const _title3 = 'Invasion'
                // const _meta = artist.meta
                // const _genres = artist.genres
                const _href = track.track.url
                const _title1 = track.artist.name
                const _title2 = `“${track.track.name}”`
                const _title3 = `${track.album.name} (${track.album.year})`
                const _meta = track.album.meta
                const _genres = track.genres

                const genres = _map(_genres.slice(0, 5), (genre) =>
                  _title(genre)
                ).join(', ')

                const genresExtra =
                  _genres.length > 4 &&
                  _genres.length - 5 > 0 &&
                  `, + ${_genres.length - 5} more`
                return (
                  <CarouselSlide key={`cs-${i}`}>
                    <FocusArea
                      aria-label="Dialog component demo"
                      onKeyDown={onFocusAreaKeyDown}
                      onFocus={onFocusAreaFocus}
                    >
                      <DemoContainer
                        aria-hidden
                        css={{
                          background: backgrounds[bgIndex]?.light,
                          [`.${darkTheme} &`]: {
                            background: backgrounds[bgIndex]?.dark,
                          },
                          overflow: 'hidden',
                          ai: 'end',
                          jc: 'center',
                          ac: 'center',

                          // backgroundImage: `url(${artist.meta.base64})`,
                          backgroundSize: 'cover',
                          // backgroundColor: 'rgba(0, 0, 0, 0.61)',
                          backdropFilter: 'blur(10px)',
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.1)',
                          [`.${darkTheme} &`]: {
                            boxShadow: '0px 5px 30px -5px rgba(255, 255, 255, 0.1)',
                          },
                          '@hover': {
                            '&:hover': {
                              boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.5)',
                              [`.${darkTheme} &`]: {
                                boxShadow:
                                  '0px 5px 30px -5px rgba(255, 255, 255, 0.3)',
                              },
                              '& img': {
                                transform: 'scale(1.02)',
                              },
                            },
                          },
                          '&:focus': {
                            boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.5)',
                            [`.${darkTheme} &`]: {
                              boxShadow:
                                '0px 5px 30px -5px rgba(255, 255, 255, 0.3)',
                            },
                            '& img': {
                              transform: 'scale(1.02)',
                            },
                          },
                          transition: 'all 0.2s ease-in-out',
                          mt: '$4',
                        }}
                        href={_href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <HeroImage meta={_meta} />
                      </DemoContainer>
                    </FocusArea>
                    <GrabBox css={{ mx: '$1' }}>
                      <Text
                        as="h3"
                        size="4"
                        css={{ fontWeight: 500, lineHeight: '25px' }}
                      >
                        {/* {lpad(i + 1)}. */}
                        {_title1}
                      </Text>
                      <Text
                        as="p"
                        size="3"
                        variant="gray"
                        css={{ lineHeight: '23px' }}
                      >
                        {_title2}
                        <br />
                        <small>{_title3}</small>
                      </Text>
                      {genres && (
                        <Box role="listitem" css={{ ...css_info, my: '$2' }}>
                          <TagIcon className="hi2ri" style={css_icon} />
                          <Text as="p" size="2" variant="gray">
                            {genres}
                            {genresExtra}
                          </Text>
                        </Box>
                      )}
                      {/* <Container css={{ my: '$3', mx: '-$1' }}>
                        <Paragraph size="1" css={{ py: '$2' }}>
                          <>
                            <Link
                              href={artist.url}
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
                              */}
                    </GrabBox>
                  </CarouselSlide>
                )
              })}
              <CarouselSlide>
                <FocusArea onKeyDown={onFocusAreaKeyDown} onFocus={onFocusAreaFocus}>
                  <DemoContainer
                    css={{
                      backgroundColor: '$whiteA6',
                      boxShadow: '0 0 0 1px $colors$slateA5',
                      [`.${darkTheme} &`]: {
                        backgroundColor: '$blackA4',
                      },
                      mt: '$4',
                    }}
                  >
                    <Flex align="center" direction="column" gap="2">
                      <Text size="2" variant="gray">
                        A lot more where that came from
                      </Text>
                      <Text size="3">
                        <NextLink href="/shows" passHref>
                          <Link
                            css={{ display: 'inline-flex', alignItems: 'center' }}
                          >
                            View all shows
                            <ArrowRightIcon />
                          </Link>
                        </NextLink>
                      </Text>
                    </Flex>
                  </DemoContainer>
                </FocusArea>
              </CarouselSlide>
            </CarouselSlideList>

            <Box
              css={{
                position: 'absolute',
                top: 'calc(50% - $7)',
                left: '15px',
              }}
            >
              <CarouselPrevious
                aria-label="Show next demo"
                tabIndex={-1}
                as={CarouselArrowButton}
              >
                <ArrowLeftIcon />
              </CarouselPrevious>
            </Box>
            <Box
              css={{
                position: 'absolute',
                top: 'calc(50% - $7)',
                right: '15px',
              }}
            >
              <CarouselNext
                aria-label="Show previous demo"
                tabIndex={-1}
                as={CarouselArrowButton}
              >
                <ArrowRightIcon />
              </CarouselNext>
            </Box>
          </Carousel>
        </Box>
      </Breakout>
    </Section>
  )
}

const CarouselWithText = () => {
  const lastUsedFocusArea = React.useRef<HTMLElement>(null)
  const isRoving = React.useRef(false)

  React.useEffect(() => {
    lastUsedFocusArea.current = document.querySelector('[data-focus-area]')
  }, [])

  const onFocusAreaFocus = React.useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      lastUsedFocusArea.current = event.currentTarget
    },
    []
  )

  // We are implementing a simple roving tab index with some tweaks
  const onFocusAreaKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.target === event.currentTarget) {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          const allAreas = Array.from(
            document.querySelectorAll<HTMLElement>('[data-focus-area]')
          )
          const thisIndex = allAreas.findIndex((el) => el === event.currentTarget)
          const nextIndex = Math.min(thisIndex + 1, allAreas.length - 1)
          const nextDemo = allAreas[nextIndex]
          isRoving.current = true
          nextDemo.focus()
          ;(nextDemo as any).scrollIntoViewIfNeeded?.(true)
          lastUsedFocusArea.current = nextDemo
          isRoving.current = false
        }

        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          const allAreas = Array.from(
            document.querySelectorAll<HTMLElement>('[data-focus-area]')
          )
          const thisIndex = allAreas.findIndex((el) => el === event.currentTarget)
          const prevIndex = Math.max(thisIndex - 1, 0) // thisIndex - 1 >= 0 ? thisIndex - 1 : allAreas.length - 1;
          const prevDemo = allAreas[prevIndex]
          isRoving.current = true
          prevDemo.focus()
          ;(prevDemo as any).scrollIntoViewIfNeeded?.(true)
          lastUsedFocusArea.current = prevDemo
          isRoving.current = false
        }

        // Tab key press moves focus to the next element after the carousel
        if (event.key === 'Tab' && event.shiftKey === false) {
          const selector =
            'a, button, input, select, textarea, [data-focus-area-exit]'
          const elements = Array.from(
            document.querySelectorAll<HTMLElement>(selector)
          ).filter(
            (element) =>
              element.tabIndex !== -1 || element.hasAttribute('data-focus-area-exit')
          )

          // Find last exit guard
          elements.reverse()
          const lastExit = elements.find((el) =>
            el.matches('[data-focus-area-exit]')
          )
          elements.reverse()
          const lastExitIndex = elements.indexOf(lastExit)
          const nextElement = elements[lastExitIndex + 1]

          if (nextElement) {
            event.preventDefault()
            nextElement.focus()
          }
        }

        // Shift + Tab key press moves focus to the previous element before the carousel
        if (event.key === 'Tab' && event.shiftKey) {
          const selector =
            'a, button, input, select, textarea, [data-focus-area-entry]'
          const elements = Array.from(
            document.querySelectorAll<HTMLElement>(selector)
          ).filter(
            (element) =>
              element.tabIndex !== -1 ||
              element.hasAttribute('data-focus-area-entry')
          )

          // Find first entry guard
          const firstEntry = elements.find((el) =>
            el.matches('[data-focus-area-entry]')
          )
          const firstEntryIndex = elements.indexOf(firstEntry)
          const prevElement = elements[firstEntryIndex - 1]

          if (prevElement) {
            event.preventDefault()
            prevElement.focus()
          }
        }
      }
    },
    []
  )

  React.useEffect(() => {
    // @todo(complexity) 11
    // eslint-disable-next-line complexity
    const tabListener = (event: KeyboardEvent) => {
      // Catch that Tab that lands into carousel contents from
      // elsewhere, and redirect focus to the nearest focus area
      if (
        event.key === 'Tab' &&
        event.shiftKey === false &&
        event.target instanceof HTMLElement &&
        !event.target.hasAttribute('data-focus-area')
      ) {
        const selector =
          'a, button, input, select, textarea, [data-focus-area-entry]'
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(selector)
        ).filter(
          (element) =>
            element.tabIndex !== -1 ||
            element === event.target ||
            element.hasAttribute('data-focus-area-entry')
        )

        // Find first entry guard
        const firstEntryIndex = elements.findIndex((el) =>
          el.hasAttribute('data-focus-area-entry')
        )

        if (elements.indexOf(event.target) + 1 === firstEntryIndex) {
          event.preventDefault()
          lastUsedFocusArea.current?.focus()
        }
      }

      // Catch that Shift + Tab that lands into carousel contents from
      // elsewhere, and redirect focus to the nearest focus area
      if (
        event.key === 'Tab' &&
        event.shiftKey &&
        event.target instanceof HTMLElement &&
        !event.target.hasAttribute('data-focus-area')
      ) {
        const selector = 'a, button, input, select, textarea, [data-focus-area-exit]'
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(selector)
        ).filter(
          (element) =>
            element.tabIndex !== -1 ||
            element === event.target ||
            element.hasAttribute('data-focus-area-exit')
        )

        // Find last exit guard
        elements.reverse()
        const lastExit = elements.find((el) =>
          el.hasAttribute('data-focus-area-exit')
        )
        elements.reverse()
        const lastExitIndex = elements.indexOf(lastExit)

        if (elements.indexOf(event.target) - 1 === lastExitIndex) {
          event.preventDefault()
          lastUsedFocusArea.current?.focus()
        }
      }
    }

    document.addEventListener('keydown', tabListener)
    return () => document.removeEventListener('keydown', tabListener)
  }, [])

  return (
    <Section
      css={{
        display: 'none',
        paddingTop: '$4',
        // Starting at 850px viewport height, grow the padding top from $5 until it's $9.
        '@media (min-width: 900px) and (min-height: 850px)': {
          paddingTop: 'min($9, calc($5 + 0.35 * (100vh - 850px)))',
        },
      }}
    >
      <Breakout>
        <Box css={{ position: 'relative' }}>
          <Carousel>
            <CarouselSlideList
              css={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridAutoColumns: 'min-content',
                ox: 'auto',
                oy: 'hidden',
                py: '$1',
                WebkitOverflowScrolling: 'touch',

                // Gap between slides
                $$gap: '$space$5',

                // calculate the left padding to apply to the scrolling list
                // so that the carousel starts aligned with the container component
                // the "1145" and "$5" values comes from the <Container /> component
                '$$scroll-padding': 'max($$gap, calc((100% - 1145px) / 2 + $$gap))',
                pl: '$$scroll-padding',

                // hide scrollbar
                MsOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },

                // Can't have nice grid gap because Safari butchers scroll padding with it
                '& > *': {
                  pr: '$$gap',
                },
              }}
            >
              {rangeMap(10, (i) => {
                const bgIndex = i > backgroundsSize ? backgroundsSize : i

                return (
                  <CarouselSlide key={`cs-${i}`}>
                    <FocusArea
                      aria-label="Dialog component demo"
                      onKeyDown={onFocusAreaKeyDown}
                      onFocus={onFocusAreaFocus}
                    >
                      <DemoContainer
                        aria-hidden
                        css={{
                          background: backgrounds[bgIndex]?.light,
                          [`.${darkTheme} &`]: {
                            background: backgrounds[bgIndex]?.dark,
                          },
                          overflow: 'hidden',
                        }}
                      >
                        {i % 2 === 0 ? <Empty /> : <MainHeroDialog />}
                      </DemoContainer>
                    </FocusArea>
                    <GrabBox>
                      <Text
                        as="h3"
                        size="3"
                        css={{ fontWeight: 500, lineHeight: '25px' }}
                      >
                        {lpad(i + 1)}. Test
                      </Text>
                      <Text
                        as="p"
                        size="3"
                        variant="gray"
                        css={{ lineHeight: '23px' }}
                      >
                        Invasion
                      </Text>
                    </GrabBox>
                  </CarouselSlide>
                )
              })}
              <CarouselSlide>
                <FocusArea onKeyDown={onFocusAreaKeyDown} onFocus={onFocusAreaFocus}>
                  <DemoContainer
                    css={{
                      backgroundColor: '$whiteA6',
                      boxShadow: '0 0 0 1px $colors$slateA5',
                      [`.${darkTheme} &`]: {
                        backgroundColor: '$blackA4',
                      },
                    }}
                  >
                    <Flex align="center" direction="column" gap="2">
                      <Text size="2" variant="gray">
                        A lot more where that came from
                      </Text>
                      <Text size="3">
                        <NextLink href="/shows" passHref>
                          <Link
                            css={{ display: 'inline-flex', alignItems: 'center' }}
                          >
                            View all shows
                            <ArrowRightIcon />
                          </Link>
                        </NextLink>
                      </Text>
                    </Flex>
                  </DemoContainer>
                </FocusArea>
              </CarouselSlide>
            </CarouselSlideList>

            <Box
              css={{
                position: 'absolute',
                top: 'calc(50% - $7)',
                left: '15px',
              }}
            >
              <CarouselPrevious
                aria-label="Show next demo"
                tabIndex={-1}
                as={CarouselArrowButton}
              >
                <ArrowLeftIcon />
              </CarouselPrevious>
            </Box>
            <Box
              css={{
                position: 'absolute',
                top: 'calc(50% - $7)',
                right: '15px',
              }}
            >
              <CarouselNext
                aria-label="Show previous demo"
                tabIndex={-1}
                as={CarouselArrowButton}
              >
                <ArrowRightIcon />
              </CarouselNext>
            </Box>
          </Carousel>
        </Box>
      </Breakout>
    </Section>
  )
}

const PlaygroundCarousel = () => {
  return (
    <>
      <PageHeading
        description={properties.title}
        title={properties.seoDescription}
      />
      <CarouselWithText />
      <CarouselWithImages />
    </>
  )
}

export default PlaygroundCarousel
