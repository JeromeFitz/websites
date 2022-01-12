import NextLink from 'next/link'

import {
  Badge,
  Box,
  Grid,
  Heading,
  Note,
  Paragraph,
} from '@jeromefitz/design-system/components'

const Item = ({ item }) => {
  // console.dir(`>> Item`)
  const { datePublished, seoDescription, slug, title } = item.properties
  const date = datePublished?.start.slice(0, 10).split('-').join('/')

  return (
    <Box as="li" css={{ my: '$2', py: '$2' }}>
      <Heading as="h3" size="3" css={{ my: '$1' }}>
        <NextLink href={`/blog/${date}/${slug}`} passHref>
          <a>{title}</a>
        </NextLink>
      </Heading>
      <Badge
        key={`${item.id}--badge`}
        size="2"
        variant="violet"
        css={{
          border: '1px solid $colors$violet11',
          fontWeight: '700',
          mr: '$4',
          my: '$1',
        }}
      >
        {date}
      </Badge>
      <Paragraph css={{ mb: '$1' }} size="2">
        {seoDescription}
      </Paragraph>
    </Box>
  )
}

const Items = ({ items }) => {
  // console.dir(`>> Items`)
  if (items.length < 1) return null
  return (
    <Box as="ul">
      {items.map((item) => {
        return <Item key={item.id} item={item} />
      })}
    </Box>
  )
}

const ListingDefault = ({ items }) => {
  // console.dir(ListingDefault)
  // console.dir(items)
  return (
    <>
      <Note>This page is in-progress.</Note>
      <Box css={{ px: '$2' }}>
        <Grid
          css={{
            '& ul': { listStyle: 'none', margin: '0', padding: '0' },
          }}
        >
          <Items items={items} />
        </Grid>
      </Box>
    </>
  )
}
export default ListingDefault
