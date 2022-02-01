import { TagIcon } from '@heroicons/react/outline'
import {
  Box,
  BoxGrab,
  Breakout,
  Carousel,
  CarouselSlideList,
  CarouselSlide,
  CarouselNext,
  CarouselPrevious,
  CarouselArrowButton,
  Flex,
  FocusArea,
  Heading,
  Paragraph,
  Section,
  Text,
} from '@jeromefitz/design-system/components'
import { HeroImage } from '@jeromefitz/design-system/components/Hero/HeroImage'
import useOnScreen from '@jeromefitz/design-system/hooks/useOnScreen'
import useSpotify from '@jeromefitz/design-system/hooks/useSpotify'
import useSWRInfinitePages from '@jeromefitz/design-system/hooks/useSWRInfinitePages'
import { darkTheme, styled } from '@jeromefitz/design-system/stitches.config'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import _map from 'lodash/map'
import _size from 'lodash/size'
import * as React from 'react'
import _title from 'title'

import fetcher from '~lib/fetcher'

import { backgrounds } from './index.props'

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000

type CONTENT_PROPS = {
  [key: string]: {
    title: string
    description: string
  }
}

const CONTENT: CONTENT_PROPS = {
  'top-artists': {
    title: 'Top Artists',
    description:
      'Though I feel I have an eclectic taste, it is obvious I listen to a lot of my personal heavy hitters a lot.',
  },
  'top-tracks': {
    title: 'Top Tracks',
    description:
      'Sometimes I tend to play the same song over and over again (and over and over again).',
  },
}

const INIT = {
  limit: 10,
  offset: 0,
  time_range: 'short_term',
  type: 'top-artists',
  url: '/api/v1/music',
}

const getKey = (pageIndex, { limit, time_range, type, url }) => {
  const offset = pageIndex === 0 ? 0 : 10 * pageIndex
  return [`${url}/${type}?limit=${limit}&offset=${offset}&time_range=${time_range}`]
}

const css_info = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '0.5rem',
}

const css_icon = {
  marginTop: '3px',
  width: '1rem',
}

const backgroundsSize = _size(backgrounds)
const info = {
  error: {
    text: 'Hrm, API is down.',
    cta: 'Please check back later',
  },
  loading: {
    text: 'Computers ‘puting....',
    cta: '– Cam’ron',
  },
  success: {
    // text: 'Click any link to the left',
    // cta: 'Join on Spotify',
    text: 'Computers ‘put(ed).',
    cta: '– Cam’ron',
  },
}

/**
 * @note fuck ariel pink
 */
const removeItems = ['5H0YoDsPDi9fObFmJtTjfN']

const TopItem = ({ type }) => {
  const ref = React.useRef()

  const dataFocusAreaType =
    type === 'top-artists'
      ? 'data-focus-area-top-artists'
      : 'data-focus-area-top-tracks'
  const dataFocusAreaTypeEntry =
    type === 'top-artists'
      ? 'data-focus-area-top-artists-entry'
      : 'data-focus-area-top-tracks-entry'
  const dataFocusAreaTypeExit =
    type === 'top-artists'
      ? 'data-focus-area-top-artists-exit'
      : 'data-focus-area-top-tracks-exit'

  const {
    data: { time_range },
  } = useSpotify()

  const [limit] = React.useState(10)
  const [url] = React.useState(INIT.url)
  const isVisible = useOnScreen(ref)

  const {
    canFetchMore,
    data,
    error,
    fetchMore,
    // isEmpty,
    isFetchingMore,
    // isLoadingInitialData,
    isLoadingMore,
  } = useSWRInfinitePages(
    (pageIndex) =>
      getKey(pageIndex, {
        limit,
        time_range,
        type,
        url,
      }),
    fetcher,
    {
      dataPath: 'items',
      limit: 10,
      //
      refreshInterval: HOUR,
      revalidateAll: false,
      revalidateFirstPage: false,
      /**
       * @note(swr) turning off for now until we finalize redis settings
       */
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  React.useEffect(() => {
    if (canFetchMore && !isFetchingMore && !isLoadingMore && isVisible) {
      void fetchMore()
    }
  }, [canFetchMore, fetchMore, isFetchingMore, isLoadingMore, isVisible])

  const lastUsedFocusArea = React.useRef<HTMLElement>(null)
  const isRoving = React.useRef(false)

  React.useEffect(() => {
    lastUsedFocusArea.current = document.querySelector(`[${dataFocusAreaType}]`)
  }, [dataFocusAreaType])

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
            document.querySelectorAll<HTMLElement>(`[${dataFocusAreaType}]`)
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
            document.querySelectorAll<HTMLElement>(`[${dataFocusAreaType}]`)
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
          const selector = `a, button, input, select, textarea, [${dataFocusAreaTypeExit}], div.afc2`
          // const selector = `a, button, input, select, textarea, [data-focus-area-top-artists-exit], [data-focus-area-top-tracks-exit]`
          const elements = Array.from(
            document.querySelectorAll<HTMLElement>(selector)
          ).filter(
            (element) =>
              element.tabIndex !== -1 || element.hasAttribute(dataFocusAreaTypeExit)
          )

          // Find last exit guard
          elements.reverse()
          const lastExit = elements.find((el) =>
            el.matches(`[${dataFocusAreaTypeExit}]`)
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
          const selector = `a, button, input, select, textarea, [${dataFocusAreaTypeEntry}], div.afc2`
          // const selector = `a, button, input, select, textarea, [data-focus-area-top-artists-entry], [data-focus-area-top-tracks-entry]`
          const elements = Array.from(
            document.querySelectorAll<HTMLElement>(selector)
          ).filter(
            (element) =>
              element.tabIndex !== -1 || element.hasAttribute(dataFocusAreaTypeEntry)
          )

          // Find first entry guard
          const firstEntry = elements.find((el) =>
            el.matches(`[${dataFocusAreaTypeEntry}]`)
          )
          const firstEntryIndex = elements.indexOf(firstEntry)
          const prevElement = elements[firstEntryIndex - 2]

          if (prevElement) {
            event.preventDefault()
            prevElement.focus()
          }
        }
      }
    },
    [dataFocusAreaType, dataFocusAreaTypeEntry, dataFocusAreaTypeExit]
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
        !event.target.hasAttribute(dataFocusAreaType)
      ) {
        const selector = `a, button, input, select, textarea, [${dataFocusAreaTypeEntry}], div.afc2`
        // const selector = `a, button, input, select, textarea, [data-focus-area-top-artists-entry], [data-focus-area-top-tracks-entry]`
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(selector)
        ).filter(
          (element) =>
            element.tabIndex !== -1 ||
            element === event.target ||
            element.hasAttribute(dataFocusAreaTypeEntry)
          // element.hasAttribute('data-focus-area-top-artists-entry') ||
          // element.hasAttribute('data-focus-area-top-tracks-entry')
        )

        // Find first entry guard
        const firstEntryIndex = elements.findIndex((el) =>
          el.hasAttribute(dataFocusAreaTypeEntry)
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
        !event.target.hasAttribute(dataFocusAreaType)
      ) {
        const selector = `a, button, input, select, textarea, [${dataFocusAreaTypeExit}], div.afc2`
        // const selector = `a, button, input, select, textarea, [data-focus-area-top-artists-exit], [data-focus-area-top-tracks-exit]`
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(selector)
        ).filter(
          (element) =>
            element.tabIndex !== -1 ||
            element === event.target ||
            element.hasAttribute(dataFocusAreaTypeExit)
          // element.hasAttribute('data-focus-area-top-artists-exit') ||
          // element.hasAttribute('data-focus-area-top-tracks-exit')
        )

        // Find last exit guard
        elements.reverse()
        const lastExit = elements.find((el) =>
          el.hasAttribute(dataFocusAreaTypeExit)
        )
        elements.reverse()
        const lastExitIndex = elements.indexOf(lastExit)

        if (elements.indexOf(event.target) - 2 === lastExitIndex) {
          event.preventDefault()
          lastUsedFocusArea.current?.focus()
        }
      }
    }

    document.addEventListener('keydown', tabListener)
    return () => document.removeEventListener('keydown', tabListener)
  }, [dataFocusAreaType, dataFocusAreaTypeEntry, dataFocusAreaTypeExit])

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
          <Carousel className={`afc ${type}`}>
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
              {data?.map((item: any, i: number) => {
                if (removeItems.includes(item.id)) return null

                const bgIndex = i > backgroundsSize ? backgroundsSize : i

                // @hack
                // let _href: string,
                let _title1: string,
                  _title2: string,
                  _title3: string,
                  _meta: any,
                  _genres: string[],
                  _alt: string

                if (type === 'top-artists') {
                  // _href = item.external_urls.spotify
                  _title1 = item.name
                  _title2 = ''
                  _title3 = ''
                  _meta = item.image
                  _genres = item.genres
                  _alt = `Photo of ${item.name}`
                } else {
                  // _href = item.external_urls.spotify
                  _title1 = item.artist
                  _title2 = `“${item.name}”`
                  _title3 = `${item.album.name} (${item.album.release_date.slice(
                    0,
                    4
                  )})`
                  _meta = item.album.image
                  _genres = item.genres
                  _alt = `Image of ${item.artist}’s “${item.album.name}” album cover`
                }

                const genres = _map(_genres.slice(0, 5), (genre) =>
                  _title(genre)
                ).join(', ')

                const genresExtra =
                  _genres.length > 4 &&
                  _genres.length - 5 > 0 &&
                  `, + ${_genres.length - 5} more`

                const focusAreas = {
                  [type === 'top-artists'
                    ? 'data-focus-area-top-artists'
                    : 'data-focus-area-top-tracks']: true,
                  className: 'afc2',
                }

                return (
                  <CarouselSlide key={`ta-${i}`}>
                    <FocusArea
                      aria-label={_title1}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      onKeyDown={onFocusAreaKeyDown}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      onFocus={onFocusAreaFocus}
                      data-focus-area-type={type}
                      {...focusAreas}
                    >
                      <SlideContainer
                        aria-hidden
                        as={'div'}
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
                          '&:active': {
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
                          '@media (prefers-reduced-motion)': {
                            transition: 'none',
                            transform: 'none',
                          },
                        }}
                        // href={_href}
                        // rel="noopener noreferrer"
                        // target="_blank"
                        className="a-no-focus"
                        tabIndex={-1}
                      >
                        <HeroImage alt={_alt} meta={_meta} />
                      </SlideContainer>
                    </FocusArea>
                    <BoxGrab css={{ m: '$1', pt: '$1' }}>
                      <Text
                        as="h3"
                        size="5"
                        css={{ fontWeight: 500, lineHeight: '1.25', mb: 3 }}
                      >
                        {/* {lpad(i + 1)}. */}
                        {_title1}
                      </Text>
                      {!!_title2 && (
                        <>
                          <Text
                            as="p"
                            size="4"
                            variant="gray"
                            css={{ lineHeight: '1.25', my: 2 }}
                          >
                            {_title2}
                          </Text>
                          <Text
                            as="p"
                            size="3"
                            variant="gray"
                            css={{ lineHeight: '1.25', my: 2 }}
                          >
                            {_title3}
                          </Text>
                        </>
                      )}
                      {genres && (
                        <Box role="listitem" css={{ ...css_info, my: '$2' }}>
                          <TagIcon className="hi2ri" style={css_icon} />
                          <Text
                            as="p"
                            size="2"
                            variant="gray"
                            css={{ lineHeight: '1.25' }}
                          >
                            {genres}
                            {genresExtra}
                          </Text>
                        </Box>
                      )}
                    </BoxGrab>
                  </CarouselSlide>
                )
              })}
              <div ref={ref} />
              <CarouselSlide>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <FocusArea onKeyDown={onFocusAreaKeyDown} onFocus={onFocusAreaFocus}>
                  <SlideContainer
                    css={{
                      // backgroundColor: '$whiteA6',
                      boxShadow: '0 0 0 1px $colors$slateA5',
                      // [`.${darkTheme} &`]: {
                      //   backgroundColor: '$blackA4',
                      // },
                      backgroundColor: '$spotify-green',
                      mt: '$4',
                    }}
                    className="a-no-focus"
                    tabIndex={-1}
                  >
                    <Flex align="center" direction="column" gap="2">
                      <Text size="3" css={{ color: '$spotify-black' }}>
                        {isLoadingMore // ? 'loading' : isReachingEnd ? 'no more' :''
                          ? info.loading.text
                          : !!error
                          ? info.error.text
                          : info.success.text}
                      </Text>
                      <Text size="3">
                        {/* <NextLink href="/shows" passHref prefetch={false}>
                          <Link
                            css={{ display: 'inline-flex', alignItems: 'center' }}
                          > */}
                        {isLoadingMore // ? 'loading' : isReachingEnd ? 'no more' :''
                          ? info.loading.cta
                          : !!error
                          ? info.error.cta
                          : info.success.cta}
                        {/* <ArrowRightIcon />
                          </Link>
                        </NextLink> */}
                      </Text>
                    </Flex>
                  </SlideContainer>
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
                aria-label="Show next"
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
                aria-label="Show previous"
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

const Top = ({ type = 'top-artists' }) => {
  const { description, title } = CONTENT[type]
  return (
    <Box css={{ position: 'relative', mt: '$2' }}>
      <Heading size="3" as="h2" css={{ my: '$2' }}>
        {title}
      </Heading>
      <Paragraph
        size="2"
        as="p"
        css={{ color: '$colors$gray11', mt: '$1', mb: '$3' }}
      >
        {description}
      </Paragraph>
      <TopItem type={type} />
    </Box>
  )
}

const SlideContainer = styled('a', {
  display: 'flex',
  position: 'relative',
  ai: 'center',
  jc: 'center',
  width: 300,
  height: 300,
  borderRadius: '$3',
  mb: '$2',

  // Content slightly above vertical center feels perfectly centred
  pb: '$3',

  // Can't select text because the carousel is draggable
  userSelect: 'none',
  // cursor: 'default',

  '@bp1': {
    width: 400,
    height: 400,
  },
})

export default Top
