import {
  LocationMarkerIcon,
  MapIcon,
  TagIcon,
  TicketIcon,
} from '@heroicons/react/outline'
import {
  CalendarIcon,
  ClockIcon,
  DotIcon,
  // PlusCircledIcon,
  // MinusCircledIcon,
} from '@radix-ui/react-icons'
import { parseISO } from 'date-fns'
import { format } from 'date-fns-tz'

import PageHeading from '~components/PageHeading'
import mockData from '~data/mock/notion/event'
import {
  Box,
  // Container,
  Flex,
  Grid,
  Heading,
  Paragraph,
  // Section,
  // Text,
} from '~styles/system/components'
// import { styled } from '~styles/system/stitches.config'

const properties = {
  title: mockData?.info?.data?.title,
  seoDescription: mockData?.info?.data?.seoDescription,
}

// const Info = ({ children, title }) => {
//   return (
//     <Section size="1">
//       <Box
//         css={{
//           mt: '$3',
//           pt: '$3',
//           borderTop: '1px solid $colors$mauve12',
//         }}
//       >
//         <Heading as="h2" size="2">
//           {title}
//         </Heading>
//         <Paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus vero
//           fugiat nemo labore, debitis itaque repellat deleniti! Placeat accusantium
//           officia illum. Nihil, ad temporibus aperiam commodi officiis voluptatibus
//           distinctio magni amet provident nobis necessitatibus debitis nesciunt,
//           deleniti molestias nam adipisci explicabo dignissimos? Error, debitis. Non
//           natus veniam cum distinctio eum!
//         </Paragraph>
//         {children}
//       </Box>
//     </Section>
//   )
// }
const Foo = ({ children, title }) => {
  return (
    <Grid
      css={{
        // my: '$6',
        // py: '$6',
        // borderTop: '1px solid $colors$mauve11',
        gridTemplateColumns: 'repeat(1, 1fr)',
        minHeight: '20rem',
        // gap: 5,
        // '@bp1': { gridTemplateColumns: 'repeat(1, 1fr)' },
      }}
    >
      <Box>
        <Heading as="h3" size="3">
          {title}
        </Heading>
      </Box>
      {children}
    </Grid>
  )
}
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
  '& > :first-child': {
    marginTop: '$8',
  },
}
const Info = () => {
  const data = mockData
  const iso = parseISO(data?.info?.data?.date?.start)
  const venue = data?.info?.data?.rollupVenue[0]
  return (
    <>
      <Grid columns="1" gap="3" css={css_gridListItems}>
        <Box role="listitem" css={css_info}>
          <CalendarIcon style={css_icon} />
          <Paragraph>{format(iso, `EEEE, MMMM do`)}</Paragraph>
        </Box>
        <Box role="listitem" css={css_info}>
          <ClockIcon style={css_icon} />
          <Paragraph>{format(iso, `hh:mma z`)}</Paragraph>
        </Box>
        <Box role="listitem" css={css_info}>
          <MapIcon style={css_icon} />
          <Paragraph>Pittsburgh, PA</Paragraph>
        </Box>
        <Box role="listitem" css={css_info}>
          <LocationMarkerIcon style={css_icon} />
          <Paragraph>{venue}</Paragraph>
        </Box>
        <Box role="listitem" css={css_info}>
          <TicketIcon style={css_icon} />
          <Paragraph>$12.00</Paragraph>
        </Box>
        <Box role="listitem" css={css_info}>
          <TagIcon style={css_icon} />
          <Paragraph>Improv, Sketch, Stand-up</Paragraph>
        </Box>
      </Grid>
    </>
  )
}

const Lineup = ({ data }) => {
  const items = data
  if (items.length === 0) return null
  return (
    <>
      <Grid columns="1" gap="3" css={css_gridListItems}>
        {items.map((item, itemIdx) => (
          <Box key={`der-${itemIdx}`} role="listitem" css={css_info}>
            <DotIcon style={css_icon} />
            <Paragraph>{item}</Paragraph>
          </Box>
        ))}
      </Grid>
    </>
  )
}

const PlaygroundEvent = () => {
  return (
    <>
      <PageHeading
        description={properties.seoDescription}
        title={properties.title}
      />
      <Flex
        css={{
          flexDirection: 'column',
          gap: '$1',
          maxWidth: '75%',
          '@bp1': { flexDirection: 'row', justifyContent: 'space-between' },
        }}
      >
        <Foo title={'Info'}>
          <Info />
        </Foo>
        <Foo title={'Lineup'}>
          <Lineup data={mockData?.info?.data.rollupLineup} />
        </Foo>
      </Flex>
    </>
  )
}

export default PlaygroundEvent
