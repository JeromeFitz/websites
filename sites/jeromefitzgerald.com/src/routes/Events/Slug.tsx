/**
 * @refactor Massive Component(s)
 */
import {
  Box,
  ButtonMarketing,
  Callout,
  Flex,
  Grid,
  Icon,
  Paragraph,
  Text,
} from '@jeromefitz/design-system'
import type { Event as EventProperties } from '@jeromefitz/notion/schema'
// import { ContentNodes } from '@jeromefitz/next-notion/src/app'
import { TZ } from '@jeromefitz/shared/src/lib/constants'
import { parseISO } from 'date-fns'
import { formatInTimeZone as _formatInTimeZone } from 'date-fns-tz'
import _isBefore from 'date-fns/isBefore'
import _map from 'lodash/map'
import _union from 'lodash/union'

import Meta from '~components/Meta'
import { TAGS } from '~config/index'

// @refactor(types)
interface IconProps {
  type: 'emoji'
  emoji: string
}
interface ItemDefault {
  archived: boolean
  cover: any
  created_time: string // date
  icon: IconProps
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
          <Icon.Calendar style={css_icon} />
          <Paragraph>{_formatInTimeZone(iso, TZ, `EEEE, MMMM do`)}</Paragraph>
        </Box>
        <Box role="listitem" css={css_info}>
          <Icon.Clock style={css_icon} />
          <Paragraph>{_formatInTimeZone(iso, TZ, `hh:mma z (EEEE)`)}</Paragraph>
        </Box>
        <Box role="listitem" css={css_info}>
          <Icon.Map style={css_icon} />
          <Paragraph>Pittsburgh, PA</Paragraph>
        </Box>
        <Box role="listitem" css={css_info}>
          <Icon.LocationMarker style={css_icon} />
          <Paragraph>{venue}</Paragraph>
        </Box>
        {/* <Box role="listitem" css={css_info}>
          <Icon.Ticket style={css_icon} />
          <Paragraph>$12.00</Paragraph>
        </Box> */}
        <Box role="listitem" css={css_info}>
          <Icon.Tag style={css_icon} />
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
            icon={Icon.ArrowRight}
          >
            Get Tickets
          </ButtonMarketing>
        ) : (
          <Callout variant="note">
            <Text as="p" variant="note" css={{}}>
              <Text as="strong" weight="7" css={{ display: 'inline' }}>
                Note:{` `}
              </Text>
              This event has passed
            </Text>
          </Callout>
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
      <Callout variant="note">
        <Text as="p" variant="note" css={{}}>
          <Text as="strong" weight="7" css={{ display: 'inline' }}>
            Note:{` `}
          </Text>
          This page is in-progress
        </Text>
      </Callout>
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
