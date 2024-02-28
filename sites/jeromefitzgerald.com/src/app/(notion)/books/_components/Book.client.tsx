'use client'
import { AnchorUnstyled as Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { Callout } from '@jeromefitz/ds/components/Callout/index'
import { lpad } from '@jeromefitz/utils'

import { useScrollIntoView } from '@mantine/hooks'
import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { format } from 'date-fns'
import _orderBy from 'lodash/orderBy.js'
import { Fragment } from 'react'

import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'

const stores = [
  {
    id: 'amazing-books-and-records',
    title: 'Amazing Books and Records',
    url: 'https://www.amazingbooksandrecords.com/',
  },
  {
    id: 'bottom-feeder',
    title: 'Bottom Feeder Books',
    url: 'https://www.bottomfeederbooks.com/',
  },
  {
    id: 'the-big-idea',
    title: 'The Big Idea Bookstore Cooperative',
    url: 'https://thebigideapgh.com/',
  },
  {
    id: 'city-of-aslyum',
    title: 'City of Asylum Bookstore',
    url: 'https://www.cityofasylumbooks.org/',
  },
  {
    id: 'city-books',
    title: 'City Books',
    url: 'https://www.instagram.com/citybookspgh',
  },
  {
    id: 'white-whale-bookstore',
    title: 'White Whale Bookstore',
    url: 'https://whitewhalebookstore.com/',
  },
  { id: 'etc', title: '& “many more”', url: '' },
]

function Books({ data, refs }) {
  return (
    <>
      {data.map((book, i) => {
        const targetRef: any = refs[i][1]
        // const title = _title(book.id)
        const items = _orderBy(book.items, ['author', 'dateReleasedIso', 'title'])

        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <Fragment key={`books-${book.id}`}>
            <Separator orientation="horizontal" ref={targetRef} size="4" />
            <HeadlineTitle
              aria-label={book.title}
              as="h3"
              // className="sticky top-[calc(var(--header-height)_-_5px)] md:top-28"
              mb="4"
            >
              <Text as="span" id={book.id}>
                {book.title}
              </Text>
            </HeadlineTitle>
            <Box asChild mb="4" pb="2" width="100%">
              <ul className="list-inside list-none">
                {items.map((item) => {
                  return (
                    <Flex asChild direction="column" key={item.id} py="4">
                      <li>
                        <Box
                          className="indent-[calc(var(--space-3)_*_-1)]"
                          ml="3"
                          pl="3"
                        >
                          <Text size="6" weight="bold">
                            <Text as="span">“</Text>
                            <Text as="span">
                              {item.title}
                              {!!item.subtitle && `: ${item.subtitle}`}
                            </Text>
                            <Text as="span">”</Text>
                          </Text>
                        </Box>
                        <Box
                          className="indent-[calc(var(--space-2)_*_-1)]"
                          ml="3"
                          pl="2"
                        >
                          <Text size="5" weight="medium">
                            <Text as="span">–</Text>
                            <Text as="span">{item.author}</Text>
                          </Text>
                        </Box>
                        <Box
                          className="indent-[calc(var(--space-1)_*_1)]"
                          ml="3"
                          pl="2"
                        >
                          <Text size="5" weight="regular">
                            <Code variant="ghost">
                              {format(item.dateReleasedIso, 'yyyy')}, p.{item.pages}
                            </Code>
                          </Text>
                        </Box>
                      </li>
                    </Flex>
                  )
                })}
              </ul>
            </Box>
          </Fragment>
        )
      })}
    </>
  )
}

function BookPage({ books, title }) {
  const { scrollIntoView: scrollIntoView1, targetRef: targetRef1 } =
    useScrollIntoView<HTMLDivElement>({
      offset: 92,
    })
  const { scrollIntoView: scrollIntoView2, targetRef: targetRef2 } =
    useScrollIntoView<HTMLDivElement>({
      offset: 92,
    })
  const { scrollIntoView: scrollIntoView3, targetRef: targetRef3 } =
    useScrollIntoView<HTMLDivElement>({
      offset: 92,
    })

  const refs = [
    [scrollIntoView1, targetRef1],
    [scrollIntoView2, targetRef2],
    [scrollIntoView3, targetRef3],
  ]

  return (
    <Grid>
      <HeadlineColumnA>
        <HeadlineTitle aria-label={title} as="h1">
          <>{title}</>
        </HeadlineTitle>
        <HeadlineTitleSub>
          <Flex direction="column" gap="1">
            {books.map((book, i) => {
              const scrollIntoView: any = refs[i][0]
              return (
                <Flex
                  align="center"
                  asChild
                  className="group hover:cursor-pointer"
                  direction="row"
                  gap="2"
                  justify="start"
                  key={`books--menu--${book.id}`}
                  wrap="nowrap"
                >
                  <Button
                    onClick={() => {
                      scrollIntoView()
                    }}
                    style={{
                      boxShadow: 'none',
                    }}
                    tabIndex={0}
                    variant="outline"
                  >
                    <>
                      <Badge
                        className="transition-colors group-hover:cursor-pointer group-hover:bg-[var(--accent-a4)] group-hover:text-[var(--accent-12)]"
                        color={book.color}
                        highContrast={false}
                        size="2"
                      >
                        <Code variant="ghost">{lpad(book.items.length)}</Code>
                      </Badge>
                      <Code variant="ghost">
                        <Link
                          asChild
                          className="group-hover:underline"
                          color="gray"
                          highContrast={true}
                          size="2"
                          style={{ outline: 'none' }}
                          underline="hover"
                        >
                          <Text as="span">{book.title}</Text>
                        </Link>
                      </Code>
                    </>
                  </Button>
                </Flex>
              )
            })}
          </Flex>
        </HeadlineTitleSub>
      </HeadlineColumnA>
      <HeadlineContent>
        <>
          <Text size="4">
            There is something about physical books! Sarah and I tend to surround
            ourselves with them and are often reading a few at a time. Still working
            on the layout and what kind of stuff it entails. This is not an
            exhaustive all-time list just one that since I started creating this
            section I have been keeping track of.
          </Text>
          <Text size="4">
            This does not count <Strong>cookbooks</Strong>. (Of which I think I may
            make a whole new section.)
          </Text>
          <Text size="4">
            Please support your local library and bookstores. If you buy online,
            please consider <Strong>Biblio</Strong> (whose affiliate program is ...
            uh ... not in their control) and <Strong>Bookshop</Strong> (whose
            affiliate program I am in the process of setting up).
          </Text>
          <Text size="4">Pittsburgh is home to a lot great bookstores!</Text>
          <Box asChild mb="4" pb="2" width="100%">
            <ul className="list-inside lg:list-disc">
              {/* @todo(types) */}
              {stores.map((store: any, i) => {
                if (store.url === '') {
                  return (
                    <li key={`store-${i}`}>
                      <Text size="4">{store.title}</Text>
                    </li>
                  )
                } else {
                  return (
                    <li key={`store-${i}`}>
                      <Flex
                        align="baseline"
                        asChild
                        direction="row"
                        display="inline-flex"
                        gap="2"
                      >
                        <Link asChild>
                          <Anchor href={store.url}>
                            <Text size="4">{store.title}</Text>
                          </Anchor>
                        </Link>
                      </Flex>
                    </li>
                  )
                }
              })}
            </ul>
          </Box>
          <Callout size="1" variant="outline">
            This page is in the process of getting an overhaul.
          </Callout>
          <Books data={books} refs={refs} />
        </>
      </HeadlineContent>
    </Grid>
  )
}

export { BookPage }
