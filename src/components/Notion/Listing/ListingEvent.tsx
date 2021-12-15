import {
  ArrowRightIcon,
  LocationMarkerIcon,
  MapIcon,
  TagIcon,
  // TicketIcon,
} from '@heroicons/react/outline'
import {
  CalendarIcon,
  ClockIcon,
  // DotIcon,
  // PlusCircledIcon,
  // MinusCircledIcon,
} from '@radix-ui/react-icons'
import { parseISO } from 'date-fns'
import { format } from 'date-fns-tz'
import _map from 'lodash/map'
import _union from 'lodash/union'

import {
  Box,
  ButtonMarketing,
  // Container,
  Flex,
  Grid,
  // Heading,
  Note,
  Paragraph,
  // Section,
  // Text,
} from '@jeromefitz/design-system/components'

import { TAGS } from '~config/websites'

// import { styled } from '@jeromefitz/design-system/stitches.config'

// const Foo = ({ children, title }) => {
//   return (
//     <Grid
//       css={{
//         // my: '$6',
//         // py: '$6',
//         // borderTop: '1px solid $colors$gray11',
//         gridTemplateColumns: 'repeat(1, 1fr)',
//         minHeight: '20rem',
//         minWidth: '50%',
//         // gap: 5,
//         // '@bp1': { gridTemplateColumns: 'repeat(1, 1fr)' },
//       }}
//     >
//       <Box>
//         <Text
//           css={{
//             borderTop: '1px solid $hiContrast',
//             fontSize: '$9',
//             fontWeight: 700,
//             mt: '$6',
//             mb: '$4',
//             pt: '$6',
//             pb: '$4',
//           }}
//         >
//           {title}
//         </Text>
//       </Box>
//       {children}
//     </Grid>
//   )
// }
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
  const { info } = data
  const iso = parseISO(info?.properties?.dateEvent?.start)
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
    </>
  )
}

// const Lineup = ({ data }) => {
//   const items = data
//   if (items.length === 0) return null
//   return (
//     <>
//       <Grid columns="1" gap="3" css={css_gridListItems}>
//         {items.map((item, itemIdx) => (
//           <Box key={`der-${itemIdx}`} role="listitem" css={css_info}>
//             <DotIcon style={css_icon} />
//             <Paragraph>{item}</Paragraph>
//           </Box>
//         ))}
//       </Grid>
//     </>
//   )
// }

const ListingEvent = ({ data }) => {
  // const lineup = _union(data?.info?.properties.rollupShow, data?.info?.properties.rollupLineup)
  return (
    <>
      <Note>This page is in-progress.</Note>
      <Flex
        css={{
          flexDirection: 'column',
          gap: '$1',
          // maxWidth: '75%',
          '@bp1': { flexDirection: 'column' },
        }}
      >
        {/* <Foo title={'Venue'}> */}
        <Info data={data} />
        <Flex
          css={{ flexDirection: 'column' }}
          justify={{ '@initial': 'start' }}
          gap="5"
        >
          {
            data?.info?.properties?.ticketUrl ? (
              <ButtonMarketing
                as="a"
                css={{
                  zIndex: '3',
                  my: '$4',
                  py: '$4',
                  width: '100%',
                  justifyContent: 'center',
                }}
                href={data?.info?.properties?.ticketUrl}
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
        {/* </Foo> */}
        {/* <Foo title={'Lineup'}>
          <Lineup data={lineup} />
        </Foo> */}
      </Flex>
    </>
  )
}

export default ListingEvent
