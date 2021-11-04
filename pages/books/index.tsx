import {
  // darkTheme,
  // Avatar,
  // Box,
  // Grid,
  // Paragraph,
  Text,
  Flex,
  // Link,
} from '@modulz/design-system'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { styled, keyframes } from '@stitches/react'
import cx from 'clsx'
import { motion } from 'framer-motion'
import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import React from 'react'

import Seo from '~components/Seo'
import { MOTION_PAGE_VARIANTS } from '~lib/constants'

const Emoji = dynamic(() => import('~components/Notion/Emoji'), {
  ssr: false,
})

const books = {
  'real-artists-have-day-jobs': {
    id: 'real-artists-have-day-jobs',
    slug: 'real-artists-have-day-jobs',
    title: 'Real Artists Have Day Jobs',
    subtitle: 'And Other Awesome Things They Don’t Teach You In School',
    status: 'In Progress',
    author: 'Sara Benincasa',
  },
  'free-play': {
    id: 'free-play',
    slug: 'free-play',
    title: 'Free Play',
    subtitle: 'Improvisation in Life And Art',
    status: 'In Progress',
    author: 'Stephen Nachmanovitch',
  },
  'the-power-broker': {
    id: 'the-power-broker',
    slug: 'the-power-broker',
    title: 'The Power Broker',
    subtitle: 'Robert Moses and the Fall of New York',
    status: 'In Progress',
    author: 'Robert A. Caro',
  },
  'fire-shut-up-in-my-bones': {
    id: 'fire-shut-up-in-my-bones',
    slug: 'fire-shut-up-in-my-bones',
    title: 'Fire Shut Up in My Bones',
    subtitle: 'A Memoir',
    status: 'Pending',
    author: 'Charles M. Blow',
  },
  'the-art-of-doing-science-and-engineering': {
    id: 'the-art-of-doing-science-and-engineering',
    slug: 'the-art-of-doing-science-and-engineering',
    title: 'The Art of Doing Science and Engineering',
    subtitle: 'Learning to Learn',
    status: 'Pending',
    author: 'Richard W. Hamming',
  },
  'the-lady-with-the-borzoi': {
    id: 'the-lady-with-the-borzoi',
    slug: 'the-lady-with-the-borzoi',
    title: 'The Lady With The Borzoi',
    subtitle: 'Blanche Knopf, Literary Tastemaker Extraordinaire',
    status: 'Pending',
    author: 'Laura Claridge',
  },
  'lyndon-johnson-and-the-american-dream': {
    id: 'lyndon-johnson-and-the-american-dream',
    slug: 'lyndon-johnson-and-the-american-dream',
    title: 'Lyndon Johnson & The American Dream',
    subtitle: '',
    status: 'Pending',
    author: 'Doris Kearns',
  },
  'mike-nichols': {
    id: 'mike-nichols',
    slug: 'mike-nichols',
    title: 'Mike Nichols',
    subtitle: 'A Life',
    status: 'Pending',
    author: 'Mark Harris',
  },
  'an-elegant-puzzle': {
    id: 'an-elegant-puzzle',
    slug: 'an-elegant-puzzle',
    title: 'An Elegant Puzzle',
    subtitle: 'Systems of Engineering Management',
    status: 'Complete',
    author: 'Will Larson',
  },
  'song-of-achilles': {
    id: 'song-of-achilles',
    slug: 'song-of-achilles',
    title: 'Song of Achilles',
    subtitle: '',
    status: 'Complete',
    author: 'Madeline Miller',
  },
  circe: {
    id: 'circe',
    slug: 'circe',
    title: 'Circe',
    subtitle: '',
    status: 'Complete',
    author: 'Madeline Miller',
  },
  'what-doesnt-kill-you-makes-you-blacker': {
    id: 'what-doesnt-kill-you-makes-you-blacker',
    slug: 'what-doesnt-kill-you-makes-you-blacker',
    title: 'What Doesn’t Kill You Makes You Blacker',
    subtitle: 'A Memoir in Essays',
    status: 'Complete',
    author: 'Damon Young',
  },
  'the-education-of-an-idealist': {
    id: 'the-education-of-an-idealist',
    slug: 'the-education-of-an-idealist',
    title: 'The Education of an Idealist',
    subtitle: 'A Memoir',
    status: 'Complete',
    author: 'Samantha Power',
  },
  wenger: {
    id: 'wenger',
    slug: 'wenger',
    title: 'Wenger',
    subtitle: 'My Life and Lessons in Red and White',
    status: 'Complete',
    author: 'Arsene Wenger',
  },
  'the-path-to-power': {
    id: 'the-path-to-power',
    slug: 'the-path-to-power',
    title: 'The Path to Power',
    subtitle: 'The Years of Lyndon Johnson',
    status: 'Complete',
    author: 'Robert A. Caro',
  },
  'means-of-ascent': {
    id: 'means-of-ascent',
    slug: 'means-of-ascent',
    title: 'Means of Ascent',
    subtitle: 'The Years of Lyndon Johnson',
    status: 'Complete',
    author: 'Robert A. Caro',
  },
  'master-of-the-senate': {
    id: 'master-of-the-senate',
    slug: 'master-of-the-senate',
    title: 'Master of the Senate',
    subtitle: 'The Years of Lyndon Johnson',
    status: 'Complete',
    author: 'Robert A. Caro',
  },
  'the-passage-of-power': {
    id: 'the-passage-of-power',
    slug: 'the-passage-of-power',
    title: 'The Passage of Power',
    subtitle: 'The Years of Lyndon Johnson',
    status: 'Complete',
    author: 'Robert A. Caro',
  },
  working: {
    id: 'working',
    slug: 'working',
    title: 'Working',
    subtitle: '',
    status: 'Complete',
    author: 'Robert A. Caro',
  },
  'funny-man': {
    id: 'funny-man',
    slug: 'funny-man',
    title: 'Funny Man',
    subtitle: 'Mel Brooks',
    status: 'Complete',
    author: 'Patrick McGilligan',
  },
  'its-good-to-be-the-king': {
    id: 'its-good-to-be-the-king',
    slug: 'its-good-to-be-the-king',
    title: 'It’s Good To Be The King',
    subtitle: 'The Seriously Funny Life of Mel Brooks',
    status: 'Complete',
    author: 'Robert Parish',
  },
  'save-yourself': {
    id: 'save-yourself',
    slug: 'save-yourself',
    title: 'Save Yourself',
    subtitle: 'A Memoir',
    status: 'Complete',
    author: 'Cameron Esposito',
  },
  'the-stench-of-honolulu': {
    id: 'the-stench-of-honolulu',
    slug: 'the-stench-of-honolulu',
    title: 'The Stench of Honolulu',
    subtitle: 'A Tropical Adventure',
    status: 'Complete',
    author: 'Jack Handey',
  },
  'will-not-attend': {
    id: 'will-not-attend',
    slug: 'will-not-attend',
    title: 'Will Not Attend',
    subtitle: 'Lively Stories of Detachment and Isolation',
    status: 'Complete',
    author: 'Adam Resnick',
  },
  robin: {
    id: 'robin',
    slug: 'robin',
    title: 'Robin',
    subtitle: '',
    status: 'Complete',
    author: 'Dave Itzkoff',
  },
  'so-anyway': {
    id: 'so-anyway',
    slug: 'so-anyway',
    title: 'So Anyway...',
    subtitle: '',
    status: 'Complete',
    author: 'John Cleese',
  },
  creativity: {
    id: 'creativity',
    slug: 'creativity',
    title: 'Creativity',
    subtitle: 'A Short and Cheerful Guide',
    status: 'Complete',
    author: 'John Cleese',
  },
  'between-the-world-and-me': {
    id: 'between-the-world-and-me',
    slug: 'between-the-world-and-me',
    title: 'Between The World And Me',
    subtitle: '',
    status: 'Complete',
    author: 'Ta-Nehisi Coates',
  },
  'when-they-call-you-a-terrorist': {
    id: 'when-they-call-you-a-terrorist',
    slug: 'when-they-call-you-a-terrorist',
    title: 'When They Call You A Terrorist',
    subtitle: 'A Black Lives Matter Memoir',
    status: 'Complete',
    author: 'Patrisse Khan-Cullors & Asha Bandela',
  },
  'things-fall-apart': {
    id: 'things-fall-apart',
    slug: 'things-fall-apart',
    title: 'Things Fall Apart',
    subtitle: '',
    status: 'Complete',
    author: 'Chinua Achebe',
  },
  'life-happens': {
    id: 'life-happens',
    slug: 'life-happens',
    title: 'Life Happens',
    subtitle: 'And Other Unavoidable Truths',
    status: 'Complete',
    author: 'Connie Schultz',
  },
  'and-his-lovely-wife': {
    id: 'and-his-lovely-wife',
    slug: 'and-his-lovely-wife',
    title: '... and His Lovely Wife',
    subtitle: '',
    status: 'Pending',
    author: 'Connie Schultz',
  },
  raw: {
    id: 'raw',
    slug: 'raw',
    title: 'Raw',
    subtitle: 'My Journey Into the Wu-Tang',
    status: 'Complete',
    author: 'Lamont U-G-d Hawkins',
  },
  'we-should-all-be-feminists': {
    id: 'we-should-all-be-feminists',
    slug: 'we-should-all-be-feminists',
    title: 'We Should All Be Feminists',
    subtitle: '',
    status: 'Complete',
    author: 'Chimamanda Ngozi Adiche',
  },
  'the-devil-you-know': {
    id: 'the-devil-you-know',
    slug: 'the-devil-you-know',
    title: 'The Devil You Know',
    subtitle: 'A Black Power Manifesto',
    status: 'Pending',
    author: 'Charles M. Blow',
  },
  'the-rise-of-theodore-roosevelt': {
    id: 'the-rise-of-theodore-roosevelt',
    slug: 'the-rise-of-theodore-roosevelt',
    title: 'The Rise of Theodore Roosevelt',
    subtitle: '',
    status: 'Pending',
    author: 'Edmund Morris',
  },
  'theodore-rex': {
    id: 'theodore-rex',
    slug: 'theodore-rex',
    title: 'Theodore Rex',
    subtitle: '',
    status: 'Pending',
    author: 'Edmund Morris',
  },
  'colonel-roosevelt': {
    id: 'colonel-roosevelt',
    slug: 'colonel-roosevelt',
    title: 'Colonel Roosevelt',
    subtitle: '',
    status: 'Pending',
    author: 'Edmund Morris',
  },
  'the-bully-puplit': {
    id: 'the-bully-puplit',
    slug: 'the-bully-puplit',
    title: 'The Bully Pulpit',
    subtitle: '',
    status: 'Pending',
    author: 'Doris Kearns',
  },
  'the-fitzgeralds-and-the-kennedys': {
    id: 'the-fitzgeralds-and-the-kennedys',
    slug: 'the-fitzgeralds-and-the-kennedys',
    title: 'The Fitzgeralds and the Kennedys',
    subtitle: 'An American Saga',
    status: 'Pending',
    author: 'Doris Kearns',
  },
  'a-promised-land': {
    id: 'a-promised-land',
    slug: 'a-promised-land',
    title: 'A Promised Land',
    subtitle: '',
    status: 'Pending',
    author: 'Barack Obama',
  },
  'all-about-me': {
    id: 'all-about-me',
    slug: 'all-about-me',
    title: 'All about Me',
    subtitle: 'My Remarkable Life in Show Business',
    status: 'Pending',
    author: 'Mel Brooks',
  },
  'me-myself-and-why': {
    id: 'me-myself-and-why',
    slug: 'me-myself-and-why',
    title: 'Me, Myself, and Why',
    subtitle: 'Searching for the Science of Self',
    status: 'Complete',
    author: 'Jennifer Ouellette',
  },
  overstated: {
    id: 'overstated',
    slug: 'overstated',
    title: 'Overstated',
    subtitle: 'A Coast-to-Coast Roast of the 50 States',
    status: 'Complete',
    author: 'Colin Quinn',
  },
  'the-woman-of-troy': {
    id: 'the-woman-of-troy',
    slug: 'the-woman-of-troy',
    title: 'The Woman of Troy',
    subtitle: 'A Novel',
    status: 'Pending',
    author: 'Pat Barker',
  },
  lavinia: {
    id: 'lavinia',
    slug: 'lavinia',
    title: 'Lavinia',
    subtitle: '',
    status: 'Pending',
    author: 'Ursula K. Le Guin',
  },
  'the-silence-of-the-girls': {
    id: 'the-silence-of-the-girls',
    slug: 'the-silence-of-the-girls',
    title: 'The Silence of the Girls',
    subtitle: '',
    status: 'Pending',
    author: 'Pat Barker',
  },
  'a-thousand-ships': {
    id: 'a-thousand-ships',
    slug: 'a-thousand-ships',
    title: 'A Thousand Ships',
    subtitle: 'A Novel',
    status: 'Pending',
    author: 'Natalie Haynes',
  },
  mythos: {
    id: 'mythos',
    slug: 'mythos',
    title: 'Mythos',
    subtitle: 'The Greek Myths Reimagined',
    status: 'Pending',
    author: 'Stephen Fry',
  },
  heroes: {
    id: 'heroes',
    slug: 'heroes',
    title: 'Heroes',
    subtitle: 'The Greek Myths Reimagined',
    status: 'Pending',
    author: 'Stephen Fry',
  },
  troy: {
    id: 'troy',
    slug: 'troy',
    title: 'Troy',
    subtitle: 'The Greek Myths Reimagined',
    status: 'Pending',
    author: 'Stephen Fry',
  },
}

const inProgress = _filter(_orderBy(books, ['author', 'slug'], ['asc']), [
  'status',
  'In Progress',
])
const pending = _filter(_orderBy(books, ['author', 'slug'], ['asc']), [
  'status',
  'Pending',
])
const complete = _filter(_orderBy(books, ['author', 'slug'], ['asc']), [
  'status',
  'Complete',
])

const types = {
  inProgress: {
    data: inProgress,
    emoji: '📚️',
    id: 'inProgress',
    title: 'Currently Reading',
  },
  pending: {
    data: pending,
    emoji: '🔜️',
    id: 'pending',
    title: 'Upcoming',
  },
  complete: {
    data: complete,
    emoji: '🏁️',
    id: 'complete',
    title: 'Complete',
  },
}

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
})

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
})

const StyledAccordion = styled(AccordionPrimitive.Root, {
  borderRadius: 6,
  width: '100%',
  backgroundColor: '$colors$gray1',
  boxShadow: `0 2px 10px $colors$gray12`,
})

const StyledItem = styled(AccordionPrimitive.Item, {
  overflow: 'hidden',
  marginTop: 1,

  '&:first-child': {
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  '&:last-child': {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  '&:focus-within': {
    position: 'relative',
    zIndex: 1,
    boxShadow: `0 0 0 2px $colors$gray12`,
  },
})

const StyledHeader = styled(AccordionPrimitive.Header, {
  all: 'unset',
  display: 'flex',
})

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  backgroundColor: 'transparent',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 15,
  lineHeight: 1,
  color: '$colors$gray12',
  boxShadow: `0 1px 0 $colors$gray9`,
  '&[data-state="closed"]': { backgroundColor: '$colors$gray1' },
  '&[data-state="open"]': { backgroundColor: '$colors$gray3' },
  '&:hover': { backgroundColor: '$colors$gray2', cursor: 'pointer' },
})

const StyledContent = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',
  fontSize: 15,
  color: '$colors$gray12',
  backgroundColor: 'inherit',
  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
})

const StyledContentText = styled('div', {})

const StyledChevron = styled(ChevronDownIcon, {
  color: '$colors$gray12',
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  '[data-state=open] &': { transform: 'rotate(180deg)' },
})

// Exports
export const Accordion = StyledAccordion
export const AccordionItem = StyledItem
// eslint-disable-next-line react/display-name
export const AccordionTrigger = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <StyledHeader>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <StyledTrigger {...props} ref={forwardedRef}>
        <div>{children}</div>
        <StyledChevron aria-hidden />
      </StyledTrigger>
    </StyledHeader>
  )
)
// eslint-disable-next-line react/display-name
export const AccordionContent = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <StyledContent {...props} ref={forwardedRef}>
        <StyledContentText>{children}</StyledContentText>
      </StyledContent>
    </>
  )
)

const HEADING = ({ emoji, size, title }) => {
  return (
    <Flex css={{ flexDirection: 'row', gap: 7 }}>
      <Text as="h4" css={{ display: 'flex', color: '$colors$gray12' }}>
        <Emoji character={emoji} margin={true} />
        <Text as="span" css={{ ml: '$2', color: 'inherit' }}>
          {title}
        </Text>
        <Text
          as="sup"
          css={{
            color: 'inherit',
            display: 'inline-flex',
            fontWeight: '500',
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
  return (
    <Text as="ul" css={{ padding: '5px', '@bp1': { padding: '10px' } }}>
      {children}
    </Text>
  )
}

const ListItem = ({ book }) => {
  return (
    <Text as="li" css={{ my: '$3', color: '$colors$gray12' }}>
      <Text as="p" css={{ fontWeight: '500', color: 'inherit' }}>
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

const Music = () => {
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
      <motion.div
        key={`page-books`}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={MOTION_PAGE_VARIANTS}
        transition={{ delay: 0.25, duration: 1, type: 'linear' }}
        className={cx('flex flex-col')}
      >
        <motion.div id="content">
          <Text
            as="p"
            css={{
              my: '$6',
              fontSize: '$6',
              letterSpacing: '-.015em',
              lineHeight: '1.5',
            }}
          >
            My favorite author is{' '}
            <Text
              as="span"
              css={{ display: 'inline', fontSize: 'inherit', fontWeight: '500' }}
            >
              Robert A. Caro
            </Text>{' '}
            and not just because I spent a large chunk of my past year with their
            words (and his wife <span className={cx('font-bold')}>Ina Caro</span>,
            her books on France and Paris should be in{' '}
            <Text
              as="span"
              css={{ display: 'inline', fontSize: 'inherit', fontWeight: '500' }}
            >
              up next
            </Text>{' '}
            but am holding until we can travel again).{` `}
            <Text
              as="span"
              css={{ display: 'inline', fontSize: 'inherit', fontWeight: '500' }}
            >
              Madeline Miller
            </Text>{' '}
            has jump-started me back into the world of fiction after many years of
            unexplainable avoidance.
          </Text>
          <Text as="p" css={{ my: '$6', fontSize: '$5', lineHeight: '1.5' }}>
            They say a CEO reads ~60 books a year. Here is a quick rundown of some of
            the books I am currently reading, have read in the past year, and am
            looking forward to. (Spoiler: I am not a CEO.)
          </Text>
          <Accordion type="single" defaultValue="inProgress" collapsible>
            {_map(types, (type, typeIndex) => {
              return (
                <AccordionItem key={`types-${typeIndex}`} value={typeIndex}>
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
                        <ListItem
                          book={book}
                          key={`book--${typeIndex}--${bookIndex}`}
                        />
                      ))}
                    </UL>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
          <Text
            as="p"
            css={{ pt: '$4', my: '$3', fontSize: '$5', lineHeight: '1.5' }}
          >
            <Emoji character={`📖️`} margin={true} />
            Throughout the past year plus I have been gifting a pal a random book a
            month. I do not know if they will ever read them, but I try to pick ones
            I think people would like.
          </Text>
          <Text as="p" css={{ mb: '$6', fontSize: '$4', lineHeight: '1.5' }}>
            <Emoji character={`🥘️`} margin={true} />
            Including cookbooks, which are a favorite of mine too which will be
            separate in its own ‘cooking’ section on this website at some point as
            Sarah and I have over 20.
            <Emoji character={`😅️`} margin={true} />
          </Text>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Music
