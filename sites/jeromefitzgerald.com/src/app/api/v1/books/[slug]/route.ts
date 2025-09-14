import type { NextRequest } from 'next/server.js'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'
import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import fetch from 'isomorphic-unfetch'
import { NextResponse } from 'next/server.js'
import xml2js from 'xml2js'

const keyPrefixGoodreads = `${envClient.NEXT_PUBLIC__SITE}/goodreads`

type Book__GoodReads__Book = {
  $: {
    id: string
  }
  num_pages: string[]
}

type Books = Book[]
type Book = {
  author_name: string
  average_rating: string
  book_description: string
  book_id: string
  book_image_url: URL
  book_large_image_url: URL
  book_medium_image_url: URL
  book_published: string
  book_small_image_url: URL
  description: string
  id: string
  guid: string
  isbn: string
  link: URL
  num_pages: string
  pubDate: Date
  title: string
  user_date_added: Date
  user_date_created: Date
  user_name: string
  user_rating: string
  user_read_at: Date
  user_review: string
  user_shelves: string
}
type Book__GoodReads = {
  author_name: string[]
  average_rating: string[] // number?
  book_description: string[]
  book_id: string[]
  book_image_url: URL[]
  book_large_image_url: URL[]
  book_medium_image_url: URL[]
  book_published: string[]
  book_small_image_url: URL[]
  book: Book__GoodReads__Book[]
  description: string[] // html and borderline unusable
  guid: string[]
  isbn: string[] // number?
  link: URL[]
  pubDate: Date[]
  title: string[]
  user_date_added: Date[]
  user_date_created: Date[]
  user_name: string[]
  user_rating: string[] // number?
  user_read_at: Date[]
  user_review: string[]
  user_shelves: string[]
}

type SLUG = 'currently-reading' | 'read' | 'want-to-read'

type SLUGS = {
  [K in SLUG]: {
    id: string
  }
}

const SLUGS: SLUGS = {
  'currently-reading': { id: 'currently-reading' },
  read: { id: 'read' },
  'want-to-read': { id: 'want-to-read' },
}

const dataEmpty = { debug: { key: '', latency: 0, type: 'api' } }

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<'/api/v1/books/[slug]'>,
) {
  const start = Date.now()

  const { slug } = await ctx.params

  if (!SLUGS[slug as SLUG])
    return NextResponse.json({
      ...dataEmpty,
      status: 200,
    })

  // const min_rating = 0
  const books: Books = []
  const key = `${keyPrefixGoodreads}/${slug}`.toLowerCase()

  const url = `https://www.goodreads.com/review/list_rss/${envServer.GOODREADS_ID}?key=${envServer.GOODREADS_KEY}&shelf=${slug}` // &sort=date_read

  await fetch(url)
    .then((response) => response.text())
    .then((body) => {
      xml2js.parseString(body, function (error, response) {
        if (error) console.error(error)
        const bookList = response.rss.channel[0].item

        for (let i = 0; i < bookList.length; i++) {
          const bookListItem: Book__GoodReads = bookList[i]
          books.push({
            author_name: bookListItem.author_name[0],
            average_rating: bookListItem.average_rating[0],
            book_description: bookListItem.book_description[0],
            book_id: bookListItem.book_id[0],
            book_image_url: bookListItem.book_image_url[0],
            book_large_image_url: bookListItem.book_large_image_url[0],
            book_medium_image_url: bookListItem.book_medium_image_url[0],
            book_published: bookListItem.book_published[0],
            book_small_image_url: bookListItem.book_small_image_url[0],
            description: bookListItem.description[0],
            guid: bookListItem.guid[0],
            id: bookListItem.book[0].$.id,
            isbn: bookListItem.isbn[0],
            link: bookListItem.link[0],
            num_pages: bookListItem.book[0].num_pages[0],
            pubDate: bookListItem.pubDate[0],
            title: bookListItem.title[0],
            user_date_added: bookListItem.user_date_added[0],
            user_date_created: bookListItem.user_date_created[0],
            user_name: bookListItem.user_name[0],
            user_rating: bookListItem.user_rating[0],
            user_read_at: bookListItem.user_read_at[0],
            user_review: bookListItem.user_review[0],
            user_shelves: bookListItem.user_shelves[0],
          })
        }
      })
    })
    .catch((error) => console.error(error))

  return NextResponse.json({
    data: books,
    debug: {
      key,
      latency: Date.now() - start,
      type: 'api',
      url,
    },
    status: 200,
  })
}
