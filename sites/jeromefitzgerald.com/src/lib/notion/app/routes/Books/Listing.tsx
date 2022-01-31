/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Box,
  // Emoji,
  Flex,
  Grid,
  Note,
  Sup,
  Text,
} from '@jeromefitz/design-system/components'
import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import * as React from 'react'

const Emoji = dynamic(
  () =>
    import('@jeromefitz/design-system/custom/Emoji').then((mod: any) => mod.Emoji),
  {
    ssr: false,
  }
)

const getItemsByStatus = (data, status) => {
  return _filter(_orderBy(data, ['author', 'slug'], ['asc']), ['status', status])
}

const STATUS = {
  IN_PROGRESS: {
    id: 'IN_PROGRESS',
    emoji: '📚️',
    slug: 'in-progress',
    title: 'In Progress',
  },
  COMPLETE: {
    id: 'COMPLETE',
    emoji: '🏁️',
    slug: 'complete',
    title: 'Complete',
  },
  PENDING: {
    id: 'PENDING',
    emoji: '🔜️',
    slug: 'pending',
    title: 'Pending',
  },
}

const HEADING = ({ emoji, size, title }) => {
  return (
    <Flex css={{ flexDirection: 'row', gap: 7 }}>
      <Text
        as="h4"
        css={{ display: 'flex', color: '$colors$gray12', fontWeight: '700' }}
      >
        {/* @types(emoji) dynamic import ability */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Emoji character={emoji} margin={true} />
        <Text as="span" css={{ ml: '$2', color: 'inherit', fontWeight: 'inherit' }}>
          {title}
        </Text>
        <Sup css={{ ml: '$1' }}>{size}</Sup>
      </Text>
    </Flex>
  )
}

const UL = ({ children }) => {
  return <Box as="ul">{children}</Box>
}

const ListItem = ({ item }) => {
  const { author, subtitle, title } = item
  return (
    <Text as="li" css={{ my: '$3', color: '$colors$gray12', '@bp1': { my: '$5' } }}>
      <Text as="p" css={{ fontWeight: '700', color: 'inherit' }}>
        “{title}
        {subtitle && `: ${subtitle}`}”
        <Text
          as="span"
          css={{
            ml: '$2',
            mt: '$2',
            color: 'inherit',
          }}
        >
          {author}
        </Text>
      </Text>
    </Text>
  )
}

const Items = ({ items: _items }) => {
  const items = _items.map(
    (item: {
      properties: {
        author: string
        isPublished: string
        slug: string
        status: string[]
        subtitle: string
        title: string
      }
    }) => {
      const {
        author,
        isPublished,
        slug,
        status: _status,
        subtitle,
        title,
      } = item?.properties
      const status = _status[Object.keys(_status)[0]].name

      return { author, isPublished, slug, status, subtitle, title }
    }
  )

  const itemsByStatus = _map(STATUS, (status) => {
    return {
      data: getItemsByStatus(items, status.title),
      ...status,
    }
  })
  return (
    <>
      <Accordion type="single" defaultValue={STATUS.IN_PROGRESS.id} collapsible>
        {_map(itemsByStatus, (type, typeIndex) => {
          return (
            <AccordionItem key={`types-${typeIndex}`} value={type.id}>
              {/* @ts-ignore */}
              <AccordionTrigger>
                <HEADING
                  emoji={type.emoji}
                  title={type.title}
                  size={_size(type.data)}
                />
              </AccordionTrigger>
              {/* @ts-ignore */}
              <AccordionContent>
                <UL>
                  {_map(type.data, (item) => {
                    return <ListItem item={item} key={`item--${item.slug}`} />
                  })}
                </UL>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </>
  )
}

const ListingItems = (props) => {
  /**
   * @verify data
   */
  const { data } = props
  const { results: _items } = data?.items
  const items: any = _items
  // @todo(404) fallback|404
  if (!items) return null
  return (
    <>
      <Note>This page is in-progress.</Note>
      <Box css={{ px: '$2', py: '$1' }}>
        <Grid
          css={{
            rowGap: '$6',
            columnGap: '$6',
            gridTemplateColumns: 'repeat(1, 1fr)',
            // '@bp1': { gridTemplateColumns: 'repeat(2, 1fr)' },
            // '@bp2': { gridTemplateColumns: 'repeat(3, 1fr)' },
            '& ul': { listStyle: 'none', margin: '0', padding: '0' },
          }}
        >
          <Items items={items} />
        </Grid>
      </Box>
      <Text as="p" css={{ pt: '$4', my: '$3', fontSize: '$5', lineHeight: '1.5' }}>
        {/* @types(emoji) dynamic import ability */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Emoji character={`📖️`} margin={true} />
        Throughout the past year plus I have been gifting a pal a random book a
        month. I do not know if they will ever read them, but I try to pick ones I
        think people would like.
      </Text>
    </>
  )
}

const ListingBooks = ListingItems

export default ListingBooks
