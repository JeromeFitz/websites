import { cx } from '@jeromefitz/ds/utils/cx'
import { lpad } from '@jeromefitz/utils'

import { Separator } from '@radix-ui/themes'
import { Badge } from '@radix-ui/themes'
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
import { WIP } from '@/components/WIP/index'

// function ListItem() {
//   return <></>
// }

function Books({ data }) {
  return (
    <>
      {data.map((book) => {
        // const title = _title(book.id)
        const items = _orderBy(book.items, ['author', 'dateReleasedIso', 'title'])

        return (
          <Fragment key={`books-}`}>
            <Separator orientation="horizontal" size="4" />
            <HeadlineTitle aria-label={book.title} as="h3" className="mb-4">
              <div id={book.id}>{book.title}</div>
            </HeadlineTitle>
            <ul className="list-inside list-none">
              {items.map((item) => {
                return (
                  <li className="flex flex-col py-4" key={item.id}>
                    <div className="ml-3 pl-2 -indent-2 text-2xl font-medium tracking-tight">
                      <span className={cx('inline', '-ml-2 mb-[-1px] pr-1')}>“</span>
                      <p className={cx('inline', 'm-0 p-0')}>
                        {item.title}
                        {!!item.subtitle && `: ${item.subtitle}`}
                      </p>
                      <span className={cx('inline', 'pl-1')}>”</span>
                    </div>
                    <div className="ml-3 gap-2 pl-2 -indent-2 text-2xl font-medium tracking-tight">
                      <span className={cx('inline', '-ml-2 mb-[-1px] pr-1')}>–</span>
                      <p className="inline text-xl font-light tracking-wide">
                        {item.author}
                      </p>
                    </div>
                    <div className="ml-3 gap-2 pl-2 indent-0 text-2xl font-medium tracking-tight">
                      <p className="inline font-mono text-base font-light tracking-wide">
                        {format(item.dateReleasedIso, 'yyyy')}, p.{item.pages}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Fragment>
        )
      })}
    </>
  )
}

function BookPage({ books, title }) {
  return (
    <Grid as="section">
      <HeadlineColumnA>
        <HeadlineTitle aria-label={title} as="h1">
          <>{title}</>
        </HeadlineTitle>
        <HeadlineTitleSub>
          <div className="flex flex-col gap-1">
            {books.map((book) => {
              return (
                <div className="flex flex-row items-center gap-2 ">
                  <Badge color={book.color} size="2">
                    {lpad(book.items.length)}
                  </Badge>
                  <a
                    className="font-mono text-base tracking-wide"
                    href={`#${book.id}`}
                  >
                    {book.title}
                  </a>
                </div>
              )
            })}
          </div>
        </HeadlineTitleSub>
      </HeadlineColumnA>
      <HeadlineContent>
        <>
          <p className={cx('text-lg tracking-wide')}>
            There is something about physical books! Sarah and I tend to surround
            ourselves with them and are often reading a few at a time. Still working
            on the layout and what kind of stuff it entails. This is not an
            exhaustive all-time list just one that since I started creating this
            section I have been keeping track of.
          </p>
          <p className={cx('text-lg tracking-wide')}>
            This does not count <strong>cookbooks</strong>. (Of which I think I may
            make a whole new section.)
          </p>
          <p className={cx('text-2xl tracking-wide')}>
            Please support your local library and bookstores. If you buy online,
            please consider <strong>Biblio</strong> (whose affiliate program is ...
            uh ... not in their control) and <strong>Bookshop</strong> (whose
            affiliate program I am in the process of setting up).
          </p>
          <p className={cx('text-lg tracking-wide', 'flex flex-col gap-0', '')}>
            On that note: Pittsburgh is home to a lot great bookstores!
          </p>
          <ul className="list-inside pb-4 text-base tracking-wide lg:list-disc lg:text-lg">
            <li className="my-2 lg:my-1">Amazing Books and Records</li>
            <li className="my-2 lg:my-1">Bottom Feeder Books</li>
            <li className="my-2 lg:my-1">The Big Idea Bookstore Cooperative</li>
            <li className="my-2 lg:my-1">City of Asylum Bookstore </li>
            <li className="my-2 lg:my-1">White Whale Bookstore</li>
            <li className="my-2 lg:my-1">& “many more”</li>
          </ul>
          <Separator orientation="horizontal" size="4" />
          <WIP description={`This page is currently getting an overhaul.`} />
          <Books data={books} />
        </>
      </HeadlineContent>
    </Grid>
  )
}

export { BookPage }
