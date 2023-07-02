'use client'
import { useOnScreen, useSWRInfinitePages } from '@jeromefitz/design-system'
import {
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
  ExternalLinkIcon as ExternalLink,
  TagIcon as Tag,
} from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/shared/src/utils'
import { useComposedRefs } from '@radix-ui/react-compose-refs'
import _map from 'lodash/map'
// import _size from 'lodash/size'
import Image from 'next/image'
import { fetcher } from 'next-notion/src/lib/fetcher'
import {
  FocusEvent,
  KeyboardEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { ComponentProps } from 'react'
import _title from 'title'

import type { Type as ID, TimeRange } from '~hooks/useSpotify'
import { useSpotify } from '~hooks/useSpotify'
import {
  Carousel,
  CarouselSlideList,
  CarouselSlide,
  CarouselNext,
  CarouselPrevious,
} from '~ui/Carousel'
// @todo(next) https://github.com/vercel/next.js/issues/46756
// import { Icon } from '@jeromefitz/ds/components/Icon'
// import { log } from '~utils/log'

// const ROUTE_TYPE = 'Top'
// const DEBUG_KEY = `${ROUTE_TYPE} >> `

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000

/**
 * @note fuck ariel pink, fuck kanye
 */
const removeItems = ['5H0YoDsPDi9fObFmJtTjfN']
const info = {
  error: {
    text: 'Hrm, API is down.',
    cta: 'Please check back later',
  },
  loading: {
    text: (
      <>
        <span className="font-bold">“Computers ‘puting”</span>
        <span>
          <span />
          <span />
          <span />
        </span>
      </>
    ),
    cta: '– Cam’ron',
  },
  success: {
    // text: 'Click any link to the left',
    // cta: 'Join on Spotify',
    text: (
      <>
        <span className="font-bold">“Computers ‘put(ed).”</span>
      </>
    ),
    cta: '– Cam’ron',
  },
}

const INIT = {
  limit: 10,
  offset: 0,
  time_range: 'short_term',
  type: 'top-artists',
  url: '/api/v1/music',
}

type CONTENT_PROPS = {
  [key: string]: {
    id: string
    title: string
    description: string
  }
}

const CONTENT: CONTENT_PROPS = {
  'top-artists': {
    id: 'top-artists',
    title: 'Top Artists',
    description:
      'Though I feel I have an eclectic taste, it is obvious I listen to a lot of my personal heavy hitters a lot.',
  },
  'top-tracks': {
    id: 'top-tracks',
    title: 'Top Tracks',
    description:
      'Sometimes I tend to play the same song over and over again (and over and over again).',
  },
}

type TopProps = {
  id: ID
  time_range: TimeRange
}

const getKey = (pageIndex, { limit, time_range, type, url }) => {
  const offset = pageIndex === 0 ? 0 : 10 * pageIndex
  const key = [
    `${url}/${type}?limit=${limit}&offset=${offset}&time_range=${time_range}`,
  ]
  // log(`key`, key)
  return key
}

// const StyledFocusArea = styled('div', {
//   outline: 0,
//   borderRadius: '$3',
//   '&:focus': {
//     boxShadow: '0 0 0 2px $colors$blue8',
//   },
//   '&:focus:not(:focus-visible)': {
//     boxShadow: 'none',
//   },
// })

const FocusArea = forwardRef<HTMLDivElement, ComponentProps<any>>(
  ({ children, onKeyDown, ...props }, forwardedRef) => {
    const ownRef = useRef<HTMLDivElement>(null)
    const composedRef = useComposedRefs(ownRef, forwardedRef)

    /**
     * @refactor
     * If you have more than one slider on a page
     *  need to differentiate for tab control.
     *
     * This needs to be refactored so it can be dynamic
     *  and then shared if possible.
     */
    const entryProps = {
      [props['data-focus-area-type'] === 'top-artists'
        ? 'data-focus-area-top-artists-entry'
        : 'data-focus-area-top-tracks-entry']: true,
    }
    const exitProps = {
      [props['data-focus-area-type'] === 'top-artists'
        ? 'data-focus-area-top-artists-exit'
        : 'data-focus-area-top-tracks-exit']: true,
    }

    return (
      <div
        {...props}
        className={cx('h-[inherit] w-full rounded-sm outline-0')}
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
            // const tier3 = 'div.afc'

            // Search for tier 1 and tier 2 elements, prioritising
            const elementToFocus: any = [
              event?.currentTarget.querySelector<HTMLElement>(tier1),
              event?.currentTarget.querySelector<HTMLElement>(tier2),
              // event.currentTarget.querySelector<HTMLElement>(tier3),
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
        <div data-focus-area-entry {...entryProps} />
        {children}
        <div data-focus-area-exit {...exitProps} />
      </div>
    )
  }
)

FocusArea.displayName = 'FocusArea'

const TopItem = ({ type }) => {
  const ref = useRef<any | null>(null)

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

  const [limit] = useState(10)
  const [url] = useState(INIT.url)
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

  useEffect(() => {
    if (canFetchMore && !isFetchingMore && !isLoadingMore && isVisible) {
      void fetchMore()
    }
  }, [canFetchMore, fetchMore, isFetchingMore, isLoadingMore, isVisible])

  const lastUsedFocusArea = useRef<HTMLElement | null>(null)
  const isRoving = useRef(false)

  useEffect(() => {
    lastUsedFocusArea.current = document.querySelector(`[${dataFocusAreaType}]`)
  }, [dataFocusAreaType])

  const onFocusAreaFocus = useCallback((event: FocusEvent<HTMLElement>) => {
    lastUsedFocusArea.current = event.currentTarget
  }, [])

  // We are implementing a simple roving tab index with some tweaks
  const onFocusAreaKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
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
          const lastExit: any = elements.find((el) =>
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
            document.querySelectorAll<HTMLElement | any>(selector)
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

  useEffect(() => {
    // @todo(complexity) 11
    // eslint-disable-next-line complexity
    const tabListener: any = (event: KeyboardEvent) => {
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
          document.querySelectorAll<HTMLElement | any>(selector)
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
    <section
    // starting at md viewport height, grow the padding top from 16px until it's 48px
    // className={cx('pt-4 md:pt-[min(48px,_calc(16px_+_0.35_*_(100vh_-_850px)))]')}
    >
      <div
        id="breakout"
        className={cx(
          'relative mx-auto box-border px-0 ',
          // 'px-5',
          // 'w-[100vh] left-[calc(-100vw_-_50%)]',
          ''
        )}
      >
        <div className="relative">
          <Carousel className={`afc ${type}`}>
            <CarouselSlideList
              className={cx(
                'grid auto-cols-min grid-flow-col',
                'overflow-x-auto overflow-y-hidden',
                'py-1',
                // Gap between slides
                '[--gap:32px]',
                // calculate the left padding to apply to the scrolling list
                // so that the carousel starts aligned with the container component
                // the "1145" and "$5" values comes from the <Container /> component
                '[--scroll-padding:[max(var(--gap),_calc((100%_-_1145px)_/_2_+_var(--gap)))]]',
                'pl-[var(--scroll-padding)]',
                // Can't have nice grid gap because Safari butchers scroll padding with it
                '[&>*]:pr-[var(--gap)]',
                // 'group snap-x snap-mandatory',
                ''
              )}
              // hide scrollbar
              style={{
                MsOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                '&::WebkitScrollbar': {
                  display: 'none',
                },
              }}
            >
              {data?.map((item: any, i: number) => {
                if (removeItems.includes(item.id)) return null

                // const bgIndex = i > backgroundsSize ? backgroundsSize : i

                // @hack
                let _href: string,
                  _title1: string,
                  _title2: string,
                  _title3: string,
                  _meta: any,
                  _genres: string[],
                  _alt: string

                if (type === 'top-artists') {
                  _href = item.external_urls.spotify
                  _title1 = item.name
                  _title2 = ''
                  _title3 = ''
                  _meta = item.image
                  _genres = item.genres
                  _alt = `Apologies, this image is dynamically generated from another source. Cannot yet provide vivid details. This is a photo of ${item.name}.`
                } else {
                  _href = item.external_urls.spotify
                  _title1 = item.artist
                  _title2 = `“${item.name}”`
                  _title3 = `${item.album.name} (${item.album.release_date.slice(
                    0,
                    4
                  )})`
                  _meta = item.album.image
                  _genres = item.genres
                  _alt = `Apologies, this image is dynamically generated from another source. Cannot yet provide vivid details. This is an image of ${item.artist}’s album cover for “${item.album.name}.”`
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

                const image = {
                  blurDataURL: _meta?.base64,
                  ..._meta?.img,
                }

                return (
                  <CarouselSlide
                    key={`ta-${i}`}
                    className={cx(
                      'cursor-grab active:cursor-grabbing'
                      // 'snap-always snap-center group-active:snap-align-none'
                    )}
                  >
                    <FocusArea
                      aria-label={_title1}
                      onKeyDown={onFocusAreaKeyDown}
                      onFocus={onFocusAreaFocus}
                      data-focus-area-type={type.id}
                      {...focusAreas}
                    >
                      <SlideContainer
                        aria-hidden
                        // css={{
                        //   background: backgrounds[bgIndex]?.light,
                        //   [`.${darkTheme} &`]: {
                        //     background: backgrounds[bgIndex]?.dark,
                        //   },
                        //   overflow: 'hidden',
                        //   ai: 'end',
                        //   jc: 'center',
                        //   ac: 'center',

                        //   // backgroundImage: `url(${artist.meta.base64})`,
                        //   backgroundSize: 'cover',
                        //   // backgroundColor: 'rgba(0, 0, 0, 0.61)',
                        //   backdropFilter: 'blur(10px)',
                        //   backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        //   boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.1)',
                        //   [`.${darkTheme} &`]: {
                        //     boxShadow: '0px 5px 30px -5px rgba(255, 255, 255, 0.1)',
                        //   },
                        //   '@hover': {
                        //     '&:hover': {
                        //       boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.5)',
                        //       [`.${darkTheme} &`]: {
                        //         boxShadow:
                        //           '0px 5px 30px -5px rgba(255, 255, 255, 0.3)',
                        //       },
                        //       '& img': {
                        //         transform: 'scale(1.02)',
                        //       },
                        //     },
                        //   },
                        //   '&:focus': {
                        //     boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.5)',
                        //     [`.${darkTheme} &`]: {
                        //       boxShadow:
                        //         '0px 5px 30px -5px rgba(255, 255, 255, 0.3)',
                        //     },
                        //     '& img': {
                        //       transform: 'scale(1.02)',
                        //     },
                        //   },
                        //   '&:active': {
                        //     boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.5)',
                        //     [`.${darkTheme} &`]: {
                        //       boxShadow:
                        //         '0px 5px 30px -5px rgba(255, 255, 255, 0.3)',
                        //     },
                        //     '& img': {
                        //       transform: 'scale(1.02)',
                        //     },
                        //   },
                        //   transition: 'all 0.2s ease-in-out',
                        //   mt: '$5',
                        //   '@media (prefers-reduced-motion)': {
                        //     transition: 'none',
                        //     transform: 'none',
                        //   },
                        // }}
                        // href={_href}
                        // rel="noopener noreferrer"
                        // target="_blank"
                        // eslint-disable-next-line tailwindcss/no-custom-classname
                        className={cx(
                          'a-no-focus',
                          'content-center items-end justify-center overflow-hidden',
                          'mt-5 ',
                          '',
                          '',
                          '',
                          '',
                          '',
                          '',
                          '',
                          '',
                          '',
                          '',
                          '',
                          '',
                          ''
                        )}
                        tabIndex={-1}
                        isLink={true}
                      >
                        {/* <HeroImage alt={_alt} meta={_meta} /> */}
                        <div className={cx('h-72 w-72 rounded')}>
                          <Image
                            {...image}
                            alt={_alt}
                            className="flex h-[inherit] w-full justify-center overflow-y-hidden rounded"
                            placeholder="blur"
                            role="img"
                          />
                        </div>
                      </SlideContainer>
                    </FocusArea>
                    <div className="m-2 pt-2">
                      <h3 className={cx('mb-2 text-lg font-bold')}>
                        {/* {lpad(i + 1)}. */}
                        {_title1}
                      </h3>
                      {!!_title2 && (
                        <>
                          <p className={cx('my-2 text-base font-semibold')}>
                            {_title2}
                          </p>
                          <p className={cx('my-2 text-base font-semibold')}>
                            {_title3}
                          </p>
                        </>
                      )}
                      {genres && (
                        <div
                          className={cx(
                            'my-2 flex flex-row content-center items-start justify-start gap-[0.5rem]'
                          )}
                        >
                          <p className={cx('items-center text-sm')} role="list">
                            <Tag className={cx('mt-1')} role="listitem" />
                          </p>
                          <p className={cx('items-center text-sm')}>
                            {genres}
                            {genresExtra}
                          </p>
                        </div>
                      )}
                      {_href && (
                        <a
                          className={cx(
                            'my-2 flex flex-row content-center items-start justify-start gap-[0.5rem]',
                            'text-sm',
                            'hover:text-spotify-dark dark:hover:text-spotify',
                            'transition-all duration-200'
                          )}
                          href={_href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span className="items-center">
                            <ExternalLink className={cx('mt-1')} />
                          </span>
                          <span className="">Spotify</span>
                        </a>
                      )}
                    </div>
                  </CarouselSlide>
                )
              })}
              <div ref={ref} />
              <CarouselSlide
                className={
                  cx()
                  // 'snap-always snap-center group-active:snap-align-none group-hover:snap-align-none'
                }
              >
                {/* <FocusArea onKeyDown={onFocusAreaKeyDown} onFocus={onFocusAreaFocus}> */}
                <SlideContainer
                  // css={{
                  //   // backgroundColor: '$whiteA6',
                  //   boxShadow: '0 0 0 1px $colors$slateA5',
                  //   // [`.${darkTheme} &`]: {
                  //   //   backgroundColor: '$blackA4',
                  //   // },
                  //   backgroundColor: '$spotify-green',
                  //   mt: '$4',
                  // }}
                  // eslint-disable-next-line tailwindcss/no-custom-classname
                  className={cx('a-no-focus', 'mt-4')}
                  tabIndex={-1}
                  isLink={false}
                >
                  <div className={cx('bg-spotify flex flex-col items-center gap-2')}>
                    <p className={cx('text-xl text-black')}>
                      {isLoadingMore // ? 'loading' : isReachingEnd ? 'no more' :''
                        ? info.loading.text
                        : !!error
                        ? info.error.text
                        : info.success.text}
                    </p>
                    <p className={cx('text-xl text-black')}>
                      {/* <NextLink href="/shows" legacyBehavior passHref >
                          <Link
                            css={{ display: 'inline-flex', alignItems: 'center' }}
                          > */}
                      {isLoadingMore // ? 'loading' : isReachingEnd ? 'no more' :''
                        ? info.loading.cta
                        : !!error
                        ? info.error.cta
                        : info.success.cta}
                      {/* <ArrowRight />
                          </Link>
                        </NextLink> */}
                    </p>
                  </div>
                </SlideContainer>
                {/* </FocusArea> */}
              </CarouselSlide>
            </CarouselSlideList>

            <div
              className={cx(
                'absolute left-5',
                'top-[calc(100%_-_32px)]',
                'md:top-[calc(60%_-_32px)]',
                'rounded-full',
                // 'border-4 border-spotify',
                'bg-black/80 hover:bg-black/100 dark:bg-white/80 hover:dark:bg-white/100 ',
                'transition-all duration-200'
              )}
            >
              <CarouselPrevious
                aria-label="Show next"
                tabIndex={-1}
                // as={CarouselArrowButton}
              >
                <ArrowLeft className="mt-1 h-8 w-10 text-white dark:text-black" />
              </CarouselPrevious>
            </div>
            <div
              className={cx(
                'absolute right-5',
                'top-[calc(100%_-_32px)]',
                'md:top-[calc(60%_-_32px)]',
                'rounded-full',
                // 'border-4 border-spotify',
                'bg-black/80 hover:bg-black/100 dark:bg-white/80 hover:dark:bg-white/100 ',
                'transition-all duration-200'
              )}
            >
              <CarouselNext
                aria-label="Show previous"
                tabIndex={-1}
                // as={CarouselArrowButton}
              >
                <ArrowRight className="mt-1 h-8 w-10 text-white dark:text-black" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

function SlideContainer({ children, className = '', isLink = false, ...props }) {
  const Comp = isLink ? 'a' : 'div'
  return (
    <Comp
      className={cx(
        'relative flex items-center justify-center',
        // 'w-72 h-72 md:w-96 md:w-96',
        'rounded-sm md:rounded',
        // content slightly above vertical center feels perfectly centred
        'mb-3 pb-4',
        // can’t select text because the carousel is draggable
        'select-none',
        // 'cursor-default',
        '',
        !isLink && 'h-5/6 min-h-[304px] w-72 content-center md:w-96',
        !isLink && 'bg-spotify items-center justify-center',
        '',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

function Top({ id }: TopProps) {
  const type = CONTENT[id]
  return (
    <div className="relative my-9">
      <h2 className="my-3 text-xl font-black md:text-3xl">{type.title}</h2>
      <p className="my-2 text-lg font-normal md:text-xl">{type.description}</p>
      <TopItem type={type.id} />
    </div>
  )
}

export { Top }
