import {
  Badge,
  Box,
  Grid,
  Heading,
  Note,
  Paragraph,
} from '@jeromefitz/design-system'
import { ContentNodes } from 'next-notion/src/app'
import NextLink from 'next/link'

const Item = ({ item, routeType }) => {
  // console.dir(`>> Item`)
  const { datePublished, seoDescription, slug, title } = item.properties
  const date = datePublished?.start.slice(0, 10).split('-').join('/')

  return (
    <Box as="li" css={{ my: '$2', py: '$2' }}>
      <Heading as="h3" size="3" css={{ my: '$1' }}>
        <NextLink href={`/${routeType}/${date}/${slug}`} passHref>
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

const FallbackListing = ({ ...props }) => {
  /**
   * @verify data
   */
  const { data, images, routeType } = props
  const { content } = data
  const { results: _items } = data?.items
  const items: any = _items
  // @todo(404) fallback|404
  if (!items) return null

  return (
    <Box>
      <Note>This page is in-progress. ({props.routerNode})</Note>
      <ContentNodes content={content} images={images} />
      <Grid
        css={{
          '& ul': { listStyle: 'none', margin: '0', padding: '0' },
        }}
      >
        <ul>
          {items.map((item: any) => {
            return <Item key={item.id} item={item} routeType={routeType} />
          })}
        </ul>
      </Grid>
    </Box>
  )
}

export default FallbackListing
