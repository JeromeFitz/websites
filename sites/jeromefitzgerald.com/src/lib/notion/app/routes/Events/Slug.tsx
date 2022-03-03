/**
 * @refactor Massive Component(s)
 */
import {
  LocationMarkerIcon,
  MapIcon,
  TagIcon,
  // TicketIcon,
} from '@heroicons/react/outline'
import {
  Box,
  ButtonMarketing,
  Flex,
  Grid,
  Note,
  Paragraph,
} from '@jeromefitz/design-system/components'
import type { Event as EventProperties } from '@jeromefitz/notion/schema'
import {
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  // DotIcon,
  // PlusCircledIcon,
  // MinusCircledIcon,
} from '@radix-ui/react-icons'
import { parseISO } from 'date-fns'
import { format } from 'date-fns-tz'
import _isBefore from 'date-fns/isBefore'
import _map from 'lodash/map'
import _union from 'lodash/union'

import Meta from '~components/Meta'
// import { ContentNodes } from '@jeromefitz/shared/src/lib/notion/app'
import { TAGS } from '~config/index'

// @refactor(types)
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

/**
 * @eject ?
 */
const css_info = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '0.5rem',
}
const css_icon = {
  width: '1rem',
}

const css_gridListItems = {
  alignContent: 'flex-start',
  // position: 'absolute',
  // width: '100%',
  // '& > :first-child': {
  //   marginTop: '$8',
  // },
}
const Info = ({ data }) => {
  // const data = mockData
  const timestampNow = new Date()
  const { info } = data
  const iso = parseISO(info?.properties?.dateEvent?.start)
  const isAvailable = _isBefore(
    timestampNow,
    parseISO(info?.properties?.dateEvent?.start)
  )
  const venue =
    !!info?.properties?.rollupEvents__Venues &&
    info?.properties?.rollupEvents__Venues[0]
  const tags =
    _map(
      _union(info?.properties?.rollupTags, info?.properties?.rollupTagsSecondary),
      (tag: string) => TAGS[tag]?.title
    ).join(', ') || 'Comedy'
  return (
    <>
      <Grid columns="1" gap="3" css={css_gridListItems}>
        <Box role="listitem" css={css_info}>
          <CalendarIcon style={css_icon} />
          <Paragraph>{format(iso, `EEEE, MMMM do`)}</Paragraph>
        </Box>
        <Box role="listitem" css={css_info}>
          <ClockIcon style={css_icon} />
          <Paragraph>{format(iso, `hh:mma z (EEEE)`)}</Paragraph>
        </Box>
        <Box role="listitem" css={css_info}>
          <MapIcon className="hi2ri" style={css_icon} />
          <Paragraph>Pittsburgh, PA</Paragraph>
        </Box>
        <Box role="listitem" css={css_info}>
          <LocationMarkerIcon className="hi2ri" style={css_icon} />
          <Paragraph>{venue}</Paragraph>
        </Box>
        {/* <Box role="listitem" css={css_info}>
          <TicketIcon className="hi2ri" style={css_icon} />
          <Paragraph>$12.00</Paragraph>
        </Box> */}
        <Box role="listitem" css={css_info}>
          <TagIcon className="hi2ri" style={css_icon} />
          <Paragraph>{tags}</Paragraph>
        </Box>
      </Grid>
      <Flex
        css={{ flexDirection: 'column' }}
        justify={{ '@initial': 'start' }}
        gap="5"
      >
        {info?.properties?.ticketUrl && isAvailable ? (
          <ButtonMarketing
            as="a"
            css={{
              justifyContent: 'center',
              my: '$4',
              py: '$4',
              width: '100%',
              zIndex: '$3',
            }}
            href={info?.properties?.ticketUrl}
            icon={ArrowRightIcon}
          >
            Get Tickets
          </ButtonMarketing>
        ) : (
          <Note>This event has passed.</Note>
        )}
      </Flex>
    </>
  )
}

// @todo(types)
const EventsSlug = (props) => {
  const { data, routeType } = props
  const { info }: { content: any; info: Item } = data
  const { id } = info

  return (
    <>
      <Note>This page is in-progress.</Note>
      {/* <ContentNodes content={content} images={images} /> */}
      <Flex
        css={{
          flexDirection: 'column',
          gap: '$1',
          // maxWidth: '75%',
          '@bp1': { flexDirection: 'column' },
        }}
      >
        <Info data={data} />
      </Flex>
      <Meta data={data} key={`${id}--meta`} routeType={routeType} />
    </>
  )
}

export default EventsSlug
