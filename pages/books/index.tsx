import _map from 'lodash/map'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~components/Accordion'
import { PageHeading } from '~components/Layout'
import Seo from '~components/Seo'
import booksByStatus, { STATUS } from '~data/books'
import { Flex, Note, Text } from '~styles/system/components'

const Emoji = dynamic(() => import('~components/Emoji'), {
  ssr: false,
})

const HEADING = ({ emoji, size, title }) => {
  return (
    <Flex css={{ flexDirection: 'row', gap: 7 }}>
      <Text
        as="h4"
        css={{ display: 'flex', color: '$colors$gray12', fontWeight: '700' }}
      >
        <Emoji character={emoji} margin={true} />
        <Text as="span" css={{ ml: '$2', color: 'inherit', fontWeight: 'inherit' }}>
          {title}
        </Text>
        <Text
          as="sup"
          css={{
            color: 'inherit',
            display: 'inline-flex',
            fontWeight: '700',
            fontSize: '$2',
            ml: '$1',
          }}
        >
          {size}
        </Text>
      </Text>
    </Flex>
  )
}

const UL = ({ children }) => {
  return <Text as="ul">{children}</Text>
}

const ListItem = ({ book }) => {
  return (
    <Text as="li" css={{ my: '$3', color: '$colors$gray12', '@bp1': { my: '$5' } }}>
      <Text as="p" css={{ fontWeight: '700', color: 'inherit' }}>
        “{book.title}
        {book?.subtitle && `: ${book?.subtitle}`}”
        <Text
          as="span"
          css={{
            ml: '$2',
            mt: '$2',
            color: 'inherit',
          }}
        >
          {book.author}
        </Text>
      </Text>
    </Text>
  )
}

const Books = () => {
  const url = 'https://jeromefitzgerald.com/books'
  const title = 'Books'
  const description =
    'Jerome loves reading. They say a CEO reads ~60 books a year. Here is a quick rundown of some of the books that define him as not a CEO.'

  const seo = {
    title: title,
    description: description,
    canonical: url,
    openGraph: {
      url,
      title,
      description,
    },
  }

  return (
    <>
      <Seo {...seo} />
      <PageHeading title={seo.title} description={seo.description} />
      <Note>This page is in-progress.</Note>
      <Text
        as="p"
        css={{
          my: '$6',
          fontSize: '$6',
          letterSpacing: '-.015em',
          lineHeight: '1.5',
        }}
      >
        <Emoji character={`🏅️`} margin={true} />
        Cannot recommend{' '}
        <Text
          as="span"
          css={{ display: 'inline', fontSize: 'inherit', fontWeight: '700' }}
        >
          Robert A. Caro
        </Text>{' '}
        highly enough (and not just because I spent a large chunk of my past year
        with them).
      </Text>
      <Text
        as="p"
        css={{
          my: '$6',
          fontSize: '$6',
          letterSpacing: '-.015em',
          lineHeight: '1.5',
        }}
      >
        <Emoji character={`🧙️`} margin={true} />
        The marvelous{' '}
        <Text
          as="span"
          css={{ display: 'inline', fontSize: 'inherit', fontWeight: '700' }}
        >
          Madeline Miller
        </Text>{' '}
        has jump-started me back into the world of fiction after many years of
        unexplainable avoidance.
      </Text>
      <Text
        as="p"
        css={{
          my: '$6',
          fontSize: '$5',
          letterSpacing: '-.0125em',
          lineHeight: '1.25',
        }}
      >
        <Emoji character={`🥘️`} margin={true} />
        Cookbooks are not represented, and may be a different section entirely at
        some point.
      </Text>
      <Accordion type="single" defaultValue={STATUS.IN_PROGRESS.id} collapsible>
        {_map(booksByStatus, (type, typeIndex) => {
          return (
            <AccordionItem key={`types-${typeIndex}`} value={type.id}>
              {/* eslint-disable @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <AccordionTrigger>
                <HEADING
                  emoji={type.emoji}
                  title={type.title}
                  size={_size(type.data)}
                />
              </AccordionTrigger>
              {/* eslint-disable @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <AccordionContent>
                <UL>
                  {_map(type.data, (book, bookIndex) => (
                    <ListItem book={book} key={`book--${typeIndex}--${bookIndex}`} />
                  ))}
                </UL>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      <Text as="p" css={{ pt: '$4', my: '$3', fontSize: '$5', lineHeight: '1.5' }}>
        <Emoji character={`📖️`} margin={true} />
        Throughout the past year plus I have been gifting a pal a random book a
        month. I do not know if they will ever read them, but I try to pick ones I
        think people would like.
      </Text>
    </>
  )
}

export default Books
