// // import { styled, keyframes } from '@stitches/react'
// import { violet, blackA, mauve } from '@radix-ui/colors'
// import * as Accordion from '@radix-ui/react-accordion'
// import { ChevronDownIcon } from '@radix-ui/react-icons'
import cx from 'clsx'
import { motion } from 'framer-motion'
import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import React from 'react'

import Layout from '~components/Layout'
import Seo from '~components/Seo'
import { MOTION_PAGE_VARIANTS } from '~lib/constants'

const Breadcrumb = dynamic(() => import('~components/Notion/Breadcrumb'), {})
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

// // const slideDown = keyframes({
// //   from: { height: 0 },
// //   to: { height: 'var(--radix-accordion-content-height)' },
// // });

// // const slideUp = keyframes({
// //   from: { height: 'var(--radix-accordion-content-height)' },
// //   to: { height: 0 },
// // });

// // eslint-disable-next-line react/display-name
// export const AccordionRoot = React.forwardRef(
//   ({ children, ...props }, forwardedRef) => (
//     <Accordion.Root
//       {...props}
//       className={cx(`rounded-xl w-full`, 'shadow-2xl')}
//       ref={forwardedRef}
//     >
//       {children}
//     </Accordion.Root>
//   )
// )

// // eslint-disable-next-line react/display-name
// export const AccordionItem = React.forwardRef(
//   ({ children, ...props }, forwardedRef) => (
//     <Accordion.Item
//       {...props}
//       className={cx(`rounded-xl w-full`, 'shadow-2xl')}
//       ref={forwardedRef}
//       style={{
//         overflow: 'hidden',
//         marginTop: 1,

//         // '&:first-child': {
//         //   marginTop: 0,
//         //   borderTopLeftRadius: 4,
//         //   borderTopRightRadius: 4,
//         // },

//         // '&:last-child': {
//         //   borderBottomLeftRadius: 4,
//         //   borderBottomRightRadius: 4,
//         // },

//         // '&:focus-within': {
//         //   position: 'relative',
//         //   zIndex: 1,
//         //   boxShadow: `0 0 0 2px ${mauve.mauve12}`,
//         // },
//       }}
//     >
//       {children}
//     </Accordion.Item>
//   )
// )

// // eslint-disable-next-line react/display-name
// export const AccordionContent = React.forwardRef(
//   ({ children, ...props }, forwardedRef) => (
//     <Accordion.Content
//       {...props}
//       className={cx(
//         'overflow-hidden text-base',
//         'text-black bg-white dark:text-white dark:bg-black'
//       )}
//       ref={forwardedRef}
//       style={
//         {
//           // overflow: 'hidden',
//           // fontSize: 15,
//           // color: 'black',
//           // backgroundColor: 'white',
//           // // '&[data-state="open"]': {
//           // //   animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
//           // // },
//           // // '&[data-state="closed"]': {
//           // //   animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
//           // // },
//         }
//       }
//     >
//       <div className={cx('px-4 py-6')}>{children}</div>
//     </Accordion.Content>
//   )
// )

// // eslint-disable-next-line react/display-name
// export const AccordionTrigger = React.forwardRef(
//   ({ children, ...props }, forwardedRef) => (
//     <Accordion.Header
//       className={cx('flex')}
//       style={{
//         all: 'unset',
//         // display: 'flex',
//       }}
//     >
//       <Accordion.Trigger
//         {...props}
//         className={cx(
//           'flex items-center justify-between',
//           'h-[45px] px-0 py-6 bg-transparent',
//           'text-base leading-none',
//           `color-[${violet.violet11}]`,
//           `hover:cursor-pointer hover:bg-[${mauve.mauve6}]`
//         )}
//         ref={forwardedRef}
//         style={{
//           all: 'unset',
//           // fontFamily: 'inherit',
//           // backgroundColor: 'transparent',
//           // padding: '0 20px',
//           // height: 45,
//           // flex: 1,
//           // display: 'flex',
//           // alignItems: 'center',
//           // justifyContent: 'space-between',
//           // fontSize: 15,
//           // lineHeight: 1,
//           // color: violet.violet11,
//           // boxShadow: `0 1px 0 ${mauve.mauve6}`,
//           // '&[data-state="closed"]': { backgroundColor: 'white' },
//           // '&[data-state="open"]': { backgroundColor: 'white' },
//           // '&:hover': { backgroundColor: mauve.mauve2 },
//         }}
//       >
//         {children}
//         <ChevronDownIcon
//           // aria-hidden
//           className={cx(`color-[${violet.violet10}] transform`)}
//           style={
//             {
//               // color: violet.violet10,
//               // transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
//               // '[data-state=open] &': { transform: 'rotate(180deg)' },
//             }
//           }
//         />
//       </Accordion.Trigger>
//     </Accordion.Header>
//   )
// )

const HEADING = ({ emoji, size, title }) => {
  return (
    <h2 className="my-4">
      <Emoji character={emoji} margin={true} />
      {` `}
      {title}
      <sup className={cx('ml-3')}>{size}</sup>
    </h2>
  )
}

const UL = ({ children }) => {
  return <ul className={cx('flex flex-col')}>{children}</ul>
}

const ListItem = ({ book }) => {
  return (
    <li className={cx('')}>
      <p className={cx('font-black text-xl')}>
        “{book.title}
        {book?.subtitle && `: ${book?.subtitle}`}”
        <span className={cx('ml-2 block font-medium')}>{book.author}</span>
      </p>
    </li>
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
    <Layout>
      <Seo {...seo} />
      <Breadcrumb isIndex={true} title={title} />
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
          {/* <AccordionRoot collapsible defaultValue="item-1" type="single">
            <AccordionItem value="item-1">
              <AccordionTrigger>Trigger 1</AccordionTrigger>
              <AccordionContent>Content 1</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Trigger 2</AccordionTrigger>
              <AccordionContent>Content 2</AccordionContent>
            </AccordionItem>
          </AccordionRoot> */}
          <h4
            className={cx(
              'rounded-xl  p-4',
              'bg-gray-300 dark:bg-gray-700',
              'text-gray-900 dark:text-gray-300',
              '',
              ''
            )}
          >
            <Emoji character={`🚧️`} margin={true} />
            {` `}This page is in-progress.
          </h4>
          <p className={cx('my-6 prose text-2xl')}>
            They say a CEO reads ~60 books a year. Here is a quick rundown of some of
            the books I am currently reading, have read in the past year, and am
            looking forward to. (Spoiler: I am not a CEO.)
          </p>
          <p className={cx('my-6 prose text-2xl')}>
            My favorite author is{' '}
            <span className={cx('font-bold')}>Robert A. Caro</span> and not just
            because I spent a large chunk of my past year with their words (and his
            wife <span className={cx('font-bold')}>Ina Caro</span>, her books on
            France and Paris should be in{' '}
            <span className={cx('italic')}>up next</span> but am holding until we can
            travel again).{` `}
            <span className={cx('font-bold')}>Madeline Miller</span> has jump-started
            me back into the world of fiction after many years of unexplainable
            avoidance. My main focus are memoirs, biographies, and history I guess
            after looking this over somewhat quickly.{' '}
            <Emoji character={`😆️`} margin={true} />
          </p>
          <HEADING
            emoji={`📚️`}
            title={`Currently Reading`}
            size={_size(inProgress)}
          />
          <UL>
            {_map(inProgress, (book, bookIndex) => (
              <ListItem book={book} key={`book--inProgress--${bookIndex}`} />
            ))}
          </UL>
          <div className={cx('spacer my-4 bg-gray-600 dark:bg-gray-300')} />
          <HEADING
            emoji={`🏁️`}
            title={`Recently Finished`}
            size={_size(complete)}
          />
          <UL>
            {_map(complete, (book, bookIndex) => (
              <ListItem book={book} key={`book--complete--${bookIndex}`} />
            ))}
          </UL>
          <div className={cx('spacer my-4 bg-gray-600 dark:bg-gray-300')} />
          <HEADING emoji={`🔜️`} title={`Up Next`} size={_size(pending)} />
          <UL>
            {_map(pending, (book, bookIndex) => (
              <ListItem book={book} key={`book--pending--${bookIndex}`} />
            ))}
          </UL>
          <p className={cx('m-6 prose text-2xl')}>
            Throughout the past year plus I have been gifting a pal a random book a
            month. I do not know if they will ever read them, but I try to pick ones
            I think people would like. (Including cookbooks, which are a favorite of
            mine too which will be separate in its own ‘cooking’ section on this
            website at some point as Sarah and I have over 20.)
          </p>
        </motion.div>
      </motion.div>
    </Layout>
  )
}

export default Music
