'use client'
// https://github.com/ikatyang/emoji-cheat-sheet
import { useDelayedRender } from '@jeromefitz/design-system'
import { cx } from '@jeromefitz/shared/src/utils'
import _formatDate from 'date-fns/format'
import _parseISO from 'date-fns/parseISO'
import FocusTrap from 'focus-trap-react'
import { motion, useCycle } from 'framer-motion'
import _orderBy from 'lodash/orderBy'
import { useRouter } from 'next/navigation'
// import { Router } from 'next/router'
import { useContext, useRef } from 'react'
import Balancer from 'react-wrap-balancer'

import { Anchor } from '~components/Anchor'
import {
  handleRouterChange,
  LinkRouterChangeContext,
} from '~context/LinkRouterChangeContext'
import { useDimensions } from '~hooks/useDimensions'
import { useNotion } from '~hooks/useNotion'
import { filterForEventsInFuture } from '~utils/isEventInFuture'
// import { log } from '~utils/log'

// const items = [
//   { color: '#FF008C', slug: 'home', title: 'Home', url: '/' },
//   { color: '#D309E1', slug: 'shows', title: 'Shows', url: '/shows' },
//   { color: '#4400FF', slug: 'testing', title: 'Testing', url: '/testing' },
// ]

const UpcomingItem = ({ item, toggle }) => {
  // const { color, title, url } = item
  const { dateEvent, slug, title } = item.properties
  const ts = dateEvent.start.slice(0, 10)
  const url = `/events/${ts.replaceAll('-', '/')}/${slug}`
  // const color = '#FF008C'

  return (
    <motion.li
      variants={{
        open: {
          y: 0,
          opacity: 1,
          transition: {
            y: { stiffness: 1000, velocity: -100 },
          },
        },
        closed: {
          y: -50,
          opacity: 0,
          transition: {
            y: { stiffness: 1000 },
          },
        },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={cx(
        'flex cursor-pointer list-none items-center',
        'rounded-3xl  p-1',
        'shadow-2xl',
        'mb-4 ',
        // 'bg-zinc-100 dark:bg-zinc-900',
        'mauve-bg-int'
      )}
      onClick={toggle}
    >
      <Anchor
        href={url}
        className={cx(
          'inline-flex items-center justify-center',
          'focus:outline-none',
          'focus-visible:outline-4',
          'focus-visible:outline-offset-8',
          // 'focus-visible:outline-purple-500',
          'focus-visible:w-full',
          'focus-visible:outline-radix-purple5'
        )}
      >
        <>
          <div
            className={cx(
              'm-4 shrink grow-0 basis-10 ',
              'flex flex-col items-center',
              'border-radix-red9 rounded border-2'
            )}
          >
            <h4
              className={cx(
                'mx-2',
                'text-center text-base font-bold',
                'w-full',
                'uppercase',
                'bg-radix-red9'
              )}
            >
              {_formatDate(_parseISO(dateEvent?.start), 'MMM')}
            </h4>
            <h4
              className={cx(
                'mx-2',
                'text-center text-lg font-bold',
                'w-full',
                'bg-white text-black',
                'rounded-b'
              )}
            >
              {_formatDate(_parseISO(dateEvent?.start), 'dd')}
            </h4>
          </div>
          <div className={cx('flex rounded-md', '')}>
            <h4 className={cx('m-2 text-base font-bold')}>
              <Balancer>{title}</Balancer>
            </h4>
          </div>
        </>
      </Anchor>
    </motion.li>
  )
}

const UpcomingItems = ({ isOpen, toggle }) => {
  const { data, isLoading } = useNotion('events')
  const items = isLoading
    ? []
    : _orderBy(filterForEventsInFuture(data?.items?.results), [
        'properties.dateEvent.start',
      ])?.slice(0, 3)

  // log(`UpcomingItems`, items)

  return (
    <motion.ul
      className={cx(
        'm-3 px-3 md:m-6 md:p-0',
        'absolute top-0 w-full md:w-72',
        // 'left-20',
        'right-1 md:right-2',
        // 'flex max-w-sm flex-col-reverse justify-center',
        isOpen ? 'inline-flex' : 'hidden',
        'flex max-w-sm flex-col justify-end'
      )}
      initial={{ display: 'none' }}
      variants={{
        open: {
          display: 'inline-flex',
          transition: { staggerChildren: 0.07, delayChildren: 0.2, duration: 2 },
        },
        closed: {
          transition: { staggerChildren: 0.05, staggerDirection: -1, duration: 2 },
          transitionEnd: { display: 'none' },
        },
      }}
    >
      {!!items &&
        items.map((item) => (
          <UpcomingItem
            item={item}
            key={`upcoming-item--${item.id}`}
            toggle={toggle}
          />
        ))}
    </motion.ul>
  )
}

// const Path = (props) => (
//   <motion.path
//     fill="transparent"
//     strokeWidth="3"
//     stroke="hsl(0, 0%, 18%)"
//     strokeLinecap="round"
//     {...props}
//   />
// )

const UpcomingToggle = ({ isOpen, toggle }) => {
  const { data, isLoading } = useNotion('events')
  const items = filterForEventsInFuture(data?.items?.results)
  const count = isLoading ? '■' : items?.length
  const router = useRouter()
  const startChange: any = useContext(LinkRouterChangeContext)
  // log(`UpcomingToggle`, data)

  return (
    <motion.div
      className={cx(
        'pointer-events-auto z-10',
        'absolute p-0',
        'right-1 md:right-3',
        'flex flex-row',
        'shrink-0 grow-0 basis-auto',
        'h-12 w-72',
        'items-center',
        'justify-between',
        'mx-6 my-2 md:m-6 md:p-0',
        ''
      )}
      // onClick={toggle}
      variants={{
        open: {
          y: count === 2 ? 224 : 336,
          opacity: 1,
          transition: {
            y: { stiffness: 1000, velocity: -100 },
          },
        },
        closed: {
          y: 0,
          opacity: 1,
          transition: {
            delay: 0.25,
            y: { stiffness: 1000, velocity: -100 },
          },
        },
      }}
    >
      <motion.button
        onClick={() => {
          handleRouterChange(`/events`, startChange)
          toggle()
          router.push('/events')
        }}
        className={cx(
          'pointer-events-auto cursor-pointer border-none outline-none',
          'focus:outline-none',
          'focus-visible:outline-4',
          'focus-visible:outline-offset-8',
          // 'focus-visible:outline-yellow-500',
          // 'bg-zinc-900 text-slate-200 hover:bg-slate-800',
          // 'dark:bg-zinc-100 dark:text-slate-800 dark:hover:bg-slate-200',
          'shadow-xl',
          'rounded-[100px] text-center',
          'py-2 pl-3',
          'transition-all duration-500',
          isOpen ? 'ml-4 pr-4' : 'pr-5',
          // isOpen ? 'w-1/2 pr-1' : 'w-3/4 pr-5'
          'focus-visible:outline-radix-yellow5',
          'bg-radix-mauve3 text-radix-mauve12',
          'font-sans text-sm font-bold'
        )}
        animate={{
          scale: isOpen ? 1 : 0,
          x: isOpen ? 0 : 150,
          opacity: isOpen ? 1 : 0,
        }}
        initial={false}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        See All
        <span
          className={cx(
            'ml-2 inline-flex h-4 w-5 items-center justify-center rounded-full',
            'bg-radix-orange5 text-radix-orange11',
            'dark:bg-radix-orange11 dark:text-radix-orange5'
          )}
        >
          {count}
        </span>
      </motion.button>
      <motion.button
        onClick={toggle}
        className={cx(
          'pointer-events-auto cursor-pointer border-none outline-none',
          'relative',
          'focus:outline-none',
          'focus-visible:outline-4',
          'focus-visible:outline-offset-8',
          // 'focus-visible:outline-yellow-500',
          // 'bg-zinc-900 text-slate-200 hover:bg-slate-800',
          // 'dark:bg-zinc-100 dark:text-slate-800 dark:hover:bg-slate-200',
          'shadow-xl',
          'rounded-[100px] text-center',
          'py-2 pl-3',
          'transition-all duration-500',
          // 'flex flex-row  items-center',
          isOpen ? 'w-1/2 pr-3' : 'w-3/4 pr-5',
          isOpen && 'left-[1px]',
          'right-0 top-[1px]',
          '',
          'focus-visible:outline-radix-yellow5',
          'bg-radix-mauve3 text-radix-mauve12',
          'font-sans text-sm font-bold'
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <>Show Less</>
        ) : (
          <>
            <span
              className={cx(
                'ml-2 inline-flex h-4 items-center justify-center rounded-full  '
                // 'bg-radix-orange4 text-radix-orange11'
                // 'orange-bg-int text-radix-orange11'
              )}
            >
              Upcoming Events
            </span>
            <span
              className={cx(
                'ml-2 inline-flex h-4 w-5 items-center justify-center rounded-full  ',
                // 'bg-radix-orange4 text-radix-orange11'
                'bg-radix-orange5 text-radix-orange11',
                'dark:bg-radix-orange11 dark:text-radix-orange5'
              )}
            >
              {count}
            </span>
          </>
        )}
      </motion.button>
    </motion.div>
  )
}

function UpcomingBackdrop() {
  return (
    <>
      <motion.div
        id={`modal--background`}
        className={cx(
          'absolute inset-y-0 left-0',
          'pointer-events-auto m-0 p-0',
          'h-full w-full',
          'backdrop-blur',
          ''
        )}
        initial={{ display: 'none' }}
        variants={{
          open: {
            opacity: [0, 0.25, 0.5, 0.75, 1],
            display: 'block',
          },
          closed: {
            opacity: [1, 0.75, 0.5, 0.25, 0],
            transition: { delay: 0.25 },
            transitionEnd: { display: 'none' },
          },
        }}
      />
      <motion.div
        id={`modal--background`}
        className={cx(
          'absolute inset-y-0 left-0',
          'pointer-events-auto m-0 p-0',
          'h-full w-full',
          // 'bg-[var(--blackA12)] dark:bg-[var(--whiteA12)]',
          // 'mauve-bg',
          'bg-white dark:bg-black',
          ''
        )}
        initial={{ display: 'none' }}
        variants={{
          open: {
            opacity: [0, 0.25, 0.5, 0.75, 0.95],
            display: 'block',
            transition: { duration: 0.35 },
          },
          closed: {
            opacity: [0.95, 0.75, 0.5, 0.25, 0],
            transition: { delay: 0.125, duration: 0.25 },
            transitionEnd: { display: 'none' },
          },
        }}
      />
    </>
  )
}

function UpcomingSidebar() {
  return (
    <motion.div
      id={`modal-sidebar`}
      className={cx(
        'absolute inset-y-0',
        'items-center justify-center',
        // 'left-0',
        'right-0',
        'w-full md:w-1/3',
        '',
        ''
      )}
      initial={{ display: 'none' }}
      variants={{
        open: () => ({
          // clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
          display: 'block',
          transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
          },
        }),
        closed: {
          // clipPath: 'circle(30px at 40px 40px)',
          transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 400,
            damping: 40,
          },
          transitionEnd: { display: 'none' },
        },
      }}
    />
  )
}

function Upcoming() {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerEl = useRef(null)
  const { height } = useDimensions(containerEl)

  const { mounted: isOpenDelay } = useDelayedRender(isOpen, {
    exitDelay: 1000,
  })

  // const { ...eventsProps } = useNotion('events')
  // log(`eventsProps`, eventsProps)

  return (
    <>
      <FocusTrap active={isOpen} focusTrapOptions={{}}>
        <motion.div
          id="nav__menu_right"
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          custom={height}
          ref={containerEl}
          role="dialog"
          className={cx(
            // 'absolute',
            'fixed',
            'z-40',
            'inset-y-0',
            'm-0 p-0',
            'right-0',
            'w-full',
            'trap',
            isOpenDelay ? 'z-50 h-full w-full' : 'z-10 h-9 w-1/4',
            'pointer-events-auto'
          )}
        >
          <UpcomingBackdrop />
          <UpcomingSidebar />
          <UpcomingToggle isOpen={isOpen} toggle={() => toggleOpen()} />
          <UpcomingItems isOpen={isOpenDelay} toggle={() => toggleOpen()} />
        </motion.div>
      </FocusTrap>
    </>
  )
}

export { Upcoming }
