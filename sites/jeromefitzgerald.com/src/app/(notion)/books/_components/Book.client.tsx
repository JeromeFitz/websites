/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { AnchorUnstyled as Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { Callout } from '@jeromefitz/ds/components/Callout/index'
import { ArrowTopRightIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'
import { ImageClient as NextImage } from '@jeromefitz/shared/components/Notion/Blocks/Image.client'
import { lpad } from '@jeromefitz/utils'

import { useScrollIntoView } from '@mantine/hooks'
import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Card } from '@radix-ui/themes/dist/esm/components/card.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Inset } from '@radix-ui/themes/dist/esm/components/inset.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { format } from 'date-fns'
import _orderBy from 'lodash/orderBy.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { Fragment } from 'react'

// import { Image } from '@/app/(notion)/events/[[...catchAll]]/_components/Image'
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
      {}
      {data.map((book, i) => {
        const targetRef: any = refs[i][1]
        // const title = _title(book.id)
        const items = _orderBy(book.items, ['author', 'dateReleasedIso', 'title'])

        // if (book.title !== 'In-Progress') return null

        return (
          // @ts-ignore
          <Fragment key={`books-${book.id}`}>
            <Separator
              className={cx('')}
              orientation="horizontal"
              ref={targetRef}
              size="4"
            />
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
            <Flex
              asChild
              direction="column"
              gap={{ initial: '4', lg: '8' }}
              mb="4"
              pb="2"
              width="100%"
            >
              <ul
                className={cx(
                  'list-inside list-none',
                  'overflow-x-auto',
                  'gap-4 lg:gap-2',
                  'z-0',
                  'first:gap-0',
                )}
              >
                {items.map((item) => {
                  /**
                   * @hack(notion) do not want to deal with AWS Expiration on a non-Block Client Side
                   * moved these to AWS S3
                   *
                   */
                  // const properties = {
                  //   ID: item?.id,
                  //   'SEO.Image': item?.seoImage,
                  //   'SEO.Image.Description': 'etsting',
                  // }
                  // "https://prod-files-secure.s3.us-west-2.amazonaws.com/10fad01a-8742-4f5c-b22c-aaf74473ad73/87d7e4ff-7e43-4af2-9a25-681462292836/zadie-smith--the-fraud--9780525558965.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240310T190325Z&X-Amz-Expires=3600&X-Amz-Signature=21cd1231ffa525172e436c3a39789aa4d9df6c58aa3107bdabb475d1f158bfdb&X-Amz-SignedHeaders=host&x-id=GetObject"
                  // console.dir(item?.seoImage?.name.split('.')[0])
                  const src = `https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/books/${item?.seoImage?.name.split('.')[0]}.jpg`
                  // console.dir(src)
                  const image = {
                    base64:
                      'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAeEAABBAIDAQAAAAAAAAAAAAABAAMEBQIGEyIxYf/EABUBAQEAAAAAAAAAAAAAAAAAAAEF/8QAGREBAQEBAQEAAAAAAAAAAAAAAQIDABGR/9oADAMBAAIRAxEAPwCfGlwqbX9eZZoaWSXq1mQ47LjczmWeYJPYnz4iIquet1ItPDlA+Enzv//Z',
                    // img: {
                    height: 640,
                    // },
                    slug: 'httpsiscdncoimageab67616d0000b273a33ac83de4bc24bbf75c8b60',
                    // src: 'https://i.scdn.co/image/ab67616d0000b273a33ac83de4bc24bbf75c8b60',
                    src,
                    type: 'jpg',
                    url: 'https://i.scdn.co/image/ab67616d0000b273a33ac83de4bc24bbf75c8b60',
                    width: 640,
                  }
                  return (
                    <Flex asChild direction="column" key={item.id} py="4">
                      <li>
                        <Card className="h-fit w-full" size="1" variant="surface">
                          <Flex
                            direction={{ initial: 'column', md: 'row-reverse' }}
                            gap={{ initial: '2', lg: '6' }}
                            justify="between"
                          >
                            <Inset
                              clip="padding-box"
                              side={{ initial: 'top', md: 'all' }}
                            >
                              {/* <Image
                                className="rounded-2 mx-auto h-[400px] w-[250px]"
                                properties={properties}
                              /> */}
                              <NextImage
                                className="rounded-2 mx-auto h-[400px] w-[250px]"
                                {...image}
                              />
                            </Inset>
                            <Flex direction="column" px="2" width="25rem">
                              <Text
                                as="span"
                                className="uppercase"
                                color="gray"
                                size="1"
                                weight="bold"
                              >
                                Author
                              </Text>
                              <Text
                                as="p"
                                className="line-clamp-3 pb-2"
                                size={{ initial: '3', lg: '5' }}
                                weight="medium"
                              >
                                {item.author}
                              </Text>

                              <Text
                                as="span"
                                className="uppercase"
                                color="gray"
                                size="1"
                                weight="bold"
                              >
                                Title
                              </Text>
                              <Text
                                as="p"
                                className="line-clamp-3 pb-2"
                                size={{ initial: '3', lg: '5' }}
                                weight="medium"
                              >
                                {item.title}
                                {!!item.subtitle && `: ${item.subtitle}`}
                              </Text>

                              <Text
                                as="span"
                                className="uppercase"
                                color="gray"
                                size="1"
                                weight="bold"
                              >
                                Pages
                              </Text>
                              <Text
                                as="p"
                                className="line-clamp-3 pb-2 font-mono"
                                size={{ initial: '1', lg: '2' }}
                                weight="medium"
                              >
                                <Code variant="ghost">{item.pages}</Code>
                              </Text>
                              <Text
                                as="span"
                                className="uppercase"
                                color="gray"
                                size="1"
                                weight="bold"
                              >
                                Year
                              </Text>
                              <Text
                                as="p"
                                className="line-clamp-3 pb-2 font-mono"
                                size={{ initial: '1', lg: '2' }}
                                weight="medium"
                              >
                                <Code variant="ghost">
                                  {format(item.dateReleasedIso, 'yyyy')}
                                </Code>
                              </Text>

                              <Flex
                                align="start"
                                direction="column"
                                flexGrow="1"
                                gap="2"
                                justify="end"
                                mb="2"
                              >
                                <Text
                                  as="p"
                                  className="uppercase"
                                  color="gray"
                                  size="1"
                                  weight="bold"
                                >
                                  Link
                                </Text>
                                <Button
                                  asChild
                                  className="w-fit"
                                  color="mint"
                                  highContrast={false}
                                  mt="1"
                                  radius="full"
                                  size={{ initial: '2', lg: '2' }}
                                  variant="outline"
                                >
                                  <NextLink href={item.urlBookshop}>
                                    Buy New at Bookshop
                                    {` `}
                                    <ArrowTopRightIcon
                                      className={cx('text-accent-11 !opacity-100')}
                                    />
                                  </NextLink>
                                </Button>
                                <Button
                                  asChild
                                  className="w-fit"
                                  color="orange"
                                  highContrast={false}
                                  mt="1"
                                  radius="full"
                                  size={{ initial: '2', lg: '2' }}
                                  variant="outline"
                                >
                                  <NextLink href={item.urlBiblio}>
                                    Buy Used at Biblio
                                    {` `}
                                    <ArrowTopRightIcon
                                      className={cx('text-accent-11 !opacity-100')}
                                    />
                                  </NextLink>
                                </Button>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Card>
                      </li>
                    </Flex>
                  )
                })}
              </ul>
            </Flex>
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
            {/* @ts-ignore */}

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
                        className="group-hover:text-accent-12 group-hover:bg-accentA-4 transition-colors group-hover:cursor-pointer"
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
          {/* @ts-ignore */}
          {/* <Books data={books} /> */}
        </>
      </HeadlineContent>
    </Grid>
  )
}

export { BookPage }
