/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { AnchorUnstyled as Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { Callout } from '@jeromefitz/ds/components/Callout/index'
import { ArrowTopRightIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'
import { ImageClient as NextImage } from '@jeromefitz/shared/components/Notion/Blocks/Image.client'
import { lpad } from '@jeromefitz/utils'

import { useScrollIntoView } from '@mantine/hooks'
/**
 * @todo(radix-ui) issue w/ flex.props.js init order
 *
 * ref: https://github.com/JeromeFitz/websites/pull/2341
 */
// import { Flex } from '@radix-ui/themes'
import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Card } from '@radix-ui/themes/dist/esm/components/card.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Inset } from '@radix-ui/themes/dist/esm/components/inset.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import { ScrollArea } from '@radix-ui/themes/dist/esm/components/scroll-area.js'
import {
  Content as SelectContent,
  Item as SelectItem,
  Root as SelectRoot,
  Trigger as SelectTrigger,
} from '@radix-ui/themes/dist/esm/components/select.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { format } from 'date-fns'
import { slug as _slug } from 'github-slugger'
import _orderBy from 'lodash/orderBy.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { Fragment, useRef } from 'react'
import { Virtualizer } from 'virtua'

// import { Image } from '@/app/(notion)/events/[[...catchAll]]/_components/Image'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'
import { useStore as _useStore } from '@/store/index'

const useStore = () => {
  return _useStore((store) => ({
    bookStatus: store.bookStatus,
    bookStatusSet: store.bookStatusSet,
  }))
}

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

function Books({ data }) {
  const { bookStatus } = useStore()
  return (
    <>
      {data.map((book) => {
        // const title = _title(book.id)
        const items = _orderBy(book.items, ['author', 'dateReleasedIso', 'title'])

        if (book.id !== bookStatus) return null

        return (
          // @ts-ignore
          <Fragment key={`books-${book.id}`}>
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
              const slug = _slug(src)
              const image = {
                base64:
                  'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAeEAABBAIDAQAAAAAAAAAAAAABAAMEBQIGEyIxYf/EABUBAQEAAAAAAAAAAAAAAAAAAAEF/8QAGREBAQEBAQEAAAAAAAAAAAAAAQIDABGR/9oADAMBAAIRAxEAPwCfGlwqbX9eZZoaWSXq1mQ47LjczmWeYJPYnz4iIquet1ItPDlA+Enzv//Z',
                height: 400,
                slug,
                src,
                type: 'jpg',
                url: src,
                width: 315,
              }
              return (
                <Flex asChild direction="column" key={item.id} pb="4">
                  <li className="mr-4 h-fit">
                    <Card className="h-fit w-full" size="1" variant="surface">
                      <Flex
                        direction={{ initial: 'column', md: 'row-reverse' }}
                        gap={{ initial: '6', md: '6' }}
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
                            className="mx-auto h-auto max-h-[275px] w-full min-w-[175px] max-w-64 md:h-full md:max-h-full md:min-w-[275px] md:max-w-[575px]"
                            role="img"
                            tabIndex={-1}
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
                            size={{ initial: '2', md: '5' }}
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
                            size={{ initial: '2', md: '5' }}
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
                            size={{ initial: '1', md: '2' }}
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
                            size={{ initial: '1', md: '2' }}
                            weight="medium"
                          >
                            <Code variant="ghost">
                              {format(item.dateReleasedIso, 'yyyy')}
                            </Code>
                          </Text>
                          <Text
                            as="span"
                            className="uppercase"
                            color="gray"
                            size="1"
                            weight="bold"
                          >
                            Status
                          </Text>
                          <span className="mb-3 mt-2 flex flex-row flex-wrap gap-2 pb-1 font-mono md:mt-1">
                            <Badge
                              color={book.color}
                              radius="full"
                              size={{ initial: '1', md: '1' }}
                            >
                              <>{book.title}</>
                            </Badge>
                          </span>
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
                              size={{ initial: '1', md: '2' }}
                              variant="outline"
                            >
                              <NextLink href={item.urlBookshop} target="_self">
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
                              color="pink"
                              highContrast={false}
                              mt="1"
                              radius="full"
                              size={{ initial: '1', md: '2' }}
                              variant="outline"
                            >
                              <NextLink href={item.urlBiblio} target="_self">
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
          </Fragment>
        )
      })}
    </>
  )
}
const SCROLL_DURATION = 1250
function BookPage({ books, title }) {
  const { scrollIntoView, scrollableRef, targetRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >({ axis: 'x', duration: SCROLL_DURATION - 250, isList: true })
  const refContainer = useRef<HTMLDivElement>(null)

  const { bookStatus, bookStatusSet } = useStore()

  const scrollIntoViewHandle = () => {
    scrollIntoView({ alignment: 'start' })
  }

  const handleValueChangeBookStatus = (value) => {
    // @todo(a11y) prefers reduced motion
    scrollIntoViewHandle()
    // @hack(mantine) eh... sure.
    setTimeout(() => {
      bookStatusSet(value)
    }, SCROLL_DURATION)
  }
  return (
    <>
      <Grid>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>{title}</>
          </HeadlineTitle>
          <HeadlineTitleSub>
            <></>
            {/* <Callout className={cx('m-2 w-full p-4 md:w-11/12')} color="mint">
              Links to <Strong>Bookshop</Strong> earn a commission.
            </Callout> */}
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <>
            <Text size="4">
              There is something about physical books! Sarah and I tend to surround
              ourselves with them and are often reading a few at a time. Still
              working on the layout and what kind of stuff it entails. This is not an
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
              <ul className="list-inside md:list-disc">
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
          </>
        </HeadlineContent>
      </Grid>
      <Grid className={cx('py-0', 'my-rx-4 px-rx-4', 'md:px-rx-8 md:my-0')}>
        <Callout className="col-span-full" color="mint">
          <Strong className="font-mono uppercase">Bookshop</Strong> links earn a
          commission.
        </Callout>
      </Grid>
      <Grid>
        <div
          className={cx(
            'col-span-full h-fit md:col-span-3',
            'sticky top-[calc(var(--header-height)_-_6px)] md:top-28',
            // 'bg-white md:bg-transparent dark:bg-black',
            'bg-whiteA-12 dark:bg-blackA-12 md:bg-transparent dark:md:bg-transparent',
            'backdrop-blur-sm',
            // 'border-b-1 border-grayA-3',
            // 'drop-shadow-sm dark:shadow-white/5  dark:drop-shadow-lg',
            // 'md:border-none md:drop-shadow-none',
            'z-40 md:z-0',
          )}
        >
          <div
            className={cx(
              // 'mt-6 md:mt-8',
              'flex flex-row justify-between gap-4 pb-4  md:flex-col md:justify-start md:pb-0',
            )}
          >
            <Flex className="" gap="3" width="100%">
              <SelectRoot
                defaultValue={bookStatus ?? 'in-progress'}
                onValueChange={(value) => handleValueChangeBookStatus(value)}
                size={{ initial: '3', md: '3' }}
              >
                <SelectTrigger
                  // @todo(radix) asChild this?
                  // @ts-ignore
                  className="w-full hover:cursor-pointer md:w-11/12"
                  placeholder="Time Range:"
                  radius="full"
                />
                {/* @todo(radix) className */}
                {/* @ts-ignore */}
                <SelectContent className="z-50 w-full" position="popper">
                  {books.map((book) => {
                    return (
                      // @todo(radix) asChild this?
                      // @ts-ignore
                      <SelectItem
                        className="group hover:cursor-pointer"
                        key={`si--${book.id}`}
                        value={book.id}
                      >
                        <Flex align="center" asChild direction="row" gap="2">
                          <Box as="span">
                            <Badge
                              className={cx(
                                // 'group-hover:text-gray-1 group-hover:bg-accentA-12 group-hover:outline-dotted group-hover:outline-1',
                                'group-hover:bg-white dark:group-hover:bg-black',
                              )}
                              color={book.color}
                              highContrast={false}
                              radius="full"
                              size="2"
                            >
                              <Code variant="ghost">{lpad(book.items.length)}</Code>
                            </Badge>
                            <Text>{book.title}</Text>
                          </Box>
                        </Flex>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </SelectRoot>
            </Flex>
          </div>
        </div>
        {/* @ts-ignore */}
        <ScrollArea
          asChild
          className="h-[80vh] md:h-[56vh]"
          radius="full"
          ref={scrollableRef}
          scrollbars="horizontal"
          size="2"
          type="always"
        >
          <div
            className={cx(
              // 'm-0 list-none p-0',
              'col-span-full md:col-span-9',
              'justify-items-start',
              'flex flex-row flex-nowrap',

              'z-0',
            )}
            // @ts-ignore
            ref={refContainer}
          >
            <ul>
              <div className="-mx-2 w-0 md:-mx-8" ref={targetRef} />
              <Box
                asChild
                className={cx(
                  'm-0 list-none p-0',
                  'col-span-full md:col-span-9',
                  'justify-items-start',
                  'flex flex-row flex-nowrap',
                  'overflow-x-auto',
                  'gap-4 md:gap-16',
                  'z-0',
                  'first:gap-0',
                )}
              >
                <Virtualizer horizontal>
                  <Books data={books} />
                </Virtualizer>
              </Box>
            </ul>
          </div>
        </ScrollArea>
      </Grid>
    </>
  )
}

export { BookPage }
