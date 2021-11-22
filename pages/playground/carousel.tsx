import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import NextLink from 'next/link'
import React from 'react'

import { CarouselArrowButton, GrabBox, FocusArea } from '~components/Carousel'
import { PageHeading } from '~components/Layout'
import { Box, Flex, Link, Section, Text } from '~styles/system/components'
import {
  Carousel,
  CarouselSlideList,
  CarouselSlide,
  CarouselNext,
  CarouselPrevious,
} from '~styles/system/components/Carousel'
import { Empty } from '~styles/system/components/Hero/Empty'
import { MainHeroDialog } from '~styles/system/components/Hero/MainHeroDialog'
import { darkTheme, styled } from '~styles/system/stitches.config'
import lpad from '~utils/lpad'
import rangeMap from '~utils/rangeMap'

const properties = {
  title: 'Carousel',
  seoDescription: 'Example',
}

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

  // Can't select text because the carousel is draggable
  userSelect: 'none',
  cursor: 'default',

  '@bp1': {
    width: 400,
  },
})

const InnerComponent = () => {
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
                        background: 'linear-gradient(120deg, $indigo6, $crimson5)',
                        [`.${darkTheme} &`]: {
                          background: 'linear-gradient(120deg, $indigo4, $plum3)',
                        },
                      }}
                    >
                      <Empty />
                    </DemoContainer>
                  </FocusArea>
                  <GrabBox>
                    <Text
                      as="h3"
                      size="3"
                      css={{ fontWeight: 500, lineHeight: '25px' }}
                    >
                      {lpad(10 - i)}. Madlib
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
              <FocusArea
                aria-label="Dialog component demo"
                onKeyDown={onFocusAreaKeyDown}
                onFocus={onFocusAreaFocus}
              >
                <DemoContainer
                  aria-hidden
                  css={{
                    background: 'linear-gradient(120deg, $indigo6, $crimson5)',
                    [`.${darkTheme} &`]: {
                      background: 'linear-gradient(120deg, $indigo4, $plum3)',
                    },
                  }}
                >
                  <MainHeroDialog />
                </DemoContainer>
              </FocusArea>
              <GrabBox>
                <Text as="h3" size="3" css={{ fontWeight: 500, lineHeight: '25px' }}>
                  Dialog
                </Text>
                <Text as="p" size="3" variant="gray" css={{ lineHeight: '23px' }}>
                  With modal and non-modal modes, fine-grained focus&nbsp;control,
                  accessible to screen readers.
                </Text>
              </GrabBox>
            </CarouselSlide>

            <CarouselSlide>
              <FocusArea
                aria-label="Dropdown menu component demo"
                onKeyDown={onFocusAreaKeyDown}
                onFocus={onFocusAreaFocus}
              >
                <DemoContainer
                  aria-hidden
                  css={{
                    background: 'linear-gradient(120deg,  $crimson5, $blue5)',
                    [`.${darkTheme} &`]: {
                      background: 'linear-gradient(120deg,  $plum3, $blue3)',
                    },
                  }}
                >
                  {/* <MainHeroDropdownMenu /> */}
                  <MainHeroDialog />
                </DemoContainer>
              </FocusArea>
              <GrabBox>
                <Text as="h3" size="3" css={{ fontWeight: 500, lineHeight: '25px' }}>
                  Dropdown Menu
                </Text>
                <Text as="p" size="3" variant="gray" css={{ lineHeight: '23px' }}>
                  With submenus, checkable items, collision handling, arrow key
                  navigation, and typeahead support.
                </Text>
              </GrabBox>
            </CarouselSlide>

            <CarouselSlide>
              <FocusArea
                aria-label="Popover component demo"
                onKeyDown={onFocusAreaKeyDown}
                onFocus={onFocusAreaFocus}
              >
                <DemoContainer
                  aria-hidden
                  css={{
                    background: 'linear-gradient(120deg, $blue5, $lime3)',
                    [`.${darkTheme} &`]: {
                      background: 'linear-gradient(120deg, $blue3, $sand6)',
                    },
                  }}
                >
                  {/* <MainHeroPopover /> */}
                  <MainHeroDialog />
                </DemoContainer>
              </FocusArea>
              <GrabBox>
                <Text as="h3" size="3" css={{ fontWeight: 500, lineHeight: '25px' }}>
                  Popover
                </Text>
                <Text as="p" size="3" variant="gray" css={{ lineHeight: '23px' }}>
                  With fine-grained focus control, collision handling, origin-aware
                  and collision-aware animations.
                </Text>
              </GrabBox>
            </CarouselSlide>

            <CarouselSlide>
              <FocusArea
                aria-label="Slider component demo"
                onKeyDown={onFocusAreaKeyDown}
                onFocus={onFocusAreaFocus}
              >
                <DemoContainer
                  aria-hidden
                  css={{
                    background: 'linear-gradient(120deg, $lime3, $pink4)',
                    [`.${darkTheme} &`]: {
                      background: 'linear-gradient(120deg, $sand6, $pink3)',
                    },
                  }}
                >
                  {/* <MainHeroSlider /> */}
                  <MainHeroDialog />
                </DemoContainer>
              </FocusArea>
              <GrabBox>
                <Text as="h3" size="3" css={{ fontWeight: 500, lineHeight: '25px' }}>
                  Slider
                </Text>
                <Text as="p" size="3" variant="gray" css={{ lineHeight: '23px' }}>
                  Supports keyboard and touch input, step interval, multiple thumbs
                  for value ranges, and RTL direction.
                </Text>
              </GrabBox>
            </CarouselSlide>

            <CarouselSlide>
              <FocusArea
                aria-label="Scroll area component demo"
                onKeyDown={onFocusAreaKeyDown}
                onFocus={onFocusAreaFocus}
              >
                <DemoContainer
                  aria-hidden
                  css={{
                    background: 'linear-gradient(120deg, $pink4, $gold5)',
                    [`.${darkTheme} &`]: {
                      background: 'linear-gradient(120deg, $pink3, $gold4)',
                    },
                  }}
                >
                  {/* <MainHeroScrollArea /> */}
                  <MainHeroDialog />
                </DemoContainer>
              </FocusArea>
              <GrabBox>
                <Text as="h3" size="3" css={{ fontWeight: 500, lineHeight: '25px' }}>
                  Scroll Area
                </Text>
                <Text as="p" size="3" variant="gray" css={{ lineHeight: '23px' }}>
                  Supports custom cross-browser styling while maintaining the
                  browser’s native scroll behavior.
                </Text>
              </GrabBox>
            </CarouselSlide>

            <CarouselSlide>
              <FocusArea
                aria-label="Tabs component demo"
                onKeyDown={onFocusAreaKeyDown}
                onFocus={onFocusAreaFocus}
              >
                <DemoContainer
                  aria-hidden
                  css={{
                    background: 'linear-gradient(120deg, $gold5, $tomato5)',
                    [`.${darkTheme} &`]: {
                      background: 'linear-gradient(120deg, $gold4, $crimson4)',
                    },
                  }}
                >
                  {/* <MainHeroTabs /> */}
                  <MainHeroDialog />
                </DemoContainer>
              </FocusArea>
              <GrabBox>
                <Text as="h3" size="3" css={{ fontWeight: 500, lineHeight: '25px' }}>
                  Tabs
                </Text>
                <Text as="p" size="3" variant="gray" css={{ lineHeight: '23px' }}>
                  Supports arrow key navigation, horizontal/vertical orientation,
                  controlled or uncontrolled.
                </Text>
              </GrabBox>
            </CarouselSlide>

            <CarouselSlide>
              <FocusArea
                aria-label="Accordion component demo"
                onKeyDown={onFocusAreaKeyDown}
                onFocus={onFocusAreaFocus}
              >
                <DemoContainer
                  aria-hidden
                  css={{
                    background: 'linear-gradient(120deg, $tomato5, $indigo7)',
                    [`.${darkTheme} &`]: {
                      background: 'linear-gradient(120deg, $crimson4, $indigo5)',
                    },
                  }}
                >
                  {/* <MainHeroAccordion /> */}
                  <MainHeroDialog />
                </DemoContainer>
              </FocusArea>
              <GrabBox>
                <Text as="h3" size="3" css={{ fontWeight: 500, lineHeight: '25px' }}>
                  Accordion
                </Text>
                <Text as="p" size="3" variant="gray" css={{ lineHeight: '23px' }}>
                  Supports one or multiple items open at the same time, keyboard
                  navigation, collapse and expand animation.
                </Text>
              </GrabBox>
            </CarouselSlide>

            <CarouselSlide>
              <FocusArea
                aria-label="Radio group component demo"
                onKeyDown={onFocusAreaKeyDown}
                onFocus={onFocusAreaFocus}
              >
                <DemoContainer
                  aria-hidden
                  css={{
                    background: 'linear-gradient(120deg, $indigo7, $cyan3)',
                    [`.${darkTheme} &`]: {
                      background: 'linear-gradient(120deg, $indigo5, $cyan7)',
                    },
                  }}
                >
                  {/* <MainHeroRadioGroup /> */}
                  <MainHeroDialog />
                </DemoContainer>
              </FocusArea>
              <GrabBox>
                <Text as="h3" size="3" css={{ fontWeight: 500, lineHeight: '25px' }}>
                  Radio Group
                </Text>
                <Text as="p" size="3" variant="gray" css={{ lineHeight: '23px' }}>
                  With arrow key navigation, horizontal/vertical orientation support,
                  controlled or uncontrolled.
                </Text>
              </GrabBox>
            </CarouselSlide>

            <CarouselSlide>
              <FocusArea
                aria-label="Toggle group component demo"
                onKeyDown={onFocusAreaKeyDown}
                onFocus={onFocusAreaFocus}
              >
                <DemoContainer
                  aria-hidden
                  css={{
                    background: 'linear-gradient(120deg, $cyan3, $mint5)',
                    [`.${darkTheme} &`]: {
                      background: 'linear-gradient(120deg, $cyan7, $teal6)',
                    },
                  }}
                >
                  {/* <MainHeroToggleGroup /> */}
                  <MainHeroDialog />
                </DemoContainer>
              </FocusArea>
              <GrabBox>
                <Text as="h3" size="3" css={{ fontWeight: 500, lineHeight: '25px' }}>
                  Toggle Group
                </Text>
                <Text as="p" size="3" variant="gray" css={{ lineHeight: '23px' }}>
                  A set of two-state buttons that can be toggled on or off. Supports
                  single and multiple pressed buttons.
                </Text>
              </GrabBox>
            </CarouselSlide>

            <CarouselSlide>
              <FocusArea
                aria-label="Switch component demo"
                onKeyDown={onFocusAreaKeyDown}
                onFocus={onFocusAreaFocus}
              >
                <DemoContainer
                  aria-hidden
                  css={{
                    background: 'linear-gradient(120deg, $mint5, $red3)',
                    [`.${darkTheme} &`]: {
                      background: 'linear-gradient(120deg, $teal6, $plum4)',
                    },
                  }}
                >
                  {/* <MainHeroSwitch /> */}
                  <MainHeroDialog />
                </DemoContainer>
              </FocusArea>
              <GrabBox>
                <Text as="h3" size="3" css={{ fontWeight: 500, lineHeight: '25px' }}>
                  Switch
                </Text>
                <Text as="p" size="3" variant="gray" css={{ lineHeight: '23px' }}>
                  Allows the user to toggle between checked and not checked.
                </Text>
              </GrabBox>
            </CarouselSlide>

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
                        <Link css={{ display: 'inline-flex', alignItems: 'center' }}>
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
      <InnerComponent />
    </>
  )
}

export default PlaygroundCarousel
