import { useComposedRefs } from '@radix-ui/react-compose-refs'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import Slugger from 'github-slugger'
import _map from 'lodash/map'
// import _reverse from 'lodash/reverse'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import _title from 'title'

import { ImageWithBackgroundBlur } from '~components/Notion/Layout/ImageLead'
import useSpotify from '~hooks/useSpotify'
import fetcher from '~lib/fetcher'
import {
  Badge,
  Box,
  Carousel,
  CarouselArrowButton,
  CarouselSlideList,
  CarouselSlide,
  CarouselNext,
  CarouselPrevious,
  Container,
  Flex,
  Grid,
  Heading,
  // Paragraph,
  Text,
} from '~styles/system/components'
import { CardSpotify } from '~styles/system/components/Card/Spotify'
// import { darkTheme, styled } from '~styles/system/stitches.config'
import { styled } from '~styles/system/stitches.config'
import lpad from '~utils/lpad'

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000

const DEFAULT_URL = '/api/spotify/top-artists'

// const TopArtists = () => {
//   const [url, urlSet] = useState(DEFAULT_URL + `?limit=20&time_range=medium_term`)
//   const {
//     data: { time_range },
//   } = useSpotify()

//   const { data, error } = useSWR(url, fetcher, {
//     refreshInterval: HOUR,
//     revalidateOnFocus: false,
//   })

//   useEffect(() => {
//     urlSet(DEFAULT_URL + `?limit=20&time_range=${time_range}`)
//     return () => {}
//   }, [time_range])

//   const loading = !data && !error

//   if (loading) return null

//   const slugger = new Slugger()

//   return (
//     <>
//       {_map(data?.artists, (artist) => {
//         const { genres: tags, meta, name } = artist
//         return (
//           <CardSpotify base64={meta?.base64} image={meta?.img} slug={meta?.slug}>
//             <Text as="h3" size="3" css={{ fontWeight: 500, lineHeight: '25px' }}>
//               {name}
//             </Text>
//             <Flex
//               as="ul"
//               css={{
//                 all: 'unset',
//                 display: 'flex',
//                 flexDirection: 'row',
//                 flexWrap: 'wrap',
//                 height: 'auto',
//                 my: '$1',
//                 '@bp1': { my: '$2' },
//               }}
//             >
//               {_map(tags.slice(0, 10), (tag) => (
//                 <Flex as="li" key={slugger.slug(tag)} css={{ p: '$2' }}>
//                   <Badge
//                     size="2"
//                     css={{
//                       fontFamily: '$mono',
//                     }}
//                   >
//                     {_title(tag)}
//                   </Badge>
//                 </Flex>
//               ))}
//             </Flex>
//           </CardSpotify>
//         )
//       })}
//     </>
//   )

//   // return (
//   //   <ul>
//   //     {loading
//   //       ? [...Array(10).keys()].map((index: number) => (
//   //           <Artist
//   //             key={`artist-temp-${index}`}
//   //             loading={true}
//   //             ranking={index + 1}
//   //           />
//   //         ))
//   //       : data?.artists.map((artist, index: number) => (
//   //           <Artist
//   //             key={artist.url}
//   //             loading={loading}
//   //             ranking={index + 1}
//   //             {...artist}
//   //           />
//   //         ))}
//   //   </ul>
//   // )
// }

const DemoContainer = styled('div', {
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

  '@bp1': {
    width: 400,
  },
})

const StyledFocusArea = styled('div', {
  outline: 0,
  borderRadius: '$3',
  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray8',
  },
  '&:focus:not(:focus-visible)': {
    boxShadow: 'none',
  },
})

// eslint-disable-next-line react/display-name
const FocusArea = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof StyledFocusArea>
>(({ children, onKeyDown, ...props }, forwardedRef) => {
  const ownRef = React.useRef<HTMLDivElement>(null)
  const composedRef = useComposedRefs(ownRef, forwardedRef)

  return (
    <StyledFocusArea
      {...props}
      data-focus-area
      ref={composedRef}
      tabIndex={0}
      onKeyDown={(event) => {
        onKeyDown?.(event)

        // Move focus inside the FocusArea when Enter or Spacebar is pressed
        if (
          event.target === event.currentTarget &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          // We are looking for something obviously focusable
          const tier1 =
            '[role="menu"], [role="dialog"] input, [role="dialog"] button, [tabindex="0"]'
          const tier2 = 'a, button, input, select, textarea'

          // Search for tier 1 and tier 2 elements, prioritising
          const elementToFocus = [
            event.currentTarget.querySelector<HTMLElement>(tier1),
            event.currentTarget.querySelector<HTMLElement>(tier2),
          ].filter((el) => Boolean(el))[0]

          if (elementToFocus) {
            event.preventDefault()
            elementToFocus.focus()
          }
        }

        // Move focus onto the FocusArea when Escape is pressed, unless the focus is currently inside a modal
        if (
          event.key === 'Escape' &&
          event.target instanceof HTMLElement &&
          event.target !== event.currentTarget &&
          event.target.closest('[role="dialog"], [role="menu"]') === null
        ) {
          event.currentTarget.focus()
        }
      }}
    >
      <div data-focus-area-entry />
      {children}
      <div data-focus-area-exit />
    </StyledFocusArea>
  )
})

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

  const lastUsedFocusArea = React.useRef<HTMLElement>(null)
  const isRoving = React.useRef(false)

  React.useEffect(() => {
    lastUsedFocusArea.current = document.querySelector('[data-focus-area]')
  }, [])

  const onFocusAreaFocus = React.useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      if (event.target === event.currentTarget || event.relatedTarget === null) {
        if (isRoving.current === false) {
          lastUsedFocusArea.current?.focus()
        }
      }
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
    // Catch that Shift + Tab that lands into carousel contents from
    // elsewhere, and redirect focus to the nearest focus area
    const shiftTabListener = (event: KeyboardEvent) => {
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
        const lastExit = elements.find((el) => el.matches('[data-focus-area-exit]'))
        elements.reverse()
        const lastExitIndex = elements.indexOf(lastExit)

        if (elements.indexOf(event.target) - 1 === lastExitIndex) {
          event.preventDefault()
          lastUsedFocusArea.current?.focus()
        }
      }
    }

    document.addEventListener('keydown', shiftTabListener)
    return () => document.removeEventListener('keydown', shiftTabListener)
  }, [])

  const loading = !data && !error

  if (loading) return null

  const slugger = new Slugger()

  const artists = data?.artists

  return (
    <Box css={{ position: 'relative', mt: '$8' }}>
      <Heading size="2" as="h2" css={{ my: '$5' }}>
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
        {_map(artists, (item, itemIdx: number) => {
          const { genres, name } = item
          const { base64, img, slug } = item.meta
          const description = name

          return (
            <Box key={`top10artists--${itemIdx}`}>
              <ImageWithBackgroundBlur
                base64={base64}
                description={description}
                image={img}
                slug={slug}
              />
              <Container css={{ my: '$3' }}>
                <Heading size="2">
                  {lpad(itemIdx + 1)}. {name}
                </Heading>
              </Container>
              <Container as="ul">
                {_map(genres.slice(0, 10), (genre, genreIdx) => (
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
            </Box>
          )
        })}
      </Grid>
      <Carousel css={{ display: 'none' }}>
        <CarouselSlideList
          css={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: 'min-content',
            ox: 'auto',
            oy: 'hidden',
            py: '$2',
            WebkitOverflowScrolling: 'touch',

            // calculate the left padding to apply to the scrolling list
            // so that the carousel starts aligned with the container component
            // the "1145" and "$5" values comes from the <Container /> component
            '$$scroll-padding':
              'max($space$5, calc((100% - 1145px) / 2 + $space$5))',
            pl: '$$scroll-padding',

            // hide scrollbar
            MsOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },

            // Can't have nice grid gap because Safari butchers scroll padding with it
            '& > *': {
              pr: '$5',
            },
          }}
        >
          {
            <>
              {_map(artists, (artist, index: number) => {
                const { genres: tags, meta, name } = artist
                const ranking = lpad(index + 1)
                return (
                  <CarouselSlide
                    style={{ width: '100%', height: '100%' }}
                    key={`${slugger.slug(name)}-${index}`}
                  >
                    <FocusArea
                      aria-label="Dropdown menu component demo 4"
                      onKeyDown={onFocusAreaKeyDown}
                      onFocus={onFocusAreaFocus}
                    >
                      <DemoContainer
                        aria-hidden
                        // css={{
                        //   background: 'linear-gradient(120deg, $slate6, $gray5)',
                        //   [`.${darkTheme} &`]: {
                        //     background: 'linear-gradient(120deg, $slate4, $gray3)',
                        //   },
                        // }}
                      >
                        <CardSpotify
                          base64={meta?.base64}
                          image={meta?.img}
                          slug={meta?.slug}
                        >
                          <Text
                            as="h3"
                            size="3"
                            css={{ fontWeight: 500, lineHeight: '25px' }}
                          >
                            {ranking}. {name}
                          </Text>
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
                            {_map(tags.slice(0, 0), (tag) => (
                              <Flex
                                as="li"
                                key={slugger.slug(tag)}
                                css={{ p: '$2' }}
                              >
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
                        </CardSpotify>
                      </DemoContainer>
                    </FocusArea>
                  </CarouselSlide>
                )
              })}
            </>
          }
          {/* <CarouselSlide>
            <FocusArea
              aria-label="Dropdown menu component demo 4"
              onKeyDown={onFocusAreaKeyDown}
              onFocus={onFocusAreaFocus}
            >
              <DemoContainer
                aria-hidden
                css={{
                  background: 'linear-gradient(120deg, $slate6, $gray5)',
                  [`.${darkTheme} &`]: {
                    background: 'linear-gradient(120deg, $slate4, $gray3)',
                  },
                }}
              >
                <MainHeroDropdownMenu />
              </DemoContainer>
            </FocusArea>
            <Text as="h3" size="3" css={{ fontWeight: 500, lineHeight: '25px' }}>
              Dropdown Menu
            </Text>
            <Text as="p" size="3" variant="gray" css={{ lineHeight: '23px' }}>
              With submenus, checkable items, collision handling, arrow key
              navigation, and typeahead support.
            </Text>
          </CarouselSlide> */}
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
  )
}

export default TA
