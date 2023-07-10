'use client'
import { Separator } from '@jeromefitz/ds/components/Separator'
import { cx } from '@jeromefitz/ds/utils/cx'
import { Fragment } from 'react'

import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  // SectionHero,
  SectionWrapper,
  // Tags,
} from '~components/Section'

const books = [
  {
    author: 'Robert A. Caro',
    id: 'the-power-broker',
    subtitle: 'Robert Moses and the Fall of New York',
    title: 'The Power Broker',
  },
  {
    author: 'Patrick Radeen Keefe',
    id: 'empire-of-pain',
    subtitle: 'The Secret History of the Sackler Dynasty',
    title: 'Empire of Pain',
  },
  {
    author: 'Natalie Haynes',
    id: 'a-thousand-ships',
    subtitle: 'A Novel',
    title: 'A Thousand Ships',
  },
]

function NowReading() {
  return (
    <SectionWrapper>
      <SectionHeader>
        <SectionHeaderTitle>Now Reading</SectionHeaderTitle>
        <SectionHeaderContent>
          <span></span>
        </SectionHeaderContent>
      </SectionHeader>
      <SectionContent>
        {books.map((book) => {
          return (
            <Fragment key={`book-${book.id}`}>
              <div className={cx('flex flex-col gap-5 md:gap-4', 'pl-2 md:pl-4')}>
                <div className={cx('my-3 flex w-full flex-col justify-center')}>
                  <span
                    className={cx(
                      'mb-2 text-3xl font-black tracking-tighter md:text-6xl',
                      'before:relative before:ml-[-0.95rem] before:content-[open-quote] before:md:ml-[-1.80rem]',
                      'after:content-[close-quote]'
                    )}
                  >
                    {book.title}
                  </span>
                  <span
                    className={cx(
                      'mb-2 text-2xl font-extrabold tracking-tight md:mb-5  md:text-5xl'
                    )}
                  >
                    {book.author}
                  </span>
                  <span
                    className={cx(
                      'mb-4 text-xl font-light tracking-tight md:mb-6 md:text-3xl'
                    )}
                  >
                    {book.subtitle}
                  </span>
                </div>
              </div>
              <Separator />
            </Fragment>
          )
        })}
        <div className="mt-3">
          I read a lot. I do not think that makes me unique, however, I enjoy it all
          the same. If you’d like to see more of my reading habits please check out
          the <span className="line-through">books section</span>.
          {/* <Anchor href="/books">books section</Anchor>. */}
        </div>
      </SectionContent>
    </SectionWrapper>
  )
}

export { NowReading }
