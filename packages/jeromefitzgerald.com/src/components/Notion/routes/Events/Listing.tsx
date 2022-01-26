/**
 * @refactor Massive Component(s)
 */
import { LocationMarkerIcon, TagIcon } from '@heroicons/react/outline'
import {
  Box,
  ButtonMarketing,
  Flex,
  Grid,
  Heading,
  Paragraph,
  Section,
} from '@jeromefitz/design-system/components'
import { styled } from '@jeromefitz/design-system/stitches.config'
import type { Event as EventProperties } from '@jeromefitz/notion/schema'
import { ArrowRightIcon, ClockIcon } from '@radix-ui/react-icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { getDate, getDay, getMonth, getYear, parseISO } from 'date-fns'
import { format as _format } from 'date-fns-tz'
import Slugger from 'github-slugger'
import _filter from 'lodash/filter'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import _union from 'lodash/union'
import _uniqWith from 'lodash/uniqWith'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import * as React from 'react'

import { ContentNodes } from '~components/Notion'
import { TAGS } from '~config/websites'
import { notion } from '~lib/notion/helper'

const Announce = dynamic(
  () => import('@jeromefitz/design-system/components').then((mod) => mod.Announce),
  {
    ssr: false,
  }
)

/**
 * @refactor types
 */
interface Icon {
  type: 'emoji'
  emoji: string
}
interface ItemDefault {
  archived: boolean
  cover: any
  created_time: string // date
  icon: Icon
  id: string
  last_edited_time: string // date
  url: string
}
interface Item extends ItemDefault {
  object: 'page'
  parent: any
  properties: EventProperties
}
// type Items = Record<string, Item>
type Items = Item[]

/**
 * @todo eject styles
 */
const css_invertSelection = {
  backgroundColor: '$colors$gray1',
  color: '$colors$gray12',
}

const StyledBox = styled('div', {
  position: 'relative',
  mb: '8px',
  padding: '16px 20px',
  '@bp1': {
    mb: '4px',
    padding: '20px 24px',
  },
  backgroundColor: '$colors$violet3',
  // color: 'white',
  color: '$colors$violet12',
  border: '2px solid transparent',
  transition: 'all .25s cubic-bezier(.165, .84, .44, 1)',
  '@media (prefers-reduced-motion)': {
    transition: 'none',
  },
  '@hover': {
    '&:hover': {
      backgroundColor: '$colors$violet4',
      border: '2px solid $colors$violet8',
    },
  },
  '&:active': {
    backgroundColor: '$colors$violet4',
    border: '2px solid $colors$violet8',
  },
  '&:focus': {
    backgroundColor: '$colors$violet4',
    border: '2px solid $colors$violet8',
  },
})

const StyledBorder = styled('div', {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  border: '2px solid $colors$violet8',
  opacity: 0,
  zIndex: 1,
  display: 'none',
  transition: 'opacity .25s cubic-bezier(.165, .84, .44, 1)',
  '@media (prefers-reduced-motion)': {
    transition: 'none',
  },
  '@hover': {
    '&:hover': {
      opacity: 0,
    },
  },
  '&:focus': {
    opacity: 0,
  },
})

const StyledLink = styled('a', {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 2,
  '@hover': {
    '&:hover': {
      [`+ ${StyledBorder}`]: {
        opacity: 1,
      },
      [`+ ${StyledBox}`]: {
        backgroundColor: '$colors$violet4',
        border: '2px solid $colors$violet8',
      },
    },
  },
  '&:active': {
    [`+ ${StyledBorder}`]: {
      opacity: 1,
    },
    [`+ ${StyledBox}`]: {
      backgroundColor: '$colors$violet4',
      border: '2px solid $colors$violet8',
    },
  },
  '&:focus': {
    [`+ ${StyledBorder}`]: {
      opacity: 1,
    },
    [`+ ${StyledBox}`]: {
      backgroundColor: '$colors$violet4',
      border: '2px solid $colors$violet8',
    },
  },
})
/**
 * @todo eject sub components
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Year = ({ children, title }) => {
  return (
    <Section size="1">
      <Box
        css={{
          mt: '0',
          pt: '0',
          // borderTop: '1px solid $colors$gray12',
        }}
      >
        {/* <Heading as="h2" size="2">
          {title}
        </Heading> */}
        {children}
      </Box>
    </Section>
  )
}
const Month = ({ children, data }) => {
  const date = data[Object.keys(data)[0]][0]?.iso?.full
  const month = _format(date, 'MMMM')

  return (
    <Box
      css={{
        mb: '$1',
        pb: '$1',
        mt: '$4',
        pt: '$4',
        borderTop: '1px solid $colors$gray11',
      }}
    >
      <Heading as="h3" size="4">
        {month}
      </Heading>
      {children}
    </Box>
  )
}
const Date = ({ children, title }) => {
  return (
    <Box role="listitem">
      <Box
        css={{
          // borderTop: '1px solid $colors$gray10',
          mt: '$2',
          pt: '$2',
          '@bp1': {
            mt: '$3',
            pt: '$3',
          },
        }}
      >
        <Grid
          css={{
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: 5,
            '@bp1': { gridTemplateColumns: 'repeat(6, 1fr)' },
          }}
        >
          <Box>
            <Heading
              as="h4"
              css={{
                lineHeight: '1.3!important',
                fontSize: '2rem',
                '@bp1': { fontSize: '3rem' },
              }}
            >
              {title}
            </Heading>
            <Box css={{ display: 'none' }}>10</Box>
          </Box>
          <Box
            className="mergeList"
            css={{
              gridRowStart: 'span 1',
              gridRowEnd: 'span 1',
              gridColumnStart: 'span 5',
              gridColumnEnd: 'span 5',
            }}
          >
            {children}
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

/**
 * @todo eject these too or make them more readable please
 */
const EventItem = ({ data, keyPrefix }: { data: Item; keyPrefix: string }) => {
  // @question(slugger) do we need unique?
  const slugger = new Slugger()
  // console.dir(`> Item`)
  // console.dir(`>> data`)
  // console.dir(data)
  // return null
  if (data === null || data === undefined) return null
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, date, href, slug } = notion.custom.getInfoType({
    item: data,
    // @todo(dynamic)
    routeType: 'events',
  })

  // console.dir(`---`)
  // console.dir(`as:   ${as}`)
  // console.dir(`date: ${date}`)
  // console.dir(`href: ${href}`)
  // console.dir(`slug: ${slug}`)

  /**
   * @note(date-fns) this formats into the server time zone
   *  FROM: 2020-01-25T20:00:00.000-08:00
   *  TO:   2020-01-25T23:00:00-05:00
   */
  // const dateISO = formatISO(date?.iso?.full)
  const { seoDescription: description, title } = data?.properties
  const iso = parseISO(data?.properties?.dateEvent?.start)
  const tags =
    _map(
      _union(data?.properties?.rollupTags, data?.properties?.rollupTagsSecondary),
      (tag: string) => TAGS[tag]?.title
    ).join(', ') || 'Comedy'

  return (
    <Box role="listitem" css={{ mb: '1rem' }}>
      <Box css={{ display: 'none' }}>Category</Box>
      <StyledBox className="cardEvent">
        <Grid
          css={{
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: 5,
            '@bp1': { gridTemplateColumns: 'repeat(6, 1fr)' },
          }}
        >
          <Box
            css={{
              gridRowStart: 'span 1',
              gridRowEnd: 'span 1',
              gridColumnStart: 'span 5',
              gridColumnEnd: 'span 5',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              // pr: '4%',
              // '@bp1': {
              //   pr: '8%',
              // },
            }}
          >
            {/* <Box
              css={{
                position: 'relative',
                bottom: '1px',
                width: '1rem',
                height: '1rem',
                mr: '8px',
                flex: '0 0 auto',
                br: '18px',
                backgroundColor: '$colors$violet6',
                border: '1px solid $hiContrast',
              }}
            /> */}
            <Heading
              as="h4"
              css={{
                color: 'inherit',
                fontSize: '1.5rem',
                lineHeight: '1.25!important',
                position: 'relative',
                '&::selection': css_invertSelection,
                '@bp1': { fontSize: '2rem' },
              }}
            >
              {title}
            </Heading>
          </Box>

          <Box
            css={{
              gridRowStart: 'span 1',
              gridRowEnd: 'span 1',
              gridColumnStart: 'span 5',
              gridColumnEnd: 'span 5',
              my: '$2',
              pr: '$4',
            }}
          >
            <Paragraph>{description}</Paragraph>
          </Box>
          <Box
            css={{
              display: 'none',
              gridRowStart: 'span 1',
              gridRowEnd: 'span 1',
              gridColumnStart: 'span 2',
              gridColumnEnd: 'span 2',
              // pr: '4%',
              '@bp1': {
                // pr: '8%',
                gridColumnStart: 'span 1',
                gridColumnEnd: 'span 1',
              },
            }}
          >
            {_size(data?.properties?.rollupLineup) > 0 &&
              _map(data?.properties?.rollupLineup, (title) => (
                <ListItem
                  key={`${keyPrefix}--${slugger.slug(title)}`}
                  title={title}
                />
              ))}
          </Box>
          <Grid
            css={{
              gridRowStart: 'span 1',
              gridRowEnd: 'span 1',
              gridColumnStart: 'span 5',
              gridColumnEnd: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              // pr: '4%',
              py: '1rem',
              borderTop: '1px solid $colors$violet6',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 5,
              '@bp1': {
                gridColumnStart: 'span 3',
                gridColumnEnd: 'span 3',
                gridTemplateColumns: 'repeat(2, 1fr)',
                flexDirection: 'column',
                borderTop: 'none',
                pt: 0,
              },
            }}
          >
            <Box
              css={{
                gridRowStart: 'span 1',
                gridRowEnd: 'span 1',
                gridColumnStart: 'span 2',
                gridColumnEnd: 'span 2',
                '@bp1': {
                  gridColumnStart: 'span 2',
                  gridColumnEnd: 'span 2',
                },
              }}
            >
              <Flex
                css={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  '@bp1': { justifyContent: 'flex-start' },
                }}
              >
                <ClockIcon
                  style={{
                    width: '1rem',
                    marginRight: '0.25rem',
                  }}
                />
                <Box>
                  <ListItem title={_format(iso, `hh:mma z (EEEE)`)} />
                </Box>
              </Flex>
            </Box>
            <Box
              css={{
                gridRowStart: 'span 1',
                gridRowEnd: 'span 1',
                gridColumnStart: 'span 2',
                gridColumnEnd: 'span 2',
                '@bp1': {
                  gridColumnStart: 'span 2',
                  gridColumnEnd: 'span 2',
                },
              }}
            >
              <Flex
                css={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  '@bp1': { justifyContent: 'flex-start' },
                }}
              >
                <LocationMarkerIcon
                  className="hi2ri"
                  style={{
                    width: '1rem',
                    marginRight: '0.25rem',
                  }}
                />
                <Box>
                  {_size(data?.properties?.rollupEvents__Venues) > 0 &&
                    _map(data?.properties?.rollupEvents__Venues, (title) => (
                      <ListItem
                        key={`${keyPrefix}--${slugger.slug(title)}`}
                        title={title}
                      />
                    ))}
                </Box>
              </Flex>
            </Box>

            <Box
              css={{
                gridRowStart: 'span 1',
                gridRowEnd: 'span 1',
                gridColumnStart: 'span 2',
                gridColumnEnd: 'span 2',
                '@bp1': {
                  gridColumnStart: 'span 1',
                  gridColumnEnd: 'span 1',
                },
              }}
            >
              <Flex
                css={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  '@bp1': { justifyContent: 'flex-start' },
                }}
              >
                <TagIcon
                  className="hi2ri"
                  style={{
                    width: '1rem',
                    marginRight: '0.25rem',
                  }}
                />
                <Box>
                  <ListItem title={tags} />
                </Box>
              </Flex>
            </Box>
          </Grid>
          <Box
            css={{
              gridRowStart: 'span 1',
              gridRowEnd: 'span 1',
              gridColumnStart: 'span 6',
              gridColumnEnd: 'span 6',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              pb: '1rem',
              width: '100%',
              '@bp1': {
                alignItems: 'flex-end',
                gridColumnStart: 'span 3',
                gridColumnEnd: 'span 3',
                width: 'inherit',
              },
            }}
          >
            <Flex
              css={{ width: 'inherit' }}
              justify={{ '@initial': 'start' }}
              gap="5"
            >
              {
                data?.properties.ticketUrl ? (
                  <ButtonMarketing
                    as="a"
                    css={{
                      zIndex: '3',
                      width: 'inherit',
                      justifyContent: 'center',
                    }}
                    href={data?.properties.ticketUrl}
                    icon={ArrowRightIcon}
                  >
                    Get Tickets
                  </ButtonMarketing>
                ) : null
                // <ButtonMarketing
                //   as="button"
                //   css={{ cursor: 'not-allowed !important' }}
                //   disabled={true}
                //   icon={ArrowRightIcon}
                // >
                //   Get Tickets
                // </ButtonMarketing>
              }
            </Flex>
          </Box>
        </Grid>
        {/* bg */}
        <Box
          as="div"
          css={{
            display: 'none',
            position: 'absolute',
            left: '0',
            top: '0',
            right: '0',
            bottom: '0',
            zIndex: '0',
            backgroundImage: 'linear-gradient(40deg,#ff80ed,#fec810)',
          }}
        />
        <NextLink href={href} as={as} passHref>
          <StyledLink>
            <Box
              css={{
                position: 'absolute',
                overflow: 'hidden',
                width: '1px',
                height: '1px',
                marginTop: '-1px',
                padding: '0',
                border: '0 solid transparent',
                whiteSpace: 'nowrap',
              }}
            >
              Event Details
            </Box>
          </StyledLink>
        </NextLink>
        <StyledBorder />
      </StyledBox>
      <VisuallyHidden.Root>
        <Announce>
          <Heading as="h4">{title}</Heading>
        </Announce>
      </VisuallyHidden.Root>
    </Box>
  )
}

const ListItem = ({ title }) => {
  return (
    <Box role="listitem">
      <Paragraph
        css={{
          fontSize: '0.8rem',
          color: 'inherit',
          '&::selection': css_invertSelection,
        }}
      >
        {title}
      </Paragraph>
    </Box>
  )
}
/**
 * @refactor
 * This date stuff is wild, haha
 */
const EventsListing = (props) => {
  // console.dir(`> EventsListing`)
  // console.dir(props)
  /**
   * @verify data
   */
  const { data, images } = props
  const { content } = data
  const { results: _items } = data?.items
  const items: Items = _items

  /**
   * @fallback
   *
   * If no `/events` show content
   * If no `/events/[yyy/mm/dd]` show blank (or return to /events)
   */
  if (_isEmpty(items)) return <ContentNodes content={content} images={images} />

  /**
   * @sort items
   */
  const itemsSorted = _orderBy(items, ['properties.dateEvent.start'], ['asc'])

  /**
   * @refactor uh...
   */
  const _dates = _uniqWith(
    _map(itemsSorted, (item) => {
      return item?.properties?.dateEvent?.start
    })
  )
  // console.dir(_dates)

  let aYears = []
  const dates = _map(_dates, (date) => {
    const iso = parseISO(date)
    const isoYear = getYear(iso)
    // @note(date-fns) zero-based month is confusing when year/date are not
    const isoMonth = getMonth(iso) + 1
    const isoDate = getDate(iso)
    const isoDay = getDay(iso)
    const formatYear = _format(iso, 'yyyy')
    const formatMonth = _format(iso, 'MM')
    const formatDate = _format(iso, 'dd')
    const formatDay = _format(iso, 'EEEE')

    aYears.push(isoYear)

    return {
      date: {
        full: date,
        year: formatYear,
        month: formatMonth,
        date: formatDate,
        day: formatDay,
      },
      iso: {
        full: iso,
        year: isoYear,
        month: isoMonth,
        date: isoDate,
        day: isoDay,
      },
    }
  })
  const _data = {}
  aYears = _uniqWith(aYears)
  _map(aYears, (ay) => {
    const dataByYear = _filter(dates, { iso: { year: ay } })
    _data[ay] = {}
    let aMonths = []
    _map(dataByYear, (d) => aMonths.push(d.iso.month))
    aMonths = _uniqWith(aMonths)
    _map(aMonths, (am) => {
      const dataByMonth = _filter(dates, { iso: { year: ay, month: am } })
      _data[ay][am] = {}
      let aDates = []
      _map(dataByMonth, (d) => aDates.push(d.iso.date))
      aDates = _uniqWith(aDates)
      _map(aDates, (ad) => {
        const dataByDate = _filter(dates, {
          iso: { year: ay, month: am, date: ad },
        })
        _data[ay][am][ad] = dataByDate
      })
    })
  })

  // console.dir(`> _data`)
  // console.dir(_data)

  return (
    <>
      {_map(_data, (dataYear, yearIndex) => {
        return (
          <React.Fragment key={`data--${yearIndex}`}>
            <Year title={yearIndex}>
              {_map(dataYear, (dataMonth, monthIndex) => {
                return (
                  <React.Fragment key={`data--${yearIndex}--${monthIndex}`}>
                    <Month data={dataMonth}>
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                      {_map(dataMonth, (dataDate, dateIndex) => {
                        return (
                          <React.Fragment
                            key={`data--${yearIndex}--${monthIndex}--${dateIndex}`}
                          >
                            <Date title={dateIndex}>
                              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                              {/* @ts-ignore */}
                              {_map(dataDate, (_date, _di) => {
                                const event = _filter(itemsSorted, {
                                  properties: {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    dateEvent: { start: _date?.date?.full },
                                  },
                                })[0]
                                const key = `data--${yearIndex}--${monthIndex}--${dateIndex}--${_di}`
                                return (
                                  <React.Fragment key={key}>
                                    <EventItem data={event} keyPrefix={key} />
                                  </React.Fragment>
                                )
                              })}
                            </Date>
                          </React.Fragment>
                        )
                      })}
                    </Month>
                  </React.Fragment>
                )
              })}
            </Year>
          </React.Fragment>
        )
      })}
    </>
  )
}

export default EventsListing
