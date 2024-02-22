'use client'
import { MagnifyingGlassIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'
import '@jeromefitz/tailwind-config/styles/cmdk.css'

import type { ReactNode } from 'react'

import { Kbd } from '@radix-ui/themes'
import { Command, useCommandState } from 'cmdk'
import { AnimatePresence, MotionProps, motion } from 'framer-motion'
import { slug as _slug } from 'github-slugger'
import _findIndex from 'lodash/findIndex.js'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useRef, useState } from 'react'

import { menus } from '@/data/menu'
import { useStore as _useStore } from '@/store/index'

import { Logo } from './Icons'

const SKIP = 'skip'

function getIconViaParentChild(parent, child) {
  return !!child ? child : parent
}

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

function CMDKWrapper(props: MotionProps & { children: ReactNode }) {
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
  children: ReactNode
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
  children: ReactNode
  closeCmdK?: boolean
  href?: string
  onClick?: () => void
  onSelect?: () => void
  shortcut?: string
  value?: string
}) {
  const router = useRouter()
  const { isCmdkOpenSet } = useStore()
  const [isClick, isClickSet] = useState(false)

  const shouldSkip = !value.includes(SKIP)

  const _onSelect = shouldSkip
    ? () => {
        !!onClick && onClick()
        if (closeCmdK) {
          router.push(href)
          isClickSet(true)
          isCmdkOpenSet()
        }
        // console.dir(`s: ${value}`)
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
  const { icon: _icon, items } = useMemo(
    () => menus[_findIndex(menus, { group: 'events' })],
    [],
  )
  return (
    <>
      {items.map(({ href, icon: __icon, isActive, title }) => {
        if (!isActive) return null
        const Icon = getIconViaParentChild(_icon, __icon)
        return (
          <ItemComponent href={href} key={_slug(title)} value={title}>
            <Logo>
              <Icon />
            </Logo>
            {title}
          </ItemComponent>
        )
      })}
    </>
  )
}
function ItemsShows({ isSubItem = false }) {
  const ItemComponent = isSubItem ? SubItem : Item
  const { icon: _icon, items } = useMemo(
    () => menus[_findIndex(menus, { group: 'shows' })],
    [],
  )

  return (
    <>
      {items.map(({ href, icon: __icon, isActive, title }) => {
        if (!isActive) return null
        const Icon = getIconViaParentChild(_icon, __icon)
        return (
          <ItemComponent href={href} key={_slug(title)} value={title}>
            <Logo>
              <Icon />
            </Logo>
            {title}
          </ItemComponent>
        )
      })}
    </>
  )
}
function ItemsPodcasts({ isSubItem = false }) {
  const ItemComponent = isSubItem ? SubItem : Item
  const { icon: _icon, items } = useMemo(
    () => menus[_findIndex(menus, { group: 'podcasts' })],
    [],
  )

  return (
    <>
      {items.map(({ href, icon: __icon, isActive, title }) => {
        if (!isActive) return null
        const Icon = getIconViaParentChild(_icon, __icon)
        return (
          <ItemComponent href={href} key={_slug(title)} value={title}>
            <Logo>
              <Icon />
            </Logo>
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
  const { icon: _icon, items } = useMemo(
    () => menus[_findIndex(menus, { group: 'general' })],
    [],
  )

  return (
    <>
      {items.map(({ href, icon: __icon, isActive, title }) => {
        if (!isActive) return null
        const Icon = getIconViaParentChild(_icon, __icon)
        return (
          <ItemComponent
            closeCmdK={false}
            href={href}
            key={_slug(title)}
            // @todo(cmdk) strip `/`
            onClick={() => setTheme(href)}
            value={title}
          >
            <Logo>
              <Icon />
            </Logo>
            {title}
          </ItemComponent>
        )
      })}
    </>
  )
}
function Cmdk() {
  const [value, setValue] = useState('linear')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef(null)

  const general = useMemo(() => menus[_findIndex(menus, { group: 'general' })], [])
  const IconGeneral = general.icon

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
  useEffect(() => {
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

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const page = cmdkPages[cmdkPages?.length - 1]
  const setPage = (page) => {
    inputRef?.current?.focus()
    cmdkPagesSet(page)
  }

  const { icon: _icon, items } = useMemo(
    () => menus[_findIndex(menus, { group: 'pages' })],
    [],
  )

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
          // console.dir(`v: ${v}`)
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
                  <Command.Group className="capitalize" heading={'pages'}>
                    {items.map((item) => {
                      const { href, icon: __icon, id, isActive, title } = item
                      if (!isActive) return null
                      const Icon = getIconViaParentChild(_icon, __icon)
                      const props = {
                        ...item,
                        // shortcut: !!item.shortcut ? item.shortcut : '',
                        value: href,
                      }
                      return (
                        <Item key={`pages--${id}`} {...props}>
                          <Logo>
                            <Icon />
                          </Logo>
                          {title}
                        </Item>
                      )
                    })}
                  </Command.Group>
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
                    heading={general.group}
                    key={general.group}
                  >
                    <Item
                      onSelect={() => {
                        setPage(general.group)
                      }}
                      value={`${SKIP}-4`}
                    >
                      <Logo>
                        <IconGeneral />
                      </Logo>
                      {general.title}
                    </Item>
                    <ItemsTheme isSubItem />
                  </Command.Group>
                </>
              )}
              {page === 'upcoming-events' && <ItemsUpcomingEvents />}
              {page === 'shows' && <ItemsShows />}
              {page === 'podcasts' && <ItemsPodcasts />}
              {page === general.group && <ItemsTheme />}
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
