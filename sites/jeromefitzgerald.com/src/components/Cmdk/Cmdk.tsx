'use client'
import {
  BookOpenIcon,
  DesktopIcon,
  EnvelopeOpenIcon,
  // HamburgerMenuIcon,
  HomeIcon,
  IdCardIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  MoonIcon,
  MusicalNoteIcon,
  StarIcon,
  SunIcon,
  TicketIcon,
} from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'
import '@jeromefitz/tailwind-config/styles/cmdk.css'

import { Kbd } from '@radix-ui/themes'
import { Command, useCommandState } from 'cmdk'
import { AnimatePresence, MotionProps, motion } from 'framer-motion'
import { slug as _slug } from 'github-slugger'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import React from 'react'

import { useStore as _useStore } from '~store/index'

import { Logo } from './Icons'

const SKIP = 'skip'

const useStore = () => {
  return _useStore((store) => ({
    cmdkInput: store.cmdkInput,
    cmdkInputSet: store.cmdkInputSet,
    cmdkPages: store.cmdkPages,
    cmdkPagesSet: store.cmdkPagesSet,
    cmdkPagesSetRemove: store.cmdkPagesSetRemove,
    isCmdkInnerOpen: store.isCmdkInnerOpen,
    isCmdkInnerOpenSet: store.isCmdkInnerOpenSet,
    isCmdkOpen: store.isCmdkOpen,
    isCmdkOpenSet: store.isCmdkOpenSet,
  }))
}

const groups = [
  {
    id: 'website',
    items: [
      {
        href: '/about',
        icon: <IdCardIcon />,
        id: 'About',
        shortcut: 'U A',
      },
      {
        href: '/books',
        icon: <BookOpenIcon />,
        id: 'Books',
      },
      {
        href: '/colophon',
        icon: <InfoCircledIcon />,
        id: 'Colophon',
      },
      {
        href: '/contact',
        icon: <EnvelopeOpenIcon />,
        id: 'Contact',
      },
      {
        href: '/',
        icon: <HomeIcon />,
        id: 'Homepage / Index',
      },
      {
        href: '/music',
        icon: <MusicalNoteIcon />,
        id: 'Music',
      },
    ],
  },
]

function CMDKWrapper(props: MotionProps & { children: React.ReactNode }) {
  return (
    <AnimatePresence initial={true} mode="wait">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        initial={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.125 }}
        {...props}
      />
    </AnimatePresence>
  )
}

function SubItem({
  children,
  closeCmdK = true,
  href = '/',
  onClick = () => {},
  onSelect = () => {},
  shortcut = undefined,
  value,
}: {
  children: React.ReactNode
  closeCmdK?: boolean
  href?: string
  onClick?: () => void
  onSelect?: () => void
  shortcut?: string
  value?: string
}) {
  const search = useCommandState((state) => state.search)
  if (!search) return null
  const props = {
    closeCmdK,
    href,
    onClick,
    onSelect,
    shortcut,
    value,
  }
  return <Item {...props}>{children}</Item>
}

function Item({
  children,
  closeCmdK = true,
  href = '/',
  onClick = () => {},
  onSelect = () => {},
  shortcut = undefined,
  value = SKIP,
}: {
  children: React.ReactNode
  closeCmdK?: boolean
  href?: string
  onClick?: () => void
  onSelect?: () => void
  shortcut?: string
  value?: string
}) {
  const router = useRouter()
  const { isCmdkOpenSet } = useStore()
  const [isClick, isClickSet] = React.useState(false)

  const shouldSkip = !value.includes(SKIP)

  const _onSelect = shouldSkip
    ? () => {
        !!onClick && onClick()
        if (closeCmdK) {
          router.push(href)
          isClickSet(true)
          isCmdkOpenSet()
        }
        console.dir(`s: ${value}`)
      }
    : onSelect

  // @note(cmdk) _do not_ pass undefined as that passes entire node
  let _value = shouldSkip ? `xyz--${value}` : value
  _value = !!shortcut ? `${_value}:${shortcut}` : _value

  return (
    <Command.Item
      data-active={isClick ? 'true' : 'false'}
      id={`cmdk-${value}`}
      onMouseDown={() => {
        isClickSet(true)
      }}
      onMouseUp={() => {
        isClickSet(false)
      }}
      onSelect={_onSelect}
      value={_value}
    >
      {children}
      {/* {!!shortcut && (
        <div
          cmdk-meta=""
          cmdk-raycast-submenu-shortcuts=""
          className="flex flex-row gap-1"
        >
          {shortcut.split(' ').map((key) => {
            return <Kbd key={key}>{key}</Kbd>
          })}
        </div>
      )} */}
    </Command.Item>
  )
}

function ItemsUpcomingEvents({ isSubItem = false }) {
  const ItemComponent = isSubItem ? SubItem : Item
  const items = [
    {
      href: '/events/2024/02/03/fridge-art-sketch-show?utm_source=website&utm_medium=banner&utm_id=20240203',
      icon: <TicketIcon />,
      id: '/events/2024/02/03/fridge-art-sketch-show',
      isActive: true,
      title: 'Fridge Art Sketch Show',
      titleInfo: '',
    },
    {
      href: '/events',
      icon: <TicketIcon />,
      id: '/shows',
      isActive: true,
      title: '… All Events',
      titleInfo: 'If you can believe, there are more.',
    },
  ]
  return (
    <>
      {items.map(({ href, icon, isActive, title }) => {
        if (!isActive) return null
        return (
          <ItemComponent href={href} key={_slug(title)} value={title}>
            <Logo>{icon}</Logo>
            {title}
          </ItemComponent>
        )
      })}
    </>
  )
}
function ItemsShows({ isSubItem = false }) {
  const ItemComponent = isSubItem ? SubItem : Item
  const items = [
    {
      href: '/shows/alex-o-jerome',
      icon: <StarIcon />,
      id: '/shows/alex-o-jerome',
      isActive: true,
      title: 'Alex O’Jerome',
      titleInfo: 'Chicago to Pittsburgh Connection. Dem Vomit Twinz.',
    },
    {
      href: '/shows/bubble-boy-the-musical',
      icon: <StarIcon />,
      id: '/shows/bubble-boy-the-musical',
      isActive: true,
      title: 'Bubble Boy: The Musical',
      titleInfo: 'A musical ahead of its time by Cinco Paul',
    },
    {
      href: '/shows/jfle',
      icon: <StarIcon />,
      id: '/shows/jfle',
      isActive: true,
      title: 'JFLE (Jerome & Jesse LE)',
      titleInfo: 'Delightful absurdity with dark whimsy and musical skill',
    },
    {
      href: '/shows/justin-and-jerome-experience',
      icon: <StarIcon />,
      id: '/shows/justin-and-jerome-experience',
      isActive: false,
      title: 'Justin & Jerome Experience',
      titleInfo: 'Acclaimed improv and heralded sketch (on-and-off stage)',
    },
    {
      href: '/shows/my-dinner-with-andre-the-musical',
      icon: <StarIcon />,
      id: '/shows/my-dinner-with-andre-the-musical',
      isActive: true,
      title: 'My Dinner With André: The Musical',
      titleInfo: 'The cult classic gets the Justin & Jerome Experience treatment.',
    },
    {
      href: '/shows/the-death-show',
      icon: <StarIcon />,
      id: '/shows/the-death-show',
      isActive: true,
      title: 'The Death Show',
      titleInfo: 'The longest running death themed improv show.',
    },
    {
      href: '/shows',
      icon: <StarIcon />,
      id: '/shows',
      isActive: true,
      title: '… All Shows',
      titleInfo: 'If you can believe, there are more.',
    },
  ]
  return (
    <>
      {items.map(({ href, icon, isActive, title }) => {
        if (!isActive) return null
        return (
          <ItemComponent href={href} key={_slug(title)} value={title}>
            <Logo>{icon}</Logo>
            {title}
          </ItemComponent>
        )
      })}
    </>
  )
}
function ItemsPodcasts({ isSubItem = false }) {
  const ItemComponent = isSubItem ? SubItem : Item
  const items = [
    {
      href: '/podcasts/jer-and-ky-and-guest',
      icon: <MicrophoneIcon />,
      id: '/podcasts/jer-and-ky-and-guest',
      isActive: true,
      title: 'Jer & Ky & Guest',
      titleInfo: 'The longest running death themed improv show.',
    },
    {
      href: '/podcasts/knockoffs',
      icon: <MicrophoneIcon />,
      id: '/podcasts/knockoffs',
      isActive: true,
      title: 'Knockoffs',
      titleInfo: 'The longest running death themed improv show.',
    },
  ]
  return (
    <>
      {items.map(({ href, icon, isActive, title }) => {
        if (!isActive) return null
        return (
          <ItemComponent href={href} key={_slug(title)} value={title}>
            <Logo>{icon}</Logo>
            {title}
          </ItemComponent>
        )
      })}
    </>
  )
}
function ItemsTheme({ isSubItem = false }) {
  const { setTheme } = useTheme()
  const ItemComponent = isSubItem ? SubItem : Item
  const items = [
    {
      closeCmdK: false,
      href: '',
      icon: <MoonIcon />,
      id: '/theme/dark',
      isActive: true,
      onClick: () => setTheme('dark'),
      title: 'Change Theme Dark',
      titleInfo: '',
    },
    {
      closeCmdK: false,
      href: '',
      icon: <SunIcon />,
      id: '/theme/light',
      isActive: true,
      onClick: () => setTheme('light'),
      title: 'Change Theme Light',
      titleInfo: '',
    },
  ]

  return (
    <>
      {items.map(({ href, icon, isActive, onClick, title }) => {
        if (!isActive) return null
        return (
          <ItemComponent
            closeCmdK={false}
            href={href}
            key={_slug(title)}
            onClick={onClick}
            value={title}
          >
            <Logo>{icon}</Logo>
            {title}
          </ItemComponent>
        )
      })}
    </>
  )
}
function Cmdk() {
  const [value, setValue] = React.useState('linear')
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const listRef = React.useRef(null)

  /**
   * @note(cmdk)
   * Toggle the menu when ⌘K is pressed
   */
  const {
    cmdkInput,
    cmdkInputSet,
    cmdkPages,
    cmdkPagesSet,
    cmdkPagesSetRemove,
    isCmdkInnerOpen,
    isCmdkOpen,
    isCmdkOpenSet,
  } = useStore()
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        // isCmdkOpenSet((isCmdkOpen) => !isCmdkOpen)
        isCmdkOpenSet()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const page = cmdkPages[cmdkPages?.length - 1]
  const setPage = (page) => {
    inputRef?.current?.focus()
    cmdkPagesSet(page)
  }

  return (
    <>
      <div
        aria-hidden={true}
        className={cx(
          'duration-250 fixed left-0 top-0 z-50 size-full transition-all',
          'pointer-events-none',
          isCmdkOpen && isCmdkInnerOpen
            ? 'bg-[var(--whiteA11)] dark:bg-[var(--blackA11)]'
            : 'bg-transparent',
        )}
      />
      <Command.Dialog
        className={cx('data-[state=closed]:opacity-0')}
        contentClassName={cx()}
        label="Command Menu"
        onKeyDown={(e) => {
          if (
            (e.key === 'Escape' && cmdkPages.length !== 0) ||
            (e.key === 'Backspace' && !cmdkInput)
          ) {
            e.preventDefault()
            cmdkPagesSetRemove()
          }
          if (e.key === 'Escape' && cmdkPages.length === 0) {
            e.preventDefault()
            isCmdkOpenSet()
          }
        }}
        onOpenChange={isCmdkOpenSet}
        onValueChange={(v) => {
          console.dir(`v: ${v}`)
          setValue(v)
        }}
        open={isCmdkOpen}
        overlayClassName={cx()}
        value={value}
      >
        <CMDKWrapper>
          <div
            className="duration-250 transition-opacity data-[state=closed]:opacity-0 data-[state=open]:opacity-100"
            data-state={isCmdkInnerOpen ? 'open' : 'closed'}
            id="cmdk-wrapper"
          >
            <div cmdk-top-shine="" />
            <Command.Input
              autoFocus
              onValueChange={cmdkInputSet}
              placeholder="Search website..."
              ref={inputRef}
              value={cmdkInput}
            />
            <hr cmdk-loader="" />
            <Command.List ref={listRef}>
              <Command.Empty>No results found.</Command.Empty>
              {!page && (
                <>
                  {groups.map(({ id, items }) => {
                    return (
                      <Command.Group className="capitalize " heading={id} key={id}>
                        {items.map((item) => {
                          const props = {
                            ...item,
                            shortcut: !!item.shortcut ? item.shortcut : '',
                            value: item.id,
                          }
                          return (
                            <Item key={`${id}--${item.id}`} {...props}>
                              <Logo>{item.icon}</Logo>
                              {item.id}
                            </Item>
                          )
                        })}
                      </Command.Group>
                    )
                  })}
                  <Command.Group
                    className="capitalize"
                    heading={`search`}
                    key={`search`}
                  >
                    <Item
                      onSelect={() => setPage('upcoming-events')}
                      shortcut="U E"
                      value={`${SKIP}-1`}
                    >
                      <Logo>
                        <MagnifyingGlassIcon />
                      </Logo>
                      <span className="hidden">Search </span>Upcoming Events…
                    </Item>
                    <ItemsUpcomingEvents isSubItem />
                    <Item onSelect={() => setPage('shows')} value={`${SKIP}-2`}>
                      <Logo>
                        <MagnifyingGlassIcon />
                      </Logo>
                      <span className="hidden">Search </span>Shows…
                    </Item>
                    <ItemsShows isSubItem />
                    <Item onSelect={() => setPage('podcasts')} value={`${SKIP}-3`}>
                      <Logo>
                        <MagnifyingGlassIcon />
                      </Logo>
                      <span className="hidden">Search </span>Podcasts…
                    </Item>
                    <ItemsPodcasts isSubItem />
                  </Command.Group>
                  <Command.Group
                    className="capitalize"
                    heading={`general`}
                    key={`general`}
                  >
                    <Item
                      onSelect={() => {
                        setPage('themes')
                      }}
                      value={`${SKIP}-4`}
                    >
                      <Logo>
                        <DesktopIcon />
                      </Logo>
                      Change Theme…
                    </Item>
                    <ItemsTheme isSubItem />
                  </Command.Group>
                </>
              )}
              {page === 'upcoming-events' && <ItemsUpcomingEvents />}
              {page === 'shows' && <ItemsShows />}
              {page === 'podcasts' && <ItemsPodcasts />}
              {page === 'themes' && <ItemsTheme />}
            </Command.List>

            <div cmdk-footer="">
              {/* <HamburgerMenuIcon /> */}
              <div className="flex flex-row items-center justify-start gap-2 align-middle">
                <div className="inline-flex gap-2">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </div>
                <span className="font-mono text-xs">Close</span>
              </div>
              <button className="fixed right-0 mr-2" cmdk-open-trigger="">
                Return to Select
                <Kbd className="text-xs">↵</Kbd>
              </button>
            </div>
          </div>
        </CMDKWrapper>
      </Command.Dialog>
    </>
  )
}

export { Cmdk }
