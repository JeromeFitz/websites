/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { Callout } from '@jeromefitz/ds/components/Callout/index'
import { ArrowTopRightIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'
import { ImageClient as NextImage } from '@jeromefitz/shared/components/Notion/Blocks/Image.client'
import { lpad } from '@jeromefitz/utils'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import * as DataList from '@radix-ui/themes/dist/esm/components/data-list.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Inset } from '@radix-ui/themes/dist/esm/components/inset.js'
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
import { Fragment } from 'react'
import { Virtualizer } from 'virtua'

import { ArticleMain } from '@/app/playground/2024/_components/Article.Main'
// import { ArticleMainCTA } from '@/app/playground/2024/_components/Article.Main.CTA'
import { ContainerWithSidebar } from '@/app/playground/2024/_components/Container.Main'
import { HeaderFull } from '@/app/playground/2024/_components/Header.Full'
import { HeaderSidebar } from '@/app/playground/2024/_components/Header.Sidebar'
// import { Lorem } from '@/app/playground/2024/_components/Lorem'
// import { Image } from '@/app/(notion)/events/[[...catchAll]]/_components/Image'
import { LI, UL } from '@/components/List/index'
import { useStore as _useStore, useShallow } from '@/store/index'

const useStore = () => {
  return _useStore(
    useShallow((store) => ({
      bookStatus: store.bookStatus,
      bookStatusSet: store.bookStatusSet,
    })),
  )
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

function Book({ book, item }) {
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
    <Box
      className={cx(
        'rounded-3 border-1 border-gray-7 mb-2 mr-4 flex w-full flex-row items-start gap-0 md:mb-5 md:min-h-min md:flex-row-reverse md:items-start',
        'flex-auto',
      )}
    >
      <DataList.Root className="w-full gap-2 p-2 md:gap-5 md:p-4">
        <DataList.Item align="start" className="flex flex-col gap-0">
          <DataList.Label>
            <Text size="1">
              <Code variant="ghost">Author</Code>
            </Text>
          </DataList.Label>
          <DataList.Value>
            <Text size={{ initial: '1', md: '2' }} weight="medium">
              {item.author}
            </Text>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item align="start" className="flex flex-col gap-0">
          <DataList.Label>
            <Text size="1">
              <Code variant="ghost">Title</Code>
            </Text>
          </DataList.Label>
          <DataList.Value>
            <Text size={{ initial: '1', md: '2' }} weight="medium">
              {item.title}
              {!!item.subtitle && `: ${item.subtitle}`}
            </Text>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item align="start" className="flex flex-col gap-0">
          <DataList.Label>
            <Text size="1">
              <Code variant="ghost">Year</Code>
            </Text>
          </DataList.Label>
          <DataList.Value>
            <Text size={{ initial: '1', md: '2' }}>
              <Code variant="ghost">{format(item.dateReleasedIso, 'yyyy')}</Code>
            </Text>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item align="start" className="hidden flex-col gap-0 md:flex">
          <DataList.Label>
            <Text size="1">Pages</Text>
          </DataList.Label>
          <DataList.Value>
            <Text size={{ initial: '1', md: '2' }}>
              <Code variant="ghost">{item.pages}</Code>
            </Text>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item
          align="start"
          className="hidden flex-col gap-0 md:flex md:gap-1"
        >
          <DataList.Label>
            <Text size="1">
              <Code variant="ghost">Status</Code>
            </Text>
          </DataList.Label>
          <DataList.Value>
            <Text size={{ initial: '2', md: '2' }}>
              <Badge
                color={book.color}
                radius="full"
                size={{ initial: '1', md: '2' }}
                variant="soft"
              >
                <Code variant="ghost">{book.title}</Code>
              </Badge>
            </Text>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item align="start" className="flex flex-col gap-0 md:gap-1">
          <DataList.Label>
            <Text size="1">
              <Code variant="ghost">Links</Code>
            </Text>
          </DataList.Label>
          <DataList.Value>
            <Flex
              align="start"
              direction="column"
              flexGrow="1"
              gap="2"
              justify="end"
              mb="2"
            >
              <Button
                asChild
                className="w-fit"
                color="mint"
                highContrast={false}
                mt="0"
                radius="full"
                size={{ initial: '1', md: '2' }}
                variant="outline"
              >
                <NextLink href={item.urlBookshop} target="_blank">
                  Buy New at Bookshop
                  {` `}
                  <ArrowTopRightIcon className={cx('text-accent-11 !opacity-100')} />
                </NextLink>
              </Button>
              <Button
                asChild
                className="w-fit"
                color="pink"
                highContrast={false}
                mt="0"
                radius="full"
                size={{ initial: '1', md: '2' }}
                variant="outline"
              >
                <NextLink href={item.urlBiblio} target="_blank">
                  Buy Used at Biblio
                  {` `}
                  <ArrowTopRightIcon className={cx('text-accent-11 !opacity-100')} />
                </NextLink>
              </Button>
            </Flex>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
      <Inset
        className={cx(
          'rounded-3 relative h-full',
          'h-[275px] w-[164px] min-w-[164px] max-w-[164px]',
          'md:size-full md:max-w-[308px]',
          // 'md:h-[450px] md:w-[500px]',
          // 'md:border-1 md:border-gray-7 ',
          '',
        )}
        clip="border-box"
        side={{ initial: 'all', md: 'all' }}
      >
        <NextImage
          className={cx(
            'rounded-3',
            // 'max-h-[275px] min-w-[150px]',
            // 'size-full ',
            // 'md:max-h-full md:min-w-[275px] md:max-w-[575px]',
            '',
          )}
          role="img"
          tabIndex={-1}
          {...image}
        />
      </Inset>
    </Box>
  )
}

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
              return <Book book={book} item={item} key={item.id} />
            })}
          </Fragment>
        )
      })}
    </>
  )
}

// const SCROLL_DURATION = 1250
const SCROLL_DURATION = 250

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function BookPage({ books, title }) {
  const { bookStatus, bookStatusSet } = useStore()

  const handleValueChangeBookStatus = (value) => {
    // @hack(mantine) eh... sure.
    setTimeout(() => {
      bookStatusSet(value)
    }, SCROLL_DURATION)
  }
  return (
    <>
      <HeaderFull overline="Currently…" title="Reading" />
      <Flex className="flex flex-col gap-20">
        <Flex className="flex flex-col gap-6">
          <Text size="4">
            <Em>There is something about physical books!</Em> Big S and I tend to
            surround ourselves with them and are often reading a few at a time. Still
            working on the layout and what kind of stuff it entails. This is not an
            exhaustive all-time list just one that since I started creating this
            section I have been keeping track of.
          </Text>

          <Text size="4">
            Please support your local library and bookstores. If you buy online,
            please consider <Strong>Biblio</Strong> (whose affiliate program is ...
            uh ... not in their control) and <Strong>Bookshop</Strong> (whose
            affiliate program I am in the process of setting up).{' '}
            <Em>And if you are in Pittsburgh?</Em> Well we are home to a lot great
            bookstores!
          </Text>
          <Box asChild mb="4" pb="2" width="100%">
            <UL className="list-inside md:list-disc">
              {/* @todo(types) */}
              {stores.map((store: any, i) => {
                if (store.url === '') {
                  return (
                    <LI key={`store-${i}`}>
                      <Text size="4">{store.title}</Text>
                    </LI>
                  )
                } else {
                  return (
                    <LI key={`store-${i}`}>
                      <Flex
                        align="baseline"
                        asChild
                        direction="row"
                        display="inline-flex"
                        gap="2"
                      >
                        <Anchor href={store.url}>
                          <Text size="4">{store.title}</Text>
                        </Anchor>
                      </Flex>
                    </LI>
                  )
                }
              })}
            </UL>
          </Box>
        </Flex>
      </Flex>
      <Callout size="1" variant="outline" />
      <ContainerWithSidebar>
        <HeaderSidebar className="!size-full" hasBorder={false} title="">
          <>
            {/* @todo(radix) children */}
            {/* @ts-ignore */}
            <SelectRoot
              defaultValue={bookStatus ?? 'in-progress'}
              onValueChange={(value) => handleValueChangeBookStatus(value)}
              size={{ initial: '3', md: '3' }}
            >
              <SelectTrigger
                className="w-full hover:cursor-pointer"
                placeholder="Time Range:"
              />
              <SelectContent className="z-50 w-full" position="popper">
                {books.map((book) => {
                  return (
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
            <Callout className="relative bottom-0 right-0" color="mint" size="1">
              <Strong className="font-mono uppercase">Bookshop</Strong> links earn a
              commission.
            </Callout>
          </>
        </HeaderSidebar>
        <ArticleMain>
          <Virtualizer horizontal={false}>
            <Books data={books} />
          </Virtualizer>
        </ArticleMain>
      </ContainerWithSidebar>
    </>
  )
}

export { BookPage }
