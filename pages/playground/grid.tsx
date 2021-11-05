import PageHeading from '~components/PageHeading'
import {
  Box,
  Container,
  Grid,
  Heading,
  Section,
  Spacer,
  Text,
} from '~styles/system/components'
import rangeMap from '~utils/rangeMap'

const properties = {
  title: 'Grid',
  seoDescription: 'Design System',
}

const Playground = () => {
  return (
    <>
      <PageHeading
        description={properties.title}
        title={properties.seoDescription}
      />
      <Section as="div" size="3">
        <Box>
          <Grid
            align="start"
            css={{
              gridTemplateColumns: '1fr',
              columnGap: '$2',
              rowGap: '$2',
            }}
          >
            {rangeMap(9, (i) => (
              <Text size={9 - i}>Text Size {9 - i}</Text>
            ))}
          </Grid>
          <Container css={{ minHeight: '3rem' }}>
            <Spacer />
          </Container>
          <Grid
            align="start"
            css={{
              gridTemplateColumns: '1fr',
              columnGap: '$2',
              rowGap: '$2',
            }}
          >
            {rangeMap(4, (i) => (
              <Heading size={4 - i}>Heading Size {4 - i}</Heading>
            ))}
          </Grid>
        </Box>
      </Section>
    </>
  )
}

export default Playground
