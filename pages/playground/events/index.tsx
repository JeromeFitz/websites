import * as Announce from '@radix-ui/react-announce'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { format, getDate, getMonth, getYear, parseISO } from 'date-fns'
import Slugger from 'github-slugger'
import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _size from 'lodash/size'
import _uniqWith from 'lodash/uniqWith'
import NextLink from 'next/link'
import React from 'react'

import PageHeading from '~components/PageHeading'
import mockData from '~data/mock/notion/events'
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Paragraph,
  Section,
} from '~styles/system/components'
import { styled } from '~styles/system/stitches.config'
import getInfoType from '~utils/notion/getInfoType'

const properties = {
  title: 'Events',
  seoDescription: 'Playground for Layout Purposes',
}

// const css_sticky = {
//   position: 'sticky',
//   top: 0,
//   mb: '-2px',
//   py: '20px'
// }
const css_invertSelection = {
  backgroundColor: '$colors$gray1',
  color: '$colors$gray12',
}

const PlaygroundEvents = () => {
  // const slugger = new Slugger()
  const _dates = _uniqWith(
    _map(mockData?.items?.results, (item) => {
      return item?.data?.date?.start
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
    const formatYear = format(iso, 'yyyy')
    const formatMonth = format(iso, 'MM')
    const formatDate = format(iso, 'dd')

    aYears.push(isoYear)

    return {
      date: {
        full: date,
        year: formatYear,
        month: formatMonth,
        date: formatDate,
      },
      iso: {
        full: iso,
        year: isoYear,
        month: isoMonth,
        date: isoDate,
      },
    }
  })
  const data = {}
  aYears = _uniqWith(aYears)
  _map(aYears, (ay) => {
    const dataByYear = _filter(dates, { iso: { year: ay } })
    data[ay] = {}
    let aMonths = []
    _map(dataByYear, (d) => aMonths.push(d.iso.month))
    aMonths = _uniqWith(aMonths)
    _map(aMonths, (am) => {
      const dataByMonth = _filter(dates, { iso: { year: ay, month: am } })
      data[ay][am] = {}
      let aDates = []
      _map(dataByMonth, (d) => aDates.push(d.iso.date))
      aDates = _uniqWith(aDates)
      _map(aDates, (ad) => {
        const dataByDate = _filter(dates, {
          iso: { year: ay, month: am, date: ad },
        })
        data[ay][am][ad] = dataByDate
      })
    })
  })
  // console.dir(`> data`)
  // console.dir(data)

  return (
    <>
      <PageHeading
        description={properties.title}
        title={properties.seoDescription}
      />
      {_map(data, (dataYear, yearIndex) => {
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
                                const event = _filter(mockData?.items?.results, {
                                  data: {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    date: { start: _date?.date?.full },
                                  },
                                })[0]
                                const key = `data--${yearIndex}--${monthIndex}--${dateIndex}--${_di}`
                                return (
                                  <React.Fragment key={key}>
                                    <Event data={event} keyPrefix={key} />
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

const DateHeader = () => {
  return (
    <Box as="header">
      <Container>
        <Grid columns="6" gap="5">
          <Box>Date</Box>
          <Box
            css={{
              gridRowStart: 'span 1',
              gridRowEnd: 'span 1',
              gridColumnStart: 'span 5',
              gridColumnEnd: 'span 5',
              // offset
              // px: '24px',
            }}
          >
            <Grid columns="5" gap="5">
              <Box
                css={{
                  gridRowStart: 'span 1',
                  gridRowEnd: 'span 1',
                  gridColumnStart: 'span 2',
                  gridColumnEnd: 'span 2',
                }}
              >
                Title
              </Box>
              <Box>Tickets</Box>
              <Box>Venue</Box>
              <Box>Tag</Box>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
const Year = ({ children, title }) => {
  return (
    <Section size="1">
      <DateHeader />
      <Box
        css={{
          mt: '$6',
          pt: '$6',
          borderTop: '1px solid $colors$mauve12',
        }}
      >
        <Heading as="h2" size="2">
          {title}
        </Heading>
        {children}
      </Box>
    </Section>
  )
}
const Month = ({ children, data }) => {
  const date = data[Object.keys(data)[0]][0]?.iso?.full
  const month = format(date, 'MMMM')

  return (
    <Box css={{ mt: '$6', pt: '$6', borderTop: '1px solid $colors$mauve11' }}>
      <Heading as="h3" size="4">
        {month}
      </Heading>
      {/* <DateHeader /> */}
      {children}
    </Box>
  )
}
const Date = ({ children, title }) => {
  return (
    <Box role="listitem">
      <Box css={{ mt: '$6', pt: '$6', borderTop: '1px solid $colors$mauve10' }}>
        <Grid columns="6" gap="5">
          <Box>
            <Heading as="h4" size="4">
              {title}
            </Heading>
          </Box>
          <Box
            css={{
              gridRowStart: 'span 1',
              gridRowEnd: 'span 1',
              gridColumnStart: 'span 5',
              gridColumnEnd: 'span 5',
              // offset
              // px: '24px',
            }}
          >
            {/* <Grid columns="5" gap="5"> */}
            {children}
            {/* </Grid> */}
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

const Event = ({ data, keyPrefix }) => {
  const slugger = new Slugger()
  // console.dir(`Event`)
  // console.dir(`> data`)
  // console.dir(data)
  // return null
  if (data === null || data === undefined) return null
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, date, href, slug } = getInfoType(data, 'events')

  /**
   * @note(date-fns) this formats into the server time zone
   *  FROM: 2020-01-25T20:00:00.000-08:00
   *  TO:   2020-01-25T23:00:00-05:00
   */
  // const dateISO = formatISO(date?.iso?.full)
  const { title } = data?.data
  return (
    <Box role="listitem">
      <Box css={{ display: 'none' }}>Category</Box>
      <Box
        className="cardEvent"
        css={{
          position: 'relative',
          mb: '4px',
          padding: '28px 32px',
          backgroundColor: '$colors$mauve12',
          color: '$colors$mauve1',
          transition: 'background-color .2s cubic-bezier(.165, .84, .44, 1)',
          lineHeight: '1.3',
        }}
      >
        <Grid columns="5" gap="5" css={{}}>
          <Box
            css={{
              gridRowStart: 'span 1',
              gridRowEnd: 'span 1',
              gridColumnStart: 'span 2',
              gridColumnEnd: 'span 2',
              pr: '8%',
            }}
          >
            <Heading
              as="h4"
              css={{
                color: 'inherit',
                fontSize: '2rem',
                lineHeight: '1.25!important',
                position: 'relative',
                '&::selection': css_invertSelection,
              }}
            >
              {title}
            </Heading>
          </Box>
          <Box>
            {_size(data?.data?.rollupLineup) > 0 &&
              _map(data?.data?.rollupLineup, (title) => (
                <ListItem
                  key={`${keyPrefix}--${slugger.slug(title)}`}
                  title={title}
                />
              ))}
          </Box>
          <Box>
            {_size(data?.data?.rollupVenue) > 0 &&
              _map(data?.data?.rollupVenue, (title) => (
                <ListItem
                  key={`${keyPrefix}--${slugger.slug(title)}`}
                  title={title}
                />
              ))}
          </Box>
          <Box>
            <Flex align="center">
              <Box
                css={{
                  position: 'relative',
                  bottom: '1px',
                  width: '1rem',
                  height: '1rem',
                  mr: '8px',
                  flex: '0 0 auto',
                  br: '18px',
                  backgroundColor:
                    'hsla(221.90954773869345, 100.00%, 60.98%, 1.00);',
                }}
              />
              <Box>
                <ListItem title={'Improv'} />
              </Box>
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
      </Box>
      <VisuallyHidden.Root asChild={true}>
        <Announce.Root>
          <Heading as="h4">{title}</Heading>
        </Announce.Root>
      </VisuallyHidden.Root>
    </Box>
  )
}

const StyledBorder = styled('div', {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  border: '2px solid $colors$mauve1',
  // borderColor: 'hsla(221.90954773869345, 100.00%, 60.98%, 1.00)',
  opacity: 0,
  zIndex: 1,
  transition: 'opacity .25s cubic-bezier(.165, .84, .44, 1)',
})

const StyledLink = styled('a', {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 100,
  '@hover': {
    '&:hover': {
      [`+ ${StyledBorder}`]: {
        opacity: 1,
      },
    },
  },
})

const ListItem = ({ title }) => {
  return (
    <Box role="listitem">
      <Paragraph
        css={{
          fontSize: '0.8rem',
          color: '$colors$gray1',
          '&::selection': css_invertSelection,
        }}
      >
        {title}
      </Paragraph>
    </Box>
  )
}

export default PlaygroundEvents
