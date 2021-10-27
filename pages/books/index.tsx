import cx from 'clsx'
import { motion } from 'framer-motion'
import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'

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
    title: 'The Stench of Honolulu',
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
    subtitle: 'and other unavoidable truths',
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
            looking forward. (Spoiler: I am not a CEO.)
          </p>
          <p className={cx('my-6 prose text-2xl')}>
            My favorite author is{' '}
            <span className={cx('font-bold')}>Robert A. Caro</span> and not just
            because I spent a large chunk of my past year with their words (and his
            wife <span className={cx('font-bold')}>Ina Caro</span>, her books on
            France and Parise should be in up next but am holding until we can travel
            again). While <span className={cx('font-bold')}>Madeline Miller</span>{' '}
            has jump-started me back into the world of fiction after many years of
            unexplainable avoidance. My main focus are memoirs, biographies, and
            history I guess looking this over somewhat quickly.
          </p>
          <h2 className="my-4">
            <Emoji character={`📚️`} margin={true} />
            {` `}Currently Reading ({_size(inProgress)}):
          </h2>
          <UL>
            {_map(inProgress, (book, bookIndex) => (
              <ListItem book={book} key={`book--inProgress--${bookIndex}`} />
            ))}
          </UL>
          <div className={cx('spacer my-4 bg-gray-600 dark:bg-gray-300')} />
          <h2 className="my-4">
            <Emoji character={`🏁️`} margin={true} />
            {` `}Recently Finished ({_size(complete)}):
          </h2>
          <UL>
            {_map(complete, (book, bookIndex) => (
              <ListItem book={book} key={`book--complete--${bookIndex}`} />
            ))}
          </UL>
          <div className={cx('spacer my-4 bg-gray-600 dark:bg-gray-300')} />
          <h2 className="my-4">
            <Emoji character={`🔜️`} margin={true} />
            {` `}Up Next ({_size(pending)}):
          </h2>
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
